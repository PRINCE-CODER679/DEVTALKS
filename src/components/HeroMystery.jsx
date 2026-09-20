import React, { useEffect, useRef, useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Heart, 
  ChevronDown 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

/**
 * HeroMystery - Cinematic Editorial Landing Page with Curated Assets
 * 
 * Features:
 * - Dual Image Canvas with smooth cursor/touch radial mask reveal:
 *   IMAGE 1: /hero-speaker-base.png (default mysterious silhouette)
 *   IMAGE 2: /hero-speaker-reveal.png (alternate revealed speaker with orange-red arc ring)
 * - Curated authentic visual assets from reference:
 *   1. Playful tape stickers ("GUESS WHAT?!", "THIS IS GONNA BE GOOD")
 *   2. Clean "TAKE A GUESS →" primary action
 *   3. Compact community speculation chat pills on the right
 *   4. Bottom date/venue pills & scroll prompt
 */
export default function HeroMystery({ onTakeGuess, onExploreSpeakers, onRegister, onWatchTeaser }) {
  const containerRef = useRef(null);
  const revealLayerRef = useRef(null);
  const spotlightGlowRef = useRef(null);
  const containerRectRef = useRef(null);

  // Mouse, Touch & Gyro Tracking Coordinates
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const isInitializedRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const userInteractionTimeoutRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Reveal Opacity control (0 = base silhouette only, 1 = fully active reveal)
  const revealOpacityRef = useRef(0);
  const targetOpacityRef = useRef(0);
  
  // Gyroscope tracking with smooth interpolation
  const gyroTargetRef = useRef({ x: 0, y: 0 });
  const gyroCurrentRef = useRef({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const spotlightRadiusRef = useRef(320);

  const communityComments = [
    {
      id: 1,
      user: 'the.real.fan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      text: "Bro if this is them... it's crazyyyy 🔥🔥",
      likes: '1.7k'
    },
    {
      id: 2,
      user: 'cinephile_',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      text: "No wayyy!! Is it really them? 👀",
      likes: '856'
    }
  ];

  useEffect(() => {
    // Cache container dimensions to prevent layout thrashing on touch/mouse moves
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      containerRectRef.current = rect;

      const isSmallMobile = window.innerWidth < 480;
      const isTablet = window.innerWidth >= 480 && window.innerWidth < 1024;
      
      // Responsive spotlight radius
      const radius = isSmallMobile 
        ? Math.max(180, Math.min(rect.width * 0.50, 240))
        : isTablet 
          ? 280 
          : 340;
      
      spotlightRadiusRef.current = radius;

      if (!isInitializedRef.current) {
        const initialX = rect.width * 0.5;
        const initialY = rect.height * 0.38;
        targetPosRef.current = { x: initialX, y: initialY };
        currentPosRef.current = { x: initialX, y: initialY };
        isInitializedRef.current = true;
      }
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    const handleScroll = () => {
      if (containerRef.current) {
        containerRectRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update target point relative to cached hero container bounds
    const updateTargetPosition = (clientX, clientY) => {
      let rect = containerRectRef.current;
      if (!rect || rect.width === 0) {
        if (!containerRef.current) return;
        rect = containerRef.current.getBoundingClientRect();
        containerRectRef.current = rect;
      }

      const clampedX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const clampedY = Math.max(0, Math.min(clientY - rect.top, rect.height));
      
      // If reveal is currently inactive, snap position to avoid sliding in from afar
      if (revealOpacityRef.current < 0.05) {
        currentPosRef.current = { x: clampedX, y: clampedY };
      }

      targetPosRef.current = { x: clampedX, y: clampedY };
      targetOpacityRef.current = 1;
      isUserInteractingRef.current = true;
      setHasInteracted(true);

      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
    };

    // Unified pointer events for desktop, stylus, and touchscreens
    const handlePointerMove = (e) => {
      updateTargetPosition(e.clientX, e.clientY);
    };

    const handlePointerEnter = (e) => {
      targetOpacityRef.current = 1;
      updateTargetPosition(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      targetOpacityRef.current = 0;
      isUserInteractingRef.current = false;
    };

    const handlePointerDown = (e) => {
      if (containerRef.current) {
        containerRectRef.current = containerRef.current.getBoundingClientRect();
      }
      updateTargetPosition(e.clientX, e.clientY);
    };

    // Native touch event listeners as robust fallback for all mobile browsers
    const handleTouchStart = (e) => {
      if (containerRef.current) {
        containerRectRef.current = containerRef.current.getBoundingClientRect();
      }
      if (e.touches && e.touches[0]) {
        updateTargetPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateTargetPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      userInteractionTimeoutRef.current = setTimeout(() => {
        targetOpacityRef.current = 0;
        isUserInteractingRef.current = false;
      }, 1500);
    };

    // Device Orientation / Mobile Tilt holographic parallax effect
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = (e.gamma || 0) * 2.8;
        const tiltY = ((e.beta || 0) - 45) * 2.8;
        gyroTargetRef.current = {
          x: Math.max(-90, Math.min(tiltX, 90)),
          y: Math.max(-90, Math.min(tiltY, 90))
        };
      }
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('pointermove', handlePointerMove, { passive: true });
      containerEl.addEventListener('pointerenter', handlePointerEnter, { passive: true });
      containerEl.addEventListener('pointerleave', handlePointerLeave, { passive: true });
      containerEl.addEventListener('pointerdown', handlePointerDown, { passive: true });
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      containerEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      containerEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // 60-120fps Smooth Delta-Time Motion Interpolation Loop
    const animate = (timestamp) => {
      if (!containerRef.current) return;

      // Delta time in seconds (capped at 50ms to prevent jumping after tab switch)
      const now = timestamp || performance.now();
      const dt = lastTimeRef.current ? Math.min((now - lastTimeRef.current) / 1000, 0.05) : 0.016;
      lastTimeRef.current = now;

      // Smooth gyro lerp (low-pass filter)
      gyroCurrentRef.current.x += (gyroTargetRef.current.x - gyroCurrentRef.current.x) * Math.min(dt * 8, 1);
      gyroCurrentRef.current.y += (gyroTargetRef.current.y - gyroCurrentRef.current.y) * Math.min(dt * 8, 1);

      // Smooth opacity interpolation (fades in when cursor moves on image, fades out on leave)
      const opacitySpeed = targetOpacityRef.current > revealOpacityRef.current ? 10 : 6;
      revealOpacityRef.current += (targetOpacityRef.current - revealOpacityRef.current) * (1 - Math.exp(-opacitySpeed * dt));
      const currentOpacity = revealOpacityRef.current;

      const target = targetPosRef.current;
      const current = currentPosRef.current;

      // Delta-time normalized exponential lerping for responsive cursor tracking
      const speed = 20;
      const lerp = 1 - Math.exp(-speed * dt);

      current.x += (target.x + gyroCurrentRef.current.x - current.x) * lerp;
      current.y += (target.y + gyroCurrentRef.current.y - current.y) * lerp;

      const curX = current.x.toFixed(1);
      const curY = current.y.toFixed(1);
      const radius = spotlightRadiusRef.current;

      if (revealLayerRef.current) {
        if (currentOpacity > 0.005) {
          const maskCss = `radial-gradient(circle ${radius}px at ${curX}px ${curY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)`;
          revealLayerRef.current.style.maskImage = maskCss;
          revealLayerRef.current.style.webkitMaskImage = maskCss;
          revealLayerRef.current.style.opacity = currentOpacity.toFixed(3);
        } else {
          revealLayerRef.current.style.opacity = '0';
        }
      }

      // Smooth spotlight beam glow halo
      if (spotlightGlowRef.current) {
        if (currentOpacity > 0.005) {
          const glowRadius = radius * 1.05;
          spotlightGlowRef.current.style.transform = `translate3d(${curX - glowRadius}px, ${curY - glowRadius}px, 0)`;
          spotlightGlowRef.current.style.width = `${glowRadius * 2}px`;
          spotlightGlowRef.current.style.height = `${glowRadius * 2}px`;
          spotlightGlowRef.current.style.opacity = (currentOpacity * 0.85).toFixed(3);
        } else {
          spotlightGlowRef.current.style.opacity = '0';
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (containerEl) {
        containerEl.removeEventListener('pointermove', handlePointerMove);
        containerEl.removeEventListener('pointerenter', handlePointerEnter);
        containerEl.removeEventListener('pointerleave', handlePointerLeave);
        containerEl.removeEventListener('pointerdown', handlePointerDown);
        containerEl.removeEventListener('touchstart', handleTouchStart);
        containerEl.removeEventListener('touchmove', handleTouchMove);
        containerEl.removeEventListener('touchend', handleTouchEnd);
        containerEl.removeEventListener('touchcancel', handleTouchEnd);
      }
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] max-h-[100dvh] min-h-[540px] sm:min-h-[100dvh] bg-[#070707] text-[#f4f0e8] flex flex-col justify-between pt-14 sm:pt-20 pb-2.5 sm:pb-6 px-3 sm:px-8 lg:px-12 overflow-hidden select-none touch-pan-y"
    >
      
      {/* ================= DUAL-IMAGE RADIAL REVEAL CANVAS (BACKGROUND) ================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Base Mysterious Silhouette */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src="/hero-speaker-base.png"
            alt="DEVTALKS '26 Mystery Speaker Silhouette"
            className="w-full h-full object-cover object-[center_28%] sm:object-center filter contrast-125 brightness-95"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#070707]/20 to-[#070707]/90" />
        </div>

        {/* Layer 2: Alternate Revealed Speaker (Masked with GPU Acceleration, visible only on cursor hover/drag) */}
        <div 
          ref={revealLayerRef}
          className="absolute inset-0 w-full h-full will-change-[mask-image,opacity] transform-gpu"
          style={{
            opacity: 0,
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/hero-speaker-reveal.png"
              alt="DEVTALKS '26 Speaker Revealed"
              className="w-full h-full object-cover object-[center_28%] sm:object-center filter contrast-130 brightness-105 saturate-115"
              draggable={false}
            />
            <div className="absolute inset-0 bg-radial from-[#ff4500]/20 via-transparent to-transparent mix-blend-screen" />
          </div>
        </div>

        {/* Dynamic Luminous Spotlight Glow Halo */}
        <div
          ref={spotlightGlowRef}
          className="absolute pointer-events-none will-change-transform rounded-full mix-blend-screen opacity-0 transition-opacity duration-300"
          style={{
            width: '640px',
            height: '640px',
            opacity: 0,
            background: 'radial-gradient(circle, rgba(255,90,31,0.22) 0%, rgba(255,90,31,0.08) 40%, rgba(0,0,0,0) 70%)',
            transform: 'translate3d(-9999px, -9999px, 0)'
          }}
        />

        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 subtle-dossier-grid opacity-15 pointer-events-none z-10" />

        {/* Top & Bottom Cinematic Fade Vignettes */}
        <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-t from-[#070707] to-transparent z-10 pointer-events-none" />
      </div>

      {/* ================= 1. TOP FLOATING STICKERS ROW ================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between px-1 font-mono text-[8px] sm:text-[10px]">
        
        {/* Left Tape Sticker */}
        <div className="inline-flex items-center transform -rotate-2 hover:rotate-0 transition-transform">
          <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#ff5a1f]/15 border border-[#ff5a1f]/50 text-[#ff8a3d] font-mono font-bold tracking-wider uppercase rounded shadow-sm backdrop-blur-sm">
            <span className="hidden sm:inline">SAME STAGE, </span>DIFF ENERGY 👑
          </div>
        </div>

        {/* Center Tape Sticker */}
        <div className="inline-flex items-center transform rotate-1 hover:rotate-0 transition-transform">
          <div className="px-2 sm:px-3.5 py-0.5 sm:py-1 bg-[#111111]/90 border border-[#ff5a1f]/60 text-[#ff8a3d] font-mono font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(255,90,31,0.25)] backdrop-blur-md flex items-center gap-1 sm:gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-ping" />
            <span className="hidden sm:inline">COMING </span><span>SOON</span>
            <span>⏳</span>
          </div>
        </div>

        {/* Right Tape Sticker: GUESS WHAT?! */}
        <div className="inline-flex items-center transform rotate-2 hover:rotate-0 transition-transform">
          <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#ff5a1f] text-[#070707] font-display font-black tracking-wider uppercase rounded shadow-md">
            GUESS WHAT?! ⚡
          </div>
        </div>

      </div>

      {/* ================= 2. MAIN HERO CONTENT AREA ================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between lg:flex-row items-center lg:items-end gap-2 sm:gap-5 lg:gap-6 my-auto py-1 sm:py-3">
        
        {/* Interactive Mobile Cue (Fades once interacted) */}
        <div className={`sm:hidden pointer-events-auto transition-opacity duration-700 ${hasInteracted ? 'opacity-30 hover:opacity-100' : 'opacity-95 animate-pulse'} self-center mt-1`}>
          <span className="px-2.5 py-0.5 rounded-full bg-[#111111]/90 border border-[#ff5a1f]/40 text-[#f4f0e8] font-mono text-[7.5px] tracking-wider uppercase backdrop-blur-sm shadow-sm">
            ✨ DRAG TO UNMASK
          </span>
        </div>

        <div className="hidden lg:block flex-1" />

        {/* ================= RIGHT COLUMN: COMPACT COMMUNITY SPECULATION ================= */}
        <div className="flex flex-col items-start lg:items-end space-y-1.5 sm:space-y-2 z-30 w-full lg:w-auto self-end">
          
          {/* Top-Right Tape Badge: THIS IS GONNA BE GOOD */}
          <div className="self-start lg:self-end transform rotate-1 hover:rotate-0 transition-transform mb-0.5">
            <div className="px-2 py-0.5 bg-[#111111]/90 border border-white/20 text-[#f4f0e8] font-mono text-[7.5px] sm:text-[9px] font-bold tracking-wider uppercase rounded shadow-md flex items-center gap-1 backdrop-blur-md">
              <span>THIS IS GONNA BE GOOD</span>
              <span>🔥</span>
            </div>
          </div>

          {/* 1 or 2 Compact Comment Pills */}
          <div className="w-full max-w-[230px] sm:max-w-xs space-y-1 sm:space-y-1.5">
            {communityComments.slice(0, 2).map((c, idx) => (
              <div 
                key={c.id}
                className={`group p-1.5 sm:p-2 rounded-xl bg-[#111111]/90 hover:bg-[#181818] border border-white/15 hover:border-[#ff5a1f]/50 backdrop-blur-md shadow-lg transition-all text-left ${idx === 1 ? 'hidden xs:block sm:block' : ''}`}
              >
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <img 
                    src={c.avatar} 
                    alt={c.user} 
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-white/20 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-[#f4f0e8] text-[8px] sm:text-[8.5px] block truncate">@{c.user}</span>
                    <p className="text-[8px] sm:text-[10px] text-[#f4f0e8]/90 font-sans leading-tight">
                      {c.text}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 pl-0.5 text-[7px] text-[#ff8a3d]">
                    <Heart className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-[#ff5a1f] text-[#ff5a1f]" />
                    <span className="font-mono text-[6.5px] sm:text-[7px] font-semibold">{c.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore Dossiers Secondary Link */}
          <div className="pt-0.5 self-start lg:self-end">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onExploreSpeakers('speaker-1');
              }}
              className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#111111]/90 hover:bg-[#181818] border border-white/20 hover:border-[#ff5a1f] text-[#f4f0e8] font-mono text-[8px] sm:text-[9.5px] font-semibold tracking-wider rounded-full transition-all cursor-pointer backdrop-blur-sm"
            >
              EXPLORE DOSSIERS ↓
            </button>
          </div>

        </div>

      </div>

      {/* ================= 3. BOTTOM EVENT METADATA ROW ================= */}
      <div className="relative z-30 max-w-5xl mx-auto w-full pt-1.5 sm:pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-[8px] sm:text-xs font-mono text-[#817b73]">
        
        {/* Date Pill */}
        <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#111111]/90 border border-white/10">
          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff5a1f]" />
          <span className="font-bold text-[#f4f0e8]">10-11 JAN 2026</span>
          <span className="text-[7px] sm:text-[8px] font-bold px-1 py-0.2 rounded bg-[#ff5a1f]/20 text-[#ff8a3d] border border-[#ff5a1f]/40 uppercase tracking-wider ml-0.5">SOON</span>
        </div>

        {/* Venue Pill */}
        <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#111111]/90 border border-white/10">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff8a3d]" />
          <span className="hidden sm:inline">6 PM IST • AUDITORIUM & LIVE STREAM</span>
          <span className="sm:hidden">6 PM IST • AUDITORIUM</span>
        </div>

        {/* Free Pass CTA */}
        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onRegister();
          }}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#ff5a1f]/15 border border-[#ff5a1f]/50 text-[#ff8a3d] hover:bg-[#ff5a1f] hover:text-[#070707] transition-colors cursor-pointer active:scale-95"
        >
          <Ticket className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="font-bold uppercase tracking-wider">FREE PASS</span>
        </button>

        {/* Scroll Prompt */}
        <div className="hidden md:flex items-center gap-1 text-[#817b73]">
          <span>SCROLL</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

      </div>

    </section>
  );
}
