import { useState } from "react";

import { CategoryProvider } from "../context/GlobalContext";
import Categories from "./UserOptions/Categories";
import Genres from "./UserOptions/Genres";
import Songs from "./UserOptions/Songs";
import Karaoke from "./Karaoke";
import Brands from "./Brands";

const UserSelection = ({ previousPage }) => {
  const [currentSelection, setCurrentSelection] = useState(0);

  function handleNext() {
    setCurrentSelection((prevSelection) => prevSelection + 1);
  }

  function handlePrevious() {
    if (currentSelection > 0)
      setCurrentSelection((prevSelection) => prevSelection - 1);
  }

  const selectionOrder = [
    <Categories nextSelection={handleNext} />,
    <Genres nextSelection={handleNext} />,
    <Songs nextSelection={handleNext} />,
    <Karaoke />,
  ];

  return (
    <div className="w-full h-screen p-10">
      <Brands />

      <div className="mt-14 grid">
        <CategoryProvider>
          <h1 className="text-3xl font-bold text-center">
            MASUKKAN TITLE DISINI
          </h1>

          <div className="m-auto mt-10">{selectionOrder[currentSelection]}</div>

          {currentSelection > 0 && currentSelection <= selectionOrder.length ? (
            <button
              className="bg-red-200 py-2 px-4 rounded mt-4 w-fit m-auto"
              onClick={handlePrevious}
            >
              Previous Selection
            </button>
          ) : (
            <button
              className="bg-red-200 py-2 px-4 rounded mt-4 w-fit m-auto"
              onClick={previousPage}
            >
              Previous Page
            </button>
          )}
        </CategoryProvider>
      </div>
    </div>
  );
};

export default UserSelection;
