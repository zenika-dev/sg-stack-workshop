import 'server-only';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

export const DB_PATH = process.env.EVENTS_DB || 'events.sqlite3';

export function connect(): Database.Database {
  const dbDir = path.dirname(DB_PATH);
  if (dbDir && dbDir !== '.' && !fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return new Database(DB_PATH);
}
