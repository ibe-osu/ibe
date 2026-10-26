-- 0008_alumni_email.sql
--
-- Personal email for each alum, readable by any active member. 0005 left
-- contact details out on purpose; the VP of Tech decided on 2026-10-26 that
-- members should be able to email alumni. Phone numbers stay out.
--
-- A column on alumni rather than its own table: members read it under the
-- same alumni_member_read policy as everything else, and the admin-only
-- write policies already cover it. The directory page doesn't send it with
-- the list; a profile asks for it when opened (src/app/members/
-- alumni-database/actions.ts), so one page load doesn't hand over every
-- address at once.
--
-- The seed fills it from the verified CSV and leaves it null for addresses
-- that bounced.

alter table public.alumni
  add column email text check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
