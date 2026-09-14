import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ 
  activeSection, 
  onNavigate, 
  isAudioActive, 
  onToggleAudio, 
  onRegisterNow 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exactly 3 main navigation items: HOME, About, guesses
  const mainNavItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'About' },
    { id: 'guesses', label: 'guesses' }
  ];

  const handleNavClick = (id) => {
    soundFx.playEvidenceClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1F1F1F] py-3 shadow-2xl' 
        : 'bg-[#060606]/85 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo / Left */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <img 
            src="/devkraft-logo.png" 
            alt="Devkraft Logo" 
            className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(235,0,40,0.5)] group-hover:scale-105 transition-transform" 
          />
          <div className="h-5 w-px bg-neutral-700 hidden sm:block" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xs sm:text-sm tracking-widest text-white group-hover:text-[#EB0028] transition-colors leading-tight">
              DEVTALKS '26
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase">
              DEVKRAFT
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links: HOME, About, guesses */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-mono text-xs tracking-widest transition-all duration-200 relative py-1 focus:outline-none capitalize ${
                item.id === 'hero' ? 'uppercase' : ''
              } ${
                activeSection === item.id 
                  ? 'text-[#EB0028] font-bold' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#EB0028] animate-fade-in shadow-[0_0_8px_rgba(235,0,40,0.8)]" />
              )}
            </button>
          ))}

          {/* Quick Speaker Selector Pills */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#262626]">
            <span className="font-mono text-[10px] text-neutral-500 uppercase mr-1">SPEAKERS:</span>
            {['speaker-1', 'speaker-2', 'speaker-3'].map((spkId, idx) => (
              <button
                key={spkId}
                onClick={() => handleNavClick(spkId)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-colors ${
                  activeSection === spkId 
                    ? 'bg-[#EB0028] text-white font-bold shadow-[0_0_8px_rgba(235,0,40,0.6)]' 
                    : 'bg-[#181818] hover:bg-[#252525] text-neutral-400 hover:text-white'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </nav>

        {/* Right Controls: REGISTER NOW button & Audio */}
        <div className="flex items-center gap-3">
          
          {/* Atmosphere Audio Button */}
          <button
            onClick={() => {
              onToggleAudio();
            }}
            title={isAudioActive ? "Atmosphere Audio: ON" : "Atmosphere Audio: MUTED"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#2B2B2B] hover:border-[#EB0028] text-neutral-400 hover:text-white bg-[#111111] text-xs font-mono transition-all"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#EB0028] animate-pulse" />
                <span className="hidden lg:inline text-[10px] tracking-widest text-[#EB0028] font-semibold">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden lg:inline text-[10px] tracking-widest text-neutral-500">AUDIO MUTED</span>
              </>
            )}
          </button>

          {/* REGISTER NOW -> CTA button (TEDx Red) */}
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegisterNow();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#EB0028] bg-[#EB0028] hover:bg-[#D40024] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(235,0,40,0.4)]"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 border border-[#262626] rounded-lg bg-[#141414] hover:bg-[#1F1F1F] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-b border-[#222222] px-5 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-mono text-sm tracking-wider py-1 ${
                  activeSection === item.id ? 'text-[#EB0028] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-[#222222]">
              <span className="font-mono text-[10px] text-neutral-500 block mb-2">SPEAKERS DOSSIER:</span>
              <div className="grid grid-cols-3 gap-2">
                {['speaker-1', 'speaker-2', 'speaker-3'].map((spkId, idx) => (
                  <button
                    key={spkId}
                    onClick={() => handleNavClick(spkId)}
                    className="p-2 rounded bg-[#181818] border border-[#282828] font-mono text-xs text-center text-neutral-300 hover:border-[#EB0028] hover:text-[#EB0028]"
                  >
                    Speaker 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterNow();
              }}
              className="w-full py-3 mt-2 rounded-xl bg-[#EB0028] hover:bg-[#D40024] text-white font-mono text-xs font-bold tracking-wider uppercase text-center shadow-[0_0_15px_rgba(235,0,40,0.5)]"
            >
              REGISTER NOW →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
