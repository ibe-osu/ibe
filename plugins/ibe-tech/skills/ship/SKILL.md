---
name: ship
description: Ship a change to ibeosu.com the IBE way - from a working branch to an opened, verified pull request. Use when work is done and ready to push, when asked to open a PR, push, or get something deployed, and whenever a push is about to happen in the ibe-osu/ibe repo. Runs lint and build, the simplifier, the house commit and PR style, and the preview check.
---

# Ship

Everything ends in a PR with green CI and a verified preview. The reasons
behind each step are in `docs/agent/WORKFLOW.md`.

1. **Branch.** `git branch --show-current` must not be `main`. If it is:
   `git pull --ff-only origin main && git checkout -b <short-description>`.
2. **Checks.** `npm run lint` and `npm run build`. Fix everything you
   introduced; do not suppress rules.
3. **Simplify.** Run `/simplify` on the branch diff, apply what is real,
   re-run lint and build. Note the outcome for the PR body.
4. **Read your own diff** (`git diff main...HEAD`). Remove debug output,
   stray files, unrelated changes. Two concerns means two PRs.
5. **Commit** per the `commit` skill. If `git log -1` shows an AI
   attribution trailer, amend it out and fix the setting (see
   `docs/agent/WORKFLOW.md`, "Attribution").
6. **Push and open the PR.**
   ```bash
   git push -u origin $(git branch --show-current)
   gh pr create --title "<subject>" --body "$(sed -e 's/<!--.*-->//' .github/pull_request_template.md)"
   ```
   Fill Problem, Change, and Verified. Keep "Before this shows live" only
   when a human must act after merge; otherwise delete that heading. The
   body must not mention AI tooling.
7. **Watch CI.** `gh pr checks --watch`. The required check is `verify`.
   Red means fix on the branch, never merge around it.
8. **Verify the preview.** Vercel comments a preview URL on the PR.
   Previews are behind Vercel SSO and only the VP of Tech can open them.
   If you can: open it at desktop width and at 375px, check the console
   for errors and Content-Security-Policy report-only violations (CSP is
   described in `docs/agent/ARCHITECTURE.md`), run the real form against
   `ibe-staging` for auth changes, check metadata per `docs/agent/SEO.md`
   for content changes. If you cannot: do the same checks on
   `npm run dev` and write "preview not opened by me; VP to check" in
   Verified. Either way, Verified says what you checked and what you could
   not.
9. **Report back** with the PR URL, CI status, preview URL, and the
   verification summary. **Do not merge.** The VP of Tech merges after
   `/code-review` and a look at the preview; GitHub shows the button to
   anyone with write access, so leave it alone. Never enable auto-merge.

## Hard stops

The "needs the VP of Tech" list in `docs/agent/WORKFLOW.md` applies in
full. Ship-specific: a migration in the diff must have been applied to
`ibe-staging` and exercised through the real signup form before the PR is
marked ready.
