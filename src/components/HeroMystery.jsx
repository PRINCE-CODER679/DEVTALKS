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
      className="relative w-full min-h-[100dvh] bg-[#000000] text-white flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 md:px-8 overflow-hidden select-none"
    >
      {/* ================= FULL-SCREEN BACKGROUND ARTWORK: 3 KEYNOTE SPEAKERS IN PROFESSIONAL ATTIRE ================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Full Screen Cinematic 3 Keynote Speakers on Stage with 3 Red Panels */}
        <img 
          src="/red-stage-panels.jpg" 
          alt="DEVTALKS '26 3 Mystery Keynote Speakers on Stage" 
          className="w-full h-full object-cover object-center max-w-[1440px] opacity-95 filter brightness-105 contrast-110"
        />

        {/* Seamless Vignette Fades to pure black */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-52 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        {/* Ambient Red Glow Pulse */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[800px] h-[320px] sm:h-[600px] md:h-[800px] bg-[#EB0028]/20 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10 opacity-20" />

      {/* ================= TOP SECTION: COMING SOON! (ACCURATELY POSITIONED & STYLED WITHIN SCREEN) ================= */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center text-center px-2">
        
        {/* Top Massive Headline: COMING SOON! */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-1 w-full max-w-full"
        >
          <h1 className="font-display font-black tracking-wider sm:tracking-widest md:tracking-[0.12em] uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none sm:leading-tight flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-5">
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F0F0F0] to-[#A8A8A8] bg-clip-text text-transparent filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              COMING
            </span>
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F0F0F0] to-[#A8A8A8] bg-clip-text text-transparent filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              SOON!
            </span>
          </h1>

          {/* Subtle Red Accent Line */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#EB0028]" />
            <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.25em] text-[#EB0028] font-bold uppercase drop-shadow-[0_0_8px_rgba(235,0,40,0.8)]">
              DEVTALKS '26
            </span>
            <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#EB0028]" />
          </div>
        </motion.div>

      </div>

      {/* ================= CENTER SECTION: CINEMATIC SPACER FOR 3 SPEAKERS STAGE VISUAL ================= */}
      <div className="relative z-30 max-w-4xl mx-auto w-full h-[120px] sm:h-[200px] md:h-[260px] flex items-center justify-center my-auto pointer-events-none">
        {/* Clean visual focus on the 3 professional speakers seated on stage */}
      </div>

      {/* ================= BOTTOM SECTION: DEVTALKS '26 & ACTION BUTTONS ================= */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-3 sm:space-y-4">
        
        {/* Main Title: DEVTALKS '26 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1"
        >
          <h2 className="font-display font-black tracking-tight uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white drop-shadow-[0_10px_35px_rgba(235,0,40,0.4)]">
            <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
              DEVTALKS
            </span>
            <span className="text-[#EB0028] ml-1.5 sm:ml-2 font-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_0_25px_rgba(235,0,40,0.8)]">
              '26
            </span>
          </h2>

          <div className="font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-xs md:text-sm text-[#EB0028] uppercase drop-shadow-[0_0_10px_rgba(235,0,40,0.7)]">
            GUESS THE SPEAKERS
          </div>

          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-neutral-300 max-w-md sm:max-w-lg mx-auto pt-0.5 px-3">
            3 Industry Titans. 1 Confidential Stage. Who Will Take The Spotlight?
          </p>
        </motion.div>

        {/* Action Button Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto pt-1 px-4"
        >
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onTakeGuess();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 bg-[#EB0028] hover:bg-[#D40024] text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-[0_0_25px_rgba(235,0,40,0.55)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>TAKE A GUESS 🎯</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onExploreSpeakers('speaker-1');
            }}
            className="w-full sm:w-auto px-5 py-3 bg-[#111111] hover:bg-[#1C1C1C] border border-[#2E2E2E] hover:border-[#EB0028] text-white font-mono text-xs tracking-wider rounded-full transition-all cursor-pointer text-center"
          >
            EXPLORE DOSSIERS ↓
          </button>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegister();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-transparent hover:bg-[#111111] border border-[#333333] text-neutral-300 hover:text-white font-mono text-xs tracking-wider rounded-full transition-all cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-[#EB0028]" />
            <span>FREE PASS</span>
          </button>
        </motion.div>

      </div>

    </section>
  );
}

