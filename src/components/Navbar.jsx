import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ 
  activeSection, 
  onNavigate, 
  isAudioActive, 
  onToggleAudio, 
  onRegisterNow,
  onReplayIntro
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
        ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' 
        : 'bg-[#080808]/80 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo / Left */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        >
          <img 
            src="/devkraft-logo.png" 
            alt="Devkraft Logo" 
            className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xs sm:text-sm tracking-widest text-[#f4f0e8] group-hover:text-[#ff5a1f] transition-colors leading-tight">
              DEVTALKS '26
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#817b73] uppercase font-semibold">
              BY DEVKRAFT
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links: HOME, About, guesses */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-mono text-xs tracking-widest transition-all duration-200 relative py-1 focus:outline-none capitalize cursor-pointer ${
                item.id === 'hero' ? 'uppercase' : ''
              } ${
                activeSection === item.id 
                  ? 'text-[#ff5a1f] font-bold' 
                  : 'text-[#817b73] hover:text-[#f4f0e8]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ff5a1f] animate-fade-in" />
              )}
            </button>
          ))}

          {/* Quick Speaker Selector Pills */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
            <span className="font-mono text-[10px] text-[#817b73] uppercase mr-1 font-semibold">SPEAKERS:</span>
            {['speaker-1', 'speaker-2', 'speaker-3'].map((spkId, idx) => (
              <button
                key={spkId}
                onClick={() => handleNavClick(spkId)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                  activeSection === spkId 
                    ? 'bg-[#ff5a1f] text-[#080808] font-bold' 
                    : 'bg-[#111111] hover:bg-[#181818] text-[#817b73] hover:text-[#f4f0e8] border border-white/10'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </nav>

        {/* Right Controls: REGISTER NOW CTA button */}
        <div className="flex items-center gap-3">
          
          {/* REGISTER NOW -> CTA button */}
          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegisterNow();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#ff5a1f] bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_2px_12px_rgba(255,90,31,0.25)]"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f4f0e8] border border-white/10 rounded-lg bg-[#111111] hover:bg-[#181818] transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-white/10 px-5 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-mono text-sm tracking-wider py-1 cursor-pointer ${
                  activeSection === item.id ? 'text-[#ff5a1f] font-bold' : 'text-[#817b73] hover:text-[#f4f0e8]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-white/10">
              <span className="font-mono text-[10px] text-[#817b73] font-semibold block mb-2 uppercase">SPEAKERS DOSSIER:</span>
              <div className="grid grid-cols-3 gap-2">
                {['speaker-1', 'speaker-2', 'speaker-3'].map((spkId, idx) => (
                  <button
                    key={spkId}
                    onClick={() => handleNavClick(spkId)}
                    className="p-2 rounded-lg bg-[#080808] border border-white/10 font-mono text-xs text-center text-[#817b73] hover:border-[#ff5a1f] hover:text-[#ff5a1f] cursor-pointer transition-colors"
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
              className="w-full py-3 mt-2 rounded-xl bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-mono text-xs font-bold tracking-wider uppercase text-center cursor-pointer shadow-md"
            >
              REGISTER NOW →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
