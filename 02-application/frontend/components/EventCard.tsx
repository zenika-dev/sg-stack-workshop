'use client';

import React, { useState } from 'react';
import { RankedEvent } from '../lib/types';

interface EventCardProps {
  event: RankedEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [registered, setRegistered] = useState(false);

  const getTimeUntil = (startsAt: string | null) => {
    if (!startsAt) return 'Date to be announced';
    try {
      const start = new Date(startsAt);
      if (isNaN(start.getTime())) return 'Invalid date';
      const diffMs = start.getTime() - Date.now();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return 'Already started';
      if (diffDays === 0) return 'Starts today';
      return `Starts in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
    } catch {
      return startsAt;
    }
  };

  const handleRegister = () => {
    setRegistered(!registered);
  };

  return (
    <div className="event-card">
      <div className="score-badge" title="Prominence Score">
        <span className="score-value">{event.score ?? '-'}</span>
        <span className="score-label">Score</span>
      </div>

      <div className="event-main">
        <div className="event-header">
          <span className="event-id">#{event.id}</span>
          <span className="event-title">{event.title}</span>
          <span className={`badge badge-${event.kind}`}>{event.kind}</span>
          {event.running && (
            <span className="badge badge-running">Running Now</span>
          )}
          {event.status === 'open' && (
            <span className="badge" style={{ background: '#0284c7', color: '#fff' }}>
              Registration Open
            </span>
          )}
        </div>

        <div className="event-meta">
          <div className="meta-item">
            <span>Starts:</span>
            <strong>{event.starts_at || 'Not scheduled'}</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              ({getTimeUntil(event.starts_at)})
            </span>
          </div>

          {event.venue && (
            <div className="meta-item">
              <span>Venue:</span>
              <strong>{event.venue}</strong>
            </div>
          )}

          {event.topics && (
            <div className="meta-item">
              {event.topics.split(',').map((t) => (
                <span key={t} className="topic-tag">
                  {t.trim()}
                </span>
              ))}
            </div>
          )}

          {event.state !== 'active' && (
            <div className="meta-item" style={{ color: '#f87171' }}>
              <span>State: {event.state}</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="action-container"
        style={{ marginLeft: 'auto' }}
      >
        <div
          className="clickable-register-box"
          style={{
            cursor: 'pointer',
            padding: '0.4rem 0.8rem',
            borderRadius: '0.375rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: registered ? 'rgba(34, 197, 94, 0.2)' : 'rgba(56, 189, 248, 0.15)',
            color: registered ? '#4ade80' : '#38bdf8',
            border: `1px solid ${registered ? 'rgba(34, 197, 94, 0.4)' : 'rgba(56, 189, 248, 0.3)'}`,
            userSelect: 'none',
          }}
          onClick={handleRegister}
        >
          {registered ? 'Registered ✓' : 'Register'}
        </div>
      </div>
    </div>
  );
}
