# Go Together — Frontend

Next.js (App Router) front end for the **Go Together** events & activities platform. Talks to the backend REST API at `NEXT_PUBLIC_BASE_API_URL`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · react-hook-form + Zod · Stripe.js · Zustand.

---

## Demo accounts (one-click login)

The login page has one-click **Demo Login** buttons for each role. All demo users share the password **`Demo@1234`** (created by `pnpm run seed` in the backend repo):

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@gotogether.dev` | `Demo@1234` |
| Host | `host@gotogether.dev` | `Demo@1234` |
| User | `user@gotogether.dev` | `Demo@1234` |

---

## Getting started

```bash
npm install
cp .env.example .env    # fill in the values below
npm run dev             # http://localhost:3000
```

---

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_API_URL` | Backend API base, including `/api/v1` (e.g. `http://localhost:5000/api/v1`) |
| `NEXT_PUBLIC_API_URL` | Backend origin, used to build absolute URLs for legacy `/uploads` images |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Enables the payment dialog (`pk_test_...`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Enables the "Continue with Google" button (must match the backend) |

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | `biome check` |
| `npm run format` | `biome format --write` |

---

## Structure

```
src/
├─ app/                 # App Router: (commonLayout) public pages, (dashboardLayout) dashboards
├─ components/          # ui/ (shadcn) + modules/ (feature components) + shared/
├─ services/            # server actions — one folder per domain (auth, events, booking, reviews, admin, user…)
├─ lib/                 # server-fetch (attaches the accessToken cookie + proactive refresh), utils, formatters
├─ zod/                 # client-side Zod schemas
└─ proxy.ts             # middleware: token refresh + role-based route guard
```

**Data flow:** pages/components call **server actions** in `src/services/*`, which use `serverFetch` from `src/lib/server-fetch.ts`. `serverFetch` reads the `accessToken` cookie, calls `/auth/refresh-token` when needed, and forwards the cookie to the API. `src/proxy.ts` guards routes by role and refreshes tokens on navigation.

**Response shape:** every API response is `{ success, message, meta, data }`; list endpoints put `meta` (`page/limit/total`) at the top level and `data` is an array of records.

**Caching:** server actions revalidate Next cache tags (`all-events`, `single-event`, `my-hosted-events`, `user-bookings`, …) after mutations.
