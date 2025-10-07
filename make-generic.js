#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to convert CivicActions-specific references to generic ones
 * for open-source release
 */

// Generic replacements
const replacements = {
  // User agent strings
  'Mozilla/5.0 (compatible; CivicActionsScanner/1.0; +https://civicactions.com)': 'Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)',
  'Mozilla/5.0 (compatible; CivicActionsScanner/1.0)': 'Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0)',
  
  // Email addresses
  'scanner@civicactions.com': 'scanner@example.com',
  'ci-bot@civicactions.com': 'ci-bot@example.com',
  
  // Website references
  'https://civicactions.com': 'https://github.com/your-org/federal-website-scanner',
  'http://civicactions.com': 'https://github.com/your-org/federal-website-scanner',
  'civicactions.com': 'github.com/your-org/federal-website-scanner',
  
  // Git references
  'git.civicactions.net': 'github.com',
  'gitlab-ci-token:${GITLAB_TOKEN}@git.civicactions.net': 'github-token:${GITHUB_TOKEN}@github.com',
  
  // Scanner names
  'CivicActionsScanner': 'FederalWebsiteScanner',
  'OOBEE-A11y-Scans-Tool': 'FederalWebsiteScanner-OOBEE',
  
  // OOBEE sheet names  
  'Veterans Affairs OOBEE': 'Veterans Affairs Accessibility',
  'Agriculture OOBEE': 'Agriculture Accessibility',
  'Health & Human Services OOBEE': 'Health & Human Services Accessibility',
  'Defense OOBEE': 'Defense Accessibility',
  'Homeland Security OOBEE': 'Homeland Security Accessibility',
  'Transportation OOBEE': 'Transportation Accessibility',
  'Treasury OOBEE': 'Treasury Accessibility',
  'Education OOBEE': 'Education Accessibility',
  'Energy OOBEE': 'Energy Accessibility',
  'Justice OOBEE': 'Justice Accessibility',
  'Labor OOBEE': 'Labor Accessibility',
  'State OOBEE': 'State Accessibility'
};

// Files to exclude from processing
const excludeFiles = [
  'node_modules',
  '.git',
  'output',
  'make-generic.js',
  'package-lock.json'
];

// File extensions to process
const processExtensions = ['.js', '.yml', '.yaml', '.md', '.json', '.sh'];

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  if (!processExtensions.includes(ext)) return false;
  
  const relativePath = path.relative(process.cwd(), filePath);
  return !excludeFiles.some(exclude => relativePath.startsWith(exclude));
}

function processFileContent(content, filePath) {
  let modified = content;
  let changesMade = false;
  
  for (const [oldText, newText] of Object.entries(replacements)) {
    if (modified.includes(oldText)) {
      console.log(`  🔄 Replacing "${oldText}" in ${path.basename(filePath)}`);
      modified = modified.replace(new RegExp(escapeRegex(oldText), 'g'), newText);
      changesMade = true;
    }
  }
  
  return { content: modified, changed: changesMade };
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let totalChanges = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      if (!excludeFiles.includes(entry.name)) {
        totalChanges += await processDirectory(fullPath);
      }
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { content: newContent, changed } = processFileContent(content, fullPath);
        
        if (changed) {
          fs.writeFileSync(fullPath, newContent);
          totalChanges++;
          console.log(`  ✅ Updated ${path.relative(process.cwd(), fullPath)}`);
        }
      } catch (error) {
        console.warn(`  ⚠️ Could not process ${fullPath}: ${error.message}`);
      }
    }
  }
  
  return totalChanges;
}

async function main() {
  console.log('🧹 Making Federal Website Scanner generic for open source...');
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  const totalChanges = await processDirectory(process.cwd());
  const endTime = Date.now();
  
  console.log('='.repeat(60));
  console.log(`✨ Conversion complete!`);
  console.log(`📊 Files modified: ${totalChanges}`);
  console.log(`⏱️ Time taken: ${endTime - startTime}ms`);
  
  // Additional cleanup for specific files
  console.log('\n🔧 Performing additional cleanup...');
  
  // Remove CivicActions test URLs from validate_urls.js
  const validateUrlsPath = './validate_urls.js';
  if (fs.existsSync(validateUrlsPath)) {
    let content = fs.readFileSync(validateUrlsPath, 'utf8');
    
    // Remove CivicActions URLs from test URLs array
    const testUrlsRegex = /const testUrls = \[[\s\S]*?"https:\/\/civicactions\.com"[\s\S]*?\];/;
    if (testUrlsRegex.test(content)) {
      content = content.replace(testUrlsRegex, `const testUrls = [
  "https://example.gov",
  "https://www.example.gov"
];`);
      fs.writeFileSync(validateUrlsPath, content);
      console.log('  ✅ Updated test URLs in validate_urls.js');
    }
  }
  
  console.log('\n🎉 Generic version ready for open source!');
  console.log('\n📝 Next steps:');
  console.log('   1. Review the changes');
  console.log('   2. Update README.md with your project details');
  console.log('   3. Configure GitHub repository URL in package.json');
  console.log('   4. Set up Google Sheets credentials (optional)');
  console.log('   5. Test with: npm run validate');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { processFileContent, replacements };
