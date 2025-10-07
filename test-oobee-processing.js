#!/usr/bin/env node

/**
 * OOBEE Processing Demo
 * 
 * This script demonstrates how to process OOBEE results and prepare them
 * for Google Sheets upload, similar to the existing unlighthouse workflow.
 */

const fs = require('fs');
const path = require('path');
const { processOobeeResults, extractAgencyFromDomain } = require('./oobee-mastersheet');

async function demonstrateOobeeProcessing() {
    console.log('🚀 OOBEE Processing Demonstration');
    console.log('=================================\n');
    
    try {
        // 1. Load and process OOBEE results
        console.log('📊 Step 1: Loading OOBEE Results');
        const resultsFile = './oobee-results.json';
        const oobeeData = await processOobeeResults(resultsFile);
        
        if (!oobeeData) {
            console.log('❌ No OOBEE results found');
            return;
        }
        
        console.log('✅ OOBEE results loaded successfully\n');
        
        // 2. Display summary information
        console.log('📋 Step 2: OOBEE Scan Summary');
        const summary = oobeeData.summary || {};
        console.log(`   Site Scanned: ${process.env.SITE_NAME || 'https://example.com'}`);
        console.log(`   Scanner: OOBEE`);
        console.log(`   Scan Date: ${new Date(oobeeData.timestamp).toLocaleDateString()}`);
        console.log(`   Total Pages Found: ${summary.totalPages || 'N/A'}`);
        console.log(`   Pages Actually Scanned: ${summary.pagesScanned || 'N/A'}`);
        console.log(`   Total Accessibility Issues: ${summary.totalViolations || 0}`);
        console.log(`   Critical (Must Fix): ${summary.mustFixViolations || 0}`);
        console.log(`   Recommended (Good to Fix): ${summary.goodToFixViolations || 0}\n`);
        
        // 3. Display violations breakdown
        console.log('🔍 Step 3: Accessibility Violations Breakdown');
        const violations = oobeeData.violations || [];
        
        if (violations.length === 0) {
            console.log('   🎉 No accessibility violations found! Site appears to be compliant.\n');
        } else {
            violations.forEach((violation, index) => {
                const priority = violation.severity === 'must-fix' ? '🔴' : '🟡';
                console.log(`   ${priority} ${violation.rule || 'Unknown Rule'}`);
                console.log(`      Severity: ${violation.severity || 'Unknown'}`);
                console.log(`      Count: ${violation.count || 0} issues`);
                console.log(`      Description: ${violation.description || 'No description available'}`);
                if (index < violations.length - 1) console.log('');
            });
            console.log('');
        }
        
        // 4. Extract agency information
        console.log('🏢 Step 4: Agency Detection');
        const siteUrl = process.env.SITE_NAME || 'https://example.gov';
        try {
            const agency = await extractAgencyFromDomain(siteUrl);
            console.log(`   Detected Agency: ${agency}`);
        } catch (error) {
            console.log(`   ⚠️ Agency detection failed: ${error.message}`);
        }
        console.log('');
        
        // 5. Show scan configuration
        console.log('⚙️ Step 5: Scan Configuration Details');
        const config = oobeeData.scanConfig || {};
        console.log(`   Scanner Type: ${config.scanner || 'N/A'}`);
        console.log(`   Device: ${config.device || 'N/A'}`);
        console.log(`   Headless Mode: ${config.headless || 'N/A'}`);
        console.log(`   Max Pages Setting: ${config.maxPages || 'N/A'}`);
        console.log(`   Safe Mode: ${config.safeMode || 'N/A'}`);
        console.log(`   File Types: ${config.fileTypes || 'N/A'}`);
        console.log(`   Ruleset: ${config.ruleset || 'N/A'}`);
        console.log(`   Follow Robots.txt: ${config.followRobots || 'N/A'}\n`);
        
        // 6. Show what would be uploaded to Google Sheets
        console.log('📤 Step 6: Google Sheets Upload Preview');
        console.log('   The following data would be uploaded to:');
        console.log('   - Master tracker sheet (cross-agency overview)');
        console.log('   - Agency-specific sheet (detailed agency view)');
        console.log('   - Individual scan results sheet (detailed findings)');
        console.log('');
        console.log('   Master Sheet Row Data:');
        const domain = siteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        const currentDate = new Date().toISOString().split('T')[0];
        console.log(`   [Agency] [${domain}] [${siteUrl}] [${currentDate}] [${summary.totalPages || 'N/A'}] [${summary.pagesScanned || 'N/A'}] [${summary.totalViolations || 0}] [${summary.mustFixViolations || 0}] [${summary.goodToFixViolations || 0}] [${resultsFile}]`);
        console.log('');
        
        // 7. Summary
        console.log('✅ Step 7: Processing Complete');
        console.log('   OOBEE results have been successfully processed and are ready for upload.');
        console.log('   To upload to Google Sheets, ensure GOOGLE_APPLICATION_CREDENTIALS is set.');
        console.log('');
        console.log('🔧 Usage Commands:');
        console.log('   # Process results only (what we just did):');
        console.log('   node test-oobee-processing.js');
        console.log('');
        console.log('   # Upload to master sheet only:');
        console.log('   SITE_NAME=https://example.gov node oobee-mastersheet.js');
        console.log('');
        console.log('   # Create individual results sheet and upload to master:');
        console.log('   SITE_NAME=https://example.gov node oobee-scandata-upload.js');
        console.log('');
        console.log('   # Full OOBEE scan with upload:');
        console.log('   SITE_NAME=https://example.gov UPLOAD_RESULTS=true node oobee-scanner.js');
        
    } catch (error) {
        console.error('❌ Error during OOBEE processing demonstration:', error.message);
        process.exit(1);
    }
}

// Run the demonstration
if (require.main === module) {
    demonstrateOobeeProcessing();
}

module.exports = { demonstrateOobeeProcessing };
