'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhotoReveal() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const captionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        }
      });

      // Image reveal: scale down from zoomed + clip-path wipe
      tl.fromTo(imageRef.current, 
        { 
          scale: 1.4, 
          clipPath: 'inset(50% 0% 50% 0%)',
          filter: 'brightness(0.3) contrast(1.3)',
        },
        { 
          scale: 1.0, 
          clipPath: 'inset(0% 0% 0% 0%)',
          filter: 'brightness(1) contrast(1)',
          duration: 1,
          ease: 'power2.out',
        },
        0
      );

      // Overlay fade out
      tl.fromTo(overlayRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6 },
        0.3
      );

      // Caption line draw
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power2.out' },
        0.4
      );

      // Caption text reveal
      tl.fromTo(captionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-8 py-20 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
            />
            
            {/* Cinematic overlay */}
            <div 
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black pointer-events-none"
              style={{ willChange: 'opacity' }}
            />
            
            {/* Film grain texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
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
            <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase font-mono">
              BRIAN MUKWE WALIAULA // NAIROBI, KE
            </span>
          </div>
        </div>

        {/* Summary Side - Right */}
        <div ref={captionRef} className="md:col-span-7 flex flex-col gap-8" style={{ willChange: 'transform, opacity' }}>
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ BIO PROFILE ]</span>
          
          <p className="text-xl md:text-3xl text-white font-sans leading-relaxed font-bold">
            I deploy secure full-stack applications, automated scrapers, payment gateways, and custom telemetry interfaces. From database security parameters to fluid web layouts, I handle complete system lifecycles.
          </p>

          <span className="text-[10px] tracking-widest text-lime uppercase font-bold mt-4">[ LOGIC SPECIFICATION ]</span>
          <blockquote className="font-sans text-green-off-white-1 text-2xl md:text-3xl leading-tight border-l-2 border-lime pl-6 italic">
            "Reliability is built on continuous telemetry, clean separation of concerns, and verified code execution."
          </blockquote>

          {/* Working style indicators */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border border-dark-green-tint-1 p-4 bg-dark-green/10">
              <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">APPROACH</span>
              <p className="text-xs text-green-off-white-2 mt-2 leading-relaxed">
                Systems-first thinking. Every deployment is instrumented, every endpoint is secured, every pipeline is monitored.
              </p>
            </div>
            <div className="border border-dark-green-tint-1 p-4 bg-dark-green/10">
              <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">TIMEZONE</span>
              <p className="text-xs text-green-off-white-2 mt-2 leading-relaxed">
                Based in Nairobi, GMT+3. Available for remote contracts across all time zones with async-first communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
