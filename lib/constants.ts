import { CreditPackage } from './types';

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: '3 Roasts',
    credits: 3,
    price: '0.0005 ETH',
    priceUsd: 0.50,
  },
  {
    id: 'popular',
    name: '10 Roasts',
    credits: 10,
    price: '0.0015 ETH',
    priceUsd: 1.50,
  },
  {
    id: 'premium',
    name: '25 Roasts',
    credits: 25,
    price: '0.003 ETH',
    priceUsd: 3.00,
  },
];

export const FREE_ROASTS_PER_DAY = 1;
export const ROAST_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export const SAMPLE_ROASTS = [
  "Your X bio says 'entrepreneur' but your follower count says 'unemployed with WiFi'.",
  "I see you tweet about productivity at 3 AM. That's not hustle culture, that's insomnia with delusions.",
  "Your profile picture has more filters than your personality has depth.",
  "You retweet motivational quotes like they're going to pay your rent.",
  "Your X feed is 90% retweets because even you don't find your thoughts worth sharing.",
];
