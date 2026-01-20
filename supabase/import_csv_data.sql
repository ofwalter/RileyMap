-- Imported from CSV: Crayfish Trog 2025-2026 - SORTED FOR MAP.csv
-- Generated: 2026-01-20T19:38:45.941Z
-- Groups individual specimens by jar code (or location/date) into jars

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
) VALUES (
    'Cray2019_234',
    32.84103,
    -80.12437,
    '2019-05-01',
    11,
    4,
    7,
    0,
    7,
    3,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_224',
    33.758077,
    -80.058477,
    '2019-05-04',
    12,
    4,
    8,
    0,
    3,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_314',
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
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_388',
    33.284252,
    -79.616924,
    '2019-05-25',
    13,
    9,
    4,
    0,
    2,
    3,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_194',
    33.13923,
    -80.950847,
    '2019-05-04',
    4,
    2,
    2,
    3,
    2,
    1,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_537',
    33.34346,
    -79.23802,
    '2019-11-18',
    2,
    0,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_197',
    33.708945,
    -80.05256,
    '2019-05-04',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_218',
    33.82445,
    -80.169257,
    '2019-05-04',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_203',
    33.724845,
    -80.957373,
    '2019-05-04',
    2,
    0,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_239',
    33.500044,
    -79.958492,
    '2019-05-04',
    4,
    3,
    1,
    0,
    1,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'CT_055',
    33.244488,
    -79.520632,
    '2019-05-25',
    5,
    5,
    0,
    1,
    1,
    2,
    1
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_228',
    32.765009,
    -80.447191,
    '2019-05-11',
    2,
    1,
    1,
    0,
    0,
    1,
    1
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_367',
    33.477345,
    -80.874284,
    '2019-06-16',
    2,
    1,
    1,
    0,
    1,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_227',
    33.139319,
    -80.339384,
    '2019-05-11',
    3,
    2,
    1,
    0,
    1,
    2,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_343',
    33.663113,
    -79.135584,
    '2019-05-28',
    2,
    1,
    1,
    1,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_534',
    32.79932,
    -79.89759,
    '2019-11-07',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_304',
    33.231733,
    -79.481915,
    '2019-05-18',
    5,
    4,
    1,
    2,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'CT_075',
    33.231833,
    -79.480719,
    '2019-05-23',
    7,
    4,
    3,
    1,
    0,
    2,
    2
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_505',
    32.87934,
    -79.77369,
    '2019-10-24',
    2,
    2,
    0,
    0,
    1,
    1,
    1
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_506',
    32.87934,
    -79.77369,
    '2019-10-22',
    1,
    1,
    0,
    0,
    1,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_519',
    32.8595428,
    -80.07751,
    '2019-10-23',
    1,
    0,
    1,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_564',
    32.89126,
    -79.79546,
    '2019-10-12',
    2,
    2,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_533',
    32.81553,
    -80.11628,
    '2019-11-07',
    3,
    3,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_419',
    32.90317,
    -79.82336,
    '2019-09-26',
    3,
    0,
    3,
    0,
    1,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_312',
    33.244488,
    -79.520632,
    '2019-04-20',
    3,
    3,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_344',
    33.24488,
    -79.520632,
    '2019-05-28',
    3,
    1,
    2,
    1,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_345',
    33.194481,
    -79.607289,
    '2019-05-25',
    3,
    1,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_240',
    32.725244,
    -79.941578,
    '2019-04-12',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_224',
    33.758077,
    -80.058478,
    '2019-05-04',
    12,
    3,
    9,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_535',
    32.89754,
    -79.813,
    '2019-10-31',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_555',
    32.7227,
    -79.9682,
    '2019-12-05',
    4,
    2,
    2,
    0,
    0,
    1,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_378',
    32.72256,
    -79.97005,
    '2019-08-28',
    4,
    1,
    3,
    0,
    0,
    1,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_237',
    32.7993,
    -79.897677,
    '2019-03-09',
    13,
    6,
    7,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_333',
    33.661482,
    -79.152658,
    '2019-05-28',
    13,
    10,
    3,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_563',
    32.7227,
    -79.9682,
    '2019-12-09',
    4,
    2,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_347',
    33.195594,
    -79.462458,
    '2019-05-25',
    4,
    3,
    1,
    0,
    2,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_493',
    32.745423,
    -79.940928,
    '2019-04-08',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_496',
    32.79928,
    -79.89762,
    '2019-10-10',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_325',
    33.131586,
    -79.608116,
    '2019-05-23',
    14,
    8,
    6,
    0,
    3,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_278',
    32.844563,
    -80.124694,
    '2019-05-15',
    3,
    2,
    1,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_350',
    33.284954,
    -79.61379,
    '2019-05-25',
    4,
    2,
    2,
    0,
    0,
    2,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_241',
    32.791893,
    -80.110368,
    '2019-04-27',
    10,
    3,
    7,
    0,
    0,
    3,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_186',
    32.790868,
    -80.112564,
    '2019-04-27',
    8,
    4,
    4,
    0,
    0,
    1,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2021_008',
    33.17216,
    -81.4501,
    '2019-02-01',
    8,
    3,
    5,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_570',
    33.7313,
    -79.27956,
    '2019-11-18',
    27,
    12,
    15,
    0,
    0,
    2,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_459',
    33.22996,
    -79.48109,
    '2019-10-03',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_223',
    32.827383,
    -80.132628,
    '2019-05-10',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_497',
    32.82577,
    -80.12537,
    '2019-10-08',
    1,
    0,
    1,
    0,
    0,
    0,
    1
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_181',
    32.83026,
    -80.13232,
    '2019-05-01',
    2,
    2,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_202',
    32.840846,
    -80.122833,
    '2019-05-02',
    1,
    1,
    0,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_168',
    32.335586,
    -80.128438,
    '2019-05-02',
    5,
    1,
    4,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_195',
    32.83155,
    -80.128667,
    '2019-05-01',
    5,
    2,
    3,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_263',
    32.831721,
    -80.1348281,
    '2019-05-10',
    8,
    3,
    5,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_231',
    32.83811,
    -80.12578,
    '2019-05-01',
    4,
    2,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_185',
    32.833412,
    -80.129599,
    '2019-05-02',
    10,
    6,
    4,
    1,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_184',
    32.836943,
    -80.126328,
    '2019-05-02',
    12,
    2,
    10,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_232',
    32.830534,
    -80.134748,
    '2019-05-10',
    10,
    3,
    7,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_234',
    32.825013,
    -80.129726,
    '2019-05-10',
    11,
    7,
    4,
    1,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_281',
    32.835782,
    -80.124814,
    '2019-05-15',
    4,
    3,
    1,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_290',
    32.836622,
    -80.130394,
    '2019-05-15',
    2,
    1,
    1,
    0,
    0,
    0,
    1
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_279',
    32.835313,
    -80.131682,
    '2019-05-15',
    4,
    1,
    3,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_106',
    33.155547,
    -79.767982,
    '2019-09-10',
    2,
    0,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_042',
    32.61739,
    -80.7094,
    '2019-10-04',
    6,
    4,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2021_004',
    32.87707,
    -81.42867,
    '2021-01-26',
    3,
    1,
    2,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray2019_317',
    33.244449,
    -79.520621,
    '2019-05-23',
    6,
    4,
    2,
    0,
    0,
    0,
    1
) ON CONFLICT (jar_code) DO UPDATE SET
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
) VALUES (
    'Cray_2019_566',
    32.8152,
    -80.1167,
    '2019-12-08',
    2,
    1,
    1,
    0,
    0,
    0,
    0
) ON CONFLICT (jar_code) DO UPDATE SET
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

-- Statistics:
-- Total jars created: 66
-- Jars imported: 66
-- Jars skipped: 0
-- Errors encountered: 24


-- Errors (first 50):
--   Row 304: Invalid or missing coordinates (Spec: CT_306)
--   Row 305: Invalid or missing coordinates (Spec: CT_307)
--   Row 306: Invalid or missing coordinates (Spec: CT_308)
--   Row 307: Invalid or missing coordinates (Spec: CT_309)
--   Row 318: Invalid date format (Spec: CT_320)
--   Row 319: Invalid date format (Spec: CT_321)
--   Row 320: Invalid date format (Spec: CT_322)
--   Row 321: Invalid date format (Spec: CT_323)
--   Row 322: Invalid date format (Spec: CT_324)
--   Row 323: Invalid date format (Spec: CT_325)
--   Row 324: Invalid date format (Spec: CT_326)
--   Row 325: Invalid date format (Spec: CT_327)
--   Row 326: Invalid date format (Spec: CT_328)
--   Row 327: Invalid date format (Spec: CT_329)
--   Row 328: Invalid date format (Spec: CT_330)
--   Row 329: Invalid date format (Spec: CT_331)
--   Row 330: Invalid date format (Spec: CT_332)
--   Row 331: Invalid date format (Spec: CT_333)
--   Row 332: Invalid date format (Spec: CT_334)
--   Row 333: Invalid date format (Spec: CT_335)
--   Row 334: Invalid or missing coordinates (Spec: CT_336)
--   Row 335: Invalid or missing coordinates (Spec: CT_337)
--   Row 336: Invalid or missing coordinates (Spec: CT_338)
--   Row 356: Invalid date format (Spec: CT_359)
