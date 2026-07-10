import { NextResponse } from 'next/server';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'brianmukwe097@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

// Naive in-memory rate limit: 3 requests per minute per IP.
// Good enough for a single-instance deploy; resets on cold start.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - 60_000;
  // Prune stale IPs so the map can't grow unbounded under a spray of
  // spoofed X-Forwarded-For values
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }
  const recent = (hits.get(ip) || []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 3;
}

export async function POST(request) {
  // Reject oversized payloads before parsing
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, service, message, company } = body;

  // Honeypot: real users never fill the hidden "company" field.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const fields = [name, email, service, message];
  if (fields.some((f) => typeof f !== 'string' || !f.trim())) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || service.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log('[contact] RESEND_API_KEY not set — inquiry logged instead of emailed:', {
      name, email, service, message,
    });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Portfolio inquiry: ${service} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Resend error:', res.status, await res.text());
    return NextResponse.json({ error: 'Failed to send. Please email directly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
