import { Mona_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Brian Mukwe Waliaula | Full-Stack Developer & Freelancer',
  description:
    'Portfolio of Brian Mukwe Waliaula, a full-stack developer in Nairobi, Kenya. Web design, automation pipelines, payment integrations (M-Pesa, Pesapal, Instasend), and AI-powered systems.',
  openGraph: {
    title: 'Brian Mukwe Waliaula | Full-Stack Developer & Freelancer',
    description:
      'Full-stack developer in Nairobi, Kenya — web design, automation, payment integrations, and AI systems.',
    type: 'website',
    images: ['/brian_portrait.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${monaSans.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
