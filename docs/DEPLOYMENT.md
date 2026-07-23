# Deployment & Branching

This project deploys automatically through **Vercel + GitHub**. Nobody runs
manual deploy commands, and there is no separate "push to prod" step.

## The short version

| Action | What happens |
| --- | --- |
| Merge a Pull Request into `main` | Deploys to **production** → <https://ibeosu.com> |
| Open or update a Pull Request | Deploys a **preview** → Vercel posts a unique URL on the PR |
| Push any other branch | Gets its own throwaway preview deployment |

`main` is the single source of truth for what is live.

## Making a change (humans and coding agents both follow this)

1. **Branch** off the latest `main`:
   ```bash
   git checkout main && git pull
   git checkout -b short-description-of-change
   ```
2. **Check it locally** before pushing:
   ```bash
   npm install
   npm run dev      # verify at http://localhost:3000
   npm run lint
   npm run build
   ```
3. **Open a Pull Request:**
   ```bash
   git push -u origin short-description-of-change
   gh pr create --fill        # or open it in the GitHub UI
   ```
4. **Wait for the two checks on the PR:**
   - **CI / verify** (GitHub Actions) runs lint + build — must be green.
   - **Vercel** comments a **Preview URL** — open it and confirm the change
     looks and works right on the real deployment, on desktop *and* mobile.
5. **Merge** the PR. Production deploys in ~1–2 minutes; then confirm
   <https://ibeosu.com>.

## Rules that keep production safe

- **Never push directly to `main`.** Branch protection requires a pull
  request plus a passing CI check, applied to everyone (including admins).
  This is intentional: broken code can't reach ibeosu.com, and every change is
  preview-tested first.
- If CI is red, fix it on the branch — don't try to merge around it.
- **Emergency bypass** (rare): a repo admin can loosen the rule in
  **GitHub → repo → Settings → Branches → `main` → Edit**, merge the fix, then
  turn it back on immediately. Prefer fixing CI over bypassing it.

## For coding agents specifically

If you are an AI coding agent working in this repo:

- Follow the branch → PR → preview → merge flow above. Do **not** push to
  `main` or disable branch protection, even if your credentials allow it.
- After opening a PR, report the **CI status** and the **Vercel preview URL**
  to the human, and state that you visually verified the change.
- Follow the design system and conventions in [`../CLAUDE.md`](../CLAUDE.md)
  and [`../PRODUCT.md`](../PRODUCT.md).

## Continuous Integration

`.github/workflows/ci.yml` defines a single `verify` job that runs on every PR
into `main` (and on `main` after merges): it installs dependencies with
`npm ci`, then runs `npm run lint` and `npm run build` (which also
type-checks). Branch protection requires this job to pass before merging.

## Vercel project settings (one-time reference)

Managed in the Vercel dashboard under **Project → Settings**:

- **Git → Production Branch** = `main`.
- **Preview Deployments** = enabled for all branches and PRs (this is the
  Vercel default).
- The **GitHub integration** posts the preview URL and deploy status on each
  PR automatically.

The legacy `prod` and `staging` branches are **not** used for deployment. They
are stale leftovers and can be ignored or deleted; deleting them will not
affect the live site.
