import { EventRow, RankedEvent, EventFilters, EventSummary } from './types';

export const STARTING_SOON_DAYS = 7;

export const KIND_WEIGHT: Record<string, number> = {
  meetup: 1,
  workshop: 3,
  conference: 7,
  flagship: 12,
};

export const LISTED_LONG_DAYS = 30;
export const LISTED_LONG_CAP = 6;

export function buildEventList(
  rows: EventRow[],
  filters: EventFilters = {},
  limit: number = 25,
  now?: Date
): RankedEvent[] {
  if (!now) {
    now = new Date();
  }

  if (filters.include_archived === undefined) {
    filters.include_archived = false;
  }

  const view = filters.view || 'upcoming';
  const topicFilter = filters.topic;
  const venueFilter = filters.venue;

  const results: RankedEvent[] = [];

  for (const e of rows) {
    const event: RankedEvent = { ...e };

    if (event.status === 'completed' && view !== 'past') {
      continue;
    }

    if (event.state === 'Archived' && !filters.include_archived) {
      continue;
    }

    if (venueFilter && event.venue !== venueFilter) {
      continue;
    }

    if (topicFilter && !(event.topics || '').includes(topicFilter)) {
      continue;
    }

    let daysUntil: number | null = null;
    try {
      if (!event.starts_at) {
        throw new Error('Missing starts_at');
      }
      if (event.starts_at.includes('+') || event.starts_at.endsWith('Z')) {
        throw new TypeError('Cannot mix offset-aware date with naive reference date');
      }
      const starts = new Date(event.starts_at);
      if (isNaN(starts.getTime())) {
        throw new Error('Invalid date format');
      }
      daysUntil = Math.floor((starts.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } catch {
      daysUntil = null;
    }

    let score = KIND_WEIGHT[event.kind] ?? 0;

    if (daysUntil !== null) {
      if (daysUntil < 0 && event.kind !== 'meetup') {
        score += 50;
      } else if (daysUntil > 0 && daysUntil < STARTING_SOON_DAYS) {
        score += 20 - daysUntil * 2;
      }
    }

    if ((event.topics || '').includes('featured')) {
      score += 10;
    }

    if (event.status === 'open') {
      score += 5;
    } else if (event.status === 'tentative') {
      score -= 100;
    }

    const created = new Date(event.created_at);
    const listedDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (listedDays > LISTED_LONG_DAYS) {
      score += Math.min(Math.floor(listedDays / 7), LISTED_LONG_CAP);
    }

    if (event.state === 'archived') {
      score -= 25;
    }

    (e as RankedEvent).score = score;
    event.score = score;
    event.running = daysUntil !== null && daysUntil < 0;
    results.push(event);
  }

  results.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return results;
}

export function summarise(rows: EventRow[], now?: Date): EventSummary {
  if (!now) {
    now = new Date();
  }

  let listedCount = 0;
  let runningCount = 0;
  for (const e of rows) {
    if (e.archived === 1) {
      continue;
    }
    if (e.status !== 'completed') {
      listedCount += 1;
    }
    try {
      if (!e.starts_at) {
        throw new Error('Missing starts_at');
      }
      if (e.starts_at.includes('+') || e.starts_at.endsWith('Z')) {
        throw new TypeError('Cannot mix offset-aware date with naive reference date');
      }
      const starts = new Date(e.starts_at);
      if (isNaN(starts.getTime())) {
        throw new Error('Invalid date format');
      }
      if (Math.floor((starts.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 0) {
        runningCount += 1;
      }
    } catch {
    }
  }

  return { listed: listedCount, running: runningCount };
}
