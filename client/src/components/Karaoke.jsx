import React from "react";

const Karaoke = ({ category, genre, song }) => {
  return (
    <div>
      <p>{category}</p>
      <p>{genre}</p>
      <p>{song}</p>
    </div>
  );
};

export default Karaoke;
