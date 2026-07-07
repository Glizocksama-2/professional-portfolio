'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function ProjectCarousel({ projects = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const autoplayTimerRef = useRef(null);
  const isHoveredRef = useRef(false);

  // Constants for 3D layout
  const rotationAngle = 45; // rotation of side items on Y axis
  const translationStep = 180; // translation on X axis
  const zTranslation = -200; // translation back on Z axis for side items

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Autoplay Logic
  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      if (!isHoveredRef.current && !isDragging) {
        handleNext();
      }
    }, 4000);
  }, [handleNext, isDragging]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Throttled Scroll Wheel Navigation
  const lastScrollTime = useRef(0);
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 500) return; // throttle 500ms
    lastScrollTime.current = now;

    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Drag and Swipe Navigation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragOffsetRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragOffsetRef.current = clientX - dragStartRef.current;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 80; // drag distance required to transition
    if (dragOffsetRef.current < -threshold) {
      handleNext();
    } else if (dragOffsetRef.current > threshold) {
      handlePrev();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative py-12 flex flex-col items-center justify-center select-none overflow-hidden"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onWheel={handleWheel}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 3D Coverflow Viewport Container */}
      <div 
        className="w-full max-w-4xl h-[450px] relative flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {projects.map((proj, idx) => {
          // Calculate offset relative to activeIndex (handling wrap-around)
          let offset = idx - activeIndex;
          if (offset < -projects.length / 2) offset += projects.length;
          if (offset > projects.length / 2) offset -= projects.length;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          
          // Compute transform properties dynamically
          const translateX = offset * translationStep + (isDragging ? dragOffsetRef.current * 0.5 : 0);
          const rotateY = offset * -rotationAngle;
          const translateZ = isActive ? 0 : zTranslation - (absOffset * 50);
          const scale = isActive ? 1.0 : 0.82 - (absOffset * 0.05);
          const opacity = isActive ? 1.0 : 0.42 - (absOffset * 0.05);
          const zIndex = 100 - absOffset;
          const blur = isActive ? '0px' : `2.5px`;

          return (
            <div
              key={idx}
              onClick={() => { if (!isActive) setActiveIndex(idx); }}
              className={`absolute w-[280px] md:w-[480px] h-[180px] md:h-[280px] cursor-pointer origin-center transition-all duration-700 ease-out border border-dark-green-tint-1 bg-black overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.85)]`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                filter: `blur(${blur})`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBoxReflect: 'below 12px linear-gradient(transparent, transparent 65%, rgba(255,255,255,0.08))'
              }}
            >
              {proj.screenshot ? (
                <div 
                  className="w-full h-full bg-cover bg-top hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${proj.screenshot}')` }}
                ></div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-dark-green/30 border border-dark-green-tint-2">
                  <span className="text-3xl font-black text-lime">{proj.num}</span>
                  <span className="text-[10px] tracking-widest text-green-off-white-2 uppercase mt-2">{proj.title}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Left/Right Arrows) */}
      <div className="flex gap-6 mt-8 z-10">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center border border-white text-white hover:bg-lime hover:text-black hover:border-lime transition-all duration-300 font-bold uppercase text-xs"
        >
          ←
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center border border-white text-white hover:bg-lime hover:text-black hover:border-lime transition-all duration-300 font-bold uppercase text-xs"
        >
          →
        </button>
      </div>

      {/* Active Project Metadata Container */}
      <div className="max-w-2xl text-center mt-8 px-6 transition-opacity duration-500 ease-in-out">
        <span className="text-lime text-[10px] tracking-widest uppercase font-bold">
          PROJECT {projects[activeIndex].num} • {projects[activeIndex].role}
        </span>
        <h3 className="text-3xl font-black uppercase text-white mt-2">
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
        <div className="mt-6">
          <a 
            href={projects[activeIndex].github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex border border-lime text-lime px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-lime hover:text-black transition-all duration-300"
          >
            VIEW REPOSITORY
          </a>
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
