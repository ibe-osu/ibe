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

## Design system — these are committed decisions, don't re-litigate them

- **Type**: PT Serif Caption (display / headings) + Source Sans 3 (body/UI),
  loaded via `next/font` in `src/app/layout.tsx`. The fluid `clamp()` scale
  lives in `src/theme/theme.ts`.
- **Color**: OSU scarlet `#ba0c2f` is the non-negotiable brand color; ink
  `#17181a`, secondary text `#494f53`, white stage. Square corners
  (`borderRadius: 0`) are a deliberate collegiate voice — don't round
  buttons or cards.
- **Heroes**: shared [`src/components/general/PageHero.tsx`](src/components/general/PageHero.tsx)
  — true-color photo, neutral bottom scrim, flush-left title. No scarlet
  tint over photographs.
- **Section grammar** (Sept 2026 redesign): flush-left grids (`4fr 8fr` or
  `5fr 7fr`) inside `Container maxWidth="xl"` with `px: { xs: 2.5, md: 4,
  lg: 6 }`, hairline rules (`divider`) instead of cards, and the program's
  numbers set as large scarlet serif figures in ruled rows (the "ledger").
  At most one scarlet band per page; the footer is ink.
- **Font stacks in `sx`**: import `serifFamily` / `sansFamily` from
  [`src/theme/fonts.ts`](src/theme/fonts.ts). Never use `(t) => t.typography…`
  callbacks in `sx` — server components can't serialize functions to MUI's
  client components and the page 500s.
- **Motion**: GSAP. Every animation needs a `prefers-reduced-motion`
  fallback, and content must be visible without JS (never gate visibility on
  a scroll/reveal animation).
- **Brand voice, audiences, and anti-references** are in
  [`PRODUCT.md`](PRODUCT.md). Read it before making visual/brand decisions.

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
