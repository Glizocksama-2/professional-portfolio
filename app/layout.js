import { Mona_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { bio, SITE_URL } from '@/lib/content';
import CommandPalette from '@/components/CommandPalette';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import ScrollExtras from '@/components/ScrollExtras';
import MobileBottomNav from '@/components/MobileBottomNav';

const monaSans = Mona_Sans({
  subsets: ['latin'],
  variable: '--font-mona-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Brian Mukwe Waliaula | Full-Stack Developer & Freelancer',
  description:
    'Portfolio of Brian Mukwe Waliaula, a full-stack developer in Nairobi, Kenya. Web design, automation pipelines, payment integrations (M-Pesa, Pesapal, Instasend), and AI-powered systems.',
  openGraph: {
    title: 'Brian Mukwe Waliaula | Full-Stack Developer & Freelancer',
    description:
      'Full-stack developer in Nairobi, Kenya — web design, automation, payment integrations, and AI systems.',
    type: 'website',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: bio.name,
  jobTitle: bio.role,
  email: `mailto:${bio.email}`,
  telephone: bio.phoneE164,
  url: SITE_URL,
  sameAs: [bio.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
};

// Applies the saved theme before first paint to avoid a flash of wrong theme
const themeInit = `try{var t=localStorage.getItem('bm-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${monaSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollExtras />
        <CommandPalette />
        <KeyboardShortcuts />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
