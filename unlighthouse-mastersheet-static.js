const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Master sheet configuration for static configs only
const MASTER_SHEET_NAME = 'A11y Scans - Static Configs Master Sheet';
const PARENT_FOLDER_ID = '1-8FGgtrPBH7aZrMxVlAkxooHXSzDv-w_';

// Custom logger implementation
const unlighthouseLogger = {
    debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.info(`[INFO] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
};

// Agency mapping cache
let agencyMappingCache = null;

/**
 * Fetches agency data from GSA DAP API
 * @returns {Promise<Object>} - Agency mapping object
 */
async function fetchAgencyMapping() {
    if (agencyMappingCache) {
        return agencyMappingCache;
    }
    
    try {
        unlighthouseLogger.info('Fetching agency data from GSA DAP API...');
        const response = await axios.get('https://open.gsa.gov/api/dap/', {
            timeout: 10000,
            headers: {
                'User-Agent': 'A11y-Scans-Tool/1.0'
            }
        });
        
        const agencies = response.data.agencies || {};
        
        // Create a mapping from domain to agency name
        const domainToAgency = {};
        
        Object.entries(agencies).forEach(([agencyKey, agencyData]) => {
            const agencyName = agencyData.name || agencyKey;
            
            // Add direct mapping for the agency key
            domainToAgency[agencyKey.toLowerCase()] = agencyName;
            
            // If there are domains listed, map those too
            if (agencyData.domains && Array.isArray(agencyData.domains)) {
                agencyData.domains.forEach(domain => {
                    domainToAgency[domain.toLowerCase()] = agencyName;
                });
            }
        });
        
        // Add common patterns that might not be in the API
        const commonMappings = {
            'va': 'Department of Veterans Affairs',
            'veterans': 'Department of Veterans Affairs',
            'usda': 'Department of Agriculture',
            'agriculture': 'Department of Agriculture',
            'sec': 'Securities and Exchange Commission',
            'cms': 'Centers for Medicare & Medicaid Services',
            'medicare': 'Centers for Medicare & Medicaid Services',
            'medicaid': 'Centers for Medicare & Medicaid Services',
            'hhs': 'Department of Health and Human Services',
            'dod': 'Department of Defense',
            'defense': 'Department of Defense',
            'dhs': 'Department of Homeland Security',
            'homeland': 'Department of Homeland Security',
            'dot': 'Department of Transportation',
            'transportation': 'Department of Transportation',
            'epa': 'Environmental Protection Agency',
            'gsa': 'General Services Administration',
            'nasa': 'National Aeronautics and Space Administration',
            'nist': 'National Institute of Standards and Technology',
            'nih': 'National Institutes of Health',
            'noaa': 'National Oceanic and Atmospheric Administration',
            'sba': 'Small Business Administration',
            'ssa': 'Social Security Administration',
            'treasury': 'Department of the Treasury',
            'ed': 'Department of Education',
            'education': 'Department of Education',
            'energy': 'Department of Energy',
            'justice': 'Department of Justice',
            'labor': 'Department of Labor',
            'state': 'Department of State'
        };
        
        // Merge with common mappings (API data takes precedence)
        Object.entries(commonMappings).forEach(([key, value]) => {
            if (!domainToAgency[key]) {
                domainToAgency[key] = value;
            }
        });
        
        agencyMappingCache = domainToAgency;
        unlighthouseLogger.info(`Loaded ${Object.keys(domainToAgency).length} agency mappings from GSA DAP API`);
        
        return domainToAgency;
        
    } catch (error) {
        unlighthouseLogger.warn(`Failed to fetch agency data from GSA DAP API: ${error.message}`);
        
        // Fallback to static mappings if API fails
        const fallbackMappings = {
            'va': 'Department of Veterans Affairs',
            'usda': 'Department of Agriculture',
            'sec': 'Securities and Exchange Commission',
            'cms': 'Centers for Medicare & Medicaid Services',
            'hhs': 'Department of Health and Human Services',
            'dod': 'Department of Defense',
            'dhs': 'Department of Homeland Security',
            'dot': 'Department of Transportation',
            'epa': 'Environmental Protection Agency',
            'gsa': 'General Services Administration',
            'nasa': 'National Aeronautics and Space Administration',
            'nist': 'National Institute of Standards and Technology',
            'nih': 'National Institutes of Health',
            'noaa': 'National Oceanic and Atmospheric Administration',
            'sba': 'Small Business Administration',
            'ssa': 'Social Security Administration',
            'treasury': 'Department of the Treasury',
            'ed': 'Department of Education',
            'energy': 'Department of Energy',
            'justice': 'Department of Justice',
            'labor': 'Department of Labor',
            'state': 'Department of State'
        };
        
        agencyMappingCache = fallbackMappings;
        return fallbackMappings;
    }
}

/**
 * Extracts agency name from domain and config filename using GSA DAP API data
 * @param {string} url - URL to extract agency from
 * @param {string} configFile - Config filename for additional context
 * @returns {Promise<string>} - Agency name
 */
async function extractAgencyFromDomain(url, configFile = null) {
    try {
        const agencyMapping = await fetchAgencyMapping();
        
        let domain;
        try {
            const urlObj = new URL(url.includes('://') ? url : `https://${url}`);
            domain = urlObj.hostname.toLowerCase().replace(/^www\./, '');
        } catch (e) {
            domain = url.toLowerCase().replace(/^www\./, '');
        }
        
        // Try exact domain match first
        if (agencyMapping[domain]) {
            return agencyMapping[domain];
        }
        
        // Try subdomain matches (e.g., subdomain.agency.gov -> agency)
        const domainParts = domain.split('.');
        for (let i = 0; i < domainParts.length - 1; i++) {
            const partialDomain = domainParts.slice(i).join('.');
            if (agencyMapping[partialDomain]) {
                return agencyMapping[partialDomain];
            }
        }
        
        // Try individual parts (for cases like "va.gov" -> "va")
        for (const part of domainParts) {
            if (agencyMapping[part] && part !== 'gov') {
                return agencyMapping[part];
            }
        }
        
        // If we have a config filename, try to extract agency from it
        if (configFile) {
            const filenameParts = configFile.replace('.config.js', '').split('-');
            
            // Check for specific agency patterns in filename
            const agencyPatterns = {
                'securities-exchange-commission': 'Securities and Exchange Commission',
                'national-science-foundation': 'National Science Foundation',
                'veterans-affairs': 'Department of Veterans Affairs',
                'health-human-services': 'Department of Health and Human Services',
                'transportation': 'Department of Transportation',
                'homeland-security': 'Department of Homeland Security',
                'general-services-administration': 'General Services Administration',
                'agriculture': 'Department of Agriculture',
                'defense': 'Department of Defense',
                'energy': 'Department of Energy',
                'interior': 'Department of the Interior',
                'justice': 'Department of Justice',
                'labor': 'Department of Labor',
                'treasury': 'Department of the Treasury',
                'commerce': 'Department of Commerce',
                'housing-urban-development': 'Department of Housing and Urban Development',
                'education': 'Department of Education',
                'state': 'Department of State',
                'environmental-protection-agency': 'Environmental Protection Agency',
                'national-aeronautics-space-administration': 'National Aeronautics and Space Administration',
                'national-archives-records-administration': 'National Archives and Records Administration'
            };
            
            // Try to match agency patterns from longest to shortest
            const sortedPatterns = Object.keys(agencyPatterns)
                .sort((a, b) => b.length - a.length);
                
            for (const pattern of sortedPatterns) {
                if (configFile.includes(pattern)) {
                    return agencyPatterns[pattern];
                }
            }
        }
        
        // Fallback to domain-based extraction
        if (domain.includes('.gov')) {
            const mainDomain = domain.replace('.gov', '').split('.').pop();
            if (agencyMapping[mainDomain]) {
                return agencyMapping[mainDomain];
            }
            // Return formatted version if no mapping found
            return `${mainDomain.toUpperCase()} Agency`;
        }
        
        return 'Unknown Agency';
        
    } catch (error) {
        unlighthouseLogger.warn(`Error extracting agency from domain: ${error.message}`);
        return 'Unknown Agency';
    }
}

/**
 * Normalizes a domain name by removing chunk suffixes (-part1, -part2, etc.)
 * This allows chunked scans of the same domain to be consolidated into one sheet
 * @param {string} domain - Domain name that may contain chunk suffixes
 * @returns {string} - Normalized domain name without chunk suffixes
 */
function normalizeDomainForSheet(domain) {
    // Remove chunk suffixes like -part1, -part2, -part3, etc.
    return domain.replace(/-part\d+$/i, '');
}

/**
 * Creates a safe sheet name from agency name
 * @param {string} agencyName - Full agency name
 * @returns {string} - Safe sheet name (max 100 characters, no invalid chars)
 */
function createSafeSheetName(agencyName) {
    // Remove invalid characters and truncate to 100 characters
    const safeNameMap = {
        'Department of Veterans Affairs': 'Veterans Affairs',
        'Department of Agriculture': 'Agriculture',
        'Department of Health and Human Services': 'Health & Human Services',
        'Department of Defense': 'Defense',
        'Department of Homeland Security': 'Homeland Security',
        'Department of Transportation': 'Transportation',
        'Department of the Treasury': 'Treasury',
        'Department of Education': 'Education',
        'Department of Energy': 'Energy',
        'Department of Justice': 'Justice',
        'Department of Labor': 'Labor',
        'Department of State': 'State',
        'Securities and Exchange Commission': 'SEC',
        'Centers for Medicare & Medicaid Services': 'CMS',
        'Environmental Protection Agency': 'EPA',
        'General Services Administration': 'GSA',
        'National Aeronautics and Space Administration': 'NASA',
        'National Institute of Standards and Technology': 'NIST',
        'National Institutes of Health': 'NIH',
        'National Oceanic and Atmospheric Administration': 'NOAA',
        'Small Business Administration': 'SBA',
        'Social Security Administration': 'SSA'
    };
    
    // Use shortened name if available, otherwise clean the original
    const shortName = safeNameMap[agencyName] || agencyName;
    
    return shortName
        .replace(/[\/\\\?\*\[\]]/g, '') // Remove invalid characters
        .substring(0, 100) // Limit to 100 characters
        .trim();
}

/**
 * Ensures an agency sheet exists
 * @param {Object} sheets - Google Sheets API object
 * @param {string} masterSheetId - Master sheet ID
 * @param {string} agencyName - Agency name
 * @returns {Promise<string>} - Sheet name
 */
async function ensureAgencySheetExists(sheets, masterSheetId, agencyName) {
    const sheetName = createSafeSheetName(agencyName);
    
    try {
        // Get existing sheets
        const sheetMetadata = await sheets.spreadsheets.get({
            spreadsheetId: masterSheetId,
            fields: 'sheets(properties)'
        });
        
        const existingSheet = sheetMetadata.data.sheets.find(sheet => 
            sheet.properties.title === sheetName
        );
        
        if (existingSheet) {
            return sheetName;
        }
        
        // Create new agency sheet
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: masterSheetId,
            resource: {
                requests: [{
                    addSheet: {
                        properties: {
                            title: sheetName,
                            index: 1 // Add after Master Tracker
                        }
                    }
                }]
            }
        });
        
        // Add headers to the new agency sheet
        await sheets.spreadsheets.values.update({
            spreadsheetId: masterSheetId,
            range: `${sheetName}!A1:F1`,
            valueInputOption: 'RAW',
            resource: {
                values: [['Domain', 'Config File', 'Sheet Name', 'Sheet URL', 'Last Scan Date', 'Site URL']]
            }
        });
        
        unlighthouseLogger.info(`Created agency sheet: ${sheetName}`);
        return sheetName;
        
    } catch (error) {
        unlighthouseLogger.error(`Error ensuring agency sheet exists: ${error.message}`);
        throw error;
    }
}

/**
 * Finds or creates the static master sheet
 * @param {Object} auth - Google auth object
 * @returns {Promise<string>} - Master sheet ID
 */
async function findOrCreateStaticMasterSheet(auth) {
    const drive = google.drive({ version: 'v3', auth });
    
    try {
        // First, search for existing master sheet
        const existingFiles = await drive.files.list({
            q: `name='${MASTER_SHEET_NAME}' and mimeType='application/vnd.google-apps.spreadsheet' and parents in '${PARENT_FOLDER_ID}'`,
            fields: 'files(id, name)',
        });

        if (existingFiles.data.files.length > 0) {
            unlighthouseLogger.info(`Found existing static master sheet: ${MASTER_SHEET_NAME}`);
            return existingFiles.data.files[0].id;
        }

        // Create new master sheet if it doesn't exist
        unlighthouseLogger.info(`Creating new static master sheet: ${MASTER_SHEET_NAME}`);
        
        const sheets = google.sheets({ version: 'v4', auth });
        
        // Create a new spreadsheet
        const spreadsheet = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: MASTER_SHEET_NAME
                },
                sheets: [{
                    properties: {
                        title: 'Static Config Tracker',
                        index: 0
                    }
                }]
            }
        });
        
        const spreadsheetId = spreadsheet.data.spreadsheetId;
        
        // Move to the correct folder
        await drive.files.update({
            fileId: spreadsheetId,
            addParents: PARENT_FOLDER_ID,
            removeParents: 'root'
        });
        
        // Add headers to the Static Config Tracker sheet
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: 'Static Config Tracker!A1:G1',
            valueInputOption: 'RAW',
            resource: {
                values: [['Agency', 'Domain', 'Config File', 'Sheet Name', 'Sheet URL', 'Last Scan Date', 'Site URL']]
            }
        });
        
        unlighthouseLogger.info(`Created static master sheet with ID: ${spreadsheetId}`);
        return spreadsheetId;
        
    } catch (error) {
        unlighthouseLogger.error(`Error finding or creating static master sheet: ${error.message}`);
        throw error;
    }
}

/**
 * Reads static config files and extracts information
 * @returns {Promise<Array>} - Array of static config data
 */
async function getStaticConfigData() {
    const configsDir = path.join(__dirname, 'configs/validated');
    const staticConfigs = [];
    
    try {
        if (!fs.existsSync(configsDir)) {
            unlighthouseLogger.warn(`Configs directory not found: ${configsDir}`);
            return [];
        }
        
        const files = fs.readdirSync(configsDir);
        const configFiles = files.filter(file => file.endsWith('.config.js'));
        
        unlighthouseLogger.info(`Found ${configFiles.length} static config files`);
        
        for (const file of configFiles) {
            try {
                const filePath = path.join(configsDir, file);
                // Delete from require cache if it exists to get fresh data
                delete require.cache[require.resolve(filePath)];
                const config = require(filePath);
                
                if (config && config.site) {
                    const domain = config.site.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
                    const agency = await extractAgencyFromDomain(config.site, file);
                    
                    // Normalize domain for sheet grouping (removes -part1, -part2, etc. suffixes)
                    // This consolidates all chunks of the same domain into one sheet
                    const normalizedDomain = normalizeDomainForSheet(domain);
                    
                    staticConfigs.push({
                        configFile: file,
                        site: config.site,
                        domain: normalizedDomain, // Use normalized domain for grouping
                        originalDomain: domain, // Preserve original domain with chunk suffix
                        agency: agency,
                        urlCount: Array.isArray(config.urls) ? config.urls.length : 0,
                        hasCrawler: config.scanner?.crawler === true,
                        hasSitemap: config.scanner?.sitemap === true,
                        hasRobotsTxt: config.scanner?.robotsTxt === true
                    });
                }
            } catch (error) {
                unlighthouseLogger.warn(`Error reading config file ${file}: ${error.message}`);
            }
        }
        
        // Deduplicate by config file only (each config file should be unique)
        const deduplicatedConfigs = [];
        const configFileMap = {};
        
        // First pass: Group configs by config file name (should be unique)
        staticConfigs.forEach(config => {
            const key = config.configFile;
            if (!configFileMap[key]) {
                configFileMap[key] = [];
            }
            configFileMap[key].push(config);
        });
        
        // For each config file, there should only be one entry
        Object.values(configFileMap).forEach(configs => {
            if (configs.length === 1) {
                deduplicatedConfigs.push(configs[0]);
            } else {
                // Multiple configs with same filename should not happen, but if it does, take the first
                deduplicatedConfigs.push(configs[0]);
                if (configs.length > 1) {
                    unlighthouseLogger.warn(`Found ${configs.length} identical config files named ${configs[0].configFile}, kept first one`);
                }
            }
        });
        
        // Sort by agency, then by domain, then by URL, then by config file (to group chunked jobs together)
        deduplicatedConfigs.sort((a, b) => {
            if (a.agency !== b.agency) {
                return a.agency.localeCompare(b.agency);
            }
            if (a.domain !== b.domain) {
                return a.domain.localeCompare(b.domain);
            }
            if (a.site !== b.site) {
                return a.site.localeCompare(b.site);
            }
            return a.configFile.localeCompare(b.configFile);
        });
        
        unlighthouseLogger.info(`Processed ${staticConfigs.length} configs, deduplicated to ${deduplicatedConfigs.length} unique static configs using configFile as key`);
        
        // Debug: Log chunked jobs found
        const chunkedJobs = deduplicatedConfigs.filter(config => 
            config.configFile.match(/-part\d+\.config\.js$/)
        );
        unlighthouseLogger.info(`Found ${chunkedJobs.length} chunked jobs (automatically preserved):`);
        chunkedJobs.forEach(job => {
            unlighthouseLogger.info(`  - ${job.configFile} -> ${job.site}`);
        });
        
        return deduplicatedConfigs;
        
    } catch (error) {
        unlighthouseLogger.error(`Error reading static config files: ${error.message}`);
        return [];
    }
}

/**
 * Updates the static master tracking sheet with static config information
 * @param {Object} auth - Google auth object
 */
async function updateStaticMasterSheet(auth) {
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        
        // Find or create the static master sheet
        const masterSheetId = await findOrCreateStaticMasterSheet(auth);
        
        // Get static config data
        const staticConfigs = await getStaticConfigData();
        
        if (staticConfigs.length === 0) {
            unlighthouseLogger.warn('No static configs found to add to master sheet');
            return;
        }
        
        // Read existing data to preserve scan results
        const existingDataResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: masterSheetId,
            range: 'Static Config Tracker!A:G',
        });
        
        const existingData = existingDataResponse.data.values || [];
        const existingHeaders = existingData.length > 0 ? existingData[0] : [];
        const existingRows = existingData.slice(1); // Skip headers
        
        // Create a map of existing entries by config file for easy lookup
        const existingEntriesMap = {};
        existingRows.forEach(row => {
            if (row && row[2]) { // Config File column
                const key = row[2]; // Config File as key
                existingEntriesMap[key] = {
                    agency: row[0] || '',
                    domain: row[1] || '',
                    configFile: row[2] || '',
                    sheetName: row[3] || '',
                    sheetUrl: row[4] || '',
                    lastScanDate: row[5] || '',
                    site: row[6] || ''
                };
            }
        });
        
        unlighthouseLogger.info(`Existing entries in sheet: ${Object.keys(existingEntriesMap).length}`);
        unlighthouseLogger.info(`Static configs to process: ${staticConfigs.length}`);
        unlighthouseLogger.info(`🔧 CODE VERSION: Updated 2025-09-19 with chunked job fix v2`);
        
        // Merge config data with existing scan results
        const mergedRows = staticConfigs.map(config => {
            const key = config.configFile;
            const existing = existingEntriesMap[key];
            return [
                config.agency, // Always use current agency mapping
                config.domain, // Use normalized domain for grouping chunked scans
                config.configFile,
                existing ? existing.sheetName : '', // Preserve existing sheet name
                existing ? existing.sheetUrl : '', // Preserve existing sheet URL
                existing ? existing.lastScanDate : '', // Preserve existing scan date
                config.site // Always use current site URL from config
            ];
        });
        
        // Debug: Log chunked jobs in merged data
        const chunkedInMerged = mergedRows.filter(row => 
            row[2].match(/-part\d+\.config\.js$/)
        );
        unlighthouseLogger.info(`Chunked jobs in merged data: ${chunkedInMerged.length}`);
        chunkedInMerged.forEach(row => {
            unlighthouseLogger.info(`  - ${row[2]} -> ${row[6]}`);
        });
        
        // Clear existing data (except headers) and replace with merged data
        await sheets.spreadsheets.values.clear({
            spreadsheetId: masterSheetId,
            range: 'Static Config Tracker!A2:G'
        });
        
        // Add merged data to Static Config Tracker sheet
        if (mergedRows.length > 0) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: masterSheetId,
                range: 'Static Config Tracker!A2:G',
                valueInputOption: 'RAW',
                resource: {
                    values: mergedRows
                }
            });
        }
        
        // Group configs by agency and create/update agency sheets
        const configsByAgency = {};
        staticConfigs.forEach(config => {
            if (!configsByAgency[config.agency]) {
                configsByAgency[config.agency] = [];
            }
            configsByAgency[config.agency].push(config);
        });
        
        // Create/update agency-specific sheets
        for (const [agency, configs] of Object.entries(configsByAgency)) {
            const agencySheetName = await ensureAgencySheetExists(sheets, masterSheetId, agency);
            
            // Read existing agency data to preserve scan results
            const agencyExistingResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: masterSheetId,
                range: `${agencySheetName}!A:F`,
            });
            
            const agencyExistingData = agencyExistingResponse.data.values || [];
            const agencyExistingRows = agencyExistingData.slice(1); // Skip headers
            
            // Create a map of existing agency entries by config file
            const agencyExistingMap = {};
            agencyExistingRows.forEach(row => {
                if (row && row[1]) { // Config File column in agency sheets
                    agencyExistingMap[row[1]] = {
                        domain: row[0] || '',
                        configFile: row[1] || '',
                        sheetName: row[2] || '',
                        sheetUrl: row[3] || '',
                        lastScanDate: row[4] || '',
                        site: row[5] || ''
                    };
                }
            });
            
            // Merge agency config data with existing scan results
            const agencyMergedRows = configs.map(config => {
                const existing = agencyExistingMap[config.configFile];
                return [
                    config.domain, // Always use current domain
                    config.configFile,
                    existing ? existing.sheetName : '', // Preserve existing sheet name
                    existing ? existing.sheetUrl : '', // Preserve existing sheet URL
                    existing ? existing.lastScanDate : '', // Preserve existing scan date
                    config.site // Always use current site URL from config
                ];
            });
            
            // Clear existing data in agency sheet (except headers)
            await sheets.spreadsheets.values.clear({
                spreadsheetId: masterSheetId,
                range: `${agencySheetName}!A2:F`
            });
            
            if (agencyMergedRows.length > 0) {
                await sheets.spreadsheets.values.append({
                    spreadsheetId: masterSheetId,
                    range: `${agencySheetName}!A2:F`,
                    valueInputOption: 'RAW',
                    resource: {
                        values: agencyMergedRows
                    }
                });
            }
            
            unlighthouseLogger.info(`Updated ${agencySheetName} sheet with ${agencyMergedRows.length} configs`);
        }
        
        // Add summary information to a new Stats sheet
        await createStatsSheet(sheets, masterSheetId, staticConfigs);
        
        unlighthouseLogger.info(`Updated static master sheet with ${staticConfigs.length} static configs across ${Object.keys(configsByAgency).length} agencies`);
        
    } catch (error) {
        unlighthouseLogger.error(`Error updating static master sheet: ${error.message}`);
        throw error;
    }
}

/**
 * Creates a stats sheet with summary information
 * @param {Object} sheets - Google Sheets API object
 * @param {string} masterSheetId - Master sheet ID
 * @param {Array} staticConfigs - Array of static config data
 */
async function createStatsSheet(sheets, masterSheetId, staticConfigs) {
    try {
        const sheetName = 'Stats';
        
        // Check if Stats sheet exists and delete it if it does
        const sheetMetadata = await sheets.spreadsheets.get({
            spreadsheetId: masterSheetId,
            fields: 'sheets(properties)'
        });
        
        const existingStatsSheet = sheetMetadata.data.sheets.find(sheet => 
            sheet.properties.title === sheetName
        );
        
        if (existingStatsSheet) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId: masterSheetId,
                resource: {
                    requests: [{
                        deleteSheet: {
                            sheetId: existingStatsSheet.properties.sheetId
                        }
                    }]
                }
            });
        }
        
        // Create new Stats sheet
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: masterSheetId,
            resource: {
                requests: [{
                    addSheet: {
                        properties: {
                            title: sheetName,
                            index: 0 // Put it first
                        }
                    }
                }]
            }
        });
        
        // Calculate statistics
        const totalConfigs = staticConfigs.length;
        const agencyCount = new Set(staticConfigs.map(config => config.agency)).size;
        const configsWithCrawler = staticConfigs.filter(config => config.hasCrawler).length;
        const configsWithSitemap = staticConfigs.filter(config => config.hasSitemap).length;
        const configsWithRobotsTxt = staticConfigs.filter(config => config.hasRobotsTxt).length;
        const totalUrls = staticConfigs.reduce((sum, config) => sum + config.urlCount, 0);
        
        // Agency breakdown
        const agencyStats = {};
        staticConfigs.forEach(config => {
            if (!agencyStats[config.agency]) {
                agencyStats[config.agency] = { count: 0, urls: 0 };
            }
            agencyStats[config.agency].count++;
            agencyStats[config.agency].urls += config.urlCount;
        });
        
        const statsData = [
            ['Static Config Analysis', ''],
            ['Generated on:', new Date().toISOString().split('T')[0]],
            [''],
            ['SUMMARY STATISTICS', ''],
            ['Total static configs:', totalConfigs],
            ['Total agencies:', agencyCount],
            ['Total URLs across all configs:', totalUrls],
            ['Configs with crawler enabled:', configsWithCrawler],
            ['Configs with sitemap enabled:', configsWithSitemap],
            ['Configs with robotsTxt enabled:', configsWithRobotsTxt],
            [''],
            ['AGENCY BREAKDOWN', ''],
            ['Agency', 'Config Count', 'Total URLs']
        ];
        
        // Add agency stats
        Object.entries(agencyStats)
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([agency, stats]) => {
                statsData.push([agency, stats.count, stats.urls]);
            });
        
        // Add the stats data
        await sheets.spreadsheets.values.update({
            spreadsheetId: masterSheetId,
            range: `${sheetName}!A1:C${statsData.length}`,
            valueInputOption: 'RAW',
            resource: {
                values: statsData
            }
        });
        
        unlighthouseLogger.info('Created Stats sheet with summary information');
        
    } catch (error) {
        unlighthouseLogger.error(`Error creating stats sheet: ${error.message}`);
    }
}

/**
 * Updates scan results for a specific static config (to be called when scans complete)
 * @param {Object} auth - Google auth object
 * @param {Object} scanData - Scan data object with configFile, sheet_url, sheet_name, url
 */
async function updateStaticScanResults(auth, scanData) {
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        
        // Find or create the static master sheet
        const masterSheetId = await findOrCreateStaticMasterSheet(auth);
        
        // Extract information from scan data
        const domain = scanData.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        const currentDate = new Date().toISOString().split('T')[0];
        const agency = await extractAgencyFromDomain(scanData.url, scanData.configFile);
        
        // Prepare the row data for Static Config Tracker
        const masterRow = [
            agency,
            domain,
            scanData.configFile || '',
            scanData.sheet_name || scanData.name,
            scanData.sheet_url,
            currentDate,
            scanData.url
        ];
        
        // Prepare the row data for Agency-specific sheet (no agency column needed)
        const agencyRow = [
            domain,
            scanData.configFile || '',
            scanData.sheet_name || scanData.name,
            scanData.sheet_url,
            currentDate,
            scanData.url
        ];
        
        // Check if entry already exists in Static Config Tracker (match by sheet URL)
        const existingDataResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: masterSheetId,
            range: 'Static Config Tracker!A:G',
        });
        
        const existingData = existingDataResponse.data.values || [];
        
        // Check for duplicate entries (match by config file + sheet URL combination)
        // This handles cases where same config might be run multiple times
        const isDuplicate = existingData.some(row => 
            row && row[2] === scanData.configFile && row[4] === scanData.sheet_url
        );
        
        if (isDuplicate) {
            unlighthouseLogger.info(`Entry already exists in static master sheet for config: ${scanData.configFile} with sheet: ${scanData.sheet_url}`);
            return;
        }
        
        // Add to Static Config Tracker sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: masterSheetId,
            range: 'Static Config Tracker!A:G',
            valueInputOption: 'RAW',
            resource: {
                values: [masterRow]
            }
        });
        
        unlighthouseLogger.info(`Added new entry to static master tracker: ${scanData.configFile} -> ${scanData.url}`);
        
        // Ensure agency-specific sheet exists and add entry there
        const agencySheetName = await ensureAgencySheetExists(sheets, masterSheetId, agency);
        
        // Check for duplicates in agency sheet too
        const agencyDataResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: masterSheetId,
            range: `${agencySheetName}!A:F`,
        });
        
        const agencyExistingData = agencyDataResponse.data.values || [];
        const isAgencyDuplicate = agencyExistingData.some(row => 
            row && row[1] === scanData.configFile && row[3] === scanData.sheet_url
        );
        
        if (!isAgencyDuplicate) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: masterSheetId,
                range: `${agencySheetName}!A:F`,
                valueInputOption: 'RAW',
                resource: {
                    values: [agencyRow]
                }
            });
            
            unlighthouseLogger.info(`Added entry to agency sheet ${agencySheetName}: ${scanData.configFile} -> ${domain}`);
        }
        
    } catch (error) {
        unlighthouseLogger.error(`Error updating static scan results: ${error.message}`);
        throw error;
    }
}

module.exports = {
    updateStaticMasterSheet,
    updateStaticScanResults,
    extractAgencyFromDomain,
    fetchAgencyMapping,
    normalizeDomainForSheet
};

// Main execution when run directly
if (require.main === module) {
    const { google } = require('googleapis');
    const fs = require('fs');
    const path = require('path');

    async function main() {
        try {
            unlighthouseLogger.info('Starting static master sheet update...');
            
            // Set up Google Auth (same as generate-static-mastersheet.js)
            const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                               path.join(__dirname, 'service-account-key.json');
            
            if (!fs.existsSync(keyFilename)) {
                throw new Error(`Google service account credentials not found. Set GOOGLE_APPLICATION_CREDENTIALS environment variable or place service-account-key.json in the project root.`);
            }
            
            const auth = new google.auth.GoogleAuth({
                keyFile: keyFilename,
                scopes: [
                    'https://www.googleapis.com/auth/spreadsheets',
                    'https://www.googleapis.com/auth/drive'
                ]
            });
            
            const authClient = await auth.getClient();
            
            // Update the static master sheet
            await updateStaticMasterSheet(authClient);
            
            unlighthouseLogger.info('Static master sheet update completed successfully!');
            
        } catch (error) {
            unlighthouseLogger.error(`Error in main execution: ${error.message}`);
            process.exit(1);
        }
    }
    
    main();
}
