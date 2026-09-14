'use client';

import React, { useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import StarField from '@/components/StarField';
import SceneTransition from '@/components/SceneTransition';

import LieDetectorLogin from '@/components/LieDetectorLogin';
import IntroScene from '@/components/IntroScene';
import StoryScene from '@/components/StoryScene';
import MemoryCard from '@/components/MemoryCard';
import MemoryGallery from '@/components/MemoryGallery';
import LoveCards from '@/components/LoveCards';
import OpenHeart from '@/components/OpenHeart';
import ReasonsGame from '@/components/ReasonsGame';
import LoveCourt from '@/components/LoveCourt';
import LoveLetters from '@/components/LoveLetters';
import SecretButton from '@/components/SecretButton';
import FinalScene from '@/components/FinalScene';
import LoveCounter from '@/components/LoveCounter';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);

  const nextScene = () => {
    setSceneIndex((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restartStory = () => {
    setSceneIndex(0);
    setIsUnlocked(false); // لإعادة قفل الموقع عند البدء من جديد
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0d0614] via-[#1a0a24] to-[#0d0614] text-white overflow-hidden font-arabic flex flex-col justify-between">
      {/* Background Live Particles & Hearts */}
      <StarField />
      <FloatingHearts intensity={sceneIndex === 5 || sceneIndex === 10 ? 'high' : 'normal'} />

      {/* Main Interactive Journey Container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!isUnlocked ? (
          /* شاشة كاشف الكذب والدخول الأولى */
          <SceneTransition sceneKey="login">
            <LieDetectorLogin
              onSuccess={() => setIsUnlocked(true)}
              correctPassword="love" 
            />
          </SceneTransition>
        ) : (
          /* مشاهد رحلة الحب كاملة */
          <>
            {sceneIndex === 0 && (
              <SceneTransition sceneKey={0}>
                <IntroScene onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 1 && (
              <SceneTransition sceneKey={1}>
                <StoryScene onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 2 && (
              <SceneTransition sceneKey={2}>
                <MemoryCard onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 3 && (
              <SceneTransition sceneKey={3}>
                <MemoryGallery onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 4 && (
              <SceneTransition sceneKey={4}>
                <LoveCards onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 5 && (
              <SceneTransition sceneKey={5}>
                <OpenHeart onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 6 && (
              <SceneTransition sceneKey={6}>
                <ReasonsGame onNext={nextScene} />
              </SceneTransition>
            )}

            {/* محكمة الحب والشقاوة */}
            {sceneIndex === 7 && (
              <SceneTransition sceneKey={7}>
                <LoveCourt onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 8 && (
              <SceneTransition sceneKey={8}>
                <LoveLetters onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 9 && (
              <SceneTransition sceneKey={9}>
                <LoveCounter onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 10 && (
              <SceneTransition sceneKey={10}>
                <SecretButton onNext={nextScene} />
              </SceneTransition>
            )}

            {sceneIndex === 11 && (
              <SceneTransition sceneKey={11}>
                <FinalScene onRestart={restartStory} />
              </SceneTransition>
            )}
          </>
        )}
      </div>

      {/* Subdued Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-pink-200/40 font-light">
        صُنع بكل حب ❤️ من أجل أغلى الناس
      </footer>
    </main>
  );
}