'use client';

import { useEffect } from 'react';

// Staggered fade+rise reveal for every section as it scrolls into view.
// Classes are added from JS only, so content is never hidden without JS
// (SEO/no-script safe), and reduced-motion users get no movement at all.
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sections = Array.from(document.querySelectorAll('main section'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-80px 0px', threshold: 0.05 }
    );

    sections.forEach((s) => {
      // Sections already on screen at load (hero) skip the effect
      if (s.getBoundingClientRect().top > window.innerHeight * 0.9) {
        s.classList.add('reveal-pending');
        observer.observe(s);
      }
    });

    // Safety net: IO callbacks can be throttled indefinitely in hidden
    // tabs — on scroll, reveal anything already past the viewport check
    const fallback = () => {
      document.querySelectorAll('section.reveal-pending').forEach((s) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.95) {
          s.classList.remove('reveal-pending');
          s.classList.add('reveal-in');
          observer.unobserve(s);
        }
      });
    };
    window.addEventListener('scroll', fallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', fallback);
    };
  }, []);

  return null;
}
