import React, { useContext } from "react";
import { CategoriesContext } from "../../context/GlobalContext";

const Categories = ({ nextSelection }) => {
  const { categories, setSelectedCategory } = useContext(CategoriesContext);

  return (
    <>
      {categories.map((category, i) => (
        <div
          key={i}
          className="w-20 h-20 border"
          onClick={() => {
            setSelectedCategory(category);
            nextSelection();
          }}
        >
          {category}
        </div>
      ))}
    </>
  );
};

export default Categories;
