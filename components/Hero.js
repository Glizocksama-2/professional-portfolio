import { contact } from '@/lib/data';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-between p-8 relative overflow-hidden bg-black">
      {/* Availability Badge */}
      <div className="z-10 self-start mt-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-dark-green text-[10px] text-lime font-bold tracking-widest uppercase border border-dark-green-tint-1">
          <span className="w-1.5 h-1.5 bg-lime rounded-full animate-ping"></span>
          AVAILABLE FOR FREELANCE PROJECTS
        </span>
      </div>

      {/* Asymmetric lockup: text left, portrait right-bleed */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-auto pt-24 relative">
        <div className="md:col-span-7 flex flex-col">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase">
            BRIAN<br />MUKWE<span className="text-lime">.</span>
          </h1>
          <p className="text-sm font-bold text-green-off-white-2 tracking-wide uppercase mt-4">
            Full-Stack Developer &amp; Freelancer
          </p>

          <div className="flex gap-4 mt-8">
            <a href="#projects" className="bg-white text-black px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-lime hover:text-black border border-white hover:border-lime transition-all duration-300">
              VIEW PROJECTS
            </a>
            <a
              href={contact.whatsapp('Hello Brian, I would like to discuss a project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-all duration-300"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div className="w-full h-[50vh] md:h-[65vh] bg-dark-green relative border border-dark-green-tint-1 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-luminosity" style={{ backgroundImage: "url('/brian_portrait.png')" }}></div>
            <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-widest uppercase font-semibold">
              [ BRIAN MUKWE WALIAULA • NAIROBI, KENYA ]
            </div>
          </div>
        </div>
      </div>

      {/* Stats Widget */}
      <div className="z-10 grid grid-cols-3 gap-6 bg-black/60 backdrop-blur-md border border-dark-green-tint-1 p-6 md:max-w-md w-full mt-8 mb-8">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-lime">10+</span>
          <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase mt-1">SHIPPED</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-lime">13</span>
          <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase mt-1">SERVICES</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-lime">20+</span>
          <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase mt-1">CERTS</span>
        </div>
      </div>
    </section>
  );
}
