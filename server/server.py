from flask import Flask, render_template, jsonify, send_from_directory, request, url_for, redirect, send_file
from flask_cors import CORS
import os
import sqlite3
import fnmatch
import csv

app = Flask(__name__)
cors = CORS(app, origins="*")

# Path to the music directory
MUSIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "music")
    
@app.route("/categories")
def get_categories():
    """Return the list of main categories (e.g., 'Western', 'Indonesia')"""
    try:
        categories = [cat for cat in os.listdir(MUSIC_DIR) if os.path.isdir(os.path.join(MUSIC_DIR, cat))]
        return jsonify(categories)
    except FileNotFoundError:
        return jsonify({"error": "Music directory not found"}), 500

@app.route("/categories/<category>")
def get_subcategories(category):
    """Return the subcategories inside a category (e.g., 'Pop' inside 'Western')"""
    category_path = os.path.join(MUSIC_DIR, category)
    try:
        subcategories = [sub for sub in os.listdir(category_path) if os.path.isdir(os.path.join(category_path, sub))]
        return jsonify(subcategories)
    except FileNotFoundError:
        return jsonify({"error": "Category not found"}), 500

@app.route("/categories/<category>/<subcategory>")
def get_songs(category, subcategory):
    """Return the list of songs inside a subcategory"""
    subcategory_path = os.path.join(MUSIC_DIR, category, subcategory)
    try:
        songs = [song.replace(".mp3", "") for song in os.listdir(subcategory_path) if song.endswith(".mp3")]
        return jsonify(songs)
    except FileNotFoundError:
        return jsonify({"error": "Subcategory not found"}), 500

@app.route("/play/<category>/<subcategory>/<song>")
def serve_song(category, subcategory, song):
    """Serve the selected MP3 file"""
    song_file = song + ".mp3"
    return send_from_directory(os.path.join(MUSIC_DIR, category, subcategory), song_file)

@app.route("/lyrics/<category>/<subcategory>/<song>")
def serve_lyrics(category, subcategory, song):
    """Serve the corresponding LRC file if available"""
    lyrics_file = song + ".lrc"
    lyrics_path = os.path.join(MUSIC_DIR, category, subcategory, lyrics_file)
    if os.path.exists(lyrics_path):
        return send_from_directory(os.path.join(MUSIC_DIR, category, subcategory), lyrics_file)
    return jsonify({"error": "Lyrics not found"}), 404

@app.route("/search/<category>/<subcategory>")
def search_songs(category, subcategory):
    """Search for songs within a specific category and subcategory"""
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify([])
        
    subcategory_path = os.path.join(MUSIC_DIR, category, subcategory)
    try:
        # Get all songs in the subcategory
        all_songs = [song.replace(".mp3", "") for song in os.listdir(subcategory_path) 
                    if song.endswith(".mp3")]
        
        # Filter songs that match the search query
        matching_songs = [song for song in all_songs if query in song.lower()]
        
        return jsonify(matching_songs)
    except FileNotFoundError:
        return jsonify({"error": "Category or subcategory not found"}), 500

# Database
def get_db_connection():
    connection = sqlite3.connect("karaoke.db")
    connection.execute("CREATE TABLE IF NOT EXISTS user_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL)")
    
    # Allow rows to be accessed by column name
    connection.row_factory = sqlite3.Row
    return connection
    
@app.route('/add_user', methods=['POST'])
def add_data():
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        
        if not name or not phone:
            return jsonify({"status": "error", "message": "Name and phone are required"}), 400
        
        connection = get_db_connection()
        connection.execute("INSERT INTO user_table (name, phone) VALUES (?, ?)", (name, phone))
        connection.commit()
        connection.close()
        
        return jsonify({"status": "success", "message": "User added successfully"})
    
@app.route('/api/export', methods=['GET'])
def export_to_csv():
    try:
        conn = sqlite3.connect("karaoke.db")
        cursor = conn.cursor()

        cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='user_table'")
        if not cursor.fetchone():
            return jsonify({"error": f"Table 'user_table' does not exist."}), 404

        cursor.execute(f"SELECT * FROM user_table")
        rows = cursor.fetchall()
        column_names = [description[0] for description in cursor.description]

        csv_file_path = f"user_table.csv"
        with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(column_names)
            writer.writerows(rows)

        return send_file(csv_file_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ ==  "__main__":
    app.run(debug=True, port=8000)