import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { factsData } from '../data/facts';

export default function FactsSection({ onNavigateToGuess, onNavigate, onOpenMenu }) {
  return (
    <div id="facts" className="w-full">
      {factsData.map((fact, index) => {
        const isFirst = index === 0;
        const isLast = index === factsData.length - 1;
        const prevAnchor = index > 0 ? factsData[index - 1].anchorId : 'casefile';
        const nextAnchor = fact.nextAnchor || (isLast ? 'guess' : factsData[index + 1].anchorId);

        return (
          <section
            key={fact.id}
            id={fact.anchorId}
            className="relative w-full min-h-[100svh] bg-[#070707] flex flex-col justify-between p-5 sm:p-10 lg:p-14 select-none border-t border-editorial-border overflow-hidden"
          >
            {/* Film Grain Texture */}
            <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

            {/* TOP HEADER */}
            <header className="relative z-20 flex items-center justify-between w-full border-b border-white/10 pb-3 sm:pb-4">
              <button 
                onClick={() => {
                  soundFx.playEvidenceClick();
                  onNavigate('hero');
                }}
                className="font-display font-black text-sm sm:text-base tracking-widest text-white uppercase focus:outline-none hover:text-brand-lightRed transition-colors whitespace-nowrap"
              >
                DEVKRAFT
              </button>

              {/* Desktop / Tablet Nav (sm:flex) */}
              <nav className="hidden sm:flex items-center gap-6 lg:gap-8 font-mono text-xs tracking-widest text-white/70 whitespace-nowrap">
                <button 
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onNavigate('hero');
                  }} 
                  className="hover:text-white transition-colors"
                >
                  HOME
                </button>
                <button 
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onNavigate('casefile');
                  }} 
                  className="hover:text-white transition-colors"
                >
                  CASE FILE
                </button>
                <button 
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onNavigate('fact-1');
                  }} 
                  className="text-white font-bold transition-colors"
                >
                  FACTS
                </button>
                <button 
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onNavigate('guess');
                  }} 
                  className="hover:text-white transition-colors"
                >
                  GUESS
                </button>
                <button 
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onOpenMenu();
                  }} 
                  className="hover:text-white transition-colors"
                >
                  ☰
                </button>
              </nav>

              {/* Mobile Clean Menu Button (< sm) */}
              <button
                onClick={() => {
                  soundFx.playEvidenceClick();
                  onOpenMenu();
                }}
                className="sm:hidden flex items-center gap-2 font-mono text-xs tracking-widest text-white/90 hover:text-white focus:outline-none py-1 px-2 border border-white/10 rounded-sm bg-void/50"
                aria-label="Open Navigation Menu"
              >
                <span className="tracking-widest uppercase text-[10px]">MENU</span>
                <div className="flex flex-col justify-center space-y-1 w-3.5">
                  <span className="w-full h-[1.5px] bg-white" />
                  <span className="w-full h-[1.5px] bg-white" />
                  <span className="w-full h-[1.5px] bg-white" />
                </div>
              </button>
            </header>

            {/* MAIN 2-COLUMN FACTS CHAPTER LAYOUT */}
            <div className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center py-6 sm:py-8">
              
              {/* Left Column: Fact Copy & Stepper (6 cols) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8"
              >
                
                {/* Fact Chapter Indicator: FACT 0X / 04 */}
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="font-mono text-xs sm:text-sm tracking-widest text-white uppercase">
                    <span className="text-brand-red font-bold">FACT {fact.number}</span> / {fact.totalFacts}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs tracking-mega text-editorial-dim uppercase">
                    SPEAKER DOSSIER • {fact.tag}
                  </div>
                </div>

                {/* Large Title */}
                <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                  {fact.title}
                </h2>

                {/* Standard Text Copy OR Stats Grid */}
                {!fact.isNumbers ? (
                  <div className="space-y-2 sm:space-y-3 font-sans text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
                    <p>{fact.text1}</p>
                    <p className="text-white/60">{fact.text2}</p>
                  </div>
                ) : (
                  /* FACT 03: THE NUMBERS */
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1 sm:pt-2 max-w-lg">
                    {fact.stats.map((stat, sIdx) => (
                      <div 
                        key={sIdx}
                        className="space-y-0.5 sm:space-y-1 bg-void/50 p-2.5 sm:p-4 border border-white/10"
                      >
                        <div className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
                          {stat.number}
                        </div>
                        <div className="font-sans text-xs sm:text-sm text-white font-semibold">
                          {stat.label}
                        </div>
                        <div className="font-sans text-[9px] sm:text-xs text-white/50 leading-tight">
                          {stat.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Controls */}
                <div className="pt-2 sm:pt-4 flex items-center gap-4 sm:gap-6">
                  {!isFirst && (
                    <button
                      onClick={() => {
                        soundFx.playEvidenceClick();
                        onNavigate(prevAnchor);
                      }}
                      className="text-white/40 hover:text-white transition-colors font-mono text-xs flex items-center gap-1 focus:outline-none"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>PREV FACT</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      soundFx.playEvidenceClick();
                      onNavigate(nextAnchor);
                    }}
                    className="group inline-flex items-center gap-3 text-white hover:text-brand-lightRed transition-colors font-mono text-xs sm:text-sm tracking-widest uppercase focus:outline-none"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 group-hover:border-brand-red flex items-center justify-center transition-colors group-hover:scale-110">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span>{fact.btnText} →</span>
                  </button>
                </div>

              </motion.div>

              {/* Right Column: Visual Exhibit & Metadata (6 cols) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-3 sm:gap-6 w-full"
              >
                
                {/* Visual Image Frame */}
                <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/3] bg-void border border-white/10 overflow-hidden shadow-2xl group">
                  <img
                    src={fact.image}
                    alt={fact.title}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none" />

                  {/* Red Handwritten Cursive Script for The Connection */}
                  {fact.scriptText && (
                    <motion.div 
                      initial={{ opacity: 0, rotate: -10 }}
                      whileInView={{ opacity: 1, rotate: -4 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-void/90 backdrop-blur-sm px-2.5 sm:px-3 py-1 border border-brand-red/40"
                    >
                      <span className="font-handwritten text-base sm:text-xl text-brand-lightRed tracking-wide">
                        {fact.scriptText}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Vertical Metadata Tags */}
                {fact.metaLabels && (
                  <div className="hidden sm:flex flex-col justify-between py-2 space-y-8 font-mono text-[9px] tracking-mega text-white/40 uppercase [writing-mode:vertical-rl] rotate-180">
                    {fact.metaLabels.map((label, lIdx) => (
                      <span key={lIdx} className="hover:text-white transition-colors">{label}</span>
                    ))}
                  </div>
                )}

              </motion.div>

            </div>

            {/* BOTTOM SCRUBBER BAR */}
            <div className="relative z-20 flex items-center justify-between w-full font-mono text-[10px] text-white/30 pt-3 sm:pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {factsData.map((fItem, fIdx) => (
                  <button
                    key={fItem.id}
                    onClick={() => {
                      soundFx.playEvidenceClick();
                      onNavigate(fItem.anchorId);
                    }}
                    className={`h-1 transition-all rounded-full ${
                      index === fIdx ? 'bg-brand-red w-6 sm:w-8' : 'bg-white/20 hover:bg-white/40 w-4 sm:w-6'
                    }`}
                    aria-label={`Jump to Fact ${fItem.number}`}
                  />
                ))}
              </div>

              <span className="tracking-widest sm:tracking-mega uppercase text-[9px] sm:text-[10px]">
                DEV TALKS '26 // SPEAKER FACTS
              </span>
            </div>

          </section>
        );
      })}
    </div>
  );
}
