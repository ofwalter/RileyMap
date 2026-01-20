// Supabase client configuration

import { createClient } from '@supabase/supabase-js';
import { Location, Jar, JarWithLocation } from './types';

// Reverse geocoding helper (simplified - in production use a real geocoding service)
async function reverseGeocode(lat: number, lon: number): Promise<string> {
  // For now, return a simple name based on coordinates
  // In production, you could use OpenStreetMap Nominatim API or similar
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      { 
        headers: { 'User-Agent': 'CrayfishMapApp' },
        signal: controller.signal
      }
    );
    
    clearTimeout(timeoutId);
    const data = await response.json();
    if (data.address) {
      const city = data.address.city || data.address.town || data.address.village || data.address.county || '';
      const state = data.address.state || '';
      return city && state ? `${city}, ${state}` : city || state || `Location ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('Geocoding error:', error);
    }
  }
  return `Location ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}\n\n` +
    `Please create a .env.local file in the project root with:\n` +
    `NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n` +
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n` +
    `After adding the variables, restart your development server.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all locations
export async function fetchLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
}

// Fetch jars for a specific location
export async function fetchJarsByLocation(locationId: string): Promise<Jar[]> {
  const { data, error } = await supabase
    .from('jars')
    .select('*')
    .eq('location_id', locationId)
    .order('collection_date', { ascending: false });

  if (error) {
    console.error('Error fetching jars:', error);
    return [];
  }

  return data || [];
}

// Fetch a single jar with location data
export async function fetchJarWithLocation(jarId: string): Promise<JarWithLocation | null> {
  const { data, error } = await supabase
    .from('jars')
    .select(`
      *,
      location:locations(*)
    `)
    .eq('id', jarId)
    .single();

  if (error) {
    console.error('Error fetching jar:', error);
    return null;
  }

  return data as JarWithLocation;
}

// Fetch all jars
export async function fetchAllJars(): Promise<Jar[]> {
  const { data, error } = await supabase
    .from('jars')
    .select('*')
    .order('collection_date', { ascending: false });

  if (error) {
    console.error('Error fetching jars:', error);
    return [];
  }

  return data || [];
}

// Group jars into locations based on proximity (within ~10km)
async function groupJarsIntoLocations(jars: Jar[]): Promise<{ locations: Location[], jarsWithLocations: JarWithLocation[] }> {
  const PROXIMITY_THRESHOLD = 0.1; // Approximately 10km in degrees
  const locations: Location[] = [];
  const jarsWithLocations: JarWithLocation[] = [];
  const processedJarIds = new Set<string>();

  // Helper function to calculate distance between two coordinates
  const distance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
  };

  // Process jars and group them
  for (const jar of jars) {
    if (processedJarIds.has(jar.id)) continue;

    // Find existing location within proximity (check both existing locations and jars already processed)
    let foundLocation: Location | null = null;
    
    // Check existing locations
    for (const loc of locations) {
      if (distance(jar.lat, jar.lon, loc.lat, loc.lon) < PROXIMITY_THRESHOLD) {
        foundLocation = loc;
        break;
      }
    }
    
    // If not found, check jars already processed (they might be in a location we haven't created yet)
    if (!foundLocation) {
      for (const existingJar of jarsWithLocations) {
        if (distance(jar.lat, jar.lon, existingJar.lat, existingJar.lon) < PROXIMITY_THRESHOLD) {
          foundLocation = existingJar.location;
          break;
        }
      }
    }

    if (!foundLocation) {
      // Create new location - use simple coordinate-based name for now to avoid geocoding delays
      // Geocoding can be added later if needed, but it causes performance issues with many jars
      const locationName = `Location ${jar.lat.toFixed(4)}, ${jar.lon.toFixed(4)}`;
      
      const newLocation: Location = {
        id: `loc-${jar.id}`,
        name: locationName,
        lat: jar.lat,
        lon: jar.lon,
      };
      locations.push(newLocation);
      foundLocation = newLocation;
    }

    // Add jar to location
    jarsWithLocations.push({
      ...jar,
      location: foundLocation,
    });
    processedJarIds.add(jar.id);
  }

  // Update location centers to average of all jars in that location
  locations.forEach((loc) => {
    const jarsInLocation = jarsWithLocations.filter(j => j.location.id === loc.id);
    if (jarsInLocation.length > 0) {
      const avgLat = jarsInLocation.reduce((sum, j) => sum + j.lat, 0) / jarsInLocation.length;
      const avgLon = jarsInLocation.reduce((sum, j) => sum + j.lon, 0) / jarsInLocation.length;
      loc.lat = avgLat;
      loc.lon = avgLon;
    }
  });

  return { locations, jarsWithLocations };
}

// Fetch all jars with auto-generated locations
export async function fetchAllJarsWithLocations(): Promise<{ locations: Location[], jars: JarWithLocation[] }> {
  const jars = await fetchAllJars();
  const { locations, jarsWithLocations } = await groupJarsIntoLocations(jars);
  return { locations, jars: jarsWithLocations };
}

