import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Shield } from 'lucide-react';
import { calculateTimeRemaining } from '../utils/dateHelper';
import { soundFx } from '../utils/audio';

export default function CountdownReveal({ 
  targetDate, 
  speaker, 
  isRevealed, 
  onToggleRevealed, 
  onOpenMenu, 
  onNavigate 
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section 
      id="reveal" 
      className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-5 sm:p-10 lg:p-14 overflow-hidden select-none border-t border-editorial-border"
    >
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10 opacity-30" />

      {/* TOP HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-30 flex items-center justify-between w-full pb-2"
      >
        <button 
          onClick={() => {
            soundFx.playEvidenceClick();
            onNavigate('hero');
          }}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors"
        >
          DEVKRAFT
        </button>

        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onOpenMenu();
          }}
          className="group flex items-center gap-2 font-mono text-xs tracking-widest text-white/90 hover:text-white focus:outline-none py-1"
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

      {/* BEFORE REVEAL: PAGE 9 LIVE COUNTDOWN */}
      {!isRevealed ? (
        <>
          {/* Background Silhouette with Red Atmospheric Glow */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <img
              src="/hero-silhouette.jpg"
              alt="Countdown Silhouette"
              className="w-full h-full object-cover object-center opacity-70 sm:opacity-90 lg:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-[#070707]/80" />
          </div>

          {/* Centerpiece: LIVE 30 SEPTEMBER COUNTDOWN */}
          <div className="relative z-30 my-auto flex flex-col items-center justify-center text-center space-y-5 sm:space-y-8 w-full max-w-4xl mx-auto py-6 sm:py-10">
            
            <div className="space-y-1 sm:space-y-2">
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-brand-lightRed uppercase font-bold drop-shadow-md">
                REVEALING 30 SEPTEMBER
              </p>
            </div>

            {/* 4-Unit Live Countdown Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-6 lg:gap-8 w-full max-w-2xl px-1 sm:px-2">
              
              {/* DAYS */}
              <div className="flex flex-col items-center justify-center bg-void/70 border border-white/10 backdrop-blur-md p-2.5 sm:p-6 shadow-2xl">
                <span className="font-serif font-bold text-2xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                  {timeLeft.days}
                </span>
                <span className="font-mono text-[8px] sm:text-xs tracking-widest text-white/60 uppercase mt-1.5 sm:mt-2">
                  DAYS
                </span>
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center justify-center bg-void/70 border border-white/10 backdrop-blur-md p-2.5 sm:p-6 shadow-2xl">
                <span className="font-serif font-bold text-2xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                  {timeLeft.hours}
                </span>
                <span className="font-mono text-[8px] sm:text-xs tracking-widest text-white/60 uppercase mt-1.5 sm:mt-2">
                  HOURS
                </span>
              </div>

              {/* MINUTES */}
              <div className="flex flex-col items-center justify-center bg-void/70 border border-white/10 backdrop-blur-md p-2.5 sm:p-6 shadow-2xl">
                <span className="font-serif font-bold text-2xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                  {timeLeft.minutes}
                </span>
                <span className="font-mono text-[8px] sm:text-xs tracking-widest text-white/60 uppercase mt-1.5 sm:mt-2">
                  MINS
                </span>
              </div>

              {/* SECONDS */}
              <div className="flex flex-col items-center justify-center bg-void/70 border border-brand-red/50 backdrop-blur-md p-2.5 sm:p-6 shadow-2xl relative overflow-hidden">
                <span className="font-serif font-bold text-2xl sm:text-5xl lg:text-7xl text-brand-lightRed tracking-tight leading-none drop-shadow-[0_8px_30px_rgba(255,59,48,0.4)]">
                  {timeLeft.seconds}
                </span>
                <span className="font-mono text-[8px] sm:text-xs tracking-widest text-brand-lightRed/80 uppercase mt-1.5 sm:mt-2">
                  SECS
                </span>
                <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-red rounded-full animate-ping" />
              </div>

            </div>

            {/* Sub-badge indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-void/80 border border-white/10 font-mono text-[9px] sm:text-xs tracking-widest text-white/70 uppercase">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-red animate-pulse" />
              <span>OFFICIAL REVEAL AT MIDNIGHT • 30 SEPTEMBER</span>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="relative z-30 flex items-end justify-between w-full pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="font-mono text-[11px] sm:text-sm tracking-widest text-white/90 uppercase font-light drop-shadow">
                THE SPEAKER IS...
              </div>
              <div className="w-36 sm:w-64 h-[1px] bg-white/40" />
            </div>

            <div>
              <span className="font-serif italic font-light text-sm sm:text-lg text-white/80 tracking-wide drop-shadow">
                Stay tuned...
              </span>
            </div>
          </div>
        </>
      ) : (
        /* AFTER REVEAL: PAGE 10 SPEAKER REVEAL / EVENT DETAILS */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-30 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center py-6"
        >
          
          {/* Left Column: Stage Speaker Photograph (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/5] bg-void border border-white/10 overflow-hidden shadow-2xl group">
              <img
                src={speaker.revealed.image}
                alt={speaker.revealed.name}
                className="w-full h-full object-cover grayscale-0 contrast-105 brightness-95 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Speaker & Event Credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-7">
            
            {/* DEVTALKS '26 in Red */}
            <div className="font-mono text-xs tracking-widest text-brand-red font-bold uppercase">
              DEVTALKS '26
            </div>

            {/* Kunal Shah */}
            <div className="space-y-1 sm:space-y-1.5">
              <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight uppercase">
                {speaker.revealed.name}
              </h2>
              <p className="font-mono text-xs sm:text-base text-white/80 font-medium">
                {speaker.revealed.role}
              </p>
            </div>

            {/* Tagline */}
            <p className="font-sans text-xs sm:text-base text-white/60 font-light max-w-md">
              {speaker.revealed.tagline}
            </p>

            {/* Event Metadata */}
            <div className="space-y-2 font-mono text-xs text-white/80 pt-1">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-brand-red" />
                <span>30 September 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>Your College</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-brand-red" />
                <span>DEVKRAFT</span>
              </div>
            </div>

            {/* Red Pill Button & Handwritten Accent */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                onClick={() => soundFx.playEvidenceClick()}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand-red hover:bg-brand-crimson text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center gap-2"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="font-handwritten text-xl sm:text-3xl text-brand-red -rotate-6">
                See you there!
              </span>
            </div>

          </div>

        </motion.div>
      )}

      {/* BOTTOM WATERMARK */}
      <div className="relative z-30 flex items-center justify-between w-full font-mono text-[9px] sm:text-[10px] text-white/30 pt-3 sm:pt-4 border-t border-white/10">
        <span className="tracking-mega uppercase">DEV TALKS '26</span>
        <span>
          {!isRevealed ? "THE WAIT IS ALMOST OVER..." : "30 SEPTEMBER 2026 // DEVTALKS"}
        </span>
      </div>

    </section>
  );
}
