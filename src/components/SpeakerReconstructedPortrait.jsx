import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ShieldCheck, Crosshair, Zap } from 'lucide-react';

/**
 * SpeakerReconstructedPortrait
 * 
 * Renders the circular digital reconstructed speaker portrait inside the carousel ring.
 * Features:
 * - Circular portrait interacting with boundary
 * - Irregular fragmented/glitch slice portions around edges
 * - Subtle digital displacement & offset ghosting layers
 * - Orbital connected ring system with thin arcs, broken segments, markers & technical labels
 * - Orange laser scanline reconstruction sweep on active transition
 * - Mosaic/pixel matrix perimeter keeping center face recognizable
 * - Tiny floating orange digital particles & amber embers
 * - Seamless convergence animation when becoming the active center speaker
 * - Instant reveal transition to verified identity
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

  // Visual state variables based on position in ring
  const isSide = offset !== 0;
  const isLeft = offset < 0;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-visible">
      
      {/* ========================================================================= */}
      {/* 1. CONNECTED 3D ORBITAL RING SYSTEM (Passes Around & Intersects Portrait)  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-20">
        
        {/* Ambient Orange Volumetric Glow behind active portrait */}
        <div 
          className={`absolute rounded-full transition-all duration-700 pointer-events-none -z-10 ${
            isActive 
              ? 'w-64 sm:w-80 h-64 sm:h-80 bg-[radial-gradient(circle,_rgba(255,90,31,0.25)_0%,_rgba(255,90,31,0.06)_50%,_transparent_75%)] blur-2xl opacity-100'
              : 'w-44 sm:w-56 h-44 sm:h-56 bg-[radial-gradient(circle,_rgba(255,90,31,0.08)_0%,_transparent_70%)] blur-xl opacity-40'
          }`}
        />

        {/* Dynamic SVG Orbital Ring Architecture */}
        <svg 
          viewBox="0 0 380 380" 
          className="w-[290px] xs:w-[320px] sm:w-[380px] h-[290px] xs:w-[320px] sm:h-[380px] overflow-visible"
        >
          <defs>
            {/* Orange Linear and Radial Gradients */}
            <linearGradient id={`orbitGrad-${speaker.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ff8a3d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id={`laserGrad-${speaker.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="#ff5a1f" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ff8a3d" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#ff5a1f" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Matrix Pattern for Mosaic Fragmentation */}
            <pattern id={`matrixGrid-${speaker.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="none" />
              <circle cx="4" cy="4" r="0.9" fill="#ff5a1f" fillOpacity="0.4" />
            </pattern>

            <filter id={`orangeGlow-${speaker.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ARC 1: Outer Fine Dashed Orbit (Clockwise Rotation) */}
          <g className={isActive ? 'animate-[spin_40s_linear_infinite]' : 'opacity-40'} style={{ transformOrigin: '190px 190px' }}>
            <circle
              cx="190"
              cy="190"
              r="174"
              fill="none"
              stroke="#ff5a1f"
              strokeOpacity={isActive ? "0.3" : "0.15"}
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {/* Tiny markers on outer orbit */}
            <circle cx="190" cy="16" r="2.5" fill="#ff5a1f" />
            <circle cx="364" cy="190" r="2" fill="#ff8a3d" />
            <circle cx="190" cy="364" r="2.5" fill="#ff5a1f" />
            <circle cx="16" cy="190" r="2" fill="#ff8a3d" />
          </g>

          {/* ARC 2: Segmented Broken Circular Arcs (Counter-Rotating) */}
          <g className={isActive ? 'animate-[spin_28s_linear_infinite_reverse]' : 'opacity-50'} style={{ transformOrigin: '190px 190px' }}>
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
            {/* Small diamond marker */}
            <polygon 
              points="190,30 193,33 190,36 187,33" 
              fill="#ff5a1f" 
              filter={`url(#orangeGlow-${speaker.id})`} 
            />
            <polygon 
              points="348,190 351,193 348,196 345,193" 
              fill="#ff8a3d" 
            />
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
            {/* Orbiting glowing coordinate point */}
            <circle
              cx="372"
              cy="190"
              r="3.5"
              fill="#ff8a3d"
              filter={`url(#orangeGlow-${speaker.id})`}
            />
          </g>

          {/* ARC 4: Inner Precision Reticle & Corner Ticks */}
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
            {/* Crosshair ticks */}
            <line x1="190" y1="46" x2="190" y2="54" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="190" y1="326" x2="190" y2="334" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="46" y1="190" x2="54" y2="190" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="326" y1="190" x2="334" y2="190" stroke="#ff5a1f" strokeWidth="1.5" strokeOpacity="0.8" />
          </g>

          {/* Technical Micro-Labels along Orbital Arcs */}
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
      <div className="relative z-10 flex items-center justify-center my-auto">
        
        {/* Outer Circular Boundary Container (Portrait Size: ~220px to 260px) */}
        <div 
          className={`relative rounded-full transition-all duration-700 ease-out flex items-center justify-center ${
            isActive 
              ? 'w-48 xs:w-52 sm:w-60 md:w-64 h-48 xs:h-52 sm:h-60 md:h-64 shadow-[0_0_45px_rgba(255,90,31,0.35)]' 
              : 'w-36 xs:w-40 sm:w-48 h-36 xs:h-40 sm:h-48 shadow-[0_0_20px_rgba(0,0,0,0.8)] opacity-70'
          }`}
        >

          {/* ========================================================================= */}
          {/* LAYER A: IRREGULAR EXTENDING FRAGMENT PIECES (Extends BEYOND Circular Edge) */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            
            {/* Top-Right Displaced Fragment Block (Extends +14px outside circle) */}
            <motion.div
              animate={isActive ? {
                x: [0, 6, 2, 4, 0],
                y: [0, -4, -1, -3, 0],
                opacity: isRevealed ? 0.3 : [0.6, 0.85, 0.5, 0.75, 0.6]
              } : { x: 10, y: -6, opacity: 0.4 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -top-2.5 -right-3 w-16 h-10 rounded-lg overflow-hidden border border-[#ff5a1f]/60 shadow-[0_0_12px_rgba(255,90,31,0.4)] z-30 bg-[#080808]/80"
              style={{ clipPath: 'polygon(0 0, 100% 15%, 85% 100%, 10% 85%)' }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain object-bottom -translate-x-28 -translate-y-4 filter contrast-125 saturate-120"
              />
              <div className="absolute inset-0 bg-[#ff5a1f]/20 mix-blend-color-dodge" />
            </motion.div>

            {/* Mid-Left Offset Slice (Displaced horizontally by -10px) */}
            <motion.div
              animate={isActive ? {
                x: [0, -8, -3, -6, 0],
                opacity: isRevealed ? 0.2 : [0.5, 0.8, 0.4, 0.7, 0.5]
              } : { x: -12, opacity: 0.35 }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-1/3 -left-3.5 w-14 h-14 rounded-md overflow-hidden border-l-2 border-[#ff8a3d]/70 shadow-[0_0_10px_rgba(255,90,31,0.3)] z-30 bg-[#080808]/80"
              style={{ clipPath: 'polygon(15% 0, 100% 10%, 90% 90%, 0 100%)' }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain object-bottom translate-x-2 -translate-y-16 filter contrast-130 brightness-110"
              />
              <div className="absolute inset-0 bg-[#ff5a1f]/25 mix-blend-overlay" />
            </motion.div>

            {/* Bottom-Right Digital Glitch Shard */}
            <motion.div
              animate={isActive ? {
                x: [0, 5, 1, 3, 0],
                y: [0, 4, 1, 3, 0],
                opacity: isRevealed ? 0.2 : [0.4, 0.75, 0.3, 0.65, 0.4]
              } : { x: 8, y: 6, opacity: 0.3 }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.7 }}
              className="absolute -bottom-2 -right-1 w-12 h-12 rounded-sm overflow-hidden border-b-2 border-r-2 border-[#ff5a1f]/80 z-30 bg-[#080808]/80"
              style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 80%)' }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain object-bottom -translate-x-32 -translate-y-36 filter contrast-140"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff5a1f]/40 to-transparent" />
            </motion.div>

            {/* Floating Orange Embers / Particles around portrait perimeter */}
            <motion.div
              animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="absolute -top-4 left-1/4 w-2 h-2 rounded-xs bg-[#ff5a1f] shadow-[0_0_8px_#ff5a1f]"
            />
            <motion.div
              animate={{ y: [3, -5, 3], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-4 w-1.5 h-1.5 rounded-full bg-[#ff8a3d] shadow-[0_0_6px_#ff8a3d]"
            />
            <motion.div
              animate={{ x: [-3, 3, -3], opacity: [0.3, 0.9, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.9, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-3 left-1/3 w-2 h-2 rotate-45 bg-[#ff5a1f] shadow-[0_0_8px_#ff5a1f]"
            />
            <motion.div
              animate={{ y: [-3, 5, -3], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-1/4 -left-3 w-1.5 h-1.5 rounded-xs bg-[#ffb27a] shadow-[0_0_6px_#ff8a3d]"
            />
          </div>

          {/* ========================================================================= */}
          {/* LAYER B: MAIN CIRCULAR PORTRAIT WITH RECONSTRUCTION SLICES                */}
          {/* ========================================================================= */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#ff5a1f]/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),_0_0_25px_rgba(255,90,31,0.3)] bg-[#0a0a0a] flex items-end justify-center">
            
            {/* Ambient Silhouette Backlight */}
            <div className="absolute bottom-2 w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-[#ff5a1f]/20 blur-xl pointer-events-none -z-0" />

            {/* Base Image Layer */}
            <motion.img
              src={imageSrc}
              alt={speaker.title}
              initial={{ scale: 1.05 }}
              animate={{ 
                scale: isActive ? 1 : 1.05,
                filter: isRevealed
                  ? 'contrast(1.15) brightness(1.02) saturate(1.1)'
                  : isActive
                    ? 'contrast(1.25) brightness(1.1) saturate(1.05)'
                    : 'contrast(1.35) brightness(0.8) saturate(0.8)'
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full h-full ${
                isRevealed ? 'object-cover object-top' : 'object-contain object-bottom'
              } pointer-events-none relative z-10`}
            />

            {/* Holographic Scan Slice 1: Upper Band Displacement */}
            {!isRevealed && (
              <motion.div
                initial={{ x: 0 }}
                animate={isActive ? { 
                  x: [-3, 4, -2, 2, 0],
                  opacity: [0.7, 0.9, 0.6, 0.85, 0.7]
                } : { x: -8, opacity: 0.5 }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none z-20 flex items-end justify-center"
                style={{ clipPath: 'polygon(0 14%, 100% 14%, 100% 32%, 0 32%)' }}
              >
                <img
                  src={imageSrc}
                  alt=""
                  className="w-full h-full object-contain object-bottom -translate-x-1 filter contrast-130 brightness-110"
                />
                <div className="absolute inset-0 bg-[#ff5a1f]/15 mix-blend-screen" />
              </motion.div>
            )}

            {/* Holographic Scan Slice 2: Lower-Mid Band Offset */}
            {!isRevealed && (
              <motion.div
                initial={{ x: 0 }}
                animate={isActive ? { 
                  x: [3, -4, 2, -2, 0],
                  opacity: [0.65, 0.85, 0.55, 0.8, 0.65]
                } : { x: 7, opacity: 0.45 }}
                transition={{ repeat: Infinity, duration: 4.1, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 pointer-events-none z-20 flex items-end justify-center"
                style={{ clipPath: 'polygon(0 54%, 100% 54%, 100% 70%, 0 70%)' }}
              >
                <img
                  src={imageSrc}
                  alt=""
                  className="w-full h-full object-contain object-bottom translate-x-1 filter contrast-125"
                />
                <div className="absolute inset-0 bg-[#ff5a1f]/15 mix-blend-color-dodge" />
              </motion.div>
            )}

            {/* Digital Pixel Matrix / Mosaic Perimeter Ring (Keeps Center Face Readable) */}
            {!isRevealed && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 45%, transparent 40%, rgba(255,90,31,0.7) 90%), url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='none' stroke='%23ff5a1f' stroke-width='0.75' stroke-opacity='0.4'/%3E%3C/svg%3E")`
                }}
              />
            )}

            {/* Orange Rim Light / Vignette Glow inside circle */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(8,8,8,0.4)_75%,_rgba(255,90,31,0.25)_100%)] pointer-events-none" />

            {/* ========================================================================= */}
            {/* LAYER C: LASER SCANLINE SWEEP ON TRANSITION / ACTIVE                      */}
            {/* ========================================================================= */}
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
                    duration: 1.1, 
                    ease: "easeInOut",
                    times: [0, 0.15, 0.85, 1] 
                  }}
                  className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-[#ff8a3d] to-transparent shadow-[0_0_15px_#ff5a1f] pointer-events-none z-30"
                >
                  <div className="w-full h-full bg-[#ff5a1f]/40 blur-xs" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reticle Focus Corners */}
            <div className="absolute inset-2 pointer-events-none opacity-60">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#ff5a1f]" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#ff5a1f]" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#ff5a1f]" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#ff5a1f]" />
            </div>

          </div>

          {/* ========================================================================= */}
          {/* LAYER D: BOTTOM HUD STATUS BADGE (OVERLAPPING BOTTOM RIM)                 */}
          {/* ========================================================================= */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-40 pointer-events-none whitespace-nowrap">
            {isRevealed ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#080808] border border-[#ff5a1f] text-[#ff8a3d] font-mono text-[9px] font-black uppercase tracking-widest shadow-[0_0_12px_rgba(255,90,31,0.4)]">
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
