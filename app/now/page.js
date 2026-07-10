import Link from 'next/link';
import { bio, nowItems } from '@/lib/content';

export const metadata = {
  title: `Now — ${bio.name}`,
  description: `What ${bio.name} is working on right now.`,
};

export default function NowPage() {
  return (
    <main className="min-h-screen bg-surface text-body px-8 py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <Link href="/" className="text-[10px] tracking-widest uppercase font-bold text-accent hover:text-body transition-colors">← HOME</Link>
        <h1 className="text-4xl font-black uppercase">What I&apos;m doing now</h1>
        <p className="text-xs text-muted uppercase tracking-widest">Updated July 2026 · inspired by nownownow.com</p>
        <ul className="flex flex-col gap-4">
          {nowItems.map((item) => (
            <li key={item} className="border border-line p-5 text-sm leading-relaxed">
              <span className="text-accent font-bold mr-2">→</span>{item}
            </li>
          ))}
        </ul>
        <Link href="/#contact" className="self-start bg-lime text-black px-6 py-3 font-bold uppercase tracking-wider text-xs hover:opacity-80 transition-opacity">
          WORK WITH ME
        </Link>
      </div>
    </main>
  );
}
