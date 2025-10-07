#!/usr/bin/env node

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { processAndUploadOobeeResults } = require('./oobee-mastersheet');

// Custom logger implementation
const oobeeUploadLogger = {
    debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.info(`[INFO] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
};

/**
 * Creates a new Google Sheet for OOBEE accessibility results
 * @param {Object} auth - Google Auth object
 * @param {Object} oobeeData - OOBEE scan results data
 * @param {string} siteUrl - Site URL that was scanned
 * @returns {Promise<Object>} - Sheet creation results
 */
async function createOobeeSheet(auth, oobeeData, siteUrl) {
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        const drive = google.drive({ version: 'v3', auth });
        
        // Extract domain for sheet naming
        const domain = siteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        const timestamp = new Date().toISOString().split('T')[0];
        const sheetName = `OOBEE A11y Scan - ${domain} - ${timestamp}`;
        
        // Create a new spreadsheet
        const spreadsheet = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: sheetName
                },
                sheets: [
                    {
                        properties: {
                            title: 'Summary',
                            index: 0
                        }
                    },
                    {
                        properties: {
                            title: 'Violations by Rule',
                            index: 1
                        }
                    },
                    {
                        properties: {
                            title: 'Scan Configuration',
                            index: 2
                        }
                    }
                ]
            }
        });
        
        const spreadsheetId = spreadsheet.data.spreadsheetId;
        const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
        
        // Get the actual sheet IDs from the creation response
        const sheets_data = spreadsheet.data.sheets;
        const summarySheetId = sheets_data.find(sheet => sheet.properties.title === 'Summary').properties.sheetId;
        const violationsSheetId = sheets_data.find(sheet => sheet.properties.title === 'Violations by Rule').properties.sheetId;
        const configSheetId = sheets_data.find(sheet => sheet.properties.title === 'Scan Configuration').properties.sheetId;
        
        // Move to the correct folder if PARENT_FOLDER_ID is available
        const PARENT_FOLDER_ID = process.env.PARENT_FOLDER_ID || '1-8FGgtrPBH7aZrMxVlAkxooHXSzDv-w_';
        if (PARENT_FOLDER_ID) {
            await drive.files.update({
                fileId: spreadsheetId,
                addParents: PARENT_FOLDER_ID,
                removeParents: 'root'
            });
        }
        
        // Populate Summary sheet
        await populateSummarySheet(sheets, spreadsheetId, oobeeData, siteUrl, summarySheetId);
        
        // Populate Violations by Rule sheet
        await populateViolationsSheet(sheets, spreadsheetId, oobeeData, violationsSheetId);
        
        // Populate Scan Configuration sheet
        await populateConfigSheet(sheets, spreadsheetId, oobeeData, configSheetId);
        
        oobeeUploadLogger.info(`Created OOBEE results sheet: ${sheetName}`);
        oobeeUploadLogger.info(`Sheet URL: ${spreadsheetUrl}`);
        
        return {
            spreadsheetId,
            spreadsheetUrl,
            sheetName,
            domain
        };
        
    } catch (error) {
        oobeeUploadLogger.error(`Error creating OOBEE sheet: ${error.message}`);
        throw error;
    }
}

/**
 * Populates the Summary sheet with overview data
 * @param {Object} sheets - Google Sheets API object
 * @param {string} spreadsheetId - Spreadsheet ID
 * @param {Object} oobeeData - OOBEE scan results data
 * @param {string} siteUrl - Site URL that was scanned
 */
async function populateSummarySheet(sheets, spreadsheetId, oobeeData, siteUrl, sheetId) {
    const summary = oobeeData.summary || {};
    const scanConfig = oobeeData.scanConfig || {};
    const timestamp = oobeeData.timestamp || new Date().toISOString();
    
    const summaryData = [
        ['OOBEE Accessibility Scan Summary'],
        [''],
        ['Site URL', siteUrl],
        ['Scan Date', new Date(timestamp).toLocaleString()],
        ['Scanner', 'OOBEE'],
        [''],
        ['Scan Results'],
        ['Total Pages Discovered', summary.totalPages || 'N/A'],
        ['Pages Actually Scanned', summary.pagesScanned || 'N/A'],
        ['Total Accessibility Violations', summary.totalViolations || 0],
        ['Must Fix (Critical) Issues', summary.mustFixViolations || 0],
        ['Good to Fix (Recommended) Issues', summary.goodToFixViolations || 0],
        [''],
        ['Scan Configuration'],
        ['Scanner Type', scanConfig.scanner || 'N/A'],
        ['Device', scanConfig.device || 'N/A'],
        ['Max Pages', scanConfig.maxPages || 'N/A'],
        ['Safe Mode', scanConfig.safeMode || 'N/A'],
        ['File Types', scanConfig.fileTypes || 'N/A'],
        ['Ruleset', scanConfig.ruleset || 'N/A'],
        ['Follow Robots.txt', scanConfig.followRobots || 'N/A'],
        ['Scan Duration (seconds)', scanConfig.scanDuration || 'N/A']
    ];
    
    await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: 'Summary!A1:B25',
        valueInputOption: 'RAW',
        resource: {
            values: summaryData
        }
    });
    
    // Format the summary sheet
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: {
            requests: [
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 0,
                            endRowIndex: 1,
                            startColumnIndex: 0,
                            endColumnIndex: 2
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: {
                                    bold: true,
                                    fontSize: 14
                                },
                                backgroundColor: {
                                    red: 0.9,
                                    green: 0.9,
                                    blue: 1.0
                                }
                            }
                        },
                        fields: 'userEnteredFormat(textFormat,backgroundColor)'
                    }
                },
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 6,
                            endRowIndex: 7,
                            startColumnIndex: 0,
                            endColumnIndex: 2
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: {
                                    bold: true
                                },
                                backgroundColor: {
                                    red: 1.0,
                                    green: 0.9,
                                    blue: 0.9
                                }
                            }
                        },
                        fields: 'userEnteredFormat(textFormat,backgroundColor)'
                    }
                },
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 13,
                            endRowIndex: 14,
                            startColumnIndex: 0,
                            endColumnIndex: 2
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: {
                                    bold: true
                                },
                                backgroundColor: {
                                    red: 0.9,
                                    green: 1.0,
                                    blue: 0.9
                                }
                            }
                        },
                        fields: 'userEnteredFormat(textFormat,backgroundColor)'
                    }
                }
            ]
        }
    });
}

/**
 * Populates the Violations by Rule sheet with detailed violation data
 * @param {Object} sheets - Google Sheets API object
 * @param {string} spreadsheetId - Spreadsheet ID
 * @param {Object} oobeeData - OOBEE scan results data
 */
async function populateViolationsSheet(sheets, spreadsheetId, oobeeData, sheetId) {
    const violations = oobeeData.violations || [];
    
    const headers = [['Rule', 'Severity', 'Count', 'Description']];
    const violationRows = violations.map(violation => [
        violation.rule || 'Unknown',
        violation.severity || 'Unknown',
        violation.count || 0,
        violation.description || 'No description available'
    ]);
    
    const allData = [...headers, ...violationRows];
    
    if (allData.length > 1) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: `Violations by Rule!A1:D${allData.length}`,
            valueInputOption: 'RAW',
            resource: {
                values: allData
            }
        });
        
        // Format the violations sheet header
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: spreadsheetId,
            resource: {
                requests: [{
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 0,
                            endRowIndex: 1,
                            startColumnIndex: 0,
                            endColumnIndex: 4
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: {
                                    bold: true
                                },
                                backgroundColor: {
                                    red: 0.9,
                                    green: 0.9,
                                    blue: 1.0
                                }
                            }
                        },
                        fields: 'userEnteredFormat(textFormat,backgroundColor)'
                    }
                }]
            }
        });
    } else {
        // No violations found
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: 'Violations by Rule!A1:D2',
            valueInputOption: 'RAW',
            resource: {
                values: [
                    ['Rule', 'Severity', 'Count', 'Description'],
                    ['No violations found', '', '', '✅ All accessibility checks passed!']
                ]
            }
        });
    }
}

/**
 * Populates the Scan Configuration sheet with technical details
 * @param {Object} sheets - Google Sheets API object
 * @param {string} spreadsheetId - Spreadsheet ID
 * @param {Object} oobeeData - OOBEE scan results data
 */
async function populateConfigSheet(sheets, spreadsheetId, oobeeData, sheetId) {
    const scanConfig = oobeeData.scanConfig || {};
    const timestamp = oobeeData.timestamp || new Date().toISOString();
    
    const configData = [
        ['OOBEE Scan Configuration'],
        [''],
        ['Configuration Parameter', 'Value'],
        ['Scanner Type', scanConfig.scanner || 'N/A'],
        ['Device Type', scanConfig.device || 'N/A'],
        ['Headless Mode', scanConfig.headless || 'N/A'],
        ['Maximum Pages', scanConfig.maxPages || 'N/A'],
        ['Safe Mode (No Dynamic Clicking)', scanConfig.safeMode || 'N/A'],
        ['File Types Scanned', scanConfig.fileTypes || 'N/A'],
        ['Accessibility Ruleset', scanConfig.ruleset || 'N/A'],
        ['Follow Robots.txt', scanConfig.followRobots || 'N/A'],
        ['Scan Duration Limit (seconds)', scanConfig.scanDuration || 'N/A'],
        [''],
        ['Scan Metadata'],
        ['Scan Timestamp', timestamp],
        ['Scan Date (Human Readable)', new Date(timestamp).toLocaleString()],
        ['Scanner Version', 'OOBEE Integration v1.0']
    ];
    
    await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: 'Scan Configuration!A1:B20',
        valueInputOption: 'RAW',
        resource: {
            values: configData
        }
    });
    
    // Format the configuration sheet
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: {
            requests: [
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 0,
                            endRowIndex: 1,
                            startColumnIndex: 0,
                            endColumnIndex: 2
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: {
                                    bold: true,
                                    fontSize: 14
                                },
                                backgroundColor: {
                                    red: 0.9,
                                    green: 0.9,
                                    blue: 1.0
                                }
                            }
                        },
                        fields: 'userEnteredFormat(textFormat,backgroundColor)'
                    }
                },
                {
                    repeatCell: {
                        range: {
                            sheetId: sheetId,
                            startRowIndex: 2,
                            endRowIndex: 3,
                            startColumnIndex: 0,
                            endColumnIndex: 2
                        },
                        cell: {
                            userEnteredFormat: {
                                textFormat: {
                                    bold: true
                                },
                                backgroundColor: {
                                    red: 0.9,
                                    green: 1.0,
                                    blue: 0.9
                                }
                            }
                        },
                        fields: 'userEnteredFormat(textFormat,backgroundColor)'
                    }
                }
            ]
        }
    });
}

/**
 * Main function to process OOBEE results and create Google Sheet
 * @param {string} siteUrl - Site URL that was scanned
 * @param {string} resultsFilePath - Path to OOBEE results JSON file
 * @returns {Promise<Object>} - Upload results
 */
async function uploadOobeeResults(siteUrl, resultsFilePath = './oobee-results.json') {
    try {
        oobeeUploadLogger.info('🚀 Starting OOBEE results upload process...');
        
        // Check if results file exists
        if (!fs.existsSync(resultsFilePath)) {
            throw new Error(`OOBEE results file not found: ${resultsFilePath}`);
        }
        
        // Load and parse OOBEE results
        const oobeeData = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'));
        oobeeUploadLogger.info(`📊 Loaded OOBEE results from: ${resultsFilePath}`);
        
        // Set up Google Auth
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        });
        
        // Create the Google Sheet
        const sheetResult = await createOobeeSheet(auth, oobeeData, siteUrl);
        
        // Update the master tracking sheet
        const scanData = {
            url: siteUrl,
            resultsFile: resultsFilePath,
            name: sheetResult.sheetName,
            sheet_url: sheetResult.spreadsheetUrl,
            sheet_id: sheetResult.spreadsheetId
        };
        
        const { updateOobeeMasterSheet } = require('./oobee-mastersheet');
        await updateOobeeMasterSheet(auth, scanData);
        
        oobeeUploadLogger.info('✅ OOBEE results uploaded successfully!');
        oobeeUploadLogger.info(`📋 Sheet Name: ${sheetResult.sheetName}`);
        oobeeUploadLogger.info(`🔗 Sheet URL: ${sheetResult.spreadsheetUrl}`);
        
        // Log summary statistics
        const summary = oobeeData.summary || {};
        if (summary.totalViolations !== undefined) {
            oobeeUploadLogger.info('📊 OOBEE Scan Summary:');
            oobeeUploadLogger.info(`   Total Violations: ${summary.totalViolations}`);
            oobeeUploadLogger.info(`   Must Fix Issues: ${summary.mustFixViolations || 0}`);
            oobeeUploadLogger.info(`   Good to Fix Issues: ${summary.goodToFixViolations || 0}`);
            oobeeUploadLogger.info(`   Pages Scanned: ${summary.pagesScanned}/${summary.totalPages}`);
        }
        
        return sheetResult;
        
    } catch (error) {
        oobeeUploadLogger.error(`❌ Error uploading OOBEE results: ${error.message}`);
        throw error;
    }
}

module.exports = {
    uploadOobeeResults,
    createOobeeSheet,
    populateSummarySheet,
    populateViolationsSheet,
    populateConfigSheet
};

// Main execution when run directly
if (require.main === module) {
    async function main() {
        const siteUrl = process.env.SITE_NAME || process.argv[2];
        const resultsFile = process.env.OOBEE_RESULTS_FILE || process.argv[3] || './oobee-results.json';
        
        if (!siteUrl) {
            console.error('❌ No site URL provided. Set SITE_NAME environment variable or pass as first argument.');
            console.error('Usage: node oobee-scandata-upload.js <site_url> [results_file]');
            process.exit(1);
        }
        
        try {
            await uploadOobeeResults(siteUrl, resultsFile);
        } catch (error) {
            console.error('❌ Failed to upload OOBEE results:', error.message);
            process.exit(1);
        }
    }
    
    main();
}
