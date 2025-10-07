#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { 
  fetchAnalyticsUrls, 
  validateUrlList, 
  writeStaticUnlighthouseConfig 
} = require('./urlTools');
const config = require('./config');

// Import configuration variables
const {
  MAX_STATIC_URLS,
  MAX_API_URLS
} = config;

/**
 * Static config validation and regeneration script
 * 
 *    console.log(`📊 Summary for ${configName}:`);
    console.log(`   • URLs from config: ${configUrls.length}`);
    console.log(`   • URLs from API: ${apiUrls.length}`);
    console.log(`   • URLs after filtering: ${filteredUrls.length}`);
    console.log(`   • Validated URLs: ${validatedUrls.length}`);
    console.log(`   • Updated config: ${originalConfigPath}`); script:
 * 1. Reads static config files (NSF, SEC, CMS, etc.)
 * 2. Extracts URLs from them 
 * 3. Validates URLs via network requests
 * 4. Optionally fetches additional URLs from analytics API
 * 5. Regenerates configs with validated URLs
 * 
 * Usage:
 *   node validateStaticConfigs.js                    # Validate all static configs
 *   node validateStaticConfigs.js nsf                # Validate specific config
 *   node validateStaticConfigs.js nsf --with-api     # Include API data
 *   node validateStaticConfigs.js --list             # List available configs
 */

// Static config mappings
const STATIC_CONFIG_MAPPINGS = {
  'unlighthouse.config-nsf.js': {
    agency: 'national-science-foundation',
    apiAgency: 'national-science-foundation',
    domain: 'www.nsf.gov'
  },
  'unlighthouse.config-sec.js': {
    agency: 'securities-exchange-commission', 
    apiAgency: 'securities-exchange-commission',
    domain: 'www.sec.gov'
  },
  'unlighthouse.config-cms.js': {
    agency: 'hhs',
    apiAgency: 'hhs',
    domain: 'www.cms.gov'
  },
  'unlighthouse.config-va.js': {
    agency: 'veterans-affairs',
    apiAgency: 'veterans-affairs',
    domain: 'www.va.gov'
  },
  'unlighthouse.config-education.js': {
    agency: 'education',
    apiAgency: 'education', 
    domain: 'www.ed.gov'
  }
};

/**
 * Filter out problematic URLs that cause scan failures
 * @param {Array<string>} urls - URLs to filter
 * @returns {Array<string>} - Filtered URLs
 */
function filterProblematicUrls(urls) {
  const problematicPatterns = [
    '/my-health/',
    '/my-va/',
    '/auth/',
    '/profile',
    '/logout',
    '/sign-in/',
    'callback',
    'login',
    'signin',
    '/ngl/', // 404 URLs
    '/rating', // Authentication-required rating pages
    '/status', // Status pages that need auth
    '/track-claims/', // Claim tracking needs auth
    '/records/download-va-letters/', // Letter downloads need auth
    '/va-payment-history/' // Payment history needs auth
  ];

  const filtered = urls.filter(url => {
    const isProblematic = problematicPatterns.some(pattern => 
      url.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (isProblematic) {
      console.log(`🚫 Filtering out problematic URL: ${url}`);
      return false;
    }
    
    return true;
  });

  console.log(`🔍 Filtered ${urls.length} URLs down to ${filtered.length} clean URLs`);
  return filtered;
}

/**
 * Extract URLs from a static config file
 * @param {string} configPath - Path to the config file
 * @returns {Array<string>} - Extracted URLs
 */
function extractUrlsFromConfig(configPath) {
  console.log(`📄 Reading config: ${configPath}`);
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }
  
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const urls = [];
  
  // Extract full HTTP URLs
  const httpMatches = configContent.match(/https:\/\/[^"'\s,\)]+/g) || [];
  urls.push(...httpMatches);
  
  // Extract relative paths from include array
  const includeMatch = configContent.match(/include:\s*\[([\s\S]*?)\]/);
  if (includeMatch) {
    const includeContent = includeMatch[1];
    const pathMatches = includeContent.match(/"(\/[^"]*?)"/g) || [];
    const relativePaths = pathMatches
      .map(match => match.replace(/"/g, ''))
      .filter(path => path && path.length > 0 && path !== '/');
    urls.push(...relativePaths);
  }
  
  // Extract from urls array
  const urlsMatch = configContent.match(/urls:\s*\[([\s\S]*?)\]/);
  if (urlsMatch) {
    const urlsContent = urlsMatch[1];
    const urlMatches = urlsContent.match(/"([^"]+)"/g) || [];
    const extractedUrls = urlMatches
      .map(match => match.replace(/"/g, ''))
      .filter(url => url && url.trim().length > 0);
    urls.push(...extractedUrls);
  }
  
  // Get site domain for relative path resolution
  const siteMatch = configContent.match(/site:\s*["']([^"']+)["']/);
  const siteDomain = siteMatch ? siteMatch[1] : null;
  
  // Convert relative paths to full URLs
  const fullUrls = urls.map(url => {
    if (url.startsWith('http')) {
      return url;
    } else if (url.startsWith('/') && siteDomain) {
      return `${siteDomain}${url}`;
    } else {
      return url;
    }
  }).filter(url => url && url.length > 0);
  
  // Remove duplicates
  const uniqueUrls = [...new Set(fullUrls)];
  
  console.log(`📄 Extracted ${uniqueUrls.length} unique URLs from config`);
  return uniqueUrls;
}

/**
 * Validate a single static config
 * @param {string} configName - Name of the config file
 * @param {Object} options - Validation options
 */
async function validateStaticConfig(configName, options = {}) {
  const {
    withApi = false,
    maxUrls = MAX_STATIC_URLS,
    maxApiUrls = MAX_API_URLS,
    outputValidated = true
  } = options;
  
  console.log(`\n🔍 Validating static config: ${configName}`);
  console.log(`Options: withApi=${withApi}, maxUrls=${maxUrls}, maxApiUrls=${maxApiUrls}`);
  
  const mapping = STATIC_CONFIG_MAPPINGS[configName];
  if (!mapping) {
    console.error(`❌ No mapping found for config: ${configName}`);
    return;
  }
  
  const configPath = path.join(__dirname, 'unlighthouse/config', configName);
  
  try {
    // 1. Extract URLs from config file
    let configUrls = extractUrlsFromConfig(configPath);
    
    // 2. Optionally fetch additional URLs from API
    let apiUrls = [];
    if (withApi && mapping.apiAgency) {
      console.log(`🌐 Fetching additional URLs from analytics API for: ${mapping.apiAgency}`);
      try {
        const allApiUrls = await fetchAnalyticsUrls(mapping.apiAgency);
        // Filter to the same domain and limit count
        apiUrls = allApiUrls
          .filter(url => {
            try {
              const domain = new URL(url).hostname;
              // Match both www.domain.gov and domain.gov
              const expectedDomain = mapping.domain;
              const expectedBase = expectedDomain.replace(/^www\./, '');
              return domain === expectedDomain || domain === expectedBase;
            } catch (e) {
              return false;
            }
          })
          .slice(0, maxApiUrls);
        
        console.log(`📊 Found ${apiUrls.length} additional URLs from API`);
      } catch (apiError) {
        console.warn(`⚠️ Failed to fetch API URLs: ${apiError.message}`);
      }
    }
    
    // 3. Combine and deduplicate URLs
    const allUrls = [...new Set([...configUrls, ...apiUrls])];
    console.log(`📋 Total URLs to validate: ${allUrls.length}`);
    
    // 4. Filter out problematic URLs before limiting count
    const filteredUrls = filterProblematicUrls(allUrls);
    console.log(`🔍 URLs after filtering: ${filteredUrls.length}`);
    
    // 5. Limit URL count
    const urlsToValidate = filteredUrls.slice(0, maxUrls);
    if (urlsToValidate.length < filteredUrls.length) {
      console.log(`⚠️ Limited to ${maxUrls} URLs (had ${filteredUrls.length} after filtering)`);
    }
    
    // 6. Validate URLs via network requests
    console.log(`🔍 Validating ${urlsToValidate.length} URLs...`);
    const validatedUrls = await validateUrlList(urlsToValidate, maxUrls);
    
    console.log(`✅ Validation complete: ${validatedUrls.length} valid URLs`);
    
    // 7. Save validated URLs if requested
    if (outputValidated) {
      const outputDir = path.join(__dirname, 'output/validated-static-configs');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputFile = path.join(outputDir, `${configName.replace('.js', '.json')}`);
      const outputData = {
        configFile: configName,
        agency: mapping.agency,
        domain: mapping.domain,
        validatedAt: new Date().toISOString(),
        urlCounts: {
          fromConfig: configUrls.length,
          fromApi: apiUrls.length,
          filtered: filteredUrls.length,
          validated: validatedUrls.length
        },
        urls: validatedUrls
      };
      
      fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
      console.log(`💾 Saved validated URLs to: ${outputFile}`);
    }
    
    // 8. Generate new config files in the original location
    console.log(`📝 Generating new config files...`);
    
    // Write the updated config back to the original location
    const originalConfigPath = path.join(__dirname, 'unlighthouse/config', configName);
    
    // Determine options based on the site
    const configOptions = {
      throttle: !mapping.domain.includes('nsf.gov'), // Disable throttling for NSF
      skipJavascript: validatedUrls.length > 75 // Skip JS for large configs
    };
    
    writeStaticUnlighthouseConfig({
      site: `https://${mapping.domain}`,
      urls: validatedUrls,
      outputPath: originalConfigPath,
      options: configOptions
    });
    
    console.log(`✅ Updated config file: ${originalConfigPath}`);
    
    // 9. Summary
    console.log(`\n📊 Summary for ${configName}:`);
    console.log(`   • URLs from config: ${configUrls.length}`);
    console.log(`   • URLs from API: ${apiUrls.length}`);
    console.log(`   • Validated URLs: ${validatedUrls.length}`);
    console.log(`   • Updated config: ${originalConfigPath}`);
    
    return {
      configName,
      urlCounts: {
        fromConfig: configUrls.length,
        fromApi: apiUrls.length,
        filtered: filteredUrls.length,
        validated: validatedUrls.length
      },
      configPath: originalConfigPath
    };
    
  } catch (error) {
    console.error(`❌ Error validating ${configName}: ${error.message}`);
    throw error;
  }
}

/**
 * List available static configs
 */
function listAvailableConfigs() {
  console.log('\n📋 Available static configs:');
  console.log('=' .repeat(50));
  
  Object.entries(STATIC_CONFIG_MAPPINGS).forEach(([configName, mapping]) => {
    const configPath = path.join(__dirname, 'unlighthouse/config', configName);
    const exists = fs.existsSync(configPath) ? '✅' : '❌';
    
    console.log(`${exists} ${configName}`);
    console.log(`   Agency: ${mapping.agency}`);
    console.log(`   Domain: ${mapping.domain}`);
    console.log(`   API: ${mapping.apiAgency}`);
    console.log('');
  });
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  // Handle --list flag
  if (args.includes('--list')) {
    listAvailableConfigs();
    return;
  }
  
  // Parse options
  const withApi = args.includes('--with-api');
  const verbose = args.includes('--verbose');
  const maxUrls = parseInt(args.find(arg => arg.startsWith('--max-urls='))?.split('=')[1]) || MAX_STATIC_URLS;
  
  // Get config name filter
  const configFilter = args.find(arg => !arg.startsWith('--'));
  
  if (verbose) {
    console.log('🔧 Options:', { withApi, maxUrls, configFilter });
  }
  
  try {
    const configsToValidate = configFilter 
      ? Object.keys(STATIC_CONFIG_MAPPINGS).filter(name => 
          name.toLowerCase().includes(configFilter.toLowerCase())
        )
      : Object.keys(STATIC_CONFIG_MAPPINGS);
    
    if (configsToValidate.length === 0) {
      console.error(`❌ No configs found matching: ${configFilter}`);
      process.exit(1);
    }
    
    console.log(`🚀 Validating ${configsToValidate.length} static configs...`);
    
    const results = [];
    for (const configName of configsToValidate) {
      try {
        const result = await validateStaticConfig(configName, {
          withApi,
          maxUrls,
          maxApiUrls: 50,
          outputValidated: true
        });
        results.push(result);
      } catch (error) {
        console.error(`❌ Failed to validate ${configName}: ${error.message}`);
        results.push({
          configName,
          error: error.message
        });
      }
    }
    
    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('🎯 VALIDATION SUMMARY');
    console.log('='.repeat(60));
    
    results.forEach(result => {
      if (result.error) {
        console.log(`❌ ${result.configName}: ERROR - ${result.error}`);
      } else {
        console.log(`✅ ${result.configName}: ${result.urlCounts.validated} URLs → config updated`);
      }
    });
    
    const successful = results.filter(r => !r.error).length;
    const failed = results.length - successful;
    
    console.log(`\n📊 Total: ${successful} successful, ${failed} failed`);
    
  } catch (error) {
    console.error(`❌ Fatal error: ${error.message}`);
    process.exit(1);
  }
}

// Help text
function showHelp() {
  console.log(`
🔧 Static Config Validator

Validates and regenerates static configuration files for government sites.

USAGE:
  node validateStaticConfigs.js [config] [options]

EXAMPLES:
  node validateStaticConfigs.js                    # Validate all configs
  node validateStaticConfigs.js nsf                # Validate NSF only
  node validateStaticConfigs.js sec --with-api     # Validate SEC + API data
  node validateStaticConfigs.js --list             # List available configs

OPTIONS:
  --with-api          Include additional URLs from analytics API
  --max-urls=N        Maximum URLs to process (default: 150)
  --verbose           Show detailed output
  --list              List available static configs
  --help              Show this help

AVAILABLE CONFIGS:
  ${Object.keys(STATIC_CONFIG_MAPPINGS).map(name => 
    '• ' + name.replace('unlighthouse.config-', '').replace('.js', '')
  ).join('\n  ')}
`);
}

// Run main function if script is executed directly
if (require.main === module) {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showHelp();
  } else {
    main().catch(error => {
      console.error(`❌ Unhandled error: ${error.message}`);
      process.exit(1);
    });
  }
}

module.exports = {
  validateStaticConfig,
  extractUrlsFromConfig,
  filterProblematicUrls,
  STATIC_CONFIG_MAPPINGS
};
