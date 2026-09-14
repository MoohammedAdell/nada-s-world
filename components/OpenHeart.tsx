'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpenHeartProps {
  onNext: () => void;
}

export default function OpenHeart({ onNext }: OpenHeartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const heartMessages = [
    "لو سألتني عن أجمل حاجة حصلتلي...",
    "هقولك إنك دخلتي حياتي ونورتيها.",
    "ولو خيروني أعيش كل حاجة من الأول...",
    "هختارك إنتي تاني.. وتالت.. وللأبد. ❤️"
  ];

  useEffect(() => {
    if (isOpen && textIndex < heartMessages.length - 1) {
      const timer = setTimeout(() => {
        setTextIndex((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, textIndex]);

  const handleHeartClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 min-h-[75vh] text-center">
      {!isOpen ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="cursor-pointer relative"
            onClick={handleHeartClick}
          >
            <div className="text-8xl md:text-9xl drop-shadow-[0_0_35px_rgba(255,77,141,0.8)]">
              ❤️
            </div>
            <div className="absolute inset-0 bg-romantic-pink/20 rounded-full blur-2xl -z-10 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">سر جوه قلبي...</h2>
            <button
              onClick={handleHeartClick}
              className="glass-button px-10 py-4 rounded-full text-xl font-bold text-white shadow-lg animate-bounce"
            >
              افتحي قلبي ❤️
            </button>
          </motion.div>
        </>
      ) : (
        <div className="space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-7xl md:text-8xl drop-shadow-[0_0_40px_rgba(255,77,141,0.9)]"
          >
            💖
          </motion.div>

          <div className="min-h-[140px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.9 }}
                className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-romantic-lightPink leading-relaxed max-w-xl"
              >
                {heartMessages[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {textIndex === heartMessages.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={onNext}
                className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white mt-4"
              >
                تعالي نشوف الأسباب اللي بعد كدا ❤️
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
