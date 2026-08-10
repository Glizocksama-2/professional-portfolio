import { contact } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="px-8 py-24 bg-dark-green border-y border-dark-green-tint-1 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
        <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ PERSONAL SUMMARY ]</span>
        <p className="text-lg md:text-2xl text-white leading-relaxed">
          I build performant systems, automated scraper tools, e-commerce networks, and clean frontend UI configurations. From initial DNS routing parameters to final database security rule optimizations, I handle complete full-stack project cycles.
        </p>

        <span className="text-[10px] tracking-widest text-lime uppercase font-bold mt-8">[ WORKING STYLE ]</span>
        <blockquote className="text-green-off-white-1 text-2xl md:text-4xl leading-tight">
          High performance is built on telemetry, structured routines, and precise specifications. Every pipeline must be monitored, and every database query optimized for speed.
        </blockquote>

        <div className="flex gap-6 mt-6 text-xs font-bold uppercase tracking-wider text-white">
          <a href={`mailto:${contact.email}`} className="hover:text-lime transition-colors">[ EMAIL ]</a>
          <a href={`tel:${contact.phoneRaw}`} className="hover:text-lime transition-colors">[ CALL ]</a>
          <a href="https://github.com/Glizocksama-2" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">[ GITHUB ]</a>
        </div>
      </div>
    </section>
  );
}
