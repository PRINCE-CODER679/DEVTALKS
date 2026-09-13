import React, { useState } from 'react';
import { Lock, CheckCircle2, ChevronDown, ChevronUp, Sparkles, HelpCircle, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ClueCard({ clue, isLocked, onNavigateToGuess }) {
  const [showHint, setShowHint] = useState(false);

  if (isLocked) {
    return (
      <div className="relative bg-surface/60 border border-editorial-border p-8 sm:p-12 min-h-[480px] flex flex-col justify-between overflow-hidden group">
        {/* Subtle grid in locked card */}
        <div className="absolute inset-0 subtle-dossier-grid opacity-20 pointer-events-none" />
        
        {/* Top Locked Metadata */}
        <div className="flex items-center justify-between border-b border-editorial-border/60 pb-4">
          <div className="flex items-center gap-2 text-editorial-dim font-mono text-xs">
            <span className="text-brand-lightRed font-bold">{clue.number}</span>
            <span>/</span>
            <span>{clue.totalClues}</span>
            <span className="ml-2 text-editorial-dim">[{clue.dayLabel}]</span>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-void border border-brand-red/40 text-brand-lightRed font-mono text-[10px] tracking-widest uppercase">
            <Lock className="w-3 h-3" />
            <span>LOCKED</span>
          </div>
        </div>

        {/* Locked Center Teaser Message */}
        <div className="my-auto py-8 space-y-6 max-w-lg">
          <div className="inline-block px-3 py-1 bg-surface border border-editorial-border font-mono text-xs text-editorial-dim uppercase tracking-mega">
            {clue.tag || "ENCRYPTED EVIDENCE"}
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
              THE NEXT PIECE <br />
              OF THE STORY <br />
              <span className="text-editorial-dim">IS COMING.</span>
            </h3>
            <p className="font-sans text-sm text-editorial-muted leading-relaxed">
              This chapter of the investigation is currently sealed under embargo. 
              Check back as the countdown progresses to analyze this release.
            </p>
          </div>

          {/* Release Date info */}
          <div className="pt-2 font-mono text-xs text-brand-lightRed flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-red animate-ping" />
            <span>COMING TOMORROW // 09:00 IST</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-editorial-border/60 flex items-center justify-between text-editorial-dim font-mono text-[11px]">
          <span>STATUS: EMBARGOED</span>
          <span>SECURITY PROTOCOL 0{clue.id}</span>
        </div>
      </div>
    );
  }

  // UNLOCKED STATE
  return (
    <div className="relative bg-surface/80 border border-editorial-border p-6 sm:p-10 transition-all duration-300">
      {/* Top Clue Chapter Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-editorial-border pb-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-display font-black text-2xl sm:text-3xl text-brand-lightRed">
            {clue.number}
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              CLUE {clue.number} • {clue.tag}
            </span>
            <span className="font-mono text-[10px] text-editorial-dim tracking-wider">
              {clue.dossierCode}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-red/10 border border-brand-red text-brand-lightRed text-[10px] tracking-widest uppercase">
            <CheckCircle2 className="w-3 h-3 text-brand-red" />
            <span>UNLOCKED</span>
          </span>
        </div>
      </div>

      {/* Clue Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Clue Text & Metrics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-snug">
              {clue.title}
            </h3>
            <p className="font-mono text-xs text-brand-lightRed tracking-wider uppercase">
              {clue.subtitle}
            </p>
          </div>

          <p className="font-sans text-base sm:text-lg text-editorial-light font-light leading-relaxed">
            {clue.description}
          </p>

          <p className="font-sans text-xs sm:text-sm text-editorial-muted leading-relaxed border-l-2 border-brand-red/60 pl-4 py-1">
            {clue.extendedClue}
          </p>

          {/* Metrics / Telemetry tags */}
          {clue.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {clue.metrics.map((m, idx) => (
                <div key={idx} className="bg-void/60 border border-editorial-border p-2.5 font-mono">
                  <div className="text-[9px] text-editorial-dim tracking-widest uppercase">{m.label}</div>
                  <div className="text-white text-xs font-bold mt-0.5 tracking-tight">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Hint Expander */}
          {clue.hint && (
            <div className="pt-2">
              <button
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setShowHint(!showHint);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-editorial-muted hover:text-white transition-colors py-1 focus:outline-none"
              >
                <HelpCircle className="w-3.5 h-3.5 text-brand-red" />
                <span className="tracking-wider">{showHint ? "HIDE INVESTIGATION HINT" : "NEED A CLUE HINT?"}</span>
                {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showHint && (
                <div className="mt-2 p-3 bg-brand-red/5 border border-brand-red/30 text-xs font-mono text-editorial-light animate-fade-in">
                  <span className="text-brand-lightRed font-bold">HINT: </span>
                  {clue.hint}
                </div>
              )}
            </div>
          )}

          {/* Submit Guess Prompt Shortcut */}
          <div className="pt-4 border-t border-editorial-border/60 flex items-center justify-between">
            <span className="text-xs font-mono text-editorial-dim">
              Already have a theory?
            </span>
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onNavigateToGuess();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-lightRed hover:text-white tracking-widest uppercase transition-colors"
            >
              <span>SUBMIT GUESS</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Exhibit Visual / Photograph (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-[4/3] bg-void border border-editorial-border overflow-hidden group">
            <img
              src={clue.image}
              alt={clue.title}
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
            />
            {/* Red Scanline Accent */}
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent pointer-events-none" />
            
            {/* Top Corner Stamp */}
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-void/80 backdrop-blur-md border border-editorial-border text-[8px] font-mono text-editorial-dim uppercase">
              DEVTALKS ARCHIVE
            </div>

            {/* Corner crosshairs */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-brand-red" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-brand-red" />
          </div>

          <div className="font-mono text-[10px] text-editorial-dim tracking-wider uppercase text-center sm:text-left">
            {clue.imageCaption}
          </div>
        </div>

      </div>
    </div>
  );
}
