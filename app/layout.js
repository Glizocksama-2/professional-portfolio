import './globals.css';

export const metadata = {
  title: 'Brian Mukwe Waliaula | Professional Motorsport Portfolio',
  description: 'WebGL-driven athlete portfolio website of Brian Mukwe Waliaula, racing driver. Built with Next.js, R3F, and GSAP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
