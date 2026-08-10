import { services } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="px-8 py-24 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ SERVICES & CORE COMPETENCIES ]</span>
          <h2 className="text-4xl font-extrabold uppercase">13 Service Areas</h2>
        </div>

        {/* Asymmetric Bento — 12-col grid, no 3-equal-rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className={`border border-dark-green-tint-1 p-8 bg-dark-green/10 flex flex-col justify-between hover:border-lime transition-all duration-300 ${
                idx % 4 === 0 ? 'md:col-span-7' : idx % 4 === 1 ? 'md:col-span-5' : idx % 4 === 2 ? 'md:col-span-5' : 'md:col-span-7'
              }`}
            >
              <div>
                <span className="text-[10px] tracking-widest text-lime uppercase font-bold">AREA {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                <h3 className="text-xl font-bold uppercase mt-2 text-white">{srv.title}</h3>
              </div>
              <p className="text-sm text-green-off-white-2 mt-4 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
