# Handoff: IBE Website — auth system, members area, e-board onboarding

Replaces the previous handoff (auth build-out + GitHub org migration; both
done). Last full audit: 2026-09-20 — lint, build, `npm audit` (patched via
lockfile bump of `next`), production crawl (all routes 200, security headers
present, sitemap/robots correct), and the signup flow re-tested on staging.

---

## ⏭️ Pick up here

**The GitHub org migration is done.** The repo lives under the org, the Vercel
team `ohiostateibes-projects` deploys it, and PR #58 verified previews after
the move. (Not a hosting problem, never was: OSU's Azure/AWS suggestion
wouldn't have fixed GitHub ownership. Alumni PII lives in Supabase, so hosting
is also the wrong lever for any data-residency ask.)

**Current push: onboarding the e-board (2026-09-20 audit session).** The
members area now has real content — the IBE Google Calendar on `/members` —
and `issue_invite_code()` (migration 0004) replaces hand-written SQL for
codes. The signup flow was re-tested end to end on staging on 2026-09-20.
What's left before exec can sign up on ibeosu.com is entirely **ibe-prod
setup**, which the app can't do for itself:

1. Unpause `ibe-prod` (it auto-pauses after 7 idle days — *both* projects
   were found paused on 2026-09-20).
2. Apply migrations 0001–0004:
   `supabase link --project-ref ygofoziyvusykfykpdyy && supabase db push`.
3. Auth config: Site URL `https://ibeosu.com`; redirect URLs
   `https://ibeosu.com/**` and `https://www.ibeosu.com/**`; register the
   `before_user_created` hook (`pg-functions://postgres/public/before_user_created`);
   SMTP via Resend (mirror staging); email rate limit ≥ 30/hour; **Confirm
   signup email template** → `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email`
   (on staging too — the 2026-09-20 test hit the cross-device failure).
4. `select public.issue_invite_code('e-board 2026-27', 15, interval '14 days');`
   and send the code. Runbook: `docs/MEMBER_ONBOARDING.md`.
5. ~~Make the Google Calendar public~~ — done 2026-09-22 (embed and iCal
   feed both return 200 anonymously; the feed is "IBE Event Calendar").

---

## What's built (Phase 1 auth — PRs #52, #53, #54, #56, all merged)

Account creation works end to end, verified live: signup with a membership code
→ confirmation email → `/auth/callback` → session → gated `/members`.

- **Security headers** (`next.config.ts`) — CSP in **report-only**; flip
  `enforceCsp` to `true` to enforce (that's PR 5, the whole diff)
- **Supabase wiring** — `src/lib/supabase/{client,server,middleware}.ts`,
  `src/middleware.ts`
- **Auth** — `/login`, `/signup`, `/auth/callback`, `/members`,
  `/members/alumni-database` (still "Under Construction")
- **Members area** — `/members` shows the IBE Google Calendar.
  `src/data/calendar.ts` holds the calendar id and derives every URL;
  `src/components/members/MembersCalendar.tsx` is the embed with a
  Month/Week/Agenda toggle (agenda by default on phones). The signed-in nav
  link is "Members" (was "Resources").
- **Gating** — `requireMember()` / `requireAdmin()` in `src/lib/auth/guards.ts`
- **Migrations** — `supabase/migrations/0001` (app_users, roles, rate limiting),
  `0002` (invite codes, signup hook, provisioning trigger), `0003` (pgcrypto
  search_path fix), `0004` (`issue_invite_code(label, max_uses, valid_for)`:
  generates, bcrypts, stores, and returns a code in one call — callable from
  the SQL editor or by an active admin, never anonymously)

### Decisions — settled, don't re-litigate
- **Middleware is not the security boundary.** It only refreshes sessions. Real
  gating = per-page `requireMember()` + RLS. Next.js middleware has a history of
  bypass CVEs (PR #53 patched several).
- **No `SUPABASE_SECRET_KEY` in the app or CI, ever.** The only thing needing it
  is the invite Edge Function (PR 4), where Supabase injects it.
- **The publishable key is public by design** — it's plaintext in `ci.yml`
  deliberately. Access control is RLS, not key secrecy.
- **The code is an invitation; the account is the boundary.** Per-person invites
  (PR 4) become primary; the shared code stays a fallback.
- **Alumni PII:** drop `phone` and `gender` at import. Never commit the JSON —
  a static import compiles it into a CDN-served chunk that is *not* behind login.

---

## Live config state

| | `ibe-staging` | `ibe-prod` |
|---|---|---|
| URL | `bvpohtlczjqzasdhwgwe.supabase.co` | `ygofoziyvusykfykpdyy.supabase.co` |
| Publishable key | `sb_publishable_qCN-o8s1-P95euy4p1T1xw_09VG3qwi` | `sb_publishable_eUSEnxTgPS1BphEYbp0DWg_Ytiea0B2` |
| Migrations 0001–0004 | ✅ applied | ❌ none |
| `before_user_created` hook | ✅ registered | ❌ |
| Custom SMTP (Resend) | ✅ | ❌ |
| Site URL | `http://localhost:3000` | must be `https://ibeosu.com` |
| Redirect URLs | ✅ localhost + `*-ohiostateibes-projects.vercel.app` + ibeosu.com | ❌ |
| Status | restored 2026-09-20 | restored 2026-09-20 |

**Both projects auto-pause after 7 idle days** (free tier). Check the dashboard
before any onboarding push; restore takes ~2–3 minutes.

- **Vercel env vars**: Preview → staging, Production → prod. Set as **Config**,
  not Secret (they're `NEXT_PUBLIC_`, so public by definition).
- **Resend**: account `ibevptech@gmail.com`, `ibeosu.com` verified via Vercel's
  native Resend integration (auto-added the DNS records). Sender
  `noreply@ibeosu.com`, SMTP `smtp.resend.com:465`, username literally `resend`.
- **Email rate limit**: was 2/hour (Supabase default), now **30/hour** with
  custom SMTP. Still Supabase-side and adjustable — raise it before inviting 200
  people.
- **Test invite codes** on staging: the one labelled `audit test 2026-09-20`
  (5 uses, expires 2026-09-27) is in the 2026-09-20 session transcript. Issue
  a fresh one with
  `select public.issue_invite_code('testing', 5, interval '7 days');` —
  no more hand-rolled `crypt()` inserts. Generated codes are uppercase by
  construction (the alphabet also drops 0/O/1/I), which matters because
  `normalizeInviteCode()` uppercases input and a lowercase code would be
  unredeemable.
- **Test accounts on staging**: `yuviatre+ibetest{,2,3,4,5}@gmail.com`,
  `yuviatre+preview1@gmail.com`

---

## What's next

- **Prod setup** — the five steps under "Pick up here". Nothing else blocks
  e-board onboarding.
- **PR 4 — admin UI + bulk invites.** Paste an email list and invite everyone,
  issue/revoke codes, promote to admin, suspend. `issue_invite_code()` is the
  first piece of it (an admin can already call it through PostgREST). Needs a
  Supabase **Edge Function** to hold the secret key (keeps it out of Vercel).
- **PR 5 — enforce CSP.** One-line flip of `enforceCsp` in `next.config.ts`.
  `frame-src` now also allows `calendar.google.com`.
- **Canonical host mismatch (SEO, low priority).** Vercel redirects
  `ibeosu.com` → `www.ibeosu.com`, but `metadataBase`, the sitemap, and every
  canonical say `https://ibeosu.com`. Pick one: make the apex primary in
  Vercel (Settings → Domains) or switch the code to `www`. Search Console
  should match whichever wins.
- **Phase 2 — alumni directory.** Deferred entirely. Note the source data in
  `ibe-connect` was **replaced with a 268-record CSV-derived set** (was 288), so
  re-profile before importing; the earlier duplicate/data-quality analysis is
  stale.

### Login errors now say what's actually wrong
`LoginForm` distinguishes `email_not_confirmed` ("confirm your email first")
and an unreachable backend ("can't reach the sign-in service", i.e. the
project is paused) from a genuinely wrong password. Everything else stays
deliberately vague so the form can't be used to enumerate accounts.

---

## Gotchas (hard-won; several cost real time this session)

- **Paused Supabase looks like a wrong password.** `supabase projects list`
  shows `INACTIVE`; the dashboard shows **Restore project**. Fixed in the UI
  by the LoginForm change, but the backend still needs waking.
- **Read-only checks of a cloud DB** work without the DB password through the
  Management API (`POST /v1/projects/{ref}/database/query`) using the CLI's
  login token. Handy for "did the trigger fire?" without opening the dashboard.
- **The Google Calendar must be "available to public"** or the embed shows a
  permission error to everyone. Quick check: `curl -sI` on the embed URL
  returns 200 when public, 401 when not.
- **`npm run build` clobbers a running dev server's `.next`** → the dev server
  starts 500ing on every route. Restart it. This bit us twice.
- **Browser-pane `computer` clicks hang** intermittently while `read_page`,
  `navigate`, and screenshots keep working. Use `javascript_tool` to click via
  `document.querySelector(...).click()` and inspect the DOM instead.
- **Vercel previews are behind deployment protection** — `curl` gets a 302 to
  SSO, so preview state can't be verified from the CLI. The user has to check in
  a browser where they're logged into Vercel.
- **Confirmation links are device-bound until the template is switched.**
  The default `{{ .ConfirmationURL }}` is a PKCE link: it only works in the
  browser that submitted the signup form. Supabase still confirms the email,
  so logging in works — but the person sees "link didn't work". The
  `token_hash` template (see step 3 above) plus `/auth/callback`'s
  `verifyOtp` path removes the problem.
- **Never test signup with `curl`.** It bypasses the JS SDK's PKCE setup, so
  Supabase falls back to a different confirmation-link format that
  `/auth/callback` isn't built for. Cost two rounds of false debugging. Test
  through the real form.
- **pgcrypto lives in the `extensions` schema on Supabase, not `public`.** Any
  `SECURITY DEFINER` function calling `crypt()`/`gen_salt()` must include
  `extensions` in its pinned `search_path` (that's all migration 0003 is). It
  works in the SQL Editor regardless, which is exactly how it hides.
- **MUI's `Menu` rejects a Fragment child** — it walks children directly for
  focus management. Pass a flat array with keys.
- **Supabase rejects `@example.com`** as an invalid signup email. Use a real
  deliverable address.
- **Vercel only applies env vars to new builds** — changing them requires a
  redeploy to take effect.
- A **typo'd env var name now fails silently** (degrades to signed-out) rather
  than crashing. If auth mysteriously doesn't work, check the variable names
  first.

---

## Related docs

- `docs/OFFICER_HANDOFF.md` — accounts, credentials-locations, and open risks
  for the *next VP of Tech* (different audience from this file). Pointers only,
  never secrets.
- `docs/DEPLOYMENT.md` — branch → PR → preview → merge flow. **Never push to
  `main`.**
- `docs/MEMBER_ONBOARDING.md` — the officer runbook: wake the backend, issue
  a code, what members see, how to fix the common failures.
- `docs/student_db.md` — Phase 2 schema notes.
- `CLAUDE.md` / `PRODUCT.md` — design system and brand, both non-negotiable.
