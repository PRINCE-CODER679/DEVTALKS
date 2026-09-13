import React from 'react';
import { ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function RevealSection({ 
  speaker, 
  isRevealed, 
  onToggleRevealed, 
  onNavigate 
}) {
  return (
    <section 
      id="reveal" 
      className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none border-t border-editorial-border"
    >
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

      {/* TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full">
        <button 
          onClick={() => onNavigate('hero')}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none"
        >
          DEVKRAFT
        </button>

        <nav className="flex items-center gap-6 sm:gap-8 font-mono text-xs tracking-widest text-white/70">
          <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">HOME</button>
          <button onClick={() => onNavigate('clues')} className="hover:text-white transition-colors">CLUES</button>
          <button onClick={() => onNavigate('guess')} className="hover:text-white transition-colors">GUESS</button>
          <button onClick={() => onNavigate('reveal')} className="text-white font-bold transition-colors">☰</button>
        </nav>
      </header>

      {/* BEFORE REVEAL: MINIMAL COUNTDOWN BANNER (Reference Slide 9) */}
      {!isRevealed ? (
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center py-16 space-y-6">
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-white/60 uppercase font-light">
            REVEALING IN
          </p>

          <div className="flex items-baseline justify-center gap-6 sm:gap-12">
            <span className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white/40 tracking-tight">
              03
            </span>
            <span className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white/70 tracking-tight">
              02
            </span>
            <span className="font-serif text-6xl sm:text-8xl lg:text-9xl text-brand-red font-bold tracking-tight">
              01
            </span>
          </div>

          {/* Dev / Preview Trigger button */}
          <div className="pt-6">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onToggleRevealed();
              }}
              className="group inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors font-mono text-xs tracking-widest uppercase focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full border border-white/30 group-hover:border-brand-red flex items-center justify-center transition-colors">
                <Eye className="w-4 h-4 text-brand-red" />
              </div>
              <span>PREVIEW REVEAL PAYOFF</span>
            </button>
          </div>
        </div>
      ) : (
        /* AFTER REVEAL: SPEAKER DECLASSIFIED (Reference Slide 10) */
        <div className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-8">
          
          {/* Left Column: Speaker Identity & Details */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            <div className="font-mono text-xs tracking-widest text-brand-red uppercase font-bold">
              THE SPEAKER IS...
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
                {speaker.revealed.name}
              </h2>
              <p className="font-mono text-sm sm:text-base text-white/80 font-medium">
                {speaker.revealed.role}
              </p>
            </div>

            <p className="font-sans text-sm sm:text-base text-white/60 font-light max-w-md leading-relaxed">
              {speaker.revealed.tagline}
            </p>

            {/* Minimal metadata */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs text-white/40">
              <span>OCTOBER 2026</span>
              <span>•</span>
              <span>YOUR COLLEGE</span>
              <span>•</span>
              <span className="text-white/60">DEVKRAFT</span>
            </div>

            {/* Action & Handwritten Accent */}
            <div className="pt-4 flex items-center gap-8">
              <button
                onClick={() => soundFx.playEvidenceClick()}
                className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs tracking-widest uppercase focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>LEARN MORE</span>
              </button>

              <span className="font-handwritten text-2xl sm:text-3xl text-brand-red -rotate-6">
                {speaker.revealed.accentNote || "See you there!"}
              </span>
            </div>

          </div>

          {/* Right Column: Speaker Photograph with Neon Overlay */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] bg-void border border-white/10 overflow-hidden shadow-2xl group">
              <img
                src={speaker.revealed.image}
                alt={speaker.revealed.name}
                className="w-full h-full object-cover grayscale-0 contrast-105 brightness-95 group-hover:scale-105 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent pointer-events-none" />

              {/* Red Handwritten Cursive Signature Overlay */}
              <div className="absolute bottom-6 right-6 pointer-events-none transform -rotate-6">
                <span className="font-handwritten font-bold text-3xl sm:text-4xl text-brand-red drop-shadow-md">
                  {speaker.revealed.scriptQuote || "Ideas Worth Spreading."}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* BOTTOM FOOTER / WATERMARK */}
      <div className="relative z-20 flex items-center justify-between w-full font-mono text-[10px] text-white/30">
        <span className="tracking-mega uppercase">DEV TALKS '26</span>
        <span>
          {!isRevealed ? "THE WAIT IS ALMOST OVER..." : "OFFICIAL REVEAL COMPLETED"}
        </span>
      </div>

    </section>
  );
}
