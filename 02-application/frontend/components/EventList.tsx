'use client';

import React from 'react';
import { RankedEvent } from '../lib/types';
import { EventCard } from './EventCard';

interface EventListProps {
  events: RankedEvent[];
  loading: boolean;
}

export function EventList({ events, loading }: EventListProps) {
  if (loading) {
    return <div className="empty-state">Loading events...</div>;
  }

  if (events.length === 0) {
    return <div className="empty-state">No events match the selected filters.</div>;
  }

  const sortedEvents = events.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return (
    <div className="events-list">
      {sortedEvents.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}
