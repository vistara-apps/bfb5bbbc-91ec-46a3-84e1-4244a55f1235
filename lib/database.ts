import { Redis } from '@upstash/redis';
import { User, Roast } from './types';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// User operations
export async function getUser(userId: string): Promise<User | null> {
  try {
    const userData = await redis.get(`user:${userId}`);
    return userData as User | null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function saveUser(user: User): Promise<void> {
  try {
    await redis.set(`user:${user.userId}`, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

export async function updateUserCredits(userId: string, credits: number): Promise<void> {
  try {
    const user = await getUser(userId);
    if (user) {
      user.creditsRemaining = credits;
      await saveUser(user);
    }
  } catch (error) {
    console.error('Error updating user credits:', error);
  }
}

export async function updateUserLastRoast(userId: string, timestamp: number): Promise<void> {
  try {
    const user = await getUser(userId);
    if (user) {
      user.lastRoastTimestamp = timestamp;
      await saveUser(user);
    }
  } catch (error) {
    console.error('Error updating user last roast:', error);
  }
}

// Roast operations
export async function saveRoast(roast: Roast): Promise<void> {
  try {
    await redis.set(`roast:${roast.roastId}`, JSON.stringify(roast));
    // Also add to user's roast list
    await redis.lpush(`user:${roast.userId}:roasts`, roast.roastId);
    // Keep only last 50 roasts per user
    await redis.ltrim(`user:${roast.userId}:roasts`, 0, 49);
  } catch (error) {
    console.error('Error saving roast:', error);
  }
}

export async function getUserRoasts(userId: string, limit: number = 10): Promise<Roast[]> {
  try {
    const roastIds = await redis.lrange(`user:${userId}:roasts`, 0, limit - 1);
    const roasts: Roast[] = [];

    for (const roastId of roastIds) {
      const roastData = await redis.get(`roast:${roastId}`);
      if (roastData) {
        roasts.push(roastData as Roast);
      }
    }

    return roasts;
  } catch (error) {
    console.error('Error getting user roasts:', error);
    return [];
  }
}

export async function incrementRoastShares(roastId: string): Promise<void> {
  try {
    const roastData = await redis.get(`roast:${roastId}`);
    if (roastData) {
      const roast = roastData as Roast;
      roast.shareCount += 1;
      await redis.set(`roast:${roastId}`, JSON.stringify(roast));
    }
  } catch (error) {
    console.error('Error incrementing roast shares:', error);
  }
}

// Analytics
export async function incrementTotalRoasts(): Promise<void> {
  try {
    await redis.incr('stats:total_roasts');
  } catch (error) {
    console.error('Error incrementing total roasts:', error);
  }
}

export async function getTotalRoasts(): Promise<number> {
  try {
    const count = await redis.get('stats:total_roasts');
    return (count as number) || 0;
  } catch (error) {
    console.error('Error getting total roasts:', error);
    return 0;
  }
}
