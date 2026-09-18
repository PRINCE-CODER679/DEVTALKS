import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const isFinishedRef = useRef(false);

  // Safely unmute audio and ensure video is playing
  const unmuteAndPlay = useCallback(() => {
    const vid = videoRef.current;
    if (vid && !isFinishedRef.current) {
      vid.muted = false;
      vid.volume = 1.0;
      setIsMuted(false);
      
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If unmuted playback is rejected, fallback to muted
          if (vid && !isFinishedRef.current) {
            vid.muted = true;
            setIsMuted(true);
            vid.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  // Initialize playback on mount
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Start video playback immediately (muted ensures 100% mobile autoplay success)
    vid.currentTime = 0;
    const playPromise = vid.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Try to unmute immediately if browser policy allows
          try {
            vid.muted = false;
            setIsMuted(false);
          } catch (e) {
            vid.muted = true;
            setIsMuted(true);
          }
        })
        .catch(() => {
          // In case of initial restriction, retry muted
          if (vid) {
            vid.muted = true;
            setIsMuted(true);
            vid.play().catch(() => {});
          }
        });
    }

    // Unmute on the very first touch / interaction anywhere on the screen
    const handleFirstTouch = () => {
      unmuteAndPlay();
    };

    window.addEventListener('pointerdown', handleFirstTouch, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstTouch, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstTouch, { once: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
    };
  }, [unmuteAndPlay]);

  const handleToggleMute = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const vid = videoRef.current;
    if (vid) {
      if (vid.muted) {
        unmuteAndPlay();
      } else {
        vid.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleScreenTouch = () => {
    const vid = videoRef.current;
    if (!vid || isFinishedRef.current) return;

    // If currently muted, tapping anywhere unmutes
    if (vid.muted) {
      unmuteAndPlay();
    } else if (vid.paused) {
      vid.play().catch(() => {});
    }
  };

  const handleFinish = () => {
    if (isFinishedRef.current || isExiting) return;
    isFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (isExiting) return null;

  return (
    <div 
      className="fixed inset-0 w-full h-full min-h-[100dvh] bg-[#080808] z-[999999] overflow-hidden flex items-center justify-center select-none cursor-pointer"
      onClick={handleScreenTouch}
      onTouchStart={handleScreenTouch}
      role="region"
      aria-label="DEVTALKS Official Teaser Intro"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,90,31,0.12)_0%,_rgba(8,8,8,0.95)_70%)] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* CINEMATIC VIDEO (SINGLE HARDWARE-ACCELERATED DECODER STREAM)             */}
      {/* ========================================================================= */}
      <video
        ref={videoRef}
        src="/official-teaser.mp4"
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onEnded={handleFinish}
        className="w-full h-full max-w-[100vw] max-h-[100dvh] object-contain sm:object-cover pointer-events-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]"
      />

      {/* ========================================================================= */}
      {/* MINIMAL OVERLAY CONTROLS (UNMUTE AUDIO & ENTER SITE BUTTON)               */}
      {/* ========================================================================= */}
      <div 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Audio Toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="px-3.5 py-1.5 rounded-full bg-[#080808]/85 hover:bg-[#080808] border border-white/15 hover:border-[#ff5a1f] text-[#f4f0e8] font-mono text-[11px] font-bold tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer flex items-center gap-1.5 shadow-xl active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#ff8a3d]" />
              <span className="text-[#ff8a3d]">UNMUTE</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span className="text-[#f4f0e8]">SOUND ON</span>
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
          className="px-4 py-1.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-display font-black text-[11px] tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,90,31,0.35)] cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
        >
          <span>ENTER SITE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
