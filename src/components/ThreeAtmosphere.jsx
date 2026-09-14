import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeAtmosphere - Professional WebGL 3D Background Engine powered by Three.js
 * Features:
 * - 1,500+ dynamic red & white 3D starfield particles
 * - Floating 3D wireframe polyhedra (Icosahedron & Dodecahedron) with glowing red vertices
 * - Interactive cursor-driven 3D camera parallax & inertia damping
 * - Scroll-linked rotation reacting to page depth
 */
export default function ThreeAtmosphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. 3D Particle Cloud (Red Embers + White Stardust) ---
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const redColor = new THREE.Color('#EB0028');
    const darkRed = new THREE.Color('#7A0014');
    const whiteColor = new THREE.Color('#FFFFFF');
    const dimWhite = new THREE.Color('#777777');

    for (let i = 0; i < particleCount; i++) {
      // Spread in 3D sphere volume
      const x = (Math.random() - 0.5) * 220;
      const y = (Math.random() - 0.5) * 220;
      const z = (Math.random() - 0.5) * 160;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color distribution: 60% Red accents, 40% White dust
      const rand = Math.random();
      let chosenColor;
      if (rand < 0.35) {
        chosenColor = redColor;
      } else if (rand < 0.6) {
        chosenColor = darkRed;
      } else if (rand < 0.85) {
        chosenColor = whiteColor;
      } else {
        chosenColor = dimWhite;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      scales[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture creation
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // --- 2. Floating 3D Geometric Wireframe Shapes (TEDx Red & White) ---
    // Shape A: Outer 3D Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(18, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xEB0028,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(-55, 20, -30);
    scene.add(icosahedron);

    // Shape B: Inner Rotating Torus Knot
    const torusGeo = new THREE.TorusGeometry(12, 1.2, 16, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(55, -25, -20);
    scene.add(torus);

    // Shape C: Center subtle sphere lattice
    const sphereGeo = new THREE.SphereGeometry(35, 16, 12);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xEB0028,
      wireframe: true,
      transparent: true,
      opacity: 0.04
    });
    const sphereLattice = new THREE.Mesh(sphereGeo, sphereMat);
    sphereLattice.position.set(0, 0, -60);
    scene.add(sphereLattice);

    // --- 3. Interactive Mouse Parallax & Scroll Listeners ---
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

    // --- 4. Render Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp for mouse & scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Parallax camera movement
      camera.position.x = mouseX * 8;
      camera.position.y = mouseY * 6 - (scrollY * 0.03);
      camera.lookAt(0, -(scrollY * 0.03), 0);

      // Rotate particle field
      particles.rotation.y = elapsedTime * 0.04 + (mouseX * 0.15);
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1 + (mouseY * 0.1);

      // Rotate floating geometric objects
      icosahedron.rotation.x = elapsedTime * 0.15;
      icosahedron.rotation.y = elapsedTime * 0.2;
      icosahedron.position.y = 20 + Math.sin(elapsedTime * 0.8) * 3;

      torus.rotation.x = elapsedTime * 0.18;
      torus.rotation.z = elapsedTime * 0.12;
      torus.position.y = -25 + Math.cos(elapsedTime * 0.7) * 4;

      sphereLattice.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      particleMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      texture.dispose();
      renderer.dispose();
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
