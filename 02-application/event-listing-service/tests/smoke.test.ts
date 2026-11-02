import { describe, it, expect } from 'vitest';
import { initDb, SEED_NOW } from '../backend/db/seed';
import { findAll } from '../backend/repositories/events';
import { buildEventList } from '../backend/services/events';

describe('smoke', () => {
  it('build_event_list returns a list', () => {
    initDb();
    const rows = findAll();
    const result = buildEventList(rows, { view: 'upcoming' }, 25, SEED_NOW);
    expect(Array.isArray(result)).toBe(true);
  });
});
