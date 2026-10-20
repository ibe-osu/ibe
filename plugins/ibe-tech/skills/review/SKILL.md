---
name: review
description: Review a pull request, diff, plan, or doc for ibeosu.com the way the IBE tech team does - correctness first, then design system, SEO, database, security, and workflow checks, then a newcomer's read. Use when asked to review, check, critique, or approve a change or document in ibe-osu/ibe, or before any merge.
---

# Review

Two layers: the bug hunt, then the house checks. Report findings ordered by
severity, each with file and line, what breaks, and the fix. Nothing
survives without a concrete failure or a named rule.

## 1. Correctness

Run the built-in `/code-review` on the target (PR number, branch, or the
working tree). Its findings come first. If it is unavailable, read the
diff against the gotchas in `docs/agent/ARCHITECTURE.md` ("Rendering and
hydration rules") and `docs/agent/DATABASE.md` ("Gotchas").

## 2. House checks (dispatch in parallel where the diff warrants)

- **Design** (`src/components`, `src/theme`, `globals.css`, `public`
  imagery): dispatch the `design-reviewer` agent on the diff.
- **SEO** (`src/app` routes or metadata): the audit list in
  `docs/agent/SEO.md`.
- **Database** (`supabase/`, `src/lib/auth`, `src/lib/supabase`): the
  rules in the `db` skill; migration numbered, applied to staging, prod
  steps written for the VP.
- **Security** (headers, CSP, middleware, forms, auth): the
  `claude-security` plugin's review when installed, else the security
  sections of `docs/agent/ARCHITECTURE.md`.
- **Workflow**: branch is not `main`; one concern per PR; PR body follows
  `.github/pull_request_template.md` with a Verified section that names
  widths and flows checked; no AI attribution; migrations and env steps
  under "Before this shows live"; docs updated when the system changed.

## 3. Newcomer's read (docs, plans, and anything under `docs/` or `plugins/`)

Dispatch the `onboarding-reviewer` agent. It reads as the new tech chair
and returns every place it would get stuck. Fix those or say why not.

## Report

```
## Must fix (blocks merge)
1. path:line - what breaks - fix

## Should fix
...

## Notes
...

## Verified
- what was run / opened / clicked
```

Approve only when Must-fix is empty and Verified is not. The merge is the
VP of Tech's call.
