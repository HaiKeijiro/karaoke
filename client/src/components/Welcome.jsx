import React from "react";
import Brands from "./Brands";
import BrushStoke from "./BrushStoke";

const Welcome = ({ start }) => {
  return (
    <div className="welcome-grid gap-4 p-6">
      <div className="">
        <Brands />
      </div>
      <div className="flex flex-col items-center justify-center bg-white/10 text-white backdrop-blur-sm rounded-md">
        <BrushStoke />
        <h1 className="text-4xl font-bold">
          <em>Karaoke Challenge</em>
        </h1>
        <button
          className="bg-main py-3 w-[280px] rounded mt-10 cursor-pointer"
          onClick={start}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Welcome;
