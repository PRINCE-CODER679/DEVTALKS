import React from 'react';
import { 
  ArrowUp, 
  Calendar, 
  Clock, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone 
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

      {/* ================= SEAMLESS 4-COLUMN FOOTER NAVIGATION & CONTACT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-16 pb-10">
        
        {/* Main 4-Column Grid: Structured with clean alignment & responsive spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-12 items-start">
          
          {/* Col 1: Brand / DEVTALKS '26 */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/devkraft-logo.png" 
                alt="Devkraft Logo" 
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,90,31,0.2)]" 
              />
              <div className="h-7 w-px bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="font-display font-black text-lg sm:text-xl tracking-wider text-[#f4f0e8] leading-tight block drop-shadow-md">
                  DEVTALKS <span className="text-[#ff5a1f] font-mono">'26</span>
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#817b73] block uppercase font-bold">
                  OFFICIAL EVENT BY DEVKRAFT
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#c8c1b7] max-w-sm leading-relaxed drop-shadow-sm">
              The premier annual gathering uniting developers, entrepreneurs, AI researchers, and engineers for 2 days of unfiltered keynote dialogues.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#f4f0e8] font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 shadow-sm bg-black/50 backdrop-blur-xs">
                <Calendar className="w-3.5 h-3.5 text-[#ff5a1f]" /> 10-11 JAN 2026
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 shadow-sm bg-black/50 backdrop-blur-xs">
                <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" /> 6:00 PM IST
              </span>
            </div>
          </div>

          {/* Col 2: NAVIGATION */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-[#ff5a1f] flex items-center gap-2 drop-shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
              NAVIGATION
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('hero')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer drop-shadow-sm"
                >
                  <span className="text-[#817b73] text-[10px]">01 //</span>
                  <span>HOME</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-1')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer drop-shadow-sm"
                >
                  <span className="text-[#817b73] text-[10px]">02 //</span>
                  <span>SPEAKER 01 (FINTECH)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-2')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer drop-shadow-sm"
                >
                  <span className="text-[#817b73] text-[10px]">03 //</span>
                  <span>SPEAKER 02 (SHARK / D2C)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('speaker-3')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer drop-shadow-sm"
                >
                  <span className="text-[#817b73] text-[10px]">04 //</span>
                  <span>SPEAKER 03 (AI / TECH)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer drop-shadow-sm"
                >
                  <span className="text-[#817b73] text-[10px]">05 //</span>
                  <span>ABOUT EVENT</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-2 cursor-pointer drop-shadow-sm"
                >
                  <span className="text-[#817b73] text-[10px]">06 //</span>
                  <span>GUESSES ARENA</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: RESOURCES */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-[#ff5a1f] flex items-center gap-2 drop-shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
              RESOURCES
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <button 
                  onClick={onRegisterNow} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-1.5 cursor-pointer drop-shadow-sm"
                >
                  <span>→ Claim Pass</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-1.5 cursor-pointer drop-shadow-sm"
                >
                  <span>→ Guess Challenge</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guesses')} 
                  className="w-full text-left text-[#f4f0e8] hover:text-[#ff5a1f] font-medium transition-all hover:translate-x-1 flex items-center gap-1.5 cursor-pointer drop-shadow-sm"
                >
                  <span>→ Leaderboard</span>
                </button>
              </li>
              <li className="text-[#817b73] text-[11px] pt-1">
                <span>• Press Kit</span>
              </li>
              <li className="text-[#817b73] text-[11px]">
                <span>• Code of Conduct</span>
              </li>
            </ul>
          </div>

          {/* Col 4: CONNECT & CONTACT */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-[#ff5a1f] flex items-center gap-2 drop-shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
              CONNECT & CONTACT
            </h4>
            
            {/* Social Link Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a 
                href="https://www.instagram.com/devkraft.dpu?stkn=aGhlYzNiaTZ1YXk3" 
                target="_blank" 
                rel="noreferrer"
                className="h-8 px-3 rounded-lg border border-white/15 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/50 backdrop-blur-xs flex items-center gap-1.5 text-[#f4f0e8] transition-colors shadow-sm font-mono text-[11px]"
                title="Instagram @devkraft.dpu"
              >
                <Instagram className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>@devkraft.dpu</span>
              </a>
              <a 
                href="https://x.com/devkraftclub" 
                target="_blank" 
                rel="noreferrer"
                className="h-8 px-3 rounded-lg border border-white/15 hover:border-[#ff5a1f] hover:text-[#ff5a1f] bg-black/50 backdrop-blur-xs flex items-center gap-1.5 text-[#f4f0e8] transition-colors shadow-sm font-mono text-[11px]"
                title="Twitter / X @devkraftclub"
              >
                <Twitter className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>@devkraftclub</span>
              </a>
            </div>

            {/* Official Email */}
            <div className="space-y-1 pt-0.5">
              <span className="font-mono text-[9px] text-[#817b73] block uppercase font-bold tracking-wider">
                OFFICIAL EMAIL:
              </span>
              <a 
                href="mailto:devkraftclub@gmail.com"
                className="font-mono text-xs text-[#f4f0e8] hover:text-[#ff5a1f] flex items-center gap-2 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>devkraftclub@gmail.com</span>
              </a>
            </div>

            {/* Contact Numbers */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[#c8c1b7] bg-black/40 px-2.5 py-1.5 rounded-md border border-white/10">
                  <span className="font-medium text-[#f4f0e8]">Tejas</span>
                  <a href="tel:9322272212" className="text-[#ff8a3d] hover:text-[#ff5a1f] font-semibold transition-colors flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#ff5a1f]" /> 9322272212
                  </a>
                </div>
                <div className="flex items-center justify-between text-[#c8c1b7] bg-black/40 px-2.5 py-1.5 rounded-md border border-white/10">
                  <span className="font-medium text-[#f4f0e8]">Asrar</span>
                  <a href="tel:9699027295" className="text-[#ff8a3d] hover:text-[#ff5a1f] font-semibold transition-colors flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#ff5a1f]" /> 9699027295
                  </a>
                </div>
              </div>
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
