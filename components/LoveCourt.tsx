"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel,
  Scale,
  Sparkles,
  Heart,
  Clock,
  Moon,
  Zap,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";

interface LoveCourtProps {
  onNext: () => void;
}

interface Case {
  id: number;
  title: string;
  icon: React.ReactNode;
  charge: string;
  evidence: string;
  optionA: {
    text: string;
    verdict: string;
  };
  optionB: {
    text: string;
    verdict: string;
  };
}

const CASES: Case[] = [
  {
    id: 1,
    title: "القضية رقم 101: جريمة التأخير الكارثي في الخروجات ⏰👗",
    icon: <Clock className="w-5 h-5 text-amber-300" />,
    charge:
      "المتهمة (شهد) بتقول 'أنا جاهزة وفاضلي 5 دقايق بس' بينما هي لسه بتختار الطقم أمام المراية!",
    evidence:
      "تقرير المراقبين: الانتظار وصل لـ 45 دقيقة كاملة مع استهلاك 90% من باقة الموبايل!",
    optionA: {
      text: "اعترف بالذنب.. بس الطقم كان محتاج لمسات أخيرة 🙈",
      verdict:
        "⚖️ حكم المحكمة: تخفيف العقوبة نظراً لأن الطقم كان خطير ورائع! ولكن تُغرم المتهمة بـ 'كوباية شاي مظبوطة' عند اللقاء القادم.",
    },
    optionB: {
      text: "أنا مكنتش متأخرة، زحمة الطريق والوقت هو اللي بيجري بسرعة! 😤",
      verdict:
        "⚖️ حكم المحكمة: رفض الدفع بالزحمة! التحريات أثبتت إنك كنتِ بتصوري سيلفي أمام المراية. الحكم: مصادرة الموبايل أول 10 دقايق في الخروجة!",
    },
  },
  {
    id: 2,
    title: "القضية رقم 202: نوم الطرف الآخر المفاجئ وتكبير الدماغ 😴💤",
    icon: <Moon className="w-5 h-5 text-purple-300" />,
    charge:
      "المتهم (محمد) بنام فجأة في نص الكلام وأسيب الشات شغال بينما (شهد) صاحية ومستنية أرد!",
    evidence:
      "تقرير الفحص: العثور على رسائل 'الووو رحـت فين؟' بدون رد لثاني يوم الصبح 📱💤",
    optionA: {
      text: "هسامحك المرة دي عشان عارف إنك بتتعب وتفصل شحن 🥺❤️",
      verdict:
        "⚖️ حكم المحكمة: براءة للطرف الآخر للظروف الإنسانية، مع إلزامه بإرسال فويس 'صباح الخير يا أجمل حاجة في يومي' أول ما يفتح عينيه!",
    },
    optionB: {
      text: "لازم يتحاكم! ده سيناريو بيتكرر ولازم يدفع التمن 😤",
      verdict:
        "⚖️ حكم المحكمة: إدانة الطرف الأخر بالنوم المفاجئ! يُحكم عليه بعقاب مشدد: عزومة قهوة أو أكلة حلوة كتعويض عن السهر والانتظار.",
    },
  },
  {
    id: 3,
    title: "القضية رقم 303: الشقاوة الزائدة وتضارب الأقوال 😈❤️",
    icon: <Zap className="w-5 h-5 text-pink-300" />,
    charge: "ادعاء المتهمة بإنها بتحبني أكتر بـ 0.001% بدون أدلة ملموسة!",
    evidence: "تقرير القلب: نسبة الحب متساوية ومعدية الخط الأحمر 📈🔥",
    optionA: {
      text: "موافقة إننا بنحب بعض بالتساوي خلاص ❤️",
      verdict:
        "⚖️ حكم المحكمة: إغلاق الملف بحالة صلح حبية، وإلزام الطرفين بالبقاء معاً للأبد!",
    },
    optionB: {
      text: "لا أنا أكتر وغصب عن المحكمة والقاضي كمان! 😤",
      verdict:
        "⚖️ حكم المحكمة: اهانة المحكمة بالشقاوة! الحكم: عقاب مشدد بـ 'حضن كبير جداً' لا ينتهي إلا بقرار من القاضي.",
    },
  },
];

export default function LoveCourt({ onNext }: LoveCourtProps) {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [currentVerdict, setCurrentVerdict] = useState<string | null>(null);
  const [isStrikingGavel, setIsStrikingGavel] = useState(false);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  const currentCase = CASES[currentCaseIndex];

  // اختيار الدفاع وتنفيذ ضربة المطرقة
  const handlePlead = (verdictText: string) => {
    setIsStrikingGavel(true);
    setCurrentVerdict(verdictText);

    // فرقعة بلونات وورد
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4d8d", "#ffd700", "#a855f7", "#ffffff"],
    });

    setTimeout(() => {
      setIsStrikingGavel(false);
    }, 600);
  };

  // الانتقال للقضية التالية أو إنهاء الجلسة
  const handleNextCase = () => {
    setCurrentVerdict(null);
    if (currentCaseIndex + 1 < CASES.length) {
      setCurrentCaseIndex((prev) => prev + 1);
    } else {
      setIsSessionFinished(true);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center space-y-6 py-6 px-4 text-center">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-lg shadow-amber-500/10"
      >
        <Scale className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>محكمة الحب العليا - دائرة الشقاوة ⚖️✨</span>
      </motion.div>

      {/* Main Title */}
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide">
          محاكمة القطط الرسمية 👨‍⚖️
        </h2>
        <p className="text-pink-200/80 text-xs md:text-sm">
          الرجاء الالتزام بالهدوء أثناء نظر القضايا المعروضة أمام المحكمة!
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="w-full glass-card p-6 md:p-8 rounded-3xl border border-amber-300/30 bg-gradient-to-b from-white/10 via-amber-500/5 to-purple-950/40 shadow-2xl flex flex-col items-center space-y-6 relative overflow-hidden">
        {/* Animated Gavel Overlay on Verdict */}
        <AnimatePresence>
          {isStrikingGavel && (
            <motion.div
              initial={{ scale: 2, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center space-y-2">
                <Gavel className="w-24 h-24 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
                <span className="text-2xl font-black text-amber-300 bg-black/60 px-6 py-2 rounded-full border border-amber-400/40">
                  حُكْمٌ! 🔨
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isSessionFinished ? (
          <div className="w-full space-y-5">
            {/* Progress Indicators */}
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-xs text-amber-300/80 font-bold">
                قضية {currentCaseIndex + 1} من {CASES.length}
              </span>
              <div className="flex gap-1.5">
                {CASES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentCaseIndex
                        ? "w-6 bg-amber-400"
                        : idx < currentCaseIndex
                          ? "w-2 bg-emerald-400"
                          : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Case Details Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 text-right"
              >
                {/* Case Header */}
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs md:text-sm font-bold">
                  {currentCase.icon}
                  <span>{currentCase.title}</span>
                </div>

                {/* Charge & Evidence */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <p className="text-xs text-pink-300 font-bold">
                    التهمة الموجهة:
                  </p>
                  <p className="text-sm md:text-base font-bold text-white leading-relaxed">
                    "{currentCase.charge}"
                  </p>
                  <p className="text-xs text-pink-200/60 italic pt-1 border-t border-white/10">
                    {currentCase.evidence}
                  </p>
                </div>

                {/* Verdict Section or Defense Choices */}
                {currentVerdict ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-center space-y-4"
                  >
                    <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>منطوق الحكم النهائي</span>
                    </div>
                    <p className="text-sm md:text-base font-bold text-white leading-relaxed">
                      {currentVerdict}
                    </p>
                    <button
                      onClick={handleNextCase}
                      className="w-full py-3 rounded-full text-xs md:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <span>الانتقال للقضية التالية</span>
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-2.5 pt-1">
                    <p className="text-xs text-pink-200/80 font-bold text-center">
                      اختر موقفك أو قرارك يا قاضية الجلسة! 🎤
                    </p>

                    <button
                      onClick={() => handlePlead(currentCase.optionA.verdict)}
                      className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-pink-400/50 text-xs md:text-sm font-bold text-white transition-all text-right flex items-center justify-between group active:scale-[0.98]"
                    >
                      <span>{currentCase.optionA.text}</span>
                      <Sparkles className="w-4 h-4 text-amber-300 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 mr-2" />
                    </button>

                    <button
                      onClick={() => handlePlead(currentCase.optionB.verdict)}
                      className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-pink-400/50 text-xs md:text-sm font-bold text-white transition-all text-right flex items-center justify-between group active:scale-[0.98]"
                    >
                      <span>{currentCase.optionB.text}</span>
                      <AlertCircle className="w-4 h-4 text-pink-400 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 mr-2" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Final Session Summary / Certificate */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center w-full py-2"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 p-0.5 mx-auto shadow-xl shadow-pink-500/20">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300">
                <Gavel className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">
                ختام جلسة المحاكمة! 📜❤️
              </h3>
              <p className="text-xs md:text-sm text-pink-200/90 leading-relaxed max-w-md mx-auto">
                بناءً على ما تقدم من شقاوة وتأخيرات ونوم مفاجئ وحب لا ينتهي،
                قررت المحكمة إغلاق القضايا والحكم بالمؤبد الرومانسي الشامل!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200/90 space-y-1">
              <p className="font-bold">الحكم المجمع الواجب التنفيذ فوراً:</p>
              <p>1. الشاي/القهوة عند أول لقاء ☕</p>
              <p>2. تجهيز الأوتفيت قبل الميعاد بـ 3 ساعات 👗</p>
              <p>3. الاستمرار في الحب للأبد ❤️✨</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="w-full py-4 rounded-full text-sm font-extrabold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2"
            >
              <span>موافقة على الأحكام.. كفاية قضية وندخل في المهم! 🙈❤️</span>
              <Heart className="w-4 h-4 fill-white animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
