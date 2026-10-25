-- 0007_revoke_function_execute.sql
--
-- Postgres grants EXECUTE on every new function to PUBLIC, and Supabase's
-- default privileges add `anon` and `authenticated` on top. PostgREST
-- exposes every function in `public` that the caller can execute at
-- /rest/v1/rpc/<name>, so the internal helpers from 0001 and 0002 were
-- callable by anyone holding the publishable key. The concrete hole:
-- `rpc/check_rate_limit` with p_key = 'signup:<someone's IP>' fills that
-- bucket, and before_user_created() then refuses every signup from that IP
-- for the hour. `rpc/validate_invite_code` is a second, unthrottled way to
-- guess codes that skips the hook's per-IP limit.
--
-- Nothing legitimate calls those two as `anon` or `authenticated`:
-- before_user_created() and handle_new_user() call them from SECURITY
-- DEFINER bodies, where the check runs as the owner (`postgres`).
-- handle_new_user() returns `trigger`, so PostgREST can't call it, and
-- Postgres checks a trigger function's EXECUTE only at CREATE TRIGGER.
--
-- So: revoke everything in the schema, then grant back what is meant to be
-- called, the same shape as 0006 for tables. is_active_member() and
-- is_admin() stay callable because RLS policies run them as the querying
-- role and the keep-alive workflow calls rpc/is_active_member; they answer
-- only about the caller, so an anonymous call returns false.
-- issue_invite_code() keeps its 0004 grant and its is_admin() check.
-- before_user_created()'s grant to supabase_auth_admin is untouched.

revoke execute on all functions in schema public from public, anon, authenticated;

grant execute on function public.is_active_member() to anon, authenticated;
grant execute on function public.is_admin()         to anon, authenticated;
grant execute on function public.issue_invite_code(text, int, interval) to authenticated;

-- Future functions created by `postgres` (migrations and the SQL editor)
-- start with no caller grants. PUBLIC's default is global in Postgres, so
-- it can't be revoked `in schema`; Supabase's own functions belong to
-- other roles and keep their defaults.
alter default privileges for role postgres
  revoke execute on functions from public;
alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated;
