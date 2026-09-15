import React from 'react';
import { 
  ArrowUp, 
  Calendar, 
  Clock, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Github 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function FooterSection({ onNavigate, onRegisterNow, onReplayIntro }) {
  const scrollToTop = () => {
    soundFx.playEvidenceClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#080808] text-white border-t border-[#222222] overflow-hidden select-none">
      
      {/* ================= FULL-BLEED RED AUDIENCE CROWD BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <img 
          src="/footer-crowd-red.jpg" 
          alt="DevTalks Keynote Stadium Crowd" 
          className="w-full h-full object-cover object-bottom filter brightness-95 contrast-125 opacity-75 hue-rotate-[15deg] saturate-125"
        />
        
        {/* Soft atmospheric gradients */}
        <div className="absolute inset-0 bg-[#080808]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/90 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
      </div>

      {/* ================= SEAMLESS 4-COLUMN FOOTER NAVIGATION ================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-16 pb-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          
          {/* Col 1: Brand / DEVTALKS '26 */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/devkraft-logo.png" 
                alt="Devkraft Logo" 
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,85,0,0.5)]" 
              />
              <div className="h-7 w-px bg-white/30 hidden sm:block" />
              <div>
                <span className="font-display font-black text-lg sm:text-xl tracking-widest text-white block drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  DEVTALKS '26
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-neutral-300 block uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  OFFICIAL EVENT BY DEVKRAFT
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-200 max-w-sm leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              The premier annual gathering uniting developers, entrepreneurs, AI researchers, and engineers for 2 days of unfiltered keynote dialogues.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-white font-semibold">
              <span className="flex items-center gap-1.5 bg-black/80 px-3 py-1.5 rounded-lg border border-white/20 shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                <Calendar className="w-3.5 h-3.5 text-[#FF5500]" /> 10-11 JAN 2026
              </span>
              <span className="flex items-center gap-1.5 bg-black/80 px-3 py-1.5 rounded-lg border border-white/20 shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                <Clock className="w-3.5 h-3.5 text-[#FF5500]" /> 6:00 PM IST
              </span>
            </div>
          </div>

          {/* Col 2: NAVIGATION */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#FFAA00] drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-white">
              <li>
                <button 
                  onClick={() => onNavigate('hero')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  HOME
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-1')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  SPEAKER 01 (FINTECH)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-2')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  SPEAKER 02 (SHARK / D2C)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-3')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  SPEAKER 03 (AI / TECH)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  ABOUT EVENT
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  GUESSES ARENA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: RESOURCES */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#FFAA00] drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-white">
              <li>
                <button 
                  onClick={onRegisterNow} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  Claim Conference Pass
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="text-neutral-200 hover:text-[#FFAA00] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                >
                  Detective Leaderboard
                </button>
              </li>
              <li>
                <span className="text-neutral-400 cursor-not-allowed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  Press Kit (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-neutral-400 cursor-not-allowed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  Code of Conduct
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: CONNECT */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#FFAA00] drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              CONNECT
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] flex items-center justify-center text-white transition-colors shadow-lg"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] flex items-center justify-center text-white transition-colors shadow-lg"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] flex items-center justify-center text-white transition-colors shadow-lg"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] flex items-center justify-center text-white transition-colors shadow-lg"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-black/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] flex items-center justify-center text-white transition-colors shadow-lg"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="font-mono text-[9px] text-neutral-300 block uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                COMMUNITY TAG:
              </span>
              <span className="font-mono text-xs text-white font-bold block pt-0.5 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                #DEVTALKS26
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span>© 2026 DEVTALKS CAMPAIGN.</span>
            <span>•</span>
            <span className="text-white font-semibold">ALL RIGHTS RESERVED.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/80 hover:bg-[#1A1A1A] border border-white/20 hover:border-[#FF5500] text-white transition-all text-xs font-semibold shadow-xl cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF5500]" />
          </button>
        </div>

      </div>

    </footer>
  );
}
