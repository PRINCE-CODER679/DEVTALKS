import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';

const SCENES = [
  {
    id: 'broadcast-init',
    type: 'video',
    src: '/devtalks-intro.mp4',
    duration: 6500,
  },
  {
    id: 'guess-speaker-01',
    type: 'image',
    src: '/guess-speaker-1.jpg',
    duration: 4200,
  },
  {
    id: 'guess-speaker-02',
    type: 'image',
    src: '/guess-speaker-2.jpg',
    duration: 4200,
  },
  {
    id: 'guess-speaker-03',
    type: 'image',
    src: '/guess-speaker-3.jpg',
    duration: 4200,
  },
  {
    id: 'mystery-council-trio',
    type: 'image',
    src: '/theme-mystery-architects.jpg',
    duration: 4500,
  },
  {
    id: 'grand-arena-climax',
    type: 'image',
    src: '/pro-stage-climax.jpg',
    duration: 4800,
  },
];

export default function IntroVideoOverlay({ onComplete }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const activeScene = SCENES[currentSceneIndex];

  // Trigger cinematic theme music as soon as video starts
  useEffect(() => {
    soundFx.startCinematicTheme();

    const handleFirstGesture = () => {
      soundFx.startCinematicTheme();
      const vid = videoRef.current;
      if (vid) {
        try {
          vid.muted = false;
          setIsMuted(false);
        } catch (e) {}
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      soundFx.stopCinematicTheme();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  useEffect(() => {
    if (activeScene.type === 'video') {
      const vid = videoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.defaultMuted = true;
        vid.muted = isMuted;
        vid.play().catch(() => {});
      }
    }

    const duration = activeScene.duration || 4500;
    timerRef.current = setTimeout(() => {
      advanceScene();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSceneIndex, isMuted]);

  const advanceScene = () => {
    soundFx.playEvidenceClick();
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleUserInteraction = () => {
    soundFx.startCinematicTheme();
    const vid = videoRef.current;
    if (vid) {
      try {
        vid.muted = false;
        vid.volume = 1.0;
        setIsMuted(false);
      } catch (e) {}
    }
  };

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    soundFx.stopCinematicTheme();
    soundFx.playCinematicImpact();
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(16px)' }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          style={{ height: '100dvh', width: '100vw' }}
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-[100dvh] min-h-[100dvh] z-[9999] bg-[#080808] flex items-center justify-center select-none overflow-hidden touch-none cursor-pointer"
          onClick={handleUserInteraction}
        >
          {/* ========================================================================= */}
          {/* 1. TRUE MOBILE & DESKTOP CINEMATIC FULLSCREEN MEDIA CONTAINER             */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 top-0 left-0 w-full h-full overflow-hidden bg-[#080808] flex items-center justify-center">
            <AnimatePresence mode="sync">
              {activeScene.type === 'video' ? (
                <div key={activeScene.id} className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Atmospheric Ambient Edge Fill (Prevents any black/white gaps on mobile 9:16 / 19.5:9 / 20:9) */}
                  <motion.video
                    src={activeScene.src}
                    autoPlay
                    muted={isMuted}
                    defaultMuted
                    preload="auto"
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.65 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover object-center filter blur-3xl scale-125 saturate-150 contrast-125 opacity-70 pointer-events-none md:hidden"
                  />

                  {/* Main Sharp Video Layer (Preserves crisp aspect ratio without excessive cropping on mobile) */}
                  <motion.video
                    ref={videoRef}
                    src={activeScene.src}
                    autoPlay
                    muted={isMuted}
                    defaultMuted
                    preload="auto"
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="relative z-10 w-full h-full max-h-[100dvh] object-contain sm:object-cover object-center filter contrast-125 brightness-105 saturate-140 hue-rotate-[-15deg] sepia-[0.2] drop-shadow-[0_0_40px_rgba(255,85,0,0.3)]"
                  />
                </div>
              ) : (
                <div key={activeScene.id} className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Atmospheric Ambient Edge Fill (Eliminates gaps on vertical mobile viewports) */}
                  <motion.img
                    src={activeScene.src}
                    alt=""
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover object-center filter blur-3xl scale-125 saturate-150 contrast-125 opacity-70 pointer-events-none md:hidden"
                  />

                  {/* Main Sharp Keynote Mystery Scene (Preserves full composition & mystery silhouettes) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full h-full max-h-[100dvh] flex items-center justify-center"
                  >
                    <img
                      src={activeScene.src}
                      alt="Mystery Keynote Reveal"
                      className="w-full h-full object-contain sm:object-cover object-center filter contrast-120 brightness-100 saturate-125 drop-shadow-[0_0_50px_rgba(255,85,0,0.35)]"
                    />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* ========================================================================= */}
          {/* 2. CINEMATIC LIGHTING & AMBIENT EFFECTS (NO TEXT)                         */}
          {/* ========================================================================= */}

          {/* Sweeping Anamorphic Solar Light Streak on Transition */}
          <motion.div
            key={`flare-${currentSceneIndex}`}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: [0, 0.65, 0], x: '100%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent skew-x-12 pointer-events-none mix-blend-screen z-20"
          />

          {/* Floating Solar Ember Sparks / Stardust Drift */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 19) % 100}vw`,
                  y: `${((i * 23) % 100) + 20}vh`,
                  opacity: 0.2 + ((i % 5) * 0.15),
                  scale: 0.6 + ((i % 4) * 0.3),
                }}
                animate={{
                  y: ['0vh', '-30vh'],
                  x: [`${(i * 19) % 100}vw`, `${((i * 19) % 100) + (i % 2 === 0 ? 6 : -6)}vw`],
                  opacity: [0.3, 0.8, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + (i % 4),
                  ease: 'linear',
                  delay: i * 0.2,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#FFAA00] shadow-[0_0_8px_#FF5500]"
              />
            ))}
          </div>

          {/* Continuous Warm Solar Orange Lens Flare & Ambient Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.22)_0%,rgba(255,170,0,0.08)_45%,transparent_80%)] mix-blend-screen pointer-events-none z-10" />

          {/* Subtle Warm Amber Anamorphic Edge Haze */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,85,0,0.06)_0%,transparent_15%,transparent_85%,rgba(255,85,0,0.08)_100%)] pointer-events-none z-10" />

          {/* Deep Charcoal Noir Cinematic Edge Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,8,8,0.75)_100%)] pointer-events-none z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
