# AI Workshop with Claude: sg-stack

One lab guide for a 3-hour workshop on AI-driven specs and implementation with the Claude Code CLI in the
VS Code terminal, on the **Event Listing Service** demo app from
[zenika-dev/sg-stack-workshop](https://github.com/zenika-dev/sg-stack-workshop).

| Section | Workspace (VS Code window) | Skills from [Wavez](https://wavez.org) | Time |
|---|---|---|---|
| 1. Get started: clone, run and explore the application | `02-application/event-listing-service` | - | 10 min |
| 2. Specs: event management (new feature) | `01-product-management` | Wavez download #1: Product Requirements, Dynamic Prototyping | 45 min |
| 3. Implementation: event management | `02-application/event-listing-service` | Wavez download #2: Backend (Node.js / Next.js), Frontend (TypeScript / Next.js), Code review, UAT with Playwright | 85 min |
| 4. Specs + Implementation: listing page and search (existing feature, optional) | `02-application/event-listing-service` | Spec written by Claude from the code, then the same flow as Section 3 | 45 min |

Participants need Node.js 24 or later (the repository uses `better-sqlite3` 12, see PR #3).

Section 2's prototype adds the feature to the current listing page, rebuilt from `01-product-management/current-app/` (screenshot, static HTML and stylesheet, see PR #4). If the application's look changes, refresh these files.

## Structure

```
ai-workshop-sg-stack/
├── ai-workshop-sg-stack-build.sh     # Builds the guide and the session package
├── instructions/                     # ai-workshop-sg-stack.adoc, build.sh, docinfo.html,
│                                     # images/ (incl. Wavez screenshots)
└── lab-files/
    └── event-management-prd.md       # Reference PRD: fallback if Section 2 is not finished
```

## Regenerating HTML

```bash
cd instructions && ./build.sh
```

## Building the lab instructions

```bash
./ai-workshop-sg-stack-build.sh
```

Output: `docs/lab-instructions.html`.

## Before a session

- Check that the repository has `01-product-management/data/events-export.csv` and the app in
  `02-application/event-listing-service`, and no `.claude`, `CLAUDE.md` or `docs/` folder yet.
- Keep `lab-files/event-management-prd.md` in line with the Section 2 prompts if they change.
