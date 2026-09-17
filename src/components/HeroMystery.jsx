import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Ticket
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function HeroMystery({ onTakeGuess, onExploreSpeakers, onRegister, onWatchTeaser }) {
  return (
    <section 
      id="hero"
      className="relative w-full min-h-[100dvh] h-auto md:h-[100dvh] max-h-[1200px] bg-[#080808] text-[#f4f0e8] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-3 sm:px-6 overflow-hidden select-none"
    >
      {/* ================= FULL-SCREEN BACKGROUND ARTWORK: 3 KEYNOTE SPEAKERS ON STAGE ================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img 
          src="/red-stage-panels.jpg" 
          alt="DEVTALKS '26 3 Mystery Keynote Speakers on Stage" 
          className="w-full h-auto max-h-[52vh] sm:max-h-full object-contain sm:object-cover object-center max-w-[1440px] opacity-70 filter brightness-95 contrast-110 saturate-90"
        />

        {/* Ambient edge blends */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/40 to-[#080808]/90 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-b from-[#080808] via-[#080808]/75 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-56 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-2 sm:w-16 bg-gradient-to-r from-[#080808]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-2 sm:w-16 bg-gradient-to-l from-[#080808]/60 to-transparent pointer-events-none" />

        {/* Ambient Orange Subtle Highlight */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[550px] md:w-[750px] h-[280px] sm:h-[550px] md:h-[750px] bg-[#ff5a1f]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 subtle-dossier-grid pointer-events-none z-10 opacity-30" />

      {/* ================= TOP SECTION: COMING SOON! ================= */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center px-2 mt-1 sm:mt-2">
        
        {/* Top Headline: COMING SOON! */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-1 w-full max-w-full"
        >
          <h1 className="font-display font-black tracking-wide sm:tracking-widest md:tracking-[0.12em] uppercase text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-4 text-[#f4f0e8]">
            <span>COMING</span>
            <span>SOON!</span>
          </h1>

          {/* Orange Accent Line */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#ff5a1f]" />
            <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.28em] text-[#ff8a3d] font-bold uppercase">
              DEVTALKS '26 • BY DEVKRAFT
            </span>
            <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#ff5a1f]" />
          </div>
        </motion.div>

      </div>

      {/* ================= CENTER SECTION ================= */}
      <div className="relative z-30 max-w-4xl mx-auto w-full flex-1 flex items-center justify-center my-auto pointer-events-none min-h-[60px] sm:min-h-[140px]" />

      {/* ================= BOTTOM SECTION: DEVTALKS '26 & ACTION BUTTONS ================= */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-2.5 sm:space-y-3.5">
        
        {/* Main Title: DEVTALKS '26 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2 flex flex-col items-center"
        >
          <h2 className="font-display font-black tracking-tight uppercase text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#f4f0e8] leading-tight flex items-center justify-center flex-wrap">
            <span>DEVTALKS</span>
            <span className="ml-1.5 sm:ml-2.5 font-mono text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-[#ff5a1f]">
              '26
            </span>
          </h2>

          {/* Badge for "GUESS THE SPEAKERS" */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-[#111111] border border-[#ff5a1f]/40 text-[#ff5a1f] font-mono font-bold tracking-[0.24em] text-[10px] sm:text-xs uppercase shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-ping" />
            <span className="text-[#f4f0e8] font-black">
              GUESS THE MYSTERY SPEAKERS
            </span>
          </div>

          <p className="font-sans text-[11px] xs:text-xs sm:text-sm text-[#817b73] max-w-sm sm:max-w-lg mx-auto px-2 leading-relaxed font-medium">
            <span className="text-[#ff8a3d] font-bold">3 Industry Titans.</span> 1 Confidential Stage. <span className="text-[#f4f0e8] font-semibold">Who Will Take The Spotlight?</span>
          </p>
        </motion.div>

        {/* Action Button Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full max-w-md sm:max-w-none pt-0.5 px-2"
        >
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onTakeGuess();
            }}
            className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-display font-black text-[11px] sm:text-xs tracking-wider uppercase rounded-full transition-all transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shadow-[0_2px_14px_rgba(255,90,31,0.25)]"
          >
            <span>TAKE A GUESS 🎯</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {onWatchTeaser && (
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onWatchTeaser();
              }}
              className="flex-1 xs:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-[#111111] hover:bg-[#181818] border border-[#ff5a1f]/40 hover:border-[#ff5a1f] text-[#ff8a3d] hover:text-[#f4f0e8] font-mono text-[11px] sm:text-xs font-bold tracking-wider rounded-full transition-all cursor-pointer text-center whitespace-nowrap"
            >
              ▶ 3D TEASER VIDEO
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onExploreSpeakers('speaker-1');
            }}
            className="flex-1 xs:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#ff5a1f] text-[#f4f0e8] font-mono text-[11px] sm:text-xs font-semibold tracking-wider rounded-full transition-all cursor-pointer text-center whitespace-nowrap"
          >
            EXPLORE DOSSIERS ↓
          </button>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegister();
            }}
            className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-3 bg-transparent hover:bg-[#111111] border border-white/10 hover:border-[#ff5a1f]/50 text-[#817b73] hover:text-[#f4f0e8] font-mono text-[11px] sm:text-xs font-semibold tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            <Ticket className="w-3.5 h-3.5 text-[#ff5a1f]" />
            <span>FREE PASS</span>
          </button>
        </motion.div>

      </div>

    </section>
  );
}
