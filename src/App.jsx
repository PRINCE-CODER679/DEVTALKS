import React, { useState, useEffect } from 'react';
import ThreeAtmosphere from './components/ThreeAtmosphere';
import Navbar from './components/Navbar';
import HeroMystery from './components/HeroMystery';
import SpeakerCardSection from './components/SpeakerCardSection';
import AboutSection from './components/AboutSection';
import GuessesArena from './components/GuessesArena';
import FooterSection from './components/FooterSection';
import RegisterModal from './components/RegisterModal';

import { speakersList, eventMetadata } from './data/speakers';
import { soundFx } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Smooth Navigation Handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleAudio = () => {
    const newState = soundFx.toggleAmbient();
    setIsAudioActive(newState);
  };

  // Intersection Observer to highlight current active navbar item during scroll
  useEffect(() => {
    const sections = ['hero', 'speaker-1', 'speaker-2', 'speaker-3', 'about', 'guesses'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070707] text-white antialiased overflow-x-hidden selection:bg-[#EB0028] selection:text-white font-sans">
      
      {/* 3D Three.js Interactive Particle Dust / Volumetric Light Atmosphere */}
      <ThreeAtmosphere />

      {/* Top Sticky Navigation Bar (HOME, About, guesses) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onRegisterNow={() => setIsRegisterOpen(true)}
      />

      <main className="relative z-10 w-full">
        
        {/* ================= 1. LANDING HERO (REPLICATING IMAGE 1 DESIGN) ================= */}
        <HeroMystery
          onTakeGuess={() => handleNavigate('guesses')}
          onExploreSpeakers={(speakerId) => handleNavigate(speakerId || 'speaker-1')}
          onRegister={() => setIsRegisterOpen(true)}
        />

        {/* ================= 2. SEQUENTIAL SPEAKER SECTIONS ON SCROLL ================= */}
        {speakersList.map((speaker, index) => {
          const nextSpeakerId = index < speakersList.length - 1 ? speakersList[index + 1].id : null;
          return (
            <SpeakerCardSection
              key={speaker.id}
              speaker={speaker}
              index={index}
              totalSpeakers={speakersList.length}
              isLast={index === speakersList.length - 1}
              onNextSpeaker={() => nextSpeakerId && handleNavigate(nextSpeakerId)}
              onOpenGuessesArena={() => handleNavigate('guesses')}
            />
          );
        })}

        {/* ================= 3. ABOUT DEVTALKS '26 SECTION ================= */}
        <AboutSection 
          onRegisterNow={() => setIsRegisterOpen(true)}
        />

        {/* ================= 4. GUESSES HUB & COMMUNITY ARENA ================= */}
        <GuessesArena
          onJumpToSpeaker={(speakerId) => handleNavigate(speakerId)}
        />

      </main>

      {/* ================= PINTEREST-INSPIRED DEVTALKS '26 FOOTER ================= */}
      <FooterSection 
        onNavigate={handleNavigate}
        onRegisterNow={() => setIsRegisterOpen(true)}
      />

      {/* Free Conference Pass Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

    </div>
  );
}
