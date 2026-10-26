# Onboarding members (e-board first)

How an officer gets a person from "not on the site" to "signed in and
looking at the members area". No code changes involved — everything here is
the Supabase dashboard's SQL editor plus a message in GroupMe.

## 1. Make sure the backend is awake

Both Supabase projects are on the free tier and **pause after 7 idle days**.
A paused project makes login fail with a misleading "email or password isn't
right". Before an onboarding push, open the dashboard and confirm neither
project says "Project is paused" — if it does, click **Restore project** and
wait ~2–3 minutes.

- `ibe-prod` — https://supabase.com/dashboard/project/ygofoziyvusykfykpdyy (real accounts)
- `ibe-staging` — https://supabase.com/dashboard/project/bvpohtlczjqzasdhwgwe (testing only)

To stop this happening at all, either upgrade `ibe-prod` to Pro or keep
traffic on it (a signed-in member visiting weekly is enough).

## 1b. One-time: make the confirmation email work from any device

Supabase's default confirmation link only works in the browser that filled in
the signup form. Most people sign up on a laptop and open the email on their
phone, so switch the template once per project (already done on staging?
check). In **Authentication → Email Templates → Confirm signup**, replace the
link with:

```html
<p><a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email">Confirm email address</a></p>
```

The site's `/auth/callback` understands both the new `token_hash` link and
the old `code` link, so nothing breaks while you switch.

## 2. Issue a membership code

In **ibe-prod → SQL Editor**, run:

```sql
select public.issue_invite_code('e-board 2026-27', 15, interval '14 days');
```

Arguments: a label (who it's for — shows up in the table so you can revoke
it later), how many signups it may be used for, and how long it stays
valid. It returns the code **once**, e.g. `IBE-K7MXQ2H4-N3P8RW5TVY6Z`. Copy
it now; only a hash is stored.

One shared code with a use limit is fine for a group you trust (e-board).
For the general membership, issue one code per person with `max_uses = 1`
so a leaked code can't be reused.

## 2b. Codes for a whole cohort

The roster is student PII and this repo is public. It and the codes live
only in `private/`, which git ignores, and travel by private OneDrive share.

1. Export the roster (`First Name`, `Last Name`, `OSU email`) to
   `private/roster.csv`.
2. `node scripts/cohort-codes-sql.mjs AU26 private/roster.csv > private/codes.sql`.
   It trims names, lowercases emails, and stops on a duplicate or bad email.
3. Run `private/codes.sql` in the SQL editor, `ibe-staging` first. Download
   the result grid as CSV (`first_name,last_name,email,code,expires_on`)
   and move it from Downloads into `private/`. If the grid shows fewer rows
   than the roster, run it again and download each batch until it returns
   none. Codes are only issued for rows shown.
4. The downloads are the only copy of the codes. If one is lost, revoke
   the cohort (below) and run again. Once the VP has the CSV, delete your
   copies of it and the roster.

Each code is single-use, lasts 14 days, and is labelled
`AU26 member: <email>`, so one person's code can be found and revoked.
Re-running is safe: anyone with an unrevoked, unexpired code under that
label is skipped, so a second run returns only people added since.
To revoke a whole cohort:

```sql
update public.invite_codes set revoked_at = now() where label like 'AU26 member:%';
```

Every signup sends a confirmation email, capped at 30/hour (and 100/day
on Resend's free plan). Send the invites in batches.

The email (mail-merge from the CSV):

> Hi {first_name},
>
> Create your IBE account at https://ibeosu.com/signup. Your personal
> membership code is **{code}**. It works once and is good until
> {expires_on}.
>
> Use any email you'll actually check (OSU or personal) and a password of
> at least 10 characters. You'll get a confirmation email from
> noreply@ibeosu.com. Click the link and you're in.

## 3. Send people to the site

Message:

> Create your IBE account at https://ibeosu.com/signup — membership code
> `IBE-XXXX-XXXX`, use any email you'll actually check (OSU or personal),
> password at least 10 characters. You'll get a confirmation email from
> noreply@ibeosu.com; click the link and you're in.

What they experience: **/signup** → "Check your email" → link →
**/members** (the calendar). Codes are case-insensitive from their side.
Common failures and what they mean:

| They see | Cause |
|---|---|
| "That membership code is not valid." | Typo, expired, revoked, or used up. Check `select label, use_count, max_uses, expires_at, revoked_at from invite_codes;` |
| "Too many attempts." | 5 failed signups from one IP in an hour. Wait. |
| "email rate limit exceeded" | Supabase's hourly send cap (30/hour with Resend). Wait, or raise it under Authentication → Rate Limits. |
| Confirmation link opens `/login?reason=confirm-failed` | Almost always: they opened the link on a different device and the template hasn't been switched (step 1b) — their email *is* confirmed, so logging in works. Otherwise the link expired (24h): delete the user under Authentication → Users and let them sign up again. |
| No email at all | Spam folder first. Then Authentication → Logs, and Resend's dashboard. |

## 4. Promote an officer to admin (optional, for later)

Admins will get the admin UI when it ships. Until then the role only
matters for RLS. In the SQL editor:

```sql
update public.app_users
   set role = 'admin'
 where user_id = (select id from auth.users where email = 'person@osu.edu');
```

## 5. Revoke a code or suspend an account

```sql
update public.invite_codes set revoked_at = now() where label = 'e-board 2026-27';
update public.app_users set status = 'suspended'
 where user_id = (select id from auth.users where email = 'person@osu.edu');
```

Suspended accounts can still log in but every members page bounces them to
`/login?reason=inactive`, and RLS hides all data.

## Testing before a real push

Do the whole flow once on `ibe-staging` (that's what `npm run dev` and every
Vercel preview talk to). Issue a code there, sign up with a real inbox you
control, confirm, and land on `/members`. Staging has no real data and can
be reset freely.
