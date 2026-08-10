import { certificates } from '@/lib/data';

export default function Credentials() {
  return (
    <section id="credentials" className="px-8 py-24 bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ ACADEMIC DEVELOPMENT ]</span>
          <div>
            <h3 className="text-2xl font-bold uppercase text-white">Daystar University</h3>
            <p className="text-sm text-green-off-white-2 mt-2 leading-relaxed">
              Diploma in Human Resources
              <br />
              Certificate in Business Management (Graduated 2024)
            </p>
          </div>
          <div className="border-t border-dark-green-tint-1 pt-6">
            <h3 className="text-2xl font-bold uppercase text-white">Upper Hill School</h3>
            <p className="text-sm text-green-off-white-2 mt-2">Kenya Certificate of Secondary Education (KCSE)</p>
          </div>

          <div className="border-t border-dark-green-tint-1 pt-6 flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ VERIFIABLE CREDENTIALS ]</span>
            <div
              className="w-full h-48 bg-cover bg-center border border-dark-green-tint-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: "url('/certificates_grid.png')" }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ ANTHROPIC CERTIFICATIONS (20+) ]</span>
          <div className="h-80 overflow-y-auto border border-dark-green-tint-1 p-6 bg-dark-green/10 flex flex-col gap-2 mb-4">
            {certificates.map((cert, idx) => (
              <div key={idx} className="text-xs text-white uppercase font-bold border-b border-dark-green-tint-2/40 pb-2">
                [ {cert} ]
              </div>
            ))}
          </div>

          <div
            className="w-full h-40 bg-cover bg-center border border-dark-green-tint-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundImage: "url('/anthropic_certificates.png')" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
