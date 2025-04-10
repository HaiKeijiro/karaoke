import React, { useRef } from "react";
import { addUser } from "../api/API";
import Brands from "./Brands";
import BrushStoke from "./BrushStoke";

const UserForm = ({ nextPage }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  function handleClick(e) {
    e.preventDefault();

    addUserData();
  }

  const addUserData = async () => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;

    console.info("Render ulang");

    if (!name || !phone) {
      alert("Please fill both inputs first");
      return;
    }

    await addUser({ name, phone });
    nextPage();
  };

  return (
    <>
      <Brands />

      <div className="bg-white/10 text-white backdrop-blur-md rounded-md grid">
        <form className="m-auto flex flex-col items-center justify-center">
          <BrushStoke />
          <h1 className="font-bold text-center text-3xl">
            <em>Karaoke Challenge</em>
          </h1>
          <div className="w-[45%]">
            <label htmlFor="name" className="block">
              Nama
            </label>
            <input
              ref={nameRef}
              type="text"
              className="border-2 w-full py-2 rounded"
              id="name"
            />
          </div>
          <div className="w-[45%] mt-2">
            <label htmlFor="no hp" className="block">
              Nomor HP
            </label>
            <input
              ref={phoneRef}
              type="number"
              className="border-2 w-full py-2 rounded"
              id="phone"
            />
          </div>
          <button
            className="bg-main w-[45%] py-3 rounded mt-8 text-xl cursor-pointer"
            onClick={handleClick}
          >
            Start Game
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
