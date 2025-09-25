import { NextRequest, NextResponse } from 'next/server';
import { getUser, saveUser, updateUserCredits, updateUserLastRoast } from '@/lib/database';
import { User } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await getUser(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: { user: User } = await request.json();

    if (!body.user || !body.user.userId) {
      return NextResponse.json(
        { error: 'User data with userId is required' },
        { status: 400 }
      );
    }

    await saveUser(body.user);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { error: 'Failed to save user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: { userId: string; credits?: number; lastRoastTimestamp?: number } = await request.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (body.credits !== undefined) {
      await updateUserCredits(body.userId, body.credits);
    }

    if (body.lastRoastTimestamp !== undefined) {
      await updateUserLastRoast(body.userId, body.lastRoastTimestamp);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

