const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Master sheet configuration
const MASTER_SHEET_NAME = 'OOBEE Accessibility Scans - Master Sheet';
const PARENT_FOLDER_ID = '1-8FGgtrPBH7aZrMxVlAkxooHXSzDv-w_';

// Custom logger implementation
const oobeeLogger = {
    debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.info(`[INFO] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
};

// Agency mapping cache (reuse from unlighthouse-mastersheet)
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
        oobeeLogger.info('Fetching agency data from GSA DAP API...');
        const response = await axios.get('https://open.gsa.gov/api/dap/', {
            timeout: 10000,
            headers: {
                'User-Agent': 'FederalWebsiteScanner-OOBEE/1.0'
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
        oobeeLogger.info(`Loaded ${Object.keys(domainToAgency).length} agency mappings from GSA DAP API`);
        
        return domainToAgency;
        
    } catch (error) {
        oobeeLogger.warn(`Failed to fetch agency data from GSA DAP API: ${error.message}`);
        
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
 * Extracts agency name from domain using GSA DAP API data
 * @param {string} url - URL to extract agency from
 * @returns {Promise<string>} - Agency name
 */
async function extractAgencyFromDomain(url) {
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
        oobeeLogger.warn(`Error extracting agency from domain: ${error.message}`);
        return 'Unknown Agency';
    }
}

/**
 * Creates a safe sheet name from agency name
 * @param {string} agencyName - Full agency name
 * @returns {string} - Safe sheet name (max 100 characters, no invalid chars)
 */
function createSafeSheetName(agencyName) {
    // Remove invalid characters and truncate to 100 characters
    const safeNameMap = {
        'Department of Veterans Affairs': 'Veterans Affairs Accessibility',
        'Department of Agriculture': 'Agriculture Accessibility',
        'Department of Health and Human Services': 'Health & Human Services Accessibility',
        'Department of Defense': 'Defense Accessibility',
        'Department of Homeland Security': 'Homeland Security Accessibility',
        'Department of Transportation': 'Transportation Accessibility',
        'Department of the Treasury': 'Treasury Accessibility',
        'Department of Education': 'Education Accessibility',
        'Department of Energy': 'Energy Accessibility',
        'Department of Justice': 'Justice Accessibility',
        'Department of Labor': 'Labor Accessibility',
        'Department of State': 'State Accessibility',
        'Securities and Exchange Commission': 'SEC OOBEE',
        'Centers for Medicare & Medicaid Services': 'CMS OOBEE',
        'Environmental Protection Agency': 'EPA OOBEE',
        'General Services Administration': 'GSA OOBEE',
        'National Aeronautics and Space Administration': 'NASA OOBEE',
        'National Institute of Standards and Technology': 'NIST OOBEE',
        'National Institutes of Health': 'NIH OOBEE',
        'National Oceanic and Atmospheric Administration': 'NOAA OOBEE',
        'Small Business Administration': 'SBA OOBEE',
        'Social Security Administration': 'SSA OOBEE'
    };
    
    // Use shortened name if available, otherwise clean the original and add OOBEE suffix
    const shortName = safeNameMap[agencyName] || `${agencyName} OOBEE`;
    
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
        
        // Add headers to the new agency sheet (OOBEE-specific columns)
        await sheets.spreadsheets.values.update({
            spreadsheetId: masterSheetId,
            range: `${sheetName}!A1:I1`,
            valueInputOption: 'RAW',
            resource: {
                values: [[
                    'Domain', 
                    'Site URL', 
                    'Scan Date', 
                    'Total Pages', 
                    'Pages Scanned',
                    'Total Violations',
                    'Must Fix Issues',
                    'Good to Fix Issues',
                    'Results File'
                ]]
            }
        });
        
        oobeeLogger.info(`Created agency sheet: ${sheetName}`);
        return sheetName;
        
    } catch (error) {
        oobeeLogger.error(`Error ensuring agency sheet exists: ${error.message}`);
        throw error;
    }
}

/**
 * Finds or creates the master sheet
 * @param {Object} auth - Google auth object
 * @returns {Promise<string>} - Master sheet ID
 */
async function findOrCreateMasterSheet(auth) {
    const drive = google.drive({ version: 'v3', auth });
    
    try {
        // First, search for existing master sheet
        const existingFiles = await drive.files.list({
            q: `name='${MASTER_SHEET_NAME}' and mimeType='application/vnd.google-apps.spreadsheet' and parents in '${PARENT_FOLDER_ID}'`,
            fields: 'files(id, name)',
        });

        if (existingFiles.data.files.length > 0) {
            oobeeLogger.info(`Found existing master sheet: ${MASTER_SHEET_NAME}`);
            return existingFiles.data.files[0].id;
        }

        // Create new master sheet if it doesn't exist
        oobeeLogger.info(`Creating new master sheet: ${MASTER_SHEET_NAME}`);
        
        const sheets = google.sheets({ version: 'v4', auth });
        
        // Create a new spreadsheet
        const spreadsheet = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: MASTER_SHEET_NAME
                },
                sheets: [{
                    properties: {
                        title: 'Master Tracker',
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
        
        // Add headers to the Master Tracker sheet (OOBEE-specific columns)
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: 'Master Tracker!A1:J1',
            valueInputOption: 'RAW',
            resource: {
                values: [[
                    'Agency',
                    'Domain', 
                    'Site URL', 
                    'Scan Date', 
                    'Total Pages', 
                    'Pages Scanned',
                    'Total Violations',
                    'Must Fix Issues',
                    'Good to Fix Issues',
                    'Results File'
                ]]
            }
        });
        
        oobeeLogger.info(`Created master sheet with ID: ${spreadsheetId}`);
        return spreadsheetId;
        
    } catch (error) {
        oobeeLogger.error(`Error finding or creating master sheet: ${error.message}`);
        throw error;
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
 * Processes OOBEE results from JSON file
 * @param {string} resultsFilePath - Path to OOBEE results JSON file
 * @returns {Promise<Object|null>} - Processed OOBEE data
 */
async function processOobeeResults(resultsFilePath) {
    try {
        if (!fs.existsSync(resultsFilePath)) {
            oobeeLogger.warn(`OOBEE results file not found: ${resultsFilePath}`);
            return null;
        }
        
        const resultsData = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'));
        oobeeLogger.info(`Loaded OOBEE results from: ${resultsFilePath}`);
        
        return resultsData;
        
    } catch (error) {
        oobeeLogger.error(`Error processing OOBEE results: ${error.message}`);
        return null;
    }
}

/**
 * Updates the master tracking sheet with OOBEE scan information
 * @param {Object} auth - Google auth object
 * @param {Object} scanData - Scan data object
 */
async function updateOobeeMasterSheet(auth, scanData) {
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        
        // Find or create the master sheet
        const masterSheetId = await findOrCreateMasterSheet(auth);
        
        // Process OOBEE results if provided
        let oobeeData = null;
        if (scanData.resultsFile) {
            oobeeData = await processOobeeResults(scanData.resultsFile);
        }
        
        // Extract agency from the scan URL
        const agency = await extractAgencyFromDomain(scanData.url);
        const domain = scanData.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        
        // Normalize domain for sheet grouping (removes -part1, -part2, etc. suffixes)
        const normalizedDomain = normalizeDomainForSheet(domain);
        
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Extract OOBEE-specific metrics
        const totalPages = oobeeData?.summary?.totalPages || 'N/A';
        const pagesScanned = oobeeData?.summary?.pagesScanned || 'N/A';
        const totalViolations = oobeeData?.summary?.totalViolations || 'N/A';
        const mustFixViolations = oobeeData?.summary?.mustFixViolations || 'N/A';
        const goodToFixViolations = oobeeData?.summary?.goodToFixViolations || 'N/A';
        const resultsFile = scanData.resultsFile || 'N/A';
        
        // Prepare the row data for Master Tracker
        const masterRow = [
            agency,
            normalizedDomain,
            scanData.url,
            currentDate,
            totalPages,
            pagesScanned,
            totalViolations,
            mustFixViolations,
            goodToFixViolations,
            resultsFile
        ];
        
        // Prepare the row data for Agency-specific sheet (no agency column needed)
        const agencyRow = [
            normalizedDomain,
            scanData.url,
            currentDate,
            totalPages,
            pagesScanned,
            totalViolations,
            mustFixViolations,
            goodToFixViolations,
            resultsFile
        ];
        
        // Check if entry already exists in Master Tracker
        const existingDataResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: masterSheetId,
            range: 'Master Tracker!A:J',
        });
        
        const existingData = existingDataResponse.data.values || [];
        
        // Check for duplicate entries (match by domain and scan date)
        const isDuplicate = existingData.some(row => 
            row && row[1] === normalizedDomain && row[3] === currentDate
        );
        
        if (isDuplicate) {
            oobeeLogger.info(`Entry already exists in master sheet for: ${normalizedDomain} on ${currentDate}`);
            return;
        }
        
        // Add to Master Tracker sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: masterSheetId,
            range: 'Master Tracker!A:J',
            valueInputOption: 'RAW',
            resource: {
                values: [masterRow]
            }
        });
        
        // Ensure agency-specific sheet exists and add entry there
        const agencySheetName = await ensureAgencySheetExists(sheets, masterSheetId, agency);
        
        // Check for duplicates in agency sheet too
        const agencyDataResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: masterSheetId,
            range: `${agencySheetName}!A:I`,
        });
        
        const agencyExistingData = agencyDataResponse.data.values || [];
        const isAgencyDuplicate = agencyExistingData.some(row => 
            row && row[0] === normalizedDomain && row[2] === currentDate
        );
        
        if (!isAgencyDuplicate) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: masterSheetId,
                range: `${agencySheetName}!A:I`,
                valueInputOption: 'RAW',
                resource: {
                    values: [agencyRow]
                }
            });
        }
        
        // Sort Master Tracker by agency, then by domain (only if we have more than just headers)
        if (existingData.length > 1) {
            const sheetMetadata = await sheets.spreadsheets.get({
                spreadsheetId: masterSheetId,
                fields: 'sheets(properties)'
            });
            
            const masterSheet = sheetMetadata.data.sheets.find(sheet => 
                sheet.properties.title === 'Master Tracker'
            );
            
            if (masterSheet) {
                await sheets.spreadsheets.batchUpdate({
                    spreadsheetId: masterSheetId,
                    resource: {
                        requests: [{
                            sortRange: {
                                range: {
                                    sheetId: masterSheet.properties.sheetId,
                                    startRowIndex: 1, // Skip header row
                                    startColumnIndex: 0,
                                    endColumnIndex: 10
                                },
                                sortSpecs: [
                                    {
                                        dimensionIndex: 0, // Agency column
                                        sortOrder: 'ASCENDING'
                                    },
                                    {
                                        dimensionIndex: 1, // Domain column
                                        sortOrder: 'ASCENDING'
                                    }
                                ]
                            }
                        }]
                    }
                });
            }
            
            // Sort agency sheet by domain
            const agencySheet = sheetMetadata.data.sheets.find(sheet => 
                sheet.properties.title === agencySheetName
            );
            
            if (agencySheet && agencyExistingData.length > 1) {
                await sheets.spreadsheets.batchUpdate({
                    spreadsheetId: masterSheetId,
                    resource: {
                        requests: [{
                            sortRange: {
                                range: {
                                    sheetId: agencySheet.properties.sheetId,
                                    startRowIndex: 1, // Skip header row
                                    startColumnIndex: 0,
                                    endColumnIndex: 9
                                },
                                sortSpecs: [
                                    {
                                        dimensionIndex: 0, // Domain column
                                        sortOrder: 'ASCENDING'
                                    }
                                ]
                            }
                        }]
                    }
                });
            }
        }
        
        oobeeLogger.info(`Added OOBEE entry to master sheet: ${agency} - ${domain}`);
        oobeeLogger.info(`Added OOBEE entry to agency sheet: ${agencySheetName}`);
        
        // Log OOBEE-specific metrics
        if (oobeeData) {
            oobeeLogger.info(`OOBEE Scan Summary for ${domain}:`);
            oobeeLogger.info(`  Total Violations: ${totalViolations}`);
            oobeeLogger.info(`  Must Fix: ${mustFixViolations}`);
            oobeeLogger.info(`  Good to Fix: ${goodToFixViolations}`);
            oobeeLogger.info(`  Pages Scanned: ${pagesScanned}/${totalPages}`);
        }
        
    } catch (error) {
        oobeeLogger.error(`Error updating OOBEE master sheet: ${error.message}`);
        // Don't throw - allow the main process to continue
    }
}

/**
 * Main function to process OOBEE results and update master sheet
 * @param {string} siteUrl - Site URL that was scanned
 * @param {string} resultsFilePath - Path to OOBEE results JSON file (optional)
 */
async function processAndUploadOobeeResults(siteUrl, resultsFilePath = './oobee-results.json') {
    try {
        // Set up Google Auth
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        });
        
        const scanData = {
            url: siteUrl,
            resultsFile: resultsFilePath
        };
        
        await updateOobeeMasterSheet(auth, scanData);
        
        oobeeLogger.info('✅ OOBEE results processed and uploaded to master sheet');
        
    } catch (error) {
        oobeeLogger.error(`Error processing OOBEE results: ${error.message}`);
        throw error;
    }
}

module.exports = {
    updateOobeeMasterSheet,
    processAndUploadOobeeResults,
    processOobeeResults,
    extractAgencyFromDomain,
    fetchAgencyMapping,
    normalizeDomainForSheet
};

// Main execution when run directly
if (require.main === module) {
    async function main() {
        const siteUrl = process.env.SITE_NAME || process.argv[2];
        const resultsFile = process.env.OOBEE_RESULTS_FILE || process.argv[3] || './oobee-results.json';
        
        if (!siteUrl) {
            console.error('❌ No site URL provided. Set SITE_NAME environment variable or pass as first argument.');
            console.error('Usage: node oobee-mastersheet.js <site_url> [results_file]');
            process.exit(1);
        }
        
        try {
            await processAndUploadOobeeResults(siteUrl, resultsFile);
        } catch (error) {
            console.error('❌ Failed to process OOBEE results:', error.message);
            process.exit(1);
        }
    }
    
    main();
}
