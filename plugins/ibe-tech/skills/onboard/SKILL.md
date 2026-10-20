---
name: onboard
description: Day-one setup for a new IBE tech officer joining ibeosu.com (ibe-osu/ibe). Use when someone says they are new, is setting up their machine or Claude Code for IBE, asks what to install, how to get access, how to run the site, or what to work on first.
---

# Onboarding

Walk the person through `docs/TECH_CHAIR_ONBOARDING.md` **Part 2**
interactively, one step at a time: check whether the step is already done,
do it or tell them exactly what to do, verify, move on. Do not restate the
document; read the section you are on and work from it.

## Before Part 2

Ask which of these they already have, and do not assume any:

- GitHub: member of the `ibe-osu` organization with write access to
  `ibe-osu/ibe`. If not, the VP of Tech (Yuvi Atre, `yuvi-atre`) sends it
  (Part 1 of the doc).
- Supabase: invited to the IBE organization as Developer. `ibe-staging`
  is theirs; `ibe-prod` is the VP's.
- Vercel: nothing to get. They cannot open previews (Hobby plan, one
  member); they verify on localhost and the VP opens the preview.
- The `ibe-staging` URL and publishable key for `.env.local` (also in
  `.github/workflows/ci.yml`).

## Verify as you go

- `npm run dev` serves http://localhost:3000 and `npm run lint && npm run
  build` pass before you call setup done.
- `/plugin` lists `ibe-tech`.
- `git log -1` on their first commit shows no AI attribution trailer.
- The two sample questions in Part 2 ("walk me from /signup to /members",
  "how does a page get its hero") get answers that cite files and lines.

## Then

Pick their first task from Part 4 of the doc and run it with the `ship`
skill. Anything on the "lines she does not cross" list (Part 5) goes to the
VP, always.
