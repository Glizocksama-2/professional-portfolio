'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { navSections, projects } from '@/lib/content';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(
    () => [
      ...navSections.map((s) => ({ label: `Go to ${s.label}`, action: () => (window.location.hash = `#${s.id}`) })),
      ...projects.map((p) => ({ label: `Project: ${p.title}`, action: () => (window.location.href = `/projects/${p.slug}`) })),
      { label: 'Download CV', action: () => (window.location.href = '/cv') },
      { label: 'Email Brian', action: () => (window.location.href = 'mailto:brianmukwe097@gmail.com') },
      {
        label: 'Toggle theme',
        action: () => {
          const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
          document.documentElement.dataset.theme = next;
          localStorage.setItem('bm-theme', next);
        },
      },
    ],
    []
  );

  const filtered = useMemo(
    () => items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setActive(0);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const runItem = (item) => {
    setOpen(false);
    item.action();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] bg-black/70 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="w-full max-w-lg mx-4 border border-line bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === 'Enter' && filtered[active]) runItem(filtered[active]);
          }}
          placeholder="Type a command or search..."
          aria-label="Search commands"
          className="w-full bg-transparent border-b border-line px-5 py-4 text-sm text-body outline-none placeholder:text-muted"
        />
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-5 py-3 text-xs text-muted uppercase tracking-widest">No results</li>
          )}
          {filtered.map((item, i) => (
            <li key={item.label}>
              <button
                onClick={() => runItem(item)}
                onMouseEnter={() => setActive(i)}
                className={`w-full text-left px-5 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors ${
                  i === active ? 'bg-lime text-black' : 'text-body'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-line px-5 py-2 text-[9px] tracking-widest uppercase text-muted">
          ↑↓ NAVIGATE · ENTER SELECT · ESC CLOSE
        </div>
      </div>
    </div>
  );
}
