import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../api/API";

export const CategoriesContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories ", error);
      }
    };

    getCategories();
  }, []);

  const sharedData = {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    selectedGenre,
    setSelectedGenre,
    selectedSong,
    setSelectedSong,
  };

  return (
    <CategoriesContext.Provider value={sharedData}>
      {children}
    </CategoriesContext.Provider>
  );
};
