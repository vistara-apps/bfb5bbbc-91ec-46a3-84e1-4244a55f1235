import { NextRequest, NextResponse } from 'next/server';
import { incrementRoastShares } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body: { roastId: string } = await request.json();

    if (!body.roastId) {
      return NextResponse.json(
        { error: 'Roast ID is required' },
        { status: 400 }
      );
    }

    await incrementRoastShares(body.roastId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error incrementing roast shares:', error);
    return NextResponse.json(
      { error: 'Failed to increment roast shares' },
      { status: 500 }
    );
  }
}

