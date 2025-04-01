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
    <div className="flex gap-4">
      {genres.map((genre, i) => (
        <div
          key={i}
          className="p-10 bg-blue-100 rounded grid"
          onClick={() => {
            setSelectedGenre(genre);
            nextSelection();
          }}
        >
          <h1 className="m-auto">{genre}</h1>
        </div>
      ))}
    </div>
  );
};

export default Genres;
