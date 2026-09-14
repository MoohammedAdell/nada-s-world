'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Volume2 } from 'lucide-react';

interface MusicPlayerProps {
  onNext: () => void;
}

export default function MusicPlayer({ onNext }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Audio play blocked by browser policy");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center space-y-8 py-6 text-center">
      <audio ref={audioRef} src="/music/our-song.mp3" loop />

      <div className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white flex items-center justify-center gap-3">
          <span>أغنية بتفكرني بيكي</span>
          <Music className="w-8 h-8 text-romantic-pink animate-pulse" />
        </h2>
        <p className="text-pink-200/80 text-sm md:text-base">
          كل ما أسمع الأغنية دي بتفكرني بكل لحظة حلوة عشناها سوا.
        </p>
      </div>

      <motion.div
        animate={{
          boxShadow: isPlaying
            ? ['0 0 20px rgba(255,77,141,0.3)', '0 0 50px rgba(255,77,141,0.7)', '0 0 20px rgba(255,77,141,0.3)']
            : '0 0 10px rgba(0,0,0,0.5)',
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full glass-card rounded-3xl p-8 flex flex-col items-center space-y-6 border border-white/10 relative overflow-hidden"
      >
        <div className="relative w-32 h-32 rounded-full border-4 border-romantic-pink/40 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-pink-900/50 to-purple-900/50">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full flex items-center justify-center text-5xl"
          >
            🎵
          </motion.div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">أغنيتنا الخاصة</h3>
          <span className="text-xs text-romantic-lightPink">لحظات لا تُنسى ❤️</span>
        </div>

        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-romantic-pink to-purple-600 flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
        </button>

        {isPlaying && (
          <div className="flex items-center gap-2 text-xs text-pink-200/70">
            <Volume2 className="w-4 h-4 text-romantic-pink" />
            <span>شغالة دلوقتي... استمتعي باللحظة ✨</span>
          </div>
        )}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white"
      >
        <span>المفاجأة اللي بعد كده 👀</span>
      </motion.button>
    </div>
  );
}
