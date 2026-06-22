# Quidity — Homepage

Enterprise marketing website for **Quidity**, an AI consulting firm helping organizations accelerate AI adoption through MVPs, PoCs, production-grade AI systems, and scalable data pipelines.

Built with [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/), and configured for deployment on Cloudflare Workers via OpenNext.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Font | System sans-serif stack |
| Form Management | React Hook Form v7 |
| Email Service | Resend |
| Testing | Jest + Testing Library |
| Package Manager | npm |
| Edge Runtime Adapter | OpenNext for Cloudflare |
| Cloud Platform | Cloudflare Workers |
| Container | Docker (multi-stage build) |

## Features

- **6 Service Offerings** — Generative AI, Intelligent Chatbots, Workflow Automation, Predictive Analytics, Computer Vision, MLOps
- **4-Step Engagement Model** — Assess & Strategize → Architect & Prototype → Deploy & Integrate → Govern & Optimize
- **Industry Verticals** — Financial Services, Healthcare, Software/SaaS, Government, Manufacturing, Operations
- **Responsible AI / Ethos Framework** — Bias Mitigation, GDPR/HIPAA Compliance, Model Explainability, Zero-Trust Data Access
- **Contact Form** — Client-side validation (React Hook Form) + server-side API route with Resend email integration
- **SEO Optimized** — JSON-LD structured data, Open Graph, Twitter card metadata
- **Error Boundary** — Graceful client-side error handling
- **Production-ready** — Cloudflare Workers support, Docker support, ESLint, Jest testing, TypeScript

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
| `NEXT_PUBLIC_CALENDLY_URL` | Public Calendly link used by the CTA/contact flow |

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
├── open-next.config.ts          # OpenNext Cloudflare adapter config
├── wrangler.jsonc               # Cloudflare Workers config
├── Dockerfile                   # Multi-stage production build
├── docker-compose.yml           # Docker Compose with env vars
├── .env.local.example           # Environment variable template
└── package.json
```

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Build and preview in the Cloudflare Workers runtime
npm run deploy     # Build and deploy to Cloudflare Workers
npm run upload     # Build and upload a new Cloudflare Worker version
npm run cf-typegen # Generate Cloudflare binding types
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

### Cloudflare Workers

This project is configured for Cloudflare Workers using OpenNext. The repository includes:

- `open-next.config.ts`
- `wrangler.jsonc`
- `public/_headers`
- npm scripts for `preview`, `deploy`, and `upload`

#### Local verification

```bash
# Build the Worker bundle
npx @opennextjs/cloudflare build

# Preview locally in the Workers runtime
npm run preview
```

#### Deploy from your machine

```bash
npx wrangler login
npm run deploy
```

#### Deploy with Cloudflare Workers Builds

If you connect the GitHub repository in the Cloudflare dashboard, use these exact settings:

- Build command: `npx @opennextjs/cloudflare build`
- Deploy command: `npx @opennextjs/cloudflare deploy`

Do not use `npx wrangler deploy` as the deploy command for this repo. That generic framework flow can trigger Wrangler's auto-migration path and create an incorrect `WORKER_SELF_REFERENCE` binding.

#### Required Cloudflare environment variables

> **Important:** the Cloudflare Worker runtime does **not** read `.env.local`. That
> file only feeds local `next dev` and `next build`. Variables must be provisioned
> on the Worker itself, or the contact form will fail at runtime with a 500
> (`new Resend(undefined)`).

Secrets — set with `wrangler secret put` (encrypted, never committed):

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_EMAIL
```

Public/non-secret vars — add to `wrangler.jsonc` under `"vars"`, or set in the
Cloudflare dashboard:

- `NEXT_PUBLIC_CALENDLY_URL`

For local `wrangler dev` / `npm run preview`, mirror the secrets into `.dev.vars`
(git-ignored), since that runtime also ignores `.env.local`:

```
RESEND_API_KEY=re_...
CONTACT_EMAIL=you@example.com
```

> **Resend sender note:** the default `from` is the shared `onboarding@resend.dev`,
> which can only deliver to the email address that owns the Resend account. To send
> to any other recipient (e.g. `altamash.jd7@gmail.com`), verify the `quidity.com`
> domain in Resend and change the `from` address in `app/api/contact/route.ts`.

#### Naming note

Keep the Worker name consistent as `datumfort` across:

- `package.json`
- `wrangler.jsonc`
- the Cloudflare Worker/project settings

This avoids service-binding mismatches during deploy.

### Self-hosted (Docker)

Use the provided `Dockerfile` and `docker-compose.yml` for self-hosted deployments. Pass environment variables via `.env.local` or your orchestration platform's secret management.

## License

© 2025 Quidity. All rights reserved.
