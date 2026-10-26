# Architecture

The marketing site and members area for the Integrated Business & Engineering
(IBE) Honors Program at The Ohio State University. Live at
<https://ibeosu.com>. Repo: `ibe-osu/ibe` on GitHub (public).

## Stack

| Layer | Choice | Why it matters |
|---|---|---|
| Framework | Next.js 15, App Router, React 19, TypeScript strict | Pages are Server Components by default. Anything with hooks, GSAP, or browser APIs is a `"use client"` leaf. |
| UI | MUI 7 + Emotion, styled with the `sx` prop | One theme object in `src/theme/theme.ts` carries type, palette, shape, and component overrides. No Tailwind, no CSS modules. |
| Motion | GSAP 3 + `@gsap/react` (`useGSAP`), ScrollTrigger | Every animation guards `prefers-reduced-motion` and `document.hidden`. Content never depends on an animation firing. |
| Forms | react-hook-form + zod 4 (`z.email()`, `.transform`, `.refine`) | Only the login and signup forms so far. |
| Auth + DB | Supabase (Postgres, Auth, RLS) via `@supabase/ssr` | Two hosted projects: `ibe-staging` and `ibe-prod`. See `DATABASE.md`. |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` | Mounted once in the root layout. |
| Hosting | Vercel, Hobby plan, team `ohiostateibes-projects`, project `ibe` | `main` deploys to production. Every PR gets a preview URL. Previews are behind Vercel SSO, so only Vercel team members can open them. |
| CI | GitHub Actions `verify` job: `npm ci`, `npm run lint`, `npm run build` | Branch protection on `main` requires `verify` to pass. No approvals are required, but the PR must exist. |
| Node | 20 in CI (`actions/setup-node@v4`); 24 works locally | There is no `.nvmrc`. |

Scripts in `package.json`:

```bash
npm run dev        # next dev --turbopack, http://localhost:3000
npm run build      # next build (also the type check)
npm run lint       # next lint
npm run db:start   # supabase start (local Postgres + Studio at :54323)
npm run db:reset   # supabase db reset (re-runs migrations + seed)
npm run db:types   # supabase gen types typescript --local > src/types/database.ts (file is not committed yet)
```

## Directory map

```
src/
  app/                      Routes. One folder per URL. Server Components.
    layout.tsx              Root: fonts, metadata, JSON-LD, ThemeProvider, Header, Footer, analytics
    page.tsx                /            Home
    about/page.tsx          /about
    recruitment/page.tsx    /recruitment (also emits FAQPage JSON-LD)
    alumni/page.tsx         /alumni
    student-life/page.tsx   /student-life
    login/page.tsx          /login        noindex
    signup/page.tsx         /signup       noindex
    members/page.tsx        /members      gated by requireMember(), noindex
    members/alumni-database/page.tsx      gated alumni directory (server query + client search)
    auth/callback/route.ts  GET handler that finishes email confirmation
    sitemap.ts robots.ts manifest.ts      SEO + PWA metadata routes
    globals.css             CSS variables, resets, skip link, reduced-motion kill switch
    icon.png apple-icon.png favicon.ico   Generated icons
  components/
    general/                Shared chrome: Header, Footer, NavButton, MobileMenuButton,
                            PageHero, Reveal, HeroPrefetch
    home/ about/ recruitment/ alumni/ student-life/   One folder per page, one file per section
    auth/                   LoginForm, SignupForm, AccountMenu, AuthNavLinks
    members/                MembersCalendar; alumni/ holds the directory (AlumniDirectory,
                            FilterPanel, AlumniCard, AlumniProfileDialog)
  data/
    calendar.ts             Google Calendar id + URL builders for /members
    sponsors.ts             Sponsor logo list for the home page
  lib/
    env.ts                  The only place env vars are read
    supabase/client.ts      Browser client (Client Components)
    supabase/server.ts      Server client (Server Components, route handlers)
    supabase/middleware.ts  updateSession(): refreshes the auth cookie, nothing else
    auth/guards.ts          requireMember(), requireAdmin(): the real gate
    auth/inviteCode.ts      Client-side shape check for IBE-XXXX-XXXX codes
    auth/useAuthState.ts    Cosmetic signed-in state for the header
    alumni/directory.ts     Directory types, search, facets, suggestions (ported from ibe-connect)
    alumni/industry.ts      Industry inferred from the current role, for the filter
  middleware.ts             Runs updateSession() on every non-asset request
  theme/
    theme.ts                MUI theme: fonts, fluid type scale, palette, overrides
    ThemeProvider.tsx       Client wrapper: MuiThemeProvider + CssBaseline
supabase/
  config.toml               Local Supabase config (Postgres 17, min password 10)
  migrations/               The entire schema, in order. See DATABASE.md
public/
  people/ spotlight/ testimonial/ happenings/ recruitment/   Real cohort photography
  companies/                SVG logos (alumni marquee + sponsor wall)
  coursework/               The four-year plan diagram (SVG, two crops)
  altLogo.png logo.png      Brand marks; altLogo.png is the header logo and OG image
  welcome.jpeg welcome-vertical.jpeg about.jpg alumni.jpg   Page heroes
.github/workflows/
  ci.yml                    verify job on PRs and on main
  keepalive.yml             Mon + Thu ping so the free-tier Supabase projects never pause
docs/                       Runbooks. docs/agent/ is this folder.
```

Path alias: `@/*` maps to `src/*`. Prefer it over relative `../../..` imports
except for static image imports from `public/`, which the existing code does
with relative paths so `next/image` can produce blur placeholders.

## How a page is assembled

1. `src/app/layout.tsx` is a Server Component. It loads the two Google fonts
   through `next/font` (self-hosted at build time, exposed as CSS variables
   `--font-pt-serif-caption` and `--font-source-sans`), sets site-wide
   `metadata`, injects the `EducationalOrganization` JSON-LD, and wraps
   everything in `AppRouterCacheProvider` (Emotion SSR) and `ThemeProvider`.
2. A route's `page.tsx` is a thin Server Component: `export const metadata`
   plus a fragment of section components in order. It should contain no
   styling and no logic. Look at `src/app/alumni/page.tsx` as the template.
3. Each section component lives in `src/components/<page>/`. Sections that
   need hooks, GSAP, swipe, or Supabase start with `"use client"`. Sections
   that are pure markup (Sponsors, IndividualCard, InfoCard, Footer) stay
   server-rendered, which keeps the shared JS bundle small.
4. Shared chrome is `Header` (sticky AppBar, desktop nav + mobile Drawer) and
   `Footer` (scarlet band, three columns). `HeroPrefetch` warms the other
   pages' hero images after load so client-side navigation never shows a
   blank band.

Content is hardcoded in the components as typed arrays (`MILESTONES`,
`faqItems`, `CARDS`, leadership rosters, speaker lists). There is no CMS. A
content change is a PR. The one live feed is the Google Calendar embed on
`/members`; a server-fetched Instagram feed for `/student-life` exists as
an open PR (see `HANDOFF.md` and `gh pr list`).

## Rendering and hydration rules learned the hard way

- `useMediaQuery` resolves to the desktop value during SSR, then flips on
  the client. Rendering layout off it causes a hydration mismatch React will
  not patch. Either decide breakpoints in CSS (see `SpeakerCarousel.tsx`,
  which uses a `--card-w` custom property with `sx` breakpoints) or gate the
  dependent markup on a `mounted` flag (see `MembersCalendar.tsx`).
- `useSearchParams()` needs a `<Suspense>` boundary around the component
  that calls it (`login/page.tsx`).
- MUI `Menu` must receive a flat array of children, never a Fragment
  (`AccountMenu.tsx`).
- `npm run build` clobbers a running dev server's `.next`. Restart `dev`
  after a build.

## Environment

Only two variables exist, both read in `src/lib/env.ts`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

They are public by design. The publishable key ships in the browser bundle;
access control is Postgres RLS, not key secrecy. There is deliberately no
`SUPABASE_SECRET_KEY` anywhere in this app, CI, or Vercel. If a task seems to
need it, the task belongs in a Supabase Edge Function.

- Locally: copy `.env.example` to `.env.local` and point it at `ibe-staging`.
- CI: the staging values are plain env in `ci.yml`.
- Vercel: Preview environment points at staging, Production at prod. Vercel
  applies env changes only to new builds; redeploy after changing one.
- Missing env degrades gracefully: middleware passes requests through,
  `useAuthState` reports signed-out, `requireMember()` redirects to `/login`,
  forms show a "not available right now" error. The marketing pages must
  never break because auth is unconfigured.

## Security headers and CSP

`next.config.ts` sets HSTS (2 years, includeSubDomains), nosniff,
`X-Frame-Options: DENY`, a referrer policy, a permissions policy, and a
Content Security Policy that is currently **report-only** (`enforceCsp =
false`). The CSP is static, not nonce-based, on purpose: a nonce would force
dynamic rendering of every static marketing page and MUI's cache provider
cannot take a nonce. `'unsafe-inline'` in `script-src` is the accepted cost;
it is safe only while nothing renders user-generated HTML. The only
`dangerouslySetInnerHTML` calls are the two JSON-LD blobs.

Frame sources are limited to YouTube (home video) and Google Calendar
(members page). `connect-src` includes the Supabase origin when the env var
is set. Flipping `enforceCsp` to `true` is a planned PR; do it only after
walking every page on a preview with the console open and seeing zero
violations.

## Middleware is not security

`src/middleware.ts` only refreshes the Supabase session cookie. Next.js
middleware has a history of bypass CVEs (CVE-2025-29927 was patched here in
PR 53), so no authorization lives there. The real gate is
`requireMember()` at the top of every `/members` page plus RLS in Postgres.
Do not add redirects for unauthenticated users to middleware; add them to the
page.

## Related repos and services

- **ibe-connect**: a separate Vite + React + shadcn SPA, a Lovable
  prototype of the alumni directory with statically bundled data, kept by
  the VP of Tech. Its search and filters were ported into
  `/members/alumni-database`; nothing imports it. It bundles its data into
  the page, so it is retired once the directory ships on prod.
- **Google Calendar** "IBE Event Calendar" is public; officers edit it in
  Google. The id lives in `src/data/calendar.ts`.
- **Porkbun** holds the domain, with nameservers delegated to Vercel, so DNS
  records are edited in the Vercel dashboard. Account pointers are in
  `docs/OFFICER_HANDOFF.md`.
