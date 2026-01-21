'use client';

import { Location, JarWithLocation } from '@/lib/types';

interface TopBarProps {
  onBack: () => void;
  onReset: () => void;
  onJarNavigate: (direction: 'prev' | 'next') => void;
  currentLocation: Location | null;
  currentJar: JarWithLocation | null;
  jarsInLocation: JarWithLocation[];
  currentJarIndex: number;
  canGoBack: boolean;
  onFilterToggle: () => void;
  filtersActive: boolean;
  onInfoToggle: () => void;
  infoOpen: boolean;
}

export default function TopBar({
  onBack,
  onReset,
  onJarNavigate,
  currentLocation,
  currentJar,
  jarsInLocation,
  currentJarIndex,
  canGoBack,
  onFilterToggle,
  filtersActive,
  onInfoToggle,
  infoOpen,
}: TopBarProps) {
  const showJarNavigator = currentJar !== null && jarsInLocation.length > 0;
  const effectiveIndex = currentJarIndex >= 0 ? currentJarIndex : 0;
  const canGoPrev = effectiveIndex > 0;
  const canGoNext = effectiveIndex < jarsInLocation.length - 1;

  return (
    <div className="fixed top-0 left-0 right-0 z-[2000] bg-white border-b border-gray-200 shadow-sm h-12">
      <div className="flex items-center justify-between px-4 py-2 h-full">
        {/* Left side: Back button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={`p-2 rounded-md transition-colors ${
              canGoBack
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Go back"
            title="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Globe icon - reset to default view */}
          <button
            onClick={onReset}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Reset to default view"
            title="Reset to default view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </button>
        </div>

        {/* Center: Jar Navigator */}
        {showJarNavigator && (
          <div className="flex items-center gap-2 px-4 py-1 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
              {currentLocation?.name || 'All Locations'}
            </span>
            <button
              onClick={() => onJarNavigate('prev')}
              disabled={!canGoPrev}
              className={`p-1 rounded transition-colors ${
                canGoPrev
                  ? 'hover:bg-gray-200 text-gray-700'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous jar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">
              {effectiveIndex + 1} / {jarsInLocation.length}
            </span>
            <button
              onClick={() => onJarNavigate('next')}
              disabled={!canGoNext}
              className={`p-1 rounded transition-colors ${
                canGoNext
                  ? 'hover:bg-gray-200 text-gray-700'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next jar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Right side: Info and Filter buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onInfoToggle}
            className={`p-2 rounded-md transition-colors ${
              infoOpen
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Show project information"
            title="Show project information"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <circle cx="12" cy="8" r="1" fill="currentColor" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 12v4"
              />
            </svg>
          </button>
          <button
            onClick={onFilterToggle}
            className={`p-2 rounded-md transition-colors relative ${
              filtersActive
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Toggle filters"
            title="Toggle filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {filtersActive && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

