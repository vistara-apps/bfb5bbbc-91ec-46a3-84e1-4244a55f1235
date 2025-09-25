'use client';

import { Zap, Clock } from 'lucide-react';
import { formatTimeAgo, getNextFreeRoastTime } from '@/lib/utils';

interface CreditCounterProps {
  credits: number;
  lastFreeRoast?: number;
  onBuyCredits?: () => void;
  className?: string;
}

export function CreditCounter({ 
  credits, 
  lastFreeRoast, 
  onBuyCredits,
  className = '' 
}: CreditCounterProps) {
  const canGetFreeRoast = !lastFreeRoast || 
    (Date.now() - lastFreeRoast) >= 24 * 60 * 60 * 1000;
  
  const nextFreeRoast = lastFreeRoast ? getNextFreeRoastTime(lastFreeRoast) : null;
  const timeUntilFree = nextFreeRoast ? nextFreeRoast.getTime() - Date.now() : 0;
  const hoursUntilFree = Math.ceil(timeUntilFree / (1000 * 60 * 60));

  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-medium text-text-primary">
              {credits} Credits
            </span>
          </div>
          
          {!canGetFreeRoast && hoursUntilFree > 0 && (
            <div className="flex items-center space-x-2 text-text-secondary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Free roast in {hoursUntilFree}h
              </span>
            </div>
          )}
          
          {canGetFreeRoast && credits === 0 && (
            <div className="flex items-center space-x-2 text-accent">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">
                Free roast available!
              </span>
            </div>
          )}
        </div>
        
        {credits === 0 && !canGetFreeRoast && (
          <button
            onClick={onBuyCredits}
            className="btn-primary text-sm px-4 py-2"
          >
            Buy Credits
          </button>
        )}
      </div>
      
      {credits > 0 && (
        <div className="mt-2">
          <div className="w-full bg-surface bg-opacity-60 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((credits / 10) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
