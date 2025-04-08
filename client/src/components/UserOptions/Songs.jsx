import React, { useContext, useEffect, useState } from "react";
import { fetchSongs, searchSongs } from "../../api/API";
import { CategoriesContext } from "../../context/GlobalContext";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { selectedCategory, selectedGenre, selectedSong, setSelectedSong } =
    useContext(CategoriesContext);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetchSongs(selectedCategory, selectedGenre);
        setSongs(data);
        setSearchResults([]);
        setIsSearching(false);
      } catch (error) {
        console.error("Error fetching songs ", error);
      }
    };

    getSongs();
  }, [selectedCategory, selectedGenre]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchSongs(query, selectedCategory, selectedGenre);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching songs: ", error);
      setSearchResults([]);
    }
  };

  const displaySongs = isSearching ? searchResults : songs;

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs..."
            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:border-secondary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div
        className={`${
          displaySongs.length > 2 ? "grid-cols-3" : "grid-cols-1"
        } grid gap-4`}
      >
        {displaySongs.length > 0 ? (
          displaySongs.map((song, i) => (
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
          ))
        ) : (
          <div className="col-span-full text-center p-4 text-gray-500">
            {isSearching
              ? "No songs found matching your search"
              : "No songs available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;
