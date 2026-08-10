import { contact } from '@/lib/data';

export default function Nav() {
  return (
    <nav className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-dark-green-tint-1 z-40 px-8 py-4 flex justify-between items-center">
      <div className="text-xl font-extrabold tracking-tighter uppercase">
        BRIAN MUKWE<span className="text-lime">.</span>
      </div>
      <div className="hidden md:flex gap-8 text-[11px] tracking-widest uppercase font-bold text-green-off-white-2">
        <a href="#about" className="hover:text-lime transition-colors">ABOUT</a>
        <a href="#services" className="hover:text-lime transition-colors">SERVICES</a>
        <a href="#projects" className="hover:text-lime transition-colors">PROJECTS</a>
        <a href="#tech" className="hover:text-lime transition-colors">TECH STACK</a>
        <a href="#credentials" className="hover:text-lime transition-colors">CREDENTIALS</a>
      </div>
      <a
        href={contact.whatsapp('Hello Brian, I would like to discuss a project.')}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-lime text-black px-6 py-2 font-bold uppercase tracking-wider text-[10px] hover:bg-transparent hover:text-lime border border-lime transition-all duration-300"
      >
        HIRE ME
      </a>
    </nav>
  );
}
