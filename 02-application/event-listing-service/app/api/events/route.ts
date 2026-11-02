import { NextRequest, NextResponse } from 'next/server';
import { listEvents } from '@/backend/services/events';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const view = searchParams.get('view') || 'upcoming';
  const topic = searchParams.get('topic') || null;
  const venue = searchParams.get('venue') || null;
  const includeArchived = searchParams.get('include_archived') === 'true' || searchParams.get('include_archived') === '1';
  const limit = parseInt(searchParams.get('limit') || '25', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const page = listEvents(
    { view, topic, venue, include_archived: includeArchived },
    limit,
    offset
  );

  return NextResponse.json(page);
}
