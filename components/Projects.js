import { projects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="px-8 py-24 bg-black border-t border-dark-green-tint-1">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ COMPLETED SHIPS ]</span>
          <h2 className="text-4xl font-extrabold uppercase">17 Real Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
