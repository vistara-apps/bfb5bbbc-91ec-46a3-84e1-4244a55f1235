import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export function extractUsernameFromUrl(url: string): string {
  // Handle various X/Twitter URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/,
    /^@?([a-zA-Z0-9_]+)$/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return url; // Return as-is if no pattern matches
}

export function validateXProfile(input: string): boolean {
  const username = extractUsernameFromUrl(input);
  return /^[a-zA-Z0-9_]{1,15}$/.test(username);
}

export function canGenerateRoast(user: any): boolean {
  if (!user) return true; // Allow first roast for new users
  
  if (user.creditsRemaining > 0) return true;
  
  // Check if 24 hours have passed since last free roast
  if (!user.lastRoastTimestamp) return true;
  
  const timeSinceLastRoast = Date.now() - user.lastRoastTimestamp;
  return timeSinceLastRoast >= 24 * 60 * 60 * 1000; // 24 hours
}

export function getNextFreeRoastTime(lastRoastTimestamp: number): Date {
  return new Date(lastRoastTimestamp + 24 * 60 * 60 * 1000);
}
