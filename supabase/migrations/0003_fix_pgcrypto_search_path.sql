-- 0003_fix_pgcrypto_search_path.sql
--
-- Bug found during live testing: validate_invite_code()'s pinned
-- search_path (public, pg_temp) doesn't include the schema Supabase
-- actually installs pgcrypto into. `create extension if not exists
-- pgcrypto;` in migration 0001, with no explicit SCHEMA clause, put it in
-- `extensions` (confirmed by querying pg_proc/pg_namespace on ibe-staging)
-- — Supabase's convention, not `public`. So crypt()/gen_salt() were
-- invisible to this SECURITY DEFINER function, which failed with
-- "function crypt(text, text) does not exist" on every call.
--
-- Only validate_invite_code() needs the fix: before_user_created() and
-- handle_new_user() call it as public.validate_invite_code(...) (schema-
-- qualified), and the crypt() call happens inside validate_invite_code's
-- own execution context under its own search_path — the caller's
-- search_path is irrelevant to it.

create or replace function public.validate_invite_code(p_code text)
returns uuid
language plpgsql
stable
security definer
set search_path = public, extensions, pg_temp
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
