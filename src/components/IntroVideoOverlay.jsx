import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const mainVideoRef = useRef(null);
  const bgVideoRef = useRef(null);

  // Initialize playback with autoPlay & sound unlock
  useEffect(() => {
    const mainVid = mainVideoRef.current;
    const bgVid = bgVideoRef.current;

    if (mainVid) {
      mainVid.currentTime = 0;
      mainVid.muted = true;
      mainVid.defaultMuted = true;
      const playPromise = mainVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          mainVid.muted = true;
          mainVid.play().catch(() => {});
        });
      }
    }

    if (bgVid) {
      bgVid.currentTime = 0;
      bgVid.muted = true;
      bgVid.defaultMuted = true;
      bgVid.play().catch(() => {});
    }

    // First user interaction immediately un-mutes with full audio without pausing
    const unlockAudio = () => {
      const v = mainVideoRef.current;
      if (v) {
        v.muted = false;
        v.volume = 1.0;
        setIsMuted(false);
      }
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Sync background ambient video time with main foreground video
  const handleTimeUpdate = () => {
    const mainVid = mainVideoRef.current;
    const bgVid = bgVideoRef.current;
    if (mainVid && bgVid && Math.abs(mainVid.currentTime - bgVid.currentTime) > 0.25) {
      bgVid.currentTime = mainVid.currentTime;
    }
  };

  const handleToggleMute = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const vid = mainVideoRef.current;
    if (vid) {
      vid.muted = !vid.muted;
      setIsMuted(vid.muted);
    }
  };

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  };

  if (isExiting) return null;

  return (
    <div className="intro-video-wrapper">
      {/* ========================================================================= */}
      {/* 1. AMBIENT ATMOSPHERIC BACKGROUND VIDEO LAYER (ELIMINATES EMPTY BARS)     */}
      {/* ========================================================================= */}
      <video
        ref={bgVideoRef}
        src="/official-teaser.mp4"
        autoPlay
        muted
        defaultMuted
        preload="auto"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        className="intro-bg-ambient-video"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. SHARP FOREGROUND CINEMATIC VIDEO (100% UN-CROPPED TEXT & VISUALS)      */}
      {/* ========================================================================= */}
      <video
        ref={mainVideoRef}
        src="/official-teaser.mp4"
        autoPlay
        muted
        defaultMuted
        preload="auto"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        onError={handleFinish}
        className="intro-main-focused-video"
      />

      {/* ========================================================================= */}
      {/* 3. MINIMAL OVERLAY CONTROLS (UNMUTE AUDIO & SKIP BUTTON)                  */}
      {/* ========================================================================= */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5 pointer-events-auto">
        {/* Audio Toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/95 border border-white/25 hover:border-[#FF5500] text-white font-mono text-[11px] font-bold tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer flex items-center gap-1.5 shadow-xl"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="text-neutral-300">UNMUTE</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#FFAA00]" />
              <span className="text-white">SOUND ON</span>
            </>
          )}
        </button>

        {/* Skip / Enter Site Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="px-4 py-1.5 rounded-full bg-[#FF5500] hover:bg-[#FF6A00] text-white font-display font-black text-[11px] tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,85,0,0.6)] cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
        >
          <span>ENTER SITE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
