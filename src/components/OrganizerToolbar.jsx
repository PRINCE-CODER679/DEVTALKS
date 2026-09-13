import React, { useState } from 'react';
import { Sliders, Eye, Lock, Unlock, X, RefreshCw, Volume2, Sparkles, Check, Key } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function OrganizerToolbar({
  isOpen,
  onClose,
  simulatedDay,
  onSetSimulatedDay,
  isRevealed,
  onToggleRevealed,
  isAudioActive,
  onToggleAudio,
  validKeywords
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-surface/98 border border-brand-red/60 backdrop-blur-xl shadow-2xl p-5 text-editorial-light font-mono text-xs animate-fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-editorial-border pb-3 mb-4">
        <div className="flex items-center gap-2 text-brand-lightRed font-bold">
          <Sliders className="w-4 h-4 text-brand-red" />
          <span className="tracking-widest uppercase">ORGANIZER SIMULATOR</span>
        </div>
        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onClose();
          }}
          className="text-editorial-dim hover:text-white transition-colors"
          aria-label="Close Simulator"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Simulation Day Picker */}
        <div className="space-y-2">
          <div className="text-[10px] text-editorial-dim tracking-widest uppercase flex items-center justify-between">
            <span>SIMULATE CAMPAIGN DAY:</span>
            <span className="text-white font-bold">DAY {simulatedDay} OF 4</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((day) => (
              <button
                key={day}
                onClick={() => {
                  soundFx.playEvidenceClick();
                  onSetSimulatedDay(day);
                }}
                className={`py-2 px-1 text-center border font-bold text-xs transition-all ${
                  simulatedDay === day
                    ? 'bg-brand-red text-white border-brand-red'
                    : 'bg-void border-editorial-border text-editorial-muted hover:border-editorial-borderHover'
                }`}
              >
                DAY {day}
              </button>
            ))}
          </div>
        </div>

        {/* Reveal State Override */}
        <div className="space-y-2 pt-2 border-t border-editorial-border">
          <div className="text-[10px] text-editorial-dim tracking-widest uppercase">
            SPEAKER REVEAL STATUS:
          </div>
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onToggleRevealed();
            }}
            className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 border font-bold text-xs transition-all ${
              isRevealed 
                ? 'bg-green-600/20 border-green-500 text-green-400' 
                : 'bg-void border-brand-red/50 text-brand-lightRed'
            }`}
          >
            {isRevealed ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>PAYOFF MODE: REVEALED PROFILE ACTIVE</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>COUNTDOWN MODE: SILHOUETTE ACTIVE</span>
              </>
            )}
          </button>
        </div>

        {/* Audio Toggle */}
        <div className="space-y-2 pt-2 border-t border-editorial-border">
          <div className="text-[10px] text-editorial-dim tracking-widest uppercase">
            AUDIO ATMOSPHERE:
          </div>
          <button
            onClick={onToggleAudio}
            className="w-full py-2 px-3 bg-void border border-editorial-border hover:border-editorial-borderHover text-editorial-light text-xs flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-brand-red" />
              <span>Low-frequency Cinematic Drone</span>
            </span>
            <span className={isAudioActive ? 'text-brand-lightRed font-bold' : 'text-editorial-dim'}>
              {isAudioActive ? 'ACTIVE' : 'MUTED'}
            </span>
          </button>
        </div>

        {/* Quick Guess Keywords info */}
        <div className="p-2.5 bg-void/80 border border-editorial-border text-[10px] text-editorial-dim space-y-1">
          <div className="flex items-center gap-1.5 text-editorial-muted font-bold">
            <Key className="w-3 h-3 text-brand-red" />
            <span>QUICK GUESS TEST EXAMPLES:</span>
          </div>
          <div className="text-editorial-muted truncate">
            e.g. "speaker name", "sam altman", "satya nadella"
          </div>
        </div>
      </div>

    </div>
  );
}
