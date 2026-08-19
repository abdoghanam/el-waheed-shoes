# EL WAHEED SHOES

Premium B2B footwear manufacturing website for El Waheed Shoes (الوحيد للاحذية).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Payload CMS 3.88
- **Styling:** Tailwind CSS 4.3
- **Animations:** Motion v13
- **Database:** PostgreSQL (production) / SQLite (development)
- **Hosting:** Vercel
- **Language:** TypeScript 5.5+

## Getting Started

### Prerequisites

- Node.js 20.9+
- pnpm 9+

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URI and Payload secret

# Run development server
pnpm dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Payload CMS authentication secret |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL (default: `https://elwaheedshoes.com`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | WhatsApp contact number |
| `BLOB_READ_WRITE_TOKEN` | No | Vercel Blob storage token for media |
| `CSRF_SECRET` | No | CSRF signing secret (falls back to `PAYLOAD_SECRET`) |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token |

## Scripts

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm payload      # Run Payload CLI
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/[lang]/  # Public pages (EN/AR)
│   ├── (payload)/          # Payload CMS admin
│   └── api/                # API routes (contact, quote, newsletter, CSRF, OG)
├── components/
│   ├── sections/           # Page section components (42)
│   ├── layout/             # Header, Footer, TopBar
│   ├── ui/                 # Reusable UI components (14)
│   └── admin/              # Admin dashboard components
├── lib/                    # Utilities (i18n, CSRF, rate limiting, validation)
├── payload/                # CMS config, collections (8), globals (4)
└── middleware.ts           # Security headers, locale detection
```

## Features

- Full i18n (English/Arabic) with RTL support
- 20+ pages with SEO optimization (JSON-LD, hreflang, sitemap)
- Contact, Quote, and Newsletter forms with CSRF protection and rate limiting
- Payload CMS admin panel for content management
- Responsive dark-theme design with Motion animations
- WhatsApp integration and Google Analytics

## License

Proprietary. All rights reserved.
