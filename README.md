# Reteno AI — Frontend

Next.js (App Router) frontend for Reteno AI. This is the **foundation
milestone**: project shell, layout/navigation scaffolding, an API client
foundation, and a landing page + dashboard-layout preview. No auth, no real
data fetching, no knowledge-card features — those are later milestones.

## Structure

```text
frontend/
├── app/
│   ├── layout.tsx           Root layout, fonts, metadata
│   ├── page.tsx              Marketing landing page (public)
│   ├── dashboard/page.tsx    Preview of the future in-app layout
│   ├── loading.tsx           Global route loading UI
│   ├── error.tsx              Global error boundary
│   ├── not-found.tsx         Custom 404
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx     Sidebar + content wrapper for in-app views
│   │   ├── sidebar.tsx        Navigation (Library / Review / Search / Settings — placeholders)
│   │   └── nav-items.ts
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── loading-state.tsx
│   │   └── error-state.tsx
│   └── backend-status.tsx    Demonstrates the API client against a real endpoint
├── lib/
│   ├── config.ts             NEXT_PUBLIC_API_URL, app name
│   └── api.ts                 Typed fetch wrapper + getHealth()/getDetailedHealth()
├── types/index.ts
├── .env.local.example
└── package.json
```

## Quickstart

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Visit http://localhost:3000. The landing page's "Get Started" button goes to
`/dashboard`, a preview of the future app layout with a live backend
connectivity check (requires the backend running — see the backend repo's
README — otherwise it shows the error state with a retry button).

## Backend contract

The frontend currently only calls what the backend actually exposes:

```text
GET /api/v1/health
GET /api/v1/health/detailed
```

Both are wrapped in `lib/api.ts`. No other backend calls exist yet.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the FastAPI backend. Defaults to `http://localhost:8000` if unset. |

Nothing else is read from the environment yet. No Supabase keys, no secrets —
`NEXT_PUBLIC_*` is the only prefix ever safe to use here, and there's nothing
server-only to store at this milestone.

## Verification

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck    # tsc --noEmit
npm run build
```
