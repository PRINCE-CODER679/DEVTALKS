import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  Instagram,
  User,
  Flame,
  Award,
  GraduationCap,
  X,
  HelpCircle,
  PartyPopper
} from 'lucide-react';
import { speakersList } from '../data/speakers';
import { soundFx } from '../utils/audio';

export default function GuessesArena({ onJumpToSpeaker }) {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState('speaker-1');
  const [fullName, setFullName] = useState('');
  const [instaId, setInstaId] = useState('');
  const [department, setDepartment] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [reasonInput, setReasonInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal Popup State
  const [modalData, setModalData] = useState(null);

  const activeSpeaker = speakersList.find(s => s.id === selectedSpeakerId) || speakersList[0];
  const activeIndex = speakersList.findIndex(s => s.id === selectedSpeakerId);

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !instaId.trim() || !department.trim() || !guessInput.trim()) return;

    setIsSubmitting(true);
    soundFx.playEvidenceClick();

    const normalizedGuess = guessInput.toLowerCase().trim();
    const isCorrect = activeSpeaker.validKeywords.some(k => normalizedGuess.includes(k.toLowerCase()));
    const cleanInsta = instaId.startsWith('@') ? instaId.trim() : `@${instaId.trim()}`;

    const newGuessEntry = {
      id: Date.now(),
      speakerId: activeSpeaker.id,
      speakerNum: activeSpeaker.num,
      speakerTitle: activeSpeaker.title,
      name: fullName.trim(),
      insta: cleanInsta,
      department: department.trim(),
      guess: guessInput.trim(),
      reason: reasonInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCorrect
    };

    setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem('devtalks_user_guesses') || '[]');
        localStorage.setItem('devtalks_user_guesses', JSON.stringify([newGuessEntry, ...saved]));
      } catch (err) {}

      soundFx.playRevealUnlocked();

      // Open Modal Pop-up
      setModalData({
        speakerNum: activeSpeaker.num,
        speakerTitle: activeSpeaker.title,
        name: fullName.trim(),
        insta: cleanInsta,
        department: department.trim(),
        guess: guessInput.trim(),
        nextSpeakerIndex: (activeIndex + 1) % speakersList.length
      });

      setGuessInput('');
      setReasonInput('');
      setIsSubmitting(false);
    }, 450);
  };

  const handleNextSpeakerFromModal = () => {
    if (!modalData) return;
    const nextSpk = speakersList[modalData.nextSpeakerIndex];
    setSelectedSpeakerId(nextSpk.id);
    setModalData(null);
    soundFx.playEvidenceClick();
  };

  return (
    <section 
      id="guesses" 
      className="relative w-full min-h-screen bg-[#080808] text-white py-24 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,85,0,0.12)_0%,_transparent_70%)] blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181818] border border-[#FF5500]/50 text-[#FFAA00] font-mono text-xs font-bold tracking-widest uppercase shadow-md backdrop-blur-md">
            <Trophy className="w-4 h-4 text-[#FF5500]" />
            <span>COMMUNITY PREDICTION CHALLENGE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
            GUESS THE <span className="bg-gradient-to-r from-white via-[#FFAA00] to-[#FF5500] bg-clip-text text-transparent">SPEAKERS</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Select each keynote speaker below, submit your prediction with your <span className="text-[#FFAA00] font-semibold">Name, Instagram ID & Department</span>, and claim your chance to win exclusive VIP access!
          </p>
        </div>

        {/* ================= 3 SPEAKER SELECTOR CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {speakersList.map((spk, idx) => {
            const isSelected = selectedSpeakerId === spk.id;
            return (
              <button
                key={spk.id}
                type="button"
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setSelectedSpeakerId(spk.id);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#240F03] to-[#120701] border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.35)] scale-[1.02]'
                    : 'bg-[#111111] border-[#262626] hover:border-[#444444] hover:bg-[#161616]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FF5500] animate-ping' : 'bg-neutral-600'}`} />
                    <span className="font-mono text-xs font-black tracking-widest text-[#FFAA00]">
                      SPEAKER 0{spk.num}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    {idx === 0 ? 'TECH' : idx === 1 ? 'VENTURE' : 'AI & SCALE'}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-black text-lg text-white uppercase leading-tight tracking-wide">
                    {spk.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-300 line-clamp-2 mt-1 italic font-normal">
                    "{spk.shortClue}"
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-[#FF5500] font-bold tracking-wider' : 'text-neutral-500'}>
                    {isSelected ? '● ACTIVE TARGET' : 'SELECT SPEAKER'}
                  </span>
                  <span className="text-[11px] text-neutral-400">#0{spk.num}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ================= PREDICTION SUBMISSION FORM CARD ================= */}
        <div className="bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl max-w-3xl mx-auto w-full">
          
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-ping" />
                <span className="font-mono text-xs font-black text-[#FFAA00] uppercase tracking-widest">
                  PREDICTING: SPEAKER #{activeSpeaker.num}
                </span>
                <span className="text-neutral-600">|</span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">{activeSpeaker.roleTag}</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide">
                {activeSpeaker.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playEvidenceClick();
                onJumpToSpeaker(activeSpeaker.id);
              }}
              className="font-mono text-xs text-[#FF5500] hover:text-[#FFAA00] font-bold flex items-center gap-1 hover:underline cursor-pointer tracking-wider"
            >
              <span>Clues Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Clue Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181109] to-[#120B04] border border-[#FF5500]/30 flex items-center gap-3.5 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#FF5500] shrink-0" />
            <p className="font-sans text-xs sm:text-sm text-neutral-200 italic leading-snug font-medium">
              "{activeSpeaker.shortClue}"
            </p>
          </div>

          {/* The Form */}
          <form onSubmit={handleGuessSubmit} className="space-y-5">
            
            {/* Row 1: Name, Instagram ID & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs font-bold text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Your Full Name *</span>
                </label>
                <input 
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF5500] rounded-xl text-sm font-sans font-medium text-white placeholder-neutral-600 focus:outline-none transition-all"
                />
              </div>

              {/* Instagram Handle */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs font-bold text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Instagram className="w-3.5 h-3.5 text-[#FFAA00]" />
                  <span>Instagram ID *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">@</span>
                  <input 
                    type="text"
                    required
                    value={instaId.replace(/^@/, '')}
                    onChange={(e) => setInstaId(e.target.value)}
                    placeholder="your_username"
                    className="w-full pl-8 pr-4 py-3 bg-black border border-[#333333] focus:border-[#FF5500] rounded-xl text-sm font-sans font-medium text-white placeholder-neutral-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs font-bold text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Your Department *</span>
                </label>
                <input 
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. CSE / IT / AI & DS"
                  className="w-full px-4 py-3 bg-black border border-[#333333] focus:border-[#FF5500] rounded-xl text-sm font-sans font-medium text-white placeholder-neutral-600 focus:outline-none transition-all"
                />
              </div>

            </div>

            {/* Row 2: Speaker Guess Prediction */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-bold text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>Who is Speaker #{activeSpeaker.num}? (Your Guess) *</span>
              </label>
              <input 
                type="text"
                required
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                placeholder="e.g. Kunal Shah, Anupam Mittal, Andrej Karpathy..."
                className="w-full px-4 py-3.5 bg-black border border-[#333333] focus:border-[#FF5500] rounded-xl text-sm font-sans font-medium text-white placeholder-neutral-600 focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Row 3: Reason / Clue Theory (Optional) */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span>Why do you think so? (Optional Clue Theory)</span>
              </label>
              <input 
                type="text"
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder="e.g. The 100M+ users clue and CRED venture match perfectly!"
                className="w-full px-4 py-2.5 bg-black/60 border border-[#2A2A2A] focus:border-[#FF5500] rounded-xl text-xs font-sans text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#FF5500] via-[#FF6A00] to-[#FF5500] hover:from-[#FF6A00] hover:to-[#FFAA00] text-white font-display font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,85,0,0.5)] hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'RECORDING PREDICTION...' : 'SUBMIT PREDICTION & ENTER GIVEAWAY 🎯'}</span>
              <Send className="w-4 h-4" />
            </button>

          </form>

        </div>

      </div>

      {/* ================= SUCCESS / "YOUR ANSWER MIGHT BE CORRECT!" POP-UP MODAL ================= */}
      <AnimatePresence>
        {modalData && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1208] via-[#120B04] to-[#0A0502] border-2 border-[#FF5500] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,85,0,0.4)] text-white space-y-6 select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Icon & Header */}
              <div className="text-center space-y-2 pt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5500] to-[#FFAA00] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,85,0,0.7)]">
                  <Sparkles className="w-9 h-9 text-white animate-pulse" />
                </div>

                <div className="font-mono text-xs font-black uppercase tracking-[0.25em] text-[#FFAA00]">
                  PREDICTION RECORDED!
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  YOUR ANSWER MIGHT BE <span className="bg-gradient-to-r from-[#FFAA00] to-[#FF5500] bg-clip-text text-transparent">CORRECT!</span> 🔥
                </h3>
              </div>

              {/* Submission Summary Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#2E2E2E] space-y-2.5 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-neutral-400 font-mono">TARGET SPEAKER:</span>
                  <span className="font-bold text-[#FFAA00] font-mono">#{modalData.speakerNum} ({modalData.speakerTitle})</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-neutral-400 font-mono">YOUR GUESS:</span>
                  <span className="font-bold text-white text-sm">"{modalData.guess}"</span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span>Candidate: <strong>{modalData.name}</strong></span>
                  <span className="font-mono text-[#FFAA00]">{modalData.insta}</span>
                </div>

                <div className="text-neutral-400 text-[11px]">
                  Department: <span className="text-neutral-200">{modalData.department}</span>
                </div>
              </div>

              {/* Encouragement note */}
              <p className="font-sans text-xs sm:text-sm text-neutral-300 text-center leading-relaxed">
                Stay tuned! If your guess is correct, you'll be featured on <strong className="text-[#FFAA00]">@devkraft</strong> and contacted via Instagram for the VIP Keynote Pass!
              </p>

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleNextSpeakerFromModal}
                  className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-[#FF5500] to-[#FFAA00] hover:from-[#FF6A00] hover:to-[#FFB700] text-white font-display font-black text-xs tracking-wider uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(255,85,0,0.5)] cursor-pointer hover:scale-105"
                >
                  GUESS NEXT SPEAKER →
                </button>
                <button
                  type="button"
                  onClick={() => setModalData(null)}
                  className="w-full sm:w-auto py-3 px-5 bg-[#1C1C1C] hover:bg-[#282828] border border-white/20 text-neutral-300 hover:text-white font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                >
                  GOT IT
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
