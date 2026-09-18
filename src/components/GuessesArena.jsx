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
  GraduationCap,
  X,
  AlertCircle
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
  const [submitError, setSubmitError] = useState(null);
  
  // Modal Popup State
  const [modalData, setModalData] = useState(null);

  const activeSpeaker = speakersList.find(s => s.id === selectedSpeakerId) || speakersList[0];
  const activeIndex = speakersList.findIndex(s => s.id === selectedSpeakerId);

  const handleGuessSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !instaId.trim() || !department.trim() || !guessInput.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try { soundFx.playEvidenceClick(); } catch (err) {}

    const cleanInsta = instaId.startsWith('@') ? instaId.trim() : `@${instaId.trim()}`;

    // Payload strictly supplying the website-controlled speaker number ("01", "02", or "03")
    const payload = {
      fullName: fullName.trim(),
      instagramId: cleanInsta,
      department: department.trim(),
      speakerNumber: activeSpeaker.num, // Strictly controlled by website
      guess: guessInput.trim(),
      clueTheory: reasonInput.trim()
    };

    try {
      const response = await fetch('/api/submit-guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'SUBMISSION FAILED. Please try again.');
      }

      // Success Audio
      try { soundFx.playRevealUnlocked(); } catch (err) {}

      // Open Success Confirmation Modal
      setModalData({
        submissionId: result.submissionId,
        speakerNum: activeSpeaker.num,
        speakerTitle: activeSpeaker.title,
        name: fullName.trim(),
        insta: cleanInsta,
        department: department.trim(),
        guess: guessInput.trim(),
        nextSpeakerIndex: (activeIndex + 1) % speakersList.length
      });

      // Clear guess inputs for the next submission
      setGuessInput('');
      setReasonInput('');
      setSubmitError(null);

    } catch (err) {
      console.error('[SUBMISSION ERROR]', err);
      setSubmitError(err.message || 'SUBMISSION FAILED. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextSpeakerFromModal = () => {
    if (!modalData) return;
    const nextSpk = speakersList[modalData.nextSpeakerIndex];
    setSelectedSpeakerId(nextSpk.id);
    setModalData(null);
    setSubmitError(null);
    try { soundFx.playEvidenceClick(); } catch (err) {}
  };

  return (
    <section 
      id="guesses" 
      className="relative w-full min-h-screen bg-[#080808] text-[#f4f0e8] py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden select-none"
    >
      {/* ================= DISTINCT SPEAKER-SPECIFIC ATMOSPHERIC BACKGROUND IMAGES ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden">
          {speakersList.map((spk) => {
            const isCurrent = selectedSpeakerId === spk.id;
            const bgImageSrc = spk.id === 'speaker-1' 
              ? '/speaker1-guess-silhouette.jpg' 
              : spk.id === 'speaker-2' 
              ? '/hero-silhouette.jpg' 
              : '/speaker3-guess-silhouette.jpg';

            return (
              <img 
                key={spk.id}
                src={bgImageSrc} 
                alt={`DevTalks Guess Silhouette - ${spk.title}`} 
                className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-125 contrast-130 saturate-125 transition-all duration-700 ease-in-out ${
                  isCurrent ? 'opacity-95 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            );
          })}
          
          {/* Subtle Dark Overlays & Gradient Blends for Clean Contrast */}
          <div className="absolute inset-0 bg-[#080808]/30 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080808] via-[#080808]/75 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ================= ATMOSPHERIC EMBER PARTICLES & LIGHT GLOWS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ff5a1f]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-[#ff7a45]/10 rounded-full blur-[120px] pointer-events-none" />
        
        {[
          { top: '8%', left: '12%', size: 'w-1.5 h-1.5', opacity: 'opacity-70', anim: 'animate-pulse' },
          { top: '15%', left: '78%', size: 'w-2 h-2', opacity: 'opacity-80', anim: 'animate-bounce' },
          { top: '22%', left: '35%', size: 'w-1 h-1', opacity: 'opacity-60', anim: 'animate-pulse' },
          { top: '30%', left: '88%', size: 'w-1.5 h-1.5', opacity: 'opacity-75', anim: 'animate-pulse' },
          { top: '42%', left: '8%', size: 'w-2 h-2', opacity: 'opacity-70', anim: 'animate-pulse' },
          { top: '48%', left: '92%', size: 'w-1 h-1', opacity: 'opacity-90', anim: 'animate-ping' },
          { top: '55%', left: '22%', size: 'w-1.5 h-1.5', opacity: 'opacity-65', anim: 'animate-pulse' },
          { top: '65%', left: '75%', size: 'w-2 h-2', opacity: 'opacity-80', anim: 'animate-pulse' },
          { top: '72%', left: '15%', size: 'w-1 h-1', opacity: 'opacity-60', anim: 'animate-pulse' },
          { top: '80%', left: '85%', size: 'w-1.5 h-1.5', opacity: 'opacity-85', anim: 'animate-bounce' },
          { top: '88%', left: '40%', size: 'w-2 h-2', opacity: 'opacity-75', anim: 'animate-pulse' },
          { top: '92%', left: '60%', size: 'w-1 h-1', opacity: 'opacity-70', anim: 'animate-pulse' },
          { top: '18%', left: '50%', size: 'w-1.5 h-1.5', opacity: 'opacity-60', anim: 'animate-pulse' },
          { top: '60%', left: '50%', size: 'w-2 h-2', opacity: 'opacity-70', anim: 'animate-pulse' },
        ].map((ember, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-[#ff5a1f] shadow-[0_0_8px_#ff5a1f] ${ember.size} ${ember.opacity} ${ember.anim} pointer-events-none`}
            style={{ top: ember.top, left: ember.left }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#ff5a1f]/30 text-[#ff5a1f] font-mono text-xs font-bold tracking-widest uppercase shadow-xs">
            <Trophy className="w-4 h-4 text-[#ff5a1f]" />
            <span>COMMUNITY PREDICTION CHALLENGE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#f4f0e8] leading-tight">
            GUESS THE <span className="text-[#ff5a1f]">SPEAKERS</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#817b73] max-w-2xl mx-auto leading-relaxed font-medium">
            Select each keynote speaker below, submit your prediction with your <span className="text-[#ff8a3d] font-semibold">Name, Instagram ID & Department</span>, and claim your chance to win exclusive VIP access!
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
                  try { soundFx.playEvidenceClick(); } catch (err) {}
                  setSelectedSpeakerId(spk.id);
                  setSubmitError(null);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-black/60 border-2 border-[#ff5a1f] shadow-[0_8px_25px_rgba(255,90,31,0.2)] scale-[1.02]'
                    : 'bg-black/30 border-white/15 hover:border-[#ff5a1f]/50 hover:bg-black/50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#ff5a1f] animate-ping' : 'bg-white/20'}`} />
                    <span className="font-mono text-xs font-black tracking-widest text-[#ff5a1f]">
                      SPEAKER 0{spk.num}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#817b73] uppercase tracking-wider font-semibold">
                    {idx === 0 ? 'TECH' : idx === 1 ? 'VENTURE' : 'AI & SCALE'}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-black text-lg text-[#f4f0e8] uppercase leading-tight tracking-wide">
                    {spk.title}
                  </h4>
                  <p className="font-sans text-xs text-[#817b73] line-clamp-2 mt-1 italic font-normal">
                    "{spk.shortClue}"
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-[#ff5a1f] font-bold tracking-wider' : 'text-[#817b73]'}>
                    {isSelected ? '● ACTIVE TARGET' : 'SELECT SPEAKER'}
                  </span>
                  <span className="text-[11px] text-[#817b73]">#0{spk.num}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ================= PREDICTION SUBMISSION FORM ================= */}
        <div className="w-full space-y-6 pt-4">
          
          {/* Header row: Speaker badge & Dossier link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono text-xs sm:text-sm font-black text-[#ff5a1f] uppercase tracking-widest">
                  PREDICTING: SPEAKER #{activeSpeaker.num}
                </span>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="font-mono text-[11px] sm:text-xs text-[#817b73] uppercase tracking-wider font-semibold">
                  {activeSpeaker.roleTag}
                </span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-[#f4f0e8] uppercase tracking-wider mt-1">
                {activeSpeaker.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                try { soundFx.playEvidenceClick(); } catch (err) {}
                onJumpToSpeaker(activeSpeaker.id);
              }}
              className="font-mono text-xs sm:text-sm text-[#ff5a1f] hover:text-[#ff8a3d] font-bold flex items-center gap-1.5 hover:underline cursor-pointer tracking-wider self-start sm:self-center"
            >
              <span>Clues Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Clue Banner */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[#ff5a1f]/35 bg-black/40 flex items-center gap-3.5 shadow-sm">
            <Sparkles className="w-5 h-5 text-[#ff5a1f] shrink-0" />
            <p className="font-sans text-xs sm:text-sm text-[#f4f0e8] italic leading-snug font-medium">
              "{activeSpeaker.shortClue}"
            </p>
          </div>

          {/* The Form */}
          <form onSubmit={handleGuessSubmit} className="space-y-5">
            
            {/* Row 1: Name, Instagram ID & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-mono text-xs font-bold text-[#f4f0e8] flex items-center gap-1.5 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-[#ff5a1f]" />
                  <span>YOUR FULL NAME *</span>
                </label>
                <input 
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/15 focus:border-[#ff5a1f] rounded-xl text-sm font-sans font-medium text-[#f4f0e8] placeholder-[#817b73] focus:outline-none transition-all shadow-xs"
                />
              </div>

              {/* Instagram Handle */}
              <div className="space-y-2">
                <label className="font-mono text-xs font-bold text-[#f4f0e8] flex items-center gap-1.5 uppercase tracking-wider">
                  <Instagram className="w-3.5 h-3.5 text-[#ff5a1f]" />
                  <span>INSTAGRAM ID *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#817b73] font-mono text-sm">@</span>
                  <input 
                    type="text"
                    required
                    value={instaId.replace(/^@/, '')}
                    onChange={(e) => setInstaId(e.target.value)}
                    placeholder="your_username"
                    className="w-full pl-8 pr-4 py-3 bg-[#0a0a0a] border border-white/15 focus:border-[#ff5a1f] rounded-xl text-sm font-sans font-medium text-[#f4f0e8] placeholder-[#817b73] focus:outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="font-mono text-xs font-bold text-[#f4f0e8] flex items-center gap-1.5 uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5 text-[#ff5a1f]" />
                  <span>YOUR DEPARTMENT *</span>
                </label>
                <input 
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. CSE / IT / AI & DS"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/15 focus:border-[#ff5a1f] rounded-xl text-sm font-sans font-medium text-[#f4f0e8] placeholder-[#817b73] focus:outline-none transition-all shadow-xs"
                />
              </div>

            </div>

            {/* Row 2: Speaker Guess Prediction */}
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#f4f0e8] flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>WHO IS SPEAKER #{activeSpeaker.num}? (YOUR GUESS) *</span>
              </label>
              <input 
                type="text"
                required
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                placeholder="e.g. Kunal Shah, Anupam Mittal, Andrej Karpathy..."
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-white/15 focus:border-[#ff5a1f] rounded-xl text-sm font-sans font-medium text-[#f4f0e8] placeholder-[#817b73] focus:outline-none transition-all shadow-xs"
              />
            </div>

            {/* Row 3: Reason / Clue Theory (Optional) */}
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#817b73] flex items-center gap-1.5 uppercase tracking-wider">
                <span>WHY DO YOU THINK SO? (OPTIONAL CLUE THEORY)</span>
              </label>
              <input 
                type="text"
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder="e.g. The 100M+ users clue and CRED venture match perfectly!"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/15 focus:border-[#ff5a1f] rounded-xl text-sm font-sans text-[#f4f0e8] placeholder-[#817b73] focus:outline-none transition-all"
              />
            </div>

            {/* Error Message Display */}
            {submitError && (
              <div className="p-3.5 rounded-xl bg-[#c83f12]/20 border border-[#ff5a1f] text-[#f4f0e8] text-xs font-mono flex items-center gap-2 shadow-sm animate-pulse">
                <AlertCircle className="w-4 h-4 text-[#ff5a1f] shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-display font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all shadow-[0_4px_20px_rgba(255,90,31,0.35)] hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
            >
              <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT PREDICTION & ENTER GIVEAWAY'}</span>
              <Send className="w-4 h-4" />
            </button>

          </form>

        </div>

      </div>

      {/* ================= SUCCESS POP-UP MODAL (PREDICTION LOGGED) ================= */}
      <AnimatePresence>
        {modalData && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-[#111111] border-2 border-[#ff5a1f] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(255,90,31,0.25)] text-[#f4f0e8] space-y-6 select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#080808] hover:bg-[#181818] text-[#f4f0e8] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Icon & Header */}
              <div className="text-center space-y-2 pt-2">
                <div className="w-16 h-16 rounded-full bg-[#ff5a1f] flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(255,90,31,0.35)]">
                  <CheckCircle2 className="w-9 h-9 text-[#080808]" />
                </div>

                <div className="font-mono text-xs font-black uppercase tracking-[0.25em] text-[#ff5a1f]">
                  PREDICTION LOGGED
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#f4f0e8]">
                  YOUR PREDICTION HAS BEEN <span className="text-[#ff5a1f]">RECORDED!</span>
                </h3>
              </div>

              {/* Submission Summary Card */}
              <div className="p-4 rounded-2xl bg-[#080808] border border-white/10 space-y-2.5 font-sans text-xs">
                {modalData.submissionId && (
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[#817b73] font-mono">SUBMISSION ID:</span>
                    <span className="font-bold text-[#ff8a3d] font-mono tracking-wider">{modalData.submissionId}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#817b73] font-mono">TARGET SPEAKER:</span>
                  <span className="font-bold text-[#ff5a1f] font-mono">#{modalData.speakerNum} ({modalData.speakerTitle})</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#817b73] font-mono">YOUR GUESS:</span>
                  <span className="font-bold text-[#f4f0e8] text-sm">"{modalData.guess}"</span>
                </div>

                <div className="flex items-center justify-between text-[#f4f0e8]">
                  <span>Candidate: <strong>{modalData.name}</strong></span>
                  <span className="font-mono text-[#ff8a3d] font-bold">{modalData.insta}</span>
                </div>

                <div className="text-[#817b73] text-[11px]">
                  Department: <span className="text-[#f4f0e8] font-semibold">{modalData.department}</span>
                </div>
              </div>

              {/* Encouragement note */}
              <p className="font-sans text-xs sm:text-sm text-[#817b73] text-center leading-relaxed font-medium">
                Your prediction has been secured. Winners will be announced during DEVTALKS '26 and contacted via Instagram for VIP backstage passes!
              </p>

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleNextSpeakerFromModal}
                  className="w-full sm:flex-1 py-3 px-4 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-display font-black text-xs tracking-wider uppercase rounded-xl transition-all shadow-[0_4px_16px_rgba(255,90,31,0.25)] cursor-pointer hover:scale-105"
                >
                  GUESS NEXT SPEAKER →
                </button>
                <button
                  type="button"
                  onClick={() => setModalData(null)}
                  className="w-full sm:w-auto py-3 px-5 bg-[#080808] hover:bg-[#181818] border border-white/10 text-[#f4f0e8] font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
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
