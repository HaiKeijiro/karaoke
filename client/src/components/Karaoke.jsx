import React, { useEffect, useRef, useState, useContext } from "react";
import { fetchLyrics, playSong } from "../api/API";
import { CategoriesContext } from "../context/GlobalContext";

const Karaoke = () => {
  const [song, setSong] = useState(null);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const { selectedCategory, selectedGenre, selectedSong } =
    useContext(CategoriesContext);

  useEffect(() => {
    async function playSelectedSong() {
      const data = await playSong(
        selectedCategory,
        selectedGenre,
        selectedSong
      );
      setSong(data);
    }
    playSelectedSong();

    async function renderLyrics() {
      const lyricsText = await fetchLyrics(
        selectedCategory,
        selectedGenre,
        selectedSong
      );
      parseLyrics(lyricsText);
    }
    renderLyrics();
  }, [selectedCategory, selectedGenre, selectedSong]);

  function parseLyrics(lyricsText) {
    const lyricsData = lyricsText
      .split("\n")
      .map((line) => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (match) {
          return {
            time: parseInt(match[1]) * 60 + parseFloat(match[2]),
            text: match[3].trim(),
          };
        }
        return null;
      })
      .filter(Boolean);
    setParsedLyrics(lyricsData);
  }

  function handleTimeUpdate() {
    if (!audioRef.current || parsedLyrics.length === 0) return;

    const currentTime = audioRef.current.currentTime;
    let activeIndex = parsedLyrics.findIndex(
      (lyric, index) =>
        index === parsedLyrics.length - 1 ||
        (lyric.time <= currentTime &&
          parsedLyrics[index + 1]?.time > currentTime)
    );

    if (activeIndex !== -1) {
      setCurrentLyricIndex(activeIndex);
    }
  }

  // Auto-scroll to current lyric only after the timestamp starts
  useEffect(() => {
    if (lyricsContainerRef.current && parsedLyrics.length > 0) {
      const activeLyric =
        lyricsContainerRef.current.children[currentLyricIndex];
      const firstLyricTimestamp = parsedLyrics[0].time; // Timestamp of the first lyric
      const currentTime = audioRef.current?.currentTime || 0;

      // Scroll only if current time is greater than or equal to the first lyric's timestamp
      if (currentTime >= firstLyricTimestamp) {
        lyricsContainerRef.current.scrollTo({
          top:
            activeLyric.offsetTop -
            lyricsContainerRef.current.clientHeight / 2 +
            activeLyric.clientHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentLyricIndex, parsedLyrics]);

  return (
    <div className="relative mx-auto text-center text-white">
      {song && (
        <audio
          ref={audioRef}
          src={song}
          onTimeUpdate={handleTimeUpdate}
          className="hidden"
          autoPlay
        />
      )}

      {/* Lyrics Display */}
      <div
        ref={lyricsContainerRef}
        className="w-[90vw] h-96 overflow-y-auto no-scrollbar"
      >
        {parsedLyrics.map((lyric, index) => (
          <p
            key={index}
            className={`transition-all duration-300 px-4 text-2xl ${
              index === currentLyricIndex
                ? "text-white font-bold scale-110"
                : "opacity-50"
            }`}
          >
            {lyric.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Karaoke;
