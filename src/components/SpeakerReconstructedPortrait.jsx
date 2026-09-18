import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCw } from 'lucide-react';

/**
 * SpeakerReconstructedPortrait
 * 
 * Ultra-smooth mobile-optimized circular digital reconstructed speaker portrait.
 * Features:
 * - Pure hardware-accelerated CSS rendering (no heavy SVG feGaussianBlur filters)
 * - Circular portrait interacting with boundary
 * - Irregular fragmented/glitch slice portions around edges
 * - Connected orbital ring architecture with clean SVG strokes
 * - Laser scanline sweep on active card transition
 * - Mosaic/pixel matrix perimeter keeping center face recognizable
 * - Micro-particles with low GPU footprint
 */
export default function SpeakerReconstructedPortrait({
  speaker,
  isActive = false,
  isRevealed = false,
  offset = 0,
  onToggleReveal
}) {
  const [scanCycle, setScanCycle] = useState(0);

  // Trigger scanline sweep when this card becomes active
  useEffect(() => {
    if (isActive) {
      setScanCycle((c) => c + 1);
    }
  }, [isActive, isRevealed]);

  // Image source resolution: use the original silhouette image for mystery reconstructed state, and revealed photo upon reveal
  const imageSrc = isRevealed ? (speaker.revealed?.photo || speaker.silhouetteImg) : speaker.silhouetteImg;

  const isLeft = offset < 0;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-visible pointer-events-none">
      
      {/* ========================================================================= */}
      {/* 1. CONNECTED 3D ORBITAL RING SYSTEM (Passes Around & Intersects Portrait)  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-20">
        
        {/* Ambient Orange Volumetric Glow behind active portrait */}
        <div 
          className={`absolute rounded-full transition-opacity duration-500 pointer-events-none -z-10 ${
            isActive 
              ? 'w-60 sm:w-72 h-60 sm:h-72 bg-[#ff5a1f]/20 blur-xl opacity-100'
              : 'w-40 sm:w-48 h-40 sm:h-48 bg-[#ff5a1f]/10 blur-lg opacity-30'
          }`}
        />

        {/* Lightweight SVG Orbital Ring Architecture */}
        <svg 
          viewBox="0 0 380 380" 
          className="w-[285px] xs:w-[310px] sm:w-[370px] h-[285px] xs:w-[310px] sm:h-[370px] overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id={`orbitGrad-${speaker.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ff8a3d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id={`laserGrad-${speaker.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#ff5a1f" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ff8a3d" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ff5a1f" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* ARC 1: Outer Fine Dashed Orbit */}
          <g 
            className={isActive ? 'animate-[spin_40s_linear_infinite]' : 'opacity-40'} 
            style={{ transformOrigin: '190px 190px', willChange: 'transform' }}
          >
            <circle
              cx="190"
              cy="190"
              r="174"
              fill="none"
              stroke="#ff5a1f"
              strokeOpacity={isActive ? "0.35" : "0.15"}
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {/* Markers on outer orbit */}
            <circle cx="190" cy="16" r="2.5" fill="#ff5a1f" />
            <circle cx="364" cy="190" r="2" fill="#ff8a3d" />
            <circle cx="190" cy="364" r="2.5" fill="#ff5a1f" />
            <circle cx="16" cy="190" r="2" fill="#ff8a3d" />
          </g>

          {/* ARC 2: Segmented Broken Circular Arcs */}
          <g 
            className={isActive ? 'animate-[spin_28s_linear_infinite_reverse]' : 'opacity-50'} 
            style={{ transformOrigin: '190px 190px', willChange: 'transform' }}
          >
            <circle
              cx="190"
              cy="190"
              r="158"
              fill="none"
              stroke="#ff5a1f"
              strokeOpacity={isActive ? "0.65" : "0.3"}
              strokeWidth="1.5"
              strokeDasharray="55 25 12 18 85 30 18 40"
              strokeLinecap="round"
            />
            <polygon points="190,30 193,33 190,36 187,33" fill="#ff5a1f" />
            <polygon points="348,190 351,193 348,196 345,193" fill="#ff8a3d" />
          </g>

          {/* ARC 3: Tilted 3D Elliptical Orbit crossing in front & behind */}
          <g 
            style={{ 
              transformOrigin: '190px 190px', 
              transform: `rotate(${isLeft ? '-28deg' : '28deg'}) scale(1, 0.72)` 
            }}
          >
            <ellipse
              cx="190"
              cy="190"
              rx="182"
              ry="182"
              fill="none"
              stroke={`url(#orbitGrad-${speaker.id})`}
              strokeWidth="1.2"
              strokeDasharray="80 20 40 15 110 30"
              strokeOpacity={isActive ? "0.75" : "0.35"}
            />
            <circle cx="372" cy="190" r="3.5" fill="#ff8a3d" />
          </g>

          {/* ARC 4: Inner Precision Reticle */}
          <g className={isActive ? 'opacity-80' : 'opacity-30'}>
            <circle
              cx="190"
              cy="190"
              r="136"
              fill="none"
              stroke="#ff5a1f"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <line x1="190" y1="46" x2="190" y2="54" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="190" y1="326" x2="190" y2="334" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="46" y1="190" x2="54" y2="190" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="326" y1="190" x2="334" y2="190" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
          </g>

          {/* Technical Micro-Labels */}
          {isActive && (
            <g className="font-mono text-[7px] fill-[#ff8a3d] tracking-widest uppercase opacity-75">
              <text x="190" y="24" textAnchor="middle">
                0{speaker.num} // RECON.SYS • {isRevealed ? 'VERIFIED' : 'SIGNAL LOCKED'}
              </text>
              <text x="355" y="194" textAnchor="start" transform="rotate(90 355 194)">
                FREQ // 1420.4 MHZ
              </text>
              <text x="190" y="374" textAnchor="middle" fill="#817b73">
                LAT 28.614 // ORBIT R-380
              </text>
              <text x="25" y="194" textAnchor="end" transform="rotate(-90 25 194)">
                MATRIX // SYNC OK
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. RECONSTRUCTED SPEAKER PORTRAIT CORE WITH INTERACTIVE BOUNDARY & GLITCH */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
        
        {/* Outer Circular Boundary Container */}
        <div 
          className={`relative rounded-full transition-all duration-500 ease-out flex items-center justify-center ${
            isActive 
              ? 'w-48 xs:w-52 sm:w-60 md:w-64 h-48 xs:h-52 sm:h-60 md:h-64 shadow-[0_0_35px_rgba(255,90,31,0.3)]' 
              : 'w-36 xs:w-40 sm:w-48 h-36 xs:h-40 sm:h-48 shadow-[0_0_15px_rgba(0,0,0,0.8)] opacity-70'
          }`}
        >

          {/* ========================================================================= */}
          {/* LAYER A: IRREGULAR EXTENDING FRAGMENT PIECES                              */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            
            {/* Top-Right Displaced Fragment Block */}
            <div
              className={`absolute -top-2.5 -right-3 w-16 h-10 rounded-lg overflow-hidden border border-[#ff5a1f]/60 shadow-[0_0_10px_rgba(255,90,31,0.3)] z-30 bg-[#080808]/80 transition-all duration-500 ${
                isActive ? 'opacity-75 translate-x-1 -translate-y-1' : 'opacity-35 translate-x-2 -translate-y-1.5'
              }`}
              style={{ clipPath: 'polygon(0 0, 100% 15%, 85% 100%, 10% 85%)' }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain object-bottom -translate-x-28 -translate-y-4 filter contrast-125 saturate-120 pointer-events-none"
              />
              <div className="absolute inset-0 bg-[#ff5a1f]/20 mix-blend-color-dodge" />
            </div>

            {/* Mid-Left Offset Slice */}
            <div
              className={`absolute top-1/3 -left-3.5 w-14 h-14 rounded-md overflow-hidden border-l-2 border-[#ff8a3d]/70 shadow-[0_0_8px_rgba(255,90,31,0.3)] z-30 bg-[#080808]/80 transition-all duration-500 ${
                isActive ? 'opacity-70 -translate-x-1.5' : 'opacity-30 -translate-x-3'
              }`}
              style={{ clipPath: 'polygon(15% 0, 100% 10%, 90% 90%, 0 100%)' }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain object-bottom translate-x-2 -translate-y-16 filter contrast-130 brightness-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-[#ff5a1f]/25 mix-blend-overlay" />
            </div>

            {/* Bottom-Right Digital Glitch Shard */}
            <div
              className={`absolute -bottom-2 -right-1 w-12 h-12 rounded-sm overflow-hidden border-b-2 border-r-2 border-[#ff5a1f]/80 z-30 bg-[#080808]/80 transition-all duration-500 ${
                isActive ? 'opacity-65 translate-x-1 translate-y-1' : 'opacity-25 translate-x-2 translate-y-2'
              }`}
              style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 80%)' }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain object-bottom -translate-x-32 -translate-y-36 filter contrast-140 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff5a1f]/40 to-transparent" />
            </div>

            {/* Floating Orange Embers around portrait */}
            <div className="absolute -top-3 left-1/4 w-2 h-2 rounded-xs bg-[#ff5a1f] shadow-[0_0_6px_#ff5a1f] opacity-80 animate-pulse" />
            <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full bg-[#ff8a3d] shadow-[0_0_5px_#ff8a3d] opacity-80" />
            <div className="absolute -bottom-2.5 left-1/3 w-2 h-2 rotate-45 bg-[#ff5a1f] shadow-[0_0_6px_#ff5a1f] opacity-70" />
            <div className="absolute top-1/4 -left-2.5 w-1.5 h-1.5 rounded-xs bg-[#ffb27a] shadow-[0_0_5px_#ff8a3d] opacity-70" />
          </div>

          {/* ========================================================================= */}
          {/* LAYER B: MAIN CIRCULAR PORTRAIT                                           */}
          {/* ========================================================================= */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#ff5a1f]/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),_0_0_20px_rgba(255,90,31,0.25)] bg-[#0a0a0a] flex items-end justify-center pointer-events-none">
            
            {/* Ambient Silhouette Backlight */}
            <div className="absolute bottom-2 w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-[#ff5a1f]/20 blur-xl pointer-events-none -z-0" />

            {/* Base Image Layer */}
            <img
              src={imageSrc}
              alt={speaker.title}
              className={`w-full h-full transition-all duration-500 ${
                isRevealed 
                  ? 'object-cover object-top contrast-115 brightness-105 saturate-110' 
                  : isActive
                    ? 'object-contain object-bottom contrast-125 brightness-110 saturate-105'
                    : 'object-contain object-bottom contrast-130 brightness-80 saturate-75'
              } pointer-events-none relative z-10`}
            />

            {/* Upper Band Displacement Slice */}
            {!isRevealed && (
              <div
                className="absolute inset-0 pointer-events-none z-20 flex items-end justify-center opacity-70"
                style={{ clipPath: 'polygon(0 14%, 100% 14%, 100% 32%, 0 32%)' }}
              >
                <img
                  src={imageSrc}
                  alt=""
                  className="w-full h-full object-contain object-bottom -translate-x-1 filter contrast-130 brightness-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-[#ff5a1f]/15 mix-blend-screen" />
              </div>
            )}

            {/* Lower Band Displacement Slice */}
            {!isRevealed && (
              <div
                className="absolute inset-0 pointer-events-none z-20 flex items-end justify-center opacity-65"
                style={{ clipPath: 'polygon(0 54%, 100% 54%, 100% 70%, 0 70%)' }}
              >
                <img
                  src={imageSrc}
                  alt=""
                  className="w-full h-full object-contain object-bottom translate-x-1 filter contrast-125 pointer-events-none"
                />
                <div className="absolute inset-0 bg-[#ff5a1f]/15 mix-blend-color-dodge" />
              </div>
            )}

            {/* Digital Pixel Matrix / Mosaic Perimeter Overlay */}
            {!isRevealed && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 45%, transparent 42%, rgba(255,90,31,0.6) 88%), url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='none' stroke='%23ff5a1f' stroke-width='0.75' stroke-opacity='0.4'/%3E%3C/svg%3E")`
                }}
              />
            )}

            {/* Orange Rim Light / Vignette Glow inside circle */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(8,8,8,0.4)_75%,_rgba(255,90,31,0.25)_100%)] pointer-events-none z-20" />

            {/* Laser Scanline Sweep on Active Transition */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  key={`laser-sweep-${scanCycle}`}
                  initial={{ top: '-10%', opacity: 0 }}
                  animate={{ 
                    top: ['-5%', '105%'], 
                    opacity: [0, 1, 1, 0] 
                  }}
                  transition={{ 
                    duration: 0.9, 
                    ease: "easeInOut",
                    times: [0, 0.15, 0.85, 1] 
                  }}
                  className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#ff8a3d] to-transparent shadow-[0_0_12px_#ff5a1f] pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            {/* Corner Focus Reticles */}
            <div className="absolute inset-2 pointer-events-none opacity-60 z-20">
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#ff5a1f]" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#ff5a1f]" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#ff5a1f]" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#ff5a1f]" />
            </div>

          </div>

          {/* ========================================================================= */}
          {/* LAYER D: BOTTOM HUD STATUS BADGE                                          */}
          {/* ========================================================================= */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-40 pointer-events-none whitespace-nowrap">
            {isRevealed ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#080808] border border-[#ff5a1f] text-[#ff8a3d] font-mono text-[9px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(255,90,31,0.4)]">
                <CheckCircle2 className="w-3 h-3 text-[#ff5a1f]" />
                <span>IDENTITY // VERIFIED</span>
              </div>
            ) : isActive ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#080808] border border-[#ff5a1f]/60 text-[#f4f0e8] font-mono text-[9px] font-bold uppercase tracking-wider shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-ping" />
                <span className="text-[#ff5a1f]">SIGNAL</span>
                <span className="text-white/40">|</span>
                <span>RECONSTRUCTING</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#080808]/90 border border-white/10 text-[#817b73] font-mono text-[8px] uppercase tracking-wider">
                <span>ORBIT 0{speaker.num}</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
