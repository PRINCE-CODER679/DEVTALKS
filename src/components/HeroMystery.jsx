import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Ticket, 
  Heart, 
  ChevronDown 
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { speakersList } from '../data/speakers';

/**
 * HeroMystery - Cinematic Editorial Landing Page with Curated Assets
 * 
 * Features:
 * - Dual Image Canvas with smooth cursor/touch radial mask reveal:
 *   IMAGE 1: /hero-speaker-base.png (default mysterious silhouette)
 *   IMAGE 2: /hero-speaker-reveal.png (alternate revealed speaker with orange-red arc ring)
 * - Curated authentic visual assets from reference:
 *   1. "WHO IS COMING?" / "GUESS THE SPEAKER?" heading
 *   2. Ripped-paper "HINTS ••" sticky note with confidential clues
 *   3. Playful tape stickers ("GUESS WHAT?!", "THIS IS GONNA BE GOOD")
 *   4. Clean "TAKE A GUESS →" primary action
 *   5. Compact community speculation chat pills on the right
 *   6. Bottom date/venue pills & scroll prompt
 */
export default function HeroMystery({ onTakeGuess, onExploreSpeakers, onRegister, onWatchTeaser }) {
  const containerRef = useRef(null);
  const revealLayerRef = useRef(null);

  // Mouse & Touch Tracking Coordinates
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const isInitializedRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const userInteractionTimeoutRef = useRef(null);
  const animFrameRef = useRef(null);
  const idleTimeRef = useRef(0);

  const [spotlightRadius, setSpotlightRadius] = useState(300);

  const activeSpeaker = speakersList[0];

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
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isSmallMobile = window.innerWidth < 480;
      const isTablet = window.innerWidth >= 480 && window.innerWidth < 1024;
      
      const radius = isSmallMobile 
        ? Math.min(rect.width * 0.44, 180) 
        : isTablet 
          ? 260 
          : 340;
      setSpotlightRadius(radius);

      if (!isInitializedRef.current) {
        const initialX = rect.width * 0.5;
        const initialY = rect.height * 0.42;
        targetPosRef.current = { x: initialX, y: initialY };
        currentPosRef.current = { x: initialX, y: initialY };
        isInitializedRef.current = true;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: Math.max(0, Math.min(e.clientX - rect.left, rect.width)),
        y: Math.max(0, Math.min(e.clientY - rect.top, rect.height))
      };
      isUserInteractingRef.current = true;

      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      userInteractionTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 2500);
    };

    const handleTouchStart = (e) => {
      if (!containerRef.current || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width)),
        y: Math.max(0, Math.min(e.touches[0].clientY - rect.top, rect.height))
      };
      isUserInteractingRef.current = true;
    };

    const handleTouchMove = (e) => {
      if (!containerRef.current || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width)),
        y: Math.max(0, Math.min(e.touches[0].clientY - rect.top, rect.height))
      };
      isUserInteractingRef.current = true;
    };

    const handleTouchEnd = () => {
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      userInteractionTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 60-120fps Fluid Interpolation Loop
    const LERP_FACTOR = 0.085;

    const animate = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Subtle slow cinematic drift when idle
      if (!isUserInteractingRef.current && isInitializedRef.current) {
        idleTimeRef.current += 0.007;
        const driftX = rect.width * 0.5 + Math.sin(idleTimeRef.current) * (rect.width * 0.09);
        const driftY = rect.height * 0.42 + Math.cos(idleTimeRef.current * 0.8) * (rect.height * 0.05);
        targetPosRef.current = { x: driftX, y: driftY };
      }

      const target = targetPosRef.current;
      const current = currentPosRef.current;

      current.x += (target.x - current.x) * LERP_FACTOR;
      current.y += (target.y - current.y) * LERP_FACTOR;

      const curX = current.x.toFixed(1);
      const curY = current.y.toFixed(1);
      const radius = spotlightRadius;

      if (revealLayerRef.current) {
        const maskCss = `radial-gradient(circle ${radius}px at ${curX}px ${curY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.2) 82%, rgba(0,0,0,0) 100%)`;
        revealLayerRef.current.style.maskImage = maskCss;
        revealLayerRef.current.style.webkitMaskImage = maskCss;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [spotlightRadius]);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-[#070707] text-[#f4f0e8] flex flex-col justify-between pt-16 sm:pt-20 pb-5 sm:pb-7 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
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

        {/* Layer 2: Alternate Revealed Speaker (Masked) */}
        <div 
          ref={revealLayerRef}
          className="absolute inset-0 w-full h-full will-change-[mask-image]"
          style={{
            maskImage: `radial-gradient(circle 300px at 50% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
            WebkitMaskImage: `radial-gradient(circle 300px at 50% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/hero-speaker-reveal.png"
              alt="DEVTALKS '26 Speaker Revealed"
              className="w-full h-full object-cover object-[center_35%] sm:object-center filter contrast-130 brightness-105 saturate-115"
              draggable={false}
            />
            <div className="absolute inset-0 bg-radial from-[#ff4500]/15 via-transparent to-transparent mix-blend-screen" />
          </div>
        </div>

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

      {/* ================= 2. MAIN HERO CONTENT AREA (EDITORIAL + FEW ASSETS) ================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center my-auto py-3">
        
        {/* ================= LEFT COLUMN: HEADLINE + RIPPED PAPER HINT NOTE ================= */}
        <div className="lg:col-span-4 flex flex-col items-start space-y-2.5 sm:space-y-3 z-30 max-w-sm">
          
          {/* Main Title: GUESS THE SPEAKER? */}
          <div className="space-y-0.5 text-left">
            <h1 className="font-display font-black uppercase text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#f4f0e8] leading-[0.92] tracking-tight drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)]">
              GUESS THE <br />
              <span className="text-[#ff5a1f] drop-shadow-[0_0_20px_rgba(255,90,31,0.55)]">
                SPEAKER?
              </span>
            </h1>
            
            <div className="pt-0.5 font-mono text-[10px] sm:text-xs text-[#ff8a3d] font-bold tracking-widest uppercase">
              BIG IDEAS. BIGGER IMPACT.
            </div>
          </div>

          {/* RIPPED PAPER STICKY NOTE HINTS (AUTHENTIC ASSET) */}
          <div className="relative w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[275px] pt-1.5 transform -rotate-1 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
            
            {/* Top Tape Strip */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-3 sm:h-3.5 bg-white/35 backdrop-blur-md rounded-xs border border-white/50 rotate-1 shadow-sm z-20" />

            {/* Torn Paper Body */}
            <div 
              className="relative p-2.5 sm:p-3.5 bg-[#f4ede2] text-[#1a1816] rounded-xs shadow-[0_12px_30px_rgba(0,0,0,0.85),_0_2px_8px_rgba(255,90,31,0.2)] font-sans border-t border-l border-white/60 text-left"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 98% 97%, 92% 95%, 85% 99%, 78% 96%, 68% 99%, 60% 95%, 50% 98%, 40% 96%, 30% 99%, 22% 96%, 12% 99%, 0% 97%)'
              }}
            >
              {/* Paper Header */}
              <div className="flex items-center justify-between border-b border-[#1a1816]/15 pb-1 mb-1 font-mono font-black text-[10px] sm:text-[11px] tracking-wider uppercase text-[#1a1816]">
                <span className="flex items-center gap-1">
                  <span>📌 HINTS</span>
                  <span className="text-[#ff5a1f]">• •</span>
                </span>
                <span className="text-[7.5px] sm:text-[8px] text-[#1a1816]/50">CONFIDENTIAL</span>
              </div>

              {/* Hints List */}
              <div className="space-y-1 text-[8.5px] sm:text-[10px] font-sans font-medium text-[#2d2926]">
                {activeSpeaker.hints.slice(0, 3).map((hint, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 leading-tight">
                    <span className="text-[10px] shrink-0">{hint.icon}</span>
                    <span className="font-semibold text-[#1a1816] truncate">{hint.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-1 flex items-center gap-2 w-full">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onTakeGuess();
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#070707] font-display font-black text-[11px] sm:text-xs tracking-wider uppercase rounded-full transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_18px_rgba(255,90,31,0.35)]"
            >
              <span>TAKE A GUESS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ================= CENTER COLUMN: OPEN FOCAL STAGE (ALLOWS IMAGE REVEAL TO SHINE) ================= */}
        <div className="lg:col-span-4 relative flex flex-col items-center justify-center min-h-[40px] xs:min-h-[60px] lg:min-h-[140px] pointer-events-none">
          
          {/* Subtle Chalk Stamp: SAME HINTS, DIFFERENT ANSWERS */}
          <div className="transform rotate-2 pointer-events-auto">
            <div className="px-3 py-0.5 sm:py-1 bg-[#111111]/85 border border-[#ff5a1f]/50 text-[#ff8a3d] font-mono text-[8px] sm:text-[9px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-md">
              SAME HINTS • DIFFERENT ANSWERS 🎯
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: FEW COMMUNITY CHAT BUBBLES ================= */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-2 z-30 w-full">
          
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
