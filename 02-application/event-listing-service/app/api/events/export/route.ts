import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { listAllForExport } from '@/backend/services/events';

export const dynamic = 'force-dynamic';

const EXPORT_PATH = 'exports/events.json';

export async function GET() {
  const events = listAllForExport();

  const dir = path.dirname(EXPORT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(EXPORT_PATH, JSON.stringify(events, null, 2), 'utf-8');

  return NextResponse.json({
    written: events.length,
    path: EXPORT_PATH,
  });
}
