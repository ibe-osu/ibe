---
name: db
description: Supabase work for ibeosu.com - schema and migrations, RLS policies, the invite-code and signup pipeline, issuing or revoking membership codes, promoting admins, auth configuration, and deciding whether ibe-staging or ibe-prod is the safe target. Use for any task that mentions Supabase, Postgres, migrations, invite codes, membership, login, signup, RLS, or the members area backend.
---

# Supabase

Reference: `docs/agent/DATABASE.md` (schema, functions, flow, gotchas) and
`docs/MEMBER_ONBOARDING.md` (the officer runbook). Read the first before
changing anything.

## Which project

| Target | Ref | Safe for |
|---|---|---|
| `ibe-staging` | `bvpohtlczjqzasdhwgwe` | Everything: migrations, SQL, test accounts, resets. Dev, CI, and previews use it. |
| `ibe-prod` | `ygofoziyvusykfykpdyy` | **VP of Tech only.** Real members. Rehearse on staging first and hand over exact steps. |

Both are Free plan and pause after 7 idle days (the keep-alive workflow,
`.github/workflows/keepalive.yml`, pings them Mon and Thu). A paused
project looks like "wrong password" or "can't reach the sign-in service".
Check the dashboard before debugging.

Both projects are visible to every org member. **Before running SQL, read
the project name in the dashboard header.** Before `db push`, read the
linked ref: `cat supabase/.temp/project-ref` must print
`bvpohtlczjqzasdhwgwe`; relink to staging explicitly if it does not.

## Rules that are not negotiable

- The secret key (`sb_secret_...`) never enters this app, `.env.local`, CI,
  or Vercel. Only an Edge Function may hold it. If a task needs it, the
  task is an Edge Function.
- Every table: `enable row level security` **and** `force row level
  security`. Policies gate on `is_active_member()` / `is_admin()`, not raw
  `auth.uid()`.
- `security definer` functions pin `search_path`; add `extensions` when
  they call `crypt()` or `gen_random_bytes()`.
- Server code authenticates with `getUser()` or `getClaims()`, never
  `getSession()`. Middleware is not an auth check.
- Codes stay uppercase; the form uppercases input and bcrypt is
  case-sensitive.
- Test signups through the real form in a browser, never `curl`, and with a
  real inbox (Supabase rejects `@example.com`).

## Common tasks

**New migration**: `supabase/migrations/0005_<topic>.sql`, header comment
with the why, one concern. Apply with `npx supabase link --project-ref
bvpohtlczjqzasdhwgwe && npx supabase db push` (it asks for the
`ibe-staging` database password, which the VP hands over at onboarding; if
you do not have it, paste the migration into the staging SQL editor
instead). Exercise it through the real signup form, then write the prod
steps into the PR's "Before this shows live" section for the VP.

**Issue a code** (SQL editor, staging to test, prod when the VP says):
`select public.issue_invite_code('<who it is for>', <uses>, interval '<n> days');`
The plaintext is returned once. Hand it to the VP or post it in the
e-board GroupMe with the message from `docs/MEMBER_ONBOARDING.md`.

**Revoke / suspend / promote**: the three `update` statements in
`docs/agent/DATABASE.md`.

**Auth config** (URL configuration, hooks, email template, SMTP, rate
limits) is dashboard-only and is a VP action on both projects. Write the
exact click path instead of attempting it.

**Local stack**: `npm run db:start` (Docker), Studio at
`http://127.0.0.1:54323`, emails in Inbucket at `:54324`, `npm run db:reset`
to replay migrations.

## Before you finish

- Did anything touch prod? It should not have.
- Is the migration in the PR, applied to staging, and exercised through the
  real flow?
- Did `docs/agent/DATABASE.md` or `docs/MEMBER_ONBOARDING.md` need an update
  for what you changed?
