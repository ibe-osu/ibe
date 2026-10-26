-- 0005_alumni_directory.sql
--
-- The members-only alumni directory behind /members/alumni-database. Three
-- tables: one row per alum, their job history, and their graduate school.
-- Every column here is something any active member may read; there is
-- deliberately no phone or email anywhere in this schema. LinkedIn is the
-- only way to reach someone from the directory, so a leaked session or a
-- policy mistake can't expose contact details that were never stored.
--
-- Rows are loaded by an officer from the verified import CSVs, never by app
-- code. The app only reads, with the member's own session, so RLS below is
-- the second wall behind requireMember().

create table public.alumni (
  id               uuid primary key default gen_random_uuid(),
  -- Row in the verified alumni-directory.csv (header = 1). The seed upserts
  -- on it, so re-running a newer CSV updates people instead of duplicating.
  source_row       int  not null unique,
  first_name       text not null,
  last_name        text not null,
  class_year       int  check (class_year between 1990 and 2100),
  college          text check (college in ('UENG', 'UBUS')),
  -- Primary first.
  majors           text[] not null default '{}',
  minors           text[] not null default '{}',
  -- Canonical form only, so the UI can put it in an href without worrying
  -- about javascript: URLs or tracking parameters.
  linkedin_url     text check (linkedin_url ~ '^https://www\.linkedin\.com/in/[^/?#]+$'),
  current_title    text,
  current_employer text,
  current_city     text,
  -- A US state code, or a country for people abroad.
  current_state    text,
  involvements     text[] not null default '{}',
  -- How we know this person was in IBE: their LinkedIn profile says so, they
  -- are in the IBE LinkedIn group, or program history.
  ibe_evidence     text check (ibe_evidence in ('profile', 'linkedin_group', 'history')),
  -- Last time the seed wrote this row.
  updated_at       timestamptz not null default now()
);

-- One row per role, most recent first (position 0). Dates stay as the
-- LinkedIn labels ("Aug 2022", "2019", "Present"); nothing sorts or filters
-- on them yet. A few rows carry only a note (e.g. older roles LinkedIn hid
-- behind "Load more") so the import loses nothing.
create table public.alumni_jobs (
  id          bigint generated always as identity primary key,
  alumni_id   uuid not null references public.alumni (id) on delete cascade,
  position    int  not null check (position >= 0),
  title       text,
  company     text,
  start_label text,
  end_label   text,
  location    text,
  note        text,
  unique (alumni_id, position),
  check (title is not null or company is not null or note is not null)
);

-- Graduate school, one row per program. Undergrad is implicit: OSU, with
-- the college and majors on alumni.
create table public.alumni_education (
  id          bigint generated always as identity primary key,
  alumni_id   uuid not null references public.alumni (id) on delete cascade,
  institution text not null,
  program     text,
  year        int check (year between 1990 and 2100),
  in_progress boolean not null default false
);

-- alumni_jobs is covered by its unique (alumni_id, position) index. No
-- indexes on the filter columns: the directory loads all ~200 rows once and
-- filters in the browser, so Postgres never filters on them.
create index alumni_education_alumni_id_idx on public.alumni_education (alumni_id);

alter table public.alumni           enable row level security;
alter table public.alumni           force  row level security;
alter table public.alumni_jobs      enable row level security;
alter table public.alumni_jobs      force  row level security;
alter table public.alumni_education enable row level security;
alter table public.alumni_education force  row level security;

-- Signed-out visitors have no business here at all. RLS would already
-- return nothing to anon (is_active_member() is false without a session);
-- revoking the grants means a policy mistake still can't leak to anon.
revoke all on public.alumni, public.alumni_jobs, public.alumni_education from anon;
-- TRUNCATE ignores RLS entirely, and Supabase grants it to authenticated by
-- default. PostgREST can't issue it, but nothing else should either.
revoke truncate, references, trigger
  on public.alumni, public.alumni_jobs, public.alumni_education
  from authenticated;

-- Any active member reads the whole directory. Writes are admin only, for
-- corrections from the SQL editor or a future admin UI; the seed itself
-- runs as postgres, which bypasses RLS. Writes get one policy per command
-- rather than `for all` so SELECT has exactly one policy to evaluate, and
-- every check is wrapped in (select ...) so Postgres runs it once per query
-- instead of once per row.

create policy alumni_member_read on public.alumni
  for select
  to authenticated
  using ((select public.is_active_member()));

create policy alumni_admin_insert on public.alumni
  for insert
  to authenticated
  with check ((select public.is_admin()));

create policy alumni_admin_update on public.alumni
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy alumni_admin_delete on public.alumni
  for delete
  to authenticated
  using ((select public.is_admin()));

create policy alumni_jobs_member_read on public.alumni_jobs
  for select
  to authenticated
  using ((select public.is_active_member()));

create policy alumni_jobs_admin_insert on public.alumni_jobs
  for insert
  to authenticated
  with check ((select public.is_admin()));

create policy alumni_jobs_admin_update on public.alumni_jobs
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy alumni_jobs_admin_delete on public.alumni_jobs
  for delete
  to authenticated
  using ((select public.is_admin()));

create policy alumni_education_member_read on public.alumni_education
  for select
  to authenticated
  using ((select public.is_active_member()));

create policy alumni_education_admin_insert on public.alumni_education
  for insert
  to authenticated
  with check ((select public.is_admin()));

create policy alumni_education_admin_update on public.alumni_education
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy alumni_education_admin_delete on public.alumni_education
  for delete
  to authenticated
  using ((select public.is_admin()));
