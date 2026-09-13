import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function LandingHero({ onBeginInvestigation, onNavigate, onOpenMenu }) {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-5 sm:p-10 lg:p-14 overflow-hidden select-none"
    >
      {/* Background Side-Profile Silhouette with Red Rim Lighting (Right Side) */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden">
        
        {/* Subtle Red Volumetric Atmospheric Back-Glow */}
        <div className="absolute right-4 sm:right-24 top-1/3 w-64 sm:w-[480px] h-64 sm:h-[480px] bg-brand-red/25 rounded-full blur-[110px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative w-full sm:w-[85%] lg:w-[65%] xl:w-[58%] h-full flex items-center justify-end"
        >
          <img
            src="/landing-profile.jpg"
            alt="DevTalks '26 Keynote Silhouette"
            className="w-full h-full object-cover object-center sm:object-right brightness-115 contrast-125 saturate-125"
          />
          {/* Subtle gradient blend on the left to ensure high readability of typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/50 pointer-events-none" />
        </motion.div>
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10 opacity-25" />

      {/* TOP HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-30 flex items-center justify-between w-full pb-2"
      >
        <button 
          onClick={() => {
            soundFx.playEvidenceClick();
            onNavigate('hero');
          }}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors whitespace-nowrap"
        >
          DEVKRAFT
        </button>

        <div className="flex items-center gap-3">
          <div className="font-mono text-[10px] sm:text-xs tracking-widest sm:tracking-mega text-white/50 uppercase">
            DEVTALKS '26
          </div>
          
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onOpenMenu();
            }}
            className="sm:hidden flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white/80 hover:text-white py-1 px-2 border border-white/10 rounded-sm bg-void/50 focus:outline-none ml-2"
            aria-label="Open Navigation Menu"
          >
            <div className="flex flex-col justify-center space-y-1 w-3.5">
              <span className="w-full h-[1.5px] bg-white" />
              <span className="w-full h-[1.5px] bg-white" />
              <span className="w-full h-[1.5px] bg-white" />
            </div>
          </button>
        </div>
      </motion.header>

      {/* MAIN LEFT EDITORIAL COLUMN */}
      <div className="relative z-30 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center max-w-7xl w-full py-6 sm:py-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* PRESENTS */}
          <div className="font-mono text-xs sm:text-sm tracking-widest text-white/80 uppercase font-semibold">
            PRESENTS
          </div>

          {/* DEVTALKS '26 */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[1] sm:leading-[0.95]">
              DEVTALKS <span className="text-brand-red">'26</span>
            </h1>
            <p className="font-mono text-[11px] sm:text-sm tracking-widest text-white/70 uppercase">
              IDEAS. PEOPLE. IMPACT.
            </p>
          </div>

          {/* SOMEONE IS COMING. CAN YOU FIGURE OUT WHO? */}
          <div className="space-y-0.5 sm:space-y-1 font-mono text-xs sm:text-base text-white/90 uppercase font-light pt-1 sm:pt-2">
            <p>SOMEONE IS COMING.</p>
            <p className="text-white/60">CAN YOU FIGURE OUT WHO?</p>
          </div>

          {/* BEGIN THE INVESTIGATION CTA */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onBeginInvestigation();
              }}
              className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs sm:text-sm tracking-widest uppercase focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors group-hover:scale-110">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-semibold">BEGIN THE INVESTIGATION</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM METADATA BAR */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-30 flex items-end justify-between w-full font-mono text-[10px] sm:text-xs text-white/40 pt-2"
      >
        {/* Bottom-Left: SCROLL */}
        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onBeginInvestigation();
          }}
          className="flex items-center gap-2 hover:text-white transition-colors py-1"
        >
          <span className="tracking-widest uppercase text-white/70">SCROLL</span>
          <span className="h-3 sm:h-4 w-[1.5px] bg-white/40" />
        </button>

        {/* Bottom-Right: OCTOBER 2026 // YOUR COLLEGE */}
        <div className="text-right tracking-widest uppercase text-white/60">
          OCTOBER 2026 <br className="xs:hidden" />
          <span className="hidden xs:inline"> // </span>
          YOUR COLLEGE
        </div>
      </motion.div>

    </section>
  );
}
