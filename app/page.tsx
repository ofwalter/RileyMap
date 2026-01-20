'use client';

import dynamic from 'next/dynamic';

// Dynamically import map component to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-lg">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  return <MapView />;
}

