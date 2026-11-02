# AI Workshop with Claude: sg-stack

One lab guide for a 3-hour workshop on AI-driven specs and implementation with Claude Code in
VS Code, on the **Event Listing Service** demo app from
[zenika-dev/sg-stack-workshop](https://github.com/zenika-dev/sg-stack-workshop).

| Section | Workspace (VS Code window) | Skills from [Wavez](https://wavez.org) | Time |
|---|---|---|---|
| 1. Specs: event management (new feature) | `01-product-management` | Wavez download #1: Product Requirements, Dynamic Prototyping | 45 min |
| 2. Implementation: event management | `02-application/event-listing-service` | Wavez download #2: Backend (Node.js / Next.js), Frontend (TypeScript / Next.js), Code review, UAT with Playwright | 85 min |
| 3. Specs + Implementation: listing page and search (existing feature, optional) | `02-application/event-listing-service` | Spec written by Claude from the code, then the same flow as Section 2 | 45 min |

Participants need Node.js 24 or later (the repository uses `better-sqlite3` 12, see PR #3).

Section 1's prototype adds the feature to the current listing page, rebuilt from `01-product-management/current-app/` (screenshot, static HTML and stylesheet, see PR #4). If the application's look changes, refresh these files.

## Structure

```
ai-workshop-sg-stack/
├── ai-workshop-sg-stack-build.sh     # Builds the guide and the session package
├── instructions/                     # ai-workshop-sg-stack.adoc, build.sh, docinfo.html,
│                                     # vscode-getting-started.html, images/ (incl. Wavez screenshots)
└── lab-files/
    └── event-management-prd.md       # Reference PRD: fallback if Section 1 is not finished
```

## Regenerating HTML

```bash
cd instructions && ./build.sh
```

## Building a session package

```bash
./ai-workshop-sg-stack/ai-workshop-sg-stack-build.sh 20261105-govtech
```

Output is created in `../ai-workshop-sg-stack-<suffix>/`: the guide, `vscode-getting-started.html`,
`lab-files/` and the slides PDF if found in `~/Downloads`.

## Before a session

- Check that the repository has `01-product-management/data/events-export.csv` and the app in
  `02-application/event-listing-service`, and no `.claude`, `CLAUDE.md` or `docs/` folder yet.
- Keep `lab-files/event-management-prd.md` in line with the Section 1 prompts if they change.
