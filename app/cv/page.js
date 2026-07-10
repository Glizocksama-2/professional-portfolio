import Link from 'next/link';
import { bio, services, projects, techStacks, education, certifications } from '@/lib/content';

export const metadata = {
  title: `CV — ${bio.name}`,
  description: `Plain-text, ATS-friendly resume of ${bio.name}, ${bio.role}.`,
};

// Deliberately unstyled-looking: recruiters and ATS parsers read this easily,
// and the browser's print dialog produces a clean PDF.
export default function CvPage() {
  return (
    <main className="min-h-screen bg-white text-black font-mono text-sm px-6 py-12 print:p-0">
      <div className="max-w-2xl mx-auto whitespace-pre-wrap leading-relaxed">
        <div className="flex justify-between items-start mb-8 print:hidden">
          <Link href="/" className="underline">← back to site</Link>
          <span className="text-xs text-neutral-500">Ctrl+P to save as PDF</span>
        </div>

        <h1 className="text-xl font-bold">{bio.name.toUpperCase()}</h1>
        <p>{bio.role}</p>
        <p>{bio.location} · {bio.email} · {bio.phone}</p>
        <p>{bio.github}</p>

        <h2 className="font-bold mt-8 border-b border-black">SUMMARY</h2>
        <p className="mt-2">{bio.summary}</p>

        <h2 className="font-bold mt-8 border-b border-black">SELECTED PROJECTS</h2>
        {projects.map((p) => (
          <div key={p.slug} className="mt-3">
            <p className="font-bold">{p.title} — {p.role}</p>
            <p>{p.desc}</p>
            <p className="text-neutral-600">Stack: {p.tags.join(', ')}</p>
          </div>
        ))}

        <h2 className="font-bold mt-8 border-b border-black">TECHNICAL SKILLS</h2>
        {techStacks.map((s) => (
          <p key={s.group} className="mt-2">{s.group}: {s.items.join(', ')}</p>
        ))}

        <h2 className="font-bold mt-8 border-b border-black">SERVICES OFFERED</h2>
        <p className="mt-2">{services.map((s) => s.title).join(' · ')}</p>

        <h2 className="font-bold mt-8 border-b border-black">EDUCATION</h2>
        {education.map((e) => (
          <p key={e.school} className="mt-2">{e.school} — {e.detail}</p>
        ))}

        <h2 className="font-bold mt-8 border-b border-black">CERTIFICATIONS (ANTHROPIC)</h2>
        <p className="mt-2">{certifications.join(' · ')}</p>
      </div>
    </main>
  );
}
