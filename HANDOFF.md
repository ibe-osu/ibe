# Handoff: IBE Website — making it look less boring

## Where things live

- **Repo**: `yuvi-atre/ibe` (Next.js 15 + MUI 7, App Router)
- **Working directory**: `/Users/yuvia/IBE Website/.claude/worktrees/website-ui-seo-revamp-aeb25c` (a git worktree)
- **Branch**: `claude/website-ui-seo-revamp-aeb25c`
- **PR**: https://github.com/yuvi-atre/ibe/pull/50
- **Live preview**: https://ibe-website-preview.vercel.app (deployed under the `yuvi-atres-projects` Vercel account, NOT the production Vercel integration for ibeosu.com — that integration lives under a different account and never picked up this branch when checked)
- **Context docs already in repo root**: `PRODUCT.md` (register: brand, users, design principles for the `impeccable` skill)

## What's been done this session (all committed, pushed, deployed)

1. **Design system revamp** — PT Serif Caption (display) + Source Sans 3 (body/UI), fluid `clamp()` type scale, OSU scarlet `#ba0c2f` + ink `#17181a` palette, square-corner button system (`src/theme/theme.ts`, `src/app/globals.css`)
2. **Header/footer** — sticky blur header with active-page nav underlines, uppercase collegiate nav type, Home link added, three-column footer (`src/components/general/Header.tsx`, `Footer.tsx`, `NavButton.tsx`)
3. **Motion layer** — GSAP hero entrances, scroll-reveal system (`src/components/general/Reveal.tsx`), stats count-up (`OurStats.tsx`), all `prefers-reduced-motion` and hidden-tab safe
4. **SEO** — `sitemap.ts`, `robots.ts`, `EducationalOrganization` + `FAQPage` JSON-LD, per-page canonicals/descriptions, skip-to-content link
5. **Image loading fix** — static imports + blur placeholders + idle prefetch so hero banners don't pop in on page nav (`HeroPrefetch.tsx`, `PageHero.tsx`)
6. **Eboard roster updated** — new officers (Katie Dunn as President, Carlo Polisena as EVP, Riley Angel, Anya Mehta, Emma Cheng, Devhuti Patel, Charles Hite, Yuvraj Atre), new headshots in `public/people/`. `IndividualCard.tsx` now supports `imageUrl: null` → accessible initials placeholder for people without a photo yet (Charles Hite currently uses this).

Everything above passes `tsc --noEmit`, ESLint, and `npm run build` (11 static routes). This part of the work is **not** what's under discussion below — don't second-guess the SEO/motion/roster work unless something's actually broken.

## The actual ask: the site looks "boring"

The user's words: *"I know it can be better I just don't know how we get there because it looks boring right now."* This is their personal project ("my baby") — they're emotionally invested and currently disappointed, not just nitpicking. Take this seriously as the primary creative problem to solve, not a minor polish pass.

I gave this honest diagnosis (paraphrased) of why a technically-correct site still reads as boring:

1. **Every hero uses the identical formula.** Home, About, Alumni all do: full-bleed photo → scarlet tint overlay → dark gradient → centered white heading + centered subtitle. Five pages, one move. Reads as a template, not a design decision. See `src/components/general/PageHero.tsx` (shared by About/Alumni) and `src/components/home/Welcome.tsx` (home hero, bespoke but same visual formula).
2. **Scarlet is decoration, not identity.** It's confined to thin accent bands — the stats strip (`OurStats.tsx`), the footer, the nav underline, the 35%-opacity hero tint. The rest of the site is white/gray. OSU scarlet is a strong, specific brand color and the site is currently timid with it. Per the `impeccable` skill's brand register, this project has explicit permission to use a "Committed" or even "Drenched" color strategy (one saturated color carrying 30–60%+ of a surface) — right now it's stuck at "Restrained."
3. **Everything is centered and symmetric.** Centered hero copy, centered section titles (`variant="h3" ... textAlign: "center"` shows up constantly), evenly-spaced/symmetric card grids for the Eboard (`StudentLeadership.tsx`, `SeniorLeadership.tsx`) and stats (`OurStats.tsx`). No asymmetric composition anywhere, nothing for the eye to land on first. This is the single most template-reading trait.

## Proposed direction (not yet started — user hasn't confirmed scope)

I recommended focusing on 2-3 places it'll matter most rather than a blanket redesign:

- **Vary the hero treatment per page** instead of repeating the photo-tint-gradient-centered-text formula everywhere. Home, About, Alumni could each have a genuinely different composition (asymmetric crop + off-center type on one, a drenched-scarlet moment with no photo at all on another, etc.)
- **Let scarlet actually dominate somewhere** — not just as an accent band, but as a surface color carrying a real section (a "Committed" or "Drenched" moment per the brand register, not just a 35%-opacity photo tint)
- **Break the centered-grid reflex** on at least one section — the Eboard grid in particular is a textbook "identical card grid" (evenly-spaced photo + name + role + email, repeated 10x). Worth asking whether a different affordance serves the content better, or whether breaking the grid's symmetry (varied sizes, offset rows, asymmetric hero card for the President) would read as art-directed instead of assembled.

**Important constraints to preserve while doing this:**
- OSU scarlet `#ba0c2f` / gray `#646A6E` / white are non-negotiable — this is university branding, not a free palette choice
- WCAG AA contrast (body text ≥4.5:1), keyboard nav, `prefers-reduced-motion` alternatives — already solid, don't regress
- Responsive at 375/768/1280+ — verified clean this session, re-verify after changes
- Read `PRODUCT.md` at repo root before making register/brand decisions — it has the confirmed brand personality, anti-references, and design principles from earlier in this project's `impeccable` skill setup

## Process notes / gotchas from this session

- Browser-pane **screenshots were flaky** for a stretch (returned blank white images even though the page had rendered) — when that happens, verify via `javascript_tool` computed-DOM checks (font, color, image `naturalWidth`, etc.) instead of trusting the screenshot. Worked reliably every time it was tried.
- **Vercel**: the CLI is authenticated as `yuvi-atre` but the *production* ibeosu.com deployment integration is on a different account/scope that this session couldn't see. The preview deployed here is a separate sandbox project (`ibe-website-preview` under `yuvi-atres-projects`) — merging the PR may or may not trigger the real production deploy; that's unconfirmed.
- After any `npm run build`, the dev server's `.next` dir gets clobbered — restart the dev server before continuing to browser-test.
- Deploying via `npx vercel deploy --yes` creates a new deployment URL each time; the stable alias `ibe-website-preview.vercel.app` needs `npx vercel alias set <new-url> ibe-website-preview.vercel.app` after every deploy or it keeps pointing at the old one.
