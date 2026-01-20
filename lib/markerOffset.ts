// Utility to offset markers with duplicate coordinates

export interface OffsetPosition {
  lat: number;
  lon: number;
  originalLat: number;
  originalLon: number;
}

/**
 * Offsets markers that share the same coordinates to prevent overlap
 * Uses vertical staggering to distribute markers above and below the original position
 */
export function offsetDuplicateMarkers<T extends { lat: number; lon: number }>(
  markers: T[],
  offsetDistance: number = 0.001 // ~100 meters at SC latitude
): Array<T & { displayLat: number; displayLon: number }> {
  // Group markers by coordinates (rounded to avoid floating point issues)
  const coordinateGroups = new Map<string, T[]>();
  
  markers.forEach(marker => {
    // Round coordinates to 5 decimal places (~1 meter precision)
    const key = `${marker.lat.toFixed(5)}_${marker.lon.toFixed(5)}`;
    if (!coordinateGroups.has(key)) {
      coordinateGroups.set(key, []);
    }
    coordinateGroups.get(key)!.push(marker);
  });
  
  // Apply offsets to groups with multiple markers
  const offsetMarkers: Array<T & { displayLat: number; displayLon: number }> = [];
  
  coordinateGroups.forEach((group, key) => {
    if (group.length === 1) {
      // Single marker, no offset needed
      const marker = group[0];
      offsetMarkers.push({
        ...marker,
        displayLat: marker.lat,
        displayLon: marker.lon,
      });
    } else {
      // Multiple markers at same location - apply vertical staggering
      const [baseLat, baseLon] = key.split('_').map(Number);
      
      group.forEach((marker, index) => {
        // Stagger vertically: alternate above and below
        // For even indices, go up; for odd indices, go down
        const isEven = index % 2 === 0;
        const row = Math.floor(index / 2);
        const verticalOffset = offsetDistance * (row + 1) * (isEven ? 1 : -1);
        
        offsetMarkers.push({
          ...marker,
          displayLat: baseLat + verticalOffset,
          displayLon: baseLon, // Keep same longitude, only offset vertically
        });
      });
    }
  });
  
  return offsetMarkers;
}

