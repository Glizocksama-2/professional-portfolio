import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, bio } from '@/lib/content';
import ProjectArt from '@/components/ProjectArt';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study | ${bio.name}`,
    description: project.desc,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-surface text-body px-8 py-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <Link href="/#projects" className="text-[10px] tracking-widest uppercase font-bold text-accent hover:text-body transition-colors">
          ← BACK TO ALL PROJECTS
        </Link>

        <div>
          <div className="flex justify-between items-start">
            <span className="text-4xl font-black text-accent">{project.num}</span>
            <span className="text-[10px] tracking-widest text-muted uppercase font-bold">{project.role}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mt-4">{project.title}</h1>
        </div>

        <div className="w-full h-64 md:h-80 relative border border-line overflow-hidden bg-black">
          {project.screenshot ? (
            <Image src={project.screenshot} alt={`Screenshot of ${project.title}`} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover object-top" priority />
          ) : (
            <ProjectArt seed={project.title} />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-[9px] tracking-wider uppercase bg-black px-2.5 py-1 text-lime font-bold">{t}</span>
          ))}
        </div>

        {['problem', 'solution', 'result'].map((key) => (
          <section key={key}>
            <h2 className="text-[10px] tracking-widest text-accent uppercase font-bold mb-3">
              [ {key === 'problem' ? 'THE PROBLEM' : key === 'solution' ? 'WHAT I BUILT' : 'THE RESULT'} ]
            </h2>
            <p className="text-base md:text-lg leading-relaxed">{project.caseStudy[key]}</p>
          </section>
        ))}

        <div className="flex gap-4 border-t border-line pt-8">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-lime text-black px-6 py-3 font-bold uppercase tracking-wider text-xs hover:opacity-80 transition-opacity">
            VIEW REPOSITORY
          </a>
          <Link href="/#contact" className="border border-line px-6 py-3 font-bold uppercase tracking-wider text-xs hover:border-accent hover:text-accent transition-colors">
            HIRE ME FOR SIMILAR WORK
          </Link>
        </div>

        <div className="border-t border-line pt-8">
          <h2 className="text-[10px] tracking-widest text-accent uppercase font-bold mb-4">[ MORE PROJECTS ]</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="border border-line p-5 hover:border-accent transition-colors">
                <span className="text-lg font-black text-accent">{p.num}</span>
                <h3 className="font-bold uppercase mt-1">{p.title}</h3>
                <p className="text-xs text-muted mt-2 line-clamp-2">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
