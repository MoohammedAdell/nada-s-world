'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface SecretButtonProps {
  onNext: () => void;
}

export default function SecretButton({ onNext }: SecretButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Heart explosion
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff4d8d', '#ff85b3', '#ffffff', '#ff2a75']
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center space-y-8 min-h-[60vh] text-center">
      {!clicked ? (
        <div className="space-y-6">
          <span className="text-5xl block animate-bounce">👀</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">تحدي صغير...</h2>
          <button
            onClick={handleClick}
            className="glass-button px-8 py-4 rounded-full text-lg font-bold text-pink-300 hover:text-white border-dashed border-2 border-romantic-pink/50 hover:border-solid transition-all"
          >
            ماتضغطيش هنا 👀
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-3xl p-8 space-y-6 border border-romantic-pink"
          >
            <div className="text-6xl animate-bounce">😂❤️</div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-300">
              كنت عارف إنك هتضغطي!
            </h2>
            <p className="text-pink-100 text-base md:text-lg">
              فضولك الجميل ده من أكتر الحاجات اللي بحبها فيكي ❤️
            </p>

            <button
              onClick={onNext}
              className="glass-button px-8 py-3 rounded-full text-base font-bold text-white mt-4"
            >
              في حاجة أخيرة أقولها ليكي ❤️
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
