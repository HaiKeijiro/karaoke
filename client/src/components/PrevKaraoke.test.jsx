import React, { useContext, useEffect, useState } from "react";
import { fetchLyrics, playSong } from "../api/API";
import { CategoriesContext } from "../context/GlobalContext";

const Karaoke = () => {
  const [song, setSong] = useState(null);
  const [parsedLyrics, setParsedLyrics] = useState([]);

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
      const data = await fetchLyrics(
        selectedCategory,
        selectedGenre,
        selectedSong
      );

      parseLyrics(data);
    }

    renderLyrics();
  }, [selectedCategory, selectedGenre, selectedSong]);

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

  return (
    <div>
      <h1>Karaoke</h1>
      {song && <audio src={song} controls></audio>}
      {parsedLyrics.map((lyric, index) => (
        <pre key={index} className="lyric">
          {lyric.text}
        </pre>
      ))}
    </div>
  );
};

export default Karaoke;
