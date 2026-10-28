import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';
import { EventCard } from '../components/EventCard';
import { RankedEvent } from '../lib/types';

describe('frontend smoke', () => {
  it('Header renders title and summary count chips', () => {
    render(<Header summary={{ listed: 12, running: 5 }} localRunningCount={5} />);
    expect(screen.getByText('Event Listing Service')).toBeDefined();
    expect(screen.getByText('12')).toBeDefined();
  });

  it('EventCard renders title and score', () => {
    const dummyEvent: RankedEvent = {
      id: 1,
      title: 'Cloud Native Summit',
      status: 'announced',
      kind: 'flagship',
      starts_at: '2026-02-27T09:00:00',
      topics: 'cloud,featured',
      venue: 'Marina Bay Sands',
      state: 'active',
      archived: 0,
      embargoed_until: null,
      created_at: '2026-01-21T09:00:00',
      score: 77,
      running: true,
    };
    render(<EventCard event={dummyEvent} />);
    expect(screen.getByText('Cloud Native Summit')).toBeDefined();
    expect(screen.getByText('77')).toBeDefined();
  });
});
