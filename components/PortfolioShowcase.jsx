'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectArt from '@/components/ProjectArt';
import { projects } from '@/lib/content';

// sample.html "Our Portfolio" pattern: tall visual cards with a slide-up
// label on hover, click opens a lightbox with prev/next navigation.
export default function PortfolioShowcase() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const step = useCallback(
    (dir) => setLightboxIdx((i) => (i === null ? null : (i + dir + projects.length) % projects.length)),
    []
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, close, step]);

  const active = lightboxIdx !== null ? projects[lightboxIdx] : null;

  return (
    <section id="showcase" className="px-8 py-24 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ VISUAL INDEX ]</span>
          <h2 className="text-4xl font-extrabold uppercase">Portfolio Wall</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((proj, idx) => (
            <button
              key={proj.slug}
              onClick={() => setLightboxIdx(idx)}
              aria-label={`Open ${proj.title} in viewer`}
              className="group relative h-64 md:h-[420px] border border-line overflow-hidden bg-black text-left hover:border-accent transition-colors"
            >
              {proj.screenshot ? (
                <Image
                  src={proj.screenshot}
                  alt={`Screenshot of ${proj.title}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:-translate-y-6 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <ProjectArt seed={proj.title} />
                </div>
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-lime text-black text-[10px] tracking-widest uppercase font-bold px-4 py-3">
                VIEW PROJECT → {proj.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} viewer`}
          onClick={close}
        >
          <div className="w-full max-w-4xl border border-line bg-surface" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-line">
              <h3 className="text-sm font-bold uppercase tracking-widest">
                <span className="text-accent mr-2">{active.num}</span>{active.title}
              </h3>
              <button onClick={close} aria-label="Close viewer" className="text-muted hover:text-accent text-lg">✕</button>
            </div>
            <div className="relative h-[50vh] bg-black">
              {active.screenshot ? (
                <Image src={active.screenshot} alt={`Screenshot of ${active.title}`} fill sizes="(min-width: 896px) 896px, 100vw" className="object-contain" />
              ) : (
                <ProjectArt seed={active.title} />
              )}
              <button onClick={() => step(-1)} aria-label="Previous project" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface border border-line text-accent hover:bg-lime hover:text-black transition-colors font-bold">‹</button>
              <button onClick={() => step(1)} aria-label="Next project" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface border border-line text-accent hover:bg-lime hover:text-black transition-colors font-bold">›</button>
            </div>
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-line">
              <p className="text-xs text-muted leading-relaxed md:max-w-lg">{active.desc}</p>
              <Link href={`/projects/${active.slug}`} className="shrink-0 bg-lime text-black px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity text-center">
                FULL CASE STUDY
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
