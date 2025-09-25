'use client';

import { useState } from 'react';
import { X, Zap, CreditCard } from 'lucide-react';
import { CREDIT_PACKAGES } from '@/lib/constants';
import { CreditPackage } from '@/lib/types';

interface CreditPurchaseProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (packageId: string) => Promise<void>;
  className?: string;
}

export function CreditPurchase({ 
  isOpen, 
  onClose, 
  onPurchase,
  className = '' 
}: CreditPurchaseProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('popular');
  const [isPurchasing, setIsPurchasing] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await onPurchase(selectedPackage);
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`glass-card max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Buy More Roasts
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface hover:bg-opacity-60 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {CREDIT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPackage === pkg.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-white border-opacity-20 hover:border-opacity-40'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      selectedPackage === pkg.id ? 'bg-accent' : 'bg-surface bg-opacity-60'
                    }`}>
                      <Zap className={`w-4 h-4 ${
                        selectedPackage === pkg.id ? 'text-white' : 'text-accent'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {pkg.credits} roasts
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-primary">
                      {pkg.price}
                    </p>
                    <p className="text-sm text-text-secondary">
                      ${pkg.priceUsd.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                {pkg.id === 'popular' && (
                  <div className="mt-2">
                    <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handlePurchase}
            disabled={isPurchasing}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPurchasing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Purchase Credits</span>
              </div>
            )}
          </button>

          <p className="text-center text-text-secondary text-xs mt-4">
            Secure payment powered by Base blockchain
          </p>
        </div>
      </div>
    </div>
  );
}
