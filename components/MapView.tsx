'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location, JarWithLocation } from '@/lib/types';
import { fetchLocations, fetchAllJarsWithLocations } from '@/lib/supabase';
import LocationMarker from './LocationMarker';
import JarMarker from './JarMarker';
import JarDetailPanel from './JarDetailPanel';
import TopBar from './TopBar';
import FilterPanel from './FilterPanel';
import InfoPanel from './InfoPanel';
import { offsetDuplicateMarkers } from '@/lib/markerOffset';
import { getSeasonFromDate } from '@/lib/utils';
import { Season } from '@/lib/types';
import { mapConfig } from '@/lib/mapConfig';

// Fix for default marker icons in Next.js
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map zoom and center changes
function MapController({
  shouldUpdate,
  center,
  zoom,
  onZoomChange,
}: {
  shouldUpdate: boolean;
  center: [number, number];
  zoom: number;
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMap();
  const prevUpdateRef = useRef(false);
  
  // Only update map view when shouldUpdate changes from false to true
  useEffect(() => {
    if (shouldUpdate && !prevUpdateRef.current) {
      map.setView(center, zoom);
    }
    prevUpdateRef.current = shouldUpdate;
  }, [map, center, zoom, shouldUpdate]);

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };
    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
}

type ViewState = 'locations' | 'location-jars' | 'jar-detail';

interface NavigationState {
  view: ViewState;
  location: Location | null;
  jar: JarWithLocation | null;
}

export default function MapView() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [jars, setJars] = useState<JarWithLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedJar, setSelectedJar] = useState<JarWithLocation | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(mapConfig.defaultCenter);
  const [mapZoom, setMapZoom] = useState<number>(mapConfig.defaultZoom);
  const [loading, setLoading] = useState(true);
  const [shouldUpdateMap, setShouldUpdateMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<NavigationState[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [filters, setFilters] = useState<{
    seasons: Season[];
    bd: boolean;
    mcL: boolean;
    mcS: boolean;
    acanth: boolean;
  }>({
    seasons: [],
    bd: false,
    mcL: false,
    mcS: false,
    acanth: false,
  });

  // Calculate center of all markers, adjusted to be more to the right and down
  const calculateMarkerCenter = useMemo(() => {
    if (locations.length === 0) {
      return mapConfig.defaultCenter;
    }
    
    let totalLat = 0;
    let totalLon = 0;
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLon = Infinity;
    let maxLon = -Infinity;
    
    locations.forEach(loc => {
      totalLat += loc.lat;
      totalLon += loc.lon;
      minLat = Math.min(minLat, loc.lat);
      maxLat = Math.max(maxLat, loc.lat);
      minLon = Math.min(minLon, loc.lon);
      maxLon = Math.max(maxLon, loc.lon);
    });
    
    // Calculate centroid
    const centroidLat = totalLat / locations.length;
    const centroidLon = totalLon / locations.length;
    
    // Adjust center to be more to the right (east, more negative lon) and down (south, lower lat)
    // Shift by 10% of the range towards the southeast
    const latRange = maxLat - minLat;
    const lonRange = maxLon - minLon;
    const adjustedLat = centroidLat - (latRange * 0.1); // Shift down (south)
    const adjustedLon = centroidLon - (lonRange * 0.1); // Shift right (east, more negative)
    
    return [adjustedLat, adjustedLon] as [number, number];
  }, [locations]);

  useEffect(() => {
    async function loadData() {
      try {
        const { locations: locationsData, jars: jarsData } = await fetchAllJarsWithLocations();
        setLocations(locationsData || []);
        setJars(jarsData || []);
        
        // Update map center to calculated center after data loads
        if (locationsData && locationsData.length > 0) {
          let totalLat = 0;
          let totalLon = 0;
          let minLat = Infinity;
          let maxLat = -Infinity;
          let minLon = Infinity;
          let maxLon = -Infinity;
          
          locationsData.forEach(loc => {
            totalLat += loc.lat;
            totalLon += loc.lon;
            minLat = Math.min(minLat, loc.lat);
            maxLat = Math.max(maxLat, loc.lat);
            minLon = Math.min(minLon, loc.lon);
            maxLon = Math.max(maxLon, loc.lon);
          });
          
          // Calculate centroid
          const centroidLat = totalLat / locationsData.length;
          const centroidLon = totalLon / locationsData.length;
          
          // Adjust center to be more to the right (east, more negative lon) and down (south, lower lat)
          const latRange = maxLat - minLat;
          const lonRange = maxLon - minLon;
          const adjustedLat = centroidLat - (latRange * 0.1); // Shift down (south)
          const adjustedLon = centroidLon - (lonRange * 0.1); // Shift right (east, more negative)
          
          setMapCenter([adjustedLat, adjustedLon]);
        }
      } catch (error) {
        console.error('Error loading map data:', error);
        setLocations([]);
        setJars([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLocationClick = (location: Location) => {
    // Save current state to history
    setNavigationHistory(prev => [...prev, {
      view: selectedJar ? 'jar-detail' : selectedLocationId ? 'location-jars' : 'locations',
      location: selectedLocationId ? locations.find(l => l.id === selectedLocationId) || null : null,
      jar: selectedJar,
    }]);
    
    setSelectedLocationId(location.id);
    setSelectedJar(null);
    setMapCenter([location.lat, location.lon]);
    setMapZoom(12);
    // Force map update by toggling the flag
    setShouldUpdateMap(false);
    setTimeout(() => setShouldUpdateMap(true), 10);
  };

  const handleJarClick = (jar: JarWithLocation) => {
    // Save current state to history if not already viewing a jar
    if (!selectedJar) {
      setNavigationHistory(prev => [...prev, {
        view: 'location-jars',
        location: selectedLocationId ? locations.find(l => l.id === selectedLocationId) || null : null,
        jar: null,
      }]);
    }
    
    // Always use original coordinates for navigation, not display coordinates
    setSelectedJar(jar);
    setMapCenter([jar.lat, jar.lon]);
    setMapZoom(14);
    setShouldUpdateMap(prev => !prev);
  };

  const handleBack = () => {
    const defaultCenter = locations.length > 0 ? calculateMarkerCenter : mapConfig.defaultCenter;
    
    if (navigationHistory.length === 0) {
      // If no history, go back to default view
      setSelectedLocationId(null);
      setSelectedJar(null);
      setMapCenter(defaultCenter);
      setMapZoom(8);
      setShouldUpdateMap(prev => !prev);
      return;
    }
    
    const previousState = navigationHistory[navigationHistory.length - 1];
    setNavigationHistory(prev => prev.slice(0, -1));
    
    if (previousState.view === 'locations') {
      // Go back to locations view
      setSelectedLocationId(null);
      setSelectedJar(null);
      setMapCenter(defaultCenter);
      setMapZoom(8);
      setShouldUpdateMap(prev => !prev);
    } else if (previousState.view === 'location-jars') {
      // Go back to location jars view
      if (previousState.location) {
        setSelectedLocationId(previousState.location.id);
        setSelectedJar(null);
        setMapCenter([previousState.location.lat, previousState.location.lon]);
        setMapZoom(12);
        setShouldUpdateMap(prev => !prev);
      }
    } else if (previousState.view === 'jar-detail') {
      // Go back to jar detail (shouldn't happen, but handle it)
      if (previousState.jar) {
        setSelectedJar(previousState.jar);
        setMapCenter([previousState.jar.lat, previousState.jar.lon]);
        setMapZoom(14);
        setShouldUpdateMap(prev => !prev);
      }
    }
  };

  const handleReset = () => {
    // Always reset to default view, regardless of current state
    setNavigationHistory([]);
    setSelectedLocationId(null);
    setSelectedJar(null);
    // Use calculated center or default
    const center = locations.length > 0 ? calculateMarkerCenter : mapConfig.defaultCenter;
    setMapCenter(center);
    setMapZoom(8);
    setShouldUpdateMap(false);
    setTimeout(() => setShouldUpdateMap(true), 10);
  };

  const handleJarNavigate = (direction: 'prev' | 'next') => {
    const hasInfectionFilter = filters.bd || filters.mcL || filters.mcS || filters.acanth;
    
    let jarsToNavigate: JarWithLocation[];
    if (hasInfectionFilter) {
      jarsToNavigate = filteredJars;
    } else {
      if (!selectedLocationId) return;
      jarsToNavigate = jars.filter(jar => jar.location?.id === selectedLocationId);
    }
    
    if (jarsToNavigate.length === 0) return;
    
    const currentIndex = selectedJar 
      ? jarsToNavigate.findIndex(j => j.id === selectedJar.id)
      : -1;
    
    const effectiveIndex = currentIndex >= 0 ? currentIndex : 0;
    
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = effectiveIndex > 0 ? effectiveIndex - 1 : jarsToNavigate.length - 1;
    } else {
      newIndex = effectiveIndex < jarsToNavigate.length - 1 ? effectiveIndex + 1 : 0;
    }
    
    const newJar = jarsToNavigate[newIndex];
    if (newJar) {
      setSelectedJar(newJar);
      if (newJar.location) {
        setSelectedLocationId(newJar.location.id);
      }
      setMapCenter([newJar.lat, newJar.lon]);
      setMapZoom(14);
      setShouldUpdateMap(false);
      setTimeout(() => setShouldUpdateMap(true), 10);
    }
  };

  const handleZoomChange = (newZoom: number) => {
    setMapZoom(newZoom);
    // Auto-close panel when zooming out
    if (newZoom < 11) {
      setSelectedJar(null);
      if (newZoom < 10) {
        setSelectedLocationId(null);
      }
    }
  };

  const handleClosePanel = () => {
    setSelectedJar(null);
  };

  // Apply filters to jars
  const filteredJars = useMemo(() => {
    return jars.filter(jar => {
      // Season filter
      if (filters.seasons.length > 0) {
        const season = getSeasonFromDate(jar.collection_date);
        if (!filters.seasons.includes(season)) return false;
      }
      
      // Infection filters
      if (filters.bd && jar.infected_bd === 0) return false;
      if (filters.mcL && jar.infected_mc_l === 0) return false;
      if (filters.mcS && jar.infected_mc_s === 0) return false;
      if (filters.acanth && jar.infected_acanth === 0) return false;
      
      return true;
    });
  }, [jars, filters]);

  // Apply filters to locations (location shows if any jar in it matches filters)
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const jarsInLocation = filteredJars.filter(jar => jar.location?.id === location.id);
      return jarsInLocation.length > 0;
    });
  }, [locations, filteredJars]);

  // Determine which markers to show based on zoom level
  // Use a threshold to prevent rapid switching
  const showLocationMarkers = mapZoom < 11;
  const jarsToShow = useMemo(() => {
    if (!showLocationMarkers && selectedLocationId) {
      return filteredJars.filter((jar) => jar.location?.id === selectedLocationId);
    }
    return [];
  }, [showLocationMarkers, selectedLocationId, filteredJars]);

  // Offset duplicate jar markers
  const offsetJars = useMemo(() => {
    if (jarsToShow.length === 0) return [];
    return offsetDuplicateMarkers(jarsToShow);
  }, [jarsToShow]);

  // Get current location and jar navigator data
  const currentLocation = useMemo(() => {
    return selectedLocationId ? locations.find(l => l.id === selectedLocationId) || null : null;
  }, [selectedLocationId, locations]);

  const hasInfectionFilter = useMemo(() => {
    return filters.bd || filters.mcL || filters.mcS || filters.acanth;
  }, [filters]);

  const jarsInLocation = useMemo(() => {
    if (!selectedLocationId) return [];
    const locationJars = jars.filter(jar => jar.location?.id === selectedLocationId);
    if (hasInfectionFilter) {
      return filteredJars.filter(jar => jar.location?.id === selectedLocationId);
    }
    return locationJars;
  }, [selectedLocationId, jars, filteredJars, hasInfectionFilter]);

  const jarsForNavigation = useMemo(() => {
    if (hasInfectionFilter) {
      return filteredJars;
    }
    return jarsInLocation;
  }, [hasInfectionFilter, filteredJars, jarsInLocation]);

  const currentJarIndex = useMemo(() => {
    if (!selectedJar) return -1;
    return jarsForNavigation.findIndex(j => j.id === selectedJar.id);
  }, [selectedJar, jarsForNavigation]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-black rounded-full"
            style={{ 
              animation: 'loading-bar 1.5s ease-in-out infinite',
              width: '40%'
            }}
          ></div>
        </div>
        <div className="text-lg text-black font-medium">Loading data...</div>
      </div>
    );
  }

  // Don't render map until we have data
  if (locations.length === 0 && jars.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white">
      <TopBar
        onBack={handleBack}
        onReset={handleReset}
        onJarNavigate={handleJarNavigate}
        currentLocation={currentLocation}
        currentJar={selectedJar}
        jarsInLocation={jarsForNavigation}
        currentJarIndex={currentJarIndex}
        canGoBack={navigationHistory.length > 0 || selectedLocationId !== null || selectedJar !== null}
        onFilterToggle={() => setFiltersOpen(!filtersOpen)}
        filtersActive={filters.seasons.length > 0 || filters.bd || filters.mcL || filters.mcS || filters.acanth}
        onInfoToggle={() => setInfoOpen(!infoOpen)}
        infoOpen={infoOpen}
      />
      
      <FilterPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <InfoPanel
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
      />
      
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%', marginTop: '48px' }}
        zoomControl={true}
        whenReady={() => setMapReady(true)}
        {...(mapConfig.maxBounds && { maxBounds: mapConfig.maxBounds })}
      >
        {/* More colorful tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController 
          shouldUpdate={shouldUpdateMap}
          center={mapCenter} 
          zoom={mapZoom} 
          onZoomChange={handleZoomChange}
        />

        {mapReady && showLocationMarkers &&
          filteredLocations.length > 0 &&
          filteredLocations.map((location) => (
            <LocationMarker
              key={`loc-${location.id}`}
              location={location}
              jars={filteredJars}
              onClick={() => handleLocationClick(location)}
            />
          ))}

        {mapReady && !showLocationMarkers &&
          offsetJars.length > 0 &&
          offsetJars.map((jar) => (
            <JarMarker
              key={`jar-${jar.id}`}
              jar={jar}
              isSelected={selectedJar?.id === jar.id}
              onClick={() => handleJarClick(jar)}
              displayLat={jar.displayLat}
              displayLon={jar.displayLon}
            />
          ))}
      </MapContainer>

      {selectedJar && (
        <JarDetailPanel jar={selectedJar} onClose={handleClosePanel} />
      )}
    </div>
  );
}

