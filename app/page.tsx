'use client';

import { useState, useEffect } from 'react';
import { ProfileInput } from './components/ProfileInput';
import { RoastCard } from './components/RoastCard';
import { CreditCounter } from './components/CreditCounter';
import { ActionButtons } from './components/ActionButtons';
import { CreditPurchase } from './components/CreditPurchase';
import { generateRoast } from '@/lib/roast-generator';
import { canGenerateRoast } from '@/lib/utils';
import { RoastRequest, User } from '@/lib/types';
import { Flame, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [currentRoast, setCurrentRoast] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [user, setUser] = useState<User>({
    userId: 'demo-user',
    creditsRemaining: 0,
    lastRoastTimestamp: undefined,
  });

  // Initialize user data
  useEffect(() => {
    const savedUser = localStorage.getItem('roastbot-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // New user gets 1 free roast
      const newUser: User = {
        userId: 'demo-user',
        creditsRemaining: 1,
        lastRoastTimestamp: undefined,
      };
      setUser(newUser);
      localStorage.setItem('roastbot-user', JSON.stringify(newUser));
    }
  }, []);

  const saveUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('roastbot-user', JSON.stringify(updatedUser));
  };

  const handleGenerateRoast = async (name: string, xProfileUrl: string) => {
    if (!canGenerateRoast(user)) {
      setShowPurchase(true);
      return;
    }

    setIsGenerating(true);
    setCurrentRoast('');

    try {
      const request: RoastRequest = {
        name,
        xProfileUrl,
        userId: user.userId,
      };

      const roast = await generateRoast(request);
      setCurrentRoast(roast);

      // Update user credits and timestamp
      const updatedUser: User = {
        ...user,
        creditsRemaining: Math.max(0, user.creditsRemaining - 1),
        lastRoastTimestamp: Date.now(),
      };
      saveUser(updatedUser);

    } catch (error) {
      console.error('Failed to generate roast:', error);
      setCurrentRoast('Oops! Something went wrong. Even our AI is speechless. Try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    if (currentRoast) {
      const shareText = `Just got roasted by AI! 🔥\n\n"${currentRoast}"\n\nGet your own roast at RoastBot!`;
      
      if (navigator.share) {
        navigator.share({
          title: 'My AI Roast',
          text: shareText,
        });
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Roast copied to clipboard!');
      }
    }
  };

  const handlePurchaseCredits = async (packageId: string) => {
    // Mock purchase - in real app, this would integrate with Base/OnchainKit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const creditAmounts = { starter: 3, popular: 10, premium: 25 };
    const credits = creditAmounts[packageId as keyof typeof creditAmounts] || 3;
    
    const updatedUser: User = {
      ...user,
      creditsRemaining: user.creditsRemaining + credits,
    };
    saveUser(updatedUser);
  };

  const handleTryAgain = () => {
    setCurrentRoast('');
  };

  const canGenerate = canGenerateRoast(user);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Flame className="w-8 h-8 text-accent animate-pulse-glow" />
            <h1 className="text-4xl font-bold text-text-primary">
              RoastBot
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse-glow" />
          </div>
          <p className="text-lg text-text-secondary max-w-md mx-auto">
            Get hilariously roasted by AI, powered by your X profile
          </p>
        </div>

        {/* Credit Counter */}
        <CreditCounter
          credits={user.creditsRemaining}
          lastFreeRoast={user.lastRoastTimestamp}
          onBuyCredits={() => setShowPurchase(true)}
        />

        {/* Main Content */}
        {!currentRoast && !isGenerating && (
          <ProfileInput
            onSubmit={handleGenerateRoast}
            isLoading={isGenerating}
          />
        )}

        {(isGenerating || currentRoast) && (
          <div className="space-y-6">
            <RoastCard
              roast={currentRoast}
              isGenerating={isGenerating}
              onShare={handleShare}
            />

            {currentRoast && !isGenerating && (
              <ActionButtons
                variant="share"
                onShare={handleShare}
                onTryAgain={handleTryAgain}
              />
            )}
          </div>
        )}

        {/* No Credits State */}
        {!canGenerate && !currentRoast && !isGenerating && (
          <div className="glass-card p-8 text-center">
            <Flame className="w-16 h-16 text-accent mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Out of Roasts!
            </h3>
            <p className="text-text-secondary mb-6">
              You've used your daily free roast. Buy more credits or wait 24 hours for another free one.
            </p>
            <ActionButtons
              variant="buyMore"
              onBuyMore={() => setShowPurchase(true)}
            />
          </div>
        )}

        {/* Credit Purchase Modal */}
        <CreditPurchase
          isOpen={showPurchase}
          onClose={() => setShowPurchase(false)}
          onPurchase={handlePurchaseCredits}
        />
      </div>
    </div>
  );
}
