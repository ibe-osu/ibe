# Workflow: how changes ship

This is the operating playbook of the IBE tech team. It is what the VP of
Tech does by habit, written down so the tech chair and any coding agent do
the same thing. `docs/DEPLOYMENT.md` is the short human version; this is the
full one.

## The loop

```
main ──branch──▶ work ──lint+build──▶ /simplify ──commit──▶ push ──▶ PR
                                                                  │
            production ◀── merge ◀── preview verified ◀── CI green ◀┘
```

1. **Start from fresh `main`.** `git checkout main && git pull --ff-only
   origin main && git checkout -b <short-description>`. Inside a worktree,
   `git checkout main` can succeed on a stale local main; always pull first.
   Claude Code sessions in the desktop app usually run in a worktree under
   `.claude/worktrees/`; that is fine, the branch still pushes normally.
2. **Work in small PRs.** One concern per PR. A content update, a component
   fix, and a migration are three PRs, not one.
3. **Before every push:** `npm run lint`, `npm run build`, then run the
   `/simplify` skill on the branch's diff and apply what it finds, then
   re-run lint and build. Mention in the PR what the simplifier changed, or
   that it found nothing.
4. **Commit messages**: imperative mood, say what and why, mirror the tone of
   recent commits (`git log --oneline -20`). Examples from this repo:
   "Drop the Week view from the members calendar", "Keep-alive: query a
   table instead of the REST root". **No AI attribution of any kind**: no
   `Co-Authored-By: Claude`, no "Generated with Claude Code" footer, no robot
   emoji. See "Attribution" below.
5. **Push and open the PR** with `gh pr create`, filling the PR template.
   Never push to `main`; branch protection blocks it and the rule applies
   to admins too.
6. **CI** (`verify`) must be green. Fix on the branch; do not merge around
   it.
7. **Preview**: Vercel comments a preview URL. Open it in a real browser at
   desktop and at 375px wide. Check the console for errors and CSP reports.
   For auth changes, run the real signup/login flow against staging from
   the preview. Previews are behind Vercel SSO, so only the VP of Tech can
   open them (the Hobby plan has one member). Everyone else verifies on
   `npm run dev` at the same widths, writes "preview not opened by me; VP
   to check" in the Verified section, and the VP opens the preview before
   merging.
8. **Review**: run `/code-review` on the PR before merging (the VP's agent
   setup refuses `gh pr merge` otherwise). For UI changes also run the design
   review checklist in `DESIGN_SYSTEM.md`.
9. **Merge** (squash is fine). The VP of Tech merges; contributors with
   write access can see the button but do not use it. Production deploys
   in one to two minutes. Open ibeosu.com and confirm.

## PR description

`.github/pull_request_template.md` is the template GitHub pre-fills and
`gh pr create` should use: Problem, Change, Before this shows live (only
when a human must act after merge), Verified. Verified names the widths
and flows you checked and what you could not.

## Attribution

Commits and PRs from this team carry no AI attribution. The university's AI
guidelines are still being finalized and professors have asked students not
to reference AI in commits. Claude Code appends a trailer by default; turn
it off once, globally, in `~/.claude/settings.json`:

```json
{
  "attribution": { "commit": "", "pr": "" }
}
```

The repo's checked-in `.claude/settings.json` sets the same thing at project
level as a backstop. If a trailer slips through, amend before pushing:
`git commit --amend` and delete the line.

## What a coding agent may do without asking

- Read anything in the repo. Run `npm run dev`, `lint`, `build`.
- Branch, commit, push a branch, open a PR, comment on a PR.
- Query and write **`ibe-staging`** database tables through the SQL editor
  (check the project name in the dashboard header first; both projects are
  visible). The Management API query endpoint works too, but only with an
  access token the VP issues.
- Open preview URLs and localhost in the built-in browser.

## What needs the VP of Tech (or is a dashboard action for a human)

- Merging a PR that has not been reviewed.
- Any write to `ibe-prod`: migrations, SQL, auth config, restore/unpause.
- Staging **auth configuration** (email templates, hooks, SMTP, URL config).
- Vercel settings: env vars, domains, DNS (nameservers are delegated to
  Vercel), deployment protection.
- GitHub settings: branch protection, collaborators, secrets.
- Deleting data, rotating keys, changing accounts in
  `docs/OFFICER_HANDOFF.md`.
- Making the repo private (it would break Vercel preview deploys for
  contributors on the Hobby plan).

## Tooling the VP uses, and the chair should too

| Tool | What for |
|---|---|
| Claude Code (desktop app, auto mode) in a worktree per task | Almost all code and docs work. |
| Built-in browser pane + `preview_start` (`.claude/launch.json` has `ibe-dev` on :3000 and `ibe-prod` on :3001) | Verifying changes without leaving the session. |
| iOS Simulator tool | Mobile walkthroughs; found most of the September 2026 polish list. |
| `/simplify` (or the `code-simplifier` plugin) | Pre-push cleanup, every time. |
| `/code-review` | Pre-merge bug hunt. |
| `impeccable` and `frontend-design` plugins | UI work. Both read `DESIGN.md` and `PRODUCT.md`. |
| `gsap-skills` plugin | Motion work. |
| `claude-security` plugin | Before touching auth, headers, or middleware. |
| `gh` CLI | PRs, checks, API. |
| Supabase CLI (`npx supabase`) | Migrations, linking, local stack. |
| `ibe-tech` plugin (this repo's `plugins/ibe-tech`) | Everything in this folder, as skills and agents. |

## Issue hygiene

The repo has issue templates (feature, enhancement, bug, docs bug, security
report). Open an issue for anything that will take more than one PR or that
needs a program decision (content, titles, dates). State the problem before
the proposed solution; votes do not decide, the program's goals do.

## Handoff discipline

`HANDOFF.md` at the root is the state note. Rewrite it at the end of a work
cycle: what shipped (PR numbers), what is blocked and on whom, live config
state, open decisions, gotchas learned. `docs/OFFICER_HANDOFF.md` is the
accounts-and-credential-locations register: pointers only, never secrets,
updated whenever a service is added. These two files are how the next
officer avoids reconstructing the project from GroupMe.
