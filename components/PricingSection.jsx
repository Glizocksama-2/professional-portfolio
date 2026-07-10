import React from 'react';
import { pricingTiers } from '@/lib/content';

export default function PricingSection() {
  return (
    <section id="pricing" className="px-8 py-24 bg-surface-2 border-y border-line">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ PACKAGES & PRICING ]</span>
          <h2 className="text-4xl font-extrabold uppercase">What it costs</h2>
          <p className="text-sm text-muted max-w-xl">
            Every project starts with a written scope. Prices below are starting points — the scope call is free either way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between p-8 border transition-colors ${
                tier.featured
                  ? 'border-lime bg-surface relative'
                  : 'border-line bg-surface/30 hover:border-accent'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 bg-lime text-black text-[9px] tracking-widest uppercase font-bold px-3 py-1">
                  MOST POPULAR
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold uppercase">{tier.name}</h3>
                <p className="text-xs text-muted uppercase tracking-wider mt-1">{tier.tagline}</p>
                <p className="text-3xl font-black text-accent mt-6">{tier.price}</p>
                <ul className="mt-8 flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-muted flex gap-3 leading-snug">
                      <span className="text-accent font-bold shrink-0">→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                className={`mt-10 text-center py-3 font-bold uppercase tracking-wider text-xs transition-all duration-300 ${
                  tier.featured
                    ? 'bg-lime text-black border border-lime hover:opacity-80'
                    : 'border border-line hover:border-accent hover:text-accent'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
