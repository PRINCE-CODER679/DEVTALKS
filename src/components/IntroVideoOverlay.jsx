import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  const startPlayback = () => {
    [videoRef.current, bgVideoRef.current].forEach((video) => {
      if (!video) return;
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    });
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
    startPlayback();

    // Watchdog check every 150ms for instant play
    const timer = setInterval(() => {
      if (videoRef.current && videoRef.current.paused) {
        startPlayback();
      }
    }, 150);

    // Audio unlock gesture listeners
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
          className="fixed inset-0 w-screen h-[100dvh] z-[9999] bg-[#000000] flex items-center justify-center select-none overflow-hidden touch-none"
          onClick={enableAudio}
        >
          {/* Ambient Blurred Red Cyber Light Backdrop for Mobile Screens */}
          <div className="absolute inset-0 overflow-hidden filter blur-3xl opacity-35 scale-125 pointer-events-none">
            <video
              ref={(el) => {
                if (el) {
                  el.defaultMuted = true;
                  el.muted = true;
                  el.playsInline = true;
                  el.play().catch(() => {});
                }
                bgVideoRef.current = el;
              }}
              src="/devtalks-intro.mp4"
              autoPlay
              muted
              defaultMuted
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Main Full-Fidelity Video (object-contain on Mobile prevents cropping, object-cover on Desktop) */}
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
            onError={handleFinish}
            className="relative z-10 w-full h-full max-h-[100dvh] object-contain md:object-cover object-center shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
