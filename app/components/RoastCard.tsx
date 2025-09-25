'use client';

import { useState } from 'react';
import { Share2, Copy, Heart } from 'lucide-react';

interface RoastCardProps {
  roast: string;
  isGenerating?: boolean;
  onShare?: () => void;
  onLike?: () => void;
  className?: string;
}

export function RoastCard({ 
  roast, 
  isGenerating = false, 
  onShare, 
  onLike,
  className = '' 
}: RoastCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  if (isGenerating) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="flex items-center justify-center space-x-2 text-accent">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
          <span className="text-lg font-medium">Crafting your roast...</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-surface bg-opacity-60 rounded animate-pulse"></div>
          <div className="h-4 bg-surface bg-opacity-60 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-surface bg-opacity-60 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 animate-slide-up ${className}`}>
      <div className="roast-text mb-6">
        <p className="text-lg leading-relaxed">{roast}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
              liked 
                ? 'bg-accent text-white' 
                : 'bg-surface bg-opacity-60 text-text-secondary hover:text-accent'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {liked ? 'Loved it!' : 'Love it'}
            </span>
          </button>
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-surface bg-opacity-60 text-text-secondary hover:text-accent transition-all duration-200"
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm font-medium">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>
        
        <button
          onClick={handleShare}
          className="btn-primary flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
