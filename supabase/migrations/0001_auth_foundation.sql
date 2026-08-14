-- 0001_auth_foundation.sql
--
-- Accounts and roles. Deliberately contains no directory/PII tables — this
-- migration only establishes who is allowed to see anything at all, so the
-- security model can be proven before any real member data exists.

create extension if not exists pgcrypto;

create type public.user_role   as enum ('member', 'admin');
create type public.user_status as enum ('active', 'suspended');

-- One row per signed-up account. Every RLS policy in this project should
-- gate on is_active_member() / is_admin() below rather than checking
-- auth.uid() directly, so an account with no app_users row (or a suspended
-- one) sees nothing, even though it can still authenticate.
create table public.app_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  role       public.user_role   not null default 'member',
  status     public.user_status not null default 'active',
  created_at timestamptz        not null default now()
);

alter table public.app_users enable row level security;
-- FORCE, not just ENABLE: ENABLE alone still lets the table owner bypass
-- RLS. FORCE is what actually closes that hole.
alter table public.app_users force row level security;

-- SECURITY DEFINER + a pinned search_path (the standard Supabase
-- privilege-escalation footgun is omitting search_path) let these read
-- app_users without recursing into the RLS policy defined on app_users
-- itself. Without SECURITY DEFINER, a policy that calls this function would
-- invoke the function, which queries app_users, which re-invokes the
-- policy — Postgres errors with "infinite recursion detected in policy".
create or replace function public.is_active_member()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.app_users
    where user_id = (select auth.uid())
      and status = 'active'
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.app_users
    where user_id = (select auth.uid())
      and status = 'active'
      and role = 'admin'
  );
$$;

-- A signed-in user can read their own row (so the app can show "you are a
-- member" / "you are an admin"), and an admin can read and write every row.
create policy app_users_self_read on public.app_users
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy app_users_admin_all on public.app_users
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Deliberately no INSERT policy. Rows are only ever created by the
-- handle_new_user() trigger added in migration 0002, which runs as
-- SECURITY DEFINER and therefore bypasses RLS entirely. A signed-in user
-- can never create their own app_users row — that would let anyone grant
-- themselves membership by inserting one.

-- Postgres-native rate limiting: one fixed-window counter table instead of
-- a Redis/Upstash dependency, so there's one fewer vendor and one fewer
-- credential for a successor to inherit. Used starting in migration 0002
-- to throttle invite-code redemption attempts.
create table public.rate_limits (
  bucket_key   text        not null,
  window_start timestamptz not null,
  hits         int         not null default 0,
  primary key (bucket_key, window_start)
);

alter table public.rate_limits enable row level security;
alter table public.rate_limits force row level security;
-- Deliberately zero policies here: nobody queries this table directly from
-- the app, only check_rate_limit() below (SECURITY DEFINER) ever touches it.

-- Returns true (and records the hit) if bucket_key is still within p_limit
-- hits for the current fixed window of length p_window; false if the limit
-- for the current window is already exceeded.
create or replace function public.check_rate_limit(
  p_key    text,
  p_limit  int,
  p_window interval
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_window_seconds double precision := extract(epoch from p_window);
  v_window         timestamptz;
  v_hits           int;
begin
  v_window := to_timestamp(
    floor(extract(epoch from now()) / v_window_seconds) * v_window_seconds
  );

  insert into public.rate_limits (bucket_key, window_start, hits)
  values (p_key, v_window, 1)
  on conflict (bucket_key, window_start)
    do update set hits = rate_limits.hits + 1
  returning hits into v_hits;

  -- Opportunistic cleanup on every call — cheap at this table's size, and
  -- means nobody has to remember a cron job exists to keep it from growing
  -- forever.
  delete from public.rate_limits where window_start < now() - interval '1 day';

  return v_hits <= p_limit;
end;
$$;
