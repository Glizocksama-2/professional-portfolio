'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '@/components/Marquee';
import PhotoReveal from '@/components/PhotoReveal';
import { CrowdCanvas } from '@/components/v1/skiper39';
import { TextRoll } from '@/components/v1/skiper58';
import { StickyCard002 } from '@/components/v1/skiper17';
import { ReactLenis } from 'lenis/react';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Lazy load 3D components
const HeroCenterpiece = dynamic(() => import('@/components/HeroCenterpiece'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-black">
      <div className="text-lime text-[10px] tracking-widest uppercase font-mono animate-pulse">
        [ SYSTEM BOOTING... ]
      </div>
    </div>
  )
});

const ProjectsSlider3D = dynamic(() => import('@/components/ProjectsSlider3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-black">
      <div className="text-lime text-[10px] tracking-widest uppercase font-mono animate-pulse">
        [ CALCULATING 3D CODES... ]
      </div>
    </div>
  )
});

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('all');
  const [certPage, setCertPage] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const mainRef = useRef();


  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Stagger Reveal for all sections
      gsap.utils.toArray('.stagger-reveal').forEach((section) => {
        gsap.fromTo(section.querySelectorAll('.reveal-child'), 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.0, 
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 2. Global Scroll progress updates
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
    { title: 'Web Design', category: 'design', desc: 'Custom, premium typography and aesthetic grid structures.' },
    { title: 'Frontend', category: 'design', desc: 'Vibrant, high-performance React layouts with fluid animations.' },
    { title: 'Backend', category: 'systems', desc: 'Robust server routing, API logic, and scalable architectures.' },
    { title: 'Full-Stack Development', category: 'systems', desc: 'End-to-end web deployment linking databases and clients.' },
    { title: 'Systems Architecture', category: 'systems', desc: 'Secure database setups, DNS config, and reverse proxies.' },
    { title: 'Landing Pages', category: 'design', desc: 'Highly optimized page-speed configurations and layouts.' },
    { title: 'Payment Gateway', category: 'systems', desc: 'Integration of East African gateways (Pesapal, M-Pesa, Instasend).' },
    { title: 'SEO', category: 'design', desc: 'Structuring search indexing parameters and core vitals audits.' },
    { title: 'Security', category: 'systems', desc: 'Supabase Row-Level Security rules and user authorization setups.' },
    { title: 'AI Automations', category: 'ai', desc: 'Timed scrapers, Groq/Claude integrations, and telegram alerts.' },
    { title: 'Prompt Engineering', category: 'ai', desc: 'Optimizing context structures and workflow system parameters.' },
    { title: 'Consultancy', category: 'ai', desc: 'Technical guidance, infrastructure debugging, and design scoping.' },
    { title: 'AI Learning & Training', category: 'ai', desc: 'Guiding organizations on AI integration and agent skills.' }
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
      screenshot: null
    },
    {
      num: '07',
      title: 'Water & Sanitation NPO',
      role: 'Full-Stack Developer',
      desc: 'Six-page donor coordination hub accepting international USD cards settled to local banks via Pesapal API, with automated Resend transactional alerts.',
      tags: ['HTML/CSS', 'Pesapal API', 'Resend', 'AI Help Widget'],
      github: 'https://github.com/Glizocksama-2',
      screenshot: null
    },
    {
      num: '08',
      title: 'EStarz FC',
      role: 'Mobile Developer',
      desc: 'Android application for sports club tracking, integrating user registrations, validation, and structured WhatsApp sales pipelines.',
      tags: ['Kotlin', 'Material Design', 'Android SDK', 'Input Validation'],
      github: 'https://github.com/Glizocksama-2',
      screenshot: null
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

  const certifications = [
    'Claude 101', 'Claude Code 101', 'Claude Platform 101', 'Introduction to Claude Cowork', 
    'Claude Code in Action', 'AI Fluency: Framework and Foundations', 'Building with Claude API', 
    'Introduction to Model Context Protocol', 'AI Fluency for Educators', 'AI Fluency for Students', 
    'Model Context Protocol: Advanced Topics', 'Claude with Amazon Bedrock', 'Claude with Google Cloud Vertex AI', 
    'Teaching AI Fluency', 'AI Fluency for Non Profits', 'Introduction to Agent Skills', 
    'Introduction to Subagents', 'AI Capabilities and Limitations', 'AI Fluency for Small Businesses', 
    'AI Fluency for Builders'
  ];

  const techStacks = [
    { group: 'Frontend', items: ['React', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'] },
    { group: 'Backend', items: ['Node.js', 'Express', 'n8n pipelines', 'PostgreSQL', 'Supabase'] },
    { group: 'Mobile', items: ['Kotlin', 'Android SDK', 'Flutter', 'Method Channels'] },
    { group: 'AI & Automation', items: ['Groq API', 'Claude API', 'Telegram Bot API', 'System Scraping'] },
    { group: 'Infrastructure', items: ['Docker', 'Docker Compose', 'Render', 'Netlify', 'Nginx', 'DNS Setup'] },
    { group: 'Payments', items: ['Pesapal Routing', 'Instasend API', 'M-Pesa Integrations'] }
  ];

  // Filtering logic for Services
  const filteredServices = activeServiceTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeServiceTab);

  // Pagination logic for Certifications (6 per page)
  const certsPerPage = 6;
  const totalCertPages = Math.ceil(certifications.length / certsPerPage);
  const paginatedCerts = certifications.slice(certPage * certsPerPage, (certPage + 1) * certsPerPage);

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
    <ReactLenis root>
      <main ref={mainRef} className="w-full bg-black min-h-screen text-white overflow-x-hidden selection:bg-lime selection:text-black">
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-dark-green-tint-1 z-40 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-extrabold tracking-tighter uppercase font-sans">
          BRIAN MUKWE<span className="text-lime">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-widest uppercase font-bold text-green-off-white-2">
          <a href="#about" className="hover:text-lime transition-colors">
            <TextRoll>ABOUT</TextRoll>
          </a>
          <a href="#services" className="hover:text-lime transition-colors">
            <TextRoll>SERVICES</TextRoll>
          </a>
          <a href="#projects" className="hover:text-lime transition-colors">
            <TextRoll>PROJECTS</TextRoll>
          </a>
          <a href="#tech" className="hover:text-lime transition-colors">
            <TextRoll>TECH</TextRoll>
          </a>
          <a href="#credentials" className="hover:text-lime transition-colors">
            <TextRoll>CREDENTIALS</TextRoll>
          </a>
        </div>
        <a 
          href="#contact" 
          className="bg-lime text-black px-6 py-2.5 font-bold uppercase tracking-wider text-[10px] hover:bg-transparent hover:text-lime border border-lime transition-all duration-300"
        >
          HIRE ME
        </a>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between p-8 relative overflow-hidden bg-black stagger-reveal">
        <div className="z-10 self-start mt-4 reveal-child">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-dark-green text-[9px] text-lime font-bold tracking-widest uppercase border border-dark-green-tint-1">
            <span className="w-1.5 h-1.5 bg-lime rounded-full animate-ping"></span>
            AVAILABLE FOR CONTRACTS
          </span>
        </div>

        {/* Animated Crowd Canvas */}
        <div className="absolute inset-0 w-full h-[95vh] z-0 pointer-events-none">
          <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
        </div>

        <div className="z-10 flex flex-col md:flex-row justify-between items-end w-full mt-auto gap-8 pt-24 pb-8 reveal-child">
          <div className="flex flex-col">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase">
              BRIAN<br />MUKWE<span className="text-lime">.</span>
            </h1>
            <p className="text-xs font-bold text-green-off-white-2 tracking-widest uppercase mt-4">
              FULL-STACK DEVELOPER &amp; TELEMETRY ENGINEER
            </p>
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-3 gap-8 bg-black/85 border border-dark-green-tint-1 p-6 md:max-w-sm w-full">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-lime">10</span>
              <span className="text-[8px] tracking-widest text-green-off-white-2 uppercase mt-1">SHIPS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-lime">13</span>
              <span className="text-[8px] tracking-widest text-green-off-white-2 uppercase mt-1">SERVICES</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-lime">20+</span>
              <span className="text-[8px] tracking-widest text-green-off-white-2 uppercase mt-1">CERTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Photo + Bio Section (replaces old About) */}
      <section id="about">
        <PhotoReveal />
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 py-20 bg-black border-t border-dark-green-tint-1 stagger-reveal">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 reveal-child">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ SERVICES & CORE COMPETENCIES ]</span>
            <h2 className="text-4xl font-extrabold uppercase">13 Service Areas</h2>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap gap-3 reveal-child">
            {['all', 'design', 'systems', 'ai'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveServiceTab(tab)}
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                  activeServiceTab === tab 
                    ? 'bg-lime text-black border-lime' 
                    : 'bg-transparent text-white border-dark-green-tint-1 hover:border-lime'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filtered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-child">
            {filteredServices.map((srv, idx) => (
              <div 
                key={idx} 
                className="border border-dark-green-tint-1 p-6 bg-dark-green/10 flex flex-col justify-between hover:border-lime transition-all duration-300"
              >
                <div>
                  <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">SPEC {idx + 1}</span>
                  <h3 className="text-lg font-bold uppercase mt-2 text-white">{srv.title}</h3>
                </div>
                <p className="text-xs text-green-off-white-2 mt-4 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - 3D Slider */}
      <section id="projects" className="px-8 py-20 bg-black border-t border-dark-green-tint-1 stagger-reveal">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 reveal-child">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ COMPLETED SHIPS ]</span>
            <h2 className="text-4xl font-extrabold uppercase">10 Real Projects</h2>
          </div>

          {/* High-Fidelity 3D Scroll Slider */}
          <div className="reveal-child">
            <ProjectsSlider3D projects={projects} />
          </div>
        </div>
      </section>

      {/* Visual Stack Showcase */}
      <section id="stack" className="bg-black border-t border-dark-green-tint-1 py-20 stagger-reveal">
        <div className="max-w-6xl mx-auto px-8 flex flex-col gap-2 reveal-child">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ SYSTEM INTERFACE STACK ]</span>
          <h2 className="text-4xl font-extrabold uppercase">Platform Viewports</h2>
          <p className="text-xs text-green-off-white-2 mt-2">
            Cinematic stacking telemetry showing our primary live dashboards and custom portal screenshots.
          </p>
        </div>
        <div className="mt-8 reveal-child">
          <StickyCard002 cards={[
            { id: 1, image: "/fareast_screenshot.png", alt: "Fareast Ventures" },
            { id: 2, image: "/shamba_screenshot.png", alt: "Shamba Command Center" },
            { id: 3, image: "/gorosei_screenshot.png", alt: "Gorosei Storefront" },
            { id: 4, image: "/northwatch_screenshot.png", alt: "Northwatch Ledger" },
            { id: 5, image: "/tax_screenshot.png", alt: "Kenyan Tax Intelligence" },
          ]} />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="px-8 py-20 bg-dark-green border-y border-dark-green-tint-1 stagger-reveal">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold reveal-child">[ CURRENT SYSTEM TOOLS ]</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-child">
            {techStacks.map((stk, idx) => (
              <div key={idx} className="border border-dark-green-tint-1 p-6 bg-black/40">
                <h3 className="text-xs font-bold tracking-widest uppercase text-lime mb-4">{stk.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {stk.items.map((item, i) => (
                    <span key={i} className="text-[11px] px-3 py-1.5 bg-black text-green-off-white-1 uppercase font-semibold">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="px-8 py-20 bg-black stagger-reveal">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 reveal-child">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ EDUCATION ]</span>
            <div>
              <h3 className="text-xl font-bold uppercase text-white font-sans">Daystar University</h3>
              <p className="text-xs text-green-off-white-2 mt-2 leading-relaxed">
                Diploma in Human Resources<br />
                Certificate in Business Management (Graduated 2024)
              </p>
            </div>
            <div className="border-t border-dark-green-tint-1 pt-6">
              <h3 className="text-xl font-bold uppercase text-white font-sans">Upper Hill School</h3>
              <p className="text-xs text-green-off-white-2 mt-2">Kenya Certificate of Secondary Education (KCSE)</p>
            </div>
            
            <div className="border-t border-dark-green-tint-1 pt-6 flex flex-col gap-4">
              <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ OBSIDIAN GRAPH KNOWLEDGE BASE ]</span>
              <div 
                className="w-full h-72 bg-contain bg-center bg-no-repeat border border-dark-green-tint-1 opacity-90 hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: "url('/graph_view.png')" }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col gap-4 reveal-child">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ CERTIFICATIONS (20+) ]</span>
            
            {/* Paginated Certs List */}
            <div className="border border-dark-green-tint-1 p-6 bg-dark-green/10 flex flex-col gap-3 min-h-[280px]">
              {paginatedCerts.map((cert, idx) => (
                <div key={idx} className="text-[11px] text-white uppercase font-bold border-b border-dark-green-tint-2/40 pb-2">
                  [ {cert} ]
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex gap-4 items-center justify-end text-xs">
              <button 
                disabled={certPage === 0}
                onClick={() => setCertPage(prev => Math.max(0, prev - 1))}
                className="px-3 py-1 bg-black border border-dark-green-tint-1 text-white disabled:opacity-40"
              >
                &lt; PREV
              </button>
              <span className="font-mono text-lime">{certPage + 1} / {totalCertPages}</span>
              <button 
                disabled={certPage === totalCertPages - 1}
                onClick={() => setCertPage(prev => Math.min(totalCertPages - 1, prev + 1))}
                className="px-3 py-1 bg-black border border-dark-green-tint-1 text-white disabled:opacity-40"
              >
                NEXT &gt;
              </button>
            </div>

            <div 
              className="w-full h-40 bg-cover bg-center border border-dark-green-tint-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: "url('/certificates_grid.png')" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-8 bg-black border-t border-dark-green-tint-1">
        <Marquee textItems={['REACT', 'NEXT.JS', 'TAILWIND CSS', 'SUPABASE', 'DOCKER', 'N8N AUTOMATION', 'POSTGRESQL', 'FLUTTER']} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-20 bg-dark-green border-t border-dark-green-tint-1 stagger-reveal">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 reveal-child">
            <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ COMMUNICATION NODE ]</span>
            <h2 className="text-3xl font-extrabold uppercase">GET IN TOUCH</h2>
            <p className="text-xs text-green-off-white-2 leading-relaxed">
              Submit the form or reach out directly for systems, automations, and frontend deployments.
            </p>
            <div className="flex flex-col gap-2 text-xs font-bold uppercase text-white mt-4 font-mono">
              <span>Email: brianmukwe097@gmail.com</span>
              <span>Phone: +254 792 300 552</span>
              <span>Location: Nairobi, Kenya -- GMT+3</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 bg-black/40 border border-dark-green-tint-1 p-6 reveal-child">
            <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">[ FORM.TRANSMISSION ]</span>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[8px] tracking-widest uppercase font-bold text-green-off-white-2">Name</label>
              <input 
                id="name"
                type="text" 
                name="name" 
                value={contactForm.name} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 px-4 py-2 text-xs text-white focus:border-lime focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[8px] tracking-widest uppercase font-bold text-green-off-white-2">Email</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                value={contactForm.email} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 px-4 py-2 text-xs text-white focus:border-lime focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="service" className="text-[8px] tracking-widest uppercase font-bold text-green-off-white-2">Service Required</label>
              <select 
                id="service"
                name="service" 
                value={contactForm.service} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 px-4 py-2 text-xs text-white focus:border-lime focus:outline-none"
              >
                <option value="">Select a service...</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-[8px] tracking-widest uppercase font-bold text-green-off-white-2">Message</label>
              <textarea 
                id="message"
                name="message" 
                rows="4" 
                value={contactForm.message} 
                onChange={handleInputChange} 
                required 
                className="bg-black border border-dark-green-tint-1 p-4 text-xs text-white focus:border-lime focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              className="bg-lime text-black py-3 font-bold uppercase tracking-wider text-[10px] border border-lime hover:bg-transparent hover:text-lime transition-all duration-300"
            >
              SEND INQUIRY
            </button>

            {submitStatus === 'SUCCESS' && (
              <span className="text-xs text-lime uppercase font-bold text-center mt-2 font-mono">[ TRANSMISSION SUCCESSFUL ]</span>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-dark-green-tint-1 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <h1 className="text-3xl md:text-6xl font-extrabold uppercase tracking-tighter text-lime text-center border-b border-dark-green-tint-1 pb-8">
            ALWAYS BRINGING THE FIGHT.
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2 text-xs">
              <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">DIRECTORY</span>
              <a href="#about" className="text-green-off-white-2 hover:text-white transition-colors">[ ABOUT ]</a>
              <a href="#services" className="text-green-off-white-2 hover:text-white transition-colors">[ SERVICES ]</a>
              <a href="#projects" className="text-green-off-white-2 hover:text-white transition-colors">[ PROJECTS ]</a>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">COMMUNITIES</span>
              <a href="https://github.com/Glizocksama-2" target="_blank" rel="noopener noreferrer" className="text-green-off-white-2 hover:text-white transition-colors">[ GITHUB ]</a>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="text-[9px] tracking-widest text-lime uppercase font-bold font-mono">LEGAL</span>
              <a href="#privacy" className="text-green-off-white-2 hover:text-white transition-colors">[ PRIVACY POLICY ]</a>
              <a href="#terms" className="text-green-off-white-2 hover:text-white transition-colors">[ TERMS & CONDITIONS ]</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-dark-green-tint-1 pt-6 text-[9px] text-green-off-white-2 uppercase font-mono">
            <span>2026 Brian Mukwe Waliaula. All rights reserved.</span>
          </div>
        </div>
      </footer>
      </main>
    </ReactLenis>
  );
}
