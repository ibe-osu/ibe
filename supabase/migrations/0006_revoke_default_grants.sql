-- 0006_revoke_default_grants.sql
--
-- Supabase's default privileges give `anon` ALL on every new table in
-- `public`, and `authenticated` TRUNCATE, REFERENCES and TRIGGER on top of
-- the CRUD verbs. TRUNCATE ignores RLS. PostgREST can't issue it, so this is
-- defense in depth, not an open hole; 0005 closed it for the alumni tables
-- only, and this closes it schema-wide.
--
-- Signed-out visitors never need a table: signup runs through the Auth Hook
-- and the handle_new_user() trigger, both SECURITY DEFINER. Signed-in users
-- keep SELECT/INSERT/UPDATE/DELETE, which RLS filters row by row.
--
-- Tables only. The same defaults still grant EXECUTE on new functions and
-- usage on new sequences; anon calling is_active_member() is what the
-- keep-alive workflow relies on now that it can't read app_users.

-- Future tables created by `postgres` (migrations and the SQL editor).
alter default privileges for role postgres in schema public
  revoke all on tables from anon;
alter default privileges for role postgres in schema public
  revoke truncate, references, trigger on tables from authenticated;

-- Existing tables. Where 0005 has run, its alumni revokes repeat as no-ops.
revoke all on all tables in schema public from anon;
revoke truncate, references, trigger on all tables in schema public from authenticated;
