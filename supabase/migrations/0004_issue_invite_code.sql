-- 0004_issue_invite_code.sql
--
-- Until the admin UI (PR 4) ships, every membership code is hand-written
-- SQL: pick a prefix, pick a secret, remember to bcrypt it, remember that
-- lowercase is unredeemable (the signup form uppercases input). This
-- function does all of that in one call and hands back the one string an
-- officer needs to paste into GroupMe:
--
--   select public.issue_invite_code('eboard 2026-27', 12, interval '14 days');
--   -- IBE-K7MXQ2H4-N3P8RW5TVY6Z
--
-- The plaintext is returned exactly once; only the bcrypt hash is stored,
-- same as before. The alphabet drops 0/O and 1/I so a code read aloud or
-- retyped from a screenshot can't be mistaken. Twelve characters from a
-- 32-letter alphabet is 60 bits of secret behind an 8-character prefix, on
-- top of the per-IP rate limit in before_user_created().
--
-- Who may call it: an active admin (public.is_admin(), i.e. through the
-- app once the admin UI exists) or whoever is at the dashboard's SQL
-- editor, which runs as the `postgres` login role. session_user, not
-- current_user, because SECURITY DEFINER rewrites current_user to the
-- function owner for everyone.

create or replace function public.issue_invite_code(
  p_label     text,
  p_max_uses  int      default 1,
  p_valid_for interval default interval '14 days'
)
returns text
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  v_alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_bytes  bytea;
  v_prefix text;
  v_secret text;
  i        int;
begin
  if not (session_user = 'postgres' or public.is_admin()) then
    raise exception 'only admins can issue invite codes' using errcode = '42501';
  end if;

  if p_label is null or length(trim(p_label)) = 0 then
    raise exception 'label is required (who or what is this code for?)';
  end if;

  if p_max_uses is null or p_max_uses < 1 then
    raise exception 'max_uses must be at least 1';
  end if;

  loop
    -- 20 random bytes -> 8 prefix + 12 secret characters. The alphabet has
    -- exactly 32 letters, so `byte % 32` is uniform, not biased.
    v_bytes  := gen_random_bytes(20);
    v_prefix := '';
    v_secret := '';

    for i in 0..7 loop
      v_prefix := v_prefix || substr(v_alphabet, (get_byte(v_bytes, i) % 32) + 1, 1);
    end loop;

    for i in 8..19 loop
      v_secret := v_secret || substr(v_alphabet, (get_byte(v_bytes, i) % 32) + 1, 1);
    end loop;

    -- prefix is UNIQUE; a collision at 8 chars is ~1 in 10^12 but retrying
    -- is free, so never let it surface as an insert error.
    exit when not exists (select 1 from public.invite_codes where prefix = v_prefix);
  end loop;

  insert into public.invite_codes
    (prefix, secret_hash, label, max_uses, expires_at, created_by)
  values
    (v_prefix, crypt(v_secret, gen_salt('bf')), trim(p_label), p_max_uses,
     now() + p_valid_for, (select auth.uid()));

  return 'IBE-' || v_prefix || '-' || v_secret;
end;
$$;

-- Same shape as before_user_created(): nothing anonymous may even attempt
-- it. Signed-in callers still hit the is_admin() check inside.
revoke execute on function public.issue_invite_code(text, int, interval) from public, anon;
grant  execute on function public.issue_invite_code(text, int, interval) to authenticated;
