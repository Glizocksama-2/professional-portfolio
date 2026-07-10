export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const bio = {
  name: 'Brian Mukwe Waliaula',
  role: 'Full-Stack Developer & Freelancer',
  email: 'brianmukwe097@gmail.com',
  phone: '+254 792 300 552',
  phoneE164: '+254792300552',
  location: 'Nairobi, Kenya',
  github: 'https://github.com/Glizocksama-2',
  summary:
    'I build performant systems, automated scraper tools, e-commerce networks, and clean frontend UI configurations. From initial DNS routing parameters to final database security rule optimizations, I handle complete full-stack project cycles.',
};

export const services = [
  { title: 'Web Design', desc: 'Custom, premium typography and aesthetic grid structures.' },
  { title: 'Frontend', desc: 'Vibrant, high-performance React layouts with fluid animations.' },
  { title: 'Backend', desc: 'Robust server routing, API logic, and scalable architectures.' },
  { title: 'Full-Stack Development', desc: 'End-to-end web deployment linking databases and client applications.' },
  { title: 'Systems Architecture', desc: 'Secure database setups, DNS config, and reverse proxies.' },
  { title: 'Landing Pages', desc: 'Highly optimized page-speed configurations and layouts.' },
  { title: 'Payment Gateway', desc: 'Integration of East African gateways (Pesapal, M-Pesa, Instasend).' },
  { title: 'SEO', desc: 'Structuring search indexing parameters and core vitals audits.' },
  { title: 'Security', desc: 'Supabase Row-Level Security rules and user authorization setups.' },
  { title: 'AI Automations', desc: 'Timed scrapers, Groq/Claude integrations, and telegram alerts.' },
  { title: 'Prompt Engineering', desc: 'Optimizing context structures and workflow system parameters.' },
  { title: 'Consultancy', desc: 'Technical guidance, infrastructure debugging, and design scoping.' },
  { title: 'AI Learning & Training', desc: 'Guiding organizations on AI integration and agent skills.' },
];

export const projects = [
  {
    num: '01',
    slug: 'fareast-ventures',
    title: 'Fareast Ventures',
    role: 'Systems Developer',
    desc: 'Premium Nairobi chauffeur platform featuring automated booking pipelines, real-time emails, Instasend payments routing, and comprehensive SEO performance tuning.',
    tags: ['React', 'Tailwind CSS', 'Instasend', 'SEO Audit'],
    github: 'https://github.com/Glizocksama-2/far-east-ventures',
    screenshot: '/fareast_screenshot.png',
    caseStudy: {
      problem:
        'A premium chauffeur service in Nairobi was taking bookings over phone calls and WhatsApp, losing leads outside business hours and having no online presence to compete for corporate clients.',
      solution:
        'Built a full booking platform: automated booking pipelines with real-time email confirmations, Instasend payment routing so clients can pay online, and an SEO-tuned public site for organic discovery.',
      result:
        'Bookings can now be placed and paid for 24/7 without a human on the line, and the site ranks for chauffeur-service searches in Nairobi.',
    },
  },
  {
    num: '02',
    slug: 'saka-wera',
    title: 'Saka Wera',
    role: 'Workflow Automator',
    desc: 'Automated job application matching engine powered by n8n. Scrapes major local boards, processes relevancy with Groq LLM filters, and fires alerts to Telegram.',
    tags: ['n8n', 'Groq AI', 'Telegram API', 'Automation'],
    github: 'https://github.com/Glizocksama-2',
    canvasStyle: 'Chrome Gold',
    caseStudy: {
      problem:
        'Job seekers waste hours every day manually refreshing multiple job boards, and good listings get buried before they are seen.',
      solution:
        'An n8n pipeline scrapes the major Kenyan job boards on a schedule, passes each listing through Groq LLM relevancy filters tuned to the user’s profile, and pushes matching jobs straight to Telegram.',
      result:
        'Relevant openings arrive as instant Telegram alerts minutes after posting — zero manual searching.',
    },
  },
  {
    num: '03',
    slug: 'shamba-command-center',
    title: 'Shamba Command Center',
    role: 'Full-Stack Developer',
    desc: 'Dual-frontend farm records and inventory command database, comprising a React/Vite dashboard and a Flutter Android app featuring local Google ML Kit text OCR.',
    tags: ['React', 'Flutter', 'Firebase', 'Google ML Kit'],
    github: 'https://github.com/Glizocksama-2/birunda-farm',
    screenshot: '/invoice_generator.jpg',
    caseStudy: {
      problem:
        'A working farm tracked inventory and records on paper, making it slow to know stock levels and impossible to analyze trends.',
      solution:
        'Two frontends over one Firebase database: a React/Vite dashboard for office management and a Flutter Android app for the field, with Google ML Kit OCR that turns photos of paper records into structured data on-device.',
      result:
        'Farm records are digital at the point of capture, and stock levels are visible in real time from the office.',
    },
  },
  {
    num: '04',
    slug: 'gorosei',
    title: 'GOROSEI',
    role: 'Full-Stack Developer',
    desc: 'Streetwear e-commerce storefront. Replaced hardcoded authorization parameters with secure Supabase Auth and strict Row-Level Security database controls.',
    tags: ['React', 'Supabase Auth', 'Row-Level Security', 'UX Design'],
    github: 'https://github.com/Glizocksama-2',
    canvasStyle: 'Matte Black',
    caseStudy: {
      problem:
        'A streetwear storefront shipped with hardcoded authorization values — any technically curious visitor could have accessed data they should not see.',
      solution:
        'Migrated authentication to Supabase Auth and locked every table down with strict Row-Level Security policies, so the database itself enforces who can read and write what.',
      result:
        'Customer data is protected at the database layer, not just the UI — the storefront now passes a basic security review.',
    },
  },
  {
    num: '05',
    slug: 'liferpg',
    title: 'LifeRPG',
    role: 'Developer',
    desc: 'Single-file gamified habit tracker PWA with SVG avatar layering, mood logs, and an AI coach proxy routing keys via Netlify serverless functions.',
    tags: ['React PWA', 'Netlify Functions', 'Groq API', 'Local Storage'],
    github: 'https://github.com/Glizocksama-2/rpgstats',
    canvasStyle: 'Glassmorphism',
    caseStudy: {
      problem:
        'Habit trackers are boring, and calling AI APIs from a static page would expose the API key to anyone who opens dev tools.',
      solution:
        'A gamified PWA where habits level up an SVG avatar, with mood logging — and an AI coach whose Groq API key stays server-side behind a Netlify serverless proxy.',
      result:
        'A fun, installable tracker that works offline, with AI coaching and no leaked credentials.',
    },
  },
  {
    num: '06',
    slug: 'megatron',
    title: 'Megatron',
    role: 'Developer',
    desc: 'Personal AI Chief of Staff agent scraping daily developer trends, conducting system health tests every 30 minutes, and alerting via Telegram channels.',
    tags: ['n8n', 'Telegram Alerts', 'Render Hosting', 'System Scraper'],
    github: 'https://github.com/Glizocksama-2',
    canvasStyle: 'Industrial Red',
    caseStudy: {
      problem:
        'Keeping up with developer news and knowing when your own deployed services go down both require constant manual checking.',
      solution:
        'An always-on n8n agent hosted on Render that scrapes daily developer trends, runs health checks on deployed systems every 30 minutes, and reports everything to Telegram channels.',
      result:
        'Downtime is known within 30 minutes instead of when a client complains, and the day starts with a curated trends digest.',
    },
  },
  {
    num: '07',
    slug: 'water-sanitation-npo',
    title: 'Water & Sanitation NPO',
    role: 'Full-Stack Developer',
    desc: 'Six-page donor coordination hub accepting international USD cards settled to local banks via Pesapal API, with automated Resend transactional alerts.',
    tags: ['HTML/CSS', 'Pesapal API', 'Resend', 'AI Help Widget'],
    github: 'https://github.com/Glizocksama-2',
    canvasStyle: 'Fluid Aqua',
    caseStudy: {
      problem:
        'A water and sanitation nonprofit could not accept international donations — foreign donors’ USD cards had no path to the organization’s local Kenyan bank account.',
      solution:
        'A six-page donor hub with Pesapal API integration that accepts international card payments and settles them to local banks, plus automated Resend receipts and an AI help widget for donor questions.',
      result:
        'International donors can now give in USD with a card, and every donation triggers an automatic receipt.',
    },
  },
  {
    num: '08',
    slug: 'estarz-fc',
    title: 'EStarz FC',
    role: 'Mobile Developer',
    desc: 'Android application for sports club tracking, integrating user registrations, validation, and structured WhatsApp sales pipelines.',
    tags: ['Kotlin', 'Material Design', 'Android SDK', 'Input Validation'],
    github: 'https://github.com/Glizocksama-2',
    canvasStyle: 'Sport Royal',
    caseStudy: {
      problem:
        'A sports club managed member registrations and merchandise sales through unstructured WhatsApp chats, losing track of who registered and who paid.',
      solution:
        'A native Kotlin Android app with validated registration forms and structured WhatsApp sales pipelines, so every member and sale flows through one tracked path.',
      result:
        'The club has a clean member database and a sales process that does not depend on scrolling back through chat history.',
    },
  },
];

export const techStacks = [
  { group: 'Frontend', items: ['React', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'n8n pipelines', 'PostgreSQL', 'Supabase'] },
  { group: 'Mobile', items: ['Kotlin', 'Android SDK', 'Flutter', 'Method Channels'] },
  { group: 'AI & Automation', items: ['Groq API', 'Claude API', 'Telegram Bot API', 'System Scraping'] },
  { group: 'Infrastructure', items: ['Docker', 'Docker Compose', 'Render', 'Netlify', 'Nginx', 'DNS Setup'] },
  { group: 'Payments', items: ['Pesapal Routing', 'Instasend API', 'M-Pesa Integrations'] },
];

// PLACEHOLDERS — Brian: replace with real client quotes before deploying.
export const testimonials = [
  {
    quote: 'Replace this with a real quote from the Fareast Ventures client about the booking platform.',
    name: '[ CLIENT NAME ]',
    role: 'Fareast Ventures',
  },
  {
    quote: 'Replace this with a real quote about the NPO donation platform and Pesapal integration.',
    name: '[ CLIENT NAME ]',
    role: 'Water & Sanitation NPO',
  },
  {
    quote: 'Replace this with a real quote about the farm records system.',
    name: '[ CLIENT NAME ]',
    role: 'Shamba Command Center',
  },
];

export const education = [
  { school: 'Daystar University', detail: 'Diploma in Human Resources · Certificate in Business Management (Graduated 2024)' },
  { school: 'Upper Hill School', detail: 'Kenya Certificate of Secondary Education (KCSE)' },
];

export const certifications = [
  'Claude 101', 'Claude Code 101', 'Claude Platform 101', 'Introduction to Claude Cowork',
  'Claude Code in Action', 'AI Fluency: Framework and Foundations', 'Building with Claude API',
  'Introduction to Model Context Protocol', 'AI Fluency for Educators', 'AI Fluency for Students',
  'Model Context Protocol: Advanced Topics', 'Claude with Amazon Bedrock', 'Claude with Google Cloud Vertex AI',
  'Teaching AI Fluency', 'AI Fluency for Non Profits', 'Introduction to Agent Skills',
  'Introduction to Subagents', 'AI Capabilities and Limitations', 'AI Fluency for Small Businesses',
  'AI Fluency for Builders',
];

export const uses = [
  { group: 'Editor & Terminal', items: ['VS Code', 'Claude Code', 'Git Bash'] },
  { group: 'Stack', items: ['React / Vite', 'Next.js', 'Node.js', 'Supabase', 'PostgreSQL', 'Flutter', 'Kotlin'] },
  { group: 'Automation', items: ['n8n', 'Telegram Bot API', 'Groq API', 'Claude API'] },
  { group: 'Infra', items: ['Docker', 'Render', 'Netlify', 'Nginx'] },
];

export const nowItems = [
  'Taking on freelance web, automation, and payment-integration projects.',
  'Expanding Megatron, a personal AI chief-of-staff agent.',
  'Deepening Anthropic/Claude platform certifications (20+ completed).',
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

// ——— Sections adapted from sample.html ———

// PLACEHOLDER prices — Brian: set real figures before deploying.
export const pricingTiers = [
  {
    name: 'Landing Page',
    price: 'From KES 25,000',
    tagline: 'One sharp page that converts',
    features: ['Custom design, no templates', 'Mobile-first + SEO basics', 'Contact form wired to your email', 'Deployed with your domain', '1 revision round'],
    cta: 'Start a landing page',
  },
  {
    name: 'Business Site',
    price: 'From KES 70,000',
    tagline: 'Full site with payments',
    featured: true,
    features: ['Up to 6 pages', 'M-Pesa / Pesapal / Instasend integration', 'Admin dashboard or CMS', 'Analytics + Core Vitals tuning', '30 days post-launch support'],
    cta: 'Start a business site',
  },
  {
    name: 'Custom System',
    price: 'Custom quote',
    tagline: 'Automation, AI, or full-stack builds',
    features: ['Scrapers, n8n pipelines, AI agents', 'Mobile apps (Flutter / Kotlin)', 'Database design + Row-Level Security', 'Infrastructure & DNS setup', 'Scoped spec before any invoice'],
    cta: 'Describe your system',
  },
];

export const faqs = [
  { q: 'How long does a website take?', a: 'A landing page ships in about a week. A full business site with payments typically takes 3–4 weeks depending on how fast content and feedback arrive.' },
  { q: 'Do you handle M-Pesa and card payments?', a: 'Yes — I integrate Pesapal, Instasend, and M-Pesa flows regularly, including international USD cards settling to local Kenyan banks.' },
  { q: 'What do you need from me to start?', a: 'A short description of the project, any branding you have (logo, colors), and the content (text, photos). If you have none of that, we scope it together in a call.' },
  { q: 'Do you offer maintenance after launch?', a: 'Every project includes a support window. After that, I offer monthly maintenance or fix-on-request — your choice.' },
  { q: 'How do payments to you work?', a: 'A deposit to begin, the balance on delivery. For larger systems we break the work into milestones with a payment per milestone.' },
  { q: 'Can you fix or extend an existing site?', a: 'Yes — audits, security hardening (auth, Row-Level Security), speed tuning, or new features on top of an existing codebase are all common jobs.' },
];

export const processSteps = [
  { step: '01', title: 'Discovery', desc: 'A short call or chat to understand the goal, budget, and deadline. You get a written scope — no surprises later.' },
  { step: '02', title: 'Build', desc: 'I design and build in short cycles, sharing live preview links so you see progress instead of waiting for a big reveal.' },
  { step: '03', title: 'Launch', desc: 'Domain, DNS, hosting, analytics, and payments configured and tested. You get access to everything — no vendor lock-in.' },
  { step: '04', title: 'Support', desc: 'A post-launch support window is included. Telemetry and health checks catch problems before your customers do.' },
];

export const trustItems = ['FAREAST VENTURES', 'WATER & SANITATION NPO', 'SHAMBA COMMAND', 'GOROSEI', 'ESTARZ FC', 'ANTHROPIC CERTIFIED ×20'];
