import './globals.css';

export const metadata = {
  title: 'Brian Mukwe Waliaula | Full-Stack Developer & Freelancer',
  description: 'WebGL-driven professional portfolio of Brian Mukwe Waliaula, featuring advanced system automations, telemetry, and React apps.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" id="root-wrapper">
        {children}
      </body>
    </html>
  );
}
