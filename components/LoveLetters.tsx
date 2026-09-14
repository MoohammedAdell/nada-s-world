"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveLetters, LoveLetter } from "@/data/loveStory";

interface LoveLettersProps {
  onNext: () => void;
}

export default function LoveLetters({ onNext }: LoveLettersProps) {
  const [openedLetter, setOpenedLetter] = useState<LoveLetter | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-8 py-6 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          رسائل ليكي 💌
        </h2>
        <p className="text-pink-200/80 text-sm md:text-base">
          اكتشفي المظاريف دي.. كل ظرف جواه كلام حقيقي مكتوب عشانك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-2">
        {loveLetters.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenedLetter(letter)}
            className="glass-card rounded-2xl p-6 cursor-pointer flex flex-col items-center space-y-4 border border-pink-300/20 hover:border-romantic-pink transition-all"
          >
            <div className="text-6xl animate-bounce">💌</div>
            <h3 className="text-lg font-bold text-white">{letter.title}</h3>
            <p className="text-xs text-pink-200/70">{letter.preview}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenedLetter(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a0a24] border border-romantic-pink/40 p-8 rounded-3xl max-w-lg w-full text-right relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setOpenedLetter(null)}
                className="absolute top-4 left-4 text-white/60 hover:text-white text-xl w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="text-3xl">💌</span>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {openedLetter.title}
                  </h3>
                  <span className="text-xs text-romantic-lightPink">
                    {openedLetter.dateStr}
                  </span>
                </div>
              </div>

              <p className="text-base md:text-lg text-pink-100/90 leading-relaxed font-light">
                {openedLetter.content}
              </p>

              <div className="text-left pt-2">
                <button
                  onClick={() => setOpenedLetter(null)}
                  className="glass-button px-6 py-2 rounded-full text-sm font-semibold"
                >
                  إغلاق الرسالة ❤️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white mt-6"
      >
        <span>تعالي نشوف عدينا كام يوم ومستحملين بعض! 😂❤️</span>{" "}
      </motion.button>
    </div>
  );
}
