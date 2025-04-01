import React from "react";
import Brands from "./Brands";
import BrushStoke from "./BrushStoke";

const Welcome = ({ start }) => {
  return (
    <div className="w-full h-screen p-10">
      <div className="w-full h-fit mb-4">
        <Brands />
      </div>
      <div className="m-auto flex flex-col items-center justify-center h-3/4 bg-white/10 text-white backdrop-blur-sm rounded-md">
        <BrushStoke />
        <h1 className="text-4xl font-bold">
          <em>Karaoke Challenge</em>
        </h1>
        <button className="bg-main py-3 px-12 rounded mt-10" onClick={start}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Welcome;
