'use client';

import React, { useState, useEffect, useRef } from 'react';

// Scroll progress bar (top) + back-to-top button, sharing one rAF-throttled listener
export default function ScrollExtras() {
  const barRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        setShowTop(window.scrollY > 600);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-50"
        style={{ transform: 'scaleX(0)' }}
      />
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Back to top"
          className="fixed bottom-20 md:bottom-8 right-6 z-40 w-11 h-11 border border-line bg-surface text-accent hover:bg-lime hover:text-black transition-colors font-bold"
        >
          ↑
        </button>
      )}
    </>
  );
}
