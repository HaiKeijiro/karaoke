import { useState } from "react";

import { CategoryProvider } from "../context/GlobalContext";
import Categories from "./UserOptions/Categories";
import Genres from "./UserOptions/Genres";
import Songs from "./UserOptions/Songs";
import Karaoke from "./Karaoke";
import Brands from "./Brands";
import Modal from "./Modal";

const UserSelection = ({ previousPage }) => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const [modal, setModal] = useState(false);

  function handleNext() {
    setCurrentSelection((prevSelection) => prevSelection + 1);
  }

  function handlePrevious() {
    if (currentSelection > 0)
      setCurrentSelection((prevSelection) => prevSelection - 1);
  }

  function handleSelected() {
    setModal(true);
  }

  const selectionOrder = [
    <Categories nextSelection={handleNext} />,
    <Genres nextSelection={handleNext} />,
    <Songs />,
    <Karaoke />,
  ];

  return (
    <>
      <Brands />

      <div className="bg-white/10 text-white backdrop-blur-sm rounded-md grid">
        <div className="m-auto flex flex-col justify-center items-center">
          <CategoryProvider>
            {currentSelection < 3 && (
              <h1 className="text-3xl font-bold text-center uppercase">
                pilih preferensi lagu kamu
              </h1>
            )}

            <div className="mt-4 cursor-pointer">
              {selectionOrder[currentSelection]}
            </div>

            {currentSelection > 0 && currentSelection < 3 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  className="bg-secondary cursor-pointer py-3 rounded w-[200px]"
                  onClick={handlePrevious}
                >
                  Previous Selection
                </button>
                {currentSelection > 1 && (
                  <button
                    className="bg-secondary cursor-pointer py-3 rounded m-auto w-[200px]"
                    onClick={handleSelected}
                  >
                    Start Singing
                  </button>
                )}
              </div>
            )}

            {modal && <Modal setModal={setModal} next={handleNext} />}

            {/* <div className="flex justify-center items-center gap-4 mt-8">
              <button
                className="bg-secondary cursor-pointer py-3 rounded w-[200px]"
                onClick={handlePrevious}
              >
                Previous Selection
              </button>
              <button
                className="bg-secondary cursor-pointer py-3 rounded w-[200px]"
                onClick={previousPage}
              >
                Previous Page
              </button>
            </div> */}
          </CategoryProvider>
        </div>
      </div>
    </>
  );
};

export default UserSelection;
