import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Lock, Sparkles, CheckCircle2, FileText, KeyRound } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { factsData } from '../data/facts';

export default function ClueSection({ clues, onNavigateToGuess, onNavigate }) {
  const [activeTab, setActiveTab] = useState('facts'); // 'facts' | 'clues'
  const [factIdx, setFactIdx] = useState(0);
  const [clueIdx, setClueIdx] = useState(0);

  const currentFact = factsData[factIdx] || factsData[0];
  const currentClue = clues[clueIdx] || clues[0];

  const handleNextFact = () => {
    soundFx.playEvidenceClick();
    if (factIdx < factsData.length - 1) {
      setFactIdx(prev => prev + 1);
    } else {
      setActiveTab('clues');
    }
  };

  const handlePrevFact = () => {
    soundFx.playEvidenceClick();
    if (factIdx > 0) {
      setFactIdx(prev => prev - 1);
    }
  };

  const handleNextClue = () => {
    soundFx.playEvidenceClick();
    if (clueIdx < clues.length - 1) {
      setClueIdx(prev => prev + 1);
    } else {
      onNavigateToGuess();
    }
  };

  const handlePrevClue = () => {
    soundFx.playEvidenceClick();
    if (clueIdx > 0) {
      setClueIdx(prev => prev - 1);
    }
  };

  return (
    <section 
      id="clues" 
      className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none border-t border-editorial-border overflow-hidden"
    >
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

      {/* TOP HEADER & MODE SWITCHER */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 w-full border-b border-white/10 pb-4">
        <button 
          onClick={() => onNavigate('hero')}
          className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors"
        >
          DEVKRAFT
        </button>

        {/* Tab Toggle: FACTS (Active Now) vs DAILY CLUES */}
        <div className="flex items-center gap-2 bg-void p-1 border border-white/10 rounded-none font-mono text-xs">
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              setActiveTab('facts');
            }}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-all ${
              activeTab === 'facts' 
                ? 'bg-brand-red text-white font-bold' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>01. SPEAKER FACTS</span>
          </button>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              setActiveTab('clues');
            }}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-all ${
              activeTab === 'clues' 
                ? 'bg-brand-red text-white font-bold' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>02. DAILY CLUES</span>
          </button>
        </div>

        {/* Quick Jump Nav */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-widest text-white/70">
          <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">HOME</button>
          <button onClick={() => onNavigate('guess')} className="hover:text-white transition-colors">GUESS</button>
          <button onClick={() => onNavigate('reveal')} className="hover:text-white transition-colors">REVEAL</button>
        </nav>
      </header>

      {/* MODE 1: SPEAKER FACTS (Active Now for Students to Read First) */}
      {activeTab === 'facts' && (
        <AnimatePresence mode="wait">
          <motion.div 
            key={factIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-8"
          >
            
            {/* Left Column: Fact Narrative & Numbers (6 cols) */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              {/* Fact Tag Indicator */}
              <div className="space-y-1">
                <div className="font-mono text-xs tracking-widest text-white/80 uppercase flex items-center gap-2">
                  <span className="text-brand-red font-bold">FACT {currentFact.number}</span>
                  <span>/</span>
                  <span>{currentFact.totalFacts}</span>
                  <span className="text-white/40">• {currentFact.tag}</span>
                </div>
                <div className="font-mono text-xs tracking-mega text-editorial-dim uppercase">
                  VERIFIED SPEAKER DOSSIER
                </div>
              </div>

              {/* Large Title */}
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                {currentFact.title}
              </h2>

              {/* Description Copy */}
              <p className="font-sans text-sm sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
                {currentFact.description}
              </p>

              {/* Numbers Grid (For Fact 02) or Metrics Badges */}
              {currentFact.isNumbers ? (
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-2 max-w-lg">
                  {currentFact.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="space-y-1 bg-void/40 p-3 border border-white/10"
                    >
                      <div className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">
                        {stat.number}
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-white font-semibold">
                        {stat.label}
                      </div>
                      <div className="font-sans text-[11px] text-white/50">
                        {stat.sub}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                currentFact.stats && (
                  <div className="grid grid-cols-2 gap-3 max-w-md pt-1">
                    {currentFact.stats.map((m, idx) => (
                      <div key={idx} className="bg-void/40 border border-white/10 p-2.5 font-mono text-xs">
                        <div className="text-[10px] text-white/40 tracking-widest uppercase">{m.label}</div>
                        <div className="text-white font-bold mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Navigation Controls */}
              <div className="pt-4 flex items-center gap-6">
                {factIdx > 0 && (
                  <button
                    onClick={handlePrevFact}
                    className="text-white/40 hover:text-white transition-colors font-mono text-xs flex items-center gap-1 focus:outline-none"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>PREV FACT</span>
                  </button>
                )}

                <button
                  onClick={handleNextFact}
                  className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs tracking-widest uppercase focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{factIdx < factsData.length - 1 ? "NEXT FACT" : "EXPLORE CLUES"}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Visual Exhibit (6 cols) */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-4 sm:gap-6">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] bg-void border border-white/10 overflow-hidden shadow-2xl group">
                <img
                  src={currentFact.image}
                  alt={currentFact.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none" />

                {currentFact.scriptText && (
                  <div className="absolute top-4 right-4 bg-void/80 backdrop-blur-sm px-3 py-1 border border-brand-red/40">
                    <span className="font-handwritten text-lg sm:text-xl text-brand-lightRed tracking-wide">
                      {currentFact.scriptText}
                    </span>
                  </div>
                )}
              </div>

              {/* Vertical Labels */}
              {currentFact.metaLabels && (
                <div className="hidden sm:flex flex-col justify-between py-2 space-y-8 font-mono text-[9px] tracking-mega text-white/40 uppercase [writing-mode:vertical-rl] rotate-180">
                  {currentFact.metaLabels.map((label, idx) => (
                    <span key={idx} className="hover:text-white transition-colors">{label}</span>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      )}

      {/* MODE 2: DAILY CLUES CHAPTERS (For Students to Decode Identity & Guess) */}
      {activeTab === 'clues' && (
        <AnimatePresence mode="wait">
          <motion.div 
            key={clueIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-8"
          >
            
            {/* Left Column: Clue Copy & Clue Stepper */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              <div className="space-y-1">
                <div className="font-mono text-xs tracking-widest text-white/80 uppercase">
                  <span className="text-brand-red font-bold">CLUE {currentClue.number}</span> / {currentClue.totalClues}
                </div>
                <div className="font-mono text-xs tracking-mega text-editorial-dim uppercase">
                  MYSTERY INVESTIGATION CHAPTER
                </div>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                {currentClue.title}
              </h2>

              <div className="space-y-3 font-sans text-sm sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
                <p>{currentClue.text1}</p>
                <p className="text-white/60">{currentClue.text2}</p>
              </div>

              {/* Controls */}
              <div className="pt-4 flex items-center gap-6">
                {clueIdx > 0 && (
                  <button
                    onClick={handlePrevClue}
                    className="text-white/40 hover:text-white transition-colors font-mono text-xs flex items-center gap-1 focus:outline-none"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>PREV CLUE</span>
                  </button>
                )}

                <button
                  onClick={handleNextClue}
                  className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs tracking-widest uppercase focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{currentClue.btnText}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Clue Exhibit Visual */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-4 sm:gap-6">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] bg-void border border-white/10 overflow-hidden shadow-2xl group">
                <img
                  src={currentClue.image}
                  alt={currentClue.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-85 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none" />

                {currentClue.scriptText && (
                  <div className="absolute top-4 right-4 bg-void/80 backdrop-blur-sm px-3 py-1 border border-brand-red/40">
                    <span className="font-handwritten text-lg sm:text-xl text-brand-lightRed tracking-wide">
                      {currentClue.scriptText}
                    </span>
                  </div>
                )}
              </div>

              {currentClue.metaLabels && (
                <div className="hidden sm:flex flex-col justify-between py-2 space-y-8 font-mono text-[9px] tracking-mega text-white/40 uppercase [writing-mode:vertical-rl] rotate-180">
                  {currentClue.metaLabels.map((label, idx) => (
                    <span key={idx} className="hover:text-white transition-colors">{label}</span>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      )}

      {/* BOTTOM SCRUBBER BAR */}
      <div className="relative z-20 flex items-center justify-between w-full font-mono text-[10px] text-white/30 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          {(activeTab === 'facts' ? factsData : clues).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFx.playEvidenceClick();
                if (activeTab === 'facts') setFactIdx(idx);
                else setClueIdx(idx);
              }}
              className={`w-6 h-1 transition-all rounded-full ${
                (activeTab === 'facts' ? factIdx : clueIdx) === idx ? 'bg-brand-red w-8' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <span className="tracking-mega uppercase">
          DEV TALKS '26 // {activeTab === 'facts' ? "FACTS DOSSIER" : "DAILY CLUES"}
        </span>
      </div>

    </section>
  );
}
