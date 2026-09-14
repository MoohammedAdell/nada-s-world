'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Moon, Sun, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IntroSceneProps {
  onNext: () => void;
}

export default function IntroScene({ onNext }: IntroSceneProps) {
  const [salawatCount, setSalawatCount] = useState(0);

  // إطلاق التأثير عند إتمام التسبيح 3 مرات
  const handleSalawat = () => {
    if (salawatCount < 3) {
      const nextCount = salawatCount + 1;
      setSalawatCount(nextCount);
      
      if (nextCount === 3) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ffd700', '#ff85b3', '#ffffff'],
        });
      }
    }
  };

  return (
    <div className="text-center max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 min-h-[75vh] px-4 my-auto relative">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-300/30 backdrop-blur-md text-amber-200 text-xs md:text-sm font-semibold"
      >
        <Moon className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>افتتاحية بالبركة والخير ✨</span>
      </motion.div>

      {/* Main Verse Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full glass-card p-6 md:p-8 rounded-3xl border border-pink-300/30 bg-gradient-to-b from-white/10 via-pink-500/5 to-purple-500/10 shadow-2xl space-y-4"
      >
        {/* Quranic Verse */}
        <div className="space-y-2">
          <p className="text-amber-200 text-xl md:text-2xl font-serif font-bold tracking-wide">
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
          </p>
          <p className="text-xs text-pink-200/60 font-serif">[سورة الروم: 21]</p>
        </div>

        <hr className="border-white/10 my-4" />

        {/* Romantic & Spiritual Message */}
        <div className="space-y-3 text-pink-100 font-light leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            الحمد لله الذي رزقني حبك يا ندا ❤️
          </h2>
          <p className="text-sm md:text-base text-pink-100/90">
            أجمل ما في الحب إنه يكون نِعمة من ربنا، وأول حاجة حبّيت أبدأ بيها المكان الخاص بنا هي شكر ربنا والدعاء ليكي.
          </p>
          
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 italic text-amber-100 text-xs md:text-sm">
            "اللهم إني أسألك أن تحفظ لي ندا، وتديم بيننا المودة والرحمة، وتجعل أيامنا كلها بركة ونور وسعادة." 🤲✨
          </div>
        </div>
      </motion.div>

      {/* Interactive Step: Salawat Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-sm flex flex-col items-center space-y-3"
      >
        <button
          onClick={handleSalawat}
          disabled={salawatCount >= 3}
          className={`w-full py-3 px-6 rounded-2xl border transition-all duration-300 flex items-center justify-between text-sm ${
            salawatCount === 3
              ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
              : 'bg-white/10 border-white/20 text-pink-200 hover:bg-white/15'
          }`}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            {salawatCount === 3
              ? 'اللهم صلِّ وسلم على سيدنا محمد ✨'
              : 'صلي على النبي قبل ما تدخلي ❤️'}
          </span>
          
          <span className="font-bold bg-white/20 px-3 py-1 rounded-full text-xs">
            {salawatCount} / 3
          </span>
        </button>

        {/* Enter Button (Appears or Highlights after Salawat) */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full pt-2"
          >
            <button
              onClick={onNext}
              className={`w-full py-4 rounded-full text-lg font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                salawatCount === 3
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-pink-500/40 hover:scale-105'
                  : 'bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:opacity-90'
              }`}
            >
              <span>{salawatCount === 3 ? 'قولي آمين وادخلي عالمنا ✨' : 'ادخلي عالمنا ❤️'}</span>
              <Heart className="w-5 h-5 fill-white animate-bounce" />
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}