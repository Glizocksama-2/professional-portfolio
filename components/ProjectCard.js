'use client';

import dynamic from 'next/dynamic';

const HelmetCanvas = dynamic(() => import('@/components/HelmetCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[250px] flex items-center justify-center bg-dark-green-tint-1 animate-pulse">
      <div className="text-lime text-[10px] tracking-widest uppercase">LOADING 3D SYSTEM...</div>
    </div>
  ),
});

export default function ProjectCard({ project }) {
  const link = project.website || project.repo;
  const linkLabel = project.website ? 'VIEW LIVE SITE' : 'VIEW REPOSITORY';

  return (
    <div className={`border border-dark-green-tint-1 p-8 bg-dark-green/5 flex flex-col justify-between hover:border-lime transition-all duration-500 ${project.featured ? 'md:col-span-2' : ''}`}>
      <div>
        <div className="flex justify-between items-start">
          <span className="text-3xl font-black text-lime">{project.num}</span>
          <span className="text-[10px] tracking-widest text-green-off-white-2 uppercase font-bold">{project.role}</span>
        </div>

        <h3 className="text-2xl font-bold uppercase mt-4 text-white">{project.title}</h3>

        <div className="w-full h-48 my-6 relative overflow-hidden bg-black border border-dark-green-tint-1">
          {project.screenshot ? (
            <div
              className="w-full h-full bg-cover bg-top opacity-90 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: `url('${project.screenshot}')` }}
            ></div>
          ) : (
            <HelmetCanvas styleName={project.canvasStyle} />
          )}
        </div>

        <p className="text-sm text-green-off-white-2 leading-relaxed mt-2">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((t, i) => (
            <span key={i} className="text-[9px] tracking-wider uppercase bg-dark-green px-2.5 py-1 text-lime font-bold">{t}</span>
          ))}
        </div>
      </div>

      {link && (
        <div className="mt-8 border-t border-dark-green-tint-1 pt-6 flex justify-end">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-lime hover:text-white transition-colors"
          >
            {linkLabel} →
          </a>
        </div>
      )}
    </div>
  );
}
