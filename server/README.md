# Kota Associates — Backend

Self-contained Node.js + Express + PostgreSQL backend. No SaaS dependencies.

## Setup

```bash
cd server
npm install
cp .env.example .env       # then fill in values
npm run migrate            # create tables
npm start                  # or `npm run dev` for hot reload
```

Server runs on `http://localhost:4000`.

## Connect frontend

In the frontend project root, create `.env.local`:

```
VITE_API_URL=http://localhost:4000
```

The contact form and appointment booking will automatically POST to this URL. If `VITE_API_URL` is not set, the frontend falls back to `mailto:` and WhatsApp.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/api/health`        | —          | Health check |
| POST   | `/api/contact`       | —          | Submit contact form |
| POST   | `/api/appointment`   | —          | Book appointment |
| POST   | `/api/newsletter`    | —          | Subscribe email |
| GET    | `/api/appointments`  | `x-api-key`| List bookings |
| GET    | `/api/contacts`      | `x-api-key`| List enquiries |

Pass `x-api-key: <ADMIN_API_KEY>` header for admin routes.

## Tables

- `contact_submissions`
- `appointments`
- `newsletter_subscribers`

## Features

- Zod input validation
- Parameterised SQL (injection-safe)
- Helmet security headers
- CORS allowlist via `ALLOWED_ORIGIN`
- Rate limiting (20 writes / 10 min, 60 reads / min)
- Nodemailer notifications (admin + customer confirmation)
- Centralised error handler

## Production

Use a managed Postgres (RDS, Neon, etc.), set `NODE_ENV=production`, and run behind a reverse proxy (nginx / Caddy). Use a process manager such as `pm2` or `systemd`.
