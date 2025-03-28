import { useState } from "react";

import { CategoryProvider } from "../context/GlobalContext";
import Categories from "./UserOptions/Categories";
import Genres from "./UserOptions/Genres";
import Songs from "./UserOptions/Songs";
import Karaoke from "./Karaoke";

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
    <CategoryProvider>
      {selectionOrder[currentSelection]}
      {currentSelection > 0 && currentSelection <= selectionOrder.length ? (
        <button className="p-4 border" onClick={handlePrevious}>
          Previous Selection
        </button>
      ) : (
        <button onClick={previousPage}>Previous Page</button>
      )}
    </CategoryProvider>
  );
};

export default UserSelection;
