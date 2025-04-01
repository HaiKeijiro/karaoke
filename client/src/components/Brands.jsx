import React from "react";

const Brands = () => {
  return (
    <div className="flex justify-between items-center py-2 px-10 bg-white/10 text-white backdrop-blur-sm rounded-md">
      <h1>
        Bersama <span className="font-bold">ASTRA INTERNATIONAL</span>
      </h1>
      <div className="flex items-center font-bold gap-2">
        <div>
          <img src="/capture_it.png" alt="logo 1" />
        </div>
        <span>X</span>
        <div>
          <img src="/astra.png" alt="logo 2" />
        </div>
      </div>
    </div>
  );
};

export default Brands;
