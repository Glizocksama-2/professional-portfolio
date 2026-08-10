import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Credentials from '@/components/Credentials';
import Marquee from '@/components/Marquee';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full bg-black min-h-screen text-white overflow-x-hidden selection:bg-lime selection:text-black">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Projects />
      <TechStack />
      <Credentials />
      <Marquee textItems={['REACT', 'NEXT.JS', 'TAILWIND CSS', 'SUPABASE', 'DOCKER', 'N8N AUTOMATION', 'POSTGRESQL', 'FLUTTER']} />
      <Contact />
      <Footer />
    </main>
  );
}
