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
  const [guessesLog, setGuessesLog] = useState([
    { user: 'arjun.dev', guess: 'Kunal Shah', speakerNum: '01', time: 'Just now', verified: true },
    { user: 'priya_codes', guess: 'Anupam Mittal', speakerNum: '02', time: '1m ago', verified: true },
    { user: 'tech_ninja', guess: 'Andrej Karpathy', speakerNum: '03', time: '3m ago', verified: true },
    { user: 'sam_hacker', guess: 'Deepinder Goyal', speakerNum: '02', time: '6m ago', verified: false },
    { user: 'tanvi.ai', guess: 'Sam Altman', speakerNum: '03', time: '10m ago', verified: false }
  ]);
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
      setGuessesLog(prev => [
        { user: 'You (Detective)', guess: guessInput, speakerNum: activeSpeaker.num, time: 'Just now', verified: true },
        ...prev
      ]);
    } else {
      setFeedback({
        type: 'wrong',
        text: `Good try! But that's not quite matching our Speaker #${activeSpeaker.num} dossier.`
      });
      setGuessesLog(prev => [
        { user: 'You (Detective)', guess: guessInput, speakerNum: activeSpeaker.num, time: 'Just now', verified: false },
        ...prev
      ]);
    }

    setGuessInput('');
  };

  return (
    <section 
      id="guesses" 
      className="relative w-full min-h-screen bg-[#060606] text-white py-24 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#FF2A1A]/40 text-[#FF2A1A] font-mono text-xs tracking-widest uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>THE GUESSING ARENA</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
              DECODE ALL 3 SPEAKERS
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-xl">
              Lock in your predictions, examine community theories, and see where you rank on the DEVTALKS '26 Detective Leaderboard.
            </p>
          </div>

          {/* Speaker Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#111111] border border-[#262626] p-1.5 rounded-xl self-start md:self-auto">
            {speakersList.map((spk) => (
              <button
                key={spk.id}
                onClick={() => {
                  soundFx.playEvidenceClick();
                  setSelectedSpeakerId(spk.id);
                  setFeedback(null);
                }}
                className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                  selectedSpeakerId === spk.id
                    ? 'bg-[#FF2A1A] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1C1C1C]'
                }`}
              >
                <span>SPK #{spk.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN ARENA (CENTERED GUESS SUBMISSION) ================= */}
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          {/* Target Mystery Card */}
          <div className="p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-2xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <span className="font-mono text-xs text-[#FF2A1A] font-bold tracking-widest uppercase">
                ACTIVE TARGET: SPEAKER #{activeSpeaker.num}
              </span>
              <button
                onClick={() => {
                  soundFx.playEvidenceClick();
                  onJumpToSpeaker(activeSpeaker.id);
                }}
                className="font-mono text-[11px] text-neutral-400 hover:text-[#FF2A1A] flex items-center gap-1 hover:underline"
              >
                <span>View Full Clues</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                {activeSpeaker.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 pt-1">
                {activeSpeaker.shortClue}
              </p>
            </div>

            {/* Sticky Note Preview */}
            <div className="p-4 bg-[#FFFFFF] text-black rounded-sm border border-neutral-300 shadow-md">
              <div className="font-handwritten font-bold text-xs tracking-wider text-black mb-1.5">
                TOP CLUES FOR SPEAKER #{activeSpeaker.num}:
              </div>
              <ul className="space-y-1 text-xs font-sans text-neutral-900">
                {activeSpeaker.hints.slice(0, 3).map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-sm">{h.icon}</span> <span className="font-medium">{h.title} — {h.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guess Submission Form */}
            <form onSubmit={handleGlobalGuess} className="space-y-3 pt-2">
              <label className="font-mono text-xs text-neutral-300 block uppercase tracking-wider">
                Enter Your Guess for Speaker #{activeSpeaker.num}:
              </label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder="Type person name or company name..."
                  className="flex-1 px-4 py-3.5 bg-black border border-[#333333] focus:border-[#FF2A1A] rounded-xl text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3.5 bg-[#FF2A1A] hover:bg-[#D91C1C] text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>GUESS</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Feedback Alert */}
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
                  feedback.type === 'success'
                    ? 'bg-[#181818] border-white text-white'
                    : 'bg-[#2B0E0E] border-[#FF2A1A] text-white'
                }`}
              >
                <Sparkles className={`w-4 h-4 shrink-0 ${feedback.type === 'success' ? 'text-white' : 'text-[#FF2A1A]'}`} />
                <span>{feedback.text}</span>
              </motion.div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
