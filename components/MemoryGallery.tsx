"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// أنواع البيانات المحدثة
export interface GalleryMedia {
  type: "image" | "video";
  url: string;
}

export interface GalleryItem {
  id: number;
  category: "memories" | "fun" | "videos";
  title: string;
  caption: string;
  thumbnail: string;
  rotation?: number;
  media: GalleryMedia[]; // مجموعة صور أو فيديوهات داخل الكارت الواحد
}

// بيانات الميديا المقترحة
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "memories",
    title: "خروجة المكان المفضل ☕",
    caption: "ألبوم صور للقعدة الحلوة ورايقة معاكي يا شهودة",
    thumbnail: "/images/m9.jpeg",
    rotation: -2,
    media: [
      { type: "image", url: "/images/memory1.jpeg" },
      { type: "image", url: "/images/m2.jpeg" },
      { type: "image", url: "/images/m4.jpeg" },
      { type: "image", url: "/images/m5.jpeg" },
      { type: "image", url: "/images/m6.jpeg" },
      { type: "image", url: "/images/m7.jpeg" },
      { type: "image", url: "/images/m8.jpeg" },
      { type: "image", url: "/images/m9.jpeg" },
      { type: "image", url: "/images/m10.jpeg" },
      { type: "image", url: "/images/m11.jpeg" },
      { type: "image", url: "/images/m12.jpeg" },
    ],
  },
  {
    id: 2,
    category: "fun",
    title: "لحظات الهبل والضحك 🤪",
    caption: "صور الحركة العفوية والتكشيرات العجيبة اللي بنعملها",
    thumbnail: "/images/h1.jpeg",
    rotation: 3,
    media: [
      { type: "image", url: "/images/h1.jpeg" },
      { type: "image", url: "/images/h2.jpeg" },
      { type: "image", url: "/images/h3.jpeg" },
      { type: "image", url: "/images/h4.jpeg" },
      { type: "image", url: "/images/h5.jpeg" },
      { type: "image", url: "/images/h6.jpeg" },
      { type: "image", url: "/images/h7.jpeg" },
      { type: "image", url: "/images/h8.jpeg" },
      { type: "image", url: "/images/h9.jpeg" },
      { type: "image", url: "/images/h10.jpeg" },
    ],
  },
  {
    id: 3,
    category: "videos",
    title: "فيديوهات عســل  🎥",
    caption: "ذكريات بالفيديو واحنا بنضحك وبنستعبط سوا",
    thumbnail: "/images/2.jpeg",
    rotation: -1,
    media: [
      { type: "video", url: "/videos/v1.mp4" },
      { type: "video", url: "/videos/v2.mp4" },
      { type: "video", url: "/videos/v3.mp4" },
      { type: "video", url: "/videos/v4.mp4" },
      { type: "video", url: "/videos/v5.mp4" },
      { type: "video", url: "/videos/v6.mp4" },
      { type: "video", url: "/videos/v7.mp4" },
      { type: "video", url: "/videos/v8.mp4" },
    ],
  },
  {
    id: 4,
    category: "memories",
    title: " أسكريناتنا 💖",
    caption: "مجموعة صور سريعة في الطريق والعربية",
    thumbnail: "/images/s1.jpeg",
    rotation: 2,
    media: [
      { type: "image", url: "/images/s1.jpeg" },
      { type: "image", url: "/images/s2.jpeg" },
      { type: "image", url: "/images/s3.jpeg" },
      { type: "image", url: "/images/s4.jpeg" },
      { type: "image", url: "/images/s5.jpeg" },
      { type: "image", url: "/images/s6.jpeg" },
      { type: "image", url: "/images/s7.jpeg" },
      { type: "image", url: "/images/s8.jpeg" },
      { type: "image", url: "/images/s9.jpeg" },
    ],
  },
];

interface MemoryGalleryProps {
  onNext: () => void;
}

export default function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "memories" | "fun" | "videos"
  >("all");

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter,
  );

  const handleOpenItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setActiveMediaIndex(0);
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem) {
      setActiveMediaIndex((prev) => (prev + 1) % selectedItem.media.length);
    }
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem) {
      setActiveMediaIndex(
        (prev) =>
          (prev - 1 + selectedItem.media.length) % selectedItem.media.length,
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-8 py-6 px-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold text-white"
        >
          ألبوم ذكريات شهد 📸✨
        </motion.h2>

        <p className="text-pink-200/80 text-sm md:text-base max-w-2xl mx-auto">
          كل كارت هنا جواه ألبوم صور وفيديوهات للحظاتنا الحلوة والهبلة سوا..
          اضغطي واكتشفي التفاصيل!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
        {[
          { id: "all", label: "الكل ✨" },
          { id: "memories", label: "ذكريات حلوة ❤️" },
          { id: "fun", label: "لحظات هبل 🤪" },
          { id: "videos", label: "فيديوهات 🎬" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              activeFilter === tab.id
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20"
                : "text-pink-200/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              style={{ rotate: `${item.rotation || 0}deg` }}
              onClick={() => handleOpenItem(item)}
              className="cursor-pointer glass-card p-4 rounded-2xl border border-white/20 shadow-xl flex flex-col items-center group relative overflow-hidden"
            >
              {/* Badge لعدد الميديا داخل الألبوم */}
              <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md text-pink-200 text-xs font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                <span>{item.media.length}</span>
                <span>
                  {item.media.some((m) => m.type === "video") ? "🎥" : "🖼️"}
                </span>
              </div>

              {/* Thumbnail Container */}
              <div className="w-full h-52 rounded-xl overflow-hidden relative mb-3 bg-black/40">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              <h3 className="text-white font-bold text-sm md:text-base text-center line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-pink-200/70 text-center line-clamp-2 mt-1">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card border border-white/20 p-4 md:p-6 rounded-3xl max-w-3xl w-full flex flex-col items-center space-y-4 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 z-30 text-white/80 hover:text-white text-lg w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-all"
              >
                ✕
              </button>

              {/* Media Display Window */}
              <div className="relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
                {selectedItem.media[activeMediaIndex].type === "image" ? (
                  <Image
                    src={selectedItem.media[activeMediaIndex].url}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    priority
                  />
                ) : (
                  <video
                    src={selectedItem.media[activeMediaIndex].url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Arrows Navigation (لو الألبوم فيه أكتر من ميديا) */}
                {selectedItem.media.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevMedia}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all"
                    >
                      →
                    </button>
                    <button
                      onClick={handleNextMedia}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all"
                    >
                      ←
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Indicator */}
              {selectedItem.media.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                  {selectedItem.media.map((med, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeMediaIndex === idx
                          ? "border-pink-500 scale-110 shadow-lg shadow-pink-500/50"
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {med.type === "image" ? (
                        <Image
                          src={med.url}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-900 flex items-center justify-center text-xs">
                          🎥
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Text Info */}
              <div className="text-center space-y-1">
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
        className="glass-button px-8 py-4 rounded-full text-lg font-bold text-white flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl shadow-pink-500/20 mt-4"
      >
        <span>ادخلي على المفاجأة التالية ❤️</span>
      </motion.button>
    </div>
  );
}
