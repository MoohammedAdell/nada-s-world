'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  type: 'heart' | 'star' | 'sparkle';
  color: string;
}

export default function FloatingHearts({ intensity = 'normal' }: { intensity?: 'normal' | 'high' }) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const count = intensity === 'high' ? 45 : 25;
    const colors = ['#ff4d8d', '#ff85b3', '#ff2a75', '#ffd1dc', '#ffffff'];
    
    const newElements: FloatingElement[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage width
      size: Math.random() * 20 + 10, // px
      duration: Math.random() * 12 + 10, // seconds
      delay: Math.random() * 10, // seconds
      opacity: Math.random() * 0.6 + 0.2,
      rotate: Math.random() * 360,
      type: i % 4 === 0 ? 'star' : i % 7 === 0 ? 'sparkle' : 'heart',
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setElements(newElements);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute bottom-[-50px]"
          style={{
            left: `${el.x}%`,
            opacity: el.opacity,
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [
              '0px',
              `${Math.sin(el.id) * 40}px`,
              `${Math.cos(el.id) * -40}px`,
              '0px',
            ],
            rotate: [el.rotate, el.rotate + 180, el.rotate + 360],
            opacity: [0, el.opacity, el.opacity, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'linear',
          }}
        >
          {el.type === 'heart' && (
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              fill={el.color}
              className="drop-shadow-[0_0_8px_rgba(255,77,141,0.5)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {el.type === 'star' && (
            <div
              style={{
                width: el.size / 2,
                height: el.size / 2,
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: `0 0 10px 2px ${el.color}`,
              }}
            />
          )}
          {el.type === 'sparkle' && (
            <span
              style={{
                color: el.color,
                fontSize: `${el.size}px`,
                textShadow: `0 0 10px ${el.color}`,
              }}
            >
              ✦
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
