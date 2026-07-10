'use client';

import React, { useRef } from 'react';

// Wraps a link/button so it subtly follows the cursor. No-op on touch devices
// and for users who prefer reduced motion.
export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null);

  const canAnimate = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (!ref.current || !canAnimate()) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
