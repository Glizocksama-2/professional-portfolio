'use client';

import React, { useRef } from 'react';
import { View, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function TelemetryCore({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const outerRingRef = useRef();
  const verticalRingRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Auto-rotations with scroll progress multipliers
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2 + scrollProgress * Math.PI * 2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.5;
      innerRef.current.rotation.y = time * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -time * 0.15;
    }
    if (verticalRingRef.current) {
      verticalRingRef.current.rotation.x = time * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glowing Core */}
      <mesh ref={innerRef} castShadow>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial 
          color="#10B981" 
          emissive="#10B981" 
          emissiveIntensity={1.2 + Math.sin(scrollProgress * Math.PI) * 0.8} 
          wireframe 
        />
      </mesh>

      {/* Orbit Ring 1 - Horizontal Tech Grid */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.0, 0.05, 16, 100]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Orbit Ring 2 - Vertical Carbon Ring */}
      <mesh ref={verticalRingRef} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1.6, 0.08, 12, 80]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Outer Cage Nodes */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * 1.6, 0, Math.sin(angle) * 1.6]}
          >
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial color="#E11D48" emissive="#E11D48" emissiveIntensity={0.6} />
          </mesh>
        );
      })}

      {/* Telemetry Dials & Sensors */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.0} />
      </mesh>
      <mesh position={[0, -1.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.0} />
      </mesh>
    </group>
  );
}

export default function HeroCenterpiece({ scrollProgress = 0 }) {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
      <View track={containerRef} className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        
        {/* Scroll-modulated lights */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5 + scrollProgress * 2.0} 
          castShadow 
        />
        <pointLight 
          position={[-4, -4, -4]} 
          color="#10B981" 
          intensity={2.0} 
        />
        <spotLight 
          position={[0, 5, 0]} 
          intensity={1.0} 
          penumbra={1} 
          color="#E11D48" 
        />

        <TelemetryCore scrollProgress={scrollProgress} />
      </View>
      <div className="absolute bottom-4 left-4 text-green-off-white-2 text-[9px] tracking-widest uppercase opacity-40 font-mono">
        [ SYSTEM METRIC CORE CORE.TELEMETRY_LOADED ]
      </div>
    </div>
  );
}
