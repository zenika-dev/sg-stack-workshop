import { useState, useEffect } from 'react';
import { RankedEvent, EventFilters, EventSummary } from '../lib/types';

export function useEvents(initialFilters: EventFilters = { view: 'upcoming' }) {
  const [events, setEvents] = useState<RankedEvent[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [summary, setSummary] = useState<EventSummary>({ listed: 0, running: 0 });
  const [runningCount, setRunningCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>(initialFilters);

  useEffect(() => {
    const running = events.filter((e) => e.running).length;
    setRunningCount(running);
  }, [events]);

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/events/summary');
      if (res.ok) {
        const data = await res.json();
        setSummary(data);
      }
    } catch {
    }
  };

  useEffect(() => {
    fetchSummary();
    const interval = setInterval(() => {
      fetchSummary();
    }, 30000);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.view) params.set('view', filters.view);
    if (filters.topic) params.set('topic', filters.topic);
    if (filters.venue) params.set('venue', filters.venue);
    if (filters.include_archived) params.set('include_archived', 'true');

    fetch(`/api/events?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load events');
        return res.json();
      })
      .then((data) => {
        setEvents(data.items || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters.view, filters.topic, filters.venue, filters.include_archived]);

  const updateFilters = (newFilters: Partial<EventFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    events,
    total,
    summary,
    runningCount,
    loading,
    error,
    filters,
    updateFilters,
    reloadSummary: fetchSummary,
  };
}
