import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { EventRow } from './types';

export const DB_PATH = process.env.EVENTS_DB || 'events.sqlite3';
export const SEED_NOW = new Date('2026-03-02T09:00:00');

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

function pad(num: number): string {
  return String(num).padStart(2, '0');
}

function formatIso(d: Date, aware: boolean = false): string {
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  const baseIso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  if (aware) {
    return `${baseIso}+00:00`;
  }
  return baseIso;
}

export function seedRows(): Array<[
  number, string, string, string, string | null, string | null, string | null, string, number, string | null, string
]> {
  const base = new Date('2026-03-02T09:00:00');

  function rel(days: number, aware: boolean = false): string {
    const d = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
    return formatIso(d, aware);
  }

  return [
    [1, 'Cloud Native Summit', 'announced', 'flagship', rel(-3), 'cloud,featured', 'Marina Bay Sands', 'active', 0, null, rel(-40)],
    [2, 'Rust Beginners Meetup', 'announced', 'meetup', rel(-6), 'rust', 'Funan Level 7', 'active', 0, rel(5), rel(-52)],
    [3, 'Kubernetes Hands-On Workshop', 'open', 'conference', rel(2), 'cloud', 'JustCo Marina One', 'active', 0, null, rel(-12)],
    [4, 'Intro to Observability', 'announced', 'workshop', rel(7), 'sre', 'Marina Bay Sands', 'active', 0, rel(4), rel(-4)],
    [5, 'Data Engineering Deep Dive', 'announced', 'conference', rel(0), 'data', 'JustCo Marina One', 'active', 0, null, rel(-9)],
    [6, 'Legacy Systems Clinic', 'announced', 'workshop', rel(14), 'architecture', null, 'active', 0, rel(10), rel(-70)],
    [7, 'Frontend Performance Day', 'completed', 'workshop', rel(-1), 'frontend', 'JustCo Marina One', 'active', 0, null, rel(-20)],
    [8, 'Archived 2024 Roadshow', 'announced', 'meetup', rel(3), 'community', 'Funan Level 7', 'Archived', 1, null, rel(-90)],
    [9, 'Platform Security Conference', 'announced', 'flagship', rel(1, true), 'security,featured', 'Marina Bay Sands', 'active', 0, null, rel(-33)],
    [10, 'Analytics Practitioners Forum', 'announced', 'conference', null, 'data', null, 'active', 0, null, rel(-61)],
    [11, 'Incident Response Bootcamp', 'open', 'flagship', rel(-2), 'featured', 'Funan Level 7', 'active', 0, null, rel(-3)],
    [12, 'Community Organisers Mixer', 'announced', 'meetup', 'sometime next week', 'community', null, 'archived', 1, null, rel(-120)],
    [13, 'Contract Law for Speakers', 'announced', 'workshop', rel(5), 'legal', 'Marina Bay Sands', 'active', 0, null, rel(-15)],
    [14, 'Backup Strategies Meetup', 'announced', 'conference', rel(-9), 'infra', 'JustCo Marina One', 'archived', 0, null, rel(-45)],
    [15, 'Annual Community Offsite', 'announced', 'meetup', rel(21), 'community,featured', null, 'active', 0, null, rel(-2)],
  ];
}

export function connect(): Database.Database {
  const dbDir = path.dirname(DB_PATH);
  if (dbDir && dbDir !== '.' && !fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return new Database(DB_PATH);
}

export function initDb(): void {
  if (fs.existsSync(DB_PATH)) {
    try {
      fs.unlinkSync(DB_PATH);
    } catch {
    }
  }
  const db = connect();
  db.exec('DROP TABLE IF EXISTS events;');
  db.exec(SCHEMA);
  const insert = db.prepare(`
    INSERT INTO events (id, title, status, kind, starts_at, topics, venue, state, archived, embargoed_until, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const rows = seedRows();
  const insertMany = db.transaction((records: typeof rows) => {
    for (const record of records) {
      insert.run(...record);
    }
  });
  insertMany(rows);
  db.close();
}

export function fetchEvents(): EventRow[] {
  if (!fs.existsSync(DB_PATH)) {
    initDb();
  }
  const db = connect();
  const rows = db.prepare('SELECT * FROM events').all() as EventRow[];
  db.close();
  return rows;
}
