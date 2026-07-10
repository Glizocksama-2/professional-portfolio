'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Marquee({ textItems = [] }) {
  const containerRef = useRef();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        duration: 15,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const half = (keyPrefix) => (
    // Each half carries its own trailing gap (pr-12 matches gap-12) so the
    // -50% loop point lands exactly on the seam with no visible jump.
    <div className="flex whitespace-nowrap gap-12 pr-12" aria-hidden={keyPrefix === 'b'}>
      {textItems.map((text, idx) => (
        <span key={`${keyPrefix}-${idx}`} className="flex items-center gap-6">
          <span>{text}</span>
          <span className="w-2.5 h-2.5 bg-lime rounded-full"></span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="w-full overflow-hidden border-y border-dark-green-tint-1 py-6 bg-black relative">
      <div className="marquee-inner flex text-2xl font-bold uppercase tracking-widest text-green-off-white-2">
        {half('a')}
        {half('b')}
      </div>
    </div>
  );
}
