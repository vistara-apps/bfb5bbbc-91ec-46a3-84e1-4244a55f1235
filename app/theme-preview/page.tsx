'use client';

import { useTheme } from '../components/ThemeProvider';
import { Palette, Flame, Sparkles } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Warm Social', description: 'Dark teal with coral accents' },
  { id: 'celo', name: 'Celo', description: 'Black with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Palette className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-text-primary">
              Theme Preview
            </h1>
          </div>
          <p className="text-lg text-text-secondary">
            Preview different themes for RoastBot
          </p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Select Theme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  theme === t.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-white border-opacity-20 hover:border-opacity-40'
                }`}
              >
                <h3 className="font-medium text-text-primary mb-1">
                  {t.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t.description}
                </p>
                {theme === t.id && (
                  <div className="mt-2">
                    <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Components */}
        <div className="space-y-6">
          {/* Header Preview */}
          <div className="glass-card p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Flame className="w-8 h-8 text-accent animate-pulse-glow" />
                <h1 className="text-3xl font-bold text-text-primary">
                  RoastBot
                </h1>
                <Sparkles className="w-8 h-8 text-accent animate-pulse-glow" />
              </div>
              <p className="text-text-secondary">
                Get hilariously roasted by AI, powered by your X profile
              </p>
            </div>
          </div>

          {/* Button Preview */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              Button Styles
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">
                Primary Button
              </button>
              <button className="btn-secondary">
                Secondary Button
              </button>
            </div>
          </div>

          {/* Input Preview */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              Input Fields
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="input-field w-full"
              />
              <input
                type="text"
                placeholder="@username or profile URL"
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Roast Card Preview */}
          <div className="glass-card p-6">
            <div className="roast-text mb-4">
              <p className="text-lg leading-relaxed">
                "Your X bio says 'entrepreneur' but your follower count says 'unemployed with WiFi'."
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-surface bg-opacity-60 text-text-secondary">
                  <span className="text-sm">Love it</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-surface bg-opacity-60 text-text-secondary">
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              <button className="btn-primary">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
