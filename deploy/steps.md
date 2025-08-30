# Deployment Plan (v0)

## 0) Repos & Branching
- Create monorepo `aspect-console` with packages:
  - `apps/web` (Next.js, dark theme, Agent Viewer, countdown)
  - `apps/uploader` (public YouTube uploader)
  - `apps/mobile` (controller APK/AAB when ready)
  - `packages/ui` (shared Tailwind + shadcn)
  - `packages/agents` (SDK stubs + workflows)
- Import existing working components where available.

## 1) Secrets & Config
- Copy `/config/.env.example` to `.env` files per app.
- Configure CI for repo-level secrets (Vercel/Render/GitHub Actions).

## 2) CI/CD
- Web: Vercel with preview deploys; production to primary domain.
- API/Agents: Render/DigitalOcean with Docker; health checks + autoscale.
- n8n: Restore with Postgres; secure HTTPS (Caddy/Traefik); IP allowlist.

## 3) DNS & SSL
- apex: aspectmarketingsolutions.app → web
- subdomains:
  - flow. → n8n
  - console. → Agent Viewer
  - upload. → YouTube uploader
  - dao. → DAO Explorer

## 4) Data & Integrations
- Reconnect: Etsy, Printify, YouTube, Telegram, Stripe.
- Restore webhooks → n8n; seed initial workflows from agents manifest.

## 5) Launch Checklist
- Livestream embed operational; countdown timer enabled.
- All links/videos verified.
- Store items populated from `/store/products.csv`.
- Legal pages live (Terms, Privacy).
- SMS/Email alerts enabled for critical events.
