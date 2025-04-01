import React, { useRef } from "react";
import { addUser } from "../api/API";
import Brands from "./Brands";

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
    <div className="h-screen">
      <Brands />

      <form className="w-fit m-auto mt-32">
        <h1 className="text-red-500 font-bold text-center">
          <em>Karaoke Challenge</em>
        </h1>
        <div>
          <label htmlFor="name" className="block">
            Nama
          </label>
          <input ref={nameRef} type="text" className="border" id="name" />
        </div>
        <div>
          <label htmlFor="no hp" className="block">
            Nomor HP
          </label>
          <input ref={phoneRef} type="number" className="border" id="phone" />
        </div>
        <button
          className="bg-red-200 py-2 px-4 rounded mt-4"
          onClick={handleClick}
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default UserForm;
