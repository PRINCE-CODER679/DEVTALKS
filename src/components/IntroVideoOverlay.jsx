import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';

export default function IntroVideoOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const mainVideoRef = useRef(null);
  const bgVideoRef = useRef(null);

  // Unmute and guarantee smooth playback
  const enableAudioAndPlay = useCallback(() => {
    const mainVid = mainVideoRef.current;
    if (mainVid) {
      mainVid.muted = false;
      mainVid.volume = 1.0;
      setIsMuted(false);
      setHasInteracted(true);
      const playPromise = mainVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  // Initialize playback with autoPlay & attempt unmuted sound immediately
  useEffect(() => {
    const mainVid = mainVideoRef.current;
    const bgVid = bgVideoRef.current;

    if (mainVid) {
      mainVid.currentTime = 0;
      mainVid.volume = 1.0;
      
      // Attempt to play with sound first
      mainVid.muted = false;
      const playPromise = mainVid.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Unmuted autoplay succeeded!
            setIsMuted(false);
            setHasInteracted(true);
          })
          .catch(() => {
            // Autoplay with sound restricted by browser policy: play muted and await touch/gesture
            if (mainVid) {
              mainVid.muted = true;
              setIsMuted(true);
              mainVid.play().catch(() => {});
            }
          });
      }
    }

    if (bgVid) {
      bgVid.currentTime = 0;
      bgVid.muted = true;
      bgVid.play().catch(() => {});
    }

    // Global touch/pointer listener to unmute instantly on first touch
    const handleFirstGesture = (e) => {
      enableAudioAndPlay();
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [enableAudioAndPlay]);

  // Prevent accidental pauses on touch devices: keep video playing continuously
  const handlePause = () => {
    if (!isExiting && mainVideoRef.current) {
      mainVideoRef.current.play().catch(() => {});
    }
  };

  // Sync background ambient video time with main foreground video
  const handleTimeUpdate = () => {
    const mainVid = mainVideoRef.current;
    const bgVid = bgVideoRef.current;
    if (mainVid && bgVid && Math.abs(mainVid.currentTime - bgVid.currentTime) > 0.3) {
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
      const nextMuted = !vid.muted;
      vid.muted = nextMuted;
      if (!nextMuted) {
        vid.volume = 1.0;
        vid.play().catch(() => {});
      }
      setIsMuted(nextMuted);
      setHasInteracted(true);
    }
  };

  const handleWrapperTouch = (e) => {
    // If touching anywhere on screen and video is muted, unmute it immediately without pausing
    if (isMuted) {
      enableAudioAndPlay();
    } else if (mainVideoRef.current && mainVideoRef.current.paused) {
      mainVideoRef.current.play().catch(() => {});
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
      className="intro-video-wrapper cursor-pointer"
      onClick={handleWrapperTouch}
      onTouchStart={handleWrapperTouch}
      role="region"
      aria-label="DEVTALKS Official Teaser Intro"
    >
      {/* ========================================================================= */}
      {/* 1. AMBIENT ATMOSPHERIC BACKGROUND VIDEO LAYER (ELIMINATES EMPTY BARS)     */}
      {/* ========================================================================= */}
      <video
        ref={bgVideoRef}
        src="/official-teaser.mp4"
        autoPlay
        muted
        preload="auto"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        className="intro-bg-ambient-video pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. SHARP FOREGROUND CINEMATIC VIDEO (100% UN-CROPPED TEXT & VISUALS)      */}
      {/* ========================================================================= */}
      <video
        ref={mainVideoRef}
        src="/official-teaser.mp4"
        autoPlay
        preload="auto"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        onError={handleFinish}
        className="intro-main-focused-video pointer-events-none"
      />

      {/* ========================================================================= */}
      {/* 3. MINIMAL OVERLAY CONTROLS (UNMUTE AUDIO & SKIP BUTTON)                  */}
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
              <VolumeX className="w-3.5 h-3.5 text-[#ff8a3d] animate-pulse" />
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

      {/* ========================================================================= */}
      {/* 4. TAP ANYWHERE FOR SOUND PROMPT (DISAPPEARS ONCE AUDIO IS ACTIVE)       */}
      {/* ========================================================================= */}
      {isMuted && !hasInteracted && (
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-bounce"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080808]/90 border border-[#ff5a1f]/60 text-[#f4f0e8] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,90,31,0.4)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-ping" />
            <span>🔊 TAP ANYWHERE TO UNMUTE AUDIO</span>
          </div>
        </div>
      )}
    </div>
  );
}
