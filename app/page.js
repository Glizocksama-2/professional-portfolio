'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '@/components/Marquee';

// Register GSAP ScrollTrigger on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Lazy-load R3F components below the fold for performance
const HelmetCanvas = dynamic(() => import('@/components/HelmetCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[250px] flex items-center justify-center bg-dark-green-tint-1 animate-pulse">
      <div className="text-lime text-[10px] tracking-widest uppercase">LOADING 3D SYSTEM...</div>
    </div>
  )
});

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef();

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // 1. Text slide-up reveals for headlines
      gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.fromTo(text, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'power4.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 2. Interactive card hover tilting and magnetic triggers
      gsap.utils.toArray('.magnetic-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(card, {
            x: x * 0.15,
            y: y * 0.15,
            rotateX: -y * 0.05,
            rotateY: x * 0.05,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out'
          });
        });
      });

      // 3. Section wipe transitions
      gsap.utils.toArray('.wipe-section').forEach((sec) => {
        gsap.fromTo(sec,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'top top',
              scrub: true
            }
          }
        );
      });

      // 4. Parallax background offsets
      gsap.utils.toArray('.parallax-bg').forEach((bg) => {
        gsap.to(bg, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: bg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // 5. Scroll progress update for Three.js rotations
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { title: 'Web Design', desc: 'Custom, premium typography and aesthetic grid structures.' },
    { title: 'Frontend', desc: 'Vibrant, high-performance React layouts with fluid animations.' },
    { title: 'Backend', desc: 'Robust server routing, API logic, and scalable architectures.' },
    { title: 'Full-Stack Development', desc: 'End-to-end web deployment linking databases and clients.' },
    { title: 'Systems Architecture', desc: 'Secure database setups, DNS config, and reverse proxies.' },
    { title: 'Landing Pages', desc: 'Highly optimized page-speed configurations and layouts.' },
    { title: 'Payment Gateway', desc: 'Integration of East African gateways (Pesapal, M-Pesa, Instasend).' },
    { title: 'SEO', desc: 'Structuring search indexing parameters and core vitals audits.' },
    { title: 'Security', desc: 'Supabase Row-Level Security rules and user authorization setups.' },
    { title: 'AI Automations', desc: 'Timed scrapers, Groq/Claude integrations, and telegram alerts.' },
    { title: 'Prompt Engineering', desc: 'Optimizing context structures and workflow system parameters.' },
    { title: 'Consultancy', desc: 'Technical guidance, infrastructure debugging, and design scoping.' },
    { title: 'AI Learning & Training', desc: 'Guiding organizations on AI integration and agent skills.' }
  ];

  const projects = [
    {
      num: '01',
      title: 'Fareast Ventures',
      role: 'Systems Developer',
      desc: 'Premium Nairobi chauffeur platform featuring automated booking pipelines, real-time emails, Instasend payments routing, and comprehensive SEO performance tuning.',
      tags: ['React', 'Tailwind CSS', 'Instasend', 'SEO Audit'],
      github: 'https://github.com/Glizocksama-2/far-east-ventures',
      screenshot: '/fareast_screenshot.png'
    },
    {
      num: '02',
      title: 'Saka Wera',
      role: 'Workflow Automator',
      desc: 'Automated job application matching engine powered by n8n. Scrapes major local boards, processes relevancy with Groq LLM filters, and fires alerts to Telegram.',
      tags: ['n8n', 'Groq AI', 'Telegram API', 'Automation'],
      github: 'https://github.com/Glizocksama-2',
      screenshot: '/threadlite_screenshot.png'
    },
    {
      num: '03',
      title: 'Shamba Command Center',
      role: 'Full-Stack Developer',
      desc: 'Dual-frontend farm records and inventory command database, comprising a React/Vite dashboard and a Flutter Android app featuring local Google ML Kit text OCR.',
      tags: ['React', 'Flutter', 'Firebase', 'Google ML Kit'],
      github: 'https://github.com/Glizocksama-2/birunda-farm',
      screenshot: '/shamba_screenshot.png'
    },
    {
      num: '04',
      title: 'GOROSEI',
      role: 'Full-Stack Developer',
      desc: 'Streetwear e-commerce storefront. Replaced hardcoded authorization parameters with secure Supabase Auth and strict Row-Level Security database controls.',
      tags: ['React', 'Supabase Auth', 'Row-Level Security', 'UX Design'],
      github: 'https://github.com/Glizocksama-2',
      screenshot: '/gorosei_screenshot.png'
    },
    {
      num: '05',
      title: 'LifeRPG',
      role: 'Developer',
      desc: 'Single-file gamified habit tracker PWA with SVG avatar layering, mood logs, and an AI coach proxy routing keys via Netlify serverless functions.',
      tags: ['React PWA', 'Netlify Functions', 'Groq API', 'Local Storage'],
      github: 'https://github.com/Glizocksama-2/rpgstats',
      screenshot: '/liferpg_screenshot.png'
    },
    {
      num: '06',
      title: 'Megatron',
      role: 'Developer',
      desc: 'Personal AI Chief of Staff agent scraping daily developer trends, conducting system health tests every 30 minutes, and alerting via Telegram channels.',
      tags: ['n8n', 'Telegram Alerts', 'Render Hosting', 'System Scraper'],
      github: 'https://github.com/Glizocksama-2',
      canvasStyle: 'Industrial Red'
    },
    {
      num: '07',
      title: 'Water & Sanitation NPO',
      role: 'Full-Stack Developer',
      desc: 'Six-page donor coordination hub accepting international USD cards settled to local banks via Pesapal API, with automated Resend transactional alerts.',
      tags: ['HTML/CSS', 'Pesapal API', 'Resend', 'AI Help Widget'],
      github: 'https://github.com/Glizocksama-2',
      canvasStyle: 'Fluid Aqua'
    },
    {
      num: '08',
      title: 'EStarz FC',
      role: 'Mobile Developer',
      desc: 'Android application for sports club tracking, integrating user registrations, validation, and structured WhatsApp sales pipelines.',
      tags: ['Kotlin', 'Material Design', 'Android SDK', 'Input Validation'],
      github: 'https://github.com/Glizocksama-2',
      canvasStyle: 'Sport Royal'
    },
    {
      num: '09',
      title: 'Northwatch',
      role: 'Full-Stack Developer',
      desc: 'Tactical personal ledger command deck. Local-first architecture built to synchronize task management, financial monitoring, and credential auditing indicators.',
      tags: ['React', 'Local-First', 'Telemetry', 'Ledger Engine'],
      github: 'https://github.com/Glizocksama-2',
      screenshot: '/northwatch_screenshot.png'
    },
    {
      num: '10',
      title: 'Kenyan Tax Intelligence',
      role: 'Systems Developer',
      desc: 'Interactive tax advisory and compliance intelligence dashboard. Integrates real-time KRA calculators, PAYE/VAT trackers, and a virtual compliance chatbot assisting local businesses.',
      tags: ['React', 'KRA Rules', 'AI Assistant', 'Tax Analytics'],
      github: 'https://github.com/Glizocksama-2',
      screenshot: '/tax_screenshot.png'
    }
  ];

  const techStacks = [
    { group: 'Frontend', items: ['React', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'] },
    { group: 'Backend', items: ['Node.js', 'Express', 'n8n pipelines', 'PostgreSQL', 'Supabase'] },
    { group: 'Mobile', items: ['Kotlin', 'Android SDK', 'Flutter', 'Method Channels'] },
    { group: 'AI & Automation', items: ['Groq API', 'Claude API', 'Telegram Bot API', 'System Scraping'] },
    { group: 'Infrastructure', items: ['Docker', 'Docker Compose', 'Render', 'Netlify', 'Nginx', 'DNS Setup'] },
    { group: 'Payments', items: ['Pesapal Routing', 'Instasend API', 'M-Pesa Integrations'] }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('SUCCESS');
    setContactForm({ name: '', email: '', service: '', message: '' });
  };

  return (
    <main ref={mainRef} className="w-full bg-black min-h-screen text-white overflow-x-hidden selection:bg-lime selection:text-black">
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-dark-green-tint-1 z-40 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-extrabold tracking-tighter uppercase font-sans">
          BRIAN MUKWE<span className="text-lime">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] tracking-widest uppercase font-bold text-green-off-white-2">
          <a href="#about" className="hover:text-lime transition-colors">ABOUT</a>
          <a href="#services" className="hover:text-lime transition-colors">SERVICES</a>
          <a href="#projects" className="hover:text-lime transition-colors">PROJECTS</a>
          <a href="#tech" className="hover:text-lime transition-colors">TECH STACK</a>
          <a href="#credentials" className="hover:text-lime transition-colors">CREDENTIALS</a>
        </div>
        <a 
          href="#contact" 
          className="bg-lime text-black px-6 py-2 font-bold uppercase tracking-wider text-[10px] hover:bg-transparent hover:text-lime border border-lime transition-all duration-300"
        >
          HIRE ME
        </a>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between p-8 relative overflow-hidden bg-black">
        {/* Availability Badge */}
        <div className="z-10 self-start mt-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-dark-green text-[10px] text-lime font-bold tracking-widest uppercase border border-dark-green-tint-1">
            <span className="w-1.5 h-1.5 bg-lime rounded-full animate-ping"></span>
            AVAILABLE FOR FREELANCE PROJECTS
          </span>
        </div>

        {/* Center Portrait */}
        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
          <div className="w-[85vw] md:w-[45vw] h-[70vh] bg-dark-green relative border border-dark-green-tint-1 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-luminosity parallax-bg" 
              style={{ backgroundImage: "url('/brian_portrait.png')" }}
            ></div>
            <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-widest uppercase font-semibold z-10 bg-black/40 px-2 py-1">
              [ BRIAN MUKWE WALIAULA • NAIROBI, KENYA ]
            </div>
          </div>
        </div>

        {/* Title Grid */}
        <div className="z-10 flex flex-col md:flex-row justify-between items-end w-full mt-auto gap-8 pt-24">
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase reveal-text">
              BRIAN<br />MUKWE<span className="text-lime">.</span>
            </h1>
            <p className="text-sm font-bold text-green-off-white-2 tracking-wide uppercase mt-4">
              Full-Stack Developer &amp; Freelancer
            </p>
          </div>

          {/* Stats Widget */}
          <div className="grid grid-cols-3 gap-6 bg-black/60 backdrop-blur-md border border-dark-green-tint-1 p-6 md:max-w-md w-full z-10">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-lime">10</span>
              <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase mt-1">SHIPPED</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-lime">13</span>
              <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase mt-1">SERVICES</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-lime">20+</span>
              <span className="text-[9px] tracking-widest text-green-off-white-2 uppercase mt-1">CERTS</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="z-10 flex gap-4 mt-8 pb-12">
          <a href="#projects" className="bg-white text-black px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-lime hover:text-black border border-white hover:border-lime transition-all duration-300">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="border border-white text-white px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-all duration-300">
            GET IN TOUCH
          </a>
        </div>
      </section>

      {/* 31.51vh Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* About Section */}
      <section id="about" className="px-8 py-24 bg-dark-green border-y border-dark-green-tint-1 relative overflow-hidden wipe-section">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ PERSONAL SUMMARY ]</span>
          <p className="text-lg md:text-2xl text-white font-sans leading-relaxed reveal-text">
            I build performant systems, automated scraper tools, e-commerce networks, and clean frontend UI configurations. From initial DNS routing parameters to final database security rule optimizations, I handle complete full-stack project cycles.
          </p>

          <span className="text-[10px] tracking-widest text-lime uppercase font-bold mt-8">[ WORKING STYLE ]</span>
          <blockquote className="font-brier text-green-off-white-1 text-2xl md:text-4xl leading-tight reveal-text">
            "High performance is built on telemetry, structured routines, and precise specifications. Every pipeline must be monitored, and every database query optimized for speed."
          </blockquote>

          <div className="flex gap-6 mt-6 text-xs font-bold uppercase tracking-wider text-white">
            <a href="mailto:brianmukwe097@gmail.com" className="hover:text-lime transition-colors">[ EMAIL ]</a>
            <a href="tel:+254792300552" className="hover:text-lime transition-colors">[ CALL ]</a>
            <a href="https://github.com/Glizocksama-2" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">[ GITHUB ]</a>
          </div>
        </div>
      </section>

      {/* 31.51vh Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Services Section */}
      <section id="services" className="px-8 py-24 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ SERVICES & CORE COMPETENCIES ]</span>
            <h2 className="text-4xl font-extrabold uppercase reveal-text">13 Service Areas</h2>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <div 
                key={idx} 
                className={`border border-dark-green-tint-1 p-8 bg-dark-green/10 flex flex-col justify-between hover:border-lime transition-all duration-300 ${
                  idx % 4 === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  <span className="text-[10px] tracking-widest text-lime uppercase font-bold">AREA {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <h3 className="text-xl font-bold uppercase mt-2 text-white">{srv.title}</h3>
                </div>
                <p className="text-sm text-green-off-white-2 mt-4 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 31.51vh Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Projects Section */}
      <section id="projects" className="px-8 py-24 bg-black border-t border-dark-green-tint-1 wipe-section">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ COMPLETED SHIPS ]</span>
            <h2 className="text-4xl font-extrabold uppercase reveal-text">10 Real Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <div key={idx} className="border border-dark-green-tint-1 p-8 bg-dark-green/5 flex flex-col justify-between hover:border-lime transition-all duration-500 magnetic-card">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-3xl font-black text-lime">{proj.num}</span>
                    <span className="text-[10px] tracking-widest text-green-off-white-2 uppercase font-bold">{proj.role}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold uppercase mt-4 text-white">{proj.title}</h3>
                  
                  <div className="w-full h-48 my-6 relative overflow-hidden bg-black border border-dark-green-tint-1">
                    {proj.screenshot ? (
                      <div 
                        className="w-full h-full bg-cover bg-top opacity-90 hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundImage: `url('${proj.screenshot}')` }}
                      ></div>
                    ) : (
                      <HelmetCanvas scrollProgress={scrollProgress} styleName={proj.canvasStyle} />
                    )}
                  </div>

                  <p className="text-sm text-green-off-white-2 leading-relaxed mt-2">{proj.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="text-[9px] tracking-wider uppercase bg-dark-green px-2.5 py-1 text-lime font-bold">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-dark-green-tint-1 pt-6 flex justify-end">
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold uppercase tracking-widest text-lime hover:text-white transition-colors"
                  >
                    VIEW REPOSITORY →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 31.51vh Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Tech Stack Section */}
      <section id="tech" className="px-8 py-24 bg-dark-green border-y border-dark-green-tint-1">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ CURRENT TECH STACK ]</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStacks.map((stk, idx) => (
              <div key={idx} className="border border-dark-green-tint-1 p-6 bg-black/30">
                <h3 className="text-xs font-bold tracking-widest uppercase text-lime mb-4">{stk.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {stk.items.map((item, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-black text-green-off-white-1 uppercase font-semibold">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 31.51vh Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Credentials Section */}
      <section id="credentials" className="px-8 py-24 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ ACADEMIC DEVELOPMENT ]</span>
            <div>
              <h3 className="text-2xl font-bold uppercase text-white">Daystar University</h3>
              <p className="text-sm text-green-off-white-2 mt-2 leading-relaxed">
                • Diploma in Human Resources<br />
                • Certificate in Business Management (Graduated 2024)
              </p>
            </div>
            <div className="border-t border-dark-green-tint-1 pt-6">
              <h3 className="text-2xl font-bold uppercase text-white">Upper Hill School</h3>
              <p className="text-sm text-green-off-white-2 mt-2">Kenya Certificate of Secondary Education (KCSE)</p>
            </div>
            
            <div className="border-t border-dark-green-tint-1 pt-6 flex flex-col gap-4">
              <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ OBSIDIAN GRAPH KNOWLEDGE BASE ]</span>
              <div 
                className="w-full h-80 bg-contain bg-center bg-no-repeat border border-dark-green-tint-1 opacity-90 hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: "url('/graph_view.png')" }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ ANTHROPIC CERTIFICATIONS (20+) ]</span>
            <div className="h-80 overflow-y-auto border border-dark-green-tint-1 p-6 bg-dark-green/10 flex flex-col gap-2 mb-4">
              {[
                'Claude 101', 'Claude Code 101', 'Claude Platform 101', 'Introduction to Claude Cowork', 
                'Claude Code in Action', 'AI Fluency: Framework and Foundations', 'Building with Claude API', 
                'Introduction to Model Context Protocol', 'AI Fluency for Educators', 'AI Fluency for Students', 
                'Model Context Protocol: Advanced Topics', 'Claude with Amazon Bedrock', 'Claude with Google Cloud Vertex AI', 
                'Teaching AI Fluency', 'AI Fluency for Non Profits', 'Introduction to Agent Skills', 
                'Introduction to Subagents', 'AI Capabilities and Limitations', 'AI Fluency for Small Businesses', 
                'AI Fluency for Builders'
              ].map((cert, idx) => (
                <div key={idx} className="text-xs text-white uppercase font-bold border-b border-dark-green-tint-2/40 pb-2">
                  [ {cert} ]
                </div>
              ))}
            </div>

            <div 
              className="w-full h-40 bg-cover bg-center border border-dark-green-tint-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: "url('/anthropic_certificates.png')" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-12 bg-black border-t border-dark-green-tint-1">
        <Marquee textItems={['REACT', 'NEXT.JS', 'TAILWIND CSS', 'SUPABASE', 'DOCKER', 'N8N AUTOMATION', 'POSTGRESQL', 'FLUTTER']} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-24 bg-dark-green border-t border-dark-green-tint-1">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ CONTACT DETAILS ]</span>
            <h2 className="text-3xl font-extrabold uppercase">GET IN TOUCH</h2>
            <p className="text-sm text-green-off-white-2 leading-relaxed">
              If you have a project requiring payment integration, system automation, or dynamic React deployment pipelines, submit the form or reach out directly.
            </p>
            <div className="flex flex-col gap-2 text-xs font-bold uppercase text-white mt-4">
              <span>Email: brianmukwe097@gmail.com</span>
              <span>Phone: +254 792 300 552</span>
              <span>Location: Nairobi, Kenya — GMT+3</span>
            </div>
          </div>

          {/* Inquiry Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 bg-black/40 border border-dark-green-tint-1 p-6">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ INQUIRY FORM ]</span>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[9px] tracking-widest uppercase font-bold text-green-off-white-2">Name</label>
              <input 
                id="name"
                type="text" 
                name="name" 
                value={contactForm.name} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 px-4 py-2 text-sm text-white focus:border-lime focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[9px] tracking-widest uppercase font-bold text-green-off-white-2">Email</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                value={contactForm.email} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 px-4 py-2 text-sm text-white focus:border-lime focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="service" className="text-[9px] tracking-widest uppercase font-bold text-green-off-white-2">Service Required</label>
              <select 
                id="service"
                name="service" 
                value={contactForm.service} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 px-4 py-2 text-sm text-white focus:border-lime focus:outline-none"
              >
                <option value="">Select a service...</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-[9px] tracking-widest uppercase font-bold text-green-off-white-2">Message</label>
              <textarea 
                id="message"
                name="message" 
                rows="4" 
                value={contactForm.message} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 p-4 text-sm text-white focus:border-lime focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              className="bg-lime text-black py-3 font-bold uppercase tracking-wider text-xs border border-lime hover:bg-transparent hover:text-lime transition-all duration-300"
            >
              SEND INQUIRY
            </button>

            {submitStatus === 'SUCCESS' && (
              <span className="text-xs text-lime uppercase font-bold text-center mt-2">[ INQUIRY RECEIVED SUCCESSFUL ]</span>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-dark-green-tint-1 py-16 px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tighter text-lime text-center border-b border-dark-green-tint-1 pb-12">
            ALWAYS BRINGING THE FIGHT.
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest text-lime uppercase font-bold">DIRECTORY</span>
              <a href="#hero" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ HOME ]</a>
              <a href="#about" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ ABOUT ]</a>
              <a href="#services" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ SERVICES ]</a>
              <a href="#projects" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ PROJECTS ]</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest text-lime uppercase font-bold">COMMUNITIES</span>
              <a href="https://github.com/Glizocksama-2" target="_blank" rel="noopener noreferrer" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ GITHUB ]</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest text-lime uppercase font-bold">LEGAL</span>
              <a href="#privacy" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ PRIVACY POLICY ]</a>
              <a href="#terms" className="text-sm text-green-off-white-2 hover:text-white transition-colors">[ TERMS &amp; CONDITIONS ]</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-dark-green-tint-1 pt-8 text-[10px] text-green-off-white-2 uppercase">
            <span>© 2026 Brian Mukwe Waliaula. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
