---
name: commit
description: Write a git commit message in the IBE repo's voice from the staged or changed files, and flag when a change should be split. Use when asked for a commit message, when about to commit in ibe-osu/ibe, or when a commit needs rewording.
---

# Commit message

## Gather

```bash
git status --short
git diff --cached --stat          # staged; if empty, use `git diff --stat` and untracked files
git log --oneline -20             # mirror this tone
```

If nothing is staged, say which files you would stage and ask, unless told
to commit everything.

## Write

- **Subject**: imperative, specific, under 72 characters, no trailing
  period, no `feat:`/`fix:` prefix. Say what changed in the product, not in
  the code: "Drop the Week view from the members calendar", not "Update
  MembersCalendar.tsx".
- **Body** (when the why is not obvious): one or two short paragraphs. What
  was wrong, what this does, anything a future reader needs (a dashboard
  step, a decision, the issue or PR link). Wrap at 72.
- **No AI attribution trailer** of any kind. The rule and the global
  setting that enforces it are in `docs/agent/WORKFLOW.md`, "Attribution".

## Split when

The diff mixes concerns that would be reverted separately: content plus a
refactor, a migration plus UI, docs plus code with different reasons.
Propose the split with the files and a subject for each.

## Output

The message in a fenced block ready for `git commit -F -`, then the exact
command. Do not run it unless asked.
