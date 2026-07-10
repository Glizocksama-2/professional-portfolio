'use client';

import React, { useState, useEffect } from 'react';

export default function NairobiClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-KE', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Nairobi',
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="text-[10px] tracking-widest uppercase font-bold text-muted">
      [ NAIROBI {time} EAT ]
    </span>
  );
}
