-- Crayfish Dissection Mapping Application Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jars table
CREATE TABLE IF NOT EXISTS jars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jar_code TEXT NOT NULL UNIQUE,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL,
    collection_date DATE NOT NULL,
    total_crayfish INT NOT NULL DEFAULT 0,
    num_males INT NOT NULL DEFAULT 0,
    num_females INT NOT NULL DEFAULT 0,
    infected_bd INT NOT NULL DEFAULT 0,
    infected_mc_l INT NOT NULL DEFAULT 0,
    infected_mc_s INT NOT NULL DEFAULT 0,
    infected_acanth INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jars_location_id ON jars(location_id);
CREATE INDEX IF NOT EXISTS idx_jars_collection_date ON jars(collection_date);
CREATE INDEX IF NOT EXISTS idx_jars_coordinates ON jars(lat, lon);
CREATE INDEX IF NOT EXISTS idx_locations_coordinates ON locations(lat, lon);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jars_updated_at BEFORE UPDATE ON jars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

