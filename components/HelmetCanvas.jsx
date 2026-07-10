'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, PerspectiveCamera } from '@react-three/drei';
import { scrollState, ensureScrollTracking } from '@/lib/scroll-progress';

// Material palettes so each project's canvasStyle actually looks different
const STYLES = {
  'Chrome Gold':   { shell: '#d4a017', metalness: 1.0, roughness: 0.05, trim: '#d2ff00' },
  'Matte Black':   { shell: '#1a1a1c', metalness: 0.2, roughness: 0.9,  trim: '#d2ff00' },
  'Glassmorphism': { shell: '#8ecae6', metalness: 0.1, roughness: 0.0,  trim: '#ffffff', transparent: true, opacity: 0.65 },
  'Industrial Red':{ shell: '#c1121f', metalness: 0.7, roughness: 0.3,  trim: '#d2ff00' },
  'Fluid Aqua':    { shell: '#00b4d8', metalness: 0.6, roughness: 0.15, trim: '#d2ff00' },
  'Sport Royal':   { shell: '#1d3fbf', metalness: 0.8, roughness: 0.2,  trim: '#d2ff00' },
  Porcelain:       { shell: '#efefe5', metalness: 0.3, roughness: 0.25, trim: '#d2ff00' },
};

// Procedural 3D F1 Helmet Model
function HelmetModel({ style }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Auto-rotation + scroll-driven spin, read from the shared store —
      // no React re-renders anywhere on scroll
      meshRef.current.rotation.y = t * 0.15 + scrollState.progress * Math.PI * 2;
      meshRef.current.rotation.x =
        Math.sin(t * 0.2) * 0.05 + Math.sin(scrollState.progress * Math.PI) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Helmet Shell */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={style.shell}
          roughness={style.roughness}
          metalness={style.metalness}
          transparent={style.transparent || false}
          opacity={style.opacity ?? 1}
        />
      </mesh>

      {/* Visor Screen */}
      <mesh position={[0, 0.1, 0.9]} castShadow>
        <boxGeometry args={[2.0, 0.5, 0.8]} />
        <meshStandardMaterial color="#111112" roughness={0.0} metalness={1.0} transparent opacity={0.9} />
      </mesh>

      {/* Visor Highlight Trim */}
      <mesh position={[0, 0.38, 1.05]}>
        <boxGeometry args={[1.8, 0.06, 0.1]} />
        <meshStandardMaterial color={style.trim} emissive={style.trim} emissiveIntensity={0.5} />
      </mesh>

      {/* Side Vent Pod L */}
      <mesh position={[-1.4, -0.2, 0.2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
        <meshStandardMaterial color="#282c20" roughness={0.4} />
      </mesh>

      {/* Side Vent Pod R */}
      <mesh position={[1.4, -0.2, 0.2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
        <meshStandardMaterial color="#282c20" roughness={0.4} />
      </mesh>

      {/* Rear Spoiler Wings */}
      <mesh position={[0, 0.7, -1.0]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#efefe5" roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function HelmetCanvas({ styleName = 'Porcelain' }) {
  const wrapperRef = useRef();
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const style = STYLES[styleName] || STYLES.Porcelain;

  // Only mount the WebGL context while the card is near the viewport —
  // browsers cap concurrent contexts and idle canvases waste GPU/battery.
  useEffect(() => {
    ensureScrollTracking();
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = wrapperRef.current;
    if (!el) return;
    // Synchronous first check — IO callbacks can be delayed (e.g. hidden
    // tabs), and a card already on screen should render immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200 && rect.bottom > -200) setInView(true);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center relative">
      {inView && (
        <Canvas
          shadows
          // Cap resolution and prefer the efficiency GPU: visually identical
          // on cards this size, dramatically cheaper on retina/mobile
          dpr={[1, 1.5]}
          gl={{ powerPreference: 'low-power', antialias: true }}
          frameloop={reducedMotion ? 'demand' : 'always'}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <spotLight position={[0, 5, 0]} intensity={1.0} penumbra={1} castShadow />

          <Center>
            <HelmetModel style={style} />
          </Center>
        </Canvas>
      )}
      <div className="absolute bottom-4 left-4 text-white text-[10px] tracking-widest uppercase opacity-40 pointer-events-none">
        [ {styleName} MODEL RUNTIME ]
      </div>
    </div>
  );
}
