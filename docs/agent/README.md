# Agent docs for ibeosu.com

These documents are written for a coding agent (Claude Code, Cursor, Codex,
anything) and for the human driving it. They are the long-form reference
behind the short rules in [`CLAUDE.md`](../../CLAUDE.md). Read the one that
matches the task; do not read all of them for a one-line change.

| Doc | Read it when |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | You need to know where something lives, how a page is assembled, how rendering, env, headers, middleware, and CI fit together. |
| [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) | You are touching anything visual: a section, a component, spacing, color, type, motion, images. |
| [`DATABASE.md`](DATABASE.md) | You are touching Supabase: schema, auth, invite codes, RLS, migrations, the two projects, dashboard config. |
| [`SEO.md`](SEO.md) | You are adding or changing a route, metadata, structured data, sitemap, robots, or anything a crawler sees. |
| [`WORKFLOW.md`](WORKFLOW.md) | You are about to branch, commit, push, open a PR, review, merge, or decide what is safe to do without the VP of Tech. |

Companion files at the repo root:

- [`CLAUDE.md`](../../CLAUDE.md) is the short, always-loaded rule set. Keep it short.
- [`PRODUCT.md`](../../PRODUCT.md) is the brand brief: audiences, voice, anti-references, design principles.
- [`DESIGN.md`](../../DESIGN.md) is the machine-readable token sheet (colors, type, spacing) that design tools such as the `impeccable` plugin read.
- [`HANDOFF.md`](../../HANDOFF.md) is the running state-of-the-project note. It changes every cycle; the docs in this folder change only when the system changes.

Operational runbooks live one level up in [`docs/`](../): deployment, member onboarding, officer handoff, and the Phase 2 schema notes.

## How to keep these honest

- Every claim here should be checkable against a file. When a doc names a file, it names the real path. If a refactor moves something, update the doc in the same PR.
- Record decisions and their reasons, not just facts. "Square corners" is a fact. "Square corners because the collegiate voice is the brand" is the thing a future agent needs so it does not re-decide it.
- Do not paste secrets. Publishable Supabase keys are public by design and appear in CI config; the secret key never appears anywhere in this repo.
