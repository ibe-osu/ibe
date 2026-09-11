-- 0002_invite_codes.sql
--
-- Membership codes and the signup pipeline that consumes them. Codes use a
-- split prefix/secret design (like an API key): the prefix is plaintext and
-- indexed for O(1) lookup, the secret is bcrypt-hashed via pgcrypto. A code
-- looks like IBE-<8 char prefix>-<12 char secret>. Unsalted SHA-256 of a
-- 10-char code would fall to a GPU in hours on a DB leak; bcrypt is slow and
-- salted on purpose.

create table public.invite_codes (
  id          uuid primary key default gen_random_uuid(),
  prefix      text        not null unique,
  secret_hash text        not null,
  label       text        not null,
  max_uses    int         not null default 1 check (max_uses > 0),
  use_count   int         not null default 0,
  expires_at  timestamptz not null,
  revoked_at  timestamptz,
  created_by  uuid references auth.users (id),
  created_at  timestamptz not null default now()
);

alter table public.invite_codes enable row level security;
alter table public.invite_codes force row level security;

-- Admins manage codes through the admin UI (PR 4). No app code ever reads
-- secret_hash back out — validate_invite_code() below is the only thing
-- that touches it, and it runs as SECURITY DEFINER.
create policy invite_codes_admin on public.invite_codes
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table public.invite_redemptions (
  id          uuid primary key default gen_random_uuid(),
  code_id     uuid not null references public.invite_codes (id),
  user_id     uuid not null references auth.users (id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique (code_id, user_id)
);

alter table public.invite_redemptions enable row level security;
alter table public.invite_redemptions force row level security;

create policy invite_redemptions_admin on public.invite_redemptions
  for select
  to authenticated
  using (public.is_admin());

-- Validates "IBE-<prefix>-<secret>" and returns the code's id, or null.
-- Every failure mode (malformed, unknown prefix, revoked, expired,
-- exhausted, wrong secret) returns the same null with the same shape —
-- deliberately, so a caller can't use response differences as an oracle to
-- find out which part of a guess was wrong.
create or replace function public.validate_invite_code(p_code text)
returns uuid
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  v_prefix text;
  v_secret text;
  v_row    public.invite_codes;
begin
  if p_code is null or p_code !~ '^IBE-[A-Za-z0-9]+-[A-Za-z0-9]+$' then
    return null;
  end if;

  v_prefix := split_part(p_code, '-', 2);
  v_secret := split_part(p_code, '-', 3);

  select * into v_row from public.invite_codes where prefix = v_prefix;
  if not found then return null; end if;
  if v_row.revoked_at is not null then return null; end if;
  if v_row.expires_at <= now() then return null; end if;
  if v_row.use_count >= v_row.max_uses then return null; end if;
  if v_row.secret_hash <> crypt(v_secret, v_row.secret_hash) then return null; end if;

  return v_row.id;
end;
$$;

-- Runs before auth.users gets the new row. Rejects the signup outright if
-- the invite code in the request's metadata doesn't validate, and
-- rate-limits by IP so guessing prefixes is slow. This is a Supabase Auth
-- Hook — registering it happens in the dashboard (Authentication > Hooks >
-- Before User Created), not in this migration. See the PR description.
create or replace function public.before_user_created(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_code text;
  v_ip   text;
begin
  v_code := event -> 'user' -> 'user_metadata' ->> 'invite_code';
  v_ip   := coalesce(event -> 'metadata' ->> 'ip_address', 'unknown');

  if not public.check_rate_limit('signup:' || v_ip, 5, interval '1 hour') then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'Too many attempts. Please try again later.',
        'http_code', 429
      )
    );
  end if;

  if public.validate_invite_code(coalesce(v_code, '')) is null then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'That membership code is not valid.',
        'http_code', 403
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

-- Only Supabase's own auth service may call this — never the app, an admin,
-- or a signed-in user. It runs with SECURITY DEFINER privileges, so leaving
-- it broadly callable would be a real hole.
grant execute on function public.before_user_created(jsonb) to supabase_auth_admin;
revoke execute on function public.before_user_created(jsonb) from authenticated, anon, public;

-- Fires after auth.users actually gets the new row — in the SAME
-- transaction, so this is genuinely atomic with account creation, not a
-- separate step that could half-apply. Re-validates the code (the hook
-- above already checked it, but re-checking here means a stale or replayed
-- request can't slip through if the hook is ever mis-registered — see the
-- PR description for how this fails closed even then) and, if it's still
-- good, consumes one use and provisions the account.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_code_id uuid;
begin
  v_code_id := public.validate_invite_code(
    coalesce(new.raw_user_meta_data ->> 'invite_code', '')
  );

  if v_code_id is null then
    raise exception 'invalid or expired invite code';
  end if;

  update public.invite_codes
     set use_count = use_count + 1
   where id = v_code_id
     and use_count < max_uses;

  if not found then
    raise exception 'invite code exhausted';
  end if;

  insert into public.invite_redemptions (code_id, user_id) values (v_code_id, new.id);
  insert into public.app_users (user_id) values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
