// Database type definitions

export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  created_at?: string;
  updated_at?: string;
}

export interface Jar {
  id: string;
  jar_code: string;
  location_id: string | null;
  lat: number;
  lon: number;
  collection_date: string;
  total_crayfish: number;
  num_males: number;
  num_females: number;
  infected_bd: number;
  infected_mc_l: number;
  infected_mc_s: number;
  infected_acanth: number;
  created_at?: string;
  updated_at?: string;
}

export interface JarWithLocation extends Jar {
  location: Location;
}

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

