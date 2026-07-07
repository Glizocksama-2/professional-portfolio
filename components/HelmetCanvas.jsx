'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';

// Procedural 3D F1 Helmet Model
function HelmetModel({ rotationX = 0, rotationY = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle auto-rotation combined with scroll inputs
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 + rotationY;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05 + rotationX;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Helmet Shell */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ff6b00" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Visor Screen */}
      <mesh position={[0, 0.1, 0.9]} castShadow>
        <boxGeometry args={[2.0, 0.5, 0.8]} />
        <meshStandardMaterial color="#111112" roughness={0.0} metalness={1.0} transparent opacity={0.9} />
      </mesh>

      {/* Visor Highlight Trim (Lime Accent) */}
      <mesh position={[0, 0.38, 1.05]}>
        <boxGeometry args={[1.8, 0.06, 0.1]} />
        <meshStandardMaterial color="#d2ff00" emissive="#d2ff00" emissiveIntensity={0.5} />
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

export default function HelmetCanvas({ scrollProgress = 0, styleName = "Porcelain" }) {
  const rotationY = scrollProgress * Math.PI * 2;
  const rotationX = Math.sin(scrollProgress * Math.PI) * 0.3;

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <spotLight position={[0, 5, 0]} intensity={1.0} penumbra={1} castShadow />
        
        <Center>
          <HelmetModel rotationX={rotationX} rotationY={rotationY} />
        </Center>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-white text-[10px] tracking-widest uppercase opacity-40">
        [ {styleName} MODEL RUNTIME ]
      </div>
    </div>
  );
}
