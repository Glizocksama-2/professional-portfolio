'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Marquee({ textItems = [] }) {
  const containerRef = useRef();
  const innerRef = useRef();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden border-y border-dark-green-tint-1 py-6 bg-black relative">
      <div ref={innerRef} className="marquee-inner flex whitespace-nowrap gap-12 text-2xl font-bold uppercase tracking-widest text-green-off-white-2">
        {/* Double the list to create a seamless infinite loop scroll */}
        {textItems.concat(textItems).map((text, idx) => (
          <span key={idx} className="flex items-center gap-6">
            <span>{text}</span>
            <span className="w-2.5 h-2.5 bg-lime rounded-full"></span>
          </span>
        ))}
      </div>
    </div>
  );
}