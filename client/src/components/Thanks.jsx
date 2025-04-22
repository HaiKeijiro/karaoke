import React, { useState, useEffect } from "react";
import Brands from "./Brands";
import Confetti from "react-confetti";
import ScoreDisplay from "./ScoreDisplay";

const Thanks = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Update window dimensions if resized
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="m-auto text-center text-white">
      <div className="absolute left-0 top-0 z-10">
        {showConfetti && (
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
          />
        )}
      </div>
      <Brands />
      <div className="bg-white/10 backdrop-blur-sm rounded-md p-10 mt-8">
        <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
        <ScoreDisplay />
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
