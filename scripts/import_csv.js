const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = path.join(__dirname, '..', 'Crayfish Trog 2025-2026  - Raw Data.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n');

// Parse CSV (simple parser - handles quoted fields)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Parse date (already in YYYY-MM-DD format)
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Validate YYYY-MM-DD format
  const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    const year = parseInt(dateMatch[1]);
    const month = parseInt(dateMatch[2]);
    const day = parseInt(dateMatch[3]);
    
    // Basic validation
    if (year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return dateStr;
    }
  }
  
  return null;
}

// Parse number, handling empty strings and "?" values
function parseNumber(value) {
  if (!value || value === '' || value === '?' || value === 'N/A') return 0;
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

// Parse infection count (handles "1?", "1", "0", etc.)
function parseInfectionCount(value) {
  if (!value || value === '' || value === '?') return 0;
  const num = parseFloat(value);
  return isNaN(num) ? 0 : (num > 0 ? 1 : 0); // Convert any positive number to 1 (infected)
}

// Group specimens into jars
// A "jar" is a group of specimens collected at the same location (lat/lon) on the same date
const jarGroups = new Map(); // key: "lat_lon_date" -> jar data

// Skip header row (line 0)
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line === '') continue;
  
  const cols = parseCSVLine(line);
  if (cols.length < 11) continue; // Need at least 11 columns
  
  const specNum = cols[0]?.trim(); // Spec#
  const dateColl = cols[1]?.trim(); // Date_Coll
  const tag = cols[2]?.trim(); // Tag#
  const sex = cols[3]?.trim().toUpperCase(); // Sex
  const length = cols[4]?.trim(); // Length
  const bdCount = cols[5]?.trim(); // BD_Count
  const largeCount = cols[6]?.trim(); // Large_Count
  const smallCount = cols[7]?.trim(); // Small_Count
  const acanthCount = cols[8]?.trim(); // Acanth_Count
  const lat = cols[9]?.trim(); // Latitude
  const lon = cols[10]?.trim(); // Longitude
  
  // Skip rows without coordinates
  if (!lat || !lon) continue;
  
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  
  // Validate coordinates (South Carolina area roughly 32-34N, 79-81W)
  if (isNaN(latNum) || isNaN(lonNum) || latNum < 30 || latNum > 35 || Math.abs(lonNum) < 79 || Math.abs(lonNum) > 82) {
    continue;
  }
  
  // Parse date
  const collectionDate = parseDate(dateColl);
  if (!collectionDate) continue;
  
  // Create unique key for jar grouping: lat_lon_date
  const jarKey = `${latNum}_${lonNum}_${collectionDate}`;
  
  // Initialize jar if not exists
  if (!jarGroups.has(jarKey)) {
    jarGroups.set(jarKey, {
      lat: latNum,
      lon: lonNum,
      collection_date: collectionDate,
      total_crayfish: 0,
      num_males: 0,
      num_females: 0,
      infected_bd: 0,
      infected_mc_l: 0,
      infected_mc_s: 0,
      infected_acanth: 0,
      specimens: [] // Track specimen numbers for jar_code generation
    });
  }
  
  const jar = jarGroups.get(jarKey);
  
  // Count this specimen
  jar.total_crayfish++;
  
  // Count sex
  if (sex === 'M') {
    jar.num_males++;
  } else if (sex === 'F') {
    jar.num_females++;
  }
  
  // Count infections (if count > 0, mark as infected)
  if (parseInfectionCount(bdCount) > 0) jar.infected_bd++;
  if (parseInfectionCount(largeCount) > 0) jar.infected_mc_l++;
  if (parseInfectionCount(smallCount) > 0) jar.infected_mc_s++;
  if (parseInfectionCount(acanthCount) > 0) jar.infected_acanth++;
  
  // Track specimen number for jar_code
  if (specNum) {
    jar.specimens.push(specNum);
  }
}

// Generate jar codes from specimen numbers
// Use first specimen number
for (const [jarKey, jar] of jarGroups) {
  if (jar.specimens.length === 0) {
    // Fallback: use coordinates and date
    jar.jar_code = `Jar_${jar.lat.toFixed(5)}_${Math.abs(jar.lon).toFixed(5)}_${jar.collection_date}`;
  } else {
    // Use first specimen number
    jar.jar_code = jar.specimens[0];
  }
}

// Generate SQL
const sqlStatements = [];
const skippedJars = [];

for (const [jarKey, jar] of jarGroups) {
  // Skip jars without essential data
  if (!jar.lat || !jar.lon || !jar.collection_date) {
    skippedJars.push({
      jar_code: jar.jar_code || jarKey,
      reason: 'Missing essential data'
    });
    continue;
  }
  
  // Escape single quotes in jar_code
  const escapedJarCode = jar.jar_code.replace(/'/g, "''");
  
  sqlStatements.push(`INSERT INTO jars (
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
    '${escapedJarCode}',
    ${jar.lat},
    ${jar.lon},
    '${jar.collection_date}',
    ${jar.total_crayfish},
    ${jar.num_males},
    ${jar.num_females},
    ${jar.infected_bd},
    ${jar.infected_mc_l},
    ${jar.infected_mc_s},
    ${jar.infected_acanth}
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
    infected_acanth = EXCLUDED.infected_acanth;`);
}

// Write SQL file
const sqlPath = path.join(__dirname, '..', 'supabase', 'import_csv_data.sql');
const sqlContent = `-- Imported from CSV: Crayfish Trog 2025-2026 - Raw Data.csv
-- Generated: ${new Date().toISOString()}
-- Groups individual specimens by location (lat/lon) and collection date into jars

${sqlStatements.join('\n\n')}

-- Statistics:
-- Total jars created: ${jarGroups.size}
-- Jars imported: ${sqlStatements.length}
-- Jars skipped: ${skippedJars.length}
${skippedJars.length > 0 ? `\n-- Skipped jars:\n${skippedJars.map(j => `--   - ${j.jar_code}: ${j.reason}`).join('\n')}` : ''}
`;

fs.writeFileSync(sqlPath, sqlContent, 'utf-8');

console.log('✅ Generated SQL file:', sqlPath);
console.log('\n📊 Statistics:');
console.log(`   - Total jars found: ${jarGroups.size}`);
console.log(`   - Jars imported: ${sqlStatements.length}`);
console.log(`   - Jars skipped: ${skippedJars.length}`);

if (skippedJars.length > 0) {
  console.log('\n⚠️  Skipped jars:');
  skippedJars.forEach(jar => {
    console.log(`   - ${jar.jar_code}: ${jar.reason}`);
  });
}
