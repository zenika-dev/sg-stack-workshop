'use client';

import React, {useState} from 'react';
import {EventFilters} from '../lib/types';

interface FilterBarProps {
  filters: EventFilters;
  onChange: (filters: Partial<EventFilters>) => void;
}

export function FilterBar({filters, onChange}: FilterBarProps) {
  const [topicInput, setTopicInput] = useState(filters.topic || '');
  const [venueInput, setVenueInput] = useState(filters.venue || '');

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTopicInput(val);
    onChange({topic: val || null});
  };

  const handleVenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setVenueInput(val);
    onChange({venue: val || null});
  };

  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>View</label>
        <select
          value={filters.view || 'upcoming'}
          onChange={(e) => onChange({view: e.target.value})}
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Topic</label>
        <input
          type="text"
          placeholder="e.g. cloud, rust, data..."
          value={topicInput}
          onChange={handleTopicChange}
        />
      </div>

      <div className="filter-group">
        <label>Venue</label>
        <input
          type="text"
          placeholder="e.g. Marina Bay Sands..."
          value={venueInput}
          onChange={handleVenueChange}
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          checked={!!filters.include_archived}
          onChange={(e) => onChange({include_archived: e.target.checked})}
        />
        <label onClick={() => onChange({include_archived: !filters.include_archived})}>
          Include archived
        </label>
      </div>
    </div>
  );
}
