import React from 'react';
import { X, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function FullscreenMenu({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  isAudioActive,
  onToggleAudio
}) {
  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: '01 / LANDING' },
    { id: 'casefile', label: '02 / CASE FILE' },
    { id: 'fact-1', label: '03 / SPEAKER FACTS' },
    { id: 'guess', label: '04 / GUESS' },
    { id: 'reveal', label: '05 / COUNTDOWN' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#070707]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-fade-in select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <span className="font-display font-black text-sm tracking-widest text-white uppercase">
          DEVKRAFT
        </span>

        <button
          onClick={() => {
            soundFx.playEvidenceClick();
            onClose();
          }}
          className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav List */}
      <div className="my-auto py-8 flex flex-col space-y-4 max-w-md">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              soundFx.playEvidenceClick();
              onNavigate(item.id);
              onClose();
            }}
            className={`group text-left py-3 border-b border-white/10 flex items-center justify-between transition-all ${
              activeSection === item.id 
                ? 'text-brand-red pl-2 border-brand-red' 
                : 'text-white/80 hover:text-white hover:pl-2'
            }`}
          >
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase">
              {item.label}
            </span>
            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {/* Bottom Footer Action */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/40">
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          {isAudioActive ? <Volume2 className="w-4 h-4 text-brand-red" /> : <VolumeX className="w-4 h-4" />}
          <span>ATMOSPHERE AUDIO {isAudioActive ? 'ON' : 'MUTED'}</span>
        </button>

        <span className="tracking-mega uppercase text-[10px]">
          DEV TALKS '26
        </span>
      </div>

    </div>
  );
}
