import { techStacks } from '@/lib/data';

export default function TechStack() {
  return (
    <section id="tech" className="px-8 py-24 bg-dark-green border-y border-dark-green-tint-1">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ CURRENT TECH STACK ]</span>
        {/* Asymmetric: 6 groups in a 12-col zig-zag, no 3-equal-rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {techStacks.map((stk, idx) => (
            <div
              key={idx}
              className={`border border-dark-green-tint-1 p-6 bg-black/30 ${
                idx % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5'
              }`}
            >
              <h3 className="text-xs font-bold tracking-widest uppercase text-lime mb-4">{stk.group}</h3>
              <div className="flex flex-wrap gap-2">
                {stk.items.map((item, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 bg-black text-green-off-white-1 uppercase font-semibold">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
