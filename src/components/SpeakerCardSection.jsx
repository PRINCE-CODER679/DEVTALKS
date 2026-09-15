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
  Eye,
  RotateCw,
  HelpCircle,
  FileText
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleCardClick = () => {
    soundFx.playEvidenceClick();
    setIsFlipped((prev) => !prev);
  };

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
        message: `Not quite! Flip the picture card to inspect all the secret clues on the back!`
      });
    }
  };

  return (
    <section 
      id={speaker.id}
      className="relative w-full min-h-screen bg-[#080808] text-white flex flex-col justify-center py-20 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF5500]/40 bg-[#141414] text-[11px] font-mono tracking-widest uppercase text-[#FF5500] font-bold shadow-[0_0_12px_rgba(255,85,0,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
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

          {/* Flip Hint Indicator */}
          <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] px-3.5 py-1.5 rounded-full self-start sm:self-auto shadow-sm">
            <RotateCw className="w-3.5 h-3.5 text-[#FFAA00] animate-spin-slow" />
            <span className="font-mono text-xs text-neutral-300 font-semibold">
              {isFlipped ? 'Showing: Secret Clues (Back)' : 'Showing: Mystery Picture (Front)'}
            </span>
          </div>
        </div>

        {/* ================= MAIN CONTENT ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ================= LEFT 5 COLS: INTERACTIVE 3D FLIP TRADING CARD ================= */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-3 sm:p-6 rounded-3xl overflow-hidden shadow-2xl border border-[#331505] bg-gradient-to-br from-[#290E00] via-[#471A00] to-[#120500] text-white">
            
            {/* Ambient Orange Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5500]/25 via-black/40 to-transparent pointer-events-none" />
            
            {/* Card Header & Status */}
            <div className="w-full relative z-20 flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-[10px] sm:text-[11px]">
              <span className="text-neutral-300 font-bold tracking-wider">CASE FILE #{speaker.num}</span>
              <button 
                onClick={handleCardClick}
                className="font-semibold uppercase tracking-widest text-[#FFAA00] hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCw className="w-3 h-3 text-[#FF5500]" />
                <span>{isFlipped ? 'FLIP TO FRONT' : 'CLICK TO FLIP'}</span>
              </button>
            </div>

            {/* 3D FLIP CARD CONTAINER */}
            <div 
              className="relative w-full max-w-[310px] sm:max-w-[360px] aspect-[1/1.38] my-1 select-none cursor-pointer group"
              style={{ perspective: 1200 }}
              onClick={handleCardClick}
              title="Click to flip card"
            >
              {/* 3D Extruded Depth Shadow */}
              <div className="absolute inset-0 translate-x-[-8px] sm:translate-x-[-10px] translate-y-[8px] sm:translate-y-[10px] rounded-[26px] sm:rounded-[30px] bg-[#B33C00] border-2 border-[#8A2E00] shadow-[0_20px_40px_rgba(0,0,0,0.9)] -z-10" />

              {/* CARD FLIPPER */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative"
              >
                {/* ========================================================================= */}
                {/* FRONT FACE: MYSTERY SILHOUETTE POSTER                                     */}
                {/* ========================================================================= */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] bg-white text-black p-4 sm:p-6 overflow-hidden flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_15px_35px_rgba(0,0,0,0.5)] border border-neutral-200"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* 3D Gold & Orange Question Mark popping out top-right */}
                  <div className="absolute -top-3 -right-2 z-40 w-13 h-16 sm:w-16 sm:h-20 pointer-events-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]">
                    <svg viewBox="0 0 100 120" className="w-full h-full transform rotate-12">
                      <defs>
                        <linearGradient id={`goldGrad-${speaker.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFF3C4" />
                          <stop offset="30%" stopColor="#FFAA00" />
                          <stop offset="70%" stopColor="#FF5500" />
                          <stop offset="100%" stopColor="#8A2E00" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M48 20 C32 20 22 28 22 42 C22 48 26 53 32 53 C37 53 41 49 41 44 C41 37 46 32 53 32 C60 32 66 36 66 43 C66 49 61 54 53 60 C44 68 39 76 39 88 L40 92 L58 92 L58 87 C58 79 64 73 72 66 C80 59 86 51 86 39 C86 26 71 20 48 20 Z M49 100 C43 100 38 105 38 111 C38 117 43 122 49 122 C55 122 60 117 60 111 C60 105 55 100 49 100 Z"
                        fill={`url(#goldGrad-${speaker.num})`}
                        stroke="#78350F"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* Left & Right Ticket Dashes */}
                  <div className="absolute left-2 top-14 bottom-24 flex flex-col justify-between py-2 pointer-events-none opacity-80">
                    <span className="font-mono text-[8px] sm:text-[10px] tracking-tighter text-black font-extrabold rotate-90 origin-left">
                      || ====== ||
                    </span>
                  </div>
                  <div className="absolute right-2 top-28 bottom-24 flex flex-col justify-between py-2 pointer-events-none opacity-80">
                    <span className="font-mono text-[8px] sm:text-[10px] tracking-tighter text-black font-extrabold -rotate-90 origin-right">
                      || ====== ||
                    </span>
                  </div>

                  {/* CARD HEADER: "GueSS WHO IS COMING" */}
                  <div className="relative z-20 flex flex-col items-center text-center mt-0.5 sm:mt-1">
                    <div className="flex items-baseline justify-center tracking-tight leading-none font-display">
                      <span className="text-3xl sm:text-5xl font-black text-black">Gue</span>
                      <span className="text-4xl sm:text-6xl font-black text-[#FF5500] transform -translate-y-0.5">SS</span>
                      <span className="text-3xl sm:text-5xl font-black text-black">?</span>
                    </div>
                    <div className="font-display font-black text-[10px] sm:text-sm uppercase tracking-wider text-black mt-0.5">
                      WHO IS COMING
                    </div>
                  </div>

                  {/* DOODLE: Lightning Bolt with Arrow */}
                  <div className="absolute top-[20%] right-6 z-30 pointer-events-none">
                    <svg width="24" height="36" viewBox="0 0 32 48" fill="none" className="transform rotate-6 w-5 h-8 sm:w-7 sm:h-10">
                      <path 
                        d="M18 2 L6 20 L15 20 L11 34 L26 16 L17 16 L22 2 Z" 
                        fill="white" 
                        stroke="black" 
                        strokeWidth="2.5" 
                        strokeLinejoin="round" 
                      />
                      <path 
                        d="M10 32 L5 44 M5 44 L13 42 M5 44 L3 36" 
                        stroke="black" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>

                  {/* DOODLE: Handwritten "Hint" */}
                  <div className="absolute top-[42%] left-4 z-30 flex flex-col items-start pointer-events-none">
                    <span className="font-display font-black text-[10px] text-black tracking-tight leading-none">
                      Hint:
                    </span>
                    <span className="font-handwritten text-sm sm:text-lg font-bold text-black transform -rotate-12 leading-tight tracking-wide border-b-2 border-black/40 pb-0.5">
                      {speaker.posterHint || 'SPECIAL GUEST'}
                    </span>
                  </div>

                  {/* REALISTIC CENTER SILHOUETTE IMAGE WITH ORANGE RIM */}
                  <div className="relative w-full h-[65%] flex items-end justify-center z-10 -mb-2 overflow-visible">
                    <div className="absolute bottom-4 w-44 sm:w-52 h-44 sm:h-52 rounded-full bg-[#FF5500]/80 blur-2xl -z-10" />
                    <img 
                      src={speaker.silhouetteImg} 
                      alt="Mystery Silhouette"
                      className="w-full h-full max-h-[270px] object-contain object-bottom mix-blend-multiply filter contrast-125 pointer-events-none"
                    />
                  </div>

                  {/* Hover / Click to Flip Floating Badge */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/85 text-white font-mono text-[10px] font-bold tracking-wider shadow-lg border border-[#FF5500] animate-bounce">
                      <RotateCw className="w-3 h-3 text-[#FFAA00]" />
                      <span>TAP TO FLIP FOR CLUES</span>
                    </div>
                  </div>

                  {/* BOTTOM STAR RIBBON BANNER */}
                  <div className="relative z-30 -mx-6 -mb-6 bg-gradient-to-r from-[#993300] via-[#FF5500] to-[#993300] py-2 px-4 border-t-2 border-b-2 border-white shadow-md flex items-center justify-center gap-2 text-white">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs tracking-widest font-mono select-none">
                      <span>★</span>
                      <span>★</span>
                      <span className="font-bold uppercase tracking-wider text-[10px] px-1 bg-black/40 rounded">
                        KEYNOTE {speaker.num} • CLICK TO FLIP
                      </span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* BACK FACE: SECRET CLUES DOSSIER                                           */}
                {/* ========================================================================= */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] bg-[#0E0E0E] text-white p-5 sm:p-6 overflow-hidden flex flex-col justify-between border-2 border-[#FF5500] shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Classified Header */}
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#FF5500]" />
                      <span className="font-mono text-xs font-black text-[#FFAA00] uppercase tracking-wider">
                        SECRET DOSSIER #{speaker.num}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#FF5500] font-mono text-[9px] font-bold uppercase">
                      CONFIDENTIAL
                    </span>
                  </div>

                  {/* Short Summary Clue */}
                  <div className="p-2.5 rounded-xl bg-[#181818] border border-[#282828] text-xs font-sans text-neutral-200 italic leading-relaxed">
                    "{speaker.shortClue}"
                  </div>

                  {/* 4 Sticky Clues printed on back */}
                  <div className="space-y-2 overflow-y-auto max-h-[200px] scrollbar-none pr-1">
                    {speaker.hints.slice(0, 4).map((hint, idx) => (
                      <div 
                        key={idx}
                        className="p-2.5 bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] rounded-xl flex items-start gap-2.5 shadow-sm"
                      >
                        <span className="text-base shrink-0 mt-0.5">{hint.icon}</span>
                        <div>
                          <div className="font-mono text-[11px] font-bold text-white tracking-wide">
                            {hint.title}
                          </div>
                          <div className="font-sans text-[10px] text-neutral-300 leading-snug">
                            {hint.detail}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Flip Back Button */}
                  <div className="pt-2 border-t border-[#222222] flex items-center justify-between">
                    <span className="font-mono text-[9px] text-neutral-400">
                      TAP ANYWHERE TO FLIP FRONT
                    </span>
                    <button 
                      onClick={handleCardClick}
                      className="px-3 py-1 rounded-full bg-[#FF5500] hover:bg-[#FF6A00] text-white font-mono text-[10px] font-bold flex items-center gap-1 shadow"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Flip Front</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Actions */}
            <div className="w-full pt-3 flex items-center justify-between font-mono text-[11px] text-neutral-300 relative z-20">
              <button
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setIsRevealed(!isRevealed);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white hover:text-[#FFAA00] hover:border-[#FF5500]/50 transition-all cursor-pointer shadow-md"
              >
                {isRevealed ? <Lock className="w-3.5 h-3.5 text-[#FF5500]" /> : <Eye className="w-3.5 h-3.5 text-[#FF5500]" />}
                <span className="font-bold">{isRevealed ? 'Hide Identity' : 'Instant Reveal'}</span>
              </button>

              <span className="text-neutral-400 font-mono text-[10px] sm:text-xs">📍 {speaker.revealed.venue}</span>
            </div>

          </div>

          {/* ================= RIGHT 7 COLS: UNIFIED PREDICTION TERMINAL & OFFICIAL DOSSIER ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            
            {!isRevealed ? (
              <>
                {/* Prediction Input Form */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#FF5500]/40 text-[#FFAA00] font-mono text-xs font-bold tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>LIVE IDENTITY PREDICTION TERMINAL</span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                      WHO IS SPEAKER #{speaker.num}?
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      Flip the trading card on the left to read all secret clues, then submit your guess below!
                    </p>
                  </div>

                  <form onSubmit={handleGuessSubmit} className="space-y-3">
                    <div className="relative">
                      <input 
                        type="text"
                        value={guessInput}
                        onChange={(e) => setGuessInput(e.target.value)}
                        placeholder="e.g. Kunal Shah, Anupam Mittal, Andrej Karpathy..."
                        className="w-full pl-5 pr-32 sm:pr-36 py-3.5 bg-black border border-[#333333] focus:border-[#FF5500] rounded-2xl text-sm font-sans font-medium text-white placeholder-neutral-500 focus:outline-none transition-all shadow-xs"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl text-xs font-display font-black tracking-wider uppercase bg-[#FF5500] hover:bg-[#FF6A00] text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>

                  {/* Feedback Notification */}
                  {guessFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                        guessFeedback.type === 'success'
                          ? 'bg-[#181818] border-white text-white'
                          : 'bg-[#2E1200] border-[#FF5500] text-white'
                      }`}
                    >
                      {guessFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#FF5500] shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs font-black uppercase tracking-wider text-white">
                          {guessFeedback.type === 'success' ? 'ACCESS GRANTED ✓' : 'ACCESS DENIED'}
                        </div>
                        <p className="font-sans text-xs text-neutral-200 leading-relaxed">{guessFeedback.message}</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Official Dossier & Benchmarks */}
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-xs font-bold tracking-widest text-[#FFAA00] uppercase">
                    OFFICIAL DOSSIER BENCHMARKS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {speaker.dossier.map((d, i) => (
                      <div key={i} className="p-3.5 bg-[#181818] border border-[#2A2A2A] rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FFAA00] font-bold">
                            {d.tag}
                          </span>
                          <span className="font-mono text-[9px] text-neutral-400">{d.badge}</span>
                        </div>
                        <h4 className="font-display font-bold text-xs text-white uppercase">{d.title}</h4>
                        <p className="font-sans text-[11px] text-neutral-300 leading-tight">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* REVEALED FULL PROFILE */
              <div className="space-y-5 my-auto">
                <div className="space-y-1">
                  <span className="font-mono text-xs tracking-widest text-[#FFAA00] uppercase font-bold">
                    CONFIRMED KEYNOTE PROFILE
                  </span>
                  <h3 className="font-display font-black text-3xl uppercase text-white">
                    {speaker.revealed.name}
                  </h3>
                  <p className="font-mono text-xs text-[#FF5500] font-semibold">
                    {speaker.revealed.designation}
                  </p>
                </div>

                <div className="p-4 bg-[#181818] border-l-4 border-[#FF5500] rounded-r-xl italic font-serif text-sm sm:text-base text-neutral-200">
                  "{speaker.revealed.quote}"
                </div>

                <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-xl space-y-2">
                  <div className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">KEYNOTE TITLE</div>
                  <div className="font-display font-bold text-base text-white">{speaker.revealed.keynoteTitle}</div>
                  <div className="flex items-center gap-4 pt-1 font-mono text-xs text-neutral-300">
                    <span>🕒 {speaker.revealed.time}</span>
                    <span>📍 {speaker.revealed.venue}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Scroll Actions */}
            <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
              <span className="font-mono text-[11px] text-neutral-400">
                {!isLast ? `UP NEXT: SPEAKER 0${index + 2}` : 'ALL 3 SPEAKERS UNLOCKED'}
              </span>

              {!isLast ? (
                <button
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onNextSpeaker();
                  }}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-white hover:text-[#FF5500] transition-colors group cursor-pointer"
                >
                  <span className="font-bold">SCROLL TO NEXT SPEAKER</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#FF5500]" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    onOpenGuessesArena();
                  }}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[#FF5500] font-bold hover:underline cursor-pointer"
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
