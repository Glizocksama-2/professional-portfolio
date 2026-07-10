'use client';

import React, { useState, useEffect } from 'react';

// Types and deletes through a list of phrases with a blinking caret.
// Reduced-motion users get the first phrase as static text.
export default function TypedText({ phrases = [], className = '' }) {
  const [text, setText] = useState('');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setText(phrases[0] || '');
      return;
    }
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const phrase = phrases[phraseIdx];
      charIdx += deleting ? -1 : 1;
      setText(phrase.slice(0, charIdx));

      let delay = deleting ? 35 : 70;
      if (!deleting && charIdx === phrase.length) {
        deleting = true;
        delay = 2200; // linger on the full phrase
      } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className} aria-label={phrases[0]}>
      <span aria-hidden="true">{text}</span>
      {!reduced && <span aria-hidden="true" className="typed-caret">▌</span>}
    </span>
  );
}
