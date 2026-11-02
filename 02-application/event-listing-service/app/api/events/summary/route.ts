import { NextResponse } from 'next/server';
import { getSummary } from '@/backend/services/events';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getSummary());
}
