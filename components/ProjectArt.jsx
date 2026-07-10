'use client';

import React, { useMemo } from 'react';

// Deterministic seeded PRNG — same project title always renders the same art
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const PALETTE = ['#d2ff00', '#b2c73a', '#dde1d2', '#3b3c38', '#535450', '#ff6b00'];

export default function ProjectArt({ seed, className = '' }) {
  const shapes = useMemo(() => {
    const rand = mulberry32(hashString(seed));
    const out = [];
    const count = 10 + Math.floor(rand() * 8);
    for (let i = 0; i < count; i++) {
      const kind = rand();
      const color = PALETTE[Math.floor(rand() * PALETTE.length)];
      const x = rand() * 400;
      const y = rand() * 200;
      const s = 8 + rand() * 60;
      if (kind < 0.35) {
        out.push({ type: 'rect', x, y, w: s * (0.5 + rand()), h: s * 0.5, color, o: 0.25 + rand() * 0.6, r: Math.floor(rand() * 4) * 45 });
      } else if (kind < 0.65) {
        out.push({ type: 'circle', x, y, s: s * 0.4, color, o: 0.25 + rand() * 0.6 });
      } else {
        out.push({ type: 'line', x, y, x2: x + (rand() - 0.5) * 200, y2: y + (rand() - 0.5) * 100, color, o: 0.3 + rand() * 0.5, w: 1 + rand() * 3 });
      }
    }
    return out;
  }, [seed]);

  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label={`Generative artwork for ${seed}`}
    >
      <rect width="400" height="200" fill="#111112" />
      {shapes.map((sh, i) =>
        sh.type === 'rect' ? (
          <rect key={i} x={sh.x} y={sh.y} width={sh.w} height={sh.h} fill={sh.color} opacity={sh.o} transform={`rotate(${sh.r} ${sh.x} ${sh.y})`} />
        ) : sh.type === 'circle' ? (
          <circle key={i} cx={sh.x} cy={sh.y} r={sh.s} fill="none" stroke={sh.color} strokeWidth="1.5" opacity={sh.o} />
        ) : (
          <line key={i} x1={sh.x} y1={sh.y} x2={sh.x2} y2={sh.y2} stroke={sh.color} strokeWidth={sh.w} opacity={sh.o} />
        )
      )}
      <text x="12" y="188" fill="#d2ff00" fontSize="9" fontFamily="monospace" letterSpacing="2" opacity="0.6">
        {`[ ${seed.toUpperCase()} ]`}
      </text>
    </svg>
  );
}
