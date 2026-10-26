# Database and auth

Supabase: hosted Postgres, Auth, and row-level security (RLS). The schema is
the numbered migrations in `supabase/migrations/`, applied in order. Nothing in the
database is hand-edited that is not also in a migration, except the
dashboard-only auth settings listed at the end.

## The two projects

| | `ibe-staging` | `ibe-prod` |
|---|---|---|
| Ref | `bvpohtlczjqzasdhwgwe` | `ygofoziyvusykfykpdyy` |
| URL | `https://bvpohtlczjqzasdhwgwe.supabase.co` | `https://ygofoziyvusykfykpdyy.supabase.co` |
| Used by | `npm run dev` (via `.env.local`), CI, every Vercel preview | ibeosu.com only |
| Data | Throwaway. Reset freely. | Real member accounts. |
| Who may write | Any officer with Developer access, from the SQL editor or CLI | The VP of Tech, after a staging rehearsal |

Both are on the Free plan, which **pauses a project after 7 idle days**. A
paused project does not resolve DNS, so logins fail with a vague error and
`supabase link` says "project is paused". The keep-alive workflow
(`.github/workflows/keepalive.yml`, Monday and Thursday) calls
`rpc/is_active_member` on both projects so they count as active.
Restoring a paused project is a dashboard button (**Restore project**,
about 3 minutes).

Free plan members: an organization can have several members with the
Owner, Administrator, or Developer role. Read-only and project-scoped roles
need a paid plan, so everyone invited sees both projects. The safety net for
prod is process, not permissions: rehearse on staging, write to prod only
when the VP of Tech says so.

## Schema (`public`)

```
app_users          one row per account; role (member|admin), status (active|suspended)
rate_limits        fixed-window counters keyed by text; only touched by check_rate_limit()
invite_codes       prefix (plaintext, unique), secret_hash (bcrypt), label, max_uses,
                   use_count, expires_at, revoked_at, created_by
invite_redemptions which code created which user; unique (code_id, user_id)
alumni             one row per alum: name, class_year (null = unknown), college (UENG|UBUS),
                   majors[], minors[], linkedin_url, current title/employer/city/state,
                   involvements[], ibe_evidence; unique source_row (CSV row)
alumni_jobs        job history, position 0 = most recent; title, company, start_label,
                   end_label ("Aug 2022", "Present"), location, note
alumni_education   graduate school: institution, program, year, in_progress
```

Enums: `user_role` (`member`, `admin`) and `user_status` (`active`,
`suspended`). Every table has RLS **enabled and forced** (`force row level
security` closes the table-owner bypass).

Functions, all `security definer` with a pinned `search_path`:

| Function | Migration | What it does |
|---|---|---|
| `is_active_member()` | 0001 | True when the caller has an `app_users` row with status active. Every RLS policy should gate on this or `is_admin()`, never on `auth.uid()` directly. |
| `is_admin()` | 0001 | As above, plus role admin. |
| `check_rate_limit(key, limit, window)` | 0001 | Postgres-native rate limiter (no Redis). Cleans rows older than a day on every call. |
| `validate_invite_code(code)` | 0002, fixed in 0003 | Parses `IBE-<prefix>-<secret>`, looks up the prefix, checks revoked / expired / exhausted / bcrypt match. Every failure returns the same `null` so responses cannot be used as an oracle. |
| `before_user_created(event)` | 0002 | Supabase **Auth Hook**. Rate-limits signups to 5 per IP per hour, rejects when the invite code in `user_metadata.invite_code` does not validate. Executable only by `supabase_auth_admin`. Must be registered in the dashboard. |
| `handle_new_user()` | 0002 | `after insert on auth.users` trigger. Re-validates the code, increments `use_count`, inserts `invite_redemptions` and `app_users` in the same transaction. Fails closed if the hook was never registered. |
| `issue_invite_code(label, max_uses, valid_for)` | 0004 | Generates a code from a 32-letter alphabet without 0/O/1/I, bcrypts the secret, stores the row, returns the plaintext once. Callable by `postgres` (the SQL editor) or an active admin. |

Who may call them (0007): PostgREST exposes every `public` function the
caller can execute at `/rest/v1/rpc/<name>`, so grants are the access
control. `anon` and `authenticated` can execute only `is_active_member()`
and `is_admin()` (RLS policies run them as the querying role; the
keep-alive calls one), plus `issue_invite_code()` for `authenticated`.
Everything else has no caller grants; the definer functions that call
them run as `postgres`. New functions created by `postgres` start with
none either, so a migration that adds one must `grant execute` to whoever
calls it. An RLS helper needs `authenticated`, or every policy that uses
it fails with `permission denied for function`.
Extension functions a migration installs as `postgres` (say `pg_trgm`) are
no exception, since the PUBLIC default can't be scoped to a schema: grant
the ones the app calls.

Policies:

- `app_users`: a user reads their own row; admins read and write all rows.
  There is **no insert policy**: rows come only from `handle_new_user()`.
- `invite_codes`, `invite_redemptions`: admin only. App code never reads
  `secret_hash`.
- `rate_limits`: no policies at all; only the function touches it.
- `alumni`, `alumni_jobs`, `alumni_education`: any active member selects;
  insert, update, and delete are admin only, one policy per command (a
  `for all` admin policy would be a second SELECT policy on every read).
- Grants (0006): `anon` has none on any `public` table; `authenticated`
  has only `select`, `insert`, `update`, `delete`, which RLS filters. New
  tables start this way, so they need no per-table `revoke`. Sequences
  still get Supabase's default grants; functions are covered by 0007 (see
  "Who may call them" above).

Why bcrypt and not SHA-256: a leaked table of unsalted hashes of short codes
falls to a GPU in hours. Why the code is uppercase: the signup form
uppercases input, and bcrypt is case-sensitive, so a generated code with
lowercase letters would be unredeemable. Keep `issue_invite_code()`'s
alphabet uppercase.

Why pgcrypto is in `extensions`: Supabase installs it there, not in
`public`. Migration 0003 exists because `validate_invite_code()` pinned
`search_path = public, pg_temp` and could not see `crypt()`. Any new
`security definer` function that uses `crypt()` or `gen_random_bytes()`
needs `extensions` in its `search_path`.

## The alumni directory (0005)

The migration's comments explain each choice. The ones that constrain
future work:

- **No contact details, by design.** Adding phone or email later means a
  new table with admin-only policies, never new columns on `alumni`, which
  every member reads.
- `linkedin_url` only accepts `https://www.linkedin.com/in/<slug>`, so the
  UI renders it as a link without re-checking.
- Loading is an officer task (the app has no secret key). The SQL editor
  and `supabase db query` run as `postgres`, which bypasses RLS.

## The signup flow, end to end

1. `/signup` (`SignupForm.tsx`): zod validates the code shape, email, and a
   10+ character password (the dashboard's minimum; keep the two in sync).
   `supabase.auth.signUp()` is called with `emailRedirectTo =
   <origin>/auth/callback` and `data: { invite_code }`.
2. Supabase Auth runs `before_user_created()`. Bad code or too many attempts
   returns a 403 or 429 and the form shows the message verbatim.
3. Auth inserts into `auth.users`; the trigger `handle_new_user()` consumes
   the code and creates the `app_users` row in the same transaction.
4. Supabase emails a confirmation link through Resend SMTP
   (`noreply@ibeosu.com`). The template must be switched to
   `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email` so the link
   works from any device; the default PKCE `?code=` link only works in the
   browser that submitted the form.
5. `/auth/callback/route.ts` verifies either `token_hash` (preferred) or
   `code` (fallback), writes the session cookie, and redirects to `/members`.
   On failure it redirects to `/login?reason=confirm-failed`, which tells the
   user their email is probably confirmed and to just log in.
6. `/login` (`LoginForm.tsx`): `signInWithPassword`. Three errors get their
   own wording: unconfirmed email, unreachable backend (usually a paused
   project), and everything else kept vague so the form cannot enumerate
   accounts.
7. Every `/members` page calls `requireMember()` first. It verifies the
   session with `getUser()` (never `getSession()`, which trusts the cookie),
   then checks for an active `app_users` row, redirecting to `/login` or
   `/login?reason=inactive`. RLS enforces the same thing on every query.

`signOut()` is global scope: signing out in one browser revokes the session
everywhere, including a simulator used for testing.

## Working with migrations

```bash
npm run db:start                      # local Supabase (Docker); Studio at http://127.0.0.1:54323
npm run db:reset                      # drop and re-run migrations + seed
npx supabase migration new <name>     # creates supabase/migrations/<timestamp>_<name>.sql
npx supabase link --project-ref bvpohtlczjqzasdhwgwe   # staging
npx supabase db push                  # apply pending migrations to the linked project
```

`db push` targets whichever project was last linked (stored in
`supabase/.temp/project-ref`, gitignored). Read that file before every
push and relink to staging if it is not `bvpohtlczjqzasdhwgwe`. Linking
asks for the project's database password; the staging one is handed over
at onboarding (or reset under Project Settings → Database). Without the
CLI, paste the migration into the project's SQL editor after checking the
project name in the dashboard header.

Migrations are numbered `0001`, `0002`, and so on. Take the next number
not already used on `main` or in an open PR so `db push` order stays obvious. Rules:

- One concern per migration, with a header comment that says why.
- Never edit a migration that has been pushed to staging. Add a new one.
- Apply to staging first, run the real signup form against it (never
  `curl`, which bypasses PKCE and produces a different link), then ask the
  VP of Tech to push to prod.
- The local `supabase/config.toml` mirrors the dashboards where it matters:
  Postgres 17, `minimum_password_length = 10`, email confirmations on.
  Local emails land in Inbucket at `http://127.0.0.1:54324`.
- `npm run db:types` writes `src/types/database.ts`. It is not committed
  yet; if you start relying on it, commit it and add a CI check that it is
  up to date.

## Dashboard-only configuration

These are not in migrations. Each project needs them set by hand; staging
has most of them, prod has none until it is restored and configured (see
`HANDOFF.md`):

- Authentication → URL Configuration: Site URL and redirect URLs
  (`http://localhost:3000/**`, `https://*-ohiostateibes-projects.vercel.app/**`,
  `https://ibeosu.com/**`, `https://www.ibeosu.com/**`).
- Authentication → Hooks → Before User Created → `public.before_user_created`.
- Authentication → Email Templates → Confirm signup → the `token_hash` link.
- Authentication → Rate Limits → emails sent per hour (30 with Resend).
- Project Settings → Authentication → SMTP: `smtp.resend.com`, port 465,
  user `resend`, password = the Resend API key, sender `noreply@ibeosu.com`.
- Project Settings → API Keys: the publishable key goes in `.env.local`, CI,
  and Vercel. The secret key goes nowhere.

## Day-to-day SQL

Issuing, inspecting, and revoking codes, promoting admins, and suspending
accounts are all SQL-editor statements documented once, with the officer
message and the failure table, in `docs/MEMBER_ONBOARDING.md`. Run them on
`ibe-staging` first.

## What is next

The roadmap (admin UI with an Edge Function for invites, alumni self-service
edits once alumni have accounts, CSP enforcement) is tracked in `HANDOFF.md`.
`docs/student_db.md` is an older sketch of a `profiles`-style schema tied to
`auth.users`; the shipped directory (0005) does not use it.

## Gotchas, collected

- Paused project → "wrong password" symptoms. Check the dashboard first.
- Supabase rejects `@example.com` signups; test with a real inbox (a
  `you+ibetest1@gmail.com` style alias works).
- Confirmation links expire in 24h; delete the user under Authentication →
  Users and let them sign up again.
- An account can authenticate but have no `app_users` row (suspended or
  created outside the flow). It sees nothing, by design.
- `permission denied for function <name>` after adding a function: it has
  no grants yet. See "Who may call them" above.
