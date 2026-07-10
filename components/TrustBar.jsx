import React from 'react';
import { trustItems } from '@/lib/content';

// Strip of client/project names right under the hero — instant credibility
export default function TrustBar() {
  return (
    <section aria-label="Clients and credentials" className="border-y border-line bg-surface-2/40 px-8 py-5">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3">
        {trustItems.map((item) => (
          <span key={item} className="text-[10px] tracking-[0.25em] uppercase font-bold text-muted">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
