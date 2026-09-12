# Handoff: IBE Website — auth system + GitHub org migration

Replaces the previous handoff (the "site looks boring" UI-revamp thread — that
work shipped in the Home/About/Recruitment/Student Life revamp commits).

---

## ⏭️ Pick up here

**The user is mid-migration, at Step 1 of moving the repos into a GitHub
Organization.** Full plan: `~/.claude/plans/we-have-a-very-functional-toucan.md`

They were asked to create the org and report back with its name. Nothing has
been transferred yet.

**Why the migration:** deploying currently requires unlinking GitHub from their
personal Vercel account, relinking to the IBE Vercel team, deploying, then
relinking back. Root cause, per Vercel's docs: *"To import or connect a GitHub
repository owned by a personal account, you must be the repository Owner"* —
and a personal GitHub identity points at one Vercel scope at a time. Org-owned
repos install the Vercel GitHub App on the **org**, so the two stop fighting.
It also fixes tech-chair access and long-term handoff.

**Not a hosting problem.** OSU suggested Azure/AWS alternatives (Heather
Shepherd email). Migrating hosts would *not* fix this — it's GitHub ownership,
not hosting. Also worth knowing: the alumni PII lives in Supabase, so if OSU
ever raises data-residency as a requirement, hosting is the wrong lever.

### Critical safety rails for the migration
- **Reconnect the EXISTING Vercel project** (Settings → Git). Creating a new one
  loses the `ibeosu.com` domain binding and all four env vars.
- **Never** delete the Vercel project, delete the repo (use Transfer), or touch
  DNS/Porkbun.
- **Don't** blind find-and-replace `yuvi-atre` — `HANDOFF.md` L9/L50 contain
  `yuvi-atres-projects`, a *Vercel scope*, not the GitHub owner.
- After transfer, collaborators become **outside collaborators**, and Vercel
  refuses to let outside collaborators connect a repo. Invite them as org
  **Members**.
- ibeosu.com stays up throughout — Vercel keeps serving the live deployment;
  only *new* deploys pause.

---

## What's built (Phase 1 auth — PRs #52, #53, #54, #56, all merged)

Account creation works end to end, verified live: signup with a membership code
→ confirmation email → `/auth/callback` → session → gated `/members`.

- **Security headers** (`next.config.ts`) — CSP in **report-only**; flip
  `enforceCsp` to `true` to enforce (that's PR 5, the whole diff)
- **Supabase wiring** — `src/lib/supabase/{client,server,middleware}.ts`,
  `src/middleware.ts`
- **Auth** — `/login`, `/signup`, `/auth/callback`, `/members`,
  `/members/alumni-database` (both "Under Construction")
- **Gating** — `requireMember()` / `requireAdmin()` in `src/lib/auth/guards.ts`
- **Migrations** — `supabase/migrations/0001` (app_users, roles, rate limiting),
  `0002` (invite codes, signup hook, provisioning trigger), `0003` (pgcrypto
  search_path fix)

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
| Migrations 0001–0003 | ✅ applied | ❌ none |
| `before_user_created` hook | ✅ registered | ❌ |
| Custom SMTP (Resend) | ✅ | ❌ |
| Site URL | `http://localhost:3000` | must be `https://ibeosu.com` |
| Redirect URLs | ✅ localhost + `*-ohiostateibes-projects.vercel.app` + ibeosu.com | ❌ |
| Status | healthy | **PAUSED** (free tier, 7-day idle — hostname doesn't resolve) |

- **Vercel env vars**: Preview → staging, Production → prod. Set as **Config**,
  not Secret (they're `NEXT_PUBLIC_`, so public by definition).
- **Resend**: account `ibevptech@gmail.com`, `ibeosu.com` verified via Vercel's
  native Resend integration (auto-added the DNS records). Sender
  `noreply@ibeosu.com`, SMTP `smtp.resend.com:465`, username literally `resend`.
- **Email rate limit**: was 2/hour (Supabase default), now **30/hour** with
  custom SMTP. Still Supabase-side and adjustable — raise it before inviting 200
  people.
- **Test invite code** `IBE-CK6135UA-EBJYTWC0UFNW` was created 2026-09-05 with a
  **7-day expiry — it has now expired.** Issue a fresh one for testing:
  ```sql
  insert into public.invite_codes (prefix, secret_hash, label, max_uses, expires_at)
  values ('<8CHARS>', crypt('<12CHARS>', gen_salt('bf')), 'testing', 5, now() + interval '7 days');
  ```
  Codes must be **uppercase alphanumeric only** — `normalizeInviteCode()`
  uppercases input, so a lowercase code is unredeemable.
- **Test accounts on staging**: `yuviatre+ibetest{,2,3}@gmail.com`

---

## What's next, after the migration

- **PR 4 — admin UI + bulk invites.** The important one: paste an email list and
  invite everyone, issue/revoke codes, promote to admin, suspend. Until it
  ships, every code is hand-written SQL. Needs a Supabase **Edge Function** to
  hold the secret key (keeps it out of Vercel).
- **PR 5 — enforce CSP.** One-line flip of `enforceCsp` in `next.config.ts`.
- **Before real launch:** unpause `ibe-prod`, apply migrations 0001–0003, register
  the auth hook, configure SMTP, set Site URL to `https://ibeosu.com`, add its
  redirect URLs, raise the email cap, and issue real (not test) codes.
- **Phase 2 — alumni directory.** Deferred entirely. Note the source data in
  `ibe-connect` was **replaced with a 268-record CSV-derived set** (was 288), so
  re-profile before importing; the earlier duplicate/data-quality analysis is
  stale.

### Known rough edge now live on production
The header shows "Log In" to every visitor, but `ibe-prod` is paused, so signing
in fails — and the message says *"That email or password isn't right"*, which is
misleading when the real cause is the backend being asleep. Low stakes (nobody
has prod credentials), fixed by either setting up prod or hiding the button.

---

## Gotchas (hard-won; several cost real time this session)

- **`npm run build` clobbers a running dev server's `.next`** → the dev server
  starts 500ing on every route. Restart it. This bit us twice.
- **Browser-pane `computer` clicks hang** intermittently while `read_page`,
  `navigate`, and screenshots keep working. Use `javascript_tool` to click via
  `document.querySelector(...).click()` and inspect the DOM instead.
- **Vercel previews are behind deployment protection** — `curl` gets a 302 to
  SSO, so preview state can't be verified from the CLI. The user has to check in
  a browser where they're logged into Vercel.
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
- `docs/student_db.md` — Phase 2 schema notes.
- `CLAUDE.md` / `PRODUCT.md` — design system and brand, both non-negotiable.
