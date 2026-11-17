# RankPilot — SEO Intelligence SaaS

A Next.js 15 starter for a multi-tenant SEO intelligence product inspired by the category of tools offered by SEMrush. It is an original interface and codebase, not a copy of SEMrush branding, proprietary UI assets, or datasets.

## Included in this ZIP

- Responsive SEO dashboard and domain search
- Domain overview, estimated organic/paid traffic cards, monthly trend chart
- Keyword ranking table, competitor preview and traffic-source panel
- Demo mode with clearly labelled illustrative data
- Server-side DataForSEO Labs connector for domain rank overview and ranked keywords
- API route validation and safe domain normalization
- Optional Similarweb connector placeholder for licensed traffic/channel data
- Supabase SQL schema with per-user row-level security for projects, reports, competitors and tracked keywords
- Environment template and deployment notes

## Critical data limitations

No public website can reveal another site's private Google Analytics data. Competitor traffic, traffic channels, backlinks and ranking metrics are estimates supplied by third-party datasets. Exact clicks, impressions and search queries require owner-authorized Google Search Console access; exact sessions and acquisition channels require owner-authorized analytics access.

Demo numbers and sample competitors are fictional and must never be presented as measured facts. Live DataForSEO mode returns provider-sourced domain ranking/keyword estimates; country/language are currently configured to United States / English in the adapter. Traffic-source mix is intentionally blank in live mode until a valid Similarweb API integration is configured.

## Requirements

- Node.js 20.9+
- DataForSEO account/API credentials for live SEO competitor data
- Optional Similarweb API subscription for estimated visits, engagement and channel mix
- Supabase project for persistence and authentication (schema supplied; authentication UI and persistence wiring are the next implementation stage)

## Run locally

1. Extract ZIP and open the folder in VS Code.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and add credentials.
4. Start: `npm run dev`
5. Open `http://localhost:3000`.

Without provider credentials, the analyzer uses illustrative demo data. To force demo mode, POST `{ "website": "example.com", "mode": "demo" }` to `/api/analyze`.

## Configure DataForSEO

Set `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` in local environment variables or Vercel Project Settings → Environment Variables. Never expose these credentials in `NEXT_PUBLIC_*` variables or browser code. The adapter uses:

- `POST /v3/dataforseo_labs/google/domain_rank_overview/live`
- `POST /v3/dataforseo_labs/google/ranked_keywords/live`

The API is usage-metered; review provider pricing and request costs before enabling analysis for end users. Provider response fields can evolve; validate mappings against your account's current API responses before production launch.

## Configure Similarweb

Set `SIMILARWEB_API_KEY` server-side only. The optional connector is a minimal starting point: the exact endpoint, data fields, country granularity and historical coverage must be selected to match your Similarweb API V5 entitlement. Do not treat the connector as production-ready until tested with your paid plan and mapped into the dashboard report model.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to environment variables.
4. Add server-only `SUPABASE_SERVICE_ROLE_KEY` only if a trusted server workflow needs it. Never ship it to the browser.

The schema is prepared for tenant-scoped persistence. The current dashboard is a working frontend/API starter; user authentication, project persistence, billing, background rank tracking, report history and scheduled jobs are not yet wired into the UI.

## Deploy to GitHub + Vercel

1. Create a GitHub repository and push this folder.
2. Import the repository into Vercel.
3. Add the environment variables in Vercel settings.
4. Deploy. Use Node.js 20.x or newer.
5. Test `/api/health` after deployment.

## Production hardening still required

Before selling this as a multi-user SaaS, implement Supabase Auth and project ownership checks on every database operation, API rate limiting, per-user provider quotas, billing and usage metering, durable job queue, caching, provider retry/backoff, audit logs, export generation, consent/privacy policy, data retention controls, monitoring and automated tests. Add crawl safety protections (block private/reserved IP ranges, DNS rebinding protection, redirect limits, response-size limits and timeouts) before enabling user-submitted URL crawling.

## Useful official API references

- DataForSEO Labs overview: https://docs.dataforseo.com/v3/dataforseo_labs-overview-2/
- DataForSEO domain rank overview: https://docs.dataforseo.com/v3/dataforseo_labs-google-overview/
- Similarweb Web Intelligence API: https://docs.similarweb.com/api-v5/api-reference/website-analysis-api
- Google Search Analytics API: https://developers.google.com/webmaster-tools/v1/searchanalytics
