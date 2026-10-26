# Handoff: IBE Website — alumni directory go-live

Replaces the 2026-09-28 handoff. The top section is current as of
**2026-10-25**; the sections below it are from 2026-09-28 unless marked.
Read `CLAUDE.md` first for the deploy flow and design system.

---

## ⏭️ Pick up here

**State:** this file merges with #81, so by the time you read it on `main`
the members-only alumni directory is live at `/members/alumni-database`
(migrations 0001–0007 and the alumni data on prod; the go-live checklist is
in the #81 description). Prod was checked read-only on 2026-10-25: members
can sign up and log in.

**Left to do (VP of Tech, Yuvi Atre, `yuvi-atre`):**

1. **Tell the e-board.** Anyone without an account signs up with an invite
   code; issue one with `issue_invite_code()` (`docs/MEMBER_ONBOARDING.md`).
2. **Retire ibe-connect** (`ibe-osu/ibe-connect`): take its Vercel deploy
   down and archive the repo. It bundles phone numbers and personal emails
   into public JavaScript.
3. **Check the two prod auth settings nobody has confirmed** (dashboard
   only): URL Configuration and the Confirm-signup email template (see
   "Live config state").
4. **Updating the directory:** edit the CSV in `private/` and re-run the
   seed (`scripts/alumni/README.md`), staging first, then prod.

If CI fails with an error in `next/font`, it is Google Fonts flaking during
the build, not the PR: re-run the job.

---

## What shipped this cycle (all merged to `main`)

| PR | What |
|---|---|
| #62 | Members calendar on `/members`; `issue_invite_code()` (migration 0004); login errors distinguish unconfirmed / unreachable / wrong password; `/auth/callback` accepts `token_hash` links; npm audit fix; `docs/MEMBER_ONBOARDING.md` |
| #63 | Calendar frame sized to the viewport (`clamp(440px, 100svh − chrome, 720px)`) |
| #64 | Mobile walkthrough fixes (Opus on iPhone 17 simulator + Sonnet static audit): sponsor grid clipping, scroll-reveal thresholds, speaker carousel swipe + no hydration jump, testimonial photo-first on phones, 2-up leadership grid, arrow gutters, tap-to-reveal speaker bios, hero eyebrow wrap |
| #65 | Week view removed from the calendar (Google's embed can't hide overnight hours); toggle is Month / Agenda |
| #66 | Supabase keep-alive workflow |

Nav link for the members area is **"Members"** (was "Resources").
`/members/alumni-database` is the alumni directory (#79 schema, #80 seed
script, #81 page; #82 and #84 tighten grants).

---

## Live config state

| | `ibe-staging` | `ibe-prod` |
|---|---|---|
| URL | `bvpohtlczjqzasdhwgwe.supabase.co` | `ygofoziyvusykfykpdyy.supabase.co` |
| Publishable key | `sb_publishable_qCN-o8s1-P95euy4p1T1xw_09VG3qwi` | `sb_publishable_eUSEnxTgPS1BphEYbp0DWg_Ytiea0B2` |
| Status (2026-10-25) | ACTIVE_HEALTHY | ACTIVE_HEALTHY |
| Migrations | 0001–0007 | 0001–0007 |
| `before_user_created` hook | ✅ | ✅ |
| SMTP (Resend) | ✅ | ✅ |
| Site URL / redirects | localhost + `*-ohiostateibes-projects.vercel.app` + ibeosu.com | not checked (dashboard only) |
| Confirm-signup template | ❌ still default PKCE link | not checked (dashboard only) |

- **Vercel**: team `ohiostateibes-projects`, project `ibe`. Preview env →
  staging, Production env → prod. Previews are behind Vercel SSO, so
  **e-board members cannot open previews**; they test on prod.
- **Google Calendar** ("IBE Event Calendar") is public as of 2026-09-22.
  Ops contact: Devhuti Patel. ID lives in `src/data/calendar.ts`.
- **Staging codes**: label `e-board testing (staging)` (25 uses, expires
  2026-10-27) was issued 2026-09-27 — plaintext is in that session's
  transcript. Only usable on localhost / previews. Issue another with
  `select public.issue_invite_code('label', N, interval '30 days');`.
- **Staging test account**: `yuviatre+ibetest5@gmail.com` (confirmed; the
  password is in the 2026-09-20 transcript, or reset it). Older
  `yuviatre+ibetest{,2,3,4}` / `+preview1` accounts have unknown passwords.
- Local dev: the worktree
  `/Users/yuvia/IBE Website/.claude/worktrees/ibe-audit-eboard-setup-a0f4ed`
  has a gitignored `.env.local` pointing at staging. The main checkout does not.

---

## Open items the user still has to decide (surfaced by the mobile walkthrough)

- Home stats say **"90% job placement"**; Year Four in the journey says
  **"100%"**. Which is true?
- Kristina Kennedy is "Engineering Faculty Director" on `/about` but
  "Senior Director of the IBE Program" on `/recruitment`.
- `/recruitment` still shows the **April 3, 2026** deadline — needs the
  2027 date.
- The course-plan diagram's season tags (rounded corners, off-brand red)
  are inside `public/coursework/coursework*.svg`, not code — needs a
  redrawn asset.
- **Design-system folder**: the user asked whether we have a `DESIGN.md` +
  `.impeccable/design.json` like the Relantic `core-mobile` repo. We don't;
  offered to generate one with the impeccable documenter from `theme.ts`.
  Not started.

## Smaller polish left from the walkthrough (not done)

- Photo carousels on `/student-life` show a half-blank frame when autoplay
  wraps; dots are white-on-photo and hard to see.
- Mobile drawer: logo/close sit ~8pt lower than the header's; current page
  not highlighted; Sign Out styled like a nav link.
- Sticky hover states on touch (tapped cards/logos stay "hovered") — only
  the calendar toggle was wrapped in `@media (hover: hover)`.
- Canonical host mismatch: Vercel redirects apex → `www.ibeosu.com`, but
  `metadataBase`/sitemap/canonicals say the apex. Pick one.

## Next big pieces (unchanged)

- **PR 4 — admin UI + bulk invites** (`issue_invite_code()` is the first
  piece; needs an Edge Function for the secret key).
- **PR 5 — enforce CSP** (`enforceCsp` flip in `next.config.ts`).

---

## Gotchas (hard-won)

- **Prod pauses every 7 idle days** on the free tier. Symptom: `supabase
  link` → "project is paused"; CLI `supabase projects list` → `INACTIVE`;
  logins fail. The keep-alive workflow keeps both awake.
- **The auto-mode classifier** (Claude Code's permission checker on the
  VP's machine) **denies**: any write to prod (migrations, auth config,
  restore), staging *auth config* writes (email template), and
  `gh pr merge` on a PR that hasn't had `/code-review` run in the session.
  Staging *database* writes via the Management API query endpoint are
  allowed and were used for migration 0004 and issuing codes. The rule for
  humans is the same: prod and auth config are VP-only.
- **Confirmation links are device-bound** until the Confirm-signup template
  is switched (still unchecked on prod). Supabase still confirms the email, so "log in" works — the
  `confirm-failed` message now says so.
- **`supabase.auth.signOut()` is global-scope**: signing out in one browser
  (e.g. the iOS simulator during a walkthrough) revokes the session in
  every other browser too.
- **Hidden browser pane doesn't composite**: CSS transitions sit at
  `currentTime: 0`, so a computed `opacity` never changes. Inject
  `transition: none !important` before reading, or trust `matches()`.
- **`useMediaQuery` + `noSsr` on anything rendered on the server** produces
  a hydration mismatch React refuses to patch. Gate on a mounted flag
  instead (see `MembersCalendar.tsx`) or move breakpoints to CSS (see
  `SpeakerCarousel.tsx`'s `--card-w`).
- **`git checkout main` inside the worktree** succeeds if the main checkout
  is on another branch — and lands you on a *stale* local main. Always
  `git pull --ff-only origin main` before branching.
- **`npm run build` clobbers a running dev server's `.next`.** Restart it.
- **Never test signup with `curl`** — it bypasses PKCE and produces a
  different link format. Use the real form.
- **pgcrypto lives in `extensions`**, so SECURITY DEFINER functions that
  call `crypt()`/`gen_random_bytes()` need `extensions` in `search_path`.
- **Supabase rejects `@example.com`** signups; use a real inbox.
- **Vercel applies env vars only to new builds.**

---

## Related docs

- `docs/agent/` — the agent-facing references (architecture, design
  system, database, SEO, workflow). `docs/TECH_CHAIR_ONBOARDING.md` is the
  checklist for bringing on the tech chair; `plugins/ibe-tech/` is the
  Claude Code plugin that packages the team's skills.
- `docs/MEMBER_ONBOARDING.md` — the officer runbook (wake the backend,
  issue a code, send the message, fix the common failures).
- `docs/OFFICER_HANDOFF.md` — accounts and credential *locations* for the
  next VP of Tech. Pointers only, never secrets.
- `docs/DEPLOYMENT.md` — branch → PR → preview → merge. **Never push to `main`.**
- `docs/student_db.md` — Phase 2 schema notes.
- `CLAUDE.md` / `PRODUCT.md` — design system and brand, non-negotiable.
