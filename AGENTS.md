# Agent guide

This repository's conventions, design system, and deployment flow are
documented in [`CLAUDE.md`](CLAUDE.md), with the full deploy/branching guide
in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

**Any coding agent working here — regardless of tool — should read those
first.** The one rule that matters most: never push directly to `main`; branch,
open a pull request, let CI and the Vercel preview run, then merge.
