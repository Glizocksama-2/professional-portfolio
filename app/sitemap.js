import { projects, SITE_URL } from '@/lib/content';

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    { url: `${SITE_URL}/cv`, lastModified: new Date(), priority: 0.6 },
    { url: `${SITE_URL}/now`, lastModified: new Date(), priority: 0.5 },
    { url: `${SITE_URL}/uses`, lastModified: new Date(), priority: 0.5 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
