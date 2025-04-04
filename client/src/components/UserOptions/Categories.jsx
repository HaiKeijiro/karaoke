import React, { useContext } from "react";
import { CategoriesContext } from "../../context/GlobalContext";

const Categories = ({ nextSelection }) => {
  const { categories, setSelectedCategory } = useContext(CategoriesContext);

  return (
    <div className="flex gap-4">
      {categories.map((category, i) => (
        <div
          key={i}
          className="p-10 bg-main rounded grid"
          onClick={() => {
            setSelectedCategory(category);
            nextSelection();
          }}
        >
          <h1 className="m-auto">{category}</h1>
        </div>
      ))}
    </div>
  );
};

export default Categories;
