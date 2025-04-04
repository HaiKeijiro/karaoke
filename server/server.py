from flask import Flask, render_template, jsonify, send_from_directory, request, url_for, redirect
from flask_cors import CORS
import os
import sqlite3
import fnmatch

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
    
if __name__ ==  "__main__":
    app.run(debug=True, port=8000)