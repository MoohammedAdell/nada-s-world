"use client";

import React, { createContext, useContext, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Audio play blocked"));
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Audio play blocked"));
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{ isPlaying, togglePlay, playAudio, pauseAudio }}
    >
      {/* عنصر الصوت ثابت هنا ولا ينتهي عند تنقل الصفحات */}
      <audio ref={audioRef} src="/music/amrdiab.mp3" loop />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
