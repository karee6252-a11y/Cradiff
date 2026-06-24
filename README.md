# Cardiff International School (CIS)

A premium, modern marketing website for **Cardiff International School** — built with
Next.js, Tailwind CSS and Framer Motion. Elegant, minimal, luxury UI with a deep
burgundy brand identity, glassmorphism, glowing hover effects and smooth animations.

## ✨ Features

- **6 pages** — Home, About, Academics, Gallery, Careers, Contact
- **Luxury design system** — deep burgundy palette, glassmorphism, soft shadows, glow effects
- **Animated everything** — Framer Motion reveals, animated gradient hero, particle/aurora background, animated nav underlines, scroll progress bar
- **Dark / Light mode** — defaults to dark, persisted in `localStorage`, no flash on load
- **Sticky transparent navbar** — turns into a solid glass bar on scroll
- **Gallery** — masonry grid with an animated lightbox (keyboard + arrow navigation)
- **Careers** — job listings + application form with **CV upload**
- **Email delivery** — Careers & Contact submissions are emailed **only** to `saifmadoy707@gmail.com`
- **SEO optimised** — metadata, Open Graph, Twitter cards, `sitemap.xml`, `robots.txt`
- **Fully responsive** & accessible, respects `prefers-reduced-motion`

## 🧱 Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Nodemailer](https://nodemailer.com/) for transactional email
- TypeScript

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📧 Email configuration

Both the **Careers** application form and the **Contact** form send submissions to
`saifmadoy707@gmail.com`. The recipient address is **hard-coded** in the API routes
(`src/app/api/careers/route.ts` and `src/app/api/contact/route.ts`) so it can never
be changed by user input.

To enable real delivery, copy `.env.example` to `.env.local` and fill in a sender
account (the address that *sends* the email):

```bash
cp .env.example .env.local
```

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-sender-email@gmail.com
SMTP_PASS=your-app-password      # Gmail → enable 2FA → create an App Password
SMTP_FROM="Cardiff International School <your-sender-email@gmail.com>"
```

> If SMTP credentials are not set, the forms return a friendly error and ask
> visitors to email directly. No submission is silently lost.

## 📁 Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── careers/route.ts     # CV upload + email (→ saifmadoy707@gmail.com)
│   │   └── contact/route.ts     # contact email (→ saifmadoy707@gmail.com)
│   ├── about/ academics/ gallery/ careers/ contact/
│   ├── layout.tsx               # fonts, theme, navbar, footer, background
│   ├── page.tsx                 # home
│   ├── sitemap.ts · robots.ts
│   └── globals.css              # design system
├── components/                  # navbar, footer, background, sections, ui kit
└── lib/site.ts                  # all editable site content
```

## 🎨 Brand

| Token            | Value     |
| ---------------- | --------- |
| Primary burgundy | `#6A0D0D` |
| Burgundy light   | `#8B1A1A` |
| Burgundy dark    | `#4A0707` |
| Burgundy glow    | `#B91C1C` |
| Background (dark)| `#0A0A0A` |

Headings use **Poppins / Montserrat**, body uses **Inter**.

## 🏗️ Production build

```bash
npm run build
npm start
```

## ▲ Deploy to Vercel

This project is optimised for zero-config deployment on Vercel:

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, **Import Project** — the framework is auto-detected as **Next.js**
   (build command `next build`, output handled automatically). No overrides needed.
3. Add the environment variables from `.env.example` under
   **Project → Settings → Environment Variables** (`SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) for the Production (and Preview) scope.
4. Deploy. Static pages are pre-rendered; the `/api/contact` and `/api/careers`
   routes run on the Node.js runtime for Nodemailer support.

### Performance & responsiveness

- All imagery uses `next/image` with AVIF/WebP output and correct `sizes`.
- Heavy UI libraries are tree-shaken via `optimizePackageImports`.
- The decorative particle canvas is lightened on mobile and pauses when the tab
  is hidden, respecting `prefers-reduced-motion`.
- Fully responsive from **320px → desktop**: a full-screen hamburger menu,
  44px+ touch targets, 16px form inputs (no iOS zoom), fluid type and reduced
  spacing on small screens, with no horizontal scrolling.
