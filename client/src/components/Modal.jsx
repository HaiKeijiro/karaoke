import React from "react";

const Modal = ({ setModal, next }) => {
  return (
    <div className="border p-2">
      Are you sure?
      <div>
        <button onClick={() => setModal(false)}>No</button>
        <button
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
