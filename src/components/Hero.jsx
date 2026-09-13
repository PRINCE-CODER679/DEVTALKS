import React from 'react';
import { ArrowRight, ArrowDown, Fingerprint, Lock, Shield } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Hero({ onStartInvestigation }) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[96vh] md:min-h-screen flex flex-col justify-between pt-28 pb-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Subtle Grid & Scanline */}
      <div className="absolute inset-0 subtle-dossier-grid opacity-40 pointer-events-none" />
      
      {/* Top / Main Content Row */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto">
        
        {/* Left Editorial Narrative (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-editorial-border bg-surface/40 backdrop-blur-md rounded-none">
            <span className="w-1.5 h-1.5 bg-brand-red animate-ping" />
            <span className="font-mono text-xs tracking-mega text-editorial-muted uppercase">
              DEVKRAFT PRESENTS
            </span>
            <span className="text-editorial-dim font-mono text-[10px]">| CASE NO. 26</span>
          </div>

          {/* Huge Main Title */}
          <div className="space-y-2">
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] drop-shadow-sm">
              DEVTALKS <span className="text-brand-red">'26</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm tracking-widest text-editorial-muted uppercase font-semibold">
              IDEAS. PEOPLE. IMPACT.
            </p>
          </div>

          {/* Mystery Prompt Paragraph */}
          <div className="max-w-xl space-y-3 pt-2">
            <p className="font-sans text-xl sm:text-2xl text-editorial-light font-light leading-snug">
              A speaker is coming. <br className="hidden sm:block" />
              <span className="text-editorial-muted">Can you figure out who?</span>
            </p>
            <p className="font-sans text-xs sm:text-sm text-editorial-dim leading-relaxed font-normal">
              An unannounced guest. A sequence of classified daily clues. 
              Analyze the evidence, piece together the breadcrumbs, and decode the identity before the official reveal.
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onStartInvestigation();
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-void hover:bg-brand-red hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl focus:outline-none"
            >
              <span>START THE INVESTIGATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              
              {/* Subtle 1px accent corner marks */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <div className="flex items-center gap-2 text-editorial-dim font-mono text-[11px] tracking-wider px-2">
              <Lock className="w-3.5 h-3.5 text-brand-red" />
              <span>CLASSIFIED CAMPAIGN</span>
            </div>
          </div>

          {/* Micro Status Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-[10px] font-mono text-editorial-dim">
            <span className="border border-editorial-border px-2 py-1">CLUES: 4 CHAPTERS</span>
            <span className="border border-editorial-border px-2 py-1">STATUS: ACTIVE INQUIRY</span>
            <span className="border border-editorial-border px-2 py-1">ACCESS: OPEN CAMPUS</span>
          </div>

        </div>

        {/* Right Mysterious Speaker Visual (5 Columns) */}
        <div className="lg:col-span-5 relative flex items-center justify-center w-full">
          
          {/* Deep Red Atmospheric Glow Behind Silhouette */}
          <div className="absolute -inset-4 sm:-inset-10 red-atmospheric-glow rounded-full blur-3xl opacity-50 pointer-events-none" />

          {/* Evidence Frame Container */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] bg-surface/90 border border-editorial-border hover:border-editorial-borderHover transition-all duration-500 p-3 sm:p-4 group">
            
            {/* Top Evidence Header */}
            <div className="flex items-center justify-between border-b border-editorial-border/60 pb-2 mb-3 text-[10px] font-mono text-editorial-dim">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-brand-red" />
                <span>SUBJECT_ID: DEVTALKS_001</span>
              </span>
              <span className="text-brand-lightRed font-semibold tracking-widest">EMBARGOED</span>
            </div>

            {/* Silhouette Photographic Layer */}
            <div className="relative w-full h-[calc(100%-2.5rem)] overflow-hidden bg-void border border-editorial-border/40 flex items-center justify-center">
              
              {/* Silhouette Dark Image with Red Tint */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
                alt="Mysterious Keynote Speaker Silhouette"
                className="w-full h-full object-cover grayscale contrast-[250%] brightness-[0.16] scale-105 group-hover:scale-110 group-hover:brightness-[0.22] transition-all duration-700"
              />

              {/* Red Backlight Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-brand-darkRed/20 to-transparent mix-blend-screen pointer-events-none" />
              
              {/* Subtle Scanline Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-35 pointer-events-none" />

              {/* Center Obscured Stamp */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <div className="w-16 h-16 rounded-full border border-brand-red/40 flex items-center justify-center mb-3 bg-void/70 backdrop-blur-sm">
                  <Fingerprint className="w-8 h-8 text-brand-red animate-pulse" />
                </div>
                <div className="font-mono text-xs tracking-widest text-brand-lightRed bg-void/95 px-3.5 py-1.5 border border-brand-red/40 uppercase">
                  IDENTITY CONCEALED
                </div>
                <div className="font-mono text-[9px] tracking-mega text-editorial-dim mt-2">
                  DEVTALKS '26 KEYNOTE
                </div>
              </div>

              {/* Red Edge Accent Lines */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-red" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-red" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-red" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-red" />
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Editorial Meta Bar */}
      <div className="relative z-10 pt-10 border-t border-editorial-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-editorial-dim">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold tracking-wider">OCTOBER 2026</span>
          <span className="text-editorial-dim">•</span>
          <span className="tracking-widest">MAIN AUDITORIUM // CAMPUS</span>
        </div>

        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onStartInvestigation();
          }}
          className="group flex items-center gap-2 text-editorial-muted hover:text-white transition-colors focus:outline-none"
        >
          <span className="tracking-widest text-[11px]">SCROLL TO INVESTIGATE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
