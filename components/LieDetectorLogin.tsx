"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Lock, Unlock, Sparkles, CheckCircle2, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface LieDetectorLoginProps {
  onSuccess: () => void;
  correctPassword?: string;
}

export default function LieDetectorLogin({
  onSuccess,
  correctPassword = "love", 
}: LieDetectorLoginProps) {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "result">(
    "idle",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  // بدء عملية الفحص الوهمي
  const handleStartScan = () => {
    if (scanState !== "idle") return;
    setScanState("scanning");

    setTimeout(() => {
      setScanState("result");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff4d8d", "#ff85b3", "#ffffff"],
      });
    }, 3000);
  };

  // التحقق من كلمة السر
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === correctPassword.toLowerCase()) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-6 py-8 text-center px-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>نظام التأمين الرومانسي الفائق 🔒✨</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          كاشف البصمة الرومانسي 🔮
        </h2>
        <p className="text-pink-200/80 text-sm">
          قبل ما تدخلي.. حطي صباعك على البصمة عشان نتأكد إنك ندا الحقيقية!
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="w-full glass-card p-8 rounded-3xl border border-pink-300/30 bg-gradient-to-b from-white/10 to-pink-500/10 shadow-2xl flex flex-col items-center space-y-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 1 & 2: Fingerprint Scanning */}
          {scanState !== "result" ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center space-y-6 w-full"
            >
              <div className="relative flex items-center justify-center">
                {/* Scanner Outer Glow & Pulse */}
                <div
                  className={`absolute w-32 h-32 rounded-full border-2 border-pink-400/40 ${
                    scanState === "scanning" ? "animate-ping opacity-75" : ""
                  }`}
                />

                {/* Fingerprint Button */}
                <motion.button
                  whileHover={{ scale: scanState === "idle" ? 1.05 : 1 }}
                  whileTap={{ scale: scanState === "idle" ? 0.95 : 1 }}
                  onClick={handleStartScan}
                  disabled={scanState === "scanning"}
                  className={`relative z-10 w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all ${
                    scanState === "scanning"
                      ? "border-pink-400 bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/50"
                      : "border-white/30 bg-white/10 text-white/80 hover:border-pink-400 hover:text-pink-300"
                  }`}
                >
                  <Fingerprint className="w-16 h-16" />

                  {/* Laser Beam Animation during Scanning */}
                  {scanState === "scanning" && (
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_15px_#ff4d8d]"
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
              </div>

              <div className="space-y-1">
                <p className="text-base font-bold text-white">
                  {scanState === "scanning"
                    ? "جاري تحليل مشاعرك وبصمتك... ⏳"
                    : "اضغطي بسبابتك على البصمة 👆"}
                </p>
                <p className="text-xs text-pink-200/60">
                  {scanState === "scanning"
                    ? "بتقيس نسبة السكر والقططية في الدم..."
                    : "ممنوع الدخول للغرباء!"}
                </p>
              </div>
            </motion.div>
          ) : (
            /* Step 3: Verified Result & Password Form */
            <motion.div
              key="password-form"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center space-y-5 w-full"
            >
              {/* Result Badge */}
              <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/20 border border-emerald-400/30 px-4 py-1.5 rounded-full text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>البصمة مطابقة 100%!</span>
              </div>

              {/* Humorous Verification Message */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                <p className="text-sm md:text-base font-bold text-white leading-relaxed">
                  "اتضح إنك قطتي ندا الرسمية والمعتمدة للحياة! 😜❤️"
                </p>
                <p className="text-xs text-pink-200/70">
                  (التحليل أثبت كمان إنك بتحبيني أكتر ما أنا بحبك بـ 0.001% بس
                  مش هنختلف! 😂)
                </p>
              </div>

              {/* Password Input Form */}
              <form
                onSubmit={handlePasswordSubmit}
                className="w-full space-y-3 pt-2"
              >
                <div className="relative w-full flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="اكتبي كلمة السر يا ندا..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3.5 pl-12 rounded-full bg-white/10 border border-white/20 text-white placeholder-pink-200/50 text-center text-sm focus:outline-none focus:border-pink-400 transition-all"
                  />
                  
                  {/* Lock Button to Toggle Password Visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 text-pink-300 hover:text-white transition-all active:scale-90"
                  >
                    {showPassword ? (
                      <Unlock className="w-5 h-5 text-amber-300 animate-pulse" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-400 font-semibold"
                  >
                    كلمة السر مش صح بلاش شقاوة! 🙈
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
                >
                  <span>افتحي العالم بتاعنا ✨</span>
                  <Heart className="w-4 h-4 fill-white" />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}