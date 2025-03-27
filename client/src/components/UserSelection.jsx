import React from "react";

const UserSelection = ({ setCategory, setGenre, setSong }) => {
  const categories = ["Pop", "Rock", "Jazz", "Classical"];
  const genres = ["Indie", "Hip-Hop", "Alternative", "Electronic"];
  const songs = ["Song A", "Song B", "Song C", "Song D"];

  return (
    <div>
      {/* Category Select */}
      <select onChange={(e) => setCategory(e.target.value)} defaultValue="">
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Genre Select */}
      <select onChange={(e) => setGenre(e.target.value)} defaultValue="">
        <option value="">Select Genre</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Song Select */}
      <select onChange={(e) => setSong(e.target.value)} defaultValue="">
        <option value="">Select Song</option>
        {songs.map((song, index) => (
          <option key={index} value={song}>
            {song}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelection;
