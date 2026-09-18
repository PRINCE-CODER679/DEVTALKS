import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Ticket,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  HelpCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import HeroReconstructionCanvas from './HeroReconstructionCanvas';
import { speakersList, eventMetadata } from '../data/speakers';

export default function HeroMystery({ onTakeGuess, onExploreSpeakers, onRegister, onWatchTeaser }) {
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((percent) => {
    setProgress(percent);
  }, []);

  const activeSpeaker = speakersList[0];

  const communityComments = [
    {
      id: 1,
      user: 'the.real.fan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      text: "Bro if this is them... it's crazyyyy 🔥🔥",
      likes: '1.7k',
      time: '1m'
    },
    {
      id: 2,
      user: 'cinephile_',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      text: "No wayyy!! Is it really them? 👀",
      likes: '856',
      time: '1m'
    },
    {
      id: 3,
      user: 'curious.mind',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      text: "Wait is that an entrepreneur? Or something bigger? 👀",
      likes: '317',
      time: '2m'
    },
    {
      id: 4,
      user: 'vibe.with.us',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
      text: "Whichever it is, it's going to be epic! 🔥",
      likes: '298',
      time: '1d'
    }
  ];

  return (
    <section 
      id="hero"
      className="relative w-full min-h-[100dvh] bg-[#080808] text-[#f4f0e8] flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-3 sm:px-6 overflow-hidden select-none"
    >
      {/* ================= BACKGROUND ATMOSPHERICS & GRAIN ================= */}
      <div className="absolute inset-0 subtle-dossier-grid pointer-events-none z-0 opacity-25" />
      
      {/* Ambient Orange Volumetric Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] md:w-[900px] h-[350px] sm:h-[650px] md:h-[900px] bg-[#ff5a1f]/8 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ================= FULL-PAGE CONTINUOUS BROKEN IMAGE RECONSTRUCTION BACKDROP ================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <HeroReconstructionCanvas
          imageSrc="/red-stage-panels.jpg"
          fallbackSrc="/3d-mystery-speakers-stage.jpg"
          onProgress={handleProgress}
        />

        {/* Ambient atmospheric dark vignettes for ultra-crisp overlay readability */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/30 to-[#080808]/85 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-[#080808] via-[#080808]/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-56 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent pointer-events-none" />
      </div>

      {/* ================= 1. TOP STICKERS & TELEMETRY ROW ================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between px-2 pt-1 font-mono text-[10px] sm:text-xs">
        
        {/* Top-Left Playful Tape Sticker: SAME STAGE, DIFFERENT ENERGY */}
        <div className="hidden sm:inline-flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
          <div className="px-3 py-1 bg-[#ff5a1f]/20 border border-[#ff5a1f]/60 text-[#ff8a3d] text-[10px] font-mono font-black tracking-wider uppercase rounded shadow-[0_4px_12px_rgba(255,90,31,0.25)] backdrop-blur-sm">
            SAME STAGE, DIFFERENT ENERGY. 👑
          </div>
        </div>

        {/* Center Live Telemetry Progress */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <div className="flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-[#111111]/90 border border-[#ff5a1f]/50 backdrop-blur-md shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-ping" />
            <span className="text-[#817b73] text-[9px] tracking-widest uppercase">RECONSTRUCTING //</span>
            <span className="font-black text-[#ff8a3d] tracking-widest text-xs">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>

        {/* Top-Right Tape Sticker: GUESS WHAT?! */}
        <div className="hidden sm:inline-flex items-center gap-1.5 transform rotate-3 hover:rotate-0 transition-transform">
          <div className="px-3 py-1 bg-[#ff5a1f] text-[#080808] font-display font-black text-[11px] tracking-wider uppercase rounded shadow-lg">
            GUESS WHAT?! ⚡
          </div>
        </div>

      </div>

      {/* ================= 2. MAIN HERO CONTENT AREA OVER FULL-PAGE CANVAS ================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center my-auto py-2 sm:py-4">
        
        {/* ================= LEFT COLUMN: EDITORIAL HEADLINE + RIPPED PAPER HINTS ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2.5 sm:space-y-3 z-30">
          
          {/* Main Title: GUESS THE SPEAKER? */}
          <div className="space-y-1">
            <h1 className="font-display font-black tracking-tight uppercase text-2xl xs:text-3xl sm:text-4xl lg:text-6xl text-[#f4f0e8] leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              GUESS THE <br className="hidden sm:block" />
              <span className="text-[#ff5a1f] drop-shadow-[0_2px_15px_rgba(255,90,31,0.5)]">SPEAKER?</span>
            </h1>
            
            {/* Handwritten style subtagline: BIG IDEAS. BIGGER IMPACT. */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-0.5 sm:pt-1">
              <span className="font-mono text-[11px] sm:text-xs md:text-sm tracking-widest text-[#ff8a3d] font-black uppercase">
                BIG IDEAS. BIGGER IMPACT.
              </span>
            </div>

            <p className="font-sans text-[10px] xs:text-[11px] sm:text-xs text-[#c8c1b7] max-w-xs sm:max-w-sm pt-0.5 leading-relaxed drop-shadow-md">
              A mystery guest. A stage full of possibilities. Can you figure out who's joining us this year?
            </p>
          </div>

          {/* RIPPED PAPER STICKY NOTE HINTS CARD (AUTHENTIC REFERENCE ASSET) */}
          <div className="relative w-full max-w-[250px] xs:max-w-[270px] sm:max-w-[290px] pt-1.5 sm:pt-2 transform -rotate-1 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
            
            {/* Top Tape Strip */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-3.5 sm:h-4 bg-white/35 backdrop-blur-md rounded-xs border border-white/50 rotate-1 shadow-sm z-20" />

            {/* Torn Paper Body */}
            <div 
              className="relative p-3 sm:p-4 bg-[#f4ede2] text-[#1a1816] rounded-xs shadow-[0_15px_35px_rgba(0,0,0,0.85),_0_2px_8px_rgba(255,90,31,0.2)] font-sans border-t border-l border-white/60 text-left"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 98% 97%, 92% 95%, 85% 99%, 78% 96%, 68% 99%, 60% 95%, 50% 98%, 40% 96%, 30% 99%, 22% 96%, 12% 99%, 0% 97%)'
              }}
            >
              {/* Paper Header */}
              <div className="flex items-center justify-between border-b border-[#1a1816]/15 pb-1 mb-1.5 font-mono font-black text-[11px] sm:text-xs tracking-wider uppercase text-[#1a1816]">
                <span className="flex items-center gap-1.5">
                  <span>📌 HINTS</span>
                  <span className="text-[#ff5a1f]">• •</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#1a1816]/50">CONFIDENTIAL</span>
              </div>

              {/* Hints Bullet List */}
              <div className="space-y-1 sm:space-y-1.5 text-[9px] xs:text-[10px] sm:text-[11px] font-sans font-medium text-[#2d2926]">
                {activeSpeaker.hints.map((hint, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 leading-tight">
                    <span className="text-[10px] sm:text-xs shrink-0">{hint.icon}</span>
                    <span className="font-semibold text-[#1a1816] truncate">{hint.title}</span>
                  </div>
                ))}
              </div>

              {/* Bottom tape watermark */}
              <div className="pt-1.5 text-right">
                <span className="font-mono text-[7px] sm:text-[8px] tracking-widest text-[#1a1816]/40 uppercase">
                  DEVTALKS '26 // DOSSIER 01
                </span>
              </div>
            </div>

            {/* Hand-Drawn Arrow pointing from Hint Card to Center Stage */}
            <div className="absolute -right-6 top-1/2 text-[#ff8a3d] hidden lg:block pointer-events-none transform rotate-12">
              <span className="font-mono text-[9px] font-bold tracking-widest block -rotate-6">CLUES ↓</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          {/* Action Button Row under Left Column */}
          <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 w-full">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onTakeGuess();
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-display font-black text-[11px] sm:text-xs tracking-wider uppercase rounded-full transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_18px_rgba(255,90,31,0.35)]"
            >
              <span>TAKE A GUESS 🎯</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onWatchTeaser && (
              <button
                onClick={() => {
                  soundFx.playEvidenceClick();
                  onWatchTeaser();
                }}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#111111]/90 hover:bg-[#181818] border border-[#ff5a1f]/40 hover:border-[#ff5a1f] text-[#ff8a3d] hover:text-[#f4f0e8] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider rounded-full transition-all cursor-pointer backdrop-blur-sm"
              >
                ▶ TEASER
              </button>
            )}
          </div>

        </div>

        {/* ================= CENTER COLUMN: OPEN FOCAL STAGE AREA ================= */}
        <div className="lg:col-span-4 relative flex flex-col items-center justify-center min-h-[40px] xs:min-h-[80px] lg:min-h-[140px] pointer-events-none">
          
          {/* Subtle Chalk Stamp: SAME HINTS, DIFFERENT ANSWERS */}
          <div className="transform rotate-3">
            <div className="px-3 sm:px-3.5 py-0.5 sm:py-1 bg-[#ff5a1f]/15 border border-[#ff5a1f]/60 text-[#ff8a3d] font-mono text-[8px] sm:text-[9px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg">
              SAME HINTS • DIFFERENT ANSWERS 🎯
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: COMMUNITY CHAT SPECULATION BUBBLES ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-2 sm:space-y-2.5 z-30 w-full">
          
          {/* Top-Right Tape Badge: THIS IS GONNA BE GOOD */}
          <div className="self-center lg:self-end transform rotate-2 hover:rotate-0 transition-transform mb-0.5 sm:mb-1">
            <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#111111]/90 border border-white/20 text-[#f4f0e8] font-mono text-[8px] sm:text-[10px] font-bold tracking-wider uppercase rounded shadow-lg flex items-center gap-1.5 backdrop-blur-md">
              <span>THIS IS GONNA BE GOOD.</span>
              <span>🔥</span>
            </div>
          </div>

          {/* Community Chat Comment Pills */}
          <div className="w-full max-w-xs space-y-1.5 sm:space-y-2">
            {communityComments.map((c, idx) => (
              <div 
                key={c.id}
                className={`group p-2 sm:p-2.5 rounded-xl bg-[#111111]/90 hover:bg-[#181818] border border-white/15 hover:border-[#ff5a1f]/60 backdrop-blur-md shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-left ${
                  idx >= 2 ? 'hidden sm:block' : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <img 
                    src={c.avatar} 
                    alt={c.user} 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white/20 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-[#817b73]">
                      <span className="font-bold text-[#f4f0e8] truncate">@{c.user}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-[9px] sm:text-[11px] text-[#f4f0e8]/90 font-sans leading-snug pt-0.5">
                      {c.text}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 pl-1 text-[8px] sm:text-[9px] text-[#ff8a3d]">
                    <Heart className="w-2.5 h-2.5 fill-[#ff5a1f] text-[#ff5a1f]" />
                    <span className="font-mono text-[7px] sm:text-[8px] font-semibold">{c.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Secondary CTA Links */}
          <div className="pt-1.5 sm:pt-2 flex items-center justify-center lg:justify-end gap-2 w-full">
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onExploreSpeakers('speaker-1');
              }}
              className="px-3 sm:px-3.5 py-1.5 bg-[#111111]/90 hover:bg-[#181818] border border-white/15 hover:border-[#ff5a1f] text-[#f4f0e8] font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider rounded-full transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap"
            >
              EXPLORE DOSSIERS ↓
            </button>

            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onRegister();
              }}
              className="px-3 py-1.5 bg-transparent hover:bg-[#111111] border border-white/15 hover:border-[#ff5a1f]/50 text-[#817b73] hover:text-[#f4f0e8] font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-1 backdrop-blur-sm whitespace-nowrap"
            >
              <Ticket className="w-3 h-3 text-[#ff5a1f]" />
              <span>FREE PASS</span>
            </button>
          </div>

        </div>

      </div>

      {/* ================= 3. BOTTOM EVENT METADATA PILLS (EXACT REFERENCE ASSET) ================= */}
      <div className="relative z-30 max-w-5xl mx-auto w-full pt-2.5 sm:pt-3 border-t border-white/5 flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-3 text-[9px] sm:text-xs font-mono text-[#817b73]">
        
        {/* Date Pill */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#111111]/80 border border-white/10">
          <Calendar className="w-3 h-3 text-[#ff5a1f]" />
          <span className="font-bold text-[#f4f0e8]">10TH & 11TH JANUARY 2026</span>
        </div>

        {/* Venue / Stream Pill */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#111111]/80 border border-white/10">
          <MapPin className="w-3 h-3 text-[#ff8a3d]" />
          <span>6 PM IST • AUDITORIUM & LIVE STREAM</span>
        </div>

        {/* Free Registration Badge */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#ff5a1f]/10 border border-[#ff5a1f]/40 text-[#ff8a3d]">
          <Ticket className="w-3 h-3 text-[#ff5a1f]" />
          <span className="font-bold uppercase tracking-wider">FREE REGISTRATION</span>
        </div>

        {/* Scroll prompt */}
        <div className="hidden md:flex items-center gap-1 text-[#817b73]">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>

      </div>

    </section>
  );
}



