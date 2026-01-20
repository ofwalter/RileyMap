const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = path.join(__dirname, '..', 'Crayfish Trog 2025-2026  - SORTED FOR MAP.csv');
let csvContent;
try {
  csvContent = fs.readFileSync(csvPath, 'utf-8');
} catch (error) {
  console.error('❌ Error reading CSV file:', error.message);
  process.exit(1);
}

const lines = csvContent.split('\n');

// Parse CSV (handles quoted fields and edge cases)
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

// Parse date from formats: "May-1-2019", "4-May-2019", "Nov-18-19", "YYYY-MM-DD", etc.
function parseDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return null;
  
  dateStr = dateStr.trim();
  
  // Fix obvious year typos (e.g., "21019" -> "2019")
  dateStr = dateStr.replace(/21019/g, '2019');
  dateStr = dateStr.replace(/21020/g, '2020');
  
  // Try YYYY-MM-DD format first
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1]);
    const month = parseInt(isoMatch[2]);
    const day = parseInt(isoMatch[3]);
    if (year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return dateStr;
    }
  }
  
  const monthNames = {
    'january': 1, 'jan': 1,
    'february': 2, 'feb': 2,
    'march': 3, 'mar': 3,
    'april': 4, 'apr': 4,
    'may': 5,
    'june': 6, 'jun': 6,
    'july': 7, 'jul': 7,
    'august': 8, 'aug': 8,
    'september': 9, 'sep': 9, 'sept': 9,
    'october': 10, 'oct': 10,
    'november': 11, 'nov': 11,
    'december': 12, 'dec': 12
  };
  
  // Try "Month-Day-Year" format (e.g., "May-1-2019")
  let dateMatch = dateStr.match(/^([a-z]+)-(\d+)-(\d{4})$/i);
  if (dateMatch) {
    const monthName = dateMatch[1].toLowerCase();
    const day = parseInt(dateMatch[2]);
    const year = parseInt(dateMatch[3]);
    const month = monthNames[monthName];
    
    if (month && year >= 1900 && year <= 2100 && day >= 1 && day <= 31) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }
  
  // Try "Day-Month-Year" format (e.g., "4-May-2019", "28-Aug-2019")
  dateMatch = dateStr.match(/^(\d+)-([a-z]+)-(\d{4})$/i);
  if (dateMatch) {
    const day = parseInt(dateMatch[1]);
    const monthName = dateMatch[2].toLowerCase();
    const year = parseInt(dateMatch[3]);
    const month = monthNames[monthName];
    
    if (month && year >= 1900 && year <= 2100 && day >= 1 && day <= 31) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }
  
  // Try "Month-Day-YY" format (e.g., "Nov-18-19" -> 2019)
  dateMatch = dateStr.match(/^([a-z]+)-(\d+)-(\d{2})$/i);
  if (dateMatch) {
    const monthName = dateMatch[1].toLowerCase();
    const day = parseInt(dateMatch[2]);
    const yearShort = parseInt(dateMatch[3]);
    const month = monthNames[monthName];
    
    // Convert 2-digit year to 4-digit (assume 2000s for years 00-99)
    const year = yearShort < 100 ? 2000 + yearShort : yearShort;
    
    if (month && year >= 1900 && year <= 2100 && day >= 1 && day <= 31) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }
  
  return null;
}

// Parse number, handling empty strings, "?", "N/A", "20+", etc.
function parseNumber(value) {
  if (!value || value === '' || value === '?' || value === 'N/A') return 0;
  
  // Handle "20+" format
  const plusMatch = value.toString().match(/^(\d+)\+$/);
  if (plusMatch) {
    return parseInt(plusMatch[1]);
  }
  
  // Handle values with "?" suffix like "1?"
  const questionMatch = value.toString().match(/^(\d+)\?$/);
  if (questionMatch) {
    return parseInt(questionMatch[1]);
  }
  
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

// Parse infection count (handles "1?", "1", "0", "20+", etc.)
// Returns 1 if infected (count > 0), 0 otherwise
function parseInfectionCount(value) {
  const count = parseNumber(value);
  return count > 0 ? 1 : 0;
}

// Extract coordinates from various formats
function extractCoordinates(coordsStr) {
  if (!coordsStr || coordsStr.trim() === '') return { lat: null, lon: null };
  
  coordsStr = coordsStr.trim();
  
  // Remove quotes if present
  coordsStr = coordsStr.replace(/^["']|["']$/g, '');
  
  // Remove trailing spaces and clean up
  coordsStr = coordsStr.trim();
  
  // Try format: "JarCode: 32.84103N, -80.12437W" or "JarCode: 32.84103N -80.12437W"
  // Also handles wrong format like "32.765009W, -80.447191W" (W for latitude is wrong)
  // Also handles missing decimal points like "33195594N" -> "33.195594N"
  let colonMatch = coordsStr.match(/:\s*([\d.]+)\s*([NSEW]?)\s*[, ]\s*(-?[\d.]+)\s*([NSEW]?)/i);
  if (colonMatch) {
    let latStr = colonMatch[1];
    let lonStr = colonMatch[3];
    
    // Fix missing decimal point in latitude (e.g., "33195594" -> "33.195594")
    if (!latStr.includes('.') && latStr.length > 6) {
      // If it's a large number without decimal, likely missing decimal point
      // For SC coordinates, latitude should be 32-34, so insert decimal after 2 digits
      if (latStr.length === 8 && latStr.startsWith('33')) {
        latStr = latStr.substring(0, 2) + '.' + latStr.substring(2);
      } else if (latStr.length === 8 && latStr.startsWith('32')) {
        latStr = latStr.substring(0, 2) + '.' + latStr.substring(2);
      }
    }
    
    let lat = parseFloat(latStr);
    let lon = parseFloat(lonStr);
    const latDir = colonMatch[2].toUpperCase();
    const lonDir = colonMatch[4].toUpperCase();
    
    // Fix wrong indicators (W/E for latitude should be N, S for latitude should be negative)
    // Latitude should be N/S, not W/E
    if (latDir === 'W' || latDir === 'E') {
      // Wrong indicator - latitude can't be W/E, assume N (positive) for SC
      lat = Math.abs(lat);
    } else if (latDir === 'S') {
      lat = -Math.abs(lat);
    } else if (latDir === 'N') {
      lat = Math.abs(lat);
    } else {
      // No indicator - assume N (positive) for SC
      lat = Math.abs(lat);
    }
    
    // Handle longitude direction
    if (lonDir === 'W') {
      lon = -Math.abs(lon);
    } else if (lonDir === 'E') {
      lon = Math.abs(lon);
    } else if (lon < 0) {
      // Already negative, keep it
      lon = lon;
    } else {
      // No indicator, assume W (negative) for SC
      lon = -Math.abs(lon);
    }
    
    if (!isNaN(lat) && !isNaN(lon)) {
      return { lat, lon };
    }
  }
  
  // Try format without colon: "32.84103N -79.97005W" (no comma)
  let noCommaMatch = coordsStr.match(/([\d.]+)\s*([NSEW]?)\s+(-?[\d.]+)\s*([NSEW]?)/i);
  if (noCommaMatch) {
    let latStr = noCommaMatch[1];
    let lonStr = noCommaMatch[3];
    
    // Fix missing decimal point in latitude
    if (!latStr.includes('.') && latStr.length > 6) {
      if (latStr.length === 8 && (latStr.startsWith('33') || latStr.startsWith('32'))) {
        latStr = latStr.substring(0, 2) + '.' + latStr.substring(2);
      }
    }
    
    let lat = parseFloat(latStr);
    let lon = parseFloat(lonStr);
    const latDir = noCommaMatch[2].toUpperCase();
    const lonDir = noCommaMatch[4].toUpperCase();
    
    if (latDir === 'W' || latDir === 'E') {
      lat = Math.abs(lat);
    } else if (latDir === 'S') {
      lat = -Math.abs(lat);
    } else if (latDir === 'N') {
      lat = Math.abs(lat);
    } else {
      lat = Math.abs(lat);
    }
    
    if (lonDir === 'W') {
      lon = -Math.abs(lon);
    } else if (lonDir === 'E') {
      lon = Math.abs(lon);
    } else if (lon < 0) {
      lon = lon;
    } else {
      lon = -Math.abs(lon);
    }
    
    if (!isNaN(lat) && !isNaN(lon)) {
      return { lat, lon };
    }
  }
  
  // Try format: "32.84103, -80.12437" (simple comma-separated, no indicators)
  const simpleMatch = coordsStr.match(/(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/);
  if (simpleMatch) {
    let lat = parseFloat(simpleMatch[1]);
    let lon = parseFloat(simpleMatch[2]);
    
    // For SC area, assume N (positive) and W (negative)
    if (lat < 0) lat = Math.abs(lat);
    if (lon > 0) lon = -lon;
    
    if (!isNaN(lat) && !isNaN(lon)) {
      return { lat, lon };
    }
  }
  
  return { lat: null, lon: null };
}

// Group specimens into jars
// A "jar" is identified by the Jar # column, or grouped by location (lat/lon) and collection date
const jarGroups = new Map(); // key: jar_code -> jar data
const errors = [];

// Find header row
let headerRowIndex = -1;
let headerCols = [];
for (let i = 0; i < Math.min(10, lines.length); i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length >= 10) {
    // Check if this looks like a header row
    const firstCol = cols[0]?.toLowerCase();
    if (firstCol === 'spec#' || firstCol === 'spec' || firstCol.includes('spec')) {
      headerRowIndex = i;
      headerCols = cols.map(c => c?.toLowerCase().trim());
      break;
    }
  }
}

if (headerRowIndex === -1) {
  console.error('❌ Could not find header row. Expected columns: Spec#, Date coll, Jar #, Tag # individ, M/F, mm, BD, MC(L), MC(S), ACANTH, Coordinates');
  process.exit(1);
}

// Map column indices
const colMap = {
  spec: headerCols.findIndex(c => c.includes('spec')),
  dateColl: headerCols.findIndex(c => c.includes('date') && c.includes('coll')),
  jar: headerCols.findIndex(c => c.includes('jar')),
  tag: headerCols.findIndex(c => c.includes('tag')),
  sex: headerCols.findIndex(c => c === 'm/f' || c.includes('sex')),
  length: headerCols.findIndex(c => c === 'mm' || c.includes('length')),
  bd: headerCols.findIndex(c => c === 'bd' || c.includes('bd')),
  mcL: headerCols.findIndex(c => c.includes('mc') && c.includes('l')),
  mcS: headerCols.findIndex(c => c.includes('mc') && c.includes('s')),
  acanth: headerCols.findIndex(c => c.includes('acanth')),
  coordinates: headerCols.findIndex(c => c.includes('coord'))
};

// Validate required columns
const requiredCols = ['spec', 'dateColl', 'jar', 'sex', 'coordinates'];
for (const col of requiredCols) {
  if (colMap[col] === -1) {
    console.error(`❌ Missing required column: ${col}`);
    process.exit(1);
  }
}

// Process data rows
for (let i = headerRowIndex + 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line === '') continue;
  
  const cols = parseCSVLine(line);
  if (cols.length < Math.max(...Object.values(colMap).filter(v => v !== -1)) + 1) {
    errors.push({ row: i + 1, error: 'Insufficient columns', data: line.substring(0, 50) });
    continue;
  }
  
  const specNum = cols[colMap.spec]?.trim();
  const dateColl = cols[colMap.dateColl]?.trim();
  const jarCode = cols[colMap.jar]?.trim();
  const tag = colMap.tag !== -1 ? cols[colMap.tag]?.trim() : '';
  const sex = cols[colMap.sex]?.trim().toUpperCase();
  const length = colMap.length !== -1 ? cols[colMap.length]?.trim() : '';
  const bdCount = colMap.bd !== -1 ? cols[colMap.bd]?.trim() : '';
  const largeCount = colMap.mcL !== -1 ? cols[colMap.mcL]?.trim() : '';
  const smallCount = colMap.mcS !== -1 ? cols[colMap.mcS]?.trim() : '';
  const acanthCount = colMap.acanth !== -1 ? cols[colMap.acanth]?.trim() : '';
  const coordinates = cols[colMap.coordinates]?.trim();
  
  // Skip rows with invalid data markers
  if (length && length.toUpperCase().includes('TOO DAMAGED')) {
    errors.push({ row: i + 1, error: 'Skipped: TOO DAMAGED', spec: specNum });
    continue;
  }
  
  // Extract coordinates
  const { lat, lon } = extractCoordinates(coordinates);
  if (!lat || !lon) {
    errors.push({ row: i + 1, error: 'Invalid or missing coordinates', spec: specNum, coords: coordinates });
    continue;
  }
  
  // Validate coordinates (South Carolina area roughly 32-34N, 79-81W)
  if (lat < 30 || lat > 35 || Math.abs(lon) < 79 || Math.abs(lon) > 82) {
    errors.push({ row: i + 1, error: 'Coordinates out of range', spec: specNum, lat, lon });
    continue;
  }
  
  // Parse date
  const collectionDate = parseDate(dateColl);
  if (!collectionDate) {
    errors.push({ row: i + 1, error: 'Invalid date format', spec: specNum, date: dateColl });
    continue;
  }
  
  // Extract jar code from coordinates if available (more reliable)
  let jarCodeFromCoords = null;
  if (coordinates) {
    const coordMatch = coordinates.match(/^([^:]+):/);
    if (coordMatch) {
      jarCodeFromCoords = coordMatch[1].trim();
    }
  }
  
  // Determine jar code - prefer coordinates column, then Jar # column
  let finalJarCode = jarCodeFromCoords || jarCode;
  
  // Clean up jar code variations first
  if (finalJarCode === 'Cray2019_(?)' || finalJarCode === 'Cray2019_()') {
    finalJarCode = 'Cray2019_?';
  }
  
  // If jar code is empty, '?', or 'Cray2019_?', try to find a better one
  if (!finalJarCode || finalJarCode === '' || finalJarCode === '?' || finalJarCode === 'Cray2019_?') {
    // Fallback: use spec number or generate from coordinates
    if (specNum && specNum !== '' && specNum !== '?') {
      finalJarCode = specNum;
    } else {
      finalJarCode = `Jar_${lat.toFixed(5)}_${Math.abs(lon).toFixed(5)}_${collectionDate}`;
    }
  }
  
  // Group by location + date (this defines a jar), not just jar_code
  // Same jar_code can appear with different locations/dates = separate jars
  const jarKey = `${lat.toFixed(6)}_${lon.toFixed(6)}_${collectionDate}`;
  
  // Initialize jar if not exists
  if (!jarGroups.has(jarKey)) {
    jarGroups.set(jarKey, {
      jar_code: finalJarCode,
      lat: lat,
      lon: lon,
      collection_date: collectionDate,
      total_crayfish: 0,
      num_males: 0,
      num_females: 0,
      infected_bd: 0,
      infected_mc_l: 0,
      infected_mc_s: 0,
      infected_acanth: 0,
      specimens: []
    });
  }
  
  const jar = jarGroups.get(jarKey);
  
  // If jar_code is '?' or empty, try to use a better one from this row
  // Prefer jar codes that don't contain '?'
  if (jar.jar_code && (jar.jar_code.includes('?') || jar.jar_code === 'Cray2019_?')) {
    if (finalJarCode && !finalJarCode.includes('?') && finalJarCode !== 'Cray2019_?') {
      jar.jar_code = finalJarCode;
    }
  } else if (!jar.jar_code || jar.jar_code === '') {
    jar.jar_code = finalJarCode;
  }
  
  // Count this specimen
  jar.total_crayfish++;
  
  // Track specimen
  if (specNum && specNum !== '' && specNum !== '?') {
    jar.specimens.push(specNum);
  }
  
  // Count sex
  if (sex === 'M' || sex === 'MALE') {
    jar.num_males++;
  } else if (sex === 'F' || sex === 'FEMALE') {
    jar.num_females++;
  }
  
  // Count infections (if count > 0, mark as infected)
  if (parseInfectionCount(bdCount) > 0) jar.infected_bd++;
  if (parseInfectionCount(largeCount) > 0) jar.infected_mc_l++;
  if (parseInfectionCount(smallCount) > 0) jar.infected_mc_s++;
  if (parseInfectionCount(acanthCount) > 0) jar.infected_acanth++;
}

// Generate SQL
const sqlStatements = [];
const skippedJars = [];

for (const [jarKey, jar] of jarGroups) {
  // Skip jars without essential data
  if (!jar.lat || !jar.lon || !jar.collection_date || !jar.jar_code) {
    skippedJars.push({
      jar_code: jar.jar_code || jarKey,
      reason: 'Missing essential data'
    });
    continue;
  }
  
  // Escape single quotes in jar_code
  const escapedJarCode = jar.jar_code.replace(/'/g, "''");
  
  // Ensure all numeric values are properly set (no undefined)
  const lat = jar.lat ?? 0;
  const lon = jar.lon ?? 0;
  const totalCrayfish = jar.total_crayfish ?? 0;
  const numMales = jar.num_males ?? 0;
  const numFemales = jar.num_females ?? 0;
  const infectedBd = jar.infected_bd ?? 0;
  const infectedMcL = jar.infected_mc_l ?? 0;
  const infectedMcS = jar.infected_mc_s ?? 0;
  const infectedAcanth = jar.infected_acanth ?? 0;
  
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
    ${lat},
    ${lon},
    '${jar.collection_date}',
    ${totalCrayfish},
    ${numMales},
    ${numFemales},
    ${infectedBd},
    ${infectedMcL},
    ${infectedMcS},
    ${infectedAcanth}
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
const sqlContent = `-- Imported from CSV: Crayfish Trog 2025-2026 - SORTED FOR MAP.csv
-- Generated: ${new Date().toISOString()}
-- Groups individual specimens by jar code (or location/date) into jars

${sqlStatements.join('\n\n')}

-- Statistics:
-- Total jars created: ${jarGroups.size}
-- Jars imported: ${sqlStatements.length}
-- Jars skipped: ${skippedJars.length}
-- Errors encountered: ${errors.length}
${skippedJars.length > 0 ? `\n-- Skipped jars:\n${skippedJars.map(j => `--   - ${j.jar_code}: ${j.reason}`).join('\n')}` : ''}
${errors.length > 0 ? `\n-- Errors (first 50):\n${errors.slice(0, 50).map(e => `--   Row ${e.row}: ${e.error}${e.spec ? ` (Spec: ${e.spec})` : ''}`).join('\n')}` : ''}
`;

fs.writeFileSync(sqlPath, sqlContent, 'utf-8');

console.log('✅ Generated SQL file:', sqlPath);
console.log('\n📊 Statistics:');
console.log(`   - Total jars found: ${jarGroups.size}`);
console.log(`   - Jars imported: ${sqlStatements.length}`);
console.log(`   - Jars skipped: ${skippedJars.length}`);
console.log(`   - Errors encountered: ${errors.length}`);

if (skippedJars.length > 0) {
  console.log('\n⚠️  Skipped jars:');
  skippedJars.forEach(jar => {
    console.log(`   - ${jar.jar_code}: ${jar.reason}`);
  });
}

if (errors.length > 0) {
  console.log('\n⚠️  Errors (showing first 20):');
  errors.slice(0, 20).forEach(err => {
    console.log(`   Row ${err.row}: ${err.error}${err.spec ? ` (Spec: ${err.spec})` : ''}`);
  });
  if (errors.length > 20) {
    console.log(`   ... and ${errors.length - 20} more errors`);
  }
}
