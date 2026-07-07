'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { View, PerspectiveCamera, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fallback procedural material component
function FeedbackGridMaterial({ title }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Draw background tech grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 256);
    
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();
    }
    for (let j = 0; j < 256; j += 32) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(512, j);
      ctx.stroke();
    }
    
    // Draw neon accent border
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 492, 236);
    
    // Write text
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title.toUpperCase(), 256, 120);
    
    ctx.fillStyle = '#10b981';
    ctx.font = '14px Outfit, sans-serif';
    ctx.fillText('NO SCREENSHOT RECORDED', 256, 160);

    canvasRef.current = new THREE.CanvasTexture(canvas);
  }, [title]);

  return canvasRef.current ? (
    <meshStandardMaterial map={canvasRef.current} roughness={0.2} metalness={0.5} />
  ) : (
    <meshStandardMaterial color="#10b981" roughness={0.8} />
  );
}

// Project Card Mesh
function ProjectCard3D({ proj, index, activeIndex, isDragging, dragOffset }) {
  const meshRef = useRef();
  
  // Calculate relative index offset
  const offset = index - activeIndex;
  const absOffset = Math.abs(offset);
  
  // Conditionally load texture if screenshot exists
  let texture = null;
  if (proj.screenshot) {
    try {
      texture = useTexture(proj.screenshot);
    } catch (e) {
      console.warn(`Failed to load texture for ${proj.title}:`, e);
    }
  }

  useFrame(() => {
    if (!meshRef.current) return;

    // Position along a shallow 3D arc
    const targetX = offset * 2.2 + (isDragging ? dragOffset * 0.005 : 0);
    const targetY = -absOffset * 0.15;
    const targetZ = -absOffset * 0.6;
    const targetRotY = -offset * 0.25;

    // Smooth spring interpolation (lerp)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    
    // Scale down inactive items
    const targetScale = index === activeIndex ? 1.0 : 0.85;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <mesh ref={meshRef} position={[offset * 2.2, 0, -absOffset * 0.6]}>
      <planeGeometry args={[2.0, 1.2]} />
      {texture ? (
        <meshStandardMaterial map={texture} roughness={0.1} metalness={0.3} />
      ) : (
        <FeedbackGridMaterial title={proj.title} />
      )}
    </mesh>
  );
}

export default function ProjectsSlider3D({ projects = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);
  const dragStartRef = useRef(0);
  const lastScrollTime = useRef(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Handle Wheel Scroll (Debounced/Throttled)
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return; // 600ms throttle to prevent skipping
    lastScrollTime.current = now;

    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Drag Event Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDragOffset(clientX - dragStartRef.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative flex flex-col items-center select-none overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 3D Scene viewport (Drei View) */}
      <div className="w-full max-w-5xl h-[320px] md:h-[450px] relative">
        <View track={containerRef} className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={50} />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 3]} intensity={1.5} />
          <pointLight position={[-5, -5, -2]} color="#10b981" intensity={1.0} />

          <Suspense fallback={null}>
            {projects.map((proj, idx) => (
              <ProjectCard3D 
                key={idx} 
                proj={proj} 
                index={idx} 
                activeIndex={activeIndex}
                isDragging={isDragging}
                dragOffset={dragOffset}
              />
            ))}
          </Suspense>
        </View>
      </div>

      {/* Navigation & Active Project Details */}
      <div className="max-w-2xl text-center mt-6 px-6 z-10">
        <span className="text-lime text-[10px] tracking-widest uppercase font-mono font-bold">
          PROJECT {projects[activeIndex].num} • {projects[activeIndex].role}
        </span>
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-2 font-sans">
          {projects[activeIndex].title}
        </h3>
        <p className="text-sm text-green-off-white-2 mt-4 leading-relaxed max-w-lg mx-auto">
          {projects[activeIndex].desc}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {projects[activeIndex].tags.map((t, i) => (
            <span key={i} className="text-[9px] tracking-wider uppercase bg-dark-green px-2.5 py-1 text-lime font-bold">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center border border-dark-green-tint-1 hover:border-lime text-white transition-all duration-300 font-mono"
          >
            &lt;
          </button>
          <a 
            href={projects[activeIndex].github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-lime text-lime px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-lime hover:text-black transition-all duration-300"
          >
            VIEW REPOSITORY
          </a>
          <button 
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center border border-dark-green-tint-1 hover:border-lime text-white transition-all duration-300 font-mono"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-8 z-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 bg-lime' : 'bg-dark-green-tint-1'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
