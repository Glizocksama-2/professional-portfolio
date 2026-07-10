'use client';

import React, { useRef, useEffect } from 'react';

// Splits a heading into words (or letters) that rise in with a stagger
// when the heading scrolls into view. Screen readers get the plain text
// via aria-label; the animated spans are hidden from them.
export default function AnimatedHeading({
  text,
  as: Tag = 'h2',
  mode = 'word',
  className = '',
  stagger = 0.06,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('split-in');
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('split-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('split-in');
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    // Scroll fallback for environments where IO callbacks are throttled
    const fallback = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        el.classList.add('split-in');
        window.removeEventListener('scroll', fallback);
        io.disconnect();
      }
    };
    window.addEventListener('scroll', fallback, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', fallback);
    };
  }, []);

  const units = mode === 'letter' ? text.split('') : text.split(' ');

  return (
    <Tag ref={ref} className={`split-anim ${className}`} aria-label={text} {...props}>
      {units.map((unit, i) => (
        <span aria-hidden="true" key={i} className="split-clip">
          <span
            className="split-unit"
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {unit === ' ' ? ' ' : unit}
          </span>
          {mode === 'word' && i < units.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
