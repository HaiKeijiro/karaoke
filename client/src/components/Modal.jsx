import React from "react";

const Modal = ({ setModal, next }) => {
  return (
    <div className="bg-white/40 backdrop-blur-md absolute p-10 rounded-md text-4xl">
      <h1>
        <strong>Double Check!</strong>
      </h1>
      <p className="mt-2 text-xl">Lock in your selection?</p>
      <div className="flex justify-end gap-x-1 uppercase font-bold mt-2">
        <button
          className="rounded-sm text-xl bg-secondary px-2"
          onClick={() => setModal(false)}
        >
          No
        </button>
        <button
          className="rounded-sm text-xl bg-secondary px-2"
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
