import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function CaseFile({ onExploreClues, onNavigate, onOpenMenu }) {
  return (
    <section 
      id="casefile" 
      className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-5 sm:p-10 lg:p-14 select-none border-t border-editorial-border"
    >
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

      {/* TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full pb-3 border-b border-white/10">
        <button 
          onClick={() => {
            soundFx.playEvidenceClick();
            onNavigate('hero');
          }}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors whitespace-nowrap"
        >
          DEVKRAFT
        </button>

        {/* Desktop / Tablet Nav (sm:flex) */}
        <nav className="hidden sm:flex items-center gap-6 lg:gap-8 font-mono text-xs tracking-widest text-white/70 whitespace-nowrap">
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('hero'); }} className="hover:text-white transition-colors">HOME</button>
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('fact-1'); }} className="hover:text-white transition-colors">FACTS</button>
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('guess'); }} className="hover:text-white transition-colors">GUESS</button>
          <button onClick={() => { soundFx.playEvidenceClick(); onOpenMenu(); }} className="hover:text-white transition-colors">☰</button>
        </nav>

        {/* Mobile Clean Menu Button (< sm) */}
        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onOpenMenu();
          }}
          className="sm:hidden flex items-center gap-2 font-mono text-xs tracking-widest text-white/90 hover:text-white focus:outline-none py-1 px-2 border border-white/10 rounded-sm bg-void/50"
          aria-label="Open Navigation Menu"
        >
          <span className="tracking-widest uppercase text-[10px]">MENU</span>
          <div className="flex flex-col justify-center space-y-1 w-3.5">
            <span className="w-full h-[1.5px] bg-white" />
            <span className="w-full h-[1.5px] bg-white" />
            <span className="w-full h-[1.5px] bg-white" />
          </div>
        </button>
      </header>

      {/* MAIN 2-COLUMN DOSSIER GRID */}
      <div className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center py-6 sm:py-10">
        
        {/* Left Column: Typography & Inquiry */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8"
        >
          
          {/* CASE FILE 001 */}
          <div className="font-mono text-xs sm:text-sm tracking-widest text-white uppercase font-bold">
            CASE FILE <span className="text-brand-red">001</span>
          </div>

          {/* WHO IS THE SPEAKER? with Red Ellipse */}
          <div className="relative inline-block max-w-full">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[1.05]">
              WHO IS THE <br />
              <span className="relative inline-block">
                SPEAKER?
                {/* Red Hand-Drawn SVG Ellipse Ring */}
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
                  className="absolute -inset-x-2 -inset-y-1 sm:-inset-x-4 sm:-inset-y-2 w-[calc(100%+1rem)] sm:w-[calc(100%+2rem)] h-[calc(100%+0.5rem)] sm:h-[calc(100%+1rem)] pointer-events-none stroke-brand-red fill-none"
                  viewBox="0 0 340 85" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 15 42 C 40 10, 305 8, 328 38 C 342 60, 280 76, 145 74 C 40 72, 2 58, 28 36" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                </motion.svg>
              </span>
            </h2>
          </div>

          {/* Body Copy */}
          <div className="space-y-1 font-sans text-xs sm:text-base text-white/80 font-light">
            <p>We can't tell you who.</p>
            <p className="text-white/60">But we can give you clues.</p>
          </div>

          {/* Circle Arrow CTA: EXPLORE FACTS */}
          <div className="pt-2">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onExploreClues();
              }}
              className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs sm:text-sm tracking-widest uppercase focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors group-hover:scale-110">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-semibold">EXPLORE FACTS</span>
            </button>
          </div>

        </motion.div>

        {/* Right Column: Taped Obscured Photo & Handwritten Note */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 flex justify-center lg:justify-end w-full"
        >
          
          <div className="relative w-full max-w-xs sm:max-w-md bg-[#121212] border border-white/10 p-3.5 sm:p-5 shadow-2xl group">
            
            {/* White Tape Stamps */}
            <div className="absolute -top-2.5 left-1/4 w-10 sm:w-12 h-5 sm:h-6 bg-white/20 backdrop-blur-sm -rotate-6 z-30 shadow-sm" />
            <div className="absolute -top-2.5 right-1/4 w-10 sm:w-12 h-5 sm:h-6 bg-white/20 backdrop-blur-sm rotate-6 z-30 shadow-sm" />
            <div className="absolute -bottom-2.5 left-1/3 w-12 sm:w-14 h-5 sm:h-6 bg-white/20 backdrop-blur-sm rotate-3 z-30 shadow-sm" />

            {/* Obscured Portrait Photo */}
            <div className="relative aspect-[4/3] bg-void overflow-hidden">
              <img
                src="/case-evidence.jpg"
                alt="Case File Obscured Evidence"
                className="w-full h-full object-cover grayscale contrast-[120%] brightness-[0.95] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent opacity-80" />
            </div>

            {/* Handwritten Note Strip on Right/Bottom */}
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="absolute -right-2 sm:-right-6 top-1/3 max-w-[120px] sm:max-w-[150px] bg-[#1a1a1a]/95 border border-white/10 p-2 sm:p-3 shadow-xl transform rotate-2 transition-transform"
            >
              <p className="font-handwritten text-[11px] sm:text-sm text-white/90 leading-tight">
                Some people don't just build careers, they build the future.
              </p>
            </motion.div>

          </div>

        </motion.div>

      </div>

      {/* BOTTOM WATERMARK */}
      <div className="relative z-20 flex items-center justify-end w-full pt-2">
        <span className="font-mono text-[10px] tracking-mega text-white/30 uppercase">
          DEV TALKS '26
        </span>
      </div>

    </section>
  );
}
