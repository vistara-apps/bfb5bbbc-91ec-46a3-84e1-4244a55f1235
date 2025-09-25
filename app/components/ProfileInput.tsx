'use client';

import { useState } from 'react';
import { User, ExternalLink } from 'lucide-react';
import { validateXProfile, extractUsernameFromUrl } from '@/lib/utils';

interface ProfileInputProps {
  onSubmit: (name: string, xProfileUrl: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProfileInput({ onSubmit, isLoading = false, className = '' }: ProfileInputProps) {
  const [name, setName] = useState('');
  const [xProfileUrl, setXProfileUrl] = useState('');
  const [errors, setErrors] = useState<{ name?: string; xProfile?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; xProfile?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!xProfileUrl.trim()) {
      newErrors.xProfile = 'X profile URL or username is required';
    } else if (!validateXProfile(xProfileUrl)) {
      newErrors.xProfile = 'Please enter a valid X profile URL or username';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const cleanedUrl = xProfileUrl.startsWith('@') 
      ? xProfileUrl.slice(1) 
      : xProfileUrl;
    
    onSubmit(name.trim(), cleanedUrl);
  };

  const handleXProfileChange = (value: string) => {
    setXProfileUrl(value);
    // Clear error when user starts typing
    if (errors.xProfile) {
      setErrors(prev => ({ ...prev, xProfile: undefined }));
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    // Clear error when user starts typing
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Ready to get roasted? 🔥
        </h2>
        <p className="text-text-secondary">
          Enter your name and X profile to get a personalized AI roast
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Your Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your name"
              className={`input-field pl-10 w-full ${errors.name ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="xProfile" className="block text-sm font-medium text-text-primary mb-2">
            X Profile URL or Username
          </label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              id="xProfile"
              type="text"
              value={xProfileUrl}
              onChange={(e) => handleXProfileChange(e.target.value)}
              placeholder="@username or https://x.com/username"
              className={`input-field pl-10 w-full ${errors.xProfile ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
          </div>
          {errors.xProfile && (
            <p className="mt-1 text-sm text-red-400">{errors.xProfile}</p>
          )}
          <p className="mt-1 text-xs text-text-secondary">
            We'll analyze your public profile to create a personalized roast
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating Roast...</span>
            </div>
          ) : (
            'Roast Me! 🔥'
          )}
        </button>
      </form>
    </div>
  );
}
