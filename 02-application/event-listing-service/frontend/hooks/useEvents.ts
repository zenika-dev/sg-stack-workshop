import { useState, useEffect } from 'react';
import { fetchEventPage, fetchEventSummary } from '../api';
import { RankedEvent, EventFilters, EventSummary } from '../../shared/types';

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
      const data = await fetchEventSummary();
      if (data) setSummary(data);
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
    fetchEventPage(filters)
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
