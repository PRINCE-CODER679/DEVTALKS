import React, { useState, useEffect } from 'react';
import ThreeAtmosphere from './components/ThreeAtmosphere';
import LandingHero from './components/LandingHero';
import CaseFile from './components/CaseFile';
import FactsSection from './components/FactsSection';
import GuessSection from './components/GuessSection';
import CountdownReveal from './components/CountdownReveal';
import FullscreenMenu from './components/FullscreenMenu';

import { speakerData } from './data/speaker';
import { soundFx } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(speakerData.isRevealed);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    let targetId = sectionId;
    if (sectionId === 'clues' || sectionId === 'facts') {
      targetId = 'fact-1';
    } else if (sectionId === 'countdown') {
      targetId = 'reveal';
    }

    const element = document.getElementById(targetId) || document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    const newState = soundFx.toggleAmbient();
    setIsAudioActive(newState);
  };

  // Keyboard shortcut Ctrl+Shift+O to toggle reveal state in preview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'O') {
        setIsRevealed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070707] text-white antialiased overflow-x-hidden selection:bg-brand-red selection:text-white">
      
      {/* 3D Three.js Interactive Volumetric Particle Atmosphere */}
      <ThreeAtmosphere />

      {/* Fullscreen Mobile Drawer Menu */}
      <FullscreenMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
      />

      <main className="relative z-10 w-full">
        
        {/* SLIDE 01: LANDING / MYSTERY (Page 2) */}
        <LandingHero
          onBeginInvestigation={() => handleNavigate('casefile')}
          onNavigate={handleNavigate}
        />

        {/* SLIDE 02: CASE FILE 001 (Page 3) */}
        <CaseFile
          onExploreClues={() => handleNavigate('fact-1')}
          onNavigate={handleNavigate}
        />

        {/* SLIDES 03..06: SPEAKER FACTS DOSSIER (FACT 01, FACT 02, FACT 03, FACT 04) */}
        <FactsSection
          onNavigateToGuess={() => handleNavigate('guess')}
          onNavigate={handleNavigate}
        />

        {/* SLIDE 07: GUESS THE SPEAKER (Page 8) */}
        <GuessSection
          validKeywords={speakerData.validKeywords}
          onCorrectGuess={() => {}}
          onJumpToReveal={() => handleNavigate('reveal')}
          onNavigate={handleNavigate}
        />

        {/* SLIDE 08 & 09: COUNTDOWN & REVEAL SECTION (Pages 9 & 10) */}
        <CountdownReveal
          targetDate={speakerData.revealCountdownTarget}
          speaker={speakerData}
          isRevealed={isRevealed}
          onToggleRevealed={() => setIsRevealed(!isRevealed)}
          onOpenMenu={() => setIsMobileMenuOpen(true)}
          onNavigate={handleNavigate}
        />

      </main>

    </div>
  );
}
