import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  ArrowRight
} from 'lucide-react';
import { speakersList } from '../data/speakers';
import { soundFx } from '../utils/audio';

export default function GuessesArena({ onJumpToSpeaker }) {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState('speaker-1');
  const [guessInput, setGuessInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  const activeSpeaker = speakersList.find(s => s.id === selectedSpeakerId) || speakersList[0];

  const handleGlobalGuess = (e) => {
    e.preventDefault();
    if (!guessInput.trim()) return;

    const normalized = guessInput.toLowerCase().trim();
    const isCorrect = activeSpeaker.validKeywords.some(k => normalized.includes(k.toLowerCase()));

    soundFx.playEvidenceClick();

    if (isCorrect) {
      soundFx.playRevealUnlocked();
      setFeedback({
        type: 'success',
        text: `Bullseye! You correctly decoded Speaker #${activeSpeaker.num} as ${activeSpeaker.revealed.name}!`
      });
    } else {
      setFeedback({
        type: 'wrong',
        text: `Good try! But that's not quite matching our Speaker #${activeSpeaker.num} dossier.`
      });
    }

    setGuessInput('');
  };

  return (
    <section 
      id="guesses" 
      className="relative w-full min-h-screen bg-[#080808] text-white py-24 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-10">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF5500]/40 text-[#FFAA00] font-mono text-xs font-bold tracking-widest uppercase shadow-xs">
              <Trophy className="w-4 h-4 text-[#FF5500]" />
              <span>THE GUESSING ARENA</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
              DECODE ALL 3 <span className="text-[#FF5500]">SPEAKERS</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              Analyze the confidential dossiers, test your theories, and see if you can uncover our 3 mystery keynote titans before the official reveal.
            </p>
          </div>

          {/* Speaker Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#111111] border border-[#262626] p-1.5 rounded-2xl shadow-sm self-start md:self-auto">
            {speakersList.map((spk) => (
              <button
                key={spk.id}
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setSelectedSpeakerId(spk.id);
                  setFeedback(null);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  selectedSpeakerId === spk.id
                    ? 'bg-[#FF5500] text-white shadow-md shadow-orange-950/50'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1C1C1C]'
                }`}
              >
                <span>SPEAKER 0{spk.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN ARENA CARD ================= */}
        <div className="bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-9 space-y-7 shadow-2xl">
          
          {/* Top Target Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222222] pb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-ping" />
              <span className="font-mono text-xs sm:text-sm text-[#FFAA00] font-black tracking-widest uppercase">
                ACTIVE TARGET: SPEAKER #{activeSpeaker.num}
              </span>
              <span className="text-neutral-600">|</span>
              <span className="font-mono text-xs text-neutral-400 font-semibold uppercase">{activeSpeaker.roleTag}</span>
            </div>
            <button
              onClick={() => {
                soundFx.playEvidenceClick();
                onJumpToSpeaker(activeSpeaker.id);
              }}
              className="font-mono text-xs text-neutral-400 hover:text-[#FF5500] font-bold flex items-center gap-1.5 hover:underline cursor-pointer transition-colors"
            >
              <span>View Full Clues</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title & Short Clue */}
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              {activeSpeaker.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
              {activeSpeaker.shortClue}
            </p>
          </div>

          {/* Key Clues Summary Card */}
          <div className="p-5 bg-[#181818] text-white rounded-2xl border border-[#2A2A2A] shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FFAA00] tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#FF5500]" />
              <span>TOP EVIDENCE SUMMARY:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeSpeaker.hints.slice(0, 3).map((h, i) => (
                <div key={i} className="p-3 bg-[#111111] rounded-xl border border-[#262626] shadow-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{h.icon}</span>
                    <span className="font-mono text-xs font-bold text-white">{h.title}</span>
                  </div>
                  <p className="font-sans text-xs text-neutral-300 leading-tight">{h.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guess Submission Form */}
          <form onSubmit={handleGlobalGuess} className="space-y-3.5 pt-2">
            <label className="font-mono text-xs sm:text-sm font-bold text-neutral-200 block uppercase tracking-wider">
              Enter Your Prediction for Speaker #{activeSpeaker.num}:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                placeholder="e.g. Kunal Shah, Anupam Mittal, Andrej Karpathy..."
                className="flex-1 px-5 py-4 bg-black border border-[#333333] focus:border-[#FF5500] focus:bg-black rounded-2xl text-sm sm:text-base font-sans font-medium text-white placeholder-neutral-500 focus:outline-none transition-all shadow-xs"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#FF5500] via-[#FF6A00] to-[#FF5500] hover:from-[#FF6A00] hover:to-[#FFAA00] text-white font-display font-black text-xs sm:text-sm tracking-widest uppercase rounded-2xl transition-all shadow-md shadow-orange-950/40 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                <span>SUBMIT GUESS</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Feedback Alert */}
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 ${
                feedback.type === 'success'
                  ? 'bg-[#181818] border-white text-white'
                  : 'bg-[#2E1200] border-[#FF5500] text-white'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-0.5" />
              ) : (
                <Sparkles className="w-6 h-6 text-[#FF5500] shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="font-mono text-xs font-black uppercase tracking-wider text-white">
                  {feedback.type === 'success' ? 'DECODE VERIFIED ✓' : 'CLUE NOT MATCHED'}
                </div>
                <p className="font-sans text-sm font-medium text-neutral-200 leading-relaxed">{feedback.text}</p>
              </div>
            </motion.div>
          )}

        </div>

      </div>

    </section>
  );
}
