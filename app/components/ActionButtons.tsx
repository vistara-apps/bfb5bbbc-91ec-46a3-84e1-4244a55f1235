'use client';

import { Share2, ShoppingCart, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  variant?: 'share' | 'buyMore' | 'tryAgain';
  onShare?: () => void;
  onBuyMore?: () => void;
  onTryAgain?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ActionButtons({ 
  variant = 'share',
  onShare,
  onBuyMore,
  onTryAgain,
  disabled = false,
  className = '' 
}: ActionButtonsProps) {
  if (variant === 'share') {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <button
          onClick={onShare}
          disabled={disabled}
          className="btn-primary flex items-center justify-center space-x-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 className="w-4 h-4" />
          <span>Share on Farcaster</span>
        </button>
        
        <button
          onClick={onTryAgain}
          disabled={disabled}
          className="btn-secondary flex items-center justify-center space-x-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (variant === 'buyMore') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <button
          onClick={onBuyMore}
          disabled={disabled}
          className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Buy More Roasts</span>
        </button>
        
        <p className="text-center text-text-secondary text-sm">
          Get more credits to continue the fun!
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={onTryAgain}
      disabled={disabled}
      className={`btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <RotateCcw className="w-4 h-4" />
      <span>Try Again Later</span>
    </button>
  );
}
