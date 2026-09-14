"use client";

import React from "react";
import { motion } from "framer-motion";
import { loveCards } from "@/data/loveStory";
import { Smile, Sparkles, HeartHandshake, Eye, Sun } from "lucide-react";

interface LoveCardsProps {
  onNext: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-7 h-7 text-romantic-pink" />,
  Sparkles: <Sparkles className="w-7 h-7 text-romantic-pink" />,
  HeartHandshake: <HeartHandshake className="w-7 h-7 text-romantic-pink" />,
  Eye: <Eye className="w-7 h-7 text-romantic-pink" />,
  Sun: <Sun className="w-7 h-7 text-romantic-pink" />,
};

export default function LoveCards({ onNext }: LoveCardsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-10 py-6">
      <div className="text-center space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold text-white"
        >
          عارفة إيه أكتر حاجات بحبها فيكي؟ ❤️
        </motion.h2>

        <p className="text-pink-200/80 text-sm md:text-base">
          تأملي التفاصيل دي، لأن كل واحدة فيهم حقيقية وبتعبر عن قلبي.
        </p>
      </div>

      <div className="w-full space-y-5">
        {loveCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5 hover:border-romantic-pink/50 transition-colors"
          >
            <div className="p-3 bg-romantic-pink/10 rounded-xl border border-romantic-pink/30 shrink-0">
              {iconMap[card.iconName] || (
                <Sparkles className="w-7 h-7 text-romantic-pink" />
              )}
            </div>

            <div className="space-y-1 text-right">
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
              <p className="text-pink-100/80 text-sm md:text-base leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white flex items-center gap-2 mt-6"
      >
        <span>الخطوة اللي جاية.. افتحي قلبي ❤️</span>
      </motion.button>
    </div>
  );
}
