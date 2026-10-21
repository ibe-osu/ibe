---
name: design
description: Design-system guardrails for any visual change to ibeosu.com - a new section, component, page, spacing, color, type, image, hover, or animation. Use before building UI in the IBE repo and when reviewing a UI diff.
---

# IBE design guardrails

Values live in `DESIGN.md` (small, always read it). The component catalog,
patterns, motion rules, known drift, and review checklist live in
`docs/agent/DESIGN_SYSTEM.md`; read it for a new section or component, or
the relevant heading for a smaller change. `PRODUCT.md` has the voice and
anti-references; read it for copy or imagery decisions. The `impeccable`
and `frontend-design` plugins read `DESIGN.md` too: use them for craft,
this skill for the rules.

## Decided, not up for debate

Palette, type pair, square corners, no shadows, no dark mode, restrained
GSAP motion guarded by `prefers-reduced-motion` and `document.hidden`,
content visible without JS. The list and the reasons are in `CLAUDE.md`
and `DESIGN_SYSTEM.md`. Two full redesigns were rejected in September 2026
for drifting from the current look: extend it, never replace it.

## Process

1. **Scope one section.** For a page or more, propose a mockup or a single
   section and get a yes before building the rest.
2. **Reuse before inventing.** `PageHero`, `Reveal`, `NAV_LABEL_TYPOGRAPHY`,
   `IndividualCard`, `InfoCard`, the ruled-grid and scarlet-band patterns.
   Check `src/components/general/` and the sibling page folders first.
3. **Tokens, not literals.** Theme keys (`primary.main`, `text.secondary`,
   `divider`, `grey.300`). A genuinely new value goes into
   `src/theme/theme.ts` and `DESIGN.md` in the same PR.
4. **Server Component by default.** `"use client"` only for hooks, GSAP,
   swipe, or Supabase, as low in the tree as possible.
5. **Layout in CSS.** `sx` grids with `minmax(0, 1fr)`; breakpoints in `sx`
   objects, never `useMediaQuery` for server-rendered markup.
6. **Images through `next/image`** with `sizes`, real `alt`, static imports
   for heroes, and a line in `HeroPrefetch.tsx` for a new hero.
7. **Verify in the browser** at desktop and 375px, console open, once with
   reduced motion on. `preview_start` with the `ibe-dev` launch config.
   Screenshot for the PR.
8. **Review**: run the checklist at the end of `DESIGN_SYSTEM.md`, or
   dispatch the `design-reviewer` agent on the diff and fix what it
   returns.

## When the ask conflicts with the system

Say so in one sentence, name the rule and where it is recorded, offer the
nearest on-system alternative, and build that unless the VP of Tech
overrides. Changing a rule is a PR to `theme.ts`, `DESIGN.md`, and
`DESIGN_SYSTEM.md` together, not an inline exception.
