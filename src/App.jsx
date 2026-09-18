import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ThreeAtmosphere from './components/ThreeAtmosphere';
import Navbar from './components/Navbar';
import HeroMystery from './components/HeroMystery';
import SpeakerCoverflowRing from './components/SpeakerCoverflowRing';
import AboutSection from './components/AboutSection';
import GuessesArena from './components/GuessesArena';
import FooterSection from './components/FooterSection';
import RegisterModal from './components/RegisterModal';
import IntroVideoOverlay from './components/IntroVideoOverlay';

import { speakersList, eventMetadata } from './data/speakers';
import { soundFx } from './utils/audio';

export default function App() {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState('speaker-1');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Lock body scroll and pause Lenis while intro video is playing
  useEffect(() => {
    if (showIntroVideo) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenisRef.current?.start();
    };
  }, [showIntroVideo]);

  // Smooth Navigation Handler with Lenis integration
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (['speaker-1', 'speaker-2', 'speaker-3'].includes(sectionId)) {
      setSelectedSpeakerId(sectionId);
      const spkSection = document.getElementById('speakers') || document.getElementById(sectionId);
      if (spkSection) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(spkSection, { offset: 0, duration: 1.2 });
        } else {
          spkSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleToggleAudio = () => {
    const newState = soundFx.toggleAmbient();
    setIsAudioActive(newState);
  };

  // Intersection Observer to highlight current active navbar item during scroll
  useEffect(() => {
    const sections = ['hero', 'speakers', 'about', 'guesses'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'speakers') {
            setActiveSection(selectedSpeakerId || 'speaker-1');
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedSpeakerId]);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f4f0e8] antialiased overflow-x-hidden selection:bg-[#ff5a1f] selection:text-[#080808] font-sans">
      
      {/* ================= 0. CINEMATIC VIDEO INTRO ON FIRST LINK CLICK ================= */}
      {showIntroVideo && (
        <IntroVideoOverlay
          onComplete={() => {
            setShowIntroVideo(false);
            soundFx.stopCinematicTheme();
            setIsAudioActive(false);
          }}
        />
      )}

      {/* 3D Three.js Interactive Particle Dust / Volumetric Light Atmosphere */}
      <ThreeAtmosphere />

      {/* Top Sticky Navigation Bar (HOME, About, guesses) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onRegisterNow={() => setIsRegisterOpen(true)}
        onReplayIntro={() => setShowIntroVideo(true)}
      />

      <main className="relative z-10 w-full">
        
        {/* ================= 1. LANDING HERO (REPLICATING IMAGE 1 DESIGN) ================= */}
        <HeroMystery
          onTakeGuess={() => handleNavigate('guesses')}
          onExploreSpeakers={(speakerId) => handleNavigate(speakerId || 'speaker-1')}
          onRegister={() => setIsRegisterOpen(true)}
          onWatchTeaser={() => setShowIntroVideo(true)}
        />

        {/* ================= 2. 3D COVERFLOW RING CAROUSEL ================= */}
        <SpeakerCoverflowRing
          activeSpeakerId={selectedSpeakerId}
          onSelectSpeaker={(spkId) => {
            setSelectedSpeakerId(spkId);
            setActiveSection(spkId);
          }}
          onOpenGuessesArena={() => handleNavigate('guesses')}
        />

        {/* ================= 3. ABOUT DEVTALKS '26 SECTION ================= */}
        <AboutSection 
          onRegisterNow={() => setIsRegisterOpen(true)}
        />

        {/* ================= 4. GUESSES ARENA ================= */}
        <GuessesArena
          onJumpToSpeaker={(speakerId) => handleNavigate(speakerId)}
        />

      </main>

      {/* ================= PINTEREST-INSPIRED DEVTALKS '26 FOOTER ================= */}
      <FooterSection 
        onNavigate={handleNavigate}
        onRegisterNow={() => setIsRegisterOpen(true)}
        onReplayIntro={() => setShowIntroVideo(true)}
      />

      {/* Free Conference Pass Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

    </div>
  );
}
