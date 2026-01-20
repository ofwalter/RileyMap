'use client';

import { Season } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    seasons: Season[];
    bd: boolean;
    mcL: boolean;
    mcS: boolean;
    acanth: boolean;
  };
  onFilterChange: (filters: {
    seasons: Season[];
    bd: boolean;
    mcL: boolean;
    mcS: boolean;
    acanth: boolean;
  }) => void;
}

const SEASONS: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];

export default function FilterPanel({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: FilterPanelProps) {
  if (!isOpen) return null;

  const toggleSeason = (season: Season) => {
    const newSeasons = filters.seasons.includes(season)
      ? filters.seasons.filter(s => s !== season)
      : [...filters.seasons, season];
    onFilterChange({ ...filters, seasons: newSeasons });
  };

  const toggleFilter = (filterName: 'bd' | 'mcL' | 'mcS' | 'acanth') => {
    onFilterChange({ ...filters, [filterName]: !filters[filterName] });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[1999]"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute top-12 right-4 z-[2001] bg-white rounded-lg shadow-xl border border-gray-200 w-80 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close filters"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Season Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season
            </label>
            <div className="flex flex-wrap gap-2">
              {SEASONS.map(season => (
                <button
                  key={season}
                  onClick={() => toggleSeason(season)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                    filters.seasons.includes(season)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {/* Infection Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Infection Types
            </label>
            <div className="space-y-2">
              <button
                onClick={() => toggleFilter('bd')}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                  filters.bd
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                BD
              </button>
              <button
                onClick={() => toggleFilter('mcL')}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                  filters.mcL
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                mc(L)
              </button>
              <button
                onClick={() => toggleFilter('mcS')}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                  filters.mcS
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                mc(s)
              </button>
              <button
                onClick={() => toggleFilter('acanth')}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                  filters.acanth
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                acanth
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

