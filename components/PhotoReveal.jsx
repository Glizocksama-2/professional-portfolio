'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lightweight scheduler for deferring non-critical work until browser is idle
 */
function scheduleIdleWork(callback, timeout = 2000) {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, Math.min(timeout, 100));
  }
}

/**
 * Optimized image preloader - preloads critical images only
 */
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // Don't fail on image errors
    img.src = src;
  });
}

export default function PhotoReveal() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const captionRef = useRef(null);
  const lineRef = useRef(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  // Track hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Preload the portrait image early
  useEffect(() => {
    if (isHydrated) {
      scheduleIdleWork(() => {
        preloadImage('/brian_portrait.png');
      }, 1000);
    }
  }, [isHydrated]);

  // Defer GSAP animations until idle
  useEffect(() => {
    if (!isHydrated) return;

    scheduleIdleWork(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1.2,
          }
        });

        // Image reveal: scale down from zoomed + clip-path wipe
        tl.fromTo(imageRef.current, 
          { 
            scale: 1.3, // Reduced from 1.4
            clipPath: 'inset(40% 0% 40% 0%)', // Reduced from 50%
            filter: 'brightness(0.4) contrast(1.2)', // Less extreme
          },
          { 
            scale: 1.0, 
            clipPath: 'inset(0% 0% 0% 0%)', 
            filter: 'brightness(1) contrast(1)',
            duration: 0.8, // Reduced from 1.0
            ease: 'power2.out',
          },
          0
        );

        // Overlay fade out
        tl.fromTo(overlayRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.5 }, // Reduced from 0.6
          0.2 // Earlier start
        );

        // Caption line draw
        tl.fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: 'power2.out' }, // Reduced from 0.5
          0.3
        );

        // Caption text reveal - separate from scrub for perfect readability
        gsap.fromTo(captionRef.current,
          { y: 25, opacity: 0 }, // Reduced from 30
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, // Reduced from 0.8
            ease: 'power3.out',
            scrollTrigger: {
              trigger: captionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 2000); // 2 second timeout
    
    return () => setAnimationsReady(false);
  }, [isHydrated]);

  return (
    <section 
      ref={sectionRef} 
      className="relative px-4 md:px-8 py-12 md:py-20 bg-black/60 backdrop-blur-md overflow-hidden z-10"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Photo Side - Asymmetric Left */}
        <div className="md:col-span-5 relative">
          <div className="relative overflow-hidden aspect-[3/4] w-full max-w-sm">
            <img
              ref={imageRef}
              src="/brian_portrait.png"
              alt="Brian Mukwe Waliaula"
              className="w-full h-full object-cover object-top"
              style={{ 
                willChange: 'transform, clip-path, filter',
              }}
              loading="eager" // Hero image should load eagerly
            />
           
            {/* Cinematic overlay */}
            <div 
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black pointer-events-none"
              style={{ willChange: 'opacity' }}
            />
           
            {/* Film grain texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Frame accent lines */}
            <div className="absolute top-0 left-0 w-8 h-px bg-lime" />
            <div className="absolute top-0 left-0 w-px h-8 bg-lime" />
            <div className="absolute bottom-0 right-0 w-8 h-px bg-lime" />
            <div className="absolute bottom-0 right-0 w-px h-8 bg-lime" />
          </div>

          {/* Photo metadata label */}
          <div className="flex items-center gap-3 mt-4">
            <div 
              ref={lineRef}
              className="h-px bg-lime origin-left"
              style={{ width: '40px', willChange: 'transform' }}
            />
            <span className="text-[8px] md:text-[9px] tracking-widest text-green-off-white-2 uppercase font-mono">
              BRIAN MUKWE WALIAULA // NAIROBI, KE
            </span>
          </div>
        </div>

        {/* Summary Side - Right */}
        <div ref={captionRef} className="md:col-span-7 flex flex-col gap-6 md:gap-8" style={{ willChange: 'transform, opacity' }}>
          <span className="text-[9px] md:text-[10px] tracking-widest text-lime uppercase font-bold">[ BIO PROFILE ]</span>
         
          <p className="text-lg md:text-xl lg:text-2xl text-white font-sans leading-relaxed font-bold">
            I deploy secure full-stack applications, automated scrapers, payment gateways, and custom telemetry interfaces. From database security parameters to fluid web layouts, I handle complete system lifecycles.
          </p>

          <span className="text-[9px] md:text-[10px] tracking-widest text-lime uppercase font-bold mt-4">[ LOGIC SPECIFICATION ]</span>
          <blockquote className="font-sans text-green-off-white-1 text-lg md:text-xl lg:text-2xl leading-tight border-l-2 border-lime pl-4 md:pl-6 italic">
            "Reliability is built on continuous telemetry, clean separation of concerns, and verified code execution."
          </blockquote>

          {/* Working style indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4">
            <div className="border border-dark-green-tint-1 p-3 md:p-4 bg-dark-green/10">
              <span className="text-[8px] md:text-[9px] tracking-widest text-lime uppercase font-bold font-mono">APPROACH</span>
              <p className="text-[10px] md:text-xs text-green-off-white-2 mt-2 leading-relaxed">
                Systems-first thinking. Every deployment is instrumented, every endpoint is secured, every pipeline is monitored.
              </p>
            </div>
            <div className="border border-dark-green-tint-1 p-3 md:p-4 bg-dark-green/10">
              <span className="text-[8px] md:text-[9px] tracking-widest text-lime uppercase font-bold font-mono">TIMEZONE</span>
              <p className="text-[10px] md:text-xs text-green-off-white-2 mt-2 leading-relaxed">
                Based in Nairobi, GMT+3. Available for remote contracts across all time zones with async-first communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}