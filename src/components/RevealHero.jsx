import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateTimeRemaining } from '../utils/dateHelper';
import { soundFx } from '../utils/audio';

export default function RevealHero({ 
  targetDate,
  speaker,
  onOpenMenu,
  onNavigate
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section 
      id="hero" 
      className="relative w-full h-[100svh] min-h-[640px] bg-[#070707] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none"
    >
      {/* Background Silhouette Image with Authentic Red Atmospheric Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src="/hero-silhouette.jpg"
          alt="Mystery Keynote Speaker Silhouette"
          className="w-full h-full object-cover object-center max-w-none"
        />
        {/* Subtle Vignette & Depth Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-[#070707]/80 pointer-events-none" />
      </div>

      {/* Film Grain Texture Overlay */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10 opacity-30" />

      {/* TOP HEADER BAR */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-30 flex items-center justify-between w-full"
      >
        {/* Top-Left: DEVKRAFT */}
        <button 
          onClick={() => onNavigate('hero')}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors"
        >
          DEVKRAFT
        </button>

        {/* Top-Right: Minimalist MENU Button */}
        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onOpenMenu();
          }}
          className="group flex items-center gap-2 font-mono text-xs tracking-widest text-white/90 hover:text-white focus:outline-none"
          aria-label="Menu"
        >
          <span className="tracking-widest uppercase text-xs">MENU</span>
          <div className="flex flex-col justify-center space-y-1 w-4">
            <span className="w-full h-[1.5px] bg-white group-hover:bg-brand-red transition-colors" />
            <span className="w-full h-[1.5px] bg-white group-hover:bg-brand-red transition-colors" />
            <span className="w-full h-[1.5px] bg-white group-hover:bg-brand-red transition-colors" />
          </div>
        </button>
      </motion.header>

      {/* CENTER COUNTDOWN COMPOSITION */}
      <div className="relative z-30 my-auto flex flex-col items-center justify-center text-center space-y-3">
        {/* REVEALING IN */}
        <motion.p 
          initial={{ opacity: 0, letterSpacing: '0.45em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-mono text-xs sm:text-sm text-white/90 uppercase font-light drop-shadow-md"
        >
          REVEALING IN
        </motion.p>

        {/* 03  02  01 in Editorial Serif */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex items-baseline justify-center gap-5 sm:gap-8 lg:gap-12"
        >
          <span className="font-serif font-normal text-6xl sm:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            03
          </span>
          <span className="font-serif font-normal text-4xl sm:text-6xl lg:text-7xl text-white/40 tracking-tight leading-none drop-shadow-lg">
            02
          </span>
          <span className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-white/20 tracking-tight leading-none drop-shadow-md">
            01
          </span>
        </motion.div>
      </div>

      {/* BOTTOM ROW */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-30 flex items-end justify-between w-full"
      >
        {/* Bottom-Left: THE SPEAKER IS... with underline */}
        <div className="space-y-2">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-white/90 uppercase font-light drop-shadow">
            THE SPEAKER IS...
          </div>
          <div className="w-48 sm:w-64 h-[1px] bg-white/40" />
        </div>

        {/* Bottom-Right: Stay tuned... */}
        <div>
          <span className="font-serif italic font-light text-base sm:text-lg text-white/80 tracking-wide drop-shadow">
            Stay tuned...
          </span>
        </div>
      </motion.div>

    </section>
  );
}
