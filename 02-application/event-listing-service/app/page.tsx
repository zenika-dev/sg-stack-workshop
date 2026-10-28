'use client';

import React from 'react';
import {useEvents} from '../hooks/useEvents';
import {Header} from '../components/Header';
import {FilterBar} from '../components/FilterBar';
import {EventList} from '../components/EventList';

export default function EventsPage() {
  const {
    events,
    summary,
    runningCount,
    loading,
    error,
    filters,
    updateFilters,
  } = useEvents();

  return (
    <div className="container">
      <Header summary={summary} localRunningCount={runningCount}/>
      <FilterBar filters={filters} onChange={updateFilters}/>
      {error && (
        <div
          role="alert"
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            borderRadius: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          {error}
        </div>
      )}
      <EventList events={events} loading={loading}/>
    </div>
  );
}
