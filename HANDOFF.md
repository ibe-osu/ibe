# Handoff: IBE Website — e-board onboarding, blocked on prod setup

Replaces the 2026-09-20 handoff. Everything below is current as of
**2026-09-28**. Read `CLAUDE.md` first for the deploy flow and design system.

---

## ⏭️ Pick up here

**Goal:** IBE's e-board signs up on ibeosu.com with a membership code and
lands on the members calendar. The code, the members area, the signup flow,
and the docs are all done and merged. **The only blocker is `ibe-prod`, and
it is currently PAUSED.** Nothing can be tested on ibeosu.com until it is
restored and configured.

Do these in order. Steps 1–3 are dashboard/CLI actions **only the user can
do** (the coding agent's auto-mode classifier denies every write to prod,
including unpausing it via the Management API).

1. **Unpause prod:** https://supabase.com/dashboard/project/ygofoziyvusykfykpdyy
   → *Restore project*, wait ~3 min. (`supabase link` fails with "project is
   paused" until then — the user hit exactly this on 2026-09-27 and 09-28.)
2. **Push migrations 0001–0004** from a checkout of `main`:
   `npx supabase link --project-ref ygofoziyvusykfykpdyy && npx supabase db push`
   (asks for the prod DB password).
3. **Prod auth config** (dashboard → Authentication):
   - URL Configuration: Site URL `https://ibeosu.com`; redirect URLs
     `https://ibeosu.com/**`, `https://www.ibeosu.com/**`
   - Hooks → Before User Created → Postgres function `public.before_user_created`
   - Rate Limits → emails sent: 30/hour
   - Email Templates → Confirm signup → link must be
     `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email`
     (device-independent; the default PKCE link only works in the browser
     that submitted the form — bit us live). **Do this on staging too.**
   - Project Settings → Authentication → SMTP: `smtp.resend.com`, 465, user
     `resend`, password = Resend API key, sender `noreply@ibeosu.com`,
     name `IBE Honors Program`
4. **Verify prod end to end** through the real signup form on ibeosu.com
   (never curl — see Gotchas), with a real inbox.
5. **Issue the e-board code** in the prod SQL editor:
   `select public.issue_invite_code('e-board 2026-27', 25, interval '30 days');`
   and send it with the message in `docs/MEMBER_ONBOARDING.md`.

Once prod is restored, the **keep-alive workflow** (`.github/workflows/keepalive.yml`,
Mon + Thu) pings both projects so they stop auto-pausing. Until then its
prod leg runs red — expected.

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
`/members/alumni-database` is still "Under Construction" — that's correct,
Phase 2 is deferred.

---

## Live config state

| | `ibe-staging` | `ibe-prod` |
|---|---|---|
| URL | `bvpohtlczjqzasdhwgwe.supabase.co` | `ygofoziyvusykfykpdyy.supabase.co` |
| Publishable key | `sb_publishable_qCN-o8s1-P95euy4p1T1xw_09VG3qwi` | `sb_publishable_eUSEnxTgPS1BphEYbp0DWg_Ytiea0B2` |
| Status (2026-09-28) | ACTIVE_HEALTHY | **PAUSED** |
| Migrations 0001–0004 | ✅ | ❌ none |
| `before_user_created` hook | ✅ | ❌ |
| SMTP (Resend) | ✅ | ❌ |
| Site URL / redirects | localhost + `*-ohiostateibes-projects.vercel.app` + ibeosu.com | ❌ |
| Confirm-signup template | ❌ still default PKCE link | ❌ |

- **Vercel**: team `ohiostateibes-projects`, project `ibe`. Preview env →
  staging, Production env → prod. Previews are behind Vercel SSO, so
  **e-board members cannot open previews** — only a configured prod lets
  them test.
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
- **Phase 2 — alumni directory** (re-profile the 268-record source first).

---

## Gotchas (hard-won)

- **Prod pauses every 7 idle days** on the free tier. Symptom: `supabase
  link` → "project is paused"; CLI `supabase projects list` → `INACTIVE`;
  logins fail. Keep-alive workflow fixes it going forward, once restored.
- **The auto-mode classifier denies**: any write to prod (migrations, auth
  config, restore), staging *auth config* writes (email template), and
  `gh pr merge` on a PR that hasn't had `/code-review` run in the session.
  Staging *database* writes via the Management API query endpoint are
  allowed and were used for migration 0004 and issuing codes.
- **Confirmation links are device-bound** until the template is switched
  (step 3). Supabase still confirms the email, so "log in" works — the
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

- `docs/MEMBER_ONBOARDING.md` — the officer runbook (wake the backend,
  issue a code, send the message, fix the common failures).
- `docs/OFFICER_HANDOFF.md` — accounts and credential *locations* for the
  next VP of Tech. Pointers only, never secrets.
- `docs/DEPLOYMENT.md` — branch → PR → preview → merge. **Never push to `main`.**
- `docs/student_db.md` — Phase 2 schema notes.
- `CLAUDE.md` / `PRODUCT.md` — design system and brand, non-negotiable.
