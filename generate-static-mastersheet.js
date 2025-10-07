#!/usr/bin/env node

const { updateStaticMasterSheet } = require('./unlighthouse-mastersheet-static');
const { google } = require('googleapis');
const path = require('path');

// Custom logger
const unlighthouseLogger = {
    debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.info(`[INFO] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
};

async function main() {
    try {
        unlighthouseLogger.info('🚀 Starting Static Config Master Sheet Generation...');
        
        // Set up Google Auth
        const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                           path.join(__dirname, 'service-account-key.json');
        
        if (!keyFilename) {
            throw new Error('Google service account credentials not found. Set GOOGLE_APPLICATION_CREDENTIALS environment variable.');
        }
        
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilename,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file'
            ]
        });
        
        const authClient = await auth.getClient();
        
        // Generate the static master sheet
        await updateStaticMasterSheet(authClient);
        
        unlighthouseLogger.info('✅ Static Config Master Sheet generation completed successfully!');
        
    } catch (error) {
        unlighthouseLogger.error('❌ Error generating static master sheet:', error.message);
        process.exit(1);
    }
}

// Run if this script is executed directly
if (require.main === module) {
    main();
}

module.exports = { main };
