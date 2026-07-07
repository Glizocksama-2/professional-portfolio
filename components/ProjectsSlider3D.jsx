'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function ProjectsSlider3D({ projects = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const lastScrollTime = useRef(0);
  const cardsRef = useRef([]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNext, handlePrev]);

  // Animate cards on active index change
  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const offset = idx - activeIndex;
      const absOffset = Math.abs(offset);
      
      gsap.to(card, {
        x: offset * 280,
        z: -absOffset * 120,
        rotateY: -offset * 15,
        scale: idx === activeIndex ? 1 : 0.82 - absOffset * 0.04,
        opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25,
        filter: idx === activeIndex ? 'blur(0px) brightness(1)' : `blur(${absOffset * 1.5}px) brightness(0.6)`,
        duration: 0.65,
        ease: 'power3.out',
        zIndex: projects.length - absOffset,
      });
    });
  }, [activeIndex, projects.length]);

  // Handle Wheel Scroll (Throttled)
  const handleWheel = (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastScrollTime.current < 500) return;
    lastScrollTime.current = now;

    if (e.deltaY > 0) handleNext();
    else handlePrev();
  };

  // Drag/Swipe Event Handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragOffsetRef.current = 0;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragOffsetRef.current = clientX - dragStartRef.current;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 80;
    if (dragOffsetRef.current < -threshold) handleNext();
    else if (dragOffsetRef.current > threshold) handlePrev();
    dragOffsetRef.current = 0;
  };

  const activeProject = projects[activeIndex] || {};

  return (
    <div 
      ref={containerRef}
      className="w-full relative flex flex-col items-center select-none overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* 3D Scene using CSS Perspective */}
      <div 
        className="w-full max-w-5xl relative flex items-center justify-center"
        style={{ 
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          height: '360px',
        }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((proj, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);
            
            return (
              <div
                key={idx}
                ref={(el) => cardsRef.current[idx] = el}
                className="absolute transition-none"
                style={{
                  width: '400px',
                  height: '240px',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity, filter',
                  cursor: idx === activeIndex ? 'default' : 'pointer',
                  zIndex: projects.length - absOffset,
                }}
                onClick={() => idx !== activeIndex && setActiveIndex(idx)}
              >
                {/* Card Content */}
                <div className="w-full h-full relative overflow-hidden border border-dark-green-tint-1 bg-dark-green/40 group">
                  {proj.screenshot ? (
                    <img 
                      src={proj.screenshot} 
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-black via-dark-green to-black flex flex-col items-center justify-center gap-3">
                      <div className="grid grid-cols-8 gap-px opacity-20 absolute inset-0">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-dark-green-tint-1/30" />
                        ))}
                      </div>
                      <span className="text-lime text-[10px] tracking-widest uppercase font-mono font-bold z-10 border border-lime/30 px-3 py-1">
                        {proj.num}
                      </span>
                      <span className="text-white text-sm font-bold uppercase tracking-wider z-10">{proj.title}</span>
                      <span className="text-lime/50 text-[9px] tracking-widest uppercase font-mono z-10">
                        NO SCREENSHOT RECORDED
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay gradient on screenshot cards */}
                  {proj.screenshot && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Card bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-3 py-2 flex justify-between items-center">
                    <span className="text-[9px] text-lime tracking-widest uppercase font-mono font-bold">{proj.num}</span>
                    <span className="text-[10px] text-white uppercase font-bold tracking-wider truncate ml-2">{proj.title}</span>
                  </div>
                </div>

                {/* Reflection */}
                <div 
                  className="absolute top-full left-0 w-full overflow-hidden opacity-15 pointer-events-none"
                  style={{ 
                    height: '60px',
                    transform: 'rotateX(180deg) translateY(0px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                  }}
                >
                  {proj.screenshot ? (
                    <img src={proj.screenshot} alt="" className="w-full h-60 object-cover" />
                  ) : (
                    <div className="w-full h-60 bg-dark-green" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation and Active Project Details */}
      <div className="max-w-2xl text-center mt-8 px-6 z-10">
        <span className="text-lime text-[10px] tracking-widest uppercase font-mono font-bold">
          PROJECT {activeProject.num} // {activeProject.role}
        </span>
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-2 font-sans">
          {activeProject.title}
        </h3>
        <p className="text-sm text-green-off-white-2 mt-4 leading-relaxed max-w-lg mx-auto">
          {activeProject.desc}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {(activeProject.tags || []).map((t, i) => (
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
            href={activeProject.github} 
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
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 bg-lime' : 'w-2 bg-dark-green-tint-1'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
