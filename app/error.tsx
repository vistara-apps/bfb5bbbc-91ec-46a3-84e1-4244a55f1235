'use client';

import { Flame, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 text-center max-w-md">
        <Flame className="w-16 h-16 text-accent mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-text-secondary mb-6">
          Even our AI is speechless. Let's try that again!
        </p>
        <button
          onClick={reset}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
