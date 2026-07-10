import Link from 'next/link';
import { bio, uses } from '@/lib/content';

export const metadata = {
  title: `Uses — ${bio.name}`,
  description: `Tools, stack, and setup ${bio.name} uses daily.`,
};

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-surface text-body px-8 py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <Link href="/" className="text-[10px] tracking-widest uppercase font-bold text-accent hover:text-body transition-colors">← HOME</Link>
        <h1 className="text-4xl font-black uppercase">Uses</h1>
        <p className="text-xs text-muted uppercase tracking-widest">The tools I work with daily · uses.tech convention</p>
        {uses.map((group) => (
          <section key={group.group}>
            <h2 className="text-[10px] tracking-widest text-accent uppercase font-bold mb-3">[ {group.group.toUpperCase()} ]</h2>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="text-xs px-3 py-1.5 border border-line uppercase font-semibold">{item}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
