'use client';

import React, {useEffect} from 'react';
import {EventSummary} from '../lib/types';

interface HeaderProps {
  summary: EventSummary;
  localRunningCount: number;
}

export function Header({summary, localRunningCount}: HeaderProps) {
  useEffect(() => {
    const indicator = document.getElementById('live-indicator');
    if (indicator) {
      indicator.style.backgroundColor = summary.running > 0 ? '#22c55e' : '#64748b';
    }
  }, [summary.running]);

  useEffect(() => {
    document.title = `(${summary.running} running) Event Listing Service`;
  }, [summary.running]);

  return (
    <header className="header">
      <div className="title-row">
        <div className="title-area">
          <h1>Event Listing Service</h1>
          <p>Programme Squad &bull; Public upcoming events ordered by prominence</p>
        </div>

        <div className="chips-container">
          <div className="chip chip-listed" title="Total listed events">
            <span className="chip-number">{summary.listed}</span>
            <span>Listed</span>
          </div>

          <div className="chip chip-running" title="Events currently running">
            <span id="live-indicator" className="pulse-dot"/>
            <span className="chip-number">{summary.running}</span>
            <span>Running Now</span>
          </div>
        </div>
      </div>
    </header>
  );
}
