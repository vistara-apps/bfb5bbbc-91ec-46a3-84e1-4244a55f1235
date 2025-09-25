export interface User {
  userId: string;
  xProfileUrl?: string;
  creditsRemaining: number;
  lastRoastTimestamp?: number;
}

export interface Roast {
  roastId: string;
  userId: string;
  generatedText: string;
  timestamp: number;
  shareCount: number;
}

export interface XProfile {
  username: string;
  displayName: string;
  bio: string;
  followerCount: number;
  tweetCount: number;
  recentTweets: string[];
}

export interface RoastRequest {
  name: string;
  xProfileUrl: string;
  userId?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: string;
  priceUsd: number;
}
