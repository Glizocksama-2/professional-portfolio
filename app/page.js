'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/Marquee';
import ProjectArt from '@/components/ProjectArt';
import RevealOnScroll from '@/components/RevealOnScroll';

// three.js stays out of the initial bundle; each canvas only mounts when
// its card nears the viewport (IntersectionObserver inside HelmetCanvas)
const HelmetCanvas = dynamic(() => import('@/components/HelmetCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-dark-green-tint-1 animate-pulse">
      <div className="text-lime text-[10px] tracking-widest uppercase">LOADING 3D SYSTEM...</div>
    </div>
  ),
});
import TiltCard from '@/components/TiltCard';
import ThemeToggle from '@/components/ThemeToggle';
import MagneticButton from '@/components/MagneticButton';
import NairobiClock from '@/components/NairobiClock';
import Terminal from '@/components/Terminal';
import { bio, services, projects, techStacks, testimonials, education, certifications } from '@/lib/content';

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', service: '', message: '', company: '' });
  const [submitStatus, setSubmitStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('SENDING');
    setSubmitError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setSubmitStatus('SUCCESS');
      setContactForm({ name: '', email: '', service: '', message: '', company: '' });
    } catch (err) {
      setSubmitStatus('ERROR');
      setSubmitError(err.message || 'Failed to send. Please email directly.');
    }
  };

  return (
    <main id="main-content" className="w-full bg-surface min-h-screen text-body overflow-x-hidden selection:bg-lime selection:text-black pb-14 md:pb-0">
      <RevealOnScroll />
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-surface/80 backdrop-blur-md border-b border-line z-40 px-8 py-4 flex justify-between items-center print-hide">
        <div className="text-xl font-extrabold tracking-tighter uppercase font-sans">
          BRIAN MUKWE<span className="text-accent">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] tracking-widest uppercase font-bold text-muted items-center">
          <a href="#about" className="hover:text-accent transition-colors">ABOUT</a>
          <a href="#services" className="hover:text-accent transition-colors">SERVICES</a>
          <a href="#projects" className="hover:text-accent transition-colors">PROJECTS</a>
          <a href="#tech" className="hover:text-accent transition-colors">TECH STACK</a>
          <a href="#credentials" className="hover:text-accent transition-colors">CREDENTIALS</a>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="bg-lime text-black px-6 py-2 font-bold uppercase tracking-wider text-[10px] hover:opacity-80 border border-lime transition-all duration-300"
          >
            HIRE ME
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-between p-8 relative overflow-hidden">
        {/* Availability Badge */}
        <div className="z-10 self-start mt-6 flex items-center gap-4 flex-wrap hero-anim">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-2 text-[10px] text-accent font-bold tracking-widest uppercase border border-line">
            <span className="w-1.5 h-1.5 bg-lime rounded-full animate-ping"></span>
            AVAILABLE FOR FREELANCE PROJECTS
          </span>
          <NairobiClock />
        </div>

        {/* Center Portrait */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-[85vw] md:w-[45vw] h-[70vh] bg-surface-2 relative border border-line overflow-hidden hero-frame">
            <Image
              src="/brian_portrait.png"
              alt="Portrait of Brian Mukwe Waliaula"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 85vw"
              className="object-cover opacity-80 mix-blend-luminosity"
            />
            <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-widest uppercase font-semibold">
              [ BRIAN MUKWE WALIAULA • NAIROBI, KENYA ]
            </div>
          </div>
        </div>

        {/* Title Grid */}
        <div className="z-10 flex flex-col md:flex-row justify-between items-end w-full mt-auto gap-8 pt-24">
          <div className="flex flex-col hero-anim" style={{ animationDelay: '0.15s' }}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase">
              BRIAN<br />MUKWE<span className="text-accent">.</span>
            </h1>
            <p className="text-sm font-bold text-muted tracking-wide uppercase mt-4">
              Full-Stack Developer &amp; Freelancer
            </p>
          </div>

          {/* Stats Widget */}
          <div className="grid grid-cols-3 gap-6 bg-surface/60 backdrop-blur-md border border-line p-6 md:max-w-md w-full hero-anim" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent">8+</span>
              <span className="text-[9px] tracking-widest text-muted uppercase mt-1">SHIPPED</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent">13</span>
              <span className="text-[9px] tracking-widest text-muted uppercase mt-1">SERVICES</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent">20+</span>
              <span className="text-[9px] tracking-widest text-muted uppercase mt-1">CERTS</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="z-10 flex gap-4 mt-8 pb-12 hero-anim" style={{ animationDelay: '0.45s' }}>
          <MagneticButton href="#projects" className="bg-lime text-black px-8 py-3.5 font-bold uppercase tracking-wider text-xs border border-lime hover:opacity-80 transition-all duration-300">
            VIEW PROJECTS
          </MagneticButton>
          <MagneticButton href="#contact" className="border border-body text-body px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-lime hover:text-black hover:border-lime transition-all duration-300">
            GET IN TOUCH
          </MagneticButton>
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* About Section */}
      <section id="about" className="px-8 py-24 bg-surface-2 border-y border-line relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ PERSONAL SUMMARY ]</span>
          <p className="text-lg md:text-2xl font-sans leading-relaxed">
            {bio.summary}
          </p>

          <span className="text-[10px] tracking-widest text-accent uppercase font-bold mt-8">[ WORKING STYLE ]</span>
          <blockquote className="font-brier text-muted text-2xl md:text-4xl leading-tight">
            &quot;High performance is built on telemetry, structured routines, and precise specifications. Every pipeline must be monitored, and every database query optimized for speed.&quot;
          </blockquote>

          <div className="flex gap-6 mt-6 text-xs font-bold uppercase tracking-wider flex-wrap">
            <a href={`mailto:${bio.email}`} className="hover:text-accent transition-colors">[ EMAIL ]</a>
            <a href={`tel:${bio.phoneE164}`} className="hover:text-accent transition-colors">[ CALL ]</a>
            <a href={bio.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">[ GITHUB ]</a>
            <Link href="/cv" className="hover:text-accent transition-colors">[ CV ]</Link>
            <Link href="/now" className="hover:text-accent transition-colors">[ NOW ]</Link>
            <Link href="/uses" className="hover:text-accent transition-colors">[ USES ]</Link>
          </div>
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Services Section */}
      <section id="services" className="px-8 py-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ SERVICES & CORE COMPETENCIES ]</span>
            <h2 className="text-4xl font-extrabold uppercase">13 Service Areas</h2>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <div
                key={srv.title}
                className={`border border-line p-8 bg-surface-2/10 flex flex-col justify-between hover:border-accent transition-all duration-300 ${
                  idx % 4 === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  <span className="text-[10px] tracking-widest text-accent uppercase font-bold">AREA {String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-bold uppercase mt-2">{srv.title}</h3>
                </div>
                <p className="text-sm text-muted mt-4 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Projects Section */}
      <section id="projects" className="px-8 py-24 border-t border-line">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ COMPLETED SHIPS ]</span>
            <h2 className="text-4xl font-extrabold uppercase">8 Real Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <TiltCard key={proj.slug} className="border border-line p-8 bg-surface-2/5 flex flex-col justify-between hover:border-accent duration-500">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-3xl font-black text-accent">{proj.num}</span>
                    <span className="text-[10px] tracking-widest text-muted uppercase font-bold">{proj.role}</span>
                  </div>

                  <h3 className="text-2xl font-bold uppercase mt-4">{proj.title}</h3>

                  <div className="w-full h-48 my-6 relative overflow-hidden bg-black border border-line">
                    {proj.screenshot ? (
                      <Image
                        src={proj.screenshot}
                        alt={`Screenshot of ${proj.title}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <HelmetCanvas styleName={proj.canvasStyle} />
                    )}
                  </div>

                  <p className="text-sm text-muted leading-relaxed mt-2">{proj.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[9px] tracking-wider uppercase bg-black px-2.5 py-1 text-lime font-bold">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-line pt-6 flex justify-between items-center">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="text-xs font-bold uppercase tracking-widest text-accent hover:text-body transition-colors"
                  >
                    CASE STUDY →
                  </Link>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
                  >
                    REPO ↗
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Tech Stack Section */}
      <section id="tech" className="px-8 py-24 bg-surface-2 border-y border-line">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ CURRENT TECH STACK ]</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStacks.map((stk) => (
              <div key={stk.group} className="border border-line p-6 bg-surface/30">
                <h3 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">{stk.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {stk.items.map((item) => (
                    <span key={item} className="text-xs px-3 py-1.5 bg-surface text-body uppercase font-semibold">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Interactive Shell Section */}
      <section id="shell" className="px-8 py-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ INTERACTIVE SHELL ]</span>
            <h2 className="text-4xl font-extrabold uppercase">Talk to the machine</h2>
            <p className="text-sm text-muted">Type <span className="text-accent font-mono">help</span> to explore, or go straight for <span className="text-accent font-mono">sudo hire brian</span>.</p>
          </div>
          <Terminal />
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-8 py-24 bg-surface-2 border-y border-line">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ CLIENT WORDS ]</span>
            <h2 className="text-4xl font-extrabold uppercase">Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.role} className="border border-line p-8 bg-surface/30 flex flex-col justify-between gap-6">
                <blockquote className="font-brier text-lg leading-relaxed">&quot;{t.quote}&quot;</blockquote>
                <figcaption className="text-[10px] tracking-widest uppercase font-bold">
                  <span className="text-accent">{t.name}</span>
                  <span className="text-muted block mt-1">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Room */}
      <div className="h-[31.51vh]"></div>

      {/* Credentials Section */}
      <section id="credentials" className="px-8 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ ACADEMIC DEVELOPMENT ]</span>
            {education.map((e, i) => (
              <div key={e.school} className={i > 0 ? 'border-t border-line pt-6' : ''}>
                <h3 className="text-2xl font-bold uppercase">{e.school}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{e.detail}</p>
              </div>
            ))}

            <div className="border-t border-line pt-6 flex flex-col gap-4">
              <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ VERIFIABLE CREDENTIALS ]</span>
              <div className="w-full h-48 relative border border-line opacity-80 hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <Image
                  src="/certificates_grid.png"
                  alt="Grid of professional certificates"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ ANTHROPIC CERTIFICATIONS (20+) ]</span>
            <div className="h-80 overflow-y-auto border border-line p-6 bg-surface-2/10 flex flex-col gap-2 mb-4">
              {certifications.map((cert) => (
                <div key={cert} className="text-xs uppercase font-bold border-b border-line/40 pb-2">
                  [ {cert} ]
                </div>
              ))}
            </div>

            <div className="w-full h-40 relative border border-line opacity-80 hover:opacity-100 transition-opacity duration-300 overflow-hidden">
              <Image
                src="/anthropic_certificates.png"
                alt="Anthropic certification badges"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-12 border-t border-line">
        <Marquee textItems={['REACT', 'NEXT.JS', 'TAILWIND CSS', 'SUPABASE', 'DOCKER', 'N8N AUTOMATION', 'POSTGRESQL', 'FLUTTER']} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-24 bg-surface-2 border-t border-line">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ CONTACT DETAILS ]</span>
            <h2 className="text-3xl font-extrabold uppercase">GET IN TOUCH</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have a project requiring payment integration, system automation, or dynamic React deployment pipelines, submit the form or reach out directly.
            </p>
            <div className="flex flex-col gap-2 text-xs font-bold uppercase mt-4">
              <span>Email: {bio.email}</span>
              <span>Phone: {bio.phone}</span>
              <span>Location: {bio.location} — GMT+3</span>
            </div>
          </div>

          {/* Inquiry Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 bg-surface/40 border border-line p-6">
            <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ INQUIRY FORM ]</span>

            {/* Honeypot — hidden from real users, catches naive bots */}
            <input
              type="text"
              name="company"
              value={contactForm.company}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[9px] tracking-widest uppercase font-bold text-muted">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
                className="bg-surface border border-line px-4 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[9px] tracking-widest uppercase font-bold text-muted">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
                className="bg-surface border border-line px-4 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="service" className="text-[9px] tracking-widest uppercase font-bold text-muted">Service Required</label>
              <select
                id="service"
                name="service"
                value={contactForm.service}
                onChange={handleInputChange}
                required
                className="bg-surface border border-line px-4 py-2 text-sm focus:border-accent focus:outline-none"
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-[9px] tracking-widest uppercase font-bold text-muted">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={contactForm.message}
                onChange={handleInputChange}
                required
                className="bg-surface border border-line p-4 text-sm focus:border-accent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus === 'SENDING'}
              className="bg-lime text-black py-3 font-bold uppercase tracking-wider text-xs border border-lime hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitStatus === 'SENDING' ? 'SENDING...' : 'SEND INQUIRY'}
            </button>

            {submitStatus === 'SUCCESS' && (
              <span role="status" className="text-xs text-accent uppercase font-bold text-center mt-2">[ INQUIRY RECEIVED SUCCESSFULLY ]</span>
            )}
            {submitStatus === 'ERROR' && (
              <span role="alert" className="text-xs text-orange uppercase font-bold text-center mt-2">[ {submitError} ]</span>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line py-16 px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <h2 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tighter text-accent text-center border-b border-line pb-12">
            ALWAYS BRINGING THE FIGHT.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest text-accent uppercase font-bold">DIRECTORY</span>
              <a href="#hero" className="text-sm text-muted hover:text-body transition-colors">[ HOME ]</a>
              <a href="#about" className="text-sm text-muted hover:text-body transition-colors">[ ABOUT ]</a>
              <a href="#services" className="text-sm text-muted hover:text-body transition-colors">[ SERVICES ]</a>
              <a href="#projects" className="text-sm text-muted hover:text-body transition-colors">[ PROJECTS ]</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest text-accent uppercase font-bold">PAGES</span>
              <Link href="/cv" className="text-sm text-muted hover:text-body transition-colors">[ CV ]</Link>
              <Link href="/now" className="text-sm text-muted hover:text-body transition-colors">[ NOW ]</Link>
              <Link href="/uses" className="text-sm text-muted hover:text-body transition-colors">[ USES ]</Link>
              <a href="/api/resume.json" className="text-sm text-muted hover:text-body transition-colors">[ RESUME.JSON ]</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest text-accent uppercase font-bold">REACH OUT</span>
              <a href={bio.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-body transition-colors">[ GITHUB ]</a>
              <a href={`mailto:${bio.email}`} className="text-sm text-muted hover:text-body transition-colors">[ EMAIL ]</a>
              <a href="#contact" className="text-sm text-muted hover:text-body transition-colors">[ CONTACT FORM ]</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-line pt-8 text-[10px] text-muted uppercase">
            <span>© 2026 Brian Mukwe Waliaula. All rights reserved.</span>
            <span className="hidden md:inline">PRESS <kbd className="text-accent">CTRL+K</kbd> FOR COMMANDS · <kbd className="text-accent">?</kbd> FOR SHORTCUTS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
