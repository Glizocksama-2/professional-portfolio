'use client';

import { useState } from 'react';
import { services, contact } from '@/lib/data';

// Formspree endpoint for this portfolio form. Replace with the real form ID
// from https://formspree.io when the portfolio form is created.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="px-8 py-24 bg-dark-green border-t border-dark-green-tint-1">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ CONTACT DETAILS ]</span>
          <h2 className="text-3xl font-extrabold uppercase">GET IN TOUCH</h2>
          <p className="text-sm text-green-off-white-2 leading-relaxed">
            If you have a project requiring payment integration, system automation, or dynamic React deployment pipelines, submit the form or reach out directly.
          </p>
          <a
            href={contact.whatsapp('Hello Brian, I would like to discuss a project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-lime text-black px-6 py-3 font-bold uppercase tracking-wider text-xs border border-lime hover:bg-transparent hover:text-lime transition-all duration-300 max-w-fit"
          >
            CHAT ON WHATSAPP
          </a>
          <div className="flex flex-col gap-2 text-xs font-bold uppercase text-white mt-4">
            <span>Email: {contact.email}</span>
            <span>Phone: {contact.phone}</span>
            <span>Location: {contact.location}</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 bg-black/40 border border-dark-green-tint-1 p-6">
          <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ INQUIRY FORM ]</span>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[9px] tracking-widest uppercase font-bold text-green-off-white-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
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
              value={form.email}
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
              value={form.service}
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
              value={form.message}
              onChange={handleInputChange}
              required
              className="bg-black border border-dark-green-tint-1 p-4 text-sm text-white focus:border-lime focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-lime text-black py-3 font-bold uppercase tracking-wider text-xs border border-lime hover:bg-transparent hover:text-lime transition-all duration-300 disabled:opacity-60"
          >
            {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
          </button>

          {status === 'success' && (
            <p className="text-xs text-lime font-bold uppercase tracking-wider">Message sent. I will reply shortly.</p>
          )}
          {status === 'error' && (
            <p className="text-xs text-orange font-bold uppercase tracking-wider">Send failed. Use WhatsApp or email instead.</p>
          )}
        </form>
      </div>
    </section>
  );
}
