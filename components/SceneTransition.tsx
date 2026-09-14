'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SceneTransitionProps {
  children: React.ReactNode;
  sceneKey: string | number;
}

export default function SceneTransition({ children, sceneKey }: SceneTransitionProps) {
  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-8"
    >
      {children}
    </motion.div>
  );
}
