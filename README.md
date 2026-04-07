# Data Kurator — Homepage

Enterprise marketing website for **Data Kurator**, an AI consulting firm helping organizations accelerate AI adoption through MVPs, PoCs, production-grade AI systems, and scalable data pipelines.

Built with [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Font | Inter (via `next/font/google`) |
| Form Management | React Hook Form v7 |
| Email Service | Resend |
| Testing | Jest + Testing Library |
| Package Manager | npm |
| Container | Docker (multi-stage build) |

## Features

- **6 Service Offerings** — Generative AI, Intelligent Chatbots, Workflow Automation, Predictive Analytics, Computer Vision, MLOps
- **4-Step Engagement Model** — Assess & Strategize → Architect & Prototype → Deploy & Integrate → Govern & Optimize
- **Industry Verticals** — Financial Services, Healthcare, Software/SaaS, Government, Manufacturing, Operations
- **Responsible AI / Ethos Framework** — Bias Mitigation, GDPR/HIPAA Compliance, Model Explainability, Zero-Trust Data Access
- **Contact Form** — Client-side validation (React Hook Form) + server-side API route with Resend email integration
- **SEO Optimized** — JSON-LD structured data, Open Graph, Twitter card metadata
- **Error Boundary** — Graceful client-side error handling
- **Production-ready** — Docker support, ESLint, Jest testing, TypeScript

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in RESEND_API_KEY and CONTACT_EMAIL in .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) for sending contact emails |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |

## Project Structure

```
datumFort/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # POST endpoint — contact form → Resend
│   ├── globals.css              # Tailwind directives + custom styles
│   ├── layout.tsx               # Root layout (font, metadata, SEO)
│   └── page.tsx                 # Homepage — assembles all sections
├── components/
│   ├── Header.tsx               # Fixed navigation bar
│   ├── HeroSection.tsx          # Hero with gradient background & CTA
│   ├── ServicesSection.tsx      # 6 service cards (3-col grid)
│   ├── EngagementModel.tsx      # 4-step engagement timeline
│   ├── IndustriesSection.tsx    # Vertical expertise icons
│   ├── ResponsibleAI.tsx        # Ethos framework callout
│   ├── ContactSection.tsx       # Contact form with validation
│   ├── Footer.tsx               # Logo, social links, copyright
│   └── ErrorBoundary.tsx        # React error boundary
├── constants/
│   └── index.tsx                # Data definitions (services, steps, industries, pillars)
├── __tests__/                   # Jest test files
├── public/                      # Static assets
├── Dockerfile                   # Multi-stage production build
├── docker-compose.yml           # Docker Compose with env vars
├── .env.local.example           # Environment variable template
└── package.json
```

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm test           # Run Jest tests
npm run test:watch # Run tests in watch mode
```

## Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build the image directly
docker build -t datumfort .
docker run -p 3000:3000 --env-file .env.local datumfort
```

## Deploy

### Vercel (recommended)

1. Push the repo to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL`) in Vercel project settings
4. Vercel auto-detects Next.js — no further config needed

### Self-hosted (Docker)

Use the provided `Dockerfile` and `docker-compose.yml` for self-hosted deployments. Pass environment variables via `.env.local` or your orchestration platform's secret management.

## License

© 2025 Data Kurator. All rights reserved.