import { describe, it, expect } from 'vitest';
import { initDb, fetchEvents, SEED_NOW } from '../lib/db';
import { buildEventList } from '../lib/events';

describe('smoke', () => {
  it('build_event_list returns a list', () => {
    initDb();
    const rows = fetchEvents();
    const result = buildEventList(rows, { view: 'upcoming' }, 25, SEED_NOW);
    expect(Array.isArray(result)).toBe(true);
  });
});
