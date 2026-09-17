import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { speakersList } from '../data/speakers';
import { soundFx } from '../utils/audio';

export default function SpeakerCoverflowRing({ 
  activeSpeakerId, 
  onSelectSpeaker, 
  onOpenGuessesArena 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({ 0: false, 1: false, 2: false });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const touchStartXRef = React.useRef(0);
  const touchEndXRef = React.useRef(0);

  // Sync window width for responsive 3D transforms
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync external navigation (e.g. Navbar Speaker 02 clicked)
  useEffect(() => {
    if (activeSpeakerId) {
      const idx = speakersList.findIndex(s => s.id === activeSpeakerId);
      if (idx !== -1 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  }, [activeSpeakerId]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    try { soundFx.playCardHover(); } catch (err) {}
    const newIdx = (currentIndex - 1 + speakersList.length) % speakersList.length;
    setCurrentIndex(newIdx);
    if (onSelectSpeaker) onSelectSpeaker(speakersList[newIdx].id);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    try { soundFx.playCardHover(); } catch (err) {}
    const newIdx = (currentIndex + 1) % speakersList.length;
    setCurrentIndex(newIdx);
    if (onSelectSpeaker) onSelectSpeaker(speakersList[newIdx].id);
  };

  const handleSelectCard = (index, e) => {
    if (e) e.stopPropagation();
    if (index === currentIndex) return;
    try { soundFx.playCardHover(); } catch (err) {}
    setCurrentIndex(index);
    if (onSelectSpeaker) onSelectSpeaker(speakersList[index].id);
  };

  const toggleFlip = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try { soundFx.playEvidenceClick(); } catch (err) {}
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(deltaX) > 45 && touchEndXRef.current !== 0) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <section 
      id="speakers"
      className="relative w-full min-h-screen bg-[#080808] text-white flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden select-none"
    >
      {/* Ambient 3D Solar Ring Glow in Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] sm:h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(255,85,0,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none -z-10" />

      {/* Anchor targets so #speaker-1, #speaker-2, #speaker-3 work smoothly */}
      <div id="speaker-1" className="absolute top-0 opacity-0 pointer-events-none" />
      <div id="speaker-2" className="absolute top-0 opacity-0 pointer-events-none" />
      <div id="speaker-3" className="absolute top-0 opacity-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-10">
        
        {/* ================= SECTION HEADER & COVERFLOW CONTROLS ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#FF5500]/40 bg-[#141414] text-[11px] font-mono tracking-widest uppercase text-[#FF5500] font-bold shadow-[0_0_15px_rgba(255,85,0,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>3D COVERFLOW DOSSIER RING</span>
              </span>
              <span className="font-mono text-xs text-neutral-400">
                ACTIVE: 0{currentIndex + 1} OF 0{speakersList.length}
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
              CONFIDENTIAL <span className="bg-gradient-to-r from-white via-[#FFAA00] to-[#FF5500] bg-clip-text text-transparent">SPEAKERS</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-neutral-300 max-w-2xl">
              Use the arrow buttons or click side cards to navigate the 3D ring. Tap the card or button to flip for confidential clues!
            </p>
          </div>

          {/* Quick Speaker Selector Pill Bar */}
          <div className="flex items-center gap-2 bg-[#111111] border border-[#262626] p-1.5 rounded-2xl shadow-lg self-start md:self-auto">
            {speakersList.map((spk, idx) => (
              <button
                key={spk.id}
                onClick={(e) => handleSelectCard(idx, e)}
                className={`px-3.5 sm:px-5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.5)] scale-105'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1C1C1C]'
                }`}
              >
                <span>0{spk.num}</span>
                <span className="hidden sm:inline text-[10px] opacity-90">
                  {idx === 0 ? 'TECH' : idx === 1 ? 'VENTURE' : 'AI'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= 3D COVERFLOW RING STAGE ================= */}
        <div className="relative w-full py-4 flex flex-col items-center justify-center">
          
          {/* Navigation Controls: Left & Right Glass Orb Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Speaker"
            className="absolute left-1 sm:left-4 z-50 p-3.5 sm:p-4 rounded-full bg-[#141414] hover:bg-[#202020] border-2 border-[#FF5500]/60 hover:border-[#FF5500] text-white hover:text-[#FFAA00] hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform text-[#FF5500]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Speaker"
            className="absolute right-1 sm:right-4 z-50 p-3.5 sm:p-4 rounded-full bg-[#141414] hover:bg-[#202020] border-2 border-[#FF5500]/60 hover:border-[#FF5500] text-white hover:text-[#FFAA00] hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-[#FF5500]" />
          </button>

          {/* 3D Ring Stage with Perspective */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-5xl h-[520px] sm:h-[570px] flex items-center justify-center overflow-visible"
            style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
          >
            {/* 3D Cylindrical Ring Base Platform (Dial Ring) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[340px] sm:w-[580px] h-[90px] pointer-events-none -z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#FF5500_0%,_transparent_72%)] opacity-35 blur-xl" />
              <div 
                style={{ 
                  transform: `rotateX(60deg) rotateZ(${-currentIndex * 120}deg)`,
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                className="w-full h-full rounded-full border-2 border-[#FF5500]/40 border-dashed flex items-center justify-center"
              >
                <div className="w-[85%] h-[85%] rounded-full border border-white/20" />
                <div className="absolute w-3 h-3 rounded-full bg-[#FF5500] shadow-[0_0_10px_#FF5500] -top-1.5" />
              </div>
            </div>

            {/* Render the 3 Coverflow Ring Cards */}
            {speakersList.map((speaker, index) => {
              // Calculate circular offset in the 3-item ring (-1, 0, 1)
              let offset = index - currentIndex;
              if (offset < -1) offset += speakersList.length;
              if (offset > 1) offset -= speakersList.length;

              const isCenter = offset === 0;
              const isFlipped = !!flippedCards[index];

              // Responsive 3D transforms for Coverflow Ring
              const isMobile = windowWidth < 640;
              const isSmallMobile = windowWidth < 400;
              const sideDistance = isSmallMobile ? 120 : isMobile ? 160 : 280;
              const sideScale = isMobile ? 0.76 : 0.82;
              const centerScale = isSmallMobile ? 0.94 : 1.0;

              let rotateY = 0;
              let translateX = 0;
              let translateZ = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (offset === -1) {
                rotateY = isMobile ? 28 : 35;
                translateX = -sideDistance;
                translateZ = isMobile ? -90 : -130;
                scale = sideScale;
                opacity = isMobile ? 0.55 : 0.7;
                zIndex = 10;
              } else if (offset === 1) {
                rotateY = isMobile ? -28 : -35;
                translateX = sideDistance;
                translateZ = isMobile ? -90 : -130;
                scale = sideScale;
                opacity = isMobile ? 0.55 : 0.7;
                zIndex = 10;
              } else if (offset === 0) {
                rotateY = 0;
                translateX = 0;
                translateZ = isMobile ? 20 : 40;
                scale = centerScale;
                opacity = 1;
                zIndex = 40;
              }

              return (
                <div
                  key={speaker.id}
                  onClick={(e) => {
                    if (!isCenter) {
                      handleSelectCard(index, e);
                    }
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease-out'
                  }}
                  className={`absolute w-[275px] xs:w-[290px] sm:w-[350px] aspect-[1/1.42] select-none ${
                    !isCenter ? 'cursor-pointer hover:opacity-95 hover:scale-[0.85] transition-transform' : ''
                  }`}
                >
                  {/* Card Container with Outer Glow */}
                  <div className={`relative w-full h-full rounded-3xl p-3.5 sm:p-4 transition-all duration-300 ${
                    isCenter 
                      ? 'border-2 border-[#FF5500] shadow-[0_20px_60px_rgba(255,85,0,0.4),_0_0_35px_rgba(255,85,0,0.3)] bg-gradient-to-br from-[#290E00] via-[#471A00] to-[#120500]' 
                      : 'border border-[#333333] bg-[#141414] shadow-2xl filter brightness-75 hover:brightness-100'
                  }`}>
                    
                    {/* Top Status Bar on Card */}
                    <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-white/10 font-mono text-[10px]">
                      <span className="text-neutral-300 font-bold tracking-wider">
                        CASE #{speaker.num} • {speaker.roleTag.split('//')[1]?.trim() || 'TITAN'}
                      </span>
                      {isCenter ? (
                        <button 
                          type="button"
                          onClick={(e) => toggleFlip(index, e)}
                          className="font-bold uppercase tracking-wider text-[#FFAA00] hover:text-white flex items-center gap-1 cursor-pointer transition-colors z-50 pointer-events-auto"
                        >
                          <RotateCw className="w-3 h-3 text-[#FF5500]" />
                          <span>{isFlipped ? 'SHOW FRONT' : 'FLIP CLUES'}</span>
                        </button>
                      ) : (
                        <span className="text-[#FFAA00] font-mono text-[9px] uppercase font-bold">CLICK TO SELECT</span>
                      )}
                    </div>

                    {/* 3D FLIPPER CONTAINER */}
                    <div 
                      className="relative w-full h-[88%] select-none cursor-pointer"
                      style={{ perspective: 1200 }}
                      onClick={(e) => {
                        if (isCenter) {
                          toggleFlip(index, e);
                        }
                      }}
                      title={isCenter ? (isFlipped ? 'Click to show front' : 'Click to show secret clues') : 'Click to bring to center'}
                    >
                      {/* THE 3D ROTATING INNER CONTAINER */}
                      <div
                        style={{
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                        }}
                        className="w-full h-full relative"
                      >
                        {/* ================= FRONT FACE: MYSTERY POSTER ================= */}
                        <div
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(0deg)',
                            zIndex: isFlipped ? 0 : 20,
                            pointerEvents: isFlipped ? 'none' : 'auto'
                          }}
                          className="absolute inset-0 w-full h-full rounded-[22px] bg-white text-black p-4 sm:p-5 overflow-hidden flex flex-col justify-between shadow-2xl border border-neutral-200"
                        >
                          {/* 3D Gold Question Mark */}
                          <div className="absolute -top-2 -right-1 z-30 w-12 h-16 pointer-events-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]">
                            <svg viewBox="0 0 100 120" className="w-full h-full transform rotate-12">
                              <defs>
                                <linearGradient id={`ringGoldGrad-${speaker.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFF3C4" />
                                  <stop offset="30%" stopColor="#FFAA00" />
                                  <stop offset="70%" stopColor="#FF5500" />
                                  <stop offset="100%" stopColor="#8A2E00" />
                                </linearGradient>
                              </defs>
                              <path 
                                d="M48 20 C32 20 22 28 22 42 C22 48 26 53 32 53 C37 53 41 49 41 44 C41 37 46 32 53 32 C60 32 66 36 66 43 C66 49 61 54 53 60 C44 68 39 76 39 88 L40 92 L58 92 L58 87 C58 79 64 73 72 66 C80 59 86 51 86 39 C86 26 71 20 48 20 Z M49 100 C43 100 38 105 38 111 C38 117 43 122 49 122 C55 122 60 117 60 111 C60 105 55 100 49 100 Z"
                                fill={`url(#ringGoldGrad-${speaker.num})`}
                                stroke="#78350F"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>

                          {/* Card Header: "GueSS WHO IS COMING" */}
                          <div className="relative z-20 flex flex-col items-center text-center">
                            <div className="flex items-baseline justify-center tracking-tight leading-none font-display">
                              <span className="text-2xl sm:text-4xl font-black text-black">Gue</span>
                              <span className="text-3xl sm:text-5xl font-black text-[#FF5500] transform -translate-y-0.5">SS</span>
                              <span className="text-2xl sm:text-4xl font-black text-black">?</span>
                            </div>
                            <div className="font-display font-black text-[9px] sm:text-xs uppercase tracking-wider text-black mt-0.5">
                              WHO IS COMING
                            </div>
                          </div>

                          {/* Doodle: Handwritten Hint */}
                          <div className="absolute top-[38%] left-3 z-30 flex flex-col items-start pointer-events-none">
                            <span className="font-display font-black text-[9px] text-black tracking-tight leading-none">
                              Hint:
                            </span>
                            <span className="font-handwritten text-xs sm:text-base font-bold text-black transform -rotate-12 leading-tight tracking-wide border-b border-black/40 pb-0.5">
                              {speaker.posterHint || 'SPECIAL GUEST'}
                            </span>
                          </div>

                          {/* Center Silhouette with Orange Halo */}
                          <div className="relative w-full h-[62%] flex items-end justify-center z-10 -mb-2 overflow-visible">
                            <div className="absolute bottom-2 w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-[#FF5500]/80 blur-xl -z-10" />
                            <img 
                              src={speaker.silhouetteImg} 
                              alt="Mystery Silhouette"
                              className="w-full h-full max-h-[220px] object-contain object-bottom mix-blend-multiply filter contrast-125 pointer-events-none"
                            />
                          </div>

                          {/* Bottom Flip Button Floating Badge on Card */}
                          {isCenter && (
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40">
                              <button
                                type="button"
                                onClick={(e) => toggleFlip(index, e)}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/95 hover:bg-black text-white font-mono text-[10px] font-black tracking-wider shadow-2xl border-2 border-[#FF5500] animate-bounce cursor-pointer hover:scale-105 active:scale-95 transition-transform pointer-events-auto"
                              >
                                <RotateCw className="w-3 h-3 text-[#FFAA00]" />
                                <span>TAP TO FLIP</span>
                              </button>
                            </div>
                          )}

                          {/* Bottom Banner */}
                          <div className="relative z-20 -mx-4 -mb-4 bg-gradient-to-r from-[#993300] via-[#FF5500] to-[#993300] py-1.5 px-3 border-t-2 border-white shadow-md flex items-center justify-center text-white">
                            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                              ★ KEYNOTE #{speaker.num} • CLICK FOR CLUES ★
                            </span>
                          </div>
                        </div>

                        {/* ================= BACK FACE: SECRET CLUES DOSSIER ================= */}
                        <div
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            zIndex: isFlipped ? 20 : 0,
                            pointerEvents: isFlipped ? 'auto' : 'none'
                          }}
                          className="absolute inset-0 w-full h-full rounded-[22px] bg-[#0E0E0E] text-white p-4 sm:p-5 overflow-hidden flex flex-col justify-between border-2 border-[#FF5500] shadow-2xl"
                        >
                          {/* Dossier Header */}
                          <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                            <div className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-[#FF5500]" />
                              <span className="font-mono text-[11px] font-black text-[#FFAA00] uppercase tracking-wider">
                                DOSSIER #{speaker.num}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#FF5500] font-mono text-[8px] font-bold uppercase">
                              TOP SECRET
                            </span>
                          </div>

                          {/* Short Clue Quote */}
                          <div className="p-2 rounded-xl bg-[#161616] border border-[#262626] text-[11px] font-sans text-neutral-200 italic leading-snug">
                            "{speaker.shortClue}"
                          </div>

                          {/* Clue Items List */}
                          <div className="space-y-1.5 overflow-y-auto max-h-[170px] scrollbar-none pr-1">
                            {speaker.hints.slice(0, 3).map((hint, idx) => (
                              <div 
                                key={idx}
                                className="p-2 bg-[#141414] hover:bg-[#1A1A1A] border border-[#242424] rounded-lg flex items-start gap-2 shadow-xs"
                              >
                                <span className="text-sm shrink-0 mt-0.5">{hint.icon}</span>
                                <div>
                                  <div className="font-mono text-[10px] font-bold text-white tracking-wide">
                                    {hint.title}
                                  </div>
                                  <div className="font-sans text-[9px] text-neutral-300 leading-tight">
                                    {hint.detail}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Flip back button */}
                          <div className="pt-2 border-t border-[#222222] flex items-center justify-between">
                            <span className="font-mono text-[8px] text-neutral-400 uppercase">
                              CLICK TO RETURN FRONT
                            </span>
                            <button 
                              type="button"
                              onClick={(e) => toggleFlip(index, e)}
                              className="px-2.5 py-1 rounded-full bg-[#FF5500] hover:bg-[#FF6A00] text-white font-mono text-[9px] font-bold flex items-center gap-1 shadow cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
                            >
                              <RotateCw className="w-2.5 h-2.5" />
                              <span>Flip Front</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Ring Pagination Dots & Controls */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="flex items-center gap-3">
              {speakersList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleSelectCard(idx, e)}
                  aria-label={`Go to Speaker ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 h-2 bg-[#FF5500] shadow-[0_0_10px_#FF5500]'
                      : 'w-2 h-2 bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FFAA00]" />
                <span>USE ARROWS OR CLICK SIDE CARDS TO ROTATE</span>
              </span>
              <span className="hidden sm:inline text-neutral-600">•</span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <RotateCw className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>TAP CENTER CARD TO FLIP CLUES</span>
              </span>
            </div>

            {/* Quick CTA to Guess Section */}
            <div className="pt-2">
              <button
                onClick={() => {
                  try { soundFx.playEvidenceClick(); } catch (err) {}
                  if (onOpenGuessesArena) onOpenGuessesArena();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#161616] hover:bg-[#202020] border border-[#FF5500]/50 hover:border-[#FF5500] text-[#FFAA00] hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,85,0,0.2)] hover:scale-105 cursor-pointer"
              >
                <span>HAVE A GUESS? ENTER PREDICTION CHALLENGE →</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
