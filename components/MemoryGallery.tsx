"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  image: string;
  rotation?: number;
}

// ألبوم الصور المجمع
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "خروجة المكان المفضل ☕",
    caption: "أيام وأوقات رايقة سوا",
    image: "/images/m1.jpg",
    rotation: -3,
  },
  {
    id: 2,
    title: "لحظات مميزة ✨",
    caption: "ضحك من القلب وذكريات ما تتنساش",
    image: "/images/m2.jpg",
    rotation: 2,
  },
  {
    id: 3,
    title: "أجمل أوقاتنا 💖",
    caption: "كل تفصيلة صغيرة معاكي ليها طعم تاني",
    image: "/images/m3.jpg",
    rotation: -2,
  },
  {
    id: 4,
    title: "عفوية وضحك 🤪",
    caption: "اللحظات الحلوة اللي بنكون فيها على طبيعتنا",
    image: "/images/h1.jpg",
    rotation: 4,
  },
  {
    id: 5,
    title: "ابتسامة زرقا 🌸",
    caption: "ذكريات متسجلة بالفرحة",
    image: "/images/h2.jpg",
    rotation: -4,
  },
  {
    id: 6,
    title: "فصلة وطاقة إيجابية ✨",
    caption: "يوم كان كله ضحك من القلب",
    image: "/images/h3.jpg",
    rotation: 3,
  },
];

interface MemoryGalleryProps {
  onNext: () => void;
}

export default function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-10 py-6 px-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-romantic-lightPink text-sm font-semibold tracking-wider px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
        >
          ذكريات مسجلة بحب ❤️
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-white"
        >
          ألبوم صورنا 📸✨
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-pink-200/80 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed"
        >
          كل صورة هنا شايلة ذكرى وموقف حلو جمعنا.. اضغطي على أي صورة عشان تشوفيها بحجم أكبر!
        </motion.p>
      </div>

      {/* Creative Photo Grid Container */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full py-4"
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0, 
              zIndex: 20,
              transition: { duration: 0.3 }
            }}
            style={{ rotate: `${item.rotation || 0}deg` }}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer glass-card p-4 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center group relative overflow-hidden transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

            {/* Photo Container */}
            <div className="w-full h-64 rounded-2xl overflow-hidden relative mb-4 bg-black/40 border border-white/10">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* Text Info */}
            <div className="text-center space-y-1 z-10">
              <h3 className="text-white font-bold text-base md:text-lg">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-pink-200/70 font-light line-clamp-1">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card border border-white/20 p-4 md:p-6 rounded-3xl max-w-2xl w-full flex flex-col items-center space-y-4 relative overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 z-30 text-white/80 hover:text-white text-sm w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-all border border-white/10"
              >
                ✕
              </button>

              {/* Image Window */}
              <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Text Info */}
              <div className="text-center space-y-1.5 pt-2">
                <h3 className="text-xl font-bold text-white">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-pink-200/80 font-light">
                  {selectedItem.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Step Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="glass-button px-8 py-4 rounded-full text-base md:text-lg font-bold text-white flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl shadow-pink-500/20 mt-4 border border-white/20 transition-all"
      >
        <span>ادخلي على المفاجأة التالية ❤️</span>
      </motion.button>
    </div>
  );
}