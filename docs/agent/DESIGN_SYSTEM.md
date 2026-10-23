# Design system

How ibeosu.com looks and moves, why, and how to extend it without
re-deciding anything. The short rules are in `CLAUDE.md`; the brand brief
(audiences, voice, anti-references) is `PRODUCT.md`; the machine-readable
token sheet is `DESIGN.md`. The source of truth for every value below is
`src/theme/theme.ts` and `src/app/globals.css`. If this doc and the code
disagree, the code is right and this doc needs a fix.

## The one-paragraph brief

Collegiate, credible, ambitious. A selective honors program at a top public
university, not a startup. OSU scarlet is the voice and white is the stage.
Square corners everywhere. A serif display face over a humanist sans. Real
cohort photography carries the warmth. Motion is restrained and never gates
content. Outcomes (placement, salary, alumni companies) get stage presence.

Two full redesign attempts in September 2026 were rejected (ruled scarlet
grid with heavy entrances; centered panels with a red/black dark mode and a
new typeface). The lesson recorded in the project memory: keep the current
look as the baseline, change one section at a time, and show a mockup before
building pages. Do not propose a new typeface, a dark mode, or rounded
corners.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `primary.main` / `--scarlet` | `#ba0c2f` | The brand. Buttons, nav active state, hero tint, scarlet bands, focus rings, selection. |
| `primary.dark` / `--scarlet-dark` | `#8e0a24` | Hover state of scarlet surfaces. |
| `primary.light` | `#DD8697` | Rarely used; soft tint. |
| `text.primary` / `--foreground` | `#17181a` | Ink. Body copy, headings on white. |
| `text.secondary` / `--ink-muted` | `#494f53` | Supporting copy, captions, roles. |
| `secondary.light` | `#646A6E` | OSU gray from the university palette. Available, little used. |
| `background.default` / `paper` | `#ffffff` | The stage. |
| `background.tint` | `#f9f6f6` | Warm off-white for alternating sections (journey, timeline, keynote), and the border that cuts timeline dots out of the spine. |
| `divider` | `rgba(23, 24, 26, 0.12)` | Hairlines, ruled grids, card borders. |
| `grey.300` / `grey.400` | `#e0e0e0` / `#bdbdbd` | Inactive timeline spine, marker outline. |
| `error.main` | `#c62828` | Form errors only. Deliberately not scarlet so an error never reads as brand. |
| `success.main` | `#2e7d32` | Success alerts only. |

On scarlet surfaces, text is `#fff` and supporting text is
`rgba(255,255,255,0.85)` to `0.92`. Hairlines on scarlet are
`rgba(255,255,255,0.25)` to `0.35`.

Hero scrim, used by both `Welcome` and `PageHero`: a flat
`rgba(186, 12, 47, 0.35)` scarlet tint, then a vertical gradient
`rgba(23,5,9,0.55)` at the bottom through `0.15` mid to `0.3` at the top.
Hero text gets a soft `textShadow` for contrast on busy photos.

### Type

Two faces, loaded in `src/app/layout.tsx` through `next/font/google` and
exposed as CSS variables:

- **PT Serif Caption**, weight 400 only. Display: `h1` through `h4`.
- **Source Sans 3**, weights 400, 600, 700. Everything else.

The heading scale is fluid `clamp()` in `theme.ts` (no
`responsiveFontSizes`); h1 to h4 are serif with tightening negative
tracking, h5 and h6 are sans 600, body sizes sit just above MUI's defaults
with generous line height. The exact values are in `DESIGN.md`.

`NAV_LABEL_TYPOGRAPHY` (exported from `theme.ts`) is the collegiate
uppercase label used by the header nav, the Join Us button, and the
calendar view toggle. Reuse it for any small label that should read as
"institutional".

Conventions:

- Section headings are `variant="h3" component="h2"`; page `h1` is only ever
  the hero title (or the form title on auth pages). Keep one `h1` per page.
- Pair a heading with a `body1` lede in `text.secondary`, max width
  `55ch` to `62ch`, centered with `mx: "auto"` when the section is centered.
- Eyebrows / kickers: uppercase, 0.12em to 0.16em tracking, weight 600 to
  700 (hero kicker, "Members" overline).
- `globals.css` sets `text-wrap: balance` on h1 to h3 and `text-wrap: pretty`
  on paragraphs.

### Shape, spacing, layout

- `shape.borderRadius: 0`. Nothing is rounded: buttons, inputs, cards,
  images, icon buttons, toggle buttons. If an MUI component sneaks in a
  radius, override it to 0.
- Section rhythm: `py: { xs: 6, md: 9 }` is the default vertical padding
  (also seen as `{ xs: 6, md: 8 }`, `{ xs: 7, md: 11 }` for the big
  journey/timeline sections, `{ xs: 5, md: 8 }` for the stats band).
- Width: `Container maxWidth="lg"` for almost every section; `"xl"` for the
  wide logo marquee; `"xs"` for auth forms; `"sm"` for the under-construction
  page. Inner reading columns cap at `52rem` to `56rem` with `mx: "auto"`.
- Grids are CSS grid through `sx`, with `minmax(0, 1fr)` columns so logos and
  cards can shrink on a 375px phone. Two columns on `xs` is the floor for
  card grids (leadership, stats, sponsors).
- Section separation is a hairline: `borderTop: "1px solid", borderColor:
  "divider"`, or a background change to `background.tint` or scarlet.
- MUI breakpoints are the defaults: xs 0, sm 600, md 900, lg 1200, xl 1536.
  The header switches to the mobile drawer below `sm`.

### Elevation and borders

No shadows. `MuiButton` has `disableElevation` and `boxShadow: "none"`. The
AppBar is a translucent white with `backdropFilter: blur(12px)` and a
hairline bottom border. Depth comes from borders, tints, and photography.

## Components

### Buttons (`MuiButton` overrides)

Default is `variant="contained"` scarlet, square, `0.625rem 1.5rem` padding,
no text-transform, hover to `primary.dark`. Outlined buttons have a 2px
border and a faint scarlet hover fill. On scarlet or photo backgrounds, the
inverse pattern is a white contained button with scarlet text, or a white
outlined button (`Welcome.tsx`). Focus is a 2px scarlet outline with 3px
offset, defined both in the theme and in `globals.css`.

### Links

Navigation links are `NavButton`: uppercase label, scarlet underline that
scales in from the center on hover and stays on the active route
(`aria-current="page"`). In-copy links are underlined with
`textUnderlineOffset: 3px` to `4px`; on white they are `primary.main` weight
600; on scarlet they are white at 0.85 opacity brightening on hover.

### Forms (`MuiOutlinedInput`, `MuiFormLabel`, `MuiFormHelperText`)

Square inputs, 2px scarlet border when focused, `error.main` when invalid,
helper text flush left. Chrome autofill is overridden to white. Forms use
react-hook-form + zod; errors show inline as `helperText` and server errors
show in an `Alert` above the fields. Submit buttons are `size="large"
fullWidth` and change their label while submitting.

### `PageHero` (`src/components/general/PageHero.tsx`)

Every non-home page opens with it. Props: `title`, optional `subtitle`,
`image` (a static import so `placeholder="blur"` works), `imageAlt`,
`objectPosition`, `height` (default `56svh` / `64vh`, min 380px). It renders
the photo, the two-layer scrim, and the `h1`, with a short GSAP entrance.
The home page uses its own `Welcome` hero with an art-directed vertical crop
for phones via `<picture>` and `getImageProps`.

Add a new page's hero image to `HeroPrefetch.tsx` so it is warmed in the
background after the first page loads.

### `Reveal` (`src/components/general/Reveal.tsx`)

The scroll-reveal wrapper. Variants: `rise` (default), `stagger` (direct
children or a `targets` selector), `scale` (for imagery). Trigger is
`top 92%`, once. Stagger total is capped at 0.5s. It uses `gsap.from` with
`clearProps` so hover transitions still work afterward. Wrap a section's
heading block and its grid separately rather than the whole section.

### Cards

- `IndividualCard` (about): 5:6 portrait, derives `/people/{name}.jpeg` from
  the name unless `imageUrl` is given, initials placeholder when `null`.
  Hover or focus-within zooms the photo 1.05 and sweeps a 3px accent rule
  across the bottom. `accent="white"` on scarlet sections.
- `InfoCard` (recruitment): the whole card is a link, 3:2 image, hairline
  border that turns scarlet on hover, CTA text with an arrow.
- `SpotlightCard`, `SpeakerCard`, testimonial cards follow the same language:
  hairline or no border, square image, name in `h6`, role in italic `body2`.

Hover rules: transitions use `cubic-bezier(0.22, 1, 0.36, 1)` or
`(0.25, 1, 0.5, 1)` at 0.3s to 0.6s. Wrap hover-only color changes in
`@media (hover: hover)` when the element is also a tap target, or the darker
shade sticks after a touch (the calendar toggle does this; most cards do not
yet and it is on the polish list).

### Carousels

`SpeakerCarousel`, `TestimonialCarousel`, `PhotoCarousel` are hand-rolled
with `react-swipeable` for touch and mouse drag, arrow `IconButton`s, and a
tripled array for the infinite loop. Cards-per-view is decided in CSS, not
`useMediaQuery`. Autoplay carousels use `setInterval` and must pause on
interaction. Known polish items: a half-blank frame when autoplay wraps, and
white dots that vanish on light photos.

### Scarlet band pattern

`OurStats` and `Footer`: `backgroundColor: "primary.main"`, white text,
hairline dividers at 0.25 to 0.35 white. Stats count up with a GSAP tween
driven by `data-stat-value`. Use a scarlet band for at most one section per
page.

### Ruled grid pattern

`Sponsors`: a 1px `gap` over a `divider` background with a `divider` border
draws the hairlines; cells are white; logos sit grayscale at 0.6 opacity and
take full color on hover. A filler cell keeps the grid rectangular and holds
the "Partner with IBE" invitation.

### Timeline pattern

`FourYearJourney` and `ApplicationTimeline`: a 2px grey spine with a scarlet
fill that scrubs with scroll (`scrollTrigger` with `scrub: 0.6`), 16px square
markers that ignite scarlet as the fill passes, content revealed per node.
Everything renders in its completed state without JS.

## Motion rules

1. GSAP only, through `useGSAP` with `{ scope: ref }`. Register plugins at
   module top (`gsap.registerPlugin(ScrollTrigger, useGSAP)`).
2. First lines of every animation: return early when
   `window.matchMedia("(prefers-reduced-motion: reduce)").matches` or
   `document.hidden`. The hidden check matters because headless and
   background tabs throttle rAF and a `gsap.from` would leave content stuck
   invisible.
3. Animate from a from-state, never to one. The DOM's default state is the
   finished state so content is visible without JS and to crawlers.
4. `clearProps: "opacity,transform"` after one-shot reveals.
5. Easing: `power3.out` / `power4.out` for entrances, `power2.out` for
   counters, `none` for scrub. Durations 0.7s to 1s. Stagger 0.08s to 0.09s,
   total capped at 0.5s.
6. `globals.css` additionally collapses every CSS animation and transition
   to 0.01ms under `prefers-reduced-motion: reduce`.
7. Scroll triggers fire early on phones (`top 90%` to `92%`) so a thumb
   scroll never shows a blank band.

## Imagery

- Real photos of the cohort over illustration. Folders: `public/people`
  (headshots, `firstlast.jpeg`), `public/spotlight`, `public/testimonial`,
  `public/happenings`, `public/recruitment`.
- Heroes are static imports so `next/image` can blur-up. Always pass
  `sizes`; use `fill` with a sized parent for cards.
- Company and sponsor logos are SVGs in `public/companies`, rendered
  grayscale until hover in the sponsor wall and full color in the alumni
  marquee.
- The coursework diagram is an SVG asset (`public/coursework`). Its season
  tags have rounded corners and an off-brand red; fixing that means
  redrawing the asset, not CSS.
- `altLogo.png` (778x262) is the header logo and the Open Graph image.

## Accessibility baseline

WCAG 2.1 AA. Skip link to `#main-content`. Semantic `header`, `nav` with
`aria-label`, `main`, `footer`, `section` with `aria-label` when there is no
visible heading. One `h1` per page and a logical heading order. Visible
2px scarlet focus rings. Icon buttons carry `aria-label`. Decorative layers
get `aria-hidden`. Reduced motion is honored twice (JS guard and CSS).
Contrast: ink on white and white on scarlet both clear AA for body text.

## Known drift and polish list

Recorded so an agent does not "fix" them blindly or re-discover them:

- Mobile drawer: logo and close button sit about 8px lower than the header's;
  the current page is not highlighted; Sign Out is styled like a nav link.
- Sticky hover states on touch for cards and logos (only the calendar toggle
  is wrapped in `@media (hover: hover)`).
- Carousel autoplay wrap shows a half-blank frame; dots are hard to see.

Pending content decisions (dates, titles, stats) are not design drift;
they live in `HANDOFF.md`.

## Adding a section: checklist

1. Server Component unless it needs hooks. Put it in
   `src/components/<page>/<SectionName>.tsx`.
2. Outer `Box component="section"` with an `aria-label` or a visible `h2`,
   `py: { xs: 6, md: 9 }`, and either a hairline `borderTop` or a tint.
3. `Container maxWidth="lg"`. Heading `h3`-as-`h2`, lede in
   `text.secondary` at 55ch to 62ch.
4. Wrap the heading block in `<Reveal>` and the grid in
   `<Reveal variant="stagger">`.
5. Colors from the theme (`primary.main`, `text.secondary`, `divider`),
   never new hex values. If you need a new color, add it to `theme.ts` and
   `DESIGN.md` in the same PR.
6. Square corners, no shadows, hairline borders.
7. Images through `next/image` with `sizes` and real `alt` text.
8. Check at 375px wide: no horizontal scroll, two-column grids shrink,
   headings wrap. Check with reduced motion on: everything visible.
9. If the section is a new route, follow `SEO.md`.

## Review checklist for a UI diff

- Any new hex or rgba that is not in the token table above?
- Any `borderRadius` other than 0, or any `boxShadow`?
- A font family or weight outside PT Serif Caption 400 and Source Sans 3
  400/600/700?
- A GSAP call without the reduced-motion and `document.hidden` guard?
- Content that only appears after an animation fires?
- `useMediaQuery` deciding layout that is also server-rendered?
- Missing `alt`, `aria-label`, or `sizes`?
- More than one scarlet band on the page?
- Does the change preserve the current look rather than replace it?
