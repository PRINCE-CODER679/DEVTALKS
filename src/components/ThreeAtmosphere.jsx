import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Hardware-Accelerated 3D Atmospheric Particle & Nebula Engine
 * Generates floating ambient dust, volumetric red glowing embers, and mouse parallax.
 */
export default function ThreeAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool: red volumetric embers & white ambient dust specs
    const particleCount = Math.min(85, Math.floor(window.innerWidth / 18));
    const particles = [];

    const colors = [
      'rgba(255, 42, 26, 0.75)',   // Brand Red
      'rgba(217, 28, 28, 0.55)',   // Crimson
      'rgba(160, 16, 16, 0.40)',   // Deep Dark Red
      'rgba(255, 255, 255, 0.65)', // White dust
      'rgba(255, 255, 255, 0.35)'  // Faint spec
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5, // 3D depth layer
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.4 - 0.1, // Gently floating upward
        opacity: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Mouse parallax tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const parallaxX = (mouseX / width - 0.5) * 25;
      const parallaxY = (mouseY / height - 0.5) * 20;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle dynamic radial nebula in center
      const centerX = width / 2 - parallaxX * 0.5;
      const centerY = height / 2 - parallaxY * 0.5;
      const nebulaRadius = Math.max(width, height) * 0.38;

      const nebula = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, nebulaRadius);
      const pulseOpacity = 0.22 + Math.sin(time * 0.8) * 0.04;
      nebula.addColorStop(0, `rgba(217, 28, 28, ${pulseOpacity})`);
      nebula.addColorStop(0.4, 'rgba(120, 12, 12, 0.09)');
      nebula.addColorStop(1, 'rgba(7, 7, 7, 0)');

      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      // Draw Particles with 3D Parallax & Depth
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Depth-adjusted position
        const drawX = p.x - parallaxX * p.z;
        const drawY = p.y - parallaxY * p.z;

        // Pulsing glow
        const currentOpacity = Math.max(0.1, Math.min(1, p.opacity + Math.sin(time + p.pulsePhase) * 0.25));

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius * p.z * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Subtle bloom shadow on red embers
        if (p.color.includes('255, 42, 26')) {
          ctx.shadowColor = '#FF2A1A';
          ctx.shadowBlur = 10;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" 
      aria-hidden="true" 
    />
  );
}
