import { NextRequest, NextResponse } from 'next/server';
import { generateRoast } from '@/lib/roast-generator';
import { saveRoast, incrementTotalRoasts } from '@/lib/database';
import { RoastRequest, Roast } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: RoastRequest = await request.json();

    // Validate request
    if (!body.name || !body.xProfileUrl) {
      return NextResponse.json(
        { error: 'Name and X profile URL are required' },
        { status: 400 }
      );
    }

    // Generate roast
    const roastText = await generateRoast(body);

    // Create roast object
    const roast: Roast = {
      roastId: `roast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: body.userId || 'anonymous',
      generatedText: roastText,
      timestamp: Date.now(),
      shareCount: 0,
    };

    // Save to database
    try {
      await saveRoast(roast);
      await incrementTotalRoasts();
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue without saving - roast was generated successfully
    }

    return NextResponse.json({
      roast: roastText,
      roastId: roast.roastId,
    });

  } catch (error) {
    console.error('Error generating roast:', error);
    return NextResponse.json(
      { error: 'Failed to generate roast' },
      { status: 500 }
    );
  }
}

