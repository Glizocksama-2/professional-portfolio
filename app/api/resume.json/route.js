import { NextResponse } from 'next/server';
import { bio, projects, techStacks, education, certifications, SITE_URL } from '@/lib/content';

// JSON Resume schema — https://jsonresume.org/schema
export function GET() {
  return NextResponse.json({
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: bio.name,
      label: bio.role,
      email: bio.email,
      phone: bio.phoneE164,
      url: SITE_URL,
      summary: bio.summary,
      location: { city: 'Nairobi', countryCode: 'KE' },
      profiles: [{ network: 'GitHub', username: 'Glizocksama-2', url: bio.github }],
    },
    projects: projects.map((p) => ({
      name: p.title,
      description: p.desc,
      keywords: p.tags,
      url: p.github,
      roles: [p.role],
    })),
    skills: techStacks.map((s) => ({ name: s.group, keywords: s.items })),
    education: education.map((e) => ({ institution: e.school, area: e.detail })),
    certificates: certifications.map((c) => ({ name: c, issuer: 'Anthropic' })),
  });
}
