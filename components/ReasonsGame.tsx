"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reasons100 } from "@/data/loveStory";
import confetti from "canvas-confetti";
import { Shuffle, FastForward, Play, Pause, Heart } from "lucide-react";

interface ReasonsGameProps {
  onNext: () => void;
}

export default function ReasonsGame({ onNext }: ReasonsGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 1. قراءة المفضلات من LocalStorage عند تحميل الصفحة أول مرة
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const savedFavs = localStorage.getItem("shahad_favorite_reasons");
      return savedFavs ? JSON.parse(savedFavs) : [];
    }
    return [];
  });

  // 2. حفظ المفضلات في LocalStorage كلما تغيرت القائمة
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "shahad_favorite_reasons",
        JSON.stringify(favorites),
      );
    }
  }, [favorites]);

  // حساب نسبة التقدم المئوية
  const progressPercentage = Math.round(
    ((currentIndex + 1) / reasons100.length) * 100,
  );

  // العرض التلقائي (Auto-Play)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && currentIndex < reasons100.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3000);
    } else if (currentIndex === reasons100.length - 1) {
      setIsAutoPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d8d", "#ff85b3", "#ffffff"],
    });
  };

  const handleNextReason = () => {
    if (currentIndex < reasons100.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (nextIdx === reasons100.length - 1) triggerConfetti();
    } else {
      onNext();
    }
  };

  const handleRandomReason = () => {
    const randomIdx = Math.floor(Math.random() * reasons100.length);
    setCurrentIndex(randomIdx);
    if (randomIdx === reasons100.length - 1) triggerConfetti();
  };

  const handleSkip10 = () => {
    const nextIdx = Math.min(currentIndex + 10, reasons100.length - 1);
    setCurrentIndex(nextIdx);
    if (nextIdx === reasons100.length - 1) triggerConfetti();
  };

  const toggleFavorite = (index: number) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((i) => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  const isLast = currentIndex === reasons100.length - 1;
  const isFav = favorites.includes(currentIndex);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 py-6 text-center px-4">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          100 سبب بيخلوني أحبك ❤️
        </h2>
        <p className="text-pink-200/80 text-sm md:text-base">
          شوفي الأسباب بالترتيب، أو اختاري سبب عشوائي، أو شغلي العرض التلقائي!
        </p>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between items-center text-xs md:text-sm font-semibold text-pink-200">
          <span>
            شهد وصلت لـ {currentIndex + 1} من {reasons100.length}
          </span>
          <span>{progressPercentage}%</span>
        </div>

        <div className="w-full h-3 bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-pink-300/20 p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-romantic-pink to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card Section */}
      <div className="w-full min-h-[220px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="w-full glass-card rounded-3xl p-8 flex flex-col items-center space-y-4 border border-romantic-pink/30 shadow-2xl relative"
          >
            {/* Favorite Button (مفتاح حفظ المفضلة) */}
            <button
              onClick={() => toggleFavorite(currentIndex)}
              className="absolute top-4 left-4 p-2.5 rounded-full bg-white/10 border border-white/20 hover:scale-110 active:scale-95 transition-all"
              title="احفظي السبب ده في المفضلات"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFav ? "fill-pink-500 text-pink-500" : "text-white/70"
                }`}
              />
            </button>

            <span className="px-4 py-1.5 rounded-full bg-romantic-pink/20 text-romantic-lightPink text-sm font-bold border border-romantic-pink/30">
              السبب رقم {currentIndex + 1}
            </span>

            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed pt-2">
              "{reasons100[currentIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Controls Bar */}
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-full backdrop-blur-md">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
            isAutoPlaying
              ? "bg-pink-500 text-white"
              : "text-pink-200 hover:bg-white/10"
          }`}
        >
          {isAutoPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          <span>{isAutoPlaying ? "إيقاف تلقائي" : "عرض تلقائي"}</span>
        </button>

        <button
          onClick={handleRandomReason}
          className="px-3 py-1.5 rounded-full text-xs font-bold text-pink-200 hover:bg-white/10 flex items-center gap-1 transition-all"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>سبب عشوائي</span>
        </button>

        <button
          onClick={handleSkip10}
          className="px-3 py-1.5 rounded-full text-xs font-bold text-pink-200 hover:bg-white/10 flex items-center gap-1 transition-all"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>نطّي 10 أسباب</span>
        </button>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <button
          onClick={handleNextReason}
          className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white flex items-center gap-2 hover:scale-105 transition-transform"
        >
          {isLast ? "خلصنا الـ 100 سبب! ❤️" : "عايزة تعرفي سبب تاني؟ ❤️"}
        </button>

        {(isLast || progressPercentage >= 50) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onNext}
            className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-romantic-pink to-purple-600 shadow-lg shadow-pink-500/20"
          >
         شفتي بحبك ليه؟ تعالي بقى نشوف التهم الموجهة ليكي يا متهمة! 🐱⚖️
          </motion.button>
        )}
      </div>
    </div>
  );
}
