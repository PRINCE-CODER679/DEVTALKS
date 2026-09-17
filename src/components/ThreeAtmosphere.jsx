import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeAtmosphere - Lightweight Ambient Stardust Engine powered by Three.js
 * Clean, subtle, non-distracting background atmosphere with glowing solar ember particles.
 */
export default function ThreeAtmosphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene, camera, renderer, particles, geometry, particleMaterial, texture;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 80;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL is not available or blocked on this device:', err);
      return;
    }

    // Subtle Particle Cloud (Devkraft Orange + Amber + Dim Stardust)
    const particleCount = 800;
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const orangeColor = new THREE.Color('#FF5500');
    const amberColor = new THREE.Color('#FFAA00');
    const dimWhite = new THREE.Color('#555555');

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 220;
      const y = (Math.random() - 0.5) * 220;
      const z = (Math.random() - 0.5) * 160;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const rand = Math.random();
      let chosenColor;
      if (rand < 0.35) {
        chosenColor = orangeColor;
      } else if (rand < 0.65) {
        chosenColor = amberColor;
      } else {
        chosenColor = dimWhite;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft round particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,130,0,0.7)');
    gradient.addColorStop(1, 'rgba(255,85,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    texture = new THREE.CanvasTexture(canvas);

    particleMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.06;

      camera.position.x = mouseX * 6;
      camera.position.y = mouseY * 4 - (scrollY * 0.02);
      camera.lookAt(0, -(scrollY * 0.02), 0);

      particles.rotation.y = elapsedTime * 0.025 + (mouseX * 0.1);
      particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      if (geometry) geometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      if (texture) texture.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" 
      aria-hidden="true" 
    />
  );
}
