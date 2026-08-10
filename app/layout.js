import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Brian Mukwe | Full-Stack Developer & Freelancer — Nairobi, Kenya',
  description:
    'Full-stack developer in Nairobi building performant web systems: React frontends, Supabase backends, M-Pesa/Pesapal payment gateways, AI automations, and SEO-tuned landing pages.',
  keywords: [
    'Brian Mukwe',
    'full-stack developer Kenya',
    'freelance developer Nairobi',
    'M-Pesa integration',
    'Supabase developer',
    'React developer Kenya',
  ],
  openGraph: {
    title: 'Brian Mukwe | Full-Stack Developer & Freelancer',
    description:
      'Custom web systems, payment gateways, and AI automations built in Nairobi, Kenya.',
    type: 'website',
    locale: 'en_KE',
  },
};

export const viewport = {
  themeColor: '#111112',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
