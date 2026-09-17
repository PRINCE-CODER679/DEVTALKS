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
    <footer className="relative w-full bg-[#080808] text-[#f4f0e8] border-t border-white/10 overflow-hidden select-none">
      
      {/* ================= ATMOSPHERIC BACKGROUND IMAGE COVERING ENTIRE FOOTER ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <img 
          src="/footer-devtalks-arena.jpg" 
          alt="DevTalks Keynote Arena Stage" 
          className="w-full h-full object-cover object-center filter brightness-110 contrast-120 saturate-110 opacity-90"
        />
        
        {/* Soft edge blends to smoothly connect with page while keeping the auditorium and stage clearly visible */}
        <div className="absolute inset-0 bg-[#080808]/35 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
      </div>

      {/* ================= SEAMLESS 4-COLUMN FOOTER NAVIGATION ================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-16 pb-10">
        
        {/* Main 4-Column Grid: Text directly on background image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          
          {/* Col 1: Brand / DEVTALKS '26 */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/devkraft-logo.png" 
                alt="Devkraft Logo" 
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,90,31,0.2)]" 
              />
              <div className="h-7 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="font-display font-black text-lg sm:text-xl tracking-widest text-[#f4f0e8] block drop-shadow-md">
                  DEVTALKS '26
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#817b73] block uppercase font-bold">
                  OFFICIAL EVENT BY DEVKRAFT
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#c8c1b7] max-w-sm leading-relaxed drop-shadow-sm">
              The premier annual gathering uniting developers, entrepreneurs, AI researchers, and engineers for 2 days of unfiltered keynote dialogues.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#f4f0e8] font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 shadow-sm bg-black/40">
                <Calendar className="w-3.5 h-3.5 text-[#ff5a1f]" /> 10-11 JAN 2026
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 shadow-sm bg-black/40">
                <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" /> 6:00 PM IST
              </span>
            </div>
          </div>

          {/* Col 2: NAVIGATION */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#ff5a1f] drop-shadow-sm">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('hero')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  HOME
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-1')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  SPEAKER 01 (FINTECH)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-2')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  SPEAKER 02 (SHARK / D2C)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-3')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  SPEAKER 03 (AI / TECH)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  ABOUT EVENT
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  GUESSES ARENA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: RESOURCES */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#ff5a1f] drop-shadow-sm">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <button 
                  onClick={onRegisterNow} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  Claim Conference Pass
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  Guess Challenge (Win VIP Pass)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-colors hover:translate-x-1 inline-flex items-center transform transition-transform cursor-pointer drop-shadow-sm"
                >
                  Detective Leaderboard
                </button>
              </li>
              <li>
                <span className="text-[#817b73] cursor-not-allowed">
                  Press Kit (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-[#817b73] cursor-not-allowed">
                  Code of Conduct
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: CONNECT */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#ff5a1f] drop-shadow-sm">
              CONNECT
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/40 flex items-center justify-center text-[#f4f0e8] transition-colors shadow-sm"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/40 flex items-center justify-center text-[#f4f0e8] transition-colors shadow-sm"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/40 flex items-center justify-center text-[#f4f0e8] transition-colors shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/40 flex items-center justify-center text-[#f4f0e8] transition-colors shadow-sm"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/40 flex items-center justify-center text-[#f4f0e8] transition-colors shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="font-mono text-[9px] text-[#817b73] block uppercase font-bold">
                COMMUNITY TAG:
              </span>
              <span className="font-mono text-xs text-[#f4f0e8] font-bold block pt-0.5 tracking-wider">
                #DEVTALKS26
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#817b73]">
          <div className="flex items-center gap-2">
            <span>© 2026 DEVTALKS CAMPAIGN.</span>
            <span>•</span>
            <span className="text-[#f4f0e8] font-semibold">ALL RIGHTS RESERVED.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#ff5a1f] text-[#f4f0e8] hover:text-[#ff5a1f] transition-all text-xs font-semibold shadow-xs cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff5a1f]" />
          </button>
        </div>

      </div>

    </footer>
  );
}
