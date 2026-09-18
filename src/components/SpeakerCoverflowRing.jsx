import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Sparkles, 
  FileText, 
  Compass,
  Eye,
  Lock
} from 'lucide-react';
import { speakersList } from '../data/speakers';
import { soundFx } from '../utils/audio';
import SpeakerReconstructedPortrait from './SpeakerReconstructedPortrait';

export default function SpeakerCoverflowRing({ 
  activeSpeakerId, 
  onSelectSpeaker, 
  onOpenGuessesArena 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({ 0: false, 1: false, 2: false });
  const [revealedSpeakers, setRevealedSpeakers] = useState({ 0: false, 1: false, 2: false });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isSwipingRef = useRef(false);

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

  const toggleReveal = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try { soundFx.playRevealUnlocked(); } catch (err) {}
    setRevealedSpeakers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Touch Swipe & Tap Handlers for mobile & desktop
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isSwipingRef.current = false;
  };

  const handleTouchMove = (e) => {
    const deltaX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartYRef.current);
    if (deltaX > 10 || deltaY > 10) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartYRef.current - e.changedTouches[0].clientY);
    
    // Only trigger swipe if horizontal movement is significant and greater than vertical scroll
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchStartYRef.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ' || e.key === 'Enter') {
        toggleFlip(currentIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <section 
      id="speakers"
      className="relative w-full min-h-screen bg-[#080808] text-[#f4f0e8] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden select-none"
    >
      {/* Ambient 3D Ring Glow in Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] sm:h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(255,90,31,0.08)_0%,_transparent_70%)] blur-[120px] pointer-events-none -z-10" />

      {/* Anchor targets so #speaker-1, #speaker-2, #speaker-3 work smoothly */}
      <div id="speaker-1" className="absolute top-0 opacity-0 pointer-events-none" />
      <div id="speaker-2" className="absolute top-0 opacity-0 pointer-events-none" />
      <div id="speaker-3" className="absolute top-0 opacity-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-10">
        
        {/* ================= SECTION HEADER & COVERFLOW CONTROLS ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#ff5a1f]/40 bg-[#111111] text-[11px] font-mono tracking-widest uppercase text-[#ff5a1f] font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>3D COVERFLOW RECONSTRUCTION RING</span>
              </span>
              <span className="font-mono text-xs text-[#817b73] font-semibold">
                ACTIVE: 0{currentIndex + 1} OF 0{speakersList.length}
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#f4f0e8]">
              CONFIDENTIAL <span className="text-[#ff5a1f]">SPEAKERS</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#817b73] max-w-2xl font-medium">
              Digital signals reconstructed in real time. <span className="text-[#f4f0e8] font-semibold">Tap anywhere on the center card to flip for confidential clues</span>, or use arrows to rotate the ring.
            </p>
          </div>

          {/* Quick Speaker Selector Pill Bar */}
          <div className="flex items-center gap-2 bg-[#111111] border border-white/10 p-1.5 rounded-2xl shadow-xs self-start md:self-auto">
            {speakersList.map((spk, idx) => (
              <button
                key={spk.id}
                onClick={(e) => handleSelectCard(idx, e)}
                className={`px-3.5 sm:px-5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#ff5a1f] text-[#080808] scale-105 shadow-sm'
                    : 'text-[#817b73] hover:text-[#f4f0e8] hover:bg-[#181818]'
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
            className="absolute left-1 sm:left-4 z-50 p-3.5 sm:p-4 rounded-full bg-[#111111] hover:bg-[#181818] border-2 border-[#ff5a1f]/40 hover:border-[#ff5a1f] text-[#ff5a1f] hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform text-[#ff5a1f]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Speaker"
            className="absolute right-1 sm:right-4 z-50 p-3.5 sm:p-4 rounded-full bg-[#111111] hover:bg-[#181818] border-2 border-[#ff5a1f]/40 hover:border-[#ff5a1f] text-[#ff5a1f] hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-[#ff5a1f]" />
          </button>

          {/* 3D Ring Stage with Perspective */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-5xl h-[530px] sm:h-[600px] flex items-center justify-center overflow-visible"
            style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
          >
            {/* 3D Cylindrical Ring Base Platform */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[360px] sm:w-[620px] h-[100px] pointer-events-none -z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ff5a1f_0%,_transparent_72%)] opacity-20 blur-xl" />
              <div 
                style={{ 
                  transform: `rotateX(60deg) rotateZ(${-currentIndex * 120}deg)`,
                  transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="w-full h-full rounded-full border-2 border-[#ff5a1f]/40 border-dashed flex items-center justify-center"
              >
                <div className="w-[88%] h-[88%] rounded-full border border-white/15 border-dotted" />
                <div className="w-[72%] h-[72%] rounded-full border border-[#ff5a1f]/20" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#ff5a1f] -top-1.5 shadow-[0_0_10px_#ff5a1f]" />
                <div className="absolute w-2 h-2 rounded-full bg-[#ff8a3d] -bottom-1 shadow-[0_0_6px_#ff8a3d]" />
              </div>
            </div>

            {/* Render the 3 Coverflow Ring Cards */}
            {speakersList.map((speaker, index) => {
              let offset = index - currentIndex;
              if (offset < -1) offset += speakersList.length;
              if (offset > 1) offset -= speakersList.length;

              const isCenter = offset === 0;
              const isFlipped = !!flippedCards[index];
              const isRevealed = !!revealedSpeakers[index];

              const isMobile = windowWidth < 640;
              const isSmallMobile = windowWidth < 400;
              const sideDistance = isSmallMobile ? 125 : isMobile ? 165 : 290;
              const sideScale = isMobile ? 0.76 : 0.82;
              const centerScale = isSmallMobile ? 0.94 : 1.0;

              let rotateY = 0;
              let translateX = 0;
              let translateZ = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (offset === -1) {
                rotateY = isMobile ? 26 : 32;
                translateX = -sideDistance;
                translateZ = isMobile ? -90 : -130;
                scale = sideScale;
                opacity = isMobile ? 0.55 : 0.72;
                zIndex = 10;
              } else if (offset === 1) {
                rotateY = isMobile ? -26 : -32;
                translateX = sideDistance;
                translateZ = isMobile ? -90 : -130;
                scale = sideScale;
                opacity = isMobile ? 0.55 : 0.72;
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
                    } else {
                      toggleFlip(index, e);
                    }
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
                    willChange: 'transform, opacity'
                  }}
                  className={`absolute w-[285px] xs:w-[310px] sm:w-[360px] aspect-[1/1.44] select-none cursor-pointer ${
                    !isCenter ? 'hover:opacity-95 hover:scale-[0.85] transition-transform' : ''
                  }`}
                  title={isCenter ? (isFlipped ? 'Click card to flip front' : 'Click card to flip for secret clues') : 'Click to bring to center'}
                >
                  {/* Card Container */}
                  <div className={`relative w-full h-full rounded-3xl p-3.5 sm:p-4 transition-all duration-500 overflow-visible ${
                    isCenter 
                      ? 'border-2 border-[#ff5a1f] shadow-[0_20px_60px_rgba(255,90,31,0.22)] bg-[#101010]' 
                      : 'border border-white/10 bg-[#101010]/95 shadow-lg filter brightness-90 hover:brightness-100'
                  }`}>
                    
                    {/* Top Status Bar on Card */}
                    <div className="w-full flex items-center justify-between pb-2 mb-1.5 border-b border-white/10 font-mono text-[10px] relative z-30">
                      <span className="text-[#f4f0e8] font-bold tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5a1f]" />
                        <span>CASE #{speaker.num} • {speaker.roleTag.split('//')[1]?.trim() || 'TITAN'}</span>
                      </span>
                      {isCenter ? (
                        <div className="flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={(e) => toggleReveal(index, e)}
                            className="font-bold uppercase tracking-wider text-[#ff8a3d] hover:text-[#f4f0e8] flex items-center gap-1 cursor-pointer transition-colors z-50 pointer-events-auto text-[9px]"
                            title={isRevealed ? 'Hide identity' : 'Instant identity reveal'}
                          >
                            {isRevealed ? <Lock className="w-2.5 h-2.5 text-[#ff5a1f]" /> : <Eye className="w-2.5 h-2.5 text-[#ff5a1f]" />}
                            <span>{isRevealed ? 'MASK' : 'REVEAL'}</span>
                          </button>
                          <span className="text-white/20">|</span>
                          <button 
                            type="button"
                            onClick={(e) => toggleFlip(index, e)}
                            className="font-bold uppercase tracking-wider text-[#ff5a1f] hover:text-[#ff7a45] flex items-center gap-1 cursor-pointer transition-colors z-50 pointer-events-auto text-[9px]"
                          >
                            <RotateCw className="w-2.5 h-2.5 text-[#ff5a1f]" />
                            <span>{isFlipped ? 'FRONT' : 'CLUES'}</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[#ff5a1f] font-mono text-[9px] uppercase font-bold">CLICK TO SELECT</span>
                      )}
                    </div>

                    {/* 3D FLIPPER CONTAINER */}
                    <div 
                      className="relative w-full h-[90%] select-none cursor-pointer"
                      style={{ perspective: 1200 }}
                    >
                      {/* THE 3D ROTATING INNER CONTAINER */}
                      <div
                        style={{
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                          willChange: 'transform'
                        }}
                        className="w-full h-full relative"
                      >
                        {/* ================= FRONT FACE: RECONSTRUCTED ORBITAL PORTRAIT ================= */}
                        <div
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(0deg)',
                            zIndex: isFlipped ? 0 : 20,
                            pointerEvents: isFlipped ? 'none' : 'auto'
                          }}
                          className="absolute inset-0 w-full h-full rounded-[22px] bg-[#0c0c0c] text-[#f4f0e8] p-3 sm:p-4 overflow-visible flex flex-col justify-between shadow-lg border border-white/10"
                        >
                          {/* Card Header Tag */}
                          <div className="relative z-30 flex items-center justify-between text-center w-full">
                            <div className="flex flex-col items-start">
                              <span className="font-mono text-[9px] font-black text-[#ff5a1f] tracking-widest uppercase">
                                SIGNAL RECONSTRUCTION
                              </span>
                              <span className="font-display font-black text-sm sm:text-base text-[#f4f0e8] tracking-wide uppercase">
                                {isRevealed ? speaker.revealed.name : speaker.title}
                              </span>
                            </div>

                            {/* Dossier Code Pill */}
                            <span className="px-2 py-0.5 rounded bg-[#ff5a1f]/15 border border-[#ff5a1f]/40 font-mono text-[8px] font-bold text-[#ff8a3d] uppercase tracking-wider">
                              SEC-0{speaker.num}
                            </span>
                          </div>

                          {/* ========================================================================= */}
                          {/* CENTERPIECE: DIGITALLY RECONSTRUCTED SPEAKER PORTRAIT & ORBITAL RING     */}
                          {/* ========================================================================= */}
                          <div className="relative w-full flex-1 flex items-center justify-center my-1 overflow-visible">
                            <SpeakerReconstructedPortrait
                              speaker={speaker}
                              isActive={isCenter}
                              isRevealed={isRevealed}
                              offset={offset}
                              onToggleReveal={(e) => toggleReveal(index, e)}
                            />
                          </div>

                          {/* Flip Clues Tap Prompt Overlay */}
                          {isCenter && !isFlipped && (
                            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080808]/90 text-[#f4f0e8] font-mono text-[9px] font-bold tracking-wider shadow-lg border border-[#ff5a1f]/70 animate-bounce">
                                <RotateCw className="w-2.5 h-2.5 text-[#ff5a1f]" />
                                <span>TAP CARD TO FLIP FOR CLUES</span>
                              </div>
                            </div>
                          )}

                          {/* Bottom Info Bar / Quick Action */}
                          <div className="relative z-30 flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-mono">
                            {isRevealed ? (
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#ff8a3d] text-[10px] line-clamp-1">
                                  {speaker.revealed.designation}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-[#817b73]">
                                <span className="text-[#ff5a1f] font-bold">Hint:</span>
                                <span className="italic text-[#f4f0e8]">{speaker.posterHint || 'SPECIAL GUEST'}</span>
                              </div>
                            )}

                            {isCenter && (
                              <button
                                type="button"
                                onClick={(e) => toggleFlip(index, e)}
                                className="px-2.5 py-1 rounded-full bg-[#161616] hover:bg-[#ff5a1f] hover:text-[#080808] border border-[#ff5a1f]/40 text-[#ff8a3d] font-mono text-[9px] font-bold tracking-wider transition-all cursor-pointer pointer-events-auto flex items-center gap-1"
                              >
                                <RotateCw className="w-2.5 h-2.5" />
                                <span>CLUES</span>
                              </button>
                            )}
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
                          className="absolute inset-0 w-full h-full rounded-[22px] bg-[#0c0c0c] text-[#f4f0e8] p-4 sm:p-5 overflow-hidden flex flex-col justify-between border-2 border-[#ff5a1f] shadow-xl"
                        >
                          {/* Dossier Header */}
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <div className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-[#ff5a1f]" />
                              <span className="font-mono text-[11px] font-black text-[#ff5a1f] uppercase tracking-wider">
                                DOSSIER #{speaker.num}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 text-[#ff8a3d] font-mono text-[8px] font-bold uppercase">
                              TOP SECRET
                            </span>
                          </div>

                          {/* Short Clue Quote */}
                          <div className="p-2 rounded-xl bg-[#141414] border border-white/10 text-[11px] font-sans text-[#f4f0e8] italic leading-snug font-medium">
                            "{speaker.shortClue}"
                          </div>

                          {/* Clue Items List */}
                          <div className="space-y-1.5 overflow-y-auto max-h-[170px] scrollbar-none pr-1">
                            {speaker.hints.slice(0, 3).map((hint, idx) => (
                              <div 
                                key={idx}
                                className="p-2 bg-[#141414] hover:bg-[#181818] border border-white/10 rounded-lg flex items-start gap-2 shadow-xs transition-colors"
                              >
                                <span className="text-sm shrink-0 mt-0.5">{hint.icon}</span>
                                <div>
                                  <div className="font-mono text-[10px] font-bold text-[#f4f0e8] tracking-wide">
                                    {hint.title}
                                  </div>
                                  <div className="font-sans text-[9px] text-[#817b73] leading-tight">
                                    {hint.detail}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Flip back button */}
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="font-mono text-[8px] text-[#817b73] uppercase font-semibold">
                              TAP CARD TO RETURN FRONT
                            </span>
                            <button 
                              type="button"
                              onClick={(e) => toggleFlip(index, e)}
                              className="px-2.5 py-1 rounded-full bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-mono text-[9px] font-bold flex items-center gap-1 shadow cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
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
                      ? 'w-8 h-2 bg-[#ff5a1f]'
                      : 'w-2 h-2 bg-white/10 hover:bg-[#817b73]'
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#817b73]">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>USE ARROWS OR CLICK SIDE CARDS TO ROTATE</span>
              </span>
              <span className="hidden sm:inline text-white/10">•</span>
              <span className="flex items-center gap-1.5 text-[#f4f0e8] font-semibold">
                <RotateCw className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>TAP ANY CARD TO FLIP FOR CLUES</span>
              </span>
            </div>

            {/* Quick CTA to Guess Section */}
            <div className="pt-2">
              <button
                onClick={() => {
                  try { soundFx.playEvidenceClick(); } catch (err) {}
                  if (onOpenGuessesArena) onOpenGuessesArena();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#181818] border border-[#ff5a1f]/40 hover:border-[#ff5a1f] text-[#ff8a3d] hover:text-[#f4f0e8] font-mono text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 cursor-pointer shadow-sm"
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
