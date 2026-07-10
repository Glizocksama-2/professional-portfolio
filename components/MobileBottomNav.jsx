'use client';

import React from 'react';

const ITEMS = [
  { id: 'hero', label: 'HOME', icon: '⌂' },
  { id: 'services', label: 'WORK', icon: '◆' },
  { id: 'projects', label: 'SHIPS', icon: '▣' },
  { id: 'contact', label: 'HIRE', icon: '✉' },
];

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface/95 backdrop-blur-md border-t border-line grid grid-cols-4"
    >
      {ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="flex flex-col items-center gap-0.5 py-2.5 text-body hover:text-accent transition-colors"
        >
          <span aria-hidden="true" className="text-sm leading-none">{item.icon}</span>
          <span className="text-[8px] tracking-widest font-bold">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
