import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Eye
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function SpeakerCardSection({ 
  speaker, 
  index, 
  totalSpeakers, 
  onNextSpeaker, 
  isLast, 
  onOpenGuessesArena 
}) {
  const [activeTab, setActiveTab] = useState('clues'); // 'clues' | 'facts' | 'guess' | 'reveal'
  const [guessInput, setGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState(null); // { type: 'success' | 'wrong', message: '' }
  const [isRevealed, setIsRevealed] = useState(false);

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!guessInput.trim()) return;

    const normalized = guessInput.toLowerCase().trim();
    const isCorrect = speaker.validKeywords.some(keyword => normalized.includes(keyword.toLowerCase()));

    if (isCorrect) {
      soundFx.playRevealUnlocked();
      setGuessFeedback({
        type: 'success',
        message: `BINGO! You cracked it! This is ${speaker.revealed.name}. Keynote confirmed!`
      });
      setIsRevealed(true);
    } else {
      soundFx.playCardHover();
      setGuessFeedback({
        type: 'wrong',
        message: `Not quite! Check the sticky note clues or examine the dossier for more hints.`
      });
    }
  };

  return (
    <section 
      id={speaker.id}
      className="relative w-full min-h-screen bg-[#060606] text-white flex flex-col justify-center py-20 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-8">
        
        {/* ================= SECTION HEADER: SPEAKER BADGE & TITLE ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF2A1A]/40 bg-[#161616] text-[11px] font-mono tracking-widest uppercase text-[#FF2A1A]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2A1A]" />
                <span>{speaker.roleTag}</span>
              </span>
              <span className="font-mono text-xs text-neutral-400">
                SPEAKER {speaker.num} OF {totalSpeakers}
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
              {speaker.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-neutral-300 max-w-2xl">
              {speaker.tagline}
            </p>
          </div>

          {/* Tab Navigation Pill Group */}
          <div className="flex items-center gap-1.5 bg-[#141414] border border-[#262626] p-1 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'clues', label: 'CLUES' },
              { id: 'facts', label: 'FACTS DOSSIER' },
              { id: 'guess', label: 'GUESS' },
              { id: 'reveal', label: isRevealed ? 'REVEALED ✓' : 'REVEAL' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-md font-mono text-[11px] sm:text-xs tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#FF2A1A] text-white font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-[#202020]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN CONTENT ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ================= LEFT 5 COLS: "GUESS WHO IS COMING" 3D TRADING CARD POSTER ================= */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl overflow-hidden shadow-2xl border border-[#2B0E0E] bg-gradient-to-br from-[#2D0005] via-[#4D000B] to-[#120003]">
            
            {/* Ambient Red Glow & Scattered Floating Question Marks */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B80018]/30 via-black/40 to-transparent pointer-events-none" />
            
            {/* Floating Ambient ? marks like in the reference image */}
            <div className="absolute top-12 left-4 text-white/40 font-display font-black text-2xl select-none pointer-events-none drop-shadow">?</div>
            <div className="absolute top-44 left-3 text-white/60 font-display font-black text-3xl select-none pointer-events-none drop-shadow">?</div>
            <div className="absolute bottom-16 left-5 text-white/50 font-display font-black text-2xl select-none pointer-events-none drop-shadow">?</div>
            <div className="absolute top-36 right-4 text-white/60 font-display font-black text-3xl select-none pointer-events-none drop-shadow">?</div>
            <div className="absolute bottom-28 right-4 text-white/50 font-display font-black text-3xl select-none pointer-events-none drop-shadow">?</div>

            {/* Poster Record Header */}
            <div className="w-full relative z-20 flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[11px]">
              <span className="text-neutral-300 font-bold tracking-wider">CASE FILE #{speaker.num}</span>
              <span className="font-semibold uppercase tracking-widest text-[#FF4D3D] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF2A1A] animate-ping" />
                {isRevealed ? 'IDENTIFIED ✓' : 'MYSTERY TARGET'}
              </span>
            </div>

            {/* 3D TRADING CARD WRAPPER */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[1/1.35] my-2 select-none group">
              
              {/* 3D Red Extruded Depth Shadow (Left & Bottom 3D block like in the photo) */}
              <div className="absolute inset-0 translate-x-[-10px] translate-y-[10px] rounded-[30px] bg-[#990014] border-2 border-[#73000F] shadow-[0_20px_40px_rgba(0,0,0,0.9)]" />

              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  /* ============ MYSTERY STATE: "GUESS WHO IS COMING" POSTER ============ */
                  <motion.div 
                    key="mystery-card"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full rounded-[28px] bg-white text-black p-5 sm:p-6 overflow-hidden flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_15px_35px_rgba(0,0,0,0.5)] border border-neutral-200"
                  >
                    
                    {/* 3D Gold & Red Question Mark popping out top-right */}
                    <div className="absolute -top-3 -right-2 z-40 w-16 h-20 pointer-events-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]">
                      <svg viewBox="0 0 100 120" className="w-full h-full transform rotate-12">
                        <defs>
                          <linearGradient id={`goldGrad-${speaker.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFF3C4" />
                            <stop offset="30%" stopColor="#EAB308" />
                            <stop offset="70%" stopColor="#CA8A04" />
                            <stop offset="100%" stopColor="#854D0E" />
                          </linearGradient>
                          <filter id={`shadow-${speaker.num}`}>
                            <feDropShadow dx="3" dy="4" stdDeviation="2" floodColor="#451A03" />
                          </filter>
                        </defs>
                        {/* 3D Question Mark Shape */}
                        <path 
                          d="M48 20 C32 20 22 28 22 42 C22 48 26 53 32 53 C37 53 41 49 41 44 C41 37 46 32 53 32 C60 32 66 36 66 43 C66 49 61 54 53 60 C44 68 39 76 39 88 L40 92 L58 92 L58 87 C58 79 64 73 72 66 C80 59 86 51 86 39 C86 26 71 20 48 20 Z M49 100 C43 100 38 105 38 111 C38 117 43 122 49 122 C55 122 60 117 60 111 C60 105 55 100 49 100 Z"
                          fill={`url(#goldGrad-${speaker.num})`}
                          filter={`url(#shadow-${speaker.num})`}
                          stroke="#78350F"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Left Border Ticket Dashes */}
                    <div className="absolute left-2.5 top-14 bottom-24 flex flex-col justify-between py-2 pointer-events-none opacity-80">
                      <span className="font-mono text-[10px] tracking-tighter text-black font-extrabold rotate-90 origin-left">
                        || ====== ||
                      </span>
                    </div>

                    {/* Right Border Ticket Dashes */}
                    <div className="absolute right-2.5 top-28 bottom-24 flex flex-col justify-between py-2 pointer-events-none opacity-80">
                      <span className="font-mono text-[10px] tracking-tighter text-black font-extrabold -rotate-90 origin-right">
                        || ====== ||
                      </span>
                    </div>

                    {/* CARD HEADER: "GueSS WHO IS COMING" */}
                    <div className="relative z-20 flex flex-col items-center text-center mt-1">
                      <div className="flex items-baseline justify-center tracking-tight leading-none font-display">
                        <span className="text-4xl sm:text-5xl font-black text-black">Gue</span>
                        <span className="text-5xl sm:text-6xl font-black text-[#EB0028] transform -translate-y-0.5">SS</span>
                        <span className="text-4xl sm:text-5xl font-black text-black">?</span>
                      </div>
                      <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black mt-0.5">
                        WHO IS COMING
                      </div>
                    </div>

                    {/* DOODLE: Lightning Bolt with Arrow pointing to silhouette */}
                    <div className="absolute top-[21%] right-10 z-30 pointer-events-none">
                      <svg width="28" height="42" viewBox="0 0 32 48" fill="none" className="transform rotate-6">
                        {/* Lightning Bolt */}
                        <path 
                          d="M18 2 L6 20 L15 20 L11 34 L26 16 L17 16 L22 2 Z" 
                          fill="white" 
                          stroke="black" 
                          strokeWidth="2.5" 
                          strokeLinejoin="round" 
                        />
                        {/* Downward Arrow */}
                        <path 
                          d="M10 32 L5 44 M5 44 L13 42 M5 44 L3 36" 
                          stroke="black" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                    </div>

                    {/* DOODLE: Handwritten "Hint: [CLUE]" & Black Star on left */}
                    <div className="absolute top-[44%] left-5 z-30 flex flex-col items-start pointer-events-none">
                      <span className="font-display font-black text-[11px] text-black tracking-tight leading-none">
                        Hint:
                      </span>
                      <span className="font-handwritten text-lg sm:text-xl font-bold text-black transform -rotate-12 leading-tight tracking-wide border-b-2 border-black/40 pb-0.5">
                        {speaker.posterHint || 'SPECIAL GUEST'}
                      </span>
                    </div>

                    {/* Black 5-pointed Star on lower left */}
                    <div className="absolute bottom-[20%] left-6 z-30 text-black text-2xl select-none pointer-events-none">
                      ★
                    </div>

                    {/* CENTER SILHOUETTE CUTOUT WITH GLOWING RED NEON RIM OUTLINE */}
                    <div className="relative w-full h-[64%] flex items-end justify-center z-10 -mb-2 overflow-visible">
                      
                      {/* Red Neon Rim Aura behind head & shoulders */}
                      <div className="absolute bottom-4 w-44 sm:w-52 h-44 sm:h-52 rounded-full bg-[#EB0028]/70 blur-2xl -z-10 animate-pulse-subtle" />
                      
                      {/* Dynamic Cutout Silhouette of Person per Speaker */}
                      <div className="relative z-10 w-full h-full flex items-end justify-center">
                        <svg 
                          viewBox="0 0 300 360" 
                          className="w-full h-full max-h-[260px] filter drop-shadow-[0_0_10px_#EB0028] drop-shadow-[0_0_20px_rgba(235,0,40,0.8)] transform hover:scale-[1.02] transition-transform duration-300"
                        >
                          <defs>
                            <filter id={`neonGlow-${speaker.num}`} x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* Red Contour Glow Layer (Stroke) */}
                          <path 
                            d={
                              speaker.id === 'speaker-1'
                                ? "M 50 360 C 50 310, 75 275, 100 255 C 92 245, 88 230, 88 210 C 78 200, 78 180, 88 168 C 84 150, 88 120, 105 95 C 120 75, 145 68, 155 68 C 168 68, 190 75, 202 95 C 218 120, 222 150, 218 168 C 228 180, 228 200, 218 210 C 218 230, 212 245, 205 255 C 230 275, 255 310, 255 360 Z"
                                : speaker.id === 'speaker-2'
                                ? "M 45 360 C 45 305, 70 270, 98 250 C 92 240, 90 225, 90 205 C 82 195, 82 178, 90 165 C 88 142, 95 110, 115 88 C 130 72, 150 66, 160 66 C 172 66, 192 72, 205 88 C 225 110, 230 142, 228 165 C 236 178, 236 195, 228 205 C 228 225, 224 240, 218 250 C 245 270, 270 305, 270 360 Z"
                                : "M 48 360 C 48 308, 72 272, 96 252 C 88 240, 85 220, 85 195 C 76 182, 78 160, 88 148 C 82 125, 90 92, 112 75 C 128 62, 152 58, 162 58 C 176 58, 198 64, 212 78 C 232 98, 236 128, 230 150 C 238 162, 238 182, 230 195 C 230 220, 226 240, 218 252 C 242 272, 268 308, 268 360 Z"
                            }
                            fill="#000000"
                            stroke="#EB0028"
                            strokeWidth="5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />

                          {/* Inner Pitch Black Core */}
                          <path 
                            d={
                              speaker.id === 'speaker-1'
                                ? "M 50 360 C 50 310, 75 275, 100 255 C 92 245, 88 230, 88 210 C 78 200, 78 180, 88 168 C 84 150, 88 120, 105 95 C 120 75, 145 68, 155 68 C 168 68, 190 75, 202 95 C 218 120, 222 150, 218 168 C 228 180, 228 200, 218 210 C 218 230, 212 245, 205 255 C 230 275, 255 310, 255 360 Z"
                                : speaker.id === 'speaker-2'
                                ? "M 45 360 C 45 305, 70 270, 98 250 C 92 240, 90 225, 90 205 C 82 195, 82 178, 90 165 C 88 142, 95 110, 115 88 C 130 72, 150 66, 160 66 C 172 66, 192 72, 205 88 C 225 110, 230 142, 228 165 C 236 178, 236 195, 228 205 C 228 225, 224 240, 218 250 C 245 270, 270 305, 270 360 Z"
                                : "M 48 360 C 48 308, 72 272, 96 252 C 88 240, 85 220, 85 195 C 76 182, 78 160, 88 148 C 82 125, 90 92, 112 75 C 128 62, 152 58, 162 58 C 176 58, 198 64, 212 78 C 232 98, 236 128, 230 150 C 238 162, 238 182, 230 195 C 230 220, 226 240, 218 252 C 242 272, 268 308, 268 360 Z"
                            }
                            fill="#000000"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* BOTTOM STAR RIBBON BANNER */}
                    <div className="relative z-30 -mx-6 -mb-6 bg-gradient-to-r from-[#800010] via-[#B80018] to-[#800010] py-2 px-4 border-t-2 border-b-2 border-white shadow-md flex items-center justify-center gap-2 text-white">
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs tracking-widest font-mono select-none">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span className="font-bold uppercase tracking-wider text-[10px] px-1 bg-black/40 rounded">
                          KEYNOTE {speaker.num}
                        </span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  /* ============ REVEALED STATE: CONFIRMED TRADING CARD ============ */
                  <motion.div 
                    key="revealed-card"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full rounded-[28px] bg-white text-black p-5 sm:p-6 overflow-hidden flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_15px_35px_rgba(0,0,0,0.5)] border border-neutral-200"
                  >
                    {/* Confirmed Top Header */}
                    <div className="relative z-20 flex flex-col items-center text-center mt-1">
                      <div className="px-3 py-0.5 rounded-full bg-[#EB0028] text-white font-mono text-[9px] font-black tracking-widest uppercase mb-1">
                        CONFIRMED SPEAKER #{speaker.num}
                      </div>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-black uppercase leading-tight">
                        {speaker.revealed.name}
                      </h3>
                      <p className="font-mono text-[10px] sm:text-xs text-[#EB0028] font-bold">
                        {speaker.revealed.designation}
                      </p>
                    </div>

                    {/* Speaker Portrait Photo Frame */}
                    <div className="relative z-10 w-full h-[58%] rounded-2xl overflow-hidden border-2 border-black shadow-inner my-2">
                      <img 
                        src={speaker.revealed.photo} 
                        alt={speaker.revealed.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <p className="font-mono text-[10px] text-white/90 line-clamp-2">
                          "{speaker.revealed.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Bottom Revealed Ribbon */}
                    <div className="relative z-30 -mx-6 -mb-6 bg-gradient-to-r from-[#800010] via-[#EB0028] to-[#800010] py-2 px-4 border-t-2 border-b-2 border-white shadow-md flex items-center justify-center gap-2 text-white">
                      <div className="flex items-center justify-center gap-2 text-xs tracking-widest font-mono">
                        <span>★</span>
                        <span>★</span>
                        <span className="font-bold uppercase tracking-wider text-[10px]">
                          IDENTITY UNLOCKED
                        </span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom Reveal Toggle / Clue Marker */}
            <div className="w-full pt-3 flex items-center justify-between font-mono text-[11px] text-neutral-300 relative z-20">
              <button
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setIsRevealed(!isRevealed);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white hover:text-[#FF4D3D] hover:border-[#FF2A1A]/50 transition-all cursor-pointer shadow-md"
              >
                {isRevealed ? <Lock className="w-3.5 h-3.5 text-[#FF2A1A]" /> : <Eye className="w-3.5 h-3.5 text-[#FF2A1A]" />}
                <span className="font-bold">{isRevealed ? 'Hide Poster' : 'Instant Reveal'}</span>
              </button>

              <span className="text-neutral-400 font-mono text-[10px] sm:text-xs">📍 {speaker.revealed.venue}</span>
            </div>

          </div>

          {/* ================= RIGHT 7 COLS: TAB VIEW (CLUES, FACTS, GUESS ARENA, REVEAL DETAILS) ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#111111] border border-[#262626] rounded-2xl p-6 sm:p-8">
            
            {/* TAB 1: CLUES & RIPPED PAPER STICKY NOTES */}
            {activeTab === 'clues' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 my-auto"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                    FIELD INVESTIGATION CLUES
                  </span>
                  <h3 className="font-display font-bold text-2xl uppercase text-white">
                    WHAT WE KNOW SO FAR
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    {speaker.shortClue}
                  </p>
                </div>

                {/* 5 Clue Sticky Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {speaker.hints.map((hint, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 bg-[#181818] hover:bg-[#202020] border border-[#2A2A2A] rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{hint.icon}</span>
                        <span className="font-mono text-xs text-white font-bold tracking-wide">
                          {hint.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed pl-6">
                        {hint.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Jump to Guess CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-handwritten text-base text-neutral-400">
                    Got a hunch? Test your detective skills!
                  </span>

                  <button
                    onClick={() => {
                      soundFx.playEvidenceClick();
                      setActiveTab('guess');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider bg-[#FF2A1A] hover:bg-[#D91C1C] text-white shadow-md transition-transform hover:scale-105"
                  >
                    <span>TEST A GUESS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: FACTS DOSSIER */}
            {activeTab === 'facts' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 my-auto"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                    OFFICIAL DOSSIER
                  </span>
                  <h3 className="font-display font-bold text-2xl uppercase text-white">
                    VERIFIED EVIDENCE LOGS
                  </h3>
                </div>

                <div className="space-y-3">
                  {speaker.dossier.map((d, i) => (
                    <div key={i} className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded bg-[#FF2A1A]/15 border border-[#FF2A1A]/40 text-[#FF2A1A]">
                          {d.tag}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">{d.badge}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-white uppercase">{d.title}</h4>
                      <p className="text-xs text-neutral-300">{d.desc}</p>
                      
                      {d.stats && (
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#2A2A2A]">
                          {d.stats.map((s, si) => (
                            <div key={si} className="text-center">
                              <div className="font-display font-black text-base text-[#FF2A1A]">{s.val}</div>
                              <div className="font-mono text-[9px] text-neutral-400">{s.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: LIVE GUESS VALIDATOR */}
            {activeTab === 'guess' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 my-auto"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                    DECODE SPEAKER IDENTITY
                  </span>
                  <h3 className="font-display font-bold text-2xl uppercase text-white">
                    WHO IS SPEAKER #{speaker.num}?
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Type their name or company/organization below to test your theory.
                  </p>
                </div>

                <form onSubmit={handleGuessSubmit} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text"
                      value={guessInput}
                      onChange={(e) => setGuessInput(e.target.value)}
                      placeholder="e.g. Kunal Shah, Anupam Mittal, Andrej Karpathy..."
                      className="w-full px-5 py-4 bg-black border border-[#333333] focus:border-[#FF2A1A] rounded-xl text-sm font-mono text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider bg-[#FF2A1A] hover:bg-[#D91C1C] text-white shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>

                {/* Feedback Box */}
                {guessFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      guessFeedback.type === 'success'
                        ? 'bg-[#181818] border-white text-white'
                        : 'bg-[#2B0E0E] border-[#FF2A1A] text-white'
                    }`}
                  >
                    {guessFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-[#FF2A1A] shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="font-mono text-xs font-bold uppercase text-white">
                        {guessFeedback.type === 'success' ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                      </div>
                      <p className="text-xs text-neutral-200">{guessFeedback.message}</p>
                    </div>
                  </motion.div>
                )}

                {/* Quick Hint Cheatsheet */}
                <div className="p-3 bg-[#181818] border border-[#2A2A2A] rounded-lg text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                  <span>Need more clues?</span>
                  <button 
                    onClick={() => {
                      soundFx.playEvidenceClick();
                      setActiveTab('clues');
                    }}
                    className="text-[#FF2A1A] hover:underline"
                  >
                    Review Sticky Clues →
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 4: REVEAL DETAILS */}
            {activeTab === 'reveal' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 my-auto"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                    CONFIRMED KEYNOTE PROFILE
                  </span>
                  <h3 className="font-display font-bold text-3xl uppercase text-white">
                    {speaker.revealed.name}
                  </h3>
                  <p className="font-mono text-xs text-[#FF2A1A] font-semibold">
                    {speaker.revealed.designation}
                  </p>
                </div>

                {/* Quote */}
                <div className="p-4 bg-[#181818] border-l-2 border-[#FF2A1A] rounded-r-xl italic font-serif text-sm sm:text-base text-neutral-200">
                  "{speaker.revealed.quote}"
                </div>

                {/* Keynote Details */}
                <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-xl space-y-2">
                  <div className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">KEYNOTE TITLE</div>
                  <div className="font-display font-bold text-base text-white">{speaker.revealed.keynoteTitle}</div>
                  <div className="flex items-center gap-4 pt-1 font-mono text-xs text-neutral-300">
                    <span>🕒 {speaker.revealed.time}</span>
                    <span>📍 {speaker.revealed.venue}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FOOTER ACTION: JUMP TO NEXT SPEAKER OR GUESS ARENA */}
            <div className="pt-6 border-t border-[#262626] flex items-center justify-between">
              <span className="font-mono text-[11px] text-neutral-400">
                {!isLast ? `UP NEXT: SPEAKER 0${index + 2}` : 'ALL 3 SPEAKERS UNLOCKED'}
              </span>

              {!isLast ? (
                <button
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onNextSpeaker();
                  }}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-white hover:text-[#FF2A1A] transition-colors group"
                >
                  <span>SCROLL TO NEXT SPEAKER</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onOpenGuessesArena();
                  }}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[#FF2A1A] hover:underline"
                >
                  <span>GO TO GUESSES ARENA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
