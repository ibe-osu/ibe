# IBE Honors Program — Website

Marketing site for the Integrated Business & Engineering (IBE) Honors Program
at The Ohio State University, live at [ibeosu.com](https://ibeosu.com).

**Stack:** Next.js 15 (App Router) · React 19 · MUI 7 + Emotion · GSAP,
deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Before opening a pull request, both of these must pass:

```bash
npm run lint
npm run build    # also type-checks
```

## Contributing

`main` is the production branch — every merge auto-deploys to ibeosu.com, and
direct pushes to it are blocked. To make a change:

1. Branch off `main`, commit, and push
2. Open a pull request — CI (lint + build) must pass
3. Vercel posts a preview URL on the PR; check it before merging
4. Merge → production deploys automatically

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the full flow, and
[`PRODUCT.md`](PRODUCT.md) for the brand voice and design system this site
follows.
