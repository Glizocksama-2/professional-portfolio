'use client';

import React, { useState } from 'react';
import { faqs } from '@/lib/content';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="px-8 py-24">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ COMMON QUESTIONS ]</span>
          <h2 className="text-4xl font-extrabold uppercase">FAQ</h2>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, idx) => {
            const open = openIdx === idx;
            return (
              <div key={faq.q} className="border-b border-line">
                <button
                  onClick={() => setOpenIdx(open ? null : idx)}
                  aria-expanded={open}
                  className="w-full flex justify-between items-center gap-6 py-5 text-left group"
                >
                  <span className="text-sm md:text-base font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
                    {faq.q}
                  </span>
                  <span aria-hidden="true" className={`text-accent font-black text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted leading-relaxed pb-6 pr-10">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
