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

    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleUserInteraction = () => {
    const video = videoRef.current;
    if (video) {
      soundFx.initContext();
      // Safely unmute on direct user click without interrupting playback
      try {
        video.muted = false;
        video.volume = 1.0;
      } catch (e) {}
    }
  };

  useEffect(() => {
    startPlayback();

    // Safe recovery watchdog: check if video was accidentally paused and resume smoothly
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (video && video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    }, 200);

    // Only direct clicks / taps unlock sound safely (no passive mousemove triggers)
    const handleSafeAudioUnlock = () => {
      handleUserInteraction();
    };

    window.addEventListener('click', handleSafeAudioUnlock, { once: true });
    window.addEventListener('touchstart', handleSafeAudioUnlock, { once: true });
    window.addEventListener('keydown', handleSafeAudioUnlock, { once: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleSafeAudioUnlock);
      window.removeEventListener('touchstart', handleSafeAudioUnlock);
      window.removeEventListener('keydown', handleSafeAudioUnlock);
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
          className="fixed inset-0 w-screen h-[100dvh] z-[9999] bg-black flex items-center justify-center select-none overflow-hidden touch-none cursor-pointer"
          onClick={handleUserInteraction}
        >
          {/* 100% Full-Screen Cinematic Intro Video (Edge-to-Edge Fill on Mobile, Tablet & Desktop) */}
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
            onWaiting={startPlayback}
            onStalled={startPlayback}
            onEnded={handleFinish}
            onError={handleFinish}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
