import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, Play } from 'lucide-react';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Initialize playback with autoPlay & sound unlock
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.muted = true;
      vid.defaultMuted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            vid.muted = true;
            vid.play().catch(() => {});
          });
      }
    }

    // First user interaction immediately enables full audio
    const unlockAudio = () => {
      const v = videoRef.current;
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

  const handleToggleMute = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const vid = videoRef.current;
    if (vid) {
      vid.muted = !vid.muted;
      setIsMuted(vid.muted);
    }
  };

  const handleTogglePlay = (e) => {
    if (e) e.stopPropagation();
    const vid = videoRef.current;
    if (vid) {
      if (vid.paused) {
        vid.play();
        setIsPlaying(true);
      } else {
        vid.pause();
        setIsPlaying(false);
      }
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
    <div 
      className="intro-video-wrapper"
      onClick={handleTogglePlay}
    >
      {/* ========================================================================= */}
      {/* TRUE FULLSCREEN COVER VIDEO (100% WIDTH & 100% HEIGHT ON ALL DEVICES)     */}
      {/* ========================================================================= */}
      <video
        ref={videoRef}
        src="/official-teaser.mp4"
        autoPlay
        muted
        defaultMuted
        preload="auto"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        onEnded={handleFinish}
        onError={handleFinish}
        className="intro-video-element"
      />

      {/* Centered Play icon overlay when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none z-20">
          <div className="w-16 h-16 rounded-full bg-[#FF5500]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,85,0,0.8)]">
            <Play className="w-8 h-8 ml-1 text-white fill-white" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MINIMAL OVERLAY CONTROLS (UNMUTE & SKIP BUTTON)                           */}
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
