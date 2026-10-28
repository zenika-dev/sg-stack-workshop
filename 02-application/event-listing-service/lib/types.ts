export interface EventRow {
  id: number;
  title: string;
  status: string;
  kind: string;
  starts_at: string | null;
  topics: string | null;
  venue: string | null;
  state: string;
  archived: number;
  embargoed_until: string | null;
  created_at: string;
}

export interface RankedEvent extends EventRow {
  score?: number;
  running?: boolean;
}

export interface EventFilters {
  view?: string;
  topic?: string | null;
  venue?: string | null;
  include_archived?: boolean;
}

export interface EventSummary {
  listed: number;
  running: number;
}
