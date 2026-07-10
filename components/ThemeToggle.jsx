'use client';

import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('bm-theme', next);
    setTheme(next);
  };

  // Render nothing until hydrated so server/client markup match
  if (!theme) return <span className="w-9 h-9 inline-block" />;

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className="w-9 h-9 inline-flex items-center justify-center border border-line text-accent hover:bg-lime hover:text-black transition-colors text-sm"
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
