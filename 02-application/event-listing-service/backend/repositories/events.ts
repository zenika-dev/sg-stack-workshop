import 'server-only';
import fs from 'fs';
import { connect, DB_PATH } from '../db/connection';
import { initDb } from '../db/seed';
import { EventRow } from '../../shared/types';

export function findAll(): EventRow[] {
  if (!fs.existsSync(DB_PATH)) {
    initDb();
  }
  const db = connect();
  const rows = db.prepare('SELECT * FROM events').all() as EventRow[];
  db.close();
  return rows;
}
