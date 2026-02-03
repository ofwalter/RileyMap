'use client';

import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Location, JarWithLocation } from '@/lib/types';

interface LocationMarkerProps {
  location: Location;
  onClick: () => void;
  jars?: JarWithLocation[];
}

// Default blue icon
const defaultIcon = new L.Icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Memoized red icon - created once and reused
const redIcon = (() => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41"><path fill="#dc2626" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.1 12.5 28.5 12.5 28.5S25 20.6 25 12.5C25 5.6 19.4 0 12.5 0z"/><circle cx="12.5" cy="12.5" r="6" fill="white"/></svg>';
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: iconShadow.src,
    shadowSize: [41, 41],
  });
})();

export default function LocationMarker({ location, onClick, jars = [] }: LocationMarkerProps) {
  // Sum total crayfish from all jars in this location
  const totalCrayfish = useMemo(() => {
    return jars
      .filter(jar => jar.location?.id === location.id)
      .reduce((sum, jar) => sum + (jar.total_crayfish || 0), 0);
  }, [jars, location.id]);
  
  // Check if any jar in this location has acanth
  const hasAcanth = useMemo(() => {
    return jars.some(jar => jar.location.id === location.id && jar.infected_acanth > 0);
  }, [jars, location.id]);
  
  // Create custom icon with crayfish count badge
  const markerIcon = useMemo(() => {
    const color = hasAcanth ? '#dc2626' : '#2563eb';
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="51" viewBox="0 0 35 51">
        <!-- Marker pin -->
        <path fill="${color}" d="M17.5 0C7.8 0 0 7.8 0 17.5c0 11.3 17.5 33.5 17.5 33.5S35 28.8 35 17.5C35 7.8 27.2 0 17.5 0z"/>
        <circle cx="17.5" cy="17.5" r="8" fill="white"/>
        <!-- Count badge -->
        <circle cx="28" cy="8" r="8.5" fill="white" stroke="${color}" stroke-width="2"/>
        <text x="28" y="11.5" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="${color}" text-anchor="middle">${totalCrayfish}</text>
      </svg>
    `;
    return new L.Icon({
      iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
      iconSize: [35, 51],
      iconAnchor: [17.5, 51],
      popupAnchor: [1, -34],
      shadowUrl: iconShadow.src,
      shadowSize: [41, 41],
    });
  }, [hasAcanth, totalCrayfish]);
  
  // Ensure location has valid coordinates
  if (!location || typeof location.lat !== 'number' || typeof location.lon !== 'number') {
    return null;
  }
  
  return (
    <Marker 
      position={[location.lat, location.lon]}
      icon={markerIcon}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
}

