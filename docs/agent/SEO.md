# SEO and metadata

The site exists to convert admitted honors students into applicants, so
search presence for "IBE Ohio State", "Integrated Business and Engineering",
and "Ohio State honors business engineering" matters. Lighthouse SEO on
`main` is 100; keep it there.

## Where everything lives

| Concern | File |
|---|---|
| Site-wide title template, description, keywords, Open Graph, Twitter card, robots, `metadataBase`, `themeColor` | `src/app/layout.tsx` |
| Organization structured data (`EducationalOrganization` with `parentOrganization` OSU and `sameAs` socials) | `src/app/layout.tsx` (`organizationJsonLd`) |
| Per-page title, description, canonical | each `src/app/<route>/page.tsx` |
| FAQ structured data (`FAQPage`, built from `faqItems`) | `src/app/recruitment/page.tsx` |
| Sitemap | `src/app/sitemap.ts` |
| Robots (disallows `/members`, `/login`, `/signup`, `/auth`) | `src/app/robots.ts` |
| Web app manifest, icons | `src/app/manifest.ts`, `src/app/icon.png`, `apple-icon.png`, `public/icon-192.png`, `icon-512.png` |
| Fonts (self-hosted by `next/font`, `display: swap`) | `src/app/layout.tsx` |
| Hero image priority and blur placeholders | `PageHero.tsx`, `Welcome.tsx` |
| Heading hierarchy, landmarks, skip link | each section; `layout.tsx` |

Canonical host is `https://ibeosu.com` (apex). **Known mismatch:** Vercel
currently redirects apex to `www.ibeosu.com`, while `metadataBase`, the
sitemap, and every canonical say the apex. Pick one and align Vercel's domain
settings with the code; the code side is a one-line change in `layout.tsx`
and `sitemap.ts`.

## Adding a route

1. Create `src/app/<slug>/page.tsx` with:
   ```ts
   export const metadata: Metadata = {
     title: "Short Title",            // becomes "Short Title | IBE Honors Program"
     description: "One or two sentences, 120 to 160 characters, with the program name and Ohio State.",
     alternates: { canonical: "/<slug>" },
   };
   ```
2. Add the URL to `src/app/sitemap.ts` with a sensible `changeFrequency`
   and `priority` (home 1, recruitment 0.9, about 0.8, others 0.7).
3. If the page is gated or transactional, do the opposite: `robots: { index:
   false, follow: false }` in its metadata **and** add it to the `disallow`
   list in `robots.ts`. Belt and suspenders, as the existing comment says.
4. Give it a `PageHero` with a real `h1` and descriptive `imageAlt`.
5. Add the hero image to `HeroPrefetch.tsx`.
6. Add the nav entry in `Header.tsx`, `MobileMenuButton.tsx`, and the
   footer `Explore` list if it belongs in primary navigation.
7. If the page has Q&A content, emit `FAQPage` JSON-LD from the same data
   array that renders the questions, as `recruitment/page.tsx` does.

## Rules

- One `h1` per page, in the hero. Section titles are `h2` (rendered with
  the `h3` style), subsections `h3`. Never skip levels.
- Descriptions are written for a prospective student or parent, name the
  program and the university, and avoid marketing filler.
- Every image has meaningful `alt`. Decorative layers are `aria-hidden`.
- Internal links use `next/link`. External links get
  `rel="noopener noreferrer"`.
- JSON-LD is the only place `dangerouslySetInnerHTML` is allowed, and it
  must be `JSON.stringify` of a static object.
- Keep marketing pages static (no `cookies()`, no dynamic rendering) so
  they stay CDN-cached. That is also why the CSP is not nonce-based.
- Do not add third-party scripts beyond Vercel analytics without updating
  the CSP in `next.config.ts` and re-checking the preview console.

## Audit checklist (run on a preview URL before merging a content or route change)

- `view-source:` shows the right `<title>`, `<meta name="description">`,
  `<link rel="canonical">`, and OG tags.
- `/sitemap.xml` lists the new URL; `/robots.txt` still disallows the gated
  routes.
- Google's Rich Results test accepts the JSON-LD on `/` and `/recruitment`.
- Lighthouse (mobile) SEO 100, accessibility 95+, no CLS from hero images.
- Share preview (LinkedIn Post Inspector or opengraph.xyz) shows
  `altLogo.png`.
- No horizontal scroll at 375px, which Google counts against mobile
  usability.

## Search Console

Ownership history is messy (set up under a previous VP's personal Google
account, later transferred). Confirm it sits on the program identity
`OhioStateIBE@osu.edu` or the current VP of Tech, then use it to submit the
sitemap after large content changes and to watch for coverage errors.
Details and open items are in `docs/OFFICER_HANDOFF.md`.
