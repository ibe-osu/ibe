# Agent guide

This repository's conventions, design system, and deployment flow are
documented in [`CLAUDE.md`](CLAUDE.md), with the full deploy/branching guide
in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

**Any coding agent working here — regardless of tool — should read those
first.** The one rule that matters most: never push directly to `main`; branch,
open a pull request, let CI and the Vercel preview run, then merge.

For depth, read the agent-facing references in [`docs/agent/`](docs/agent/):
architecture, design system, database and auth, SEO, and the ship workflow.
The design tokens are in [`DESIGN.md`](DESIGN.md); the brand brief is in
[`PRODUCT.md`](PRODUCT.md); the current project state is in
[`HANDOFF.md`](HANDOFF.md).

Claude Code users: the repo ships the `ibe-tech` plugin
([`plugins/ibe-tech/README.md`](plugins/ibe-tech/README.md)).
