'use client';

import React, { useState } from 'react';
import { services } from '@/lib/content';

// sample.html booking-dialog pattern: floating CTA opens a quick-inquiry
// popup that posts to the same /api/contact endpoint as the main form.
export default function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '', company: '' });
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState('');

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('SUCCESS');
    } catch (err) {
      setStatus('ERROR');
      setError(err.message);
    }
  };

  const reset = () => {
    setOpen(false);
    setStatus('IDLE');
    setForm({ name: '', email: '', service: '', message: '', company: '' });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-8 left-6 z-40 bg-lime text-black px-5 py-3 text-[10px] font-bold uppercase tracking-widest border border-lime hover:opacity-80 transition-opacity print-hide"
      >
        ⚡ BOOK A PROJECT
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book a project"
          onClick={reset}
        >
          <div className="w-full max-w-md border border-line bg-surface p-8" onClick={(e) => e.stopPropagation()}>
            {status === 'SUCCESS' ? (
              <div className="flex flex-col gap-4 text-center py-6">
                <span className="text-3xl text-accent">✓</span>
                <h3 className="text-xl font-bold uppercase">Request received</h3>
                <p className="text-sm text-muted">I&apos;ll get back to you within one business day.</p>
                <button onClick={reset} className="mt-4 bg-lime text-black py-3 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-widest text-accent uppercase font-bold">[ QUICK BOOKING ]</span>
                  <button type="button" onClick={reset} aria-label="Close" className="text-muted hover:text-accent">✕</button>
                </div>

                <input type="text" name="company" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="YOUR NAME" aria-label="Your name"
                  className="bg-surface-2/30 border border-line px-4 py-2.5 text-sm focus:border-accent focus:outline-none placeholder:text-muted placeholder:text-xs" />
                <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="YOUR EMAIL" aria-label="Your email"
                  className="bg-surface-2/30 border border-line px-4 py-2.5 text-sm focus:border-accent focus:outline-none placeholder:text-muted placeholder:text-xs" />
                <select name="service" value={form.service} onChange={onChange} required aria-label="Service required"
                  className="bg-surface-2/30 border border-line px-4 py-2.5 text-sm focus:border-accent focus:outline-none">
                  <option value="">What do you need?</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
                <textarea name="message" value={form.message} onChange={onChange} required rows="3" placeholder="BRIEF DESCRIPTION OF THE PROJECT" aria-label="Project description"
                  className="bg-surface-2/30 border border-line p-4 text-sm focus:border-accent focus:outline-none placeholder:text-muted placeholder:text-xs" />

                <button type="submit" disabled={status === 'SENDING'}
                  className="bg-lime text-black py-3 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-50">
                  {status === 'SENDING' ? 'SENDING...' : 'SEND REQUEST'}
                </button>
                {status === 'ERROR' && (
                  <span role="alert" className="text-xs text-orange uppercase font-bold text-center">[ {error} ]</span>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
