import React from 'react';
import { processSteps } from '@/lib/content';

export default function ProcessSection() {
  return (
    <section id="process" className="px-8 py-24 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ HOW WE WORK TOGETHER ]</span>
          <h2 className="text-4xl font-extrabold uppercase">The Process</h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {processSteps.map((s) => (
            <li key={s.step} className="border border-line p-6 bg-surface-2/10 hover:border-accent transition-colors">
              <span className="text-3xl font-black text-accent">{s.step}</span>
              <h3 className="text-lg font-bold uppercase mt-3">{s.title}</h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
