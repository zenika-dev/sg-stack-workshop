# Event Listing Service

A Next.js full-stack application (React, TypeScript, SQLite) that returns and displays
the public list of upcoming events, ordered by how prominently they should be shown.
It works. It has also been through three rewrites and two team handovers, and nobody
currently on the team wrote it.

This is the application workspace of the workshop (Sections 2 and 3). The code is
legacy on purpose: expect anti-patterns, and do not fix what the task does not ask for.

---

## Setting up

```bash
npm install
npx playwright install chromium   # browser for the acceptance tests (about 600 MB)
```

**Check it worked:**

```bash
npm test
```

You should see tests pass.

npm 11 may print `install scripts not yet covered by allowScripts` for
`better-sqlite3`, `esbuild` and `fsevents`. You can ignore it: if `npm test` passes,
the install worked.

---

## Looking at the output

To see the ranking without starting the web server:

```bash
npm run check
```

Thirteen rows, highest score first, starting with `Cloud Native Summit` at 77.
Those scores are as-of `SEED_NOW` (09:00 on the day the seed was created), not your
machine's clock — passing `now=SEED_NOW` is what makes the output match, whatever the
date.

---

## Running the service

```bash
npm run dev
```

Then open `http://localhost:3000` to use the web interface, or:

```bash
curl -s "localhost:3000/events?limit=3"
curl -s "localhost:3000/events/summary"
```

Endpoints: `GET /events` (or `/api/events`), `GET /events/summary`, `GET /events/export`,
`GET /healthz`.

The page ranks events against the **current time**, and the sample events are dated
relative to 09:00 on the day the seed was created: some have already started, some
start today, others in the coming days or weeks, and some are under embargo. As the
day goes on, the page drifts from `npm run check` (an event starting at 09:00 today
shows as running from 09:00).

---

## The database

The application stores its events in `events.sqlite3` (set `EVENTS_DB` to use another
file). It is created from the seed on first use, and keeps the dates it was created
with. Reset it at the start of each day you work on it, and to put the seed data back
at any time, for example after acceptance tests changed it:

```bash
npm run db:reset
```

To seed a fixed day instead of today, set `SEED_DATE` (for example, the original
sample data was dated around 2 March 2026):

```bash
SEED_DATE=2026-03-02 npm run db:reset
```

`npm test` uses its own database (`events.test.sqlite3`), so it does not change the
events you see in the browser.

---

## The files

- `SPEC.md` — the product spec for how listing order is meant to work.
- `lib/events.ts` — where the ordering and prominence scores are computed.
- `lib/db.ts` — SQLite schema and the seed (dated relative to today, or `SEED_DATE`).
- `components/` — React UI components (`Header.tsx`, `FilterBar.tsx`, `EventList.tsx`, `EventCard.tsx`).
- `hooks/useEvents.ts` — React hook managing data fetching and filter state.
- `app/page.tsx` — Next.js page assembling the full application.
- `app/api/` — the Next.js API route handlers.
- `scripts/` — `check.ts` (ranking printout) and `reset-db.ts` (restore the seed data).
- `tests/` — backend and frontend smoke tests.
