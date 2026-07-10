'use client';

import React, { useRef } from 'react';

// 3D tilt + cursor spotlight on hover. Inert on touch / reduced-motion.
export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const canAnimate = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !canAnimate()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 4}deg) rotateX(${(0.5 - py) * 4}deg)`;
    el.style.setProperty('--spot-x', `${px * 100}%`);
    el.style.setProperty('--spot-y', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight-card transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
