import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Ticket
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function HeroMystery({ onTakeGuess, onExploreSpeakers, onRegister }) {
  return (
    <section 
      id="hero"
      className="relative w-full h-[100dvh] min-h-[600px] max-h-[1080px] bg-[#000000] text-white flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-5 sm:pb-8 px-3 sm:px-6 overflow-hidden select-none"
    >
      {/* ================= FULL-SCREEN BACKGROUND ARTWORK: 3 KEYNOTE SPEAKERS IN PROFESSIONAL ATTIRE ================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Full Screen Cinematic 3 Keynote Speakers on Stage with 3 Red Panels (100% visible on all screens) */}
        <img 
          src="/red-stage-panels.jpg" 
          alt="DEVTALKS '26 3 Mystery Keynote Speakers on Stage" 
          className="w-full h-auto max-h-[52vh] sm:max-h-full object-contain sm:object-cover object-center max-w-[1440px] opacity-95 filter brightness-105 contrast-110"
        />

        {/* Subtle Edge Fades that preserve all 3 speakers with strong bottom text contrast */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/85 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-56 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-2 sm:w-12 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-2 sm:w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />

        {/* Ambient Red Glow Pulse */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[550px] md:w-[750px] h-[280px] sm:h-[550px] md:h-[750px] bg-[#EB0028]/15 rounded-full blur-[90px] sm:blur-[150px] pointer-events-none" />
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10 opacity-20" />

      {/* ================= TOP SECTION: COMING SOON! (POSITIONED CLEARLY BELOW NAVBAR) ================= */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center px-2 mt-1 sm:mt-2">
        
        {/* Top Massive Headline: COMING SOON! */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-1 w-full max-w-full"
        >
          <h1 className="font-display font-black tracking-wide sm:tracking-widest md:tracking-[0.12em] uppercase text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-4">
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F0F0F0] to-[#A8A8A8] bg-clip-text text-transparent filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
              COMING
            </span>
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F0F0F0] to-[#A8A8A8] bg-clip-text text-transparent filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
              SOON!
            </span>
          </h1>

          {/* Subtle Red Accent Line */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#EB0028]" />
            <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.25em] text-[#FF4D4D] font-bold uppercase drop-shadow-[0_0_8px_rgba(235,0,40,0.8)]">
              DEVTALKS '26
            </span>
            <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#EB0028]" />
          </div>
        </motion.div>

      </div>

      {/* ================= CENTER SECTION: CINEMATIC FOCUS ON 3 SPEAKERS ON STAGE ================= */}
      <div className="relative z-30 max-w-4xl mx-auto w-full flex-1 flex items-center justify-center my-auto pointer-events-none min-h-[60px] sm:min-h-[140px]">
        {/* Clean visual focus on the 3 professional speakers seated on stage */}
      </div>

      {/* ================= BOTTOM SECTION: DEVTALKS '26 & ACTION BUTTONS ================= */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-2.5 sm:space-y-3.5">
        
        {/* Main Title: DEVTALKS '26 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1.5 sm:space-y-2 flex flex-col items-center"
        >
          <h2 className="font-display font-black tracking-tight uppercase text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] leading-tight flex items-center justify-center flex-wrap">
            <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              DEVTALKS
            </span>
            <span className="ml-1.5 sm:ml-2.5 font-mono text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-b from-[#FFFFFF] via-[#FF4D6D] to-[#EB0028] bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_25px_rgba(235,0,40,0.9)]">
              '26
            </span>
          </h2>

          {/* High-Contrast Frosted Badge for "GUESS THE SPEAKERS" */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full bg-black/85 border border-[#EB0028]/80 text-[#FF4D4D] font-mono font-black tracking-[0.22em] text-[10px] sm:text-xs uppercase shadow-[0_4px_20px_rgba(0,0,0,0.95),_0_0_15px_rgba(235,0,40,0.5)] backdrop-blur-md select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB0028] animate-ping" />
            <span>GUESS THE SPEAKERS</span>
          </div>

          <p className="font-sans text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-neutral-200 max-w-sm sm:max-w-md mx-auto px-2 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,1)] font-medium">
            3 Industry Titans. 1 Confidential Stage. Who Will Take The Spotlight?
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
            className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#EB0028] hover:bg-[#D40024] text-white font-display font-black text-[11px] sm:text-xs tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(235,0,40,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>TAKE A GUESS 🎯</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onExploreSpeakers('speaker-1');
            }}
            className="flex-1 xs:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-[#111111] hover:bg-[#1C1C1C] border border-[#2E2E2E] hover:border-[#EB0028] text-white font-mono text-[11px] sm:text-xs tracking-wider rounded-full transition-all cursor-pointer text-center whitespace-nowrap"
          >
            EXPLORE DOSSIERS ↓
          </button>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegister();
            }}
            className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-3 bg-transparent hover:bg-[#111111] border border-[#333333] text-neutral-300 hover:text-white font-mono text-[11px] sm:text-xs tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            <Ticket className="w-3.5 h-3.5 text-[#EB0028]" />
            <span>FREE PASS</span>
          </button>
        </motion.div>

      </div>

    </section>
  );
}

