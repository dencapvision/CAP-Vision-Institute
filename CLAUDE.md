# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CAP Vision Institute — a Thai corporate leadership training company. The repo contains two co-deployed applications:

- **Main site** (`./`): Vite + React 19 SPA serving the public website (`capvisionpartner.com`)
- **Admin dashboard** (`./cap-vision-admin/`): Next.js 15 app for content management (`admin.capvisionpartner.com`)

Backend is 100% Supabase: PostgreSQL database, Storage, and Edge Functions (Deno).

## Commands

### Main Site (Vite + React)
```bash
npm run dev        # Dev server on port 3000
npm run build      # TypeScript check + Vite build → dist/
npm run preview    # Preview production build
```

### Admin Dashboard (Next.js)
```bash
cd cap-vision-admin
npm run dev        # Dev server on port 3001
npm run build
npm run start
```

### Supabase Edge Functions
```bash
supabase functions deploy line-notify    # Deploy LINE notification function
supabase functions deploy web-app-notify # Deploy web-app specific notifier
supabase functions deploy ai-chat        # Deploy AI chat function
supabase db push                         # Apply migrations
```

### Deployment
Push to `main` → GitHub Actions sends webhook to `capvisionpartner.com/webhook/deploy` → VPS pulls and rebuilds. Admin uses `./scripts/deploy-admin.ps1`.

## Architecture

### Supabase Clients — IMPORTANT
Two separate clients exist with different permission scopes:

- **`lib/supabaseClient.ts`** — uses `VITE_SUPABASE_ANON_KEY`. Use for all normal data reads/writes (respects RLS).
- **`lib/supabaseAdmin.ts`** — uses `VITE_SUPABASE_service_role`. Only for operations that must bypass RLS (e.g., file uploads to Storage). Never use for user-data queries.

The admin dashboard has its own server-side Supabase client in `cap-vision-admin/lib/`.

### LINE Notification System
All form submissions trigger the `line-notify` Supabase Edge Function via `supabase.functions.invoke('line-notify', { body: { project, formType, data } })`.

The `project` string routes to different LINE OA credentials (stored as Supabase Edge Function secrets):

| `project` value | Credentials used | Use case |
|---|---|---|
| `CONTACT`, `JOIN_US`, `RESOURCES`, `SPEAKER_BOOKING`, `WEB_APP` | `LINE_CHANNEL_ACCESS_TOKEN` + `LINE_USER_ID` | CAP Vision main OA |
| `CEO_TIER` | `CEO_TIER_LINE_TOKEN` + `CEO_TIER_LINE_ADMIN_ID` (falls back to main) | CEO Tier community |
| `CEO_SPEECHFULNESS` | `CEO_SF_LINE_TOKEN` + `CEO_SF_LINE_ADMIN_ID` | CEO Speechfulness program |
| `DR_SO`, `SUB_SPEAKER` | `DR_SO_ACCESS_TOKEN` + `DR_SO_USER_ID` | Dr. So personal brand |
| `FA_OS` | `FA-OS_Access_Token` + `FA-OS_ID_Channel` | Facilitorium OS |

CEO_SF is also the global fallback when primary tokens fail.

### Key Service Layer
- **`services/`** — Supabase queries for courses, instructors, events, blog articles, portfolio, resources
- **`lib/`** — Domain-specific services: `courseService.ts`, `speakerService.ts`, `ceoService.ts`, `drsoService.ts`
- **`services/ai-*.ts`** — Google Gemini (`@google/genai`) integrations for article/caption/course generation
- **`constants/`** — Static brand data (contact info, speakers, services). Import from here rather than hardcoding.

### Page Structure
- **`pages/dashboard/`** — Protected dashboard views; `DashboardLayout.tsx` wraps all and hides the public Header/Footer
- **`pages/`** root — Public pages (lazy-loaded via React Router in `App.tsx`)
- Special programs: `CEOTierCommunity.tsx`, `CEOSpeechfulness.tsx`, `SubconsciousSpeaker.tsx`, `WebAppPricing.tsx`

### Database Migrations
All schema changes go in `supabase/migrations/` with timestamp-prefixed filenames. Apply with `supabase db push`.

## Environment Variables

**Main site** (`.env`):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_service_role` — service role key for admin operations
- `VITE_GEMINI_API_KEY`

**Admin dashboard** (`cap-vision-admin/.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

**Edge Function secrets** (set in Supabase dashboard, not in files):
LINE tokens for each project (see routing table above).
