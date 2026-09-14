'use client';

import React from 'react';
import { useAudio } from '@/context/AudioContext';
import { Volume2, VolumeX } from 'lucide-react';

export default function FloatingMusicControl() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-5 left-5 z-50 p-3 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-white shadow-2xl hover:scale-110 transition-all"
    >
      {isPlaying ? <Volume2 className="w-5 h-5 text-pink-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
    </button>
  );
}