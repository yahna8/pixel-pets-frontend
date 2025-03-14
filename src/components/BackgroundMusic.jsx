import React, { useEffect, useRef, useState } from "react";
import "../styles/globals.css";

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="music-button-container">
      <audio ref={audioRef}>
        <source src={src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Mute Button */}
      <button className="mute-button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
};

export default BackgroundMusic;
