# Data Kurator — Homepage

Enterprise landing page for **Data Kurator**, built with [Next.js](https://nextjs.org/) (App Router) and [Tailwind CSS](https://tailwindcss.com/).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS v4 |
| Font | Inter (via `next/font/google`) |
| Package Manager | npm |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
data_kurator_homepage/
├── app/
│   ├── globals.css          # Tailwind directives + custom styles
│   ├── layout.js            # Root layout (font, metadata, body)
│   └── page.js              # Homepage — assembles all sections
├── components/
│   ├── Header.jsx           # Fixed navigation bar
│   ├── HeroSection.jsx      # Hero with gradient background & CTA
│   ├── ServicesSection.jsx   # 6 service cards (3-col grid)
│   ├── EngagementModel.jsx   # 4-step engagement timeline
│   ├── IndustriesSection.jsx # Vertical expertise icons
│   ├── ResponsibleAI.jsx     # Ethics framework callout
│   ├── ContactSection.jsx    # Contact form + info (client component)
│   └── Footer.jsx           # Logo, social links, copyright
├── public/                   # Static assets
├── package.json
└── README.md
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy

This project is ready for one-click deploy on [Vercel](https://vercel.com):

1. Push the repo to GitHub
2. Import the project on Vercel
3. Vercel auto-detects Next.js — no config needed

## License

© 2025 Data Kurator. All rights reserved.
