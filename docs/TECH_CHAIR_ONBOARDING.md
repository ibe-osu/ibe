# Onboarding the IBE Tech Chair

The checklist for bringing a new tech officer onto ibeosu.com so they can
work the way the VP of Tech works: same codebase knowledge, same Claude
Code setup, same ship flow, same guardrails. Two halves: what the VP does,
and what the chair does. Replace `<GITHUB_USERNAME>` and `<OSU_EMAIL>` once
known.

**Who is who.** The VP of Tech is Yuvi Atre (GitHub `yuvi-atre`, email
`atre.7@osu.edu`); message them for anything in Part 5. "E-board" is the
program's student executive board, the first users of `/members`. GroupMe
is where the e-board talks and where membership codes get posted; the chair
does not need it for code. The "classifier" mentioned in `HANDOFF.md` is
the permission checker in the VP's Claude Code setup, not something the
chair configures.

**Timing.** Everything below assumes the branch that added `docs/agent/`,
`DESIGN.md`, `plugins/ibe-tech/`, and this file has been merged to `main`.
Send her this only after that PR lands; a fresh clone before then has none
of it and the marketplace add finds nothing.

## Part 1: what the VP of Tech does (about 20 minutes)

### GitHub

The repo lives in the `ibe-osu` organization and is public. Direct pushes to
`main` are blocked for everyone by branch protection (`verify` check
required), so write access is safe to give.

1. Invite her to the organization:
   ```bash
   gh api -X POST orgs/ibe-osu/invitations -F invitee_id="$(gh api users/<GITHUB_USERNAME> --jq .id)" -f role=direct_member
   ```
   Or in the browser: github.com/orgs/ibe-osu/people → Invite member.
2. Give the repo write access (org membership alone does not grant it):
   ```bash
   gh api -X PUT repos/ibe-osu/ibe/collaborators/<GITHUB_USERNAME> -f permission=push
   ```
3. Confirm after she accepts:
   ```bash
   gh api repos/ibe-osu/ibe/collaborators/<GITHUB_USERNAME>/permission --jq .permission
   ```
   Expect `write`. Admin stays with the VP (settings, branch protection,
   secrets).
4. Do **not** make the repo private. Vercel's Hobby plan only builds
   commits from non-owner GitHub accounts on public repos. Private would
   silently stop her PR previews and production deploys.

### Supabase

The Free plan allows organization members. Roles available: Owner,
Administrator, Developer. There is no read-only role and no per-project
scoping on Free, so she will see both `ibe-staging` and `ibe-prod`.

1. Supabase dashboard → the IBE organization → Team → Invite. Email:
   `<OSU_EMAIL>` (or whichever address she will log in with). Role:
   **Developer**. The invite link expires in 24 hours; tell her to accept
   the same day.
2. Tell her in words, because permissions cannot enforce it: **staging is
   hers, prod is yours.** Any prod change goes through you, after a staging
   rehearsal.
3. Share the `ibe-staging` project URL and publishable key for her
   `.env.local` (dashboard → Project Settings → API Keys). These are public
   values and also sit in `.github/workflows/ci.yml`; the secret key is
   never shared and never used by the app.
4. If she will run migrations from the CLI (`npx supabase db push`), she
   needs the `ibe-staging` **database password** (dashboard → Project
   Settings → Database; reset it there if nobody knows it). Store it in a
   password manager, not in chat, and record where in
   `docs/OFFICER_HANDOFF.md`. Without it she can still apply migrations by
   pasting the SQL into the staging SQL editor.

### Vercel

Nothing. The Hobby plan has one member and cannot add more. Her PRs get
preview URLs and her merged commits deploy because the repo is public.
Two consequences to tell her:

- Preview URLs are behind Vercel SSO, so she cannot open them. She verifies
  on localhost (and the iOS simulator if she has Xcode); you open the
  preview before merging.
- Env vars, domains, and DNS stay with you.

### Everything else

- Add her name, GitHub handle, and role to `docs/OFFICER_HANDOFF.md`.
- Point her at `HANDOFF.md` for current blockers and at this file.
- Decide and tell her which open items are hers first (suggestions in Part
  3).
- Optional: a 30-minute screen share where you run one small change end to
  end with the `ship` skill so she sees the rhythm.

## Part 2: what the chair does (about 90 minutes, mostly reading)

The `onboard` skill walks through this interactively once the plugin is
installed. The manual version:

### Tools

- Node 20+ (CI uses 20), git, npm, the GitHub CLI (`gh auth login`).
- Claude Code (desktop app recommended; it has the built-in browser pane
  and iOS simulator tools the VP uses for verification).
- Optional: Docker Desktop for the local Supabase stack, Xcode for mobile
  walkthroughs.

### Repo

```bash
git clone https://github.com/ibe-osu/ibe.git && cd ibe
npm install
cp .env.example .env.local     # ibe-staging URL + publishable key; same values as the env block in .github/workflows/ci.yml
npm run dev                    # http://localhost:3000
npm run lint && npm run build  # both must pass before any PR
```

### Claude Code

1. Open the repo folder in Claude Code. The checked-in `.claude/settings.json`
   lists the `ibe-skills` marketplace and the plugins the team uses, so it
   prompts to install them. Accept. If it does not prompt:
   ```
   /plugin marketplace add ibe-osu/ibe
   /plugin install ibe-tech@ibe-skills
   /plugin install frontend-design@claude-plugins-official
   /plugin install code-simplifier@claude-plugins-official
   /plugin install claude-security@claude-plugins-official
   /plugin marketplace add pbakaus/impeccable
   /plugin install impeccable@impeccable
   /plugin marketplace add greensock/gsap-skills
   /plugin install gsap-skills@gsap-skills
   ```
2. Turn off AI attribution for every project, not just this one. Merge
   this key into `~/.claude/settings.json` (create the file with just this
   object if it does not exist; if it does, add the key without removing
   what is there):
   ```json
   { "attribution": { "commit": "", "pr": "" } }
   ```
   and in `~/.claude/CLAUDE.md` (create it if needed) write the rule in
   words: no `Co-Authored-By: Claude`, no "Generated with Claude Code"
   footers, in commits or PR descriptions. The repo's own
   `.claude/settings.json` repeats the setting as a backstop.
3. Check `/plugin` lists `ibe-tech` and its skills.

### Read, in order

1. `CLAUDE.md`, `AGENTS.md`
2. `docs/DEPLOYMENT.md`
3. `HANDOFF.md`
4. `PRODUCT.md`, `DESIGN.md`
5. `docs/agent/ARCHITECTURE.md`, then skim the other four in `docs/agent/`
6. `docs/MEMBER_ONBOARDING.md` and `docs/OFFICER_HANDOFF.md`

Then ask the agent (it will use the `codebase` skill): "walk me from
/signup to /members" and "how does a page get its hero". Answers should
cite files and lines.

### First PR

Pick one small item (Part 4), run it with `/ibe-tech:ship`, verify on
localhost at desktop and 375px (you cannot open Vercel previews; say so in
the PR's Verified section and the VP opens it), ask the VP to review and
merge, watch it land on ibeosu.com. Do not click Merge yourself even though
GitHub offers the button.

## Part 3: the skills and what each is for

The `ibe-tech` plugin's skills (`/ibe-tech:<name>`) and agents are
described in [`plugins/ibe-tech/README.md`](../plugins/ibe-tech/README.md).
In one line each: `codebase` explains the repo, `design` guards the design
system, `ship` takes a branch to a verified PR, `commit` writes the
message, `seo` handles routes and metadata, `db` handles Supabase safely,
`onboard` runs this document interactively, `review` reviews the way the
team does. The agents are a read-only explainer, a design reviewer, and
the newcomer-persona reviewer; run the last one on anything you write for
the next officer.

Plugins from outside this repo that the team uses with them:

| Plugin | Why |
|---|---|
| `frontend-design` (official) | UI craft; reads `DESIGN.md` and `PRODUCT.md`. |
| `impeccable` (pbakaus/impeccable) | Design critique, polish, audits; the VP's most-used UI tool. Reads `DESIGN.md`. |
| `gsap-skills` (greensock/gsap-skills) | Motion work with GSAP, ScrollTrigger, React. |
| `code-simplifier` (official) | The pre-push cleanup pass. The built-in `/simplify` does the same job. |
| `claude-security` (official) | Before touching auth, headers, middleware, forms. |
| Built-in `/code-review` | Pre-merge bug hunt. The VP's setup refuses to merge without it. |

## Part 4: suggested first tasks

From `HANDOFF.md`, smallest first. Each is one PR.

1. Replace the `#f9f6f6` literals in three components with a theme token
   (`docs/agent/DESIGN_SYSTEM.md`, "Known drift").
2. Wrap card and logo hover colors in `@media (hover: hover)` so tapped
   cards do not stay highlighted on phones.
3. Mobile drawer alignment: logo and close button 8px lower than the
   header's; highlight the current page; style Sign Out as a button.
4. Recruitment deadline: once the program gives the 2027 date, update
   `AdmissionOverview.tsx` and `ApplicationTimeline.tsx`.
5. Align Kristina Kennedy's title between `/about` and `/recruitment`
   (needs the program's answer; ask the VP, who asks Kristina Kennedy or the
   Student VP of Recruitment).
6. Carousel polish: half-blank frame on autoplay wrap; dot contrast.

Bigger, after the first few: the canonical host decision (code side), the
CSP enforcement PR (after walking previews clean), the admin UI for invite
codes (needs an Edge Function), and Phase 2 alumni directory.

## Part 5: the lines she does not cross without asking

The "What needs the VP of Tech" list in
[`docs/agent/WORKFLOW.md`](agent/WORKFLOW.md), in full. The short form is
in `CLAUDE.md`, which her agent loads on every turn: no prod or auth-config
writes, no Vercel / DNS / GitHub settings / credentials, no unreviewed
merges, no making the repo private, no secrets in the repo.

**Merging is the one line nothing technical enforces.** Write access
gives her the Merge button on GitHub and lets `gh pr merge` run; branch
protection only requires CI, not an approval. The rule is the guard: she
opens the PR, says what she verified, and the VP reviews and merges.
