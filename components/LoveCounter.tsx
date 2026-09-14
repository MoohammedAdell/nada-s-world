'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LoveCounterProps {
  onNext: () => void;
}

export default function LoveCounter({ onNext }: LoveCounterProps) {
  // تاريخ البداية: 28 مارس 2022
  const START_DATE = new Date('2022-03-28T00:00:00');

  const [timePassed, setTimePassed] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = now.getTime() - START_DATE.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimePassed({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'يوم', value: timePassed.days },
    { label: 'ساعة', value: timePassed.hours },
    { label: 'دقيقة', value: timePassed.minutes },
    { label: 'ثانية', value: timePassed.seconds },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-8 py-6 text-center px-4">
      {/* Header */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-romantic-lightPink text-xs md:text-sm font-semibold"
        >
          <Clock className="w-4 h-4 text-pink-400 animate-spin-slow" />
          <span>منذ 28 مارس 2022</span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          رحلتنا سوا لحظة بلحظة ⏳❤️
        </h2>
        
        <p className="text-pink-200/80 text-sm md:text-base max-w-md mx-auto">
          كل ثانية بتعدي وأنتي معايا في حياتي هي مكسب وفرحة لقلبي يا قطتي شهد...
        </p>
      </div>

      {/* Live Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5 rounded-3xl border border-white/20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-b from-white/10 to-pink-500/10 shadow-2xl relative overflow-hidden"
          >
            {/* إضاءة خلفية ناعمة */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-500/20 rounded-full blur-xl pointer-events-none" />

            <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-300 tracking-tight">
              {unit.value}
            </span>
            <span className="text-xs md:text-sm font-bold text-pink-200/80">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Romantic Message Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8 rounded-3xl border border-pink-300/30 max-w-2xl w-full text-center space-y-4 bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-pink-900/30 shadow-2xl relative"
      >
        <div className="flex items-center justify-center gap-2 text-pink-300">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <Heart className="w-6 h-6 fill-pink-500 text-pink-500 animate-bounce" />
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <p className="text-white text-base md:text-lg font-medium leading-relaxed">
          "الأرقام دي مش مجرد أيام وساعات بتعدي.. دي أجمل أوقات عشتها في حياتي، وكل يوم بيكبر حبي لقطتي شهد أكتر من اليوم اللي قبله."
        </p>

        <span className="inline-block text-xs text-pink-300/80 font-semibold pt-2 border-t border-white/10 w-full">
          والعداد لسه بيعد أحلى الأيام مع بعض ✨
        </span>
      </motion.div>

      {/* Next Step Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl shadow-pink-500/20 mt-4"
      >
        <span>المفاجأة اللي بعد كده 👀 ❤️</span>
      </motion.button>
    </div>
  );
}