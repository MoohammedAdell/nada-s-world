'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '@/data/loveStory';

interface MemoryCardProps {
  onNext: () => void;
  onPrev?: () => void;
}

export default function MemoryCard({ onNext }: MemoryCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMemory = memories[currentIndex];

  const handleNextMemory = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext();
    }
  };

  const handlePrevMemory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center space-y-6 px-4">
      <div className="text-center space-y-2 mb-2">
        <span className="text-romantic-lightPink text-sm font-semibold tracking-wider">قصتنا الجميلة</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white">محطات في طريقنا ❤️</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMemory.id}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="w-full glass-card rounded-3xl p-6 md:p-8 flex flex-col items-center text-center space-y-5"
        >
          {/* الحاوية التي تمتد بكامل العرض والارتفاع مع ضبط ملء الصورة */}
          <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
            <Image
              src={currentMemory.image}
              alt={currentMemory.title}
              fill
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
            {/* لمسة إضاءة زجاجية ناعمة أسفل الصورة */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="inline-block px-4 py-1 rounded-full bg-romantic-pink/20 border border-romantic-pink/40 text-romantic-lightPink text-xs md:text-sm font-medium">
            {currentMemory.date}
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white">{currentMemory.title}</h3>

          <p className="text-pink-100/80 text-sm md:text-base leading-relaxed font-light">
            {currentMemory.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between w-full pt-4">
        <button
          onClick={handlePrevMemory}
          disabled={currentIndex === 0}
          className={`glass-button px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          → الذكرى اللي فاتت
        </button>

        <span className="text-xs text-pink-300/60 font-medium">
          {currentIndex + 1} من {memories.length}
        </span>

        <button
          onClick={handleNextMemory}
          className="glass-button px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:scale-105 transition-all"
        >
          {currentIndex === memories.length - 1 ? 'المشهد التالي ❤️' : 'الذكرى اللي بعدها ←'}
        </button>
      </div>
    </div>
  );
}