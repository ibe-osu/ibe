---
name: seo
description: SEO and metadata work on ibeosu.com - adding or renaming a route, editing titles and descriptions, sitemap, robots, canonical URLs, Open Graph, JSON-LD structured data, headings, or anything a crawler sees. Use when the task touches src/app/*/page.tsx metadata, sitemap.ts, robots.ts, layout.tsx metadata, or when asked to audit or improve search presence.
---

# SEO

Reference: `docs/agent/SEO.md`. Everything is Next.js Metadata API plus two
static JSON-LD blobs; there is no SEO library.

## Adding or changing a route

1. `src/app/<slug>/page.tsx` exports `metadata` with `title` (the template
   appends " | IBE Honors Program"), a 120 to 160 character `description`
   that names the program and Ohio State, and `alternates.canonical`.
2. Add the URL to `src/app/sitemap.ts`. Gated or auth routes instead get
   `robots: { index: false, follow: false }` **and** an entry in
   `robots.ts`'s `disallow` list.
3. The page opens with `PageHero` carrying the only `h1`; sections are `h2`
   (`variant="h3" component="h2"`), subsections `h3`. No skipped levels.
4. Hero image into `HeroPrefetch.tsx`; nav entries into `Header.tsx`,
   `MobileMenuButton.tsx`, and the footer `Explore` list when it belongs in
   primary navigation.
5. Q&A content emits `FAQPage` JSON-LD from the same array that renders it
   (see `recruitment/page.tsx`).
6. Keep the page static. No `cookies()` or dynamic APIs on marketing pages.

## Editing site-wide metadata

`src/app/layout.tsx` owns the title template, default description,
keywords, Open Graph (`/altLogo.png` 778x262), Twitter card, `metadataBase`
(`https://ibeosu.com`), and the `EducationalOrganization` JSON-LD with the
three `sameAs` social URLs. Change socials there and in `Footer.tsx`
together.

## Audit

Run the checklist in `docs/agent/SEO.md` on a preview or localhost. It
also records the open apex-vs-www canonical mismatch; do not fix one side
of that alone. Report findings as a short list with the file to change for
each.
