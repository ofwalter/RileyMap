'use client';

import { JarWithLocation } from '@/lib/types';
import { getSeasonFromDate, formatJarCode } from '@/lib/utils';

interface JarDetailPanelProps {
  jar: JarWithLocation;
  onClose: () => void;
}

export default function JarDetailPanel({ jar, onClose }: JarDetailPanelProps) {
  if (!jar) return null;
  
  const season = getSeasonFromDate(jar.collection_date);
  const locationName = jar.location?.name || 'Unknown Location';

  return (
    <div className="absolute right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-[1000] overflow-y-auto text-gray-900">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Jar Details</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Location
          </h3>
          <p className="text-sm text-gray-900 break-words">{locationName}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Jar ID
          </h3>
          <p className="text-sm font-mono text-gray-900 break-words">{formatJarCode(jar.jar_code)}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Size Range
          </h3>
          <p className="text-sm text-gray-900 break-words">
            {jar.min_size !== null && jar.min_size !== undefined && jar.max_size !== null && jar.max_size !== undefined
              ? `${jar.min_size.toFixed(1)} - ${jar.max_size.toFixed(1)}`
              : 'N/A'}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Collection Date
          </h3>
          <p className="text-sm text-gray-900">
            {new Date(jar.collection_date).toLocaleDateString()}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Season
          </h3>
          <p className="text-sm text-gray-900">{season}</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-[15px] font-bold text-gray-900 uppercase mb-1">
            Crayfish Counts
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">Total Crayfish:</span>
              <span className="text-sm text-gray-900">{jar.total_crayfish}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">Males:</span>
              <span className="text-sm text-gray-900">{jar.num_males}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">Females:</span>
              <span className="text-sm text-gray-900">{jar.num_females}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-[12px]">
          <h3 className="text-[15px] font-bold text-gray-900 uppercase mb-1">
            Infection Counts
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">BD:</span>
              <span className="text-sm text-gray-900">{jar.infected_bd}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">mc(L):</span>
              <span className="text-sm text-gray-900">{jar.infected_mc_l}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">mc(s):</span>
              <span className="text-sm text-gray-900">{jar.infected_mc_s}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-500 uppercase">acanth:</span>
              <span className="text-sm text-gray-900">{jar.infected_acanth}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

