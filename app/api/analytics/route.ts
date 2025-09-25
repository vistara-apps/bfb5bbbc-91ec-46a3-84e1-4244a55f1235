import { NextRequest, NextResponse } from 'next/server';
import { getTotalRoasts } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const totalRoasts = await getTotalRoasts();

    return NextResponse.json({
      totalRoasts,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}

