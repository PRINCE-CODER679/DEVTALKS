import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const mainVideoRef = useRef(null);
  const ambientVideoRef = useRef(null);

  const startPlayback = () => {
    const main = mainVideoRef.current;
    const ambient = ambientVideoRef.current;

    [main, ambient].forEach((v) => {
      if (!v) return;
      v.defaultMuted = true;
      v.muted = true;
      v.playsInline = true;

      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {
          if (v) {
            v.muted = true;
            v.play().catch(() => {});
          }
        });
      }
    });
  };

  const handleUserInteraction = () => {
    const main = mainVideoRef.current;
    if (main) {
      soundFx.initContext();
      // Safely unmute main video on direct user tap / click
      try {
        main.muted = false;
        main.volume = 1.0;
      } catch (e) {}
    }
  };

  useEffect(() => {
    startPlayback();

    // Watchdog to ensure continuous playback and frame sync between ambient and main video
    const interval = setInterval(() => {
      const main = mainVideoRef.current;
      const ambient = ambientVideoRef.current;

      if (main && main.paused && !main.ended) {
        main.play().catch(() => {});
      }
      if (ambient && ambient.paused && !ambient.ended) {
        ambient.play().catch(() => {});
      }
      if (main && ambient && Math.abs(main.currentTime - ambient.currentTime) > 0.25) {
        ambient.currentTime = main.currentTime;
      }
    }, 200);

    // Direct clicks / taps unlock sound safely
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
          className="fixed inset-0 w-screen h-[100dvh] z-[9999] bg-[#000000] flex items-center justify-center select-none overflow-hidden touch-none cursor-pointer"
          onClick={handleUserInteraction}
        >
          {/* Layer 1: Glowing Atmospheric Cyber Red Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,0,40,0.3)_0%,rgba(15,0,3,0.9)_60%,#000000_100%)] pointer-events-none" />

          {/* Layer 2: Full-Bleed Ambient Synced Blurred Video (Fills 100% screen on all mobile & desktop viewports) */}
          <video
            ref={(el) => {
              if (el) {
                el.defaultMuted = true;
                el.muted = true;
                el.playsInline = true;
                el.play().catch(() => {});
              }
              ambientVideoRef.current = el;
            }}
            src="/devtalks-intro.mp4"
            autoPlay
            muted
            defaultMuted
            preload="auto"
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 filter blur-2xl opacity-50 pointer-events-none transform-gpu"
          />

          {/* Subtle Vignette Overlay for Depth */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-[5]" />

          {/* Layer 3: Crisp Foreground Video - 100% Complete Content (No Text or Speaker Silhouette is ever Cropped) */}
          <div className="relative z-10 w-full h-full max-w-full max-h-[100dvh] flex items-center justify-center p-0 md:p-2">
            <video
              ref={(el) => {
                if (el) {
                  el.defaultMuted = true;
                  el.muted = true;
                  el.playsInline = true;
                  el.play().catch(() => {});
                }
                mainVideoRef.current = el;
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
              className="w-full h-full max-w-full max-h-[100dvh] object-contain object-center drop-shadow-[0_0_35px_rgba(235,0,40,0.5)] pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
