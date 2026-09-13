import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, SlidersHorizontal, ShieldAlert } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ 
  activeSection, 
  onNavigate, 
  isAudioActive, 
  onToggleAudio, 
  onOpenMobileMenu, 
  onToggleOrganizer,
  isOrganizerOpen 
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'casefile', label: 'CASE FILE' },
    { id: 'clues', label: 'CLUES' },
    { id: 'guess', label: 'GUESS' },
    { id: 'countdown', label: 'COUNTDOWN' },
    { id: 'event', label: 'EVENT' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-void/90 backdrop-blur-md border-b border-editorial-border py-4 shadow-2xl' 
        : 'bg-gradient-to-b from-void/95 to-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Brand Top-Left */}
        <button 
          onClick={() => { soundFx.playEvidenceClick(); onNavigate('hero'); }}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse-subtle group-hover:scale-125 transition-transform" />
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-widest text-editorial-light group-hover:text-brand-red transition-colors">
              DEVKRAFT
            </span>
            <span className="font-mono text-[9px] tracking-mega text-editorial-dim">
              DEVTALKS '26
            </span>
          </div>
        </button>

        {/* Desktop Minimal Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playEvidenceClick();
                onNavigate(item.id);
              }}
              className={`font-mono text-xs tracking-widest transition-all duration-200 relative py-1 focus:outline-none ${
                activeSection === item.id 
                  ? 'text-brand-lightRed font-semibold' 
                  : 'text-editorial-muted hover:text-editorial-light'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-red animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* Controls: Audio & Mobile Menu & Organizer Preview */}
        <div className="flex items-center gap-3">
          {/* Audio Atmosphere Synthesizer Button */}
          <button
            onClick={() => {
              onToggleAudio();
            }}
            title={isAudioActive ? "Atmosphere Audio: ON" : "Atmosphere Audio: MUTED"}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm border border-editorial-border hover:border-editorial-borderHover text-editorial-muted hover:text-editorial-light bg-surface/60 text-xs font-mono transition-all"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-brand-red animate-pulse" />
                <span className="hidden sm:inline text-[10px] tracking-widest text-brand-red">ATMOSPHERE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-editorial-dim" />
                <span className="hidden sm:inline text-[10px] tracking-widest text-editorial-dim">MUTED</span>
              </>
            )}
          </button>

          {/* Organizer Preview Simulator Toggle */}
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onToggleOrganizer();
            }}
            title="Organizer Preview & Day Unlock Simulator"
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[10px] font-mono tracking-widest transition-all ${
              isOrganizerOpen 
                ? 'bg-brand-red/10 border-brand-red text-brand-lightRed' 
                : 'border-editorial-border text-editorial-dim hover:text-editorial-muted hover:border-editorial-borderHover'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>SIMULATOR</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onOpenMobileMenu();
            }}
            className="md:hidden p-2 text-editorial-light border border-editorial-border bg-surface/50 hover:border-editorial-borderHover transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
