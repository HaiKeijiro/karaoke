import React, { useContext, useEffect, useState } from "react";
import { fetchSongs } from "../../api/API";
import { CategoriesContext } from "../../context/GlobalContext";

const Songs = () => {
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
          className={`p-10 bg-main rounded grid overflow-hidden cursor-pointer border-2 transition-all ${
            selectedSong === song
              ? "border-5 border-secondary shadow-lg"
              : "border-transparent"
          }`}
          onClick={() => setSelectedSong(song)}
        >
          <h1 className="m-auto">{song}</h1>
        </div>
      ))}
    </div>
  );
};

export default Songs;
