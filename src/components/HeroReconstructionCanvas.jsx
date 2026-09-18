import React, { useRef, useEffect, useCallback } from 'react';
import { soundFx } from '../utils/audio';

/**
 * HeroReconstructionCanvas
 * 
 * High-performance 2D Canvas engine that slices the hero stage visual into 70+ irregular
 * photographic shards, starts them off-screen, violently pulls them inward with rapid
 * non-linear trajectories, snaps them aggressively into pixel-perfect registration,
 * triggers an impact shockwave + laser scanline, and completes the reveal.
 */
export default function HeroReconstructionCanvas({
  imageSrc = '/red-stage-panels.jpg',
  fallbackSrc = '/3d-mystery-speakers-stage.jpg',
  onProgress,
  onComplete
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const fragmentsRef = useRef([]);
  const imageObjRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const lastCycleRef = useRef(-1);

  // Initialize fragment grid & irregular polygon shards across the full screen
  const generateFragments = useCallback((img, canvasW, canvasH) => {
    const isMobile = canvasW < 640;
    // 8x8 on mobile (~64 fragments), 10x10 on desktop (~100 fragments)
    const cols = isMobile ? 8 : 10;
    const rows = isMobile ? 8 : 9;
    const total = cols * rows;

    // Full-bleed cover calculation to cover 100% of the entire viewport
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasW / canvasH;
    let targetW, targetH, targetX, targetY;

    if (canvasAspect > imgAspect) {
      targetW = canvasW;
      targetH = canvasW / imgAspect;
    } else {
      targetH = canvasH;
      targetW = canvasH * imgAspect;
    }

    targetX = (canvasW - targetW) / 2;
    targetY = (canvasH - targetH) / 2;

    const cellSrcW = img.width / cols;
    const cellSrcH = img.height / rows;
    const cellDestW = targetW / cols;
    const cellDestH = targetH / rows;

    const fragments = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const sx = c * cellSrcW;
        const sy = r * cellSrcH;
        const tx = targetX + c * cellDestW;
        const ty = targetY + r * cellDestH;

        // Randomized offscreen spawn trajectory across full viewport bounds
        const angle = (idx / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
        const spawnDistance = Math.max(canvasW, canvasH) * (1.1 + Math.random() * 0.8);
        const startX = canvasW / 2 + Math.cos(angle) * spawnDistance;
        const startY = canvasH / 2 + Math.sin(angle) * spawnDistance;

        // Staggered entry delay (0.05s to 0.75s)
        const distFromCenterNorm = Math.hypot(c - cols / 2, r - rows / 2) / (cols / 2);
        const startDelay = 0.05 + Math.random() * 0.7 + distFromCenterNorm * 0.15;
        const duration = 0.55 + Math.random() * 0.3;

        // Initial rotation: -40deg to +40deg
        const startRot = (Math.random() - 0.5) * (Math.PI * 0.6);

        fragments.push({
          id: idx,
          sx,
          sy,
          sw: cellSrcW,
          sh: cellSrcH,
          tx,
          ty,
          tw: cellDestW + 0.8,
          th: cellDestH + 0.8,
          startX,
          startY,
          startRot,
          startDelay,
          duration,
          isLocked: false
        });
      }
    }

    return { fragments, targetBounds: { x: targetX, y: targetY, w: targetW, h: targetH } };
  }, []);

  // Track mouse coordinates for subtle deflection
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleTouchMove = (e) => {
      if (!canvasRef.current || !e.touches[0]) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Main setup and continuous animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isSubscribed = true;
    startTimeRef.current = null;
    lastCycleRef.current = -1;

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const startAnimation = () => {
      imageObjRef.current = img;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      const displayW = Math.round(rect.width);
      const displayH = Math.round(rect.height);

      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
      ctx.scale(dpr, dpr);

      const { fragments, targetBounds } = generateFragments(img, displayW, displayH);
      fragmentsRef.current = fragments;

      // Continuous loop period: 5.2 seconds total cycle
      // 0.0s - 1.6s: Incoming fragments pull together fast
      // 1.6s - 3.8s: Fully assembled master image with laser scanline sweep
      // 3.8s - 5.0s: Smooth disperse / shatter outwards
      // 5.0s - 5.2s: Seamless transition into next cycle
      const CYCLE_PERIOD = 5.2;

      let lastReportedPercent = -1;

      const render = (timestamp) => {
        if (!isSubscribed) return;
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const totalElapsed = (timestamp - startTimeRef.current) / 1000;
        const currentCycleIndex = Math.floor(totalElapsed / CYCLE_PERIOD);
        const cycleTime = totalElapsed % CYCLE_PERIOD;

        // Sound on cycle snap
        if (currentCycleIndex !== lastCycleRef.current) {
          lastCycleRef.current = currentCycleIndex;
          if (currentCycleIndex > 0) {
            try { soundFx.playEvidenceClick(); } catch (e) {}
          }
        }

        // Clear canvas
        ctx.clearRect(0, 0, displayW, displayH);

        let lockedCount = 0;
        const totalFragments = fragments.length;

        // ================= PHASE 1: ASSEMBLY (0.0s - 1.6s) =================
        if (cycleTime < 1.6) {
          fragments.forEach((frag) => {
            if (cycleTime < frag.startDelay) return;

            const localProgress = Math.min(Math.max((cycleTime - frag.startDelay) / frag.duration, 0), 1);
            const ease = 1 - Math.pow(1 - localProgress, 4.5);

            // Micro overshoot before locking
            let overshoot = 0;
            if (localProgress > 0.75 && localProgress < 1) {
              const overT = (localProgress - 0.75) / 0.25;
              overshoot = Math.sin(overT * Math.PI) * 2.0 * (1 - overT);
            }

            let curX = frag.startX + (frag.tx - frag.startX) * ease;
            let curY = frag.startY + (frag.ty - frag.startY) * ease;
            let curRot = frag.startRot * (1 - ease);

            // Cursor interactive subtle push
            if (localProgress < 0.95 && mousePosRef.current.x > 0) {
              const dx = curX - mousePosRef.current.x;
              const dy = curY - mousePosRef.current.y;
              const dist = Math.hypot(dx, dy);
              if (dist < 120) {
                const force = (1 - dist / 120) * 16 * (1 - localProgress);
                curX += (dx / (dist || 1)) * force;
                curY += (dy / (dist || 1)) * force;
              }
            }

            if (localProgress >= 1) {
              lockedCount++;
              curX = frag.tx;
              curY = frag.ty;
              curRot = 0;
            }

            ctx.save();
            ctx.translate(curX + frag.tw / 2, curY + frag.th / 2);
            if (curRot !== 0) ctx.rotate(curRot);

            ctx.drawImage(img, frag.sx, frag.sy, frag.sw, frag.sh, -frag.tw / 2, -frag.th / 2, frag.tw, frag.th);

            if (localProgress < 1) {
              ctx.strokeStyle = `rgba(255, 90, 31, ${0.4 * (1 - localProgress)})`;
              ctx.lineWidth = 1;
              ctx.strokeRect(-frag.tw / 2, -frag.th / 2, frag.tw, frag.th);
            }
            ctx.restore();
          });

          const currentPercent = Math.min(Math.round((lockedCount / (totalFragments || 1)) * 100), 100);
          if (currentPercent !== lastReportedPercent) {
            lastReportedPercent = currentPercent;
            if (onProgress) onProgress(currentPercent);
          }
        } 
        // ================= PHASE 2: ASSEMBLED MASTER REVEAL (1.6s - 3.8s) =================
        else if (cycleTime < 3.8) {
          // Master clean draw of assembled image
          ctx.drawImage(img, targetBounds.x, targetBounds.y, targetBounds.w, targetBounds.h);

          if (lastReportedPercent !== 100) {
            lastReportedPercent = 100;
            if (onProgress) onProgress(100);
            if (onComplete) onComplete();
          }

          // Orange Laser Scanline Sweep (2.0s - 2.8s)
          if (cycleTime >= 1.8 && cycleTime <= 2.8) {
            const scanT = (cycleTime - 1.8) / 1.0;
            const scanY = targetBounds.y + targetBounds.h * scanT;

            ctx.save();
            const grad = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 14);
            grad.addColorStop(0, 'rgba(255, 90, 31, 0)');
            grad.addColorStop(0.5, 'rgba(255, 138, 61, 0.85)');
            grad.addColorStop(1, 'rgba(255, 90, 31, 0)');

            ctx.fillStyle = grad;
            ctx.fillRect(targetBounds.x - 10, scanY - 14, targetBounds.w + 20, 28);

            ctx.fillStyle = 'rgba(244, 240, 232, 0.95)';
            ctx.fillRect(targetBounds.x, scanY - 1, targetBounds.w, 2);
            ctx.restore();
          }
        } 
        // ================= PHASE 3: SHATTER / DISPERSE OUTWARDS (3.8s - 5.2s) =================
        else {
          const disperseProgress = (cycleTime - 3.8) / 1.4;
          // Smooth exponential disperse ease
          const disperseEase = Math.pow(disperseProgress, 2.5);

          fragments.forEach((frag) => {
            const curX = frag.tx + (frag.startX - frag.tx) * (disperseEase * 0.7);
            const curY = frag.ty + (frag.startY - frag.ty) * (disperseEase * 0.7);
            const curRot = frag.startRot * disperseEase * 0.5;
            const alpha = Math.max(1 - disperseEase * 1.1, 0);

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(curX + frag.tw / 2, curY + frag.th / 2);
            if (curRot !== 0) ctx.rotate(curRot);

            ctx.drawImage(img, frag.sx, frag.sy, frag.sw, frag.sh, -frag.tw / 2, -frag.th / 2, frag.tw, frag.th);

            ctx.restore();
          });

          const currentPercent = Math.max(Math.round((1 - disperseProgress) * 100), 10);
          if (currentPercent !== lastReportedPercent) {
            lastReportedPercent = currentPercent;
            if (onProgress) onProgress(currentPercent);
          }
        }

        animFrameRef.current = requestAnimationFrame(render);
      };

      animFrameRef.current = requestAnimationFrame(render);
    };

    img.onload = startAnimation;
    img.onerror = () => {
      if (img.src !== fallbackSrc) {
        img.src = fallbackSrc;
      }
    };
    img.src = imageSrc;

    const handleResize = () => {
      if (!isSubscribed) return;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (imageObjRef.current) {
        startAnimation();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isSubscribed = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [imageSrc, fallbackSrc, generateFragments, onProgress, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
      />
    </div>
  );
}

