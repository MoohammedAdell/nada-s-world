'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StorySceneProps {
  onNext: () => void;
}

export default function StoryScene({ onNext }: StorySceneProps) {
  return (
    <div className="text-center max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 min-h-[70vh]">
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl"
      >
        📖
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-3xl md:text-5xl font-bold text-white leading-snug"
      >
        كل حكاية ليها بداية...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg md:text-2xl text-pink-200/90 font-light leading-relaxed max-w-md"
      >
        بس حكايتنا بالنسبة لي،
        <br />
        مكانتش مجرد بداية عادية. كانت بداية لقصة جديدة تماماً كملت حياتي.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <button
          onClick={onNext}
          className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white flex items-center gap-2 group"
        >
          <span>كملي الحكاية ❤️</span>
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
        </button>
      </motion.div>
    </div>
  );
}
