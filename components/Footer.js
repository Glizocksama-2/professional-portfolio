import { contact } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="py-12 px-8 bg-black border-t border-dark-green-tint-1">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-extrabold tracking-tighter uppercase">
            BRIAN MUKWE<span className="text-lime">.</span>
          </div>
          <p className="text-xs text-green-off-white-2 uppercase tracking-widest">Full-Stack Developer &amp; Freelancer — Nairobi, Kenya</p>
        </div>
        <div className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wider text-white">
          <a href={`mailto:${contact.email}`} className="hover:text-lime transition-colors">[ EMAIL ]</a>
          <a href={contact.whatsapp('Hello Brian, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">[ WHATSAPP ]</a>
          <a href="https://github.com/Glizocksama-2" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">[ GITHUB ]</a>
        </div>
      </div>
    </footer>
  );
}
