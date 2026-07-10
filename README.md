# Brian Mukwe Waliaula — Portfolio

Single-page developer portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **React Three Fiber** (procedural 3D project art), and **GSAP** (marquee).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The form posts to `app/api/contact/route.js`, which sends email via [Resend](https://resend.com). Without a key, inquiries are logged to the server console instead of emailed.

Environment variables (create `.env.local`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables email delivery (optional in dev) |
| `CONTACT_TO_EMAIL` | Recipient override (defaults to brianmukwe097@gmail.com) |
| `CONTACT_FROM_EMAIL` | Sender header (defaults to Resend onboarding sender) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for Open Graph metadata |

Spam protection: hidden honeypot field + 3-requests-per-minute per-IP rate limit.

## Structure

- `app/page.js` — the whole page (hero, services, projects, tech stack, credentials, contact)
- `app/api/contact/route.js` — contact form endpoint
- `components/HelmetCanvas.jsx` — procedural 3D helmet, per-project material styles, mounts only while in view
- `components/Marquee.jsx` — infinite tech marquee (respects `prefers-reduced-motion`)

## Build

```bash
npm run build && npm start
```
