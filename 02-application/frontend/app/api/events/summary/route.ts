import { NextResponse } from 'next/server';
import { fetchEvents } from '@/lib/db';
import { summarise } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET() {
  const summary = summarise(fetchEvents());
  return NextResponse.json(summary);
}
