# IBE Honors Program — Website

Marketing site for the Integrated Business & Engineering (IBE) Honors Program
at The Ohio State University. **Next.js 15 (App Router) · React 19 · MUI 7 +
Emotion · GSAP**, deployed on Vercel to <https://ibeosu.com>.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Before opening a pull request, both of these must pass:

```bash
npm run lint
npm run build    # also type-checks
```

## Deployment flow — read before pushing anything

`main` is the **production** branch: every merge to `main` auto-deploys to
ibeosu.com. **Never push directly to `main`** (branch protection blocks it).
Instead:

1. Branch off `main`: `git checkout main && git pull && git checkout -b my-change`
2. Commit, push, and open a Pull Request (`gh pr create`).
3. **CI** (GitHub Actions) runs lint + build on the PR — it must be green.
4. **Vercel** posts a **preview URL** on the PR — open it and verify your
   change in a real browser, desktop and mobile.
5. Merge the PR → production deploys automatically (~1–2 min).

Full details, including the emergency-bypass procedure, are in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## If you are a coding agent

- Follow the branch → PR → preview → merge flow above. Do **not** commit to
  `main` or bypass branch protection, even if you have the permissions to.
- After opening a PR, report the CI status and the Vercel preview URL, and
  confirm you visually verified the change (don't rely on the build alone).
- Keep changes scoped; match the surrounding code's style.

## Design system (Sept 2026 overhaul) — committed decisions

- **Brand constraints**: the IBE logo, scarlet `#ba0c2f` on white (light) and
  scarlet on near-black (dark). Everything else is open.
- **Themes**: MUI color schemes with CSS variables
  (`cssVariables: { colorSchemeSelector: "class" }` in
  [`src/theme/theme.ts`](src/theme/theme.ts)); `InitColorSchemeScript` in the
  layout prevents a flash; `ThemeToggle` uses `useColorScheme`. Always use
  tokens in `sx` — `background.default/paper/panel`, `text.*`, `divider`,
  `signal.main` (scarlet tuned for text on the current ground; `primary.main`
  stays brand scarlet for fills). Never hard-code `#fff` except on scarlet.
- **Type**: Bricolage Grotesque (display, 600) + Source Sans 3 (body) +
  Geist Mono (labels, figures, dates), via `next/font` in `layout.tsx`.
  Import `displayFamily` / `bodyFamily` / `monoFamily` from
  [`src/theme/fonts.ts`](src/theme/fonts.ts) for `sx`. Never use
  `(t) => …` callbacks in `sx` — server components can't serialize functions
  to MUI's client components and the page 500s.
- **Layout**: centered. `Wrap` (1120px, or `width="text"` for 68ch) and
  `Panel` (hairline border, 8px radius, paper tint) in `src/components/ui/`.
  Sections stack with `pt: { xs: 8, md: 12 }`; `SectionHead` centers a
  label + title + lede. No left-heading/right-content grids.
- **Heroes**: [`PageHero`](src/components/general/PageHero.tsx) = centered
  title + lede, then the photo in a `PhotoPanel` (requested at panel width,
  `priority` only there). No scrims, no full-bleed.
- **Motion budget**: one `rise`/`settle` CSS entrance per page, count-ups
  (`useCountUp`), hover states, the marquee. No scroll-triggered reveals, no
  GSAP page choreography, never animate the LCP element's opacity. Every
  animation respects `prefers-reduced-motion`; content is visible without JS.
- **Dark-mode assets**: raster brand assets drawn for white get
  `className="invert-on-dark"`; logo walls use
  `.dark & img { filter: grayscale(1) invert(1) }`.
- **Performance/SEO bar**: Lighthouse SEO and accessibility stay at 100;
  LCP target < 2.5 s mobile. Check with `npx lighthouse` against
  `npm run build && npm run start` (see the plan file for the recipe).

## Conventions

- TypeScript throughout; style with MUI's `sx` prop.
- When adding a route, keep its `metadata` (title/description/canonical) and
  [`src/app/sitemap.ts`](src/app/sitemap.ts) in sync.
- Real cohort photography lives in `public/people`, `public/spotlight`,
  `public/testimonial`, `public/happenings`. Prefer real photos over
  illustration.
- Icons/favicons are generated into `src/app/` (`icon.png`, `apple-icon.png`)
  and `public/` (`icon-192.png`, `icon-512.png`) with the manifest at
  `src/app/manifest.ts`.
