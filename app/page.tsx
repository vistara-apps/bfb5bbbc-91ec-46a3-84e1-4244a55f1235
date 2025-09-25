'use client';

import { useState, useEffect } from 'react';
import { ProfileInput } from './components/ProfileInput';
import { RoastCard } from './components/RoastCard';
import { CreditCounter } from './components/CreditCounter';
import { ActionButtons } from './components/ActionButtons';
import { CreditPurchase } from './components/CreditPurchase';
import { canGenerateRoast } from '@/lib/utils';
import { User } from '@/lib/types';
import { Flame, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [currentRoast, setCurrentRoast] = useState<string>('');
  const [currentRoastId, setCurrentRoastId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [user, setUser] = useState<User>({
    userId: 'demo-user',
    creditsRemaining: 0,
    lastRoastTimestamp: undefined,
  });
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Initialize user data
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Try to get user from API first
        const response = await fetch('/api/user?userId=demo-user');
        let existingUser: User;

        if (response.ok) {
          const data = await response.json();
          existingUser = data.user;
        } else {
          // New user gets 1 free roast
          existingUser = {
            userId: 'demo-user',
            creditsRemaining: 1,
            lastRoastTimestamp: undefined,
          };

          // Save new user via API
          await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: existingUser }),
          });
        }

        setUser(existingUser);
      } catch (error) {
        console.error('Error loading user:', error);
        // Fallback to localStorage if API fails
        const savedUser = localStorage.getItem('roastbot-user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          const newUser: User = {
            userId: 'demo-user',
            creditsRemaining: 1,
            lastRoastTimestamp: undefined,
          };
          setUser(newUser);
          localStorage.setItem('roastbot-user', JSON.stringify(newUser));
        }
      } finally {
        setIsLoadingUser(false);
      }
    };

    initializeUser();
  }, []);

  const updateUserState = async (updatedUser: User) => {
    setUser(updatedUser);
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: updatedUser }),
      });
    } catch (error) {
      console.error('Error saving user via API:', error);
      // Fallback to localStorage
      localStorage.setItem('roastbot-user', JSON.stringify(updatedUser));
    }
  };

  const handleGenerateRoast = async (name: string, xProfileUrl: string) => {
    if (!canGenerateRoast(user)) {
      setShowPurchase(true);
      return;
    }

    setIsGenerating(true);
    setCurrentRoast('');
    setCurrentRoastId('');

    try {
      // Call the roast API
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          xProfileUrl,
          userId: user.userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roast');
      }

      const data = await response.json();
      setCurrentRoast(data.roast);
      setCurrentRoastId(data.roastId);

      // Update user credits and timestamp locally
      const updatedUser: User = {
        ...user,
        creditsRemaining: Math.max(0, user.creditsRemaining - 1),
        lastRoastTimestamp: Date.now(),
      };

      // Update user in database via API
      try {
        await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            credits: updatedUser.creditsRemaining,
            lastRoastTimestamp: updatedUser.lastRoastTimestamp,
          }),
        });
      } catch (apiError) {
        console.error('Error updating user via API:', apiError);
      }

      updateUserState(updatedUser);

    } catch (error) {
      console.error('Failed to generate roast:', error);
      setCurrentRoast('Oops! Something went wrong. Even our AI is speechless. Try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (currentRoast && currentRoastId) {
      const shareText = `Just got roasted by AI! 🔥\n\n"${currentRoast}"\n\nGet your own roast at RoastBot!`;

      try {
        // Try Farcaster share first (if in a frame)
        if (window.parent !== window) {
          // We're in an iframe, likely Farcaster
          window.parent.postMessage({
            type: 'share',
            text: shareText,
          }, '*');
        } else if (navigator.share) {
          // Use native share API
          await navigator.share({
            title: 'My AI Roast',
            text: shareText,
          });
        } else {
          // Fallback to copying to clipboard
          await navigator.clipboard.writeText(shareText);
          alert('Roast copied to clipboard!');
        }

        // Increment share count via API
        try {
          await fetch('/api/roast/share', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              roastId: currentRoastId,
            }),
          });
        } catch (apiError) {
          console.error('Error incrementing share count:', apiError);
        }

      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(shareText);
          alert('Roast copied to clipboard!');
        } catch (clipboardError) {
          console.error('Clipboard error:', clipboardError);
        }
      }
    }
  };

  const handlePurchaseCredits = async (packageId: string) => {
    try {
      const creditAmounts = { starter: 3, popular: 10, premium: 25 };
      const priceAmounts = { starter: '0.0005', popular: '0.0015', premium: '0.003' };

      const credits = creditAmounts[packageId as keyof typeof creditAmounts] || 3;
      const price = priceAmounts[packageId as keyof typeof priceAmounts] || '0.0005';

      // In a real implementation, this would use OnchainKit's transaction components
      // For now, we'll simulate the transaction
      console.log(`Initiating purchase of ${credits} credits for ${price} ETH`);

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const updatedUser: User = {
        ...user,
        creditsRemaining: user.creditsRemaining + credits,
      };

      // Update credits via API
      try {
        await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            credits: updatedUser.creditsRemaining,
          }),
        });
      } catch (apiError) {
        console.error('Error updating user credits via API:', apiError);
      }

      updateUserState(updatedUser);
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  };

  const handleTryAgain = () => {
    setCurrentRoast('');
  };

  const canGenerate = canGenerateRoast(user);

  // Show loading state while initializing user
  if (isLoadingUser) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading RoastBot...</p>
        </div>
      </div>
    );
  }

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
