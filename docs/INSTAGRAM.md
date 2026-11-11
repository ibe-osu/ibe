# Instagram feed (/student-life)

The **IBE Happenings** section on `/student-life` shows the six latest posts
from [@ohiostateibe](https://www.instagram.com/ohiostateibe/). New posts show
up on their own within about 12 hours; nobody has to edit the site.

It reads one environment variable, `INSTAGRAM_ACCESS_TOKEN`. Without it (or
with an expired one) the section quietly falls back to static cohort photos
from `public/happenings/`. The page never breaks, so if you see the old
Cleveland/date-party photos on the live site, **the token needs renewing**.

Code: [`src/lib/instagram.ts`](../src/lib/instagram.ts) (fetch) and
[`src/components/student-life/Happenings.tsx`](../src/components/student-life/Happenings.tsx) (layout).

## One-time setup

1. **Make @ohiostateibe a professional account** (free). In the Instagram
   app: Settings → *Account type and tools* → *Switch to professional
   account*. Creator or Business both work. The API doesn't serve personal
   accounts.
2. **Create a Meta developer app** at <https://developers.facebook.com/apps>
   using the program identity (`OhioStateIBE@osu.edu`), not a personal
   account. Pick the use case for managing content on Instagram (the
   *Instagram API*).
3. In the app dashboard, open **Instagram → API setup with Instagram login →
   Generate access tokens**, add @ohiostateibe, and log in as it. If it asks
   for a role first, add the account under *App roles → Instagram testers*
   and accept the invite from the Instagram account's settings.
   The only permission needed is `instagram_business_basic`. Reading your own
   account's posts does **not** need Meta's App Review.
4. Copy the generated token (it's long-lived, 60 days) into **Vercel →
   ohiostateibes-projects → IBE project → Settings → Environment
   Variables** as `INSTAGRAM_ACCESS_TOKEN`, for Production and Preview.
   Then redeploy.

For local development, put the same line in `.env.local`. It's optional:
leave it out and you'll see the fallback photos.

## Renewing the token (every ~50 days)

Long-lived tokens expire after **60 days**. Refresh one any time it's at
least a day old and not yet expired:

```bash
curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=CURRENT_TOKEN"
```

Paste the `access_token` from the response into the Vercel env var and
redeploy. If it already expired, generate a fresh one from step 3 instead.

Put a recurring calendar reminder on the VP of Tech's calendar for this.

## Troubleshooting

Feed errors are logged on the server, never shown to visitors. Look in
**Vercel → Logs** for lines starting with `Instagram feed:`. Error code
`190` means the token expired or was revoked. Renew it as above.
