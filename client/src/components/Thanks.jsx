import React from "react";
import Brands from "./Brands";

const Thanks = () => {
  return (
    <div className="relative mx-auto text-center text-white">
      <Brands />
      <div className="bg-white/10 backdrop-blur-sm rounded-md p-10 mt-8">
        <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
        <p className="text-xl mb-8">
          We hope you enjoyed your karaoke experience.
        </p>
        <a
          href="/"
          className="bg-main cursor-pointer px-10 py-3 rounded uppercase font-bold inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Thanks;
