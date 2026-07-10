import React from 'react';

// CSS-animated SVG scenes of people at work, in the site palette.
// Pure transforms/opacity (GPU-only); the global reduced-motion rule
// freezes them automatically. variant: 'coder' | 'ops'
export default function WorkingScene({ variant = 'coder', className = '' }) {
  if (variant === 'ops') {
    return (
      <svg viewBox="0 0 320 200" className={`w-full h-auto ${className}`} role="img" aria-label="Illustration of an engineer monitoring servers">
        <rect width="320" height="200" fill="none" />
        {/* Server rack */}
        <rect x="30" y="40" width="90" height="130" fill="#282c20" stroke="#3b3c38" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="38" y={50 + i * 30} width="74" height="20" fill="#111112" stroke="#3b3c38" />
            <circle cx="48" cy={60 + i * 30} r="3" fill="#d2ff00" className={`scene-led scene-led-${i % 3}`} />
            <circle cx="60" cy={60 + i * 30} r="3" fill="#ff6b00" className={`scene-led scene-led-${(i + 1) % 3}`} />
            <rect x="72" y={56 + i * 30} width="32" height="2.5" fill="#535450" />
            <rect x="72" y={62 + i * 30} width="24" height="2.5" fill="#535450" />
          </g>
        ))}
        {/* Engineer with laptop */}
        <g className="scene-bob">
          <circle cx="215" cy="86" r="14" fill="#b4b8a5" />
          <rect x="200" y="102" width="30" height="42" rx="4" fill="#282c20" stroke="#3b3c38" />
        </g>
        {/* Laptop */}
        <rect x="238" y="118" width="44" height="28" fill="#111112" stroke="#3b3c38" />
        <rect x="242" y="122" width="26" height="2.5" fill="#d2ff00" className="scene-line scene-line-0" />
        <rect x="242" y="128" width="34" height="2.5" fill="#535450" className="scene-line scene-line-1" />
        <rect x="242" y="134" width="20" height="2.5" fill="#535450" className="scene-line scene-line-2" />
        <rect x="234" y="146" width="52" height="4" fill="#3b3c38" />
        {/* Floor + signal */}
        <line x1="20" y1="172" x2="300" y2="172" stroke="#3b3c38" strokeWidth="1.5" />
        <g className="scene-pulse">
          <path d="M130 60 q10 -18 20 0" fill="none" stroke="#d2ff00" strokeWidth="1.5" />
          <path d="M126 66 q14 -30 28 0" fill="none" stroke="#d2ff00" strokeWidth="1" opacity="0.5" />
        </g>
        <text x="30" y="190" fill="#b4b8a5" fontSize="8" fontFamily="monospace" letterSpacing="2">[ SYSTEMS MONITORED 24/7 ]</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className={`w-full h-auto ${className}`} role="img" aria-label="Illustration of a developer coding at a desk">
      <rect width="320" height="200" fill="none" />
      {/* Desk */}
      <line x1="20" y1="150" x2="300" y2="150" stroke="#3b3c38" strokeWidth="2" />
      <line x1="50" y1="150" x2="50" y2="185" stroke="#3b3c38" strokeWidth="2" />
      <line x1="270" y1="150" x2="270" y2="185" stroke="#3b3c38" strokeWidth="2" />
      {/* Monitor */}
      <rect x="130" y="62" width="110" height="72" fill="#111112" stroke="#3b3c38" strokeWidth="1.5" />
      <rect x="178" y="134" width="14" height="10" fill="#3b3c38" />
      <rect x="160" y="144" width="50" height="4" fill="#3b3c38" />
      {/* Code lines typing on screen */}
      <rect x="138" y="72" width="56" height="3" fill="#d2ff00" className="scene-line scene-line-0" />
      <rect x="138" y="81" width="80" height="3" fill="#535450" className="scene-line scene-line-1" />
      <rect x="146" y="90" width="64" height="3" fill="#535450" className="scene-line scene-line-2" />
      <rect x="146" y="99" width="42" height="3" fill="#b2c73a" className="scene-line scene-line-3" />
      <rect x="138" y="108" width="72" height="3" fill="#535450" className="scene-line scene-line-4" />
      <rect x="138" y="117" width="30" height="3" fill="#d2ff00" className="scene-line scene-line-5" />
      {/* Developer */}
      <g className="scene-bob">
        <circle cx="85" cy="82" r="15" fill="#b4b8a5" />
        <path d="M62 150 q4 -46 23 -50 q19 4 23 50 z" fill="#282c20" stroke="#3b3c38" />
      </g>
      {/* Typing arms */}
      <g className="scene-type">
        <line x1="100" y1="120" x2="128" y2="140" stroke="#b4b8a5" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Keyboard */}
      <rect x="118" y="142" width="46" height="5" rx="2" fill="#3b3c38" />
      {/* Coffee with steam */}
      <rect x="248" y="136" width="14" height="14" fill="#282c20" stroke="#3b3c38" />
      <g className="scene-steam" opacity="0.6">
        <path d="M252 130 q2 -5 0 -9" fill="none" stroke="#b4b8a5" strokeWidth="1.2" />
        <path d="M258 130 q-2 -6 0 -11" fill="none" stroke="#b4b8a5" strokeWidth="1.2" />
      </g>
      <text x="20" y="190" fill="#b4b8a5" fontSize="8" fontFamily="monospace" letterSpacing="2">[ SHIPPING SINCE SUNRISE ]</text>
    </svg>
  );
}
