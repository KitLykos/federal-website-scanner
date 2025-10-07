const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');
const axios = require('axios');
const { parse } = require('csv-parse/sync');
const json2csv = require('json2csv').parse;
// Add this import for the master sheet functionality
const { updateMasterSheet } = require('./unlighthouse-mastersheet');
const { updateStaticScanResults } = require('./unlighthouse-mastersheet-static');

// Custom logger implementation
const unlighthouseLogger = {
    debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.info(`[INFO] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
};

// Add support for SITE_FILE while maintaining SITE_NAME compatibility
let siteUrl;

// Check for SITE_FILE first
if (process.env.SITE_FILE) {
    unlighthouseLogger.info(`SITE_FILE set to: ${process.env.SITE_FILE}`);
    try {
        const siteConfig = require(path.resolve(process.env.SITE_FILE));
        if (siteConfig && siteConfig.site) {
            siteUrl = siteConfig.site;
            unlighthouseLogger.info(`Extracted site URL from config: ${siteUrl}`);
            // Set SITE_NAME for backward compatibility with existing code
            process.env.SITE_NAME = siteUrl;
        } else {
            unlighthouseLogger.warn('Config file found but no site URL defined in it');
        }
    } catch (error) {
        unlighthouseLogger.error(`Failed to load site config: ${error.message}`);
    }
}

// Fall back to SITE_NAME if SITE_FILE didn't provide a valid URL
process.env.SITE_NAME = process.env.SITE_NAME || siteUrl || undefined;
unlighthouseLogger.info(`SITE_NAME set to: ${process.env.SITE_NAME}`);

// Ensure SITE_NAME is defined in the environment variables - keep existing check
if (!process.env.SITE_NAME) {
    unlighthouseLogger.error('Neither SITE_NAME nor a valid SITE_FILE environment variable is set.');
    process.exit(1); // Exit the script with an error code
}

async function ensureSheetExists(auth, spreadsheetId, sheetName, index) {
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const sheetMetadata = await sheets.spreadsheets.get({
            spreadsheetId,
            fields: 'sheets.properties(sheetId,title)'
        });

        const existingSheet = sheetMetadata.data.sheets.find(sheet => sheet.properties.title === sheetName);

        if (sheetName === "Summary") return sheetName;

        if (existingSheet) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                resource: {
                    requests: [{
                        deleteSheet: {
                            sheetId: existingSheet.properties.sheetId
                        }
                    }]
                }
            });
        }

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [{
                    addSheet: {
                        properties: {
                            title: sheetName,
                            index: index
                        }
                    }
                }]
            }
        });
    } catch (error) {
        unlighthouseLogger.error(`Error ensuring sheet exists: ${error.message}`, error);
        throw error;
    }

    return sheetName;
}

function parseCSV(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const lines = fileContent.split('\n').filter(Boolean);
        if (lines.length === 0) return [];

        const headerLine = lines[0];
        const headers = headerLine.split(',');
        const expectedLength = headers.length;

        // Filter out rows with the wrong number of columns
        const validLines = [headerLine];
        lines.slice(1).forEach((line, idx) => {
            const cols = line.split(',');
            if (cols.length === expectedLength) {
                validLines.push(line);
            } else {
                unlighthouseLogger.warn(`Skipping CSV row ${idx + 2} (expected ${expectedLength} columns, got ${cols.length})`);
            }
        });

        return parse(validLines.join('\n'), {
            columns: true,
            delimiter: ',',
            trim: true,
            skip_empty_lines: true,
        });
    } catch (error) {
        unlighthouseLogger.error('Error reading CSV file', error);
        throw error;
    }
}

// Ensure all necessary fields are included in the CSV data
async function uploadToGoogleSheet(auth, spreadsheetId, data) {
    const sheets = google.sheets({ version: 'v4', auth });
    const today = new Date().toISOString().slice(0, 10); // Use the current date as the sheet title
    const range = `${today}!A1`; // Update the range to include the sheet title

    // Format the data to match the new format
    const formattedData = data.map(row => {
        return Object.values(row).map(value => value || '');
    });

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: {
                values: formattedData.slice(1), // Remove the headers
            },
        });
        unlighthouseLogger.info(`Row count (excluding header) for sheet "${today}": ${formattedData.length - 1}`);
    } catch (error) {
        unlighthouseLogger.error(`Error uploading to Google Sheet: ${error.message}`, error);
        throw error;
    }
}

async function findRowByUrl(url, csvFilePath) {
    const records = parseCSV(csvFilePath);
    return records.find(record => record.url === url);
}

async function appendToGoogleSheet(auth, spreadsheetId, sheetTitle, values) {
    const sheets = google.sheets({ version: 'v4', auth });
    const range = `${sheetTitle}!A1`;
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
            values: [values],
        },
    });
}

function logError(domain, error) {
    const logsDir = './logs'; // Define the logs directory
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    const timeStr = `${today.getHours().toString().padStart(2, "0")}-${today.getMinutes().toString().padStart(2, "0")}-${today.getSeconds().toString().padStart(2, "0")}`;
    const sanitizedDomain = domain.replace(/[^a-zA-Z0-9]/g, "_"); // Sanitize the domain to be filesystem-safe
    const logFileName = `${sanitizedDomain}-${dateStr}-${timeStr}-error.log`;
    const logFilePath = path.join(logsDir, logFileName);

    const errorDetails = `Error: ${error.message}\nStack: ${error.stack}\n\n`;
    fs.appendFileSync(logFilePath, errorDetails);

    return logFilePath;
}

const normalizeUrl = (url) => {
    try {
        // Ensure the URL starts with 'http://' or 'https://'
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        const urlObj = new URL(url);
        return urlObj.toString().replace(/\/+$/, ''); // Remove trailing slashes
    } catch (error) {
        unlighthouseLogger.error('Invalid URL:', error);
        return url;
    }
};

// Replace only the checkUrl function with this version:
const checkUrl = async (url) => {
    // Normalize URL without making HTTP requests
    const normalizedUrl = normalizeUrl(url);
    
    try {
        // Extract domain directly from the URL
        const parsedUrl = new URL(normalizedUrl);
        const domain = parsedUrl.hostname.replace(/^www\./, '');
        return { 
            url: normalizedUrl, 
            title: domain,
            domain: domain
        };
    } catch (error) {
        unlighthouseLogger.error(`Error parsing URL: ${normalizedUrl}`, error);
        
        // Fallback for invalid URLs
        const domain = url.replace(/^https?:\/\//i, '').replace(/\/$/, '').replace(/^www\./, '');
        return { 
            url: normalizedUrl, 
            title: domain,
            domain: domain
        };
    }
};

const createFromTemplate = async (auth, templateId, newTitle) => {
    const drive = google.drive({ version: 'v3', auth });

    try {
        const existingFiles = await drive.files.list({
            q: `name='${newTitle}' and mimeType='application/vnd.google-apps.spreadsheet' and parents in '1-8FGgtrPBH7aZrMxVlAkxooHXSzDv-w_'`,
            fields: 'files(id, name)',
        });

        if (existingFiles.data.files.length > 0) {
            return existingFiles.data.files[0];
        }

        const copy = await drive.files.copy({
            fileId: templateId,
            requestBody: {
                name: newTitle,
                parents: ['1-8FGgtrPBH7aZrMxVlAkxooHXSzDv-w_'],
            },
        });

        return copy.data;
    } catch (err) {
        unlighthouseLogger.error('Error during file copy operation:', err.message);
        throw err;
    }
};

// Fix the hardcoded 'Manual' value in processUrlFunction
async function processUrlFunction(url, auth) {
    try {
        // Add this line to get the scanSchedule in the function's scope
        const scanSchedule = process.env.SCAN_SCHEDULE || 'Manual';
        
        const urlData = await checkUrl(url);
        if (!urlData || urlData.title.toLowerCase() === 'template') {
            unlighthouseLogger.warn(`Skipping URL with title 'template': ${url}`);
            return null;
        }

        // Normalize the URL to get the short hostname
        const shortUrl = new URL(urlData.url).hostname.replace(/^www\./, '');

        // Update this line to use the local scanSchedule variable
        const newTitle = generateTitle('Unlighthouse Scan', shortUrl, scanSchedule);

        // Example: Log the generated title for debugging
        unlighthouseLogger.info(`Generated title: ${newTitle}`);

        const templateId = '1UVyn_LPLCFqrXORqNqwSUvrkZtrmXUYUErbVZtxc5Tw';
        const drive = google.drive({ version: 'v3', auth });

        // Check for existing Google Sheets
        const existingFiles = await drive.files.list({
            q: `name='${newTitle}' and mimeType='application/vnd.google-apps.spreadsheet' and parents in '1-8FGgtrPBH7aZrMxVlAkxooHXSzDv-w_'`,
            fields: 'files(id, name)',
        });

        let newData;
        if (existingFiles.data.files.length > 0) {
            newData = {
                url: urlData.url,
                name: newTitle,
                sheet_id: existingFiles.data.files[0].id,
                sheet_url: `https://docs.google.com/spreadsheets/d/${existingFiles.data.files[0].id}/edit`,
                max: 500,
            };
        } else {
            // Create a new sheet from the template
            const copyData = await createFromTemplate(auth, templateId, newTitle);
            if (!copyData) {
                unlighthouseLogger.error(`Failed to create sheet from template for URL: ${url}`);
                return null;
            }

            newData = {
                url: urlData.url,
                name: newTitle,
                sheet_id: copyData.id,
                sheet_url: `https://docs.google.com/spreadsheets/d/${copyData.id}/edit`,
                max: 500,
            };
        }

        // Process CSV data
        const csvFilePath = '.unlighthouse/ci-result.csv';
        if (!fs.existsSync(csvFilePath)) {
            unlighthouseLogger.error(`CSV file not found: ${csvFilePath}`);
            return null;
        }

        const csvData = parseCSV(csvFilePath);
        if (!csvData || csvData.length === 0) {
            unlighthouseLogger.error(`CSV file is empty or invalid: ${csvFilePath}`);
            return null;
        }

        const headers = Object.keys(csvData[0]);
        const formattedData = [headers, ...csvData.map(row => headers.map(header => row[header] || ''))];

        // Ensure the sheet exists
        const sheetName = await ensureSheetExists(auth, newData.sheet_id, new Date().toISOString().slice(0, 10));
        if (!sheetName) {
            unlighthouseLogger.error(`Failed to ensure sheet exists for URL: ${url}`);
            return null;
        }

        // Append data to the "Introduction" sheet
        const row = await findRowByUrl(url, csvFilePath);
        if (row) {
            await appendToGoogleSheet(auth, newData.sheet_id, 'Introduction', row);
        }

        // Upload formatted data to the sheet
        await uploadToGoogleSheet(auth, newData.sheet_id, formattedData);

        // Update the "Introduction" sheet
        const sheets = google.sheets({ version: 'v4', auth });
        await updateIntroductionSheet(sheets, newData.sheet_id, newData.name);

        // ADD THIS: Update the master tracking sheet
        await updateMasterSheet(auth, newData);

        // Check if this is a static config scan and update static master sheet
        if (process.env.SITE_FILE) {
            try {
                // Extract config filename from path
                const configFileName = path.basename(process.env.SITE_FILE);
                
                // Use the original config URL instead of the normalized scan URL
                const originalConfigUrl = siteUrl || newData.url;
                
                const staticScanData = {
                    ...newData,
                    url: originalConfigUrl,  // Use original config URL for matching
                    configFile: configFileName
                };
                await updateStaticScanResults(auth, staticScanData);
                unlighthouseLogger.info('Updated static master sheet');
            } catch (error) {
                unlighthouseLogger.warn(`Failed to update static master sheet: ${error.message}`);
            }
        }

        return newData;
    } catch (error) {
        unlighthouseLogger.error(`Error processing URL: ${url}`, error);
        return null;
    }
}

async function authenticateGoogleSheets() {
    try {
        // Check if the environment variable contains a file path or direct JSON content
        let credentials;
        const credentialsEnv = process.env.GOOGLE_SHEETS_API_CREDENTIALS_FILE;
        
        if (credentialsEnv.startsWith('{') && credentialsEnv.endsWith('}')) {
            // It's likely a JSON string
            credentials = JSON.parse(credentialsEnv);
        } else {
            // It's likely a file path
            if (!fs.existsSync(credentialsEnv)) {
                unlighthouseLogger.error(`Credentials file not found at path: ${credentialsEnv}`);
                return null;
            }
            credentials = JSON.parse(fs.readFileSync(credentialsEnv, 'utf8'));
        }

        if (!credentialsEnv && process.env.GOOGLE_SHEETS_API_CREDENTIALS_JSON) {
            try {
                credentials = JSON.parse(process.env.GOOGLE_SHEETS_API_CREDENTIALS_JSON);
            } catch (error) {
                unlighthouseLogger.error('Failed to parse GOOGLE_SHEETS_API_CREDENTIALS_JSON', error);
                return null;
            }
        }
        
        const auth = await google.auth.getClient({
            credentials,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive'
            ]
        });
        return auth;
    } catch (error) {
        unlighthouseLogger.error('Failed to authenticate with Google Sheets', error);
        if (error.code === 'ENOENT') {
            unlighthouseLogger.error('The service account file does not exist. Please check the file path.');
        } else if (error instanceof SyntaxError) {
            unlighthouseLogger.error('Failed to parse GOOGLE_SHEETS_API_CREDENTIALS_JSON environment variable. Ensure it is valid JSON.');
        }
        return null;
    }
}

const updateIntroductionSheet = async (sheets, spreadsheetId, sheetTitle) => {
    try {
        // First get the sheet's current dimensions
        const sheetMetadata = await sheets.spreadsheets.get({
            spreadsheetId,
            fields: 'sheets(properties)'
        });
        
        const introSheet = sheetMetadata.data.sheets.find(sheet => 
            sheet.properties.title === 'Introduction'
        );
        
        if (!introSheet) {
            unlighthouseLogger.warn('Introduction sheet not found, skipping update');
            return;
        }
        
        // Get current values to find the first empty cell
        const range = 'Introduction!G:G';
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: range,
        });

        const values = response.data.values || [];
        
        // Find the first empty cell or use the last row + 1
        let targetRow = 1; // Default to first row if no data
        
        for (let i = 0; i < values.length; i++) {
            if (!values[i] || !values[i][0]) {
                targetRow = i + 1;
                break;
            }
            // If we reach the end, use the next row
            if (i === values.length - 1) {
                targetRow = values.length + 1;
            }
        }
        
        // Check if we need to add rows
        if (targetRow > 80) { // Assuming sheet has 81 rows originally
            // Add more rows to the sheet
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                resource: {
                    requests: [{
                        appendDimension: {
                            sheetId: introSheet.properties.sheetId,
                            dimension: 'ROWS',
                            length: 20 // Add 20 more rows
                        }
                    }]
                }
            });
            unlighthouseLogger.info(`Extended Introduction sheet with 20 additional rows`);
        }
        
        // Now write to the target row
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Introduction!G${targetRow}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[sheetTitle]]
            }
        });
        
        unlighthouseLogger.info(`Updated Introduction sheet at row ${targetRow}`);
    } catch (error) {
        unlighthouseLogger.error(`Error updating Introduction sheet: ${error.message}`);
        // Don't throw the error - allow the script to continue even if this update fails
    }
};

const csvFilePath = path.join(__dirname, '.unlighthouse/ci-result.csv'); // Ensure the correct path for the CSV file

function calculateAverageScores(csvData) {
    const totalScores = {};
    const fieldsToExclude = ['URL', 'Date', 'Count']; // Fields to exclude
    const allFields = Object.keys(csvData[0]).filter(field => !fieldsToExclude.includes(field)); // Exclude unnecessary fields

    let totalCount = 0;

    csvData.forEach(row => {
        totalCount += 1;
        allFields.forEach(field => {
            if (!totalScores[field]) {
                totalScores[field] = 0;
            }
            totalScores[field] += parseFloat(row[field]) || 0;
        });
    });

    const averageScores = {
        Date: new Date().toISOString().split("T")[0], // Add the date field
        Count: totalCount,
    };

    allFields.forEach(field => {
        averageScores[field] = (totalScores[field] / totalCount).toFixed(2);
    });

    return [averageScores]; // Return as an array with a single object
}

function writeSummaryCSV(averageScores, outputFilePath) {
    const fields = ['Date', 'Count', ...Object.keys(averageScores[0]).filter(field => field !== 'Count' && field !== 'Date')];
    const csvData = averageScores;
    const csv = json2csv(csvData, { fields });

    fs.writeFileSync(outputFilePath, csv);
}

async function updateSummarySheet(auth, spreadsheetId, summaryFilePath) {
    const sheets = google.sheets({ version: 'v4', auth });
    const summaryData = parseCSV(summaryFilePath);

    const formattedData = summaryData.map(row => {
        return Object.values(row).map(value => value || '');
    });

    try {
        const existingDataResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Summary!A1:Z',
        });

        const existingData = existingDataResponse.data.values || [];
        const existingEntries = new Set(existingData.map(row => row.join(',')));

        const newData = formattedData.filter(row => !existingEntries.has(row.join(',')));

        if (newData.length === 0) {
            return;
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: 'Summary!A1',
            valueInputOption: 'RAW',
            resource: {
                values: newData,
            },
        });

        const numRows = newData.length;
        const numCols = newData[0].length;

        const requests = [];
        for (let row = existingData.length + 1; row <= existingData.length + numRows; row++) {
            for (let col = 1; col <= numCols; col++) {
                requests.push({
                    repeatCell: {
                        range: {
                            sheetId: (await sheets.spreadsheets.get({ spreadsheetId })).data.sheets.find(sheet => sheet.properties.title === 'Summary').properties.sheetId,
                            startRowIndex: row - 1,
                            endRowIndex: row,
                            startColumnIndex: col - 1,
                            endColumnIndex: col,
                        },
                        cell: {
                            userEnteredFormat: {
                                horizontalAlignment: 'RIGHT',
                            },
                        },
                        fields: 'userEnteredFormat.horizontalAlignment',
                    },
                });
            }
        }

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests,
            },
        });
    } catch (error) {
        unlighthouseLogger.error('Error updating Summary sheet', error);
        throw error;
    }
}

const generateTitle = (taskName, jobName, scanSchedule) => {
    const formattedJobName = processJobName(jobName);
    return `${taskName} - ${formattedJobName} - ${scanSchedule}`;
};

const processJobName = (jobName) => {
    if (!jobName) return 'DefaultJobName';
    const match = jobName.match(/https?:\/\/[^\s]+/);
    if (match && match[0]) {
        try {
            const urlObj = new URL(match[0]);
            return urlObj.hostname.replace(/^www\./, '');
        } catch {
            return jobName;
        }
    }
    return jobName;
};

const taskName = process.env.TASK_NAME || 'Unlighthouse Scan';
const scanSchedule = process.env.SCAN_SCHEDULE || 'Manual';

// Use the already defined siteUrl variable instead of redeclaring it
// This will work for both SITE_FILE and SITE_NAME configurations
const currentUrl = process.env.SITE_NAME; // Use existing SITE_NAME that was set earlier
let siteHost;

try {
  siteHost = new URL(/^https?:\/\//.test(currentUrl) ? currentUrl : `https://${currentUrl}`).hostname.replace(/^www\./, '');
} catch (error) {
  unlighthouseLogger.warn(`Could not parse URL "${currentUrl}" - using as is`);
  siteHost = currentUrl || 'example.org';
}

const newTitle = generateTitle(taskName, siteHost, scanSchedule);


(async () => {
    const url = process.env.SITE_NAME;
    if (!url || typeof url !== 'string') {
        unlighthouseLogger.error('Invalid URL provided.');
        return null;
    }
    const startTime = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    const formattedStartTime = new Intl.DateTimeFormat('en-US', options).format(startTime);
    unlighthouseLogger.info(`Start time for ${url}: ${formattedStartTime}`);
    
    try {
        // Wrap Unlighthouse-related logic in a try-catch block
        const normalizedUrlResult = await checkUrl(url);
        if (!normalizedUrlResult) {
            // This should never happen with the new implementation, but just in case:
            unlighthouseLogger.warn('URL normalization returned null, using fallback approach.');
            const domain = url.replace(/^https?:\/\//i, '').replace(/\/$/, '').replace(/^www\./, '');
            normalizedUrlResult = { 
                url: url,
                title: domain,
                domain: domain,
                error: true
            };
        }
        
        // Handle both successful response and error response from checkUrl
        let shortUrl;
        if (normalizedUrlResult.error) {
            // For domains that couldn't be accessed, use the domain directly
            shortUrl = normalizedUrlResult.domain;
            unlighthouseLogger.warn(`Using domain name directly for failed URL: ${shortUrl}`);
        } else {
            // For successful URL checks, extract hostname
            try {
                shortUrl = new URL(normalizedUrlResult.url).hostname.replace(/^www\./, '');
            } catch (e) {
                // If URL parsing fails, use the raw url as fallback
                shortUrl = url.replace(/^https?:\/\//i, '').replace(/\/$/, '').replace(/^www\./, '');
                unlighthouseLogger.warn(`Fallback to raw domain: ${shortUrl}`);
            }
        }
        
        const auth = await authenticateGoogleSheets();
        if (!auth) {
            unlighthouseLogger.error('Failed to authenticate with Google Sheets.');
            return;
        }
        
        const newTitle = generateTitle('Unlighthouse Scan', shortUrl, scanSchedule); // Use the normalized short URL
        
        const newData = await processUrlFunction(shortUrl, auth);
        if (!newData) {
            unlighthouseLogger.error('Failed to process URL.');
            return;
        }
        
        const csvFilePath = '.unlighthouse/ci-result.csv'; // Use the same CSV file path
        const csvData = parseCSV(csvFilePath);
        const averageScores = calculateAverageScores(csvData); // Pass the site URL being scanned

        const outputFilePath = path.join(__dirname, '.unlighthouse/summary.csv'); // Update the path to drop the summary CSV in the same directory
        writeSummaryCSV(averageScores, outputFilePath);

        await updateSummarySheet(auth, newData.sheet_id, outputFilePath);
        
        unlighthouseLogger.info('Process completed successfully!');
    } catch (error) {
        // Log any errors thrown by Unlighthouse or other parts of the script
        unlighthouseLogger.error('An error occurred during the Unlighthouse process.');
        // Don't stringify the entire error object, just log key properties
        unlighthouseLogger.error(`Error message: ${error.message}`);
        unlighthouseLogger.error(`Error type: ${error.name}`);
        unlighthouseLogger.error(`Error stack: ${error.stack}`);
    }
    
    // Calculate and log execution time
    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000; // Convert to seconds
    unlighthouseLogger.info(`Total execution time: ${executionTime.toFixed(2)} seconds`);
})();