import React, { useRef } from "react";
import { addUser } from "../api/API";

const UserForm = ({ nextPage }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  function handleClick(e) {
    e.preventDefault();

    addUserData();
    nextPage();
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
  };

  return (
    <form>
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
      <button className="bg-red-500" onClick={handleClick}>
        Next
      </button>
    </form>
  );
};

export default UserForm;
