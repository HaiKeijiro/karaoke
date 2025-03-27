import React from "react";

const UserForm = ({ saveUserData, nameRef, phoneRef }) => {
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
      <button className="bg-red-500" onClick={saveUserData}>
        Next
      </button>
    </form>
  );
};

export default UserForm;
