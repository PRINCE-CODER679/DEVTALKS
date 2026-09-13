import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/dateHelper';
import { Sparkles, Eye, ArrowRight, Shield } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Countdown({ 
  targetDate, 
  isRevealed, 
  onTriggerRevealPreview, 
  onNavigateToEvent 
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section 
      id="countdown" 
      className="relative min-h-screen py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-editorial-border flex flex-col justify-between overflow-hidden"
    >
      {/* Red Atmospheric Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 red-atmospheric-glow rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-editorial-border pb-4">
        <div className="flex items-center gap-3 font-mono text-xs text-brand-lightRed uppercase tracking-mega">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          SECTION 05 // CINEMATIC EMBARGO COUNTDOWN
        </div>
        <div className="font-mono text-xs text-editorial-dim">
          TARGET REVEAL: OCTOBER 18, 2026 // 00:00 IST
        </div>
      </div>

      {/* Center Cinematic Stage */}
      <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center space-y-10">
        
        {/* Silhouette Center Background */}
        <div className="relative w-44 sm:w-56 aspect-square mx-auto mb-2 group">
          {/* Pulsing Red Halo behind Silhouette */}
          <div className="absolute inset-0 bg-brand-red/35 rounded-full blur-3xl animate-pulse-subtle" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden border border-editorial-border/80 bg-void p-1 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
              alt="Speaker Silhouette Teaser"
              className="w-full h-full object-cover rounded-full grayscale contrast-[250%] brightness-[0.14] scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-brand-darkRed/25 to-transparent mix-blend-screen" />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-void border border-brand-red/40 font-mono text-[9px] tracking-mega text-brand-lightRed uppercase shadow-md">
            KEYNOTE_EMBARGO
          </div>
        </div>

        {/* REVEALING IN Label */}
        <div className="space-y-2">
          <p className="font-mono text-xs sm:text-sm tracking-mega text-editorial-muted uppercase">
            REVEALING IN
          </p>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            THE IDENTITY UNVEILING
          </h2>
        </div>

        {/* Large Restrained Countdown Numbers */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto w-full">
          
          {/* Days */}
          <div className="bg-surface/90 border border-editorial-border p-4 sm:p-6 text-center">
            <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter">
              {timeLeft.days}
            </div>
            <div className="font-mono text-[9px] sm:text-xs text-editorial-dim tracking-widest uppercase mt-2">
              DAYS
            </div>
          </div>

          {/* Hours */}
          <div className="bg-surface/90 border border-editorial-border p-4 sm:p-6 text-center">
            <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter">
              {timeLeft.hours}
            </div>
            <div className="font-mono text-[9px] sm:text-xs text-editorial-dim tracking-widest uppercase mt-2">
              HOURS
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-surface/90 border border-editorial-border p-4 sm:p-6 text-center">
            <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter">
              {timeLeft.minutes}
            </div>
            <div className="font-mono text-[9px] sm:text-xs text-editorial-dim tracking-widest uppercase mt-2">
              MINS
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-surface/90 border border-editorial-border p-4 sm:p-6 text-center border-b-2 border-b-brand-red">
            <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-brand-lightRed tracking-tighter">
              {timeLeft.seconds}
            </div>
            <div className="font-mono text-[9px] sm:text-xs text-brand-lightRed tracking-widest uppercase mt-2 font-semibold">
              SECS
            </div>
          </div>

        </div>

        {/* Bottom Teaser Headline */}
        <div className="space-y-4 max-w-lg">
          <p className="font-display font-bold text-xl sm:text-2xl text-editorial-light tracking-wide uppercase">
            THE SPEAKER IS... <span className="text-brand-lightRed">STAY TUNED.</span>
          </p>
          <p className="font-sans text-xs text-editorial-dim leading-relaxed">
            When the timer strikes zero, the mystery silhouette will demystify into the confirmed keynote speaker profile and registration gateway.
          </p>

          {/* Manual Reveal Preview Button for Demo & Organizers */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onTriggerRevealPreview();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-red text-white hover:bg-brand-crimson font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span>PREVIEW SPEAKER REVEAL PAYOFF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 pt-6 border-t border-editorial-border/60 flex items-center justify-between text-editorial-dim font-mono text-xs">
        <span>DEVTALKS '26 EMBARGO PROTOCOL</span>
        <span>POWERED BY DEVKRAFT</span>
      </div>
    </section>
  );
}
