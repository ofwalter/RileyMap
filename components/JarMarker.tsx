'use client';

import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { JarWithLocation } from '@/lib/types';

interface JarMarkerProps {
  jar: JarWithLocation;
  onClick: () => void;
  isSelected?: boolean;
  displayLat?: number;
  displayLon?: number;
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

// Memoized icons - created once and reused
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

const darkIcon = (() => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41"><path fill="#1f2937" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.1 12.5 28.5 12.5 28.5S25 20.6 25 12.5C25 5.6 19.4 0 12.5 0z"/><circle cx="12.5" cy="12.5" r="6" fill="white"/></svg>';
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: iconShadow.src,
    shadowSize: [41, 41],
  });
})();

export default function JarMarker({ jar, onClick, isSelected = false, displayLat, displayLon }: JarMarkerProps) {
  const hasAcanth = jar?.infected_acanth > 0;
  const crayfishCount = jar?.total_crayfish || 0;
  
  // Create custom icon with crayfish count badge
  const markerIcon = useMemo(() => {
    if (isSelected) {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
          <path fill="#1f2937" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.1 12.5 28.5 12.5 28.5S25 20.6 25 12.5C25 5.6 19.4 0 12.5 0z"/>
          <circle cx="12.5" cy="12.5" r="6" fill="white"/>
          <circle cx="20" cy="6" r="5" fill="white" stroke="#1f2937" stroke-width="1.5"/>
          <text x="20" y="9" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#1f2937" text-anchor="middle">${crayfishCount}</text>
        </svg>
      `;
      return new L.Icon({
        iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: iconShadow.src,
        shadowSize: [41, 41],
      });
    }
    
    const color = hasAcanth ? '#dc2626' : '#2563eb';
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
        <path fill="${color}" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.1 12.5 28.5 12.5 28.5S25 20.6 25 12.5C25 5.6 19.4 0 12.5 0z"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
        <circle cx="20" cy="6" r="5" fill="white" stroke="${color}" stroke-width="1.5"/>
        <text x="20" y="9" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="${color}" text-anchor="middle">${crayfishCount}</text>
      </svg>
    `;
    return new L.Icon({
      iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: iconShadow.src,
      shadowSize: [41, 41],
    });
  }, [isSelected, hasAcanth, crayfishCount]);
  
  // Use display coordinates if provided, otherwise use original coordinates
  const lat = displayLat !== undefined ? displayLat : jar.lat;
  const lon = displayLon !== undefined ? displayLon : jar.lon;
  
  // Ensure jar has valid coordinates
  if (!jar || typeof lat !== 'number' || typeof lon !== 'number') {
    return null;
  }
  
  return (
    <Marker 
      position={[lat, lon]}
      icon={markerIcon}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
}
