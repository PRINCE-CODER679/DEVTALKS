import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Force retry with muted DOM property
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  };

  const enableAudio = () => {
    soundFx.initContext();
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    // 1. Immediate play on mount
    startPlayback();

    // 2. Continuous watchdog check: ensure video is playing within 300ms without needing any click
    const timer = setInterval(() => {
      if (videoRef.current && videoRef.current.paused) {
        startPlayback();
      }
    }, 150);

    // 3. User interaction listener for audio unmuting
    const handleGesture = () => {
      enableAudio();
    };

    window.addEventListener('pointerdown', handleGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleGesture, { once: true, passive: true });
    window.addEventListener('mousemove', handleGesture, { once: true, passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('mousemove', handleGesture);
    };
  }, []);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    soundFx.playCinematicImpact();
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 w-screen h-[100dvh] z-[9999] bg-black flex items-center justify-center select-none overflow-hidden"
          onClick={enableAudio}
        >
          {/* Direct Autoplay Fullscreen Video */}
          <video
            ref={(el) => {
              if (el) {
                el.defaultMuted = true;
                el.muted = true;
                el.playsInline = true;
                el.play().catch(() => {});
              }
              videoRef.current = el;
            }}
            src="/devtalks-intro.mp4"
            autoPlay
            muted
            defaultMuted
            preload="auto"
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            onCanPlay={startPlayback}
            onLoadedData={startPlayback}
            onEnded={handleFinish}
            onError={() => {
              handleFinish();
            }}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
