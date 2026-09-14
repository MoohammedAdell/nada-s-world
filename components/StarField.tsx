'use client';

import React, { useEffect, useState } from 'react';

export default function StarField() {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: `${star.duration}s`,
            boxShadow: '0 0 6px 1px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
