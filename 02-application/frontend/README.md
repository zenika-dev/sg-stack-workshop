# Event Listing Service

A Next.js full-stack application (React, TypeScript, SQLite) that returns and displays
the public list of upcoming events, ordered by how prominently they should be shown.
It works. It has also been through three rewrites and two team handovers, and nobody
currently on the team wrote it.

**There is no task here and nothing to submit.** You're getting this ahead of
your interview so you aren't reading it cold on the call. Look through it if
that's useful to you, or don't — either is fine, and you'll get time at the
start of the session either way.

You are welcome to check it runs before the call. That's not homework, and
there's nothing to send us — it just means we spend the session on the code
rather than on `npm`.

---

## Setting up

```bash
npm install
```

**Check it worked:**

```bash
npm test
```

You should see tests pass. That's everything you need for the session.

---

## Looking at the output

To see the ranking without starting the web server:

```bash
npm run check
```

Thirteen rows, highest score first, starting with `Cloud Native Summit` at 77.
Those scores are as-of `SEED_NOW` (2 March 2026, 09:00), not your machine's
clock — passing `now=SEED_NOW` is what makes the output match.

The database is deleted and rebuilt from a fixed seed every time, so nothing you
do persists and you cannot break it. Set `EVENTS_DB=/tmp/events.sqlite3` if
you'd rather it didn't write into the project folder.

---

## Running the service

To poke at HTTP or view the React frontend interface:

```bash
npm run dev
```

Then open `http://localhost:3000` to interact with the web interface, or:

```bash
curl -s "localhost:3000/events?limit=3"
curl -s "localhost:3000/events/summary"
```

Endpoints: `GET /events` (or `/api/events`), `GET /events/summary`, `GET /events/export`,
`GET /healthz`.

---

## The files

- `SPEC.md` — the product spec for how listing order is meant to work.
- `lib/events.ts` — where the ordering and prominence scores are computed.
- `lib/db.ts` — SQLite schema and the fixed seed.
- `components/` — React UI components (`Header.tsx`, `FilterBar.tsx`, `EventList.tsx`, `EventCard.tsx`).
- `hooks/useEvents.ts` — React hook managing data fetching and filter state.
- `app/page.tsx` — Next.js page assembling the full application.
- `app/api/` — the Next.js API route handlers.
- `tests/` — backend and frontend smoke tests.

## How we'll work on the call

60 minutes, one engineer. You'll talk us through the code, write a little, and
we'll discuss the design.

Use whatever tools you normally use, including AI assistants. We use them too
and it will not count against you. We will ask you to explain what you produce
and to show us a problem before you fix it, so read the output rather than
shipping it.

Think out loud, ask us questions, and tell us when something looks wrong to you.
