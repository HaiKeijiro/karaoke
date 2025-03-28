import React, { useEffect, useState } from "react";
import { fetchCategories, fetchGenres, fetchSongs } from "../api/API";

const UserSelection = ({ setCategory, setGenre, setSong }) => {
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [showGenre, setShowGenre] = useState(false);
  const [showSong, setShowSong] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories once
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Fetch genres when selectedCategory changes
        if (selectedCategory) {
          const genresData = await fetchGenres(selectedCategory);
          setGenres(genresData);
        }

        // Fetch songs when selectedGenre changes
        if (selectedCategory && selectedGenre) {
          const songsData = await fetchSongs(selectedCategory, selectedGenre);
          setSongs(songsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategory, selectedGenre]); // Only rerun when category or genre changes

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategory(category);
    setShowGenre(true);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setGenre(genre);
    setShowSong(true);
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setSong(song);
  };

  const handleBackFromGenre = () => {
    setShowGenre(false);
    setSelectedCategory(""); // Optional: Reset the selected category
  };

  const handleBackFromSong = () => {
    setShowSong(false);
    setSelectedGenre(""); // Optional: Reset the selected genre
  };

  const renderOptionBoxes = (options, selectedOption, handleSelect) => {
    return options.map((option, index) => (
      <div
        key={index}
        className={`p-4 m-2 text-center cursor-pointer rounded-lg border-2 transition-all ${
          selectedOption === option
            ? "bg-blue-600 text-white border-blue-800"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() => handleSelect(option)}
      >
        {option}
      </div>
    ));
  };

  return (
    <div>
      {/* Category Select Boxes */}
      {!showGenre && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Category</h3>
          <div className="flex flex-wrap">
            {renderOptionBoxes(
              categories,
              selectedCategory,
              handleCategorySelect
            )}
          </div>
        </div>
      )}

      {/* Genre Select Boxes */}
      {showGenre && !showSong && (
        <div className="mb-6 transition-all">
          <h3 className="text-lg font-semibold mb-2">Select Genre</h3>
          <div className="flex flex-wrap">
            {renderOptionBoxes(genres, selectedGenre, handleGenreSelect)}
          </div>
          {/* Back Button for Genre */}
          <button
            onClick={handleBackFromGenre}
            className="mt-4 p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Category
          </button>
        </div>
      )}

      {/* Song Select Boxes */}
      {showSong && (
        <div className="mb-6 transition-all">
          <h3 className="text-lg font-semibold mb-2">Select Song</h3>
          <div className="flex flex-wrap">
            {renderOptionBoxes(songs, selectedSong, handleSongSelect)}
          </div>
          {/* Back Button for Song */}
          <button
            onClick={handleBackFromSong}
            className="mt-4 p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Genre
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSelection;
