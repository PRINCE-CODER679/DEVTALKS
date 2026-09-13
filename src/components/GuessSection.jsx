import React, { useState } from 'react';
import { ArrowRight, X, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function GuessSection({ validKeywords, onCorrectGuess, onJumpToReveal, onNavigate }) {
  const [guessInput, setGuessInput] = useState('');
  const [attemptState, setAttemptState] = useState('idle'); // 'idle' | 'incorrect' | 'correct'
  const [lastGuessedName, setLastGuessedName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanGuess = guessInput.trim().toLowerCase();
    if (!cleanGuess) return;

    soundFx.playEvidenceClick();
    setLastGuessedName(guessInput.trim());

    const isMatch = validKeywords.some(keyword => {
      const k = keyword.toLowerCase();
      return cleanGuess.includes(k) || k.includes(cleanGuess) || cleanGuess.includes('kunal') || cleanGuess.includes('speaker');
    });

    if (isMatch) {
      soundFx.playAccessGranted();
      setAttemptState('correct');
      if (onCorrectGuess) onCorrectGuess();
    } else {
      soundFx.playAccessDenied();
      setAttemptState('incorrect');
    }
  };

  const handleReset = () => {
    soundFx.playEvidenceClick();
    setGuessInput('');
    setAttemptState('idle');
  };

  return (
    <section 
      id="guess" 
      className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-5 sm:p-10 lg:p-14 select-none border-t border-editorial-border"
    >
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

      {/* TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full pb-2">
        <button 
          onClick={() => {
            soundFx.playEvidenceClick();
            onNavigate('hero');
          }}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors"
        >
          DEVKRAFT
        </button>

        <nav className="flex items-center gap-4 sm:gap-8 font-mono text-[11px] sm:text-xs tracking-widest text-white/70">
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('hero'); }} className="hover:text-white transition-colors">HOME</button>
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('fact-1'); }} className="hover:text-white transition-colors">FACTS</button>
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('guess'); }} className="text-white font-bold transition-colors">GUESS</button>
          <button onClick={() => { soundFx.playEvidenceClick(); onNavigate('reveal'); }} className="hover:text-white transition-colors">☰</button>
        </nav>
      </header>

      {/* IDLE / NORMAL GUESS STATE */}
      {attemptState === 'idle' && (
        <div className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center py-6 sm:py-10">
          
          {/* Left: Input & Call to Action */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8">
            
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              SHARE YOUR GUESS
            </h2>

            <div className="space-y-1 font-sans text-xs sm:text-base text-white/80 font-light">
              <p>Think you know who it is?</p>
              <p className="text-white/60">Enter your guess below.</p>
            </div>

            {/* Pill Rounded Input Container */}
            <form onSubmit={handleSubmit} className="max-w-md pt-2 space-y-3 sm:space-y-4">
              <div className="relative flex items-center bg-[#141414] border border-white/20 focus-within:border-brand-red rounded-full p-1 sm:p-1.5 transition-colors">
                <input
                  type="text"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder="Type the name..."
                  className="w-full bg-transparent px-4 sm:px-5 py-2 sm:py-2.5 font-sans text-xs sm:text-base text-white placeholder-white/40 focus:outline-none"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={!guessInput.trim()}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-red hover:bg-brand-crimson disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all focus:outline-none"
                  aria-label="Submit"
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Tip Text */}
              <p className="font-sans text-[11px] sm:text-xs text-white/40 italic pl-3 sm:pl-4">
                Tip: Be specific. There's no harm in being bold :)
              </p>
            </form>

          </div>

          {/* Right: Contour Lines / Dark Atmosphere */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-[radial-gradient(circle,rgba(255,42,26,0.12)_0%,rgba(0,0,0,0)_70%)] flex items-center justify-center">
              <div className="w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-white/5 flex items-center justify-center">
                <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-white/5" />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* INCORRECT GUESS STATE */}
      {attemptState === 'incorrect' && (
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 space-y-4 sm:space-y-6">
          
          {/* Deep Red Halo Silhouette Backdrop */}
          <div className="relative w-36 sm:w-64 aspect-square mb-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-red/30 rounded-full blur-2xl sm:blur-3xl" />
            
            {/* Center (X) Icon */}
            <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 flex items-center justify-center text-white bg-void/60 backdrop-blur-sm">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              NOT QUITE.
            </h3>
            <p className="font-sans text-xs sm:text-base text-white/60">
              The investigation continues...
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs sm:text-sm tracking-widest uppercase focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span>TRY AGAIN</span>
            </button>
          </div>

          <div className="pt-4 sm:pt-8 text-editorial-dim text-[11px] sm:text-xs font-serif italic">
            Better luck next time.
          </div>

        </div>
      )}

      {/* CORRECT GUESS STATE */}
      {attemptState === 'correct' && (
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 space-y-4 sm:space-y-6">
          
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-green-500/60 bg-green-500/10 text-green-400 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <div className="font-mono text-[10px] sm:text-xs text-green-400 font-bold tracking-widest uppercase">
              MATCH CONFIRMED
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              YOU FOUND THEM.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-sm mx-auto">
              Your deduction matches the classified dossier.
            </p>
          </div>

          <div className="pt-3 sm:pt-4">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onJumpToReveal();
              }}
              className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs sm:text-sm tracking-widest uppercase focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span>PROCEED TO REVEAL</span>
            </button>
          </div>

        </div>
      )}

      {/* BOTTOM WATERMARK */}
      <div className="relative z-20 flex items-center justify-between w-full font-mono text-[10px] text-white/30 pt-2">
        <span className="tracking-mega uppercase">DEV TALKS '26</span>
      </div>

    </section>
  );
}
