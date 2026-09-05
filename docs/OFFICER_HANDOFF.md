# Officer Handoff — IBE Website & Infrastructure

This is a living document, not a one-time writeup. Update it whenever a new
service, account, or credential gets added to the project — the goal is
that the next VP of Tech never has to reconstruct this from memory, old
PDFs, or GroupMe messages.

**Rule for this file: pointers, never secrets.** This file lives in the
git repo, so anyone with repo access can read it — including, eventually,
people who no longer need access. Never paste an actual password, API key,
or database connection string here. Say *where* it's stored (which
password manager, which vault, who to ask) instead.

---

## The shared program identity

**`OhioStateIBE@osu.edu`** is IBE's existing shared email. Use this (not a
personal address) as the account owner for every new service going
forward — Resend, and anything added later. It's already the login for
Porkbun and was used for Google Search Console verification history.

**Known friction (inherited from the last handoff, still worth fixing):**
2FA codes sent to this inbox currently have to be forwarded by whoever
else has access to it (previously "KK" forwarding to the VP of Tech),
sometimes under a tight time limit. Worth sorting out direct access to
this inbox's 2FA methods for whoever holds the VP of Tech role, so the
next handoff doesn't inherit the same bottleneck.

## Accounts & services

| Service | Account identity | Owned by / where creds live | Notes |
|---|---|---|---|
| **GitHub** (`yuvi-atre/ibe`) | Personal account (`yuvi-atre`) | — | **Known risk, not urgent today:** repo lives under a personal account, not an org. The previous VP flagged the same idea independently ("consider making a GitHub organization for ibe") — worth doing whenever there's time, not blocking current work. |
| **Vercel** | Team: `ohiostateibes-projects` | — | Already set up correctly as a team, not personal. Add new officers directly as team members. |
| **Domain** (`ibeosu.com`) | Registrar: Porkbun. Username `ohiostateibe`. Nameservers: Vercel. | Password: *(ask the current VP of Tech directly — not stored here)* | **Payment method was on the previous VP's personal card and may still be** — confirm it's on an IBE-owned card (Huntington, per the prior handoff notes) before it matters at renewal time. DNS records are managed in the **Vercel dashboard**, not Porkbun's own panel, since nameservers are delegated to Vercel. |
| **Google Search Console** | Set up under a previous VP's *personal* Google account, later transferred | — | Confirm current ownership is actually the VP of Tech role's identity, not stranded on someone who's graduated. |
| **Supabase — `ibe-staging`** | `https://bvpohtlczjqzasdhwgwe.supabase.co` | — | Every PR preview and CI run tests against this. No real member data, ever — safe to reset. |
| **Supabase — `ibe-prod`** | `https://ygofoziyvusykfykpdyy.supabase.co` | — | Will hold real member accounts once launched. Free tier — see the auth plan for the cost/hosting tradeoff and when to upgrade. |
| **Supabase — old/unused project** (`ezzgtzbznobkaljxypom.supabase.co`) | Shared with `atreyuvraj@gmail.com` (note: differs from the VP's main `yuviatre@gmail.com` — worth reconciling which is the real account) | — | This is almost certainly the prior VP's abandoned prototype mentioned in the old onboarding doc ("login authentication set up on a branch, never merged to main") — its `profile`/`companies`/`experiences` tables are empty. Safe to delete once confirmed unneeded; frees a project slot on the free tier. |
| **Resend** (transactional email) | *(in progress — use `OhioStateIBE@osu.edu`)* | *(fill in once created)* | Needed because Supabase's built-in mailer caps at 2 emails/hour — nowhere near enough for onboarding the member list. |

## Open items to fill in

- [ ] Rotate the Porkbun password (it was shared in a plaintext PDF; rotate regardless of whether it's still current) and store the new one only in a password manager.
- [ ] Confirm/switch Porkbun's payment method off the previous VP's personal card.
- [ ] Confirm Google Search Console ownership actually landed on the current VP of Tech's identity.
- [ ] Decide on and, if pursued, execute the GitHub Organization migration.
- [ ] Reconcile the two personal Gmail addresses referenced in Supabase sharing history (`yuviatre@gmail.com` vs `atreyuvraj@gmail.com`).
- [ ] Delete or repurpose the unused `ezzgtzbznobkaljxypom` Supabase project once confirmed safe.
- [ ] Fill in where the two `ibe-staging`/`ibe-prod` database passwords are stored.

---

## Why the current codebase is designed for easy handoff

Worth knowing even if you never touch the code directly:

- **No secret keys live in this app.** The Supabase credential that bypasses
  all security (`SUPABASE_SECRET_KEY`) is never used by the Next.js app or
  CI — only a Supabase Edge Function (planned for the admin UI) touches it,
  and Supabase injects that automatically. There's nothing that powerful
  for a departing officer to have ever held.
- **Membership codes and roles are managed through Postgres**, not hardcoded.
  Issuing/revoking invite codes and promoting someone to admin (once the
  admin UI ships) doesn't require a code change or a pull request.
- **Migrations are checked into `supabase/migrations/`** — the entire
  database schema can be reproduced from scratch by anyone with CLI access,
  without reverse-engineering the live database by hand.
