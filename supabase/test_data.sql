-- Test data for Crayfish Dissection Mapping Application
-- Generated from new CSV format (individual specimens grouped by location+date)

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE jars CASCADE;
-- TRUNCATE TABLE locations CASCADE;

-- Insert test jars (locations will be created dynamically by the application)
-- These represent groups of specimens collected at the same location on the same date

INSERT INTO jars (
    jar_code,
    lat,
    lon,
    collection_date,
    total_crayfish,
    num_males,
    num_females,
    infected_bd,
    infected_mc_l,
    infected_mc_s,
    infected_acanth
) VALUES 
-- Jar 1: Multiple specimens from same location/date
(
    'CT_004_to_CT_014',
    32.84103,
    -80.12437,
    '2019-05-01',
    11,
    5,
    6,
    0,
    8,
    8,
    0
),
-- Jar 2: Single specimen
(
    'CT_015',
    32.84103,
    -80.12437,
    '2019-05-04',
    1,
    0,
    1,
    0,
    1,
    1,
    0
),
-- Jar 3: Large group with infections
(
    'CT_016_to_CT_115',
    33.758077,
    -80.058477,
    '2019-05-04',
    23,
    7,
    16,
    1,
    3,
    17,
    0
),
-- Jar 4: Acanth infection
(
    'CT_027',
    32.44488,
    -79.520632,
    '2019-05-20',
    1,
    0,
    1,
    0,
    0,
    0,
    1
),
-- Jar 5: Group with multiple infections
(
    'CT_028_to_CT_040',
    33.284252,
    -79.616924,
    '2019-05-25',
    13,
    8,
    5,
    0,
    8,
    9,
    0
),
-- Jar 6: BD infection
(
    'CT_042_to_CT_044',
    33.13923,
    -80.950847,
    '2019-05-04',
    4,
    2,
    2,
    3,
    3,
    2,
    0
)
ON CONFLICT (jar_code) DO UPDATE SET
    lat = EXCLUDED.lat,
    lon = EXCLUDED.lon,
    collection_date = EXCLUDED.collection_date,
    total_crayfish = EXCLUDED.total_crayfish,
    num_males = EXCLUDED.num_males,
    num_females = EXCLUDED.num_females,
    infected_bd = EXCLUDED.infected_bd,
    infected_mc_l = EXCLUDED.infected_mc_l,
    infected_mc_s = EXCLUDED.infected_mc_s,
    infected_acanth = EXCLUDED.infected_acanth;

