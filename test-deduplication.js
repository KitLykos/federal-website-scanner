#!/usr/bin/env node

// Test the deduplication logic locally
const fs = require('fs');
const path = require('path');

// Simulate the logic from unlighthouse-mastersheet-static.js
async function testDeduplicationLogic() {
    const VERBOSE = process.env.VERBOSE === 'true';
    
    console.log('🧪 Testing Deduplication Logic...');
    
    // Get some sample config data
    const configsPath = path.join(__dirname, 'configs', 'validated');
    const configFiles = fs.readdirSync(configsPath)
        .filter(file => file.endsWith('.config.js'))
        .sort();
    
    // Focus on va.gov and arts.gov chunked jobs
    const testConfigs = [];
    
    // Get all va.gov chunked configs
    const vaConfigs = configFiles.filter(file => file.includes('veterans-affairs-www-va-gov-part'));
    // Get all arts.gov chunked configs  
    const artsConfigs = configFiles.filter(file => file.includes('national-education-association-www-arts-gov-part'));
    
    const testFiles = [...vaConfigs, ...artsConfigs];
    
    if (VERBOSE) {
        console.log(`Found ${vaConfigs.length} VA configs and ${artsConfigs.length} Arts configs`);
        console.log('Test files:', testFiles.slice(0, 8));
    }
    
    for (const configFile of testFiles) {
        const configPath = path.join(configsPath, configFile);
        try {
            const configContent = fs.readFileSync(configPath, 'utf8');
            const siteMatch = configContent.match(/["']?site["']?\s*:\s*["']([^"']+)["']/);
            const siteUrl = siteMatch ? siteMatch[1] : null;
            
            if (VERBOSE) console.log(`Processing ${configFile}: found site = ${siteUrl}`);
            
            if (siteUrl) {
                testConfigs.push({
                    configFile,
                    site: siteUrl,
                    agency: siteUrl.includes('va.gov') ? 'Department of Veterans Affairs' : 'Department of Education',
                    domain: siteUrl.replace('https://', '').replace('http://', '').replace('www.', '')
                });
            }
        } catch (error) {
            if (VERBOSE) console.log(`Error reading ${configFile}:`, error.message);
        }
    }
    
    console.log(`📋 Test configs found: ${testConfigs.length}`);
    
    if (VERBOSE) {
        testConfigs.forEach(config => {
            console.log(`  ${config.configFile} -> ${config.site}`);
        });
    }
    
    // Simulate existing entries (like what would be in the spreadsheet)
    const simulatedExistingData = [
        ['Department of Veterans Affairs', 'va.gov', 'veterans-affairs-www-va-gov-part1.config.js', 'Sheet1', 'url1', '2025-09-18', 'https://www.va.gov'],
        ['Department of Education', 'arts.gov', 'national-education-association-www-arts-gov-part1.config.js', 'Sheet2', 'url2', '2025-09-18', 'https://www.arts.gov']
    ];
    
    if (VERBOSE) {
        console.log('\n📊 Simulated existing data:');
        simulatedExistingData.forEach(row => {
            console.log(`  ${row[2]} -> ${row[6]}`);
        });
    }
    
    // Build existingEntriesMap using our logic
    const existingEntriesMap = {};
    simulatedExistingData.forEach(row => {
        if (row && row[6] && row[2]) { // Site URL and Config File columns
            const key = `${row[6]}|${row[2]}`; // URL + Config File as key
            existingEntriesMap[key] = {
                sheetName: row[3],
                sheetUrl: row[4],
                lastScanDate: row[5]
            };
        }
    });
    
    if (VERBOSE) {
        console.log('\n🗝️  Generated keys in existingEntriesMap:');
        Object.keys(existingEntriesMap).forEach(key => {
            console.log(`  ${key}`);
        });
    }
    
    // Test the merging logic
    console.log('\n🔄 Testing merge logic...');
    const mergedRows = testConfigs.map(config => {
        const key = `${config.site}|${config.configFile}`;
        const existing = existingEntriesMap[key];
        
        if (VERBOSE) {
            console.log(`  Config: ${config.configFile}`);
            console.log(`    Key: ${key}`);
            console.log(`    Found existing: ${existing ? 'YES' : 'NO'}`);
        }
        
        return [
            config.agency,
            config.domain,
            config.configFile,
            existing ? existing.sheetName : '',
            existing ? existing.sheetUrl : '',
            existing ? existing.lastScanDate : '',
            config.site
        ];
    });
    
    if (VERBOSE) {
        console.log('\n📋 Final merged rows:');
        mergedRows.forEach(row => {
            console.log(`  ${row[2]} -> ${row[6]} (has existing data: ${row[3] ? 'YES' : 'NO'})`);
        });
    }
    
    // Count chunked jobs
    const chunkedJobs = mergedRows.filter(row => /-part\d+\.config\.js$/.test(row[2]));
    console.log(`\n✅ Test complete! Processed ${mergedRows.length} configs, found ${chunkedJobs.length} chunked jobs`);
    
    return mergedRows;
}

testDeduplicationLogic().catch(console.error);
