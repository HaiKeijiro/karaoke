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

  console.log(songs);

  return (
    <div className={`${songs.length > 2 ? "grid-cols-3" : null} grid gap-4`}>
      {songs.map((song, i) => (
        <div
          key={i}
          className={`p-4 bg-blue-100 rounded grid overflow-hidden cursor-pointer border-2 transition-all ${
            selectedSong === song
              ? "border-black shadow-lg"
              : "border-transparent"
          }`}
          onClick={() => setSelectedSong(song)}
        >
          <h1 className="m-auto">{song}</h1>
        </div>
      ))}
      {selectedSong && (
        <button
          className="bg-red-200 py-2 px-4 rounded mt-4 w-fit m-auto"
          onClick={nextSelection}
        >
          Start Singing
        </button>
      )}
    </div>
  );
};

export default Songs;
