import React, { useContext, useEffect, useState } from "react";
import { fetchSongs } from "../../api/API";
import { CategoriesContext } from "../../context/GlobalContext";

const Songs = ({ nextSelection }) => {
  const [songs, setSongs] = useState([]);

  const { selectedCategory, selectedGenre, selectedSong, setSelectedSong } =
    useContext(CategoriesContext);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetchSongs(selectedCategory, selectedGenre);
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs ", error);
      }
    };

    getSongs();
  }, []);

  return (
    <div>
      {songs.map((song, i) => (
        <div
          key={i}
          className="p-2 w-fit border"
          onClick={() => setSelectedSong(song)}
        >
          {song}
        </div>
      ))}
      {selectedSong && (
        <button className="p-4 border" onClick={nextSelection}>
          Start Singing
        </button>
      )}
    </div>
  );
};

export default Songs;
