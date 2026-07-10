'use client';

import React, { useState, useEffect } from 'react';
import { navSections } from '@/lib/content';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function fireConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const chars = ['◆', '▲', '●', '■'];
  const colors = ['#d2ff00', '#ff6b00', '#dde1d2', '#b2c73a'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('span');
    el.textContent = chars[i % chars.length];
    Object.assign(el.style, {
      position: 'fixed',
      left: `${Math.random() * 100}vw`,
      top: '-5vh',
      color: colors[i % colors.length],
      fontSize: `${10 + Math.random() * 16}px`,
      zIndex: 9999,
      pointerEvents: 'none',
      transition: `transform ${2 + Math.random() * 2}s linear, opacity 3s linear`,
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 4500);
  }
}

export default function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    let konamiIdx = 0;
    const onKey = (e) => {
      // Konami tracking runs everywhere
      konamiIdx = e.key === KONAMI[konamiIdx] ? konamiIdx + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        fireConfetti();
      }

      // Plain-key shortcuts must not fire while typing or with modifiers held
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === '?') {
        e.preventDefault();
        setHelpOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setHelpOpen(false);
      } else if (e.key >= '1' && e.key <= String(navSections.length)) {
        const section = navSections[Number(e.key) - 1];
        if (section) window.location.hash = `#${section.id}`;
      } else if (e.key === '/') {
        e.preventDefault();
        window.location.hash = '#contact';
        document.getElementById('name')?.focus();
      } else if (e.key === 'Home') {
        window.scrollTo({ top: 0 });
      } else if (e.key === 'End') {
        window.scrollTo({ top: document.documentElement.scrollHeight });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!helpOpen) return null;

  const rows = [
    ['Ctrl / ⌘ + K', 'Command palette'],
    ...navSections.map((s, i) => [String(i + 1), `Jump to ${s.label}`]),
    ['/', 'Focus contact form'],
    ['?', 'This cheat sheet'],
    ['Home / End', 'Top / bottom of page'],
    ['↑↑↓↓←→←→BA', '???'],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => setHelpOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div className="w-full max-w-md border border-line bg-surface p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ KEYBOARD SHORTCUTS ]</span>
          <button onClick={() => setHelpOpen(false)} aria-label="Close" className="text-muted hover:text-accent">✕</button>
        </div>
        <table className="w-full text-xs">
          <tbody>
            {rows.map(([key, desc]) => (
              <tr key={key} className="border-b border-line/50">
                <td className="py-2 pr-4 font-mono text-accent whitespace-nowrap">{key}</td>
                <td className="py-2 text-body uppercase tracking-wider text-[10px] font-bold">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
