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
  const idleTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  
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
      
      targetPosRef.current = { x: clampedX, y: clampedY };
      isUserInteractingRef.current = true;
      setHasInteracted(true);

      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      userInteractionTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 2600);
    };

    // Unified pointer events for desktop, stylus, and touchscreens
    const handlePointerMove = (e) => {
      updateTargetPosition(e.clientX, e.clientY);
    };

    const handlePointerDown = (e) => {
      // Re-cache bounding rect on pointer down to ensure accuracy after scroll
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
        isUserInteractingRef.current = false;
      }, 2200);
    };

    // Device Orientation / Mobile Tilt holographic parallax effect
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt [-90, 90]
        // beta: front-to-back tilt [-180, 180]
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
      containerEl.addEventListener('pointerdown', handlePointerDown, { passive: true });
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      containerEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      containerEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // 60-120fps Smooth Delta-Time Motion Interpolation Loop
    const animate = (timestamp) => {
      if (!containerRef.current) return;
      
      const rect = containerRectRef.current || containerRef.current.getBoundingClientRect();

      // Delta time in seconds (capped at 50ms to prevent jumping after tab switch)
      const now = timestamp || performance.now();
      const dt = lastTimeRef.current ? Math.min((now - lastTimeRef.current) / 1000, 0.05) : 0.016;
      lastTimeRef.current = now;

      // Smooth gyro lerp (low-pass filter)
      gyroCurrentRef.current.x += (gyroTargetRef.current.x - gyroCurrentRef.current.x) * Math.min(dt * 8, 1);
      gyroCurrentRef.current.y += (gyroTargetRef.current.y - gyroCurrentRef.current.y) * Math.min(dt * 8, 1);

      // Ambient breathing figure-8 drift across mystery speaker when idle
      if (!isUserInteractingRef.current && isInitializedRef.current) {
        idleTimeRef.current += dt * 0.9;
        const centerX = rect.width * 0.5 + gyroCurrentRef.current.x;
        const centerY = rect.height * 0.38 + gyroCurrentRef.current.y;
        
        // Lissajous curve for dynamic, natural spotlight movement
        const driftX = centerX + Math.sin(idleTimeRef.current * 0.8) * (rect.width * 0.12);
        const driftY = centerY + Math.sin(idleTimeRef.current * 1.6) * (rect.height * 0.06);
        targetPosRef.current = { x: driftX, y: driftY };
      }

      const target = targetPosRef.current;
      const current = currentPosRef.current;

      // Delta-time normalized exponential lerping for buttery 60Hz & 120Hz motion
      const speed = isUserInteractingRef.current ? 16 : 4.5;
      const lerp = 1 - Math.exp(-speed * dt);

      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;

      const curX = current.x.toFixed(1);
      const curY = current.y.toFixed(1);
      const radius = spotlightRadiusRef.current;

      // Apply GPU-accelerated radial mask
      if (revealLayerRef.current) {
        const maskCss = `radial-gradient(circle ${radius}px at ${curX}px ${curY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)`;
        revealLayerRef.current.style.maskImage = maskCss;
        revealLayerRef.current.style.webkitMaskImage = maskCss;
      }

      // Smooth spotlight beam glow halo
      if (spotlightGlowRef.current) {
        const glowRadius = radius * 1.05;
        spotlightGlowRef.current.style.transform = `translate3d(${curX - glowRadius}px, ${curY - glowRadius}px, 0)`;
        spotlightGlowRef.current.style.width = `${glowRadius * 2}px`;
        spotlightGlowRef.current.style.height = `${glowRadius * 2}px`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (containerEl) {
        containerEl.removeEventListener('pointermove', handlePointerMove);
        containerEl.removeEventListener('pointerdown', handlePointerDown);
        containerEl.removeEventListener('touchstart', handleTouchStart);
        containerEl.removeEventListener('touchmove', handleTouchMove);
        containerEl.removeEventListener('touchend', handleTouchEnd);
        containerEl.removeEventListener('touchcancel', handleTouchEnd);
      }
      window.removeEventListener('pointermove', handlePointerMove);
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
      className="relative w-full min-h-[100dvh] bg-[#070707] text-[#f4f0e8] flex flex-col justify-between pt-16 sm:pt-20 pb-5 sm:pb-7 px-4 sm:px-8 lg:px-12 overflow-hidden select-none touch-pan-y"
    >
      
      {/* ================= DUAL-IMAGE RADIAL REVEAL CANVAS (BACKGROUND) ================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Base Mysterious Silhouette */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src="/hero-speaker-base.png"
            alt="DEVTALKS '26 Mystery Speaker Silhouette"
            className="w-full h-full object-cover object-[center_35%] sm:object-center filter contrast-125 brightness-95"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#070707]/20 to-[#070707]/90" />
        </div>

        {/* Layer 2: Alternate Revealed Speaker (Masked with GPU Acceleration) */}
        <div 
          ref={revealLayerRef}
          className="absolute inset-0 w-full h-full will-change-[mask-image] transform-gpu"
          style={{
            maskImage: `radial-gradient(circle 300px at 50% 38%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
            WebkitMaskImage: `radial-gradient(circle 300px at 50% 38%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/hero-speaker-reveal.png"
              alt="DEVTALKS '26 Speaker Revealed"
              className="w-full h-full object-cover object-[center_35%] sm:object-center filter contrast-130 brightness-105 saturate-115"
              draggable={false}
            />
            <div className="absolute inset-0 bg-radial from-[#ff4500]/20 via-transparent to-transparent mix-blend-screen" />
          </div>
        </div>

        {/* Dynamic Luminous Spotlight Glow Halo */}
        <div
          ref={spotlightGlowRef}
          className="absolute pointer-events-none will-change-transform rounded-full mix-blend-screen opacity-80 transition-opacity duration-300"
          style={{
            width: '640px',
            height: '640px',
            background: 'radial-gradient(circle, rgba(255,90,31,0.22) 0%, rgba(255,90,31,0.08) 40%, rgba(0,0,0,0) 70%)',
            transform: 'translate3d(-9999px, -9999px, 0)'
          }}
        />

        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 subtle-dossier-grid opacity-15 pointer-events-none z-10" />

        {/* Top & Bottom Cinematic Fade Vignettes */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#070707] to-transparent z-10 pointer-events-none" />
      </div>

      {/* ================= 1. TOP FLOATING STICKERS ROW ================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between px-1 font-mono text-[9px] sm:text-[10px]">
        
        {/* Left Tape Sticker: SAME STAGE, DIFFERENT ENERGY */}
        <div className="inline-flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
          <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#ff5a1f]/15 border border-[#ff5a1f]/50 text-[#ff8a3d] font-mono font-bold tracking-wider uppercase rounded shadow-sm backdrop-blur-sm">
            SAME STAGE, DIFFERENT ENERGY 👑
          </div>
        </div>

        {/* Right Tape Sticker: GUESS WHAT?! */}
        <div className="inline-flex items-center transform rotate-3 hover:rotate-0 transition-transform">
          <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#ff5a1f] text-[#070707] font-display font-black tracking-wider uppercase rounded shadow-md">
            GUESS WHAT?! ⚡
          </div>
        </div>

      </div>

      {/* ================= 2. MAIN HERO CONTENT AREA (OPEN STAGE FOR IMAGE REVEAL + COMMUNITY SPECS) ================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between lg:flex-row items-center lg:items-end gap-5 lg:gap-6 my-auto py-3">
        
        {/* Interactive Mobile Cue (Fades once interacted) */}
        <div className={`sm:hidden pointer-events-auto transition-opacity duration-700 ${hasInteracted ? 'opacity-30 hover:opacity-100' : 'opacity-90 animate-pulse'} self-center`}>
          <span className="px-3 py-1 rounded-full bg-[#111111]/80 border border-[#ff5a1f]/30 text-[#f4f0e8]/80 font-mono text-[8px] tracking-wider uppercase backdrop-blur-sm">
            ✨ DRAG / TOUCH TO UNMASK
          </span>
        </div>

        <div className="hidden lg:block flex-1" />

        {/* ================= RIGHT COLUMN: FEW COMMUNITY CHAT BUBBLES ================= */}
        <div className="flex flex-col items-start lg:items-end space-y-2 z-30 w-full lg:w-auto self-end">
          
          {/* Top-Right Tape Badge: THIS IS GONNA BE GOOD */}
          <div className="self-start lg:self-end transform rotate-2 hover:rotate-0 transition-transform mb-0.5">
            <div className="px-2.5 py-0.5 bg-[#111111]/90 border border-white/20 text-[#f4f0e8] font-mono text-[8px] sm:text-[9px] font-bold tracking-wider uppercase rounded shadow-md flex items-center gap-1 backdrop-blur-md">
              <span>THIS IS GONNA BE GOOD</span>
              <span>🔥</span>
            </div>
          </div>

          {/* 2 Compact Comment Pills */}
          <div className="w-full max-w-[260px] sm:max-w-xs space-y-1.5">
            {communityComments.map((c) => (
              <div 
                key={c.id}
                className="group p-2 rounded-xl bg-[#111111]/85 hover:bg-[#181818] border border-white/15 hover:border-[#ff5a1f]/50 backdrop-blur-md shadow-lg transition-all text-left"
              >
                <div className="flex items-start gap-2">
                  <img 
                    src={c.avatar} 
                    alt={c.user} 
                    className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-[#f4f0e8] text-[8.5px] block truncate">@{c.user}</span>
                    <p className="text-[9px] sm:text-[10px] text-[#f4f0e8]/90 font-sans leading-snug">
                      {c.text}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 pl-1 text-[8px] text-[#ff8a3d]">
                    <Heart className="w-2.5 h-2.5 fill-[#ff5a1f] text-[#ff5a1f]" />
                    <span className="font-mono text-[7px] font-semibold">{c.likes}</span>
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
              className="px-3 py-1 bg-[#111111]/85 hover:bg-[#181818] border border-white/15 hover:border-[#ff5a1f] text-[#f4f0e8] font-mono text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider rounded-full transition-all cursor-pointer backdrop-blur-sm"
            >
              EXPLORE DOSSIERS ↓
            </button>
          </div>

        </div>

      </div>

      {/* ================= 3. BOTTOM EVENT METADATA ROW ================= */}
      <div className="relative z-30 max-w-5xl mx-auto w-full pt-2 sm:pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[8.5px] sm:text-xs font-mono text-[#817b73]">
        
        {/* Date Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#111111]/80 border border-white/10">
          <Calendar className="w-3 h-3 text-[#ff5a1f]" />
          <span className="font-bold text-[#f4f0e8]">10TH & 11TH JANUARY 2026</span>
        </div>

        {/* Venue Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#111111]/80 border border-white/10">
          <MapPin className="w-3 h-3 text-[#ff8a3d]" />
          <span>6 PM IST • AUDITORIUM & LIVE STREAM</span>
        </div>

        {/* Free Pass CTA */}
        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onRegister();
          }}
          className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#ff5a1f]/10 border border-[#ff5a1f]/40 text-[#ff8a3d] hover:bg-[#ff5a1f] hover:text-[#070707] transition-colors cursor-pointer"
        >
          <Ticket className="w-3 h-3" />
          <span className="font-bold uppercase tracking-wider">FREE REGISTRATION</span>
        </button>

        {/* Scroll Prompt */}
        <div className="hidden md:flex items-center gap-1 text-[#817b73]">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

      </div>

    </section>
  );
}
