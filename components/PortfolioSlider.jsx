'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import ProjectArt from '@/components/ProjectArt';
import { projects } from '@/lib/content';

// sample.html bottom slider: full-width auto-drifting strip of project
// visuals. rAF-driven, pauses on hover/touch, static under reduced-motion.
export default function PortfolioSlider() {
  const trackRef = useRef(null);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = trackRef.current;
    if (!track) return;
    let offset = 0;
    let raf;
    const tick = () => {
      if (!paused.current) {
        offset -= 0.5;
        const half = track.scrollWidth / 2;
        if (-offset >= half) offset += half;
        track.style.transform = `translateX(${offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const doubled = [...projects, ...projects];

  return (
    <section
      aria-label="Project visuals carousel"
      className="py-12 bg-surface-2 border-y border-line overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
    >
      <div ref={trackRef} className="flex gap-6 w-max px-6">
        {doubled.map((proj, i) => (
          <a
            key={`${proj.slug}-${i}`}
            href={`/projects/${proj.slug}`}
            aria-hidden={i >= projects.length}
            tabIndex={i >= projects.length ? -1 : 0}
            className="relative w-56 h-72 shrink-0 border border-line overflow-hidden bg-black hover:border-accent transition-colors"
          >
            {proj.screenshot ? (
              <Image src={proj.screenshot} alt={i < projects.length ? `Screenshot of ${proj.title}` : ''} fill sizes="224px" className="object-cover object-top" />
            ) : (
              <ProjectArt seed={proj.title} />
            )}
            <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] tracking-widest uppercase font-bold text-lime px-3 py-2">
              {proj.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
