import React, { useContext, useEffect, useState, useRef } from "react";
import { fetchLyrics, playSong } from "../api/API";
import { CategoriesContext } from "../context/GlobalContext";

const Karaoke = () => {
  const [song, setSong] = useState(null);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [currentLyric, setCurrentLyric] = useState(""); // To store current lyric
  const audioRef = useRef(null); // To reference the audio element

  const { selectedCategory, selectedGenre, selectedSong } =
    useContext(CategoriesContext);

  useEffect(() => {
    // Fetch and play the song
    async function playSelectedSong() {
      const data = await playSong(
        selectedCategory,
        selectedGenre,
        selectedSong
      );
      setSong(data);
    }
    playSelectedSong();

    // Fetch and parse lyrics
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

  // Function to parse the lyrics text
  function parseLyrics(lyricsText) {
    const lyricsData = [];
    const lines = lyricsText.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseFloat(match[2]);
        const timeInSeconds = minutes * 60 + seconds;
        const text = match[3].trim();

        if (text) {
          lyricsData.push({ time: timeInSeconds, text });
        }
      }
    });

    setParsedLyrics(lyricsData);
  }

  // Handle timeupdate event
  function handleTimeUpdate() {
    if (parsedLyrics.length === 0 || !audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    let activeIndex = 0;

    for (let i = 0; i < parsedLyrics.length; i++) {
      if (parsedLyrics[i].time <= currentTime) {
        activeIndex = i;
      }
    }

    if (parsedLyrics[activeIndex]) {
      setCurrentLyric(parsedLyrics[activeIndex].text);
    }
  }

  return (
    <div>
      <h1>Karaoke</h1>
      {song && (
        <audio
          ref={audioRef}
          src={song}
          controls
          onTimeUpdate={handleTimeUpdate} // Attach the timeupdate event handler
        />
      )}

      {/* Render the current lyric */}
      <div className="lyrics-container">
        <p className="current-lyric">{currentLyric}</p>
      </div>
    </div>
  );
};

export default Karaoke;
