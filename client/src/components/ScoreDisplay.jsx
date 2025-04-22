import React, { useState, useEffect } from "react";

const ScoreDisplay = () => {
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [compliment, setCompliment] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [showScoreText, setShowScoreText] = useState(false);

  useEffect(() => {
    // Generate random score between 80-95
    const randomScore = Math.floor(Math.random() * 16) + 80;
    setFinalScore(randomScore);

    // Set compliment based on score range
    if (randomScore >= 91) {
      setCompliment("Amazing Performance! 🎉");
    } else if (randomScore >= 86) {
      setCompliment("Great Job! 👏");
    } else {
      setCompliment("Nice Try! 👍");
    }

    // Animate the score counting up
    let currentScore = 0;
    const interval = setInterval(() => {
      currentScore += 1;
      setScore(currentScore);

      if (currentScore >= randomScore) {
        clearInterval(interval);
        setIsAnimating(false);

        // Show score text with delay for better visual effect
        setTimeout(() => {
          setShowScoreText(true);
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Determine color based on score
  const getScoreColor = () => {
    if (finalScore >= 91) return "text-green-400";
    if (finalScore >= 86) return "text-blue-400";
    return "text-yellow-400";
  };

  return (
    <div className="my-8 flex flex-col items-center">
      {/* Score card with glow effect */}
      <div
        className={`relative shadow-lg ${
          finalScore >= 91
            ? "shadow-green-500/20"
            : finalScore >= 86
            ? "shadow-blue-500/20"
            : "shadow-yellow-500/20"
        }`}
      >
        {/* Animated number */}
        <div
          className={`text-8xl font-bold mb-4 ${getScoreColor()} transition-all duration-300`}
        >
          <span
            className={`inline-block transition-all duration-300 ${
              isAnimating
                ? "scale-110 transform -rotate-3"
                : "scale-100 transform rotate-0"
            }`}
          >
            {score}
          </span>
        </div>

        {/* Compliment with fade-in effect */}
        <div
          className={`text-2xl font-semibold transition-all duration-1000 ${
            score === finalScore
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          {compliment}
        </div>

        {/* Score label */}
        <div className="mt-3 text-gray-300">
          {showScoreText && (
            <div className="animate-pulse transition-opacity duration-1000 opacity-100">
              Your Karaoke Score
            </div>
          )}
        </div>
      </div>

      {/* Additional animated elements */}
      {score === finalScore && (
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${getScoreColor()} animate-bounce`}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
