import { EventFilters, EventPage, EventSummary } from '../shared/types';

export async function fetchEventPage(filters: EventFilters): Promise<EventPage> {
  const params = new URLSearchParams();
  if (filters.view) params.set('view', filters.view);
  if (filters.topic) params.set('topic', filters.topic);
  if (filters.venue) params.set('venue', filters.venue);
  if (filters.include_archived) params.set('include_archived', 'true');

  const res = await fetch(`/api/events?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load events');
  return res.json();
}

export async function fetchEventSummary(): Promise<EventSummary | null> {
  const res = await fetch('/api/events/summary');
  return res.ok ? res.json() : null;
}
