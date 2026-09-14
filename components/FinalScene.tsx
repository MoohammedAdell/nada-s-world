"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw, Gift } from "lucide-react";
import confetti from "canvas-confetti";

interface FinalSceneProps {
  onRestart: () => void;
}

const SURPRISE_PROMISES = [
  "🎫 كوبون: عزومة وافل/أيس كريم في أي وقت تعجبك!",
  "🎫 كوبون: خروجة في المكان اللي تختاريه من غير أي اعتراض!",
  "🎫 كوبون: مسامحة فورية في التأخير الجاي لمدة 30 دقيقة ⏰",
  "🎫 كوبون: وردة مفاجئة هتوصلك قريب جداً 🌸",
  "🎫 كوبون: يوم كامل من غير ما أزعل منك أو أقولك لأ ❤️",
];

export default function FinalScene({ onRestart }: FinalSceneProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [textIndex, setTextIndex] = useState(0);
  const [randomPromise, setRandomPromise] = useState<string | null>(null);

  const finalMessages = [
    "مش عارف المستقبل مخبيلنا إيه...",
    "بس عارف إن وجودك في حياتي من أجمل الحاجات اللي حصلتلي.",
    "إنتي مش مجرد جزء من حكايتي...",
    "إنتي أجمل حاجه فيها.",
    "بحبك ❤️",
    "— محمد",
  ];

  useEffect(() => {
    if (step === 1 && textIndex < finalMessages.length - 1) {
      const timer = setTimeout(() => {
        setTextIndex((prev) => prev + 1);
      }, 3800);
      return () => clearTimeout(timer);
    } else if (step === 1 && textIndex === finalMessages.length - 1) {
      const timer = setTimeout(() => {
        setStep(2);
        // فرقعة قلوب مكثفة في النهاية
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#ff4d8d", "#ffd700", "#ff85a1", "#ffffff"],
        });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, textIndex]);

  // اختيار وعد عشوائي
  const handleGetPromise = () => {
    const randomIndex = Math.floor(Math.random() * SURPRISE_PROMISES.length);
    setRandomPromise(SURPRISE_PROMISES[randomIndex]);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ffd700", "#ff4d8d"],
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 min-h-[75vh] text-center px-4">
      {/* Step 0: Intro */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <span className="text-6xl block animate-bounce">🌙</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            قبل ما تمشي...
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(1)}
            className="px-10 py-5 rounded-full text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 shadow-2xl shadow-pink-500/30 border border-white/20 flex items-center justify-center gap-3 mx-auto"
          >
            <span>في حاجة أخيرة ❤️</span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </motion.button>
        </motion.div>
      )}

      {/* Step 1: Animated Text Chain */}
      {step === 1 && (
        <div className="min-h-[200px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 1.2 }}
              className={`text-2xl md:text-4xl font-extrabold leading-relaxed ${
                textIndex === finalMessages.length - 1
                  ? "text-amber-300 text-xl md:text-2xl font-light italic"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-400"
              }`}
            >
              {finalMessages[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* Step 2: The Grand Finale Card */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full glass-card rounded-3xl p-6 md:p-10 border border-amber-300/30 bg-gradient-to-b from-white/10 via-pink-500/10 to-purple-950/50 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="text-6xl animate-pulse">💖</div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              هدية الختام لشهد ✨
            </h2>
            <p className="text-xs md:text-sm text-pink-200/80">
              اضغطي على الزرار تحت عشان تسحبي كارت هديتك مني !
            </p>
          </div>

          {/* Gift/Promise Drawer */}
          <div className="min-h-[70px] flex items-center justify-center">
            {randomPromise ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-sm md:text-base font-bold shadow-lg"
              >
                {randomPromise}
              </motion.div>
            ) : (
              <button
                onClick={handleGetPromise}
                className="px-6 py-3 rounded-full text-xs md:text-sm font-bold text-amber-300 bg-white/10 hover:bg-white/20 border border-amber-300/40 transition-all flex items-center gap-2 mx-auto active:scale-95"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>اسحبي كارت هديتك من هنا 🎁</span>
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <p className="text-xs text-pink-200/60">
              نعيش الحكاية اللطيفة دي من الأول تاني؟ ↻
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRestart}
              className="w-full py-4 rounded-full text-sm font-extrabold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2"
            >
              <span>ابدئي الحكاية من جديد ❤️</span>
              <RefreshCw className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
