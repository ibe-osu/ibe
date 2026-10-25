---
name: codebase
description: Explain or locate how the ibeosu.com site (ibe-osu/ibe) works - where a page, component, route, theme value, auth check, migration, or config lives, how a flow runs end to end, and why it is built that way. Use for "how does X work", "where is Y", and when explaining the codebase to a new officer.
---

# IBE codebase guide

Deep references, in the repo so they stay next to the code. Read the one
that matches the question, not all of them:

| Question | Read |
|---|---|
| Where is X, how is a page assembled, env, headers, middleware, CI | `docs/agent/ARCHITECTURE.md` |
| Colors, type, spacing, components, motion, review checklist | `docs/agent/DESIGN_SYSTEM.md`; values in `DESIGN.md` |
| Supabase projects, schema, RLS, signup flow, migrations, dashboard config | `docs/agent/DATABASE.md` |
| Metadata, sitemap, robots, JSON-LD, adding a route | `docs/agent/SEO.md` |
| Branch, PR, review, merge, what needs the VP of Tech | `docs/agent/WORKFLOW.md` |
| Current state, blockers, open decisions, gotchas | `HANDOFF.md` |
| Brand voice, audiences, anti-references | `PRODUCT.md` |

## The map in one screen

```
src/app/            routes; each page.tsx = metadata + ordered section components
  layout.tsx        fonts, site metadata, Organization JSON-LD, ThemeProvider, Header, Footer, analytics
  /  about  recruitment  alumni  student-life       public marketing pages
  login  signup  auth/callback                       auth flow (noindex)
  members  members/alumni-database                   gated by requireMember() (noindex)
  sitemap.ts robots.ts manifest.ts globals.css
src/components/<page>/   one file per section; "use client" only when hooks/GSAP/Supabase are needed
src/components/general/  Header, Footer, NavButton, MobileMenuButton, PageHero, Reveal, HeroPrefetch
src/components/auth/     LoginForm, SignupForm, AccountMenu, AuthNavLinks
src/theme/theme.ts       the design system as an MUI theme
src/lib/env.ts           the only env reader (two NEXT_PUBLIC_ vars; no secret key anywhere)
src/lib/supabase/        client.ts (browser), server.ts (RSC), middleware.ts (cookie refresh only)
src/lib/auth/guards.ts   requireMember()/requireAdmin(): the real gate for /members
src/data/                calendar.ts, sponsors.ts
supabase/migrations/     the schema, in order; docs/agent/DATABASE.md describes each one
.github/workflows/       ci.yml (lint+build on PRs), keepalive.yml (Mon+Thu Supabase ping)
docs/agent/              the deep references above; docs/ holds the runbooks
plugins/ibe-tech/        this plugin
```

## Things an agent gets wrong without being told

- Pages are Server Components; styling is MUI `sx`; no Tailwind, no CSS
  modules, no CMS. Content is typed arrays inside components.
- Middleware only refreshes the session cookie. Authorization is
  `requireMember()` on each page plus Postgres RLS.
- `useMediaQuery` must not decide server-rendered layout. CSS breakpoints
  or a mounted flag.
- Two Supabase projects: `ibe-staging` (dev, CI, previews, resettable) and
  `ibe-prod` (ibeosu.com, VP-only). Both pause after 7 idle days.
- The code comments are the design record; quote them when asked why.

## How to answer

- Cite `path:line`. Walk flows in order, naming the file at each step.
- If no reason is recorded, say so instead of inventing one.
- For a deep or multi-file question, dispatch the `codebase-guide` agent
  and relay its findings.
- If docs and code disagree, trust the code and flag the doc.
