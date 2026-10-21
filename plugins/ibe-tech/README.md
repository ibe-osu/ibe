# ibe-tech

The IBE tech team's Claude Code plugin. It packages how the VP of Tech works
on ibeosu.com so a new officer's agent behaves the same way from day one:
knows the codebase, respects the design system, ships through the PR flow,
writes clean commits with no AI attribution, and knows what not to touch.

## Install

Inside Claude Code, from any directory:

```
/plugin marketplace add ibe-osu/ibe
/plugin install ibe-tech@ibe-skills
```

Opening the `ibe-osu/ibe` repo in Claude Code also prompts to install it,
because the repo's checked-in `.claude/settings.json` lists the marketplace
and enables the plugin. After we push a change, pull it with:

```
/plugin marketplace update ibe-skills
```

## Skills

Invoke as `/ibe-tech:<name>`. Most also trigger on their own when the task
matches the description.

| Skill | Use it when |
|---|---|
| `codebase` | You or your agent need to know how ibeosu.com works, where something lives, or why it is built the way it is. The agent-facing map of the repo. |
| `design` | Any visual change. Loads the design system and runs the review checklist so nothing off-palette, rounded, or over-animated ships. |
| `ship` | You are ready to push. Lint, build, simplify, commit, push, open the PR with the house template, verify the preview. |
| `commit` | You want a commit message in the repo's voice: imperative, what and why, no AI trailer. |
| `seo` | Adding or changing a route, metadata, sitemap, robots, or structured data. |
| `db` | Anything Supabase: schema, migrations, invite codes, auth config, which project is safe to touch. |
| `onboard` | Day one. Sets up a machine, the env, the plugins, the attribution setting, and runs the first-week checklist. |
| `review` | Reviewing a PR or a plan the way the tech team does: design, SEO, security, workflow, and a newcomer's read. |

## Agents

Subagents the skills dispatch, also usable directly (`@codebase-guide` in
the agent picker, or "use the onboarding-reviewer agent to ..."):

| Agent | What it does |
|---|---|
| `codebase-guide` | Read-only explainer. Answers "how does X work" with file and line evidence, drawing on `docs/agent/`. |
| `design-reviewer` | Reviews a diff against `DESIGN.md` and `docs/agent/DESIGN_SYSTEM.md`, returns an ordered fix list. |
| `onboarding-reviewer` | Plays the new tech chair reading a doc, plan, or PR for the first time, and reports every place it would get stuck. |

## Where the knowledge lives

The skills are thin on purpose. The substance is in the repo, next to the
code, indexed by `docs/agent/README.md`.

## Changing the plugin

Edit the `SKILL.md` or agent file under `plugins/ibe-tech/`, then bump
`version` in both `.claude-plugin/marketplace.json` (repo root) and
`plugins/ibe-tech/.claude-plugin/plugin.json`. Consumers only pull a new
version. Ship it through the normal PR flow.
