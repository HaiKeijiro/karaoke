import React, { useContext, useEffect, useState } from "react";
import { fetchGenres } from "../../api/API";
import { CategoriesContext } from "../../context/GlobalContext";

const Genres = ({ nextSelection }) => {
  const [genres, setGenres] = useState([]);

  const { selectedCategory, setSelectedGenre } = useContext(CategoriesContext);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres(selectedCategory);
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres ", error);
      }
    };

    getGenres();
  }, []);

  return (
    <div>
      {genres.map((genre, i) => (
        <div
          key={i}
          className="w-20 h-20 border"
          onClick={() => {
            setSelectedGenre(genre);
            nextSelection();
          }}
        >
          {genre}
        </div>
      ))}
    </div>
  );
};

export default Genres;
