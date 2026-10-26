# Loading the alumni directory

`build-seed.ts` turns the verified import CSVs into one SQL file that loads
the tables from migration 0005 (`alumni`, `alumni_jobs`,
`alumni_education`). It is an officer task, run by hand. The app has no
secret key and never writes these tables.

The CSVs and the generated SQL hold personal data. They live in `private/`
at the repo root, which `.gitignore` excludes, and the script refuses to
write anywhere git would track. Never commit them, and never paste names or
contact details into a PR, issue or commit message: this repo is public.

## Run it

From the repo root (Node 22.18 or newer runs `.ts` directly; on older 22.x
add `--experimental-strip-types`):

```bash
node scripts/alumni/build-seed.ts private/alumni-db-import.csv private/experience-db-import.csv private/alumni-seed.sql
```

Then run the SQL on staging first, and on prod only under the rules in
[`docs/agent/DATABASE.md`](../../docs/agent/DATABASE.md) ("The two
projects"):

```bash
npx supabase db query --linked --project-ref bvpohtlczjqzasdhwgwe -f private/alumni-seed.sql
```

The SQL editor works too. The last statement returns the row counts.

## What the SQL does

One transaction that syncs the tables to the CSV:

1. Upserts `alumni` on `source_row`, so ids stay stable for everyone who
   stays.
2. Deletes alumni whose `source_row` is no longer in the CSV (their jobs
   and grad school go with them by cascade).
3. Replaces every `alumni_jobs` and `alumni_education` row.
4. Rolls back unless the final counts equal the CSV's, so a partial load
   can't happen.

Every run stamps `updated_at` on every row, and the directory's "Last
updated" date is the newest `updated_at`. So re-running the same file
changes no data, only that date. Re-running a newer CSV is how corrections
ship until there is an admin UI. Any edit made directly in the database is
overwritten by the next run, so fix the CSV instead.

## What it reads

Only the columns the directory shows. `personalEmail` becomes `email`
(members see it on a profile, migration 0008) unless `emailInvalid` says it
bounced. `phone`, `osuEmail` and `gender` are never read, so they cannot
end up in the SQL. LinkedIn URLs are normalized to
`https://www.linkedin.com/in/<slug>` (the schema rejects anything else),
"Class of Unknown" becomes a null `class_year`, and "(in progress)" on a
grad program becomes `in_progress = true`. Job rows with neither a title
nor a company are kept as `note`s.
