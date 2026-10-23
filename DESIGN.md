---
name: IBE Honors Program
description: Marketing site and members area for Ohio State's Integrated Business & Engineering Honors Program. Collegiate, credible, ambitious; scarlet is the voice, white is the stage.
# Values mirror src/theme/theme.ts and src/app/globals.css, which are the
# source of truth. This sheet exists so design tooling (impeccable,
# frontend-design) and agents can read the system without parsing the theme.
colors:
  scarlet: '#ba0c2f'            # primary.main; the non-negotiable OSU brand color
  scarlet-dark: '#8e0a24'       # primary.dark; hover on scarlet surfaces
  scarlet-light: '#DD8697'      # primary.light; rarely used
  ink: '#17181a'                # text.primary
  ink-muted: '#494f53'          # text.secondary
  osu-gray: '#646A6E'           # secondary.light; university gray, little used
  white: '#ffffff'              # background.default and paper
  surface-tint: '#f9f6f6'       # background.tint; warm off-white for alternating sections
  divider: 'rgba(23, 24, 26, 0.12)'
  grey-300: '#e0e0e0'
  grey-400: '#bdbdbd'
  error: '#c62828'              # deliberately not scarlet
  success: '#2e7d32'
  hero-tint: 'rgba(186, 12, 47, 0.35)'
  hero-scrim: 'linear-gradient(to top, rgba(23,5,9,0.55) 0%, rgba(23,5,9,0.15) 45%, rgba(23,5,9,0.3) 100%)'
  on-scarlet: '#ffffff'
  on-scarlet-muted: 'rgba(255, 255, 255, 0.85)'
  hairline-on-scarlet: 'rgba(255, 255, 255, 0.3)'
typography:
  display-family: '"PT Serif Caption", Georgia, serif'      # weight 400 only; h1-h4
  body-family: '"Source Sans 3", "Helvetica Neue", Arial, sans-serif'  # 400 / 600 / 700
  h1: { size: 'clamp(2.75rem, 5.5vw + 1rem, 5.25rem)', lineHeight: 1.08, tracking: '-0.015em', family: display }
  h2: { size: 'clamp(2.25rem, 3.5vw + 1rem, 3.5rem)', lineHeight: 1.12, tracking: '-0.01em', family: display }
  h3: { size: 'clamp(1.75rem, 2vw + 0.9rem, 2.5rem)', lineHeight: 1.18, tracking: '-0.005em', family: display }
  h4: { size: 'clamp(1.35rem, 1.2vw + 0.9rem, 1.75rem)', lineHeight: 1.3, family: display }
  h5: { size: '1.25rem', weight: 600, lineHeight: 1.4, family: body }
  h6: { size: '1.1rem', weight: 600, lineHeight: 1.45, family: body }
  subtitle1: { size: '1.125rem', lineHeight: 1.6 }
  body1: { size: '1.0625rem', lineHeight: 1.65 }
  body2: { size: '0.9375rem', lineHeight: 1.6 }
  button: { size: '1rem', weight: 600, tracking: '0.01em', transform: none }
  nav-label: { size: '0.8125rem', weight: 700, tracking: '0.08em', transform: uppercase }
  eyebrow: { size: '0.75rem-0.875rem', weight: 600, tracking: '0.12em-0.16em', transform: uppercase }
spacing:
  unit: '8px'                   # MUI spacing(1)
  section-y: '{ xs: 6, md: 9 }' # 48px / 72px; big storytelling sections use { xs: 7, md: 11 }
  container: 'lg'               # 1200px; xl for the logo marquee, xs for auth forms
  reading-column: '52rem-56rem'
  lede-measure: '55ch-62ch'
  grid-gap: '{ xs: 3, md: 5 }'
  card-padding: '{ xs: 2.5, md: 3 }'
radius:
  all: '0'                      # square corners are the collegiate voice; never round
elevation:
  all: 'none'                   # borders, tints, and photography carry depth
borders:
  hairline: '1px solid divider'
  accent-rule: '3px scarlet'
  outlined-button: '2px'
motion:
  library: 'GSAP 3 via useGSAP; ScrollTrigger for reveals'
  entrance-ease: 'power3.out / power4.out'
  entrance-duration: '0.7s-1s'
  stagger: '0.08s-0.09s, total capped at 0.5s'
  reveal-trigger: 'top 92%, once'
  hover-ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
  hover-duration: '0.3s-0.6s'
  reduced-motion: 'required: skip when prefers-reduced-motion or document.hidden; content visible without JS'
breakpoints:
  xs: 0
  sm: 600
  md: 900
  lg: 1200
  xl: 1536
imagery:
  policy: 'real cohort photography over illustration'
  heroes: 'static import + next/image blur placeholder; scarlet tint + dark scrim'
  logos: 'SVG; grayscale 0.6 opacity until hover on the sponsor wall'
  portraits: '5:6 crop, hover zoom 1.05, 3px accent rule'
---

# IBE design system

The full narrative, component catalog, motion rules, and review checklist
live in [`docs/agent/DESIGN_SYSTEM.md`](docs/agent/DESIGN_SYSTEM.md). The
brand brief (audiences, voice, anti-references) is
[`PRODUCT.md`](PRODUCT.md). Values above mirror
[`src/theme/theme.ts`](src/theme/theme.ts); change the theme first, then this
sheet, in the same PR.

Three rules that override any tool's defaults:

1. Scarlet `#ba0c2f`, ink `#17181a`, white. Nothing off this palette.
2. Square corners, no shadows, hairline borders.
3. PT Serif Caption for display, Source Sans 3 for everything else. No new
   typefaces, no dark mode.
