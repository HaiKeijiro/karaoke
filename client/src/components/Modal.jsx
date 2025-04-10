import React from "react";

const Modal = ({ setModal, next }) => {
  return (
    <div className="bg-black/50 text-white backdrop-blur-sm absolute p-10 rounded-md text-4xl">
      <h1>
        <strong>Double Check!</strong>
      </h1>
      <h2 className="mt-2">Lock in your selection?</h2>
      <div className="flex justify-end gap-x-1 uppercase font-bold mt-2">
        <button
          className="rounded-sm bg-white/50 px-2"
          onClick={() => setModal(false)}
        >
          No
        </button>
        <button
          className="rounded-sm bg-white/50 px-2"
          onClick={() => {
            next();
            setModal(false);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Modal;
