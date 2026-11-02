export const SCHEMA = `
CREATE TABLE IF NOT EXISTS events (
    id             INTEGER PRIMARY KEY,
    title          TEXT NOT NULL,
    status         TEXT NOT NULL,
    kind           TEXT NOT NULL,
    starts_at      TEXT,
    topics         TEXT,
    venue          TEXT,
    state          TEXT NOT NULL DEFAULT 'active',
    archived       INTEGER NOT NULL DEFAULT 0,
    embargoed_until TEXT,
    created_at     TEXT NOT NULL
);
`;
