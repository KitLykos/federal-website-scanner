const path = require('path');
const fs = require('fs');
const {
  fetchSitemapUrls,
  fetchAnalyticsUrls,
  validateUrlList,
  writeStaticConfig,
  crawlSiteForUrls
} = require('./urlTools');
const {
  processDynamicAgencies,
  saveValidatedData
} = require('./dynamicUrlProcessor');
const config = require('./config');

// Import configuration variables
const {
  CHUNK_SIZE,
  PAGE_TIMEOUT_MS,
  SCAN_CONCURRENCY,
  DEFAULT_AGENCY_NAMES,
  DEBUG
} = config;

/**
 * Ensure directory exists, creating it if necessary
 * @param {string} dirPath - Path to check/create
 */
function ensureDirectoryExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dirPath}`);
    }
  } catch (err) {
    console.error(`⚠️ Could not create directory ${dirPath}: ${err.message}`);
  }
}

// Output directories
const OUTPUT_DIR = path.join(__dirname, 'output/validated-urls');
const CONFIG_DIR = path.join(__dirname, 'configs/validated');
const CHECKED_IN_DIR = path.join(__dirname, 'output/checked-in');
const ERRORS_DIR = path.join(__dirname, 'output/validation-errors');

// Ensure output directories exist
ensureDirectoryExists(OUTPUT_DIR);
ensureDirectoryExists(CONFIG_DIR);
ensureDirectoryExists(CHECKED_IN_DIR);
ensureDirectoryExists(ERRORS_DIR);

// Fallback mappings for specific sites
const FALLBACK_DYNAMIC_AGENCIES = {
  "unlighthouse.config-sec.js": "securities-exchange-commission",
  "unlighthouse.config-nsf.js": "national-science-foundation",
  "unlighthouse.config-cms.js": "hhs"
};

// Sites that should skip URL validation (use predefined URLs as-is)
const SKIP_VALIDATION_SITES = [
  "unlighthouse.config-va.js",
  "unlighthouse.config-cms.js",
  "unlighthouse.config-nsf.js",
  "unlighthouse.config-sec.js",
  "unlighthouse.config-education.js",
  // Add more config filenames here as needed
];

// URLs/domains to exclude from scanning (test URLs, company URLs, etc.)
const EXCLUDED_URLS = [
  "https://github.com/your-org/federal-website-scanner",
  "https://github.com/your-org/federal-website-scanner",
  "github.com/your-org/federal-website-scanner",
  // Add more URLs to exclude here as needed
];

// Mapping of config filenames to agency names for consistent naming
const CONFIG_TO_AGENCY_MAPPING = {
  "unlighthouse.config-va.js": "veterans-affairs",
  "unlighthouse.config-cms.js": "hhs",
  "unlighthouse.config-nsf.js": "national-science-foundation",
  "unlighthouse.config-sec.js": "securities-exchange-commission",
  "unlighthouse.config-education.js": "education",
  // Add more mappings as needed
};

// Source https://open.gsa.gov/api/dap/#available-agencies
/*
const AGENCY_NAMES = [
  "agency-international-development",
  "american-battle-monuments-commission",
  "commodity-futures-trading-commission",
  "consumer-financial-protection-bureau",
  "consumer-product-safety-commission",
  "corporation-national-community-service",
  "defense-nuclear-facilities-safety-board",
  "denali-commission",
  "agriculture",
  "commerce",
  "defense",
  "energy",
  "health-human-services",
  "homeland-security",
  "housing-urban-development",
  "interior",
  "justice",
  "labor",
  "state",
  "transportation",
  "treasury",
  "veterans-affairs",
  "environmental-protection-agency",
  "equal-employment-opportunity-commission",
  "executive-office-president",
  "farm-credit-administration",
  "federal-bureau-investigation",
  "federal-deposit-insurance-corporation",
  "federal-election-commission",
  "federal-energy-regulatory-commission",
  "federal-housing-finance-agency",
  "federal-maritime-commission",
  "federal-mine-safety-health-review-commission",
  "federal-retirement-thrift-investment-board",
  "federal-trade-commission",
  "general-services-administration",
  "inter-american-foundation",
  "international-development-finance-corporation",
  "merit-systems-protection-board",
  "millennium-challenge-corporation",
  "national-aeronautics-space-administration",
  "national-archives-records-administration",
  "national-capital-planning-commission",
  "national-council-disability",
  "national-credit-union-administration",
  "national-education-association",
  "national-endowment-humanities",
  "national-labor-relations-board",
  "national-mediation-board",
  "national-oceanic-atmospheric-administration",
  "national-park-service",
  "national-reconnaissance-office",
  "national-science-foundation",
  "national-transportation-safety-board",
  "nuclear-regulatory-commission",
  "nuclear-waste-technical-review-board",
  "office-director-national-intelligence",
  "office-government-ethics",
  "office-navajo-hopi-indian-relocation",
  "office-personnel-management",
  "peace-corps",
  "pension-benefit-guaranty-corporation",
  "postal-regulatory-commission",
  "privacy-civil-liberties-oversight-board",
  "public-buildings-reform-board",
  "securities-exchange-commission",
  "small-business-administration",
  "social-security-administration",
  "special-inspector-general-afghanistan-restoration",
  "surface-transportation-board",
  "tennessee-valley-authority",
  "udall-foundation",
  "access-board",
  "agency-global-media",
  "commission-civil-rights",
  "us-courts",
  "international-trade-commission",
  "postal-inspection-service",
  "postal-service",
  "railroad-retirement-board",
  "trade-development-agency"
];
*/

// Agency names loaded from centralized configuration
const AGENCY_NAMES = DEFAULT_AGENCY_NAMES;


/**
 * Process a single static configuration file
 * @param {string} siteFile - Path to the configuration file
 * @returns {Promise<void>}
 */
async function processStaticMode(siteFile) {
  try {
    const resolvedPath = path.resolve(siteFile);
    if (DEBUG) console.log(`📄 Loading config from: ${resolvedPath}`);

    if (!fs.existsSync(resolvedPath)) throw new Error(`Config file not found at: ${resolvedPath}`);

    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    let config;
    if (fileContent.includes('export default')) {
      if (DEBUG) console.log('📄 Detected ES module format, converting...');
      const configStr = fileContent.match(/export\s+default\s+(\{[\s\S]*\})/)[1];
      config = new Function('return ' + configStr)();
    } else {
      config = require(resolvedPath);
    }

    const site = config.site;
    const sitemapUrl = config?.scanner?.sitemap;

    let rawUrls = [];
    let skipUrlDiscovery = false;

    // Check if this config is in the skip validation list FIRST
    const configFilename = path.basename(siteFile);
    if (SKIP_VALIDATION_SITES.includes(configFilename)) {
      if (DEBUG) console.log(`📋 Config ${configFilename} is in skip validation list, extracting URLs...`);
      skipUrlDiscovery = true;
      
      try {
        // Extract URLs using regex from the config content
        const configContent = fs.readFileSync(siteFile, 'utf-8');
        
        // First get full HTTP URLs
        const httpMatches = configContent.match(/https:\/\/[^"'\s,\)]+/g) || [];
        
        // Then extract relative paths from the include array
        const includeMatch = configContent.match(/include:\s*\[([\s\S]*?)\]/);
        let relativePaths = [];
        if (includeMatch) {
          // Extract quoted strings that start with "/" from the include array
          const includeContent = includeMatch[1];
          const pathMatches = includeContent.match(/"(\/[^"]*?)"/g) || [];
          relativePaths = pathMatches.map(match => match.replace(/"/g, ''))
            .filter(path => path && path.length > 0 && path !== '/'); // Filter out empty strings and root path duplicates
        }
        
        // Also check for a root-level urls array (for configs like Education)
        const urlsMatch = configContent.match(/urls:\s*\[([\s\S]*?)\]/);
        let urlsFromArray = [];
        if (urlsMatch) {
          // Extract all quoted URLs from the urls array
          const urlsContent = urlsMatch[1];
          const urlMatches = urlsContent.match(/"([^"]+)"/g) || [];
          urlsFromArray = urlMatches.map(match => match.replace(/"/g, ''))
            .filter(url => url && url.trim().length > 0);
        }
        
        // Combine all URLs and filter out empty values and excluded URLs
        const allUrls = [...httpMatches, ...relativePaths, ...urlsFromArray]
          .filter(url => url && url.trim().length > 0)
          .filter(url => {
            // Filter out excluded URLs
            const normalizedUrl = url.toLowerCase().trim();
            return !EXCLUDED_URLS.some(excludedUrl => {
              const normalizedExcluded = excludedUrl.toLowerCase();
              return normalizedUrl === normalizedExcluded || 
                     normalizedUrl.includes(normalizedExcluded) ||
                     (url.startsWith('http') && new URL(url).hostname.includes('github.com/your-org/federal-website-scanner'));
            });
          });
        
        if (allUrls.length > 0) {
          console.log(`✅ Extracted ${allUrls.length} URLs from config`);
          
          // For static configs, group URLs by domain to create separate configs for cross-domain scanning
          const urlsByDomain = {};
          allUrls.forEach(url => {
            let domain;
            try {
              if (url.startsWith('http')) {
                domain = new URL(url).origin;
              } else {
                // Relative URLs go with the main site
                domain = site;
              }
            } catch {
              // If URL parsing fails, group with main site
              domain = site;
            }
            
            if (!urlsByDomain[domain]) {
              urlsByDomain[domain] = [];
            }
            urlsByDomain[domain].push(url);
          });
          
          if (DEBUG) console.log(`🌐 Found ${Object.keys(urlsByDomain).length} domains: ${Object.keys(urlsByDomain).join(', ')}`);
          
          // Store all URLs for processing, but we'll create separate configs later
          rawUrls = allUrls;
          console.log(`📊 Total URLs for scanning: ${allUrls.length}`);
        } else {
          console.warn(`⚠️ No URLs found in skip validation config ${configFilename}`);
          skipUrlDiscovery = false; // Fall back to normal processing
        }
      } catch (err) {
        console.warn(`⚠️ Error reading skip validation config: ${err.message}`);
        skipUrlDiscovery = false; // Fall back to normal processing
      }
    }

    // Only do sitemap/crawling if we're not skipping discovery
    if (!skipUrlDiscovery) {
      if (!sitemapUrl) throw new Error("Missing .scanner.sitemap in config");

      if (DEBUG) console.log(`🔍 Fetching URLs from sitemap: ${sitemapUrl}`);

      try {
        rawUrls = await fetchSitemapUrls(sitemapUrl);
      } catch (err) {
      console.warn(`⚠️ Primary sitemap fetch failed for ${sitemapUrl}: ${err.message}`);
      
      // Try common alternative sitemap locations
      const siteUrl = new URL(site);
      const domain = siteUrl.hostname;
      
      // Define common sitemap patterns and site-specific locations
      const alternativeSitemaps = [
        `${siteUrl.origin}/sitemap.xml`,
        `${siteUrl.origin}/sitemap_index.xml`,
        `${siteUrl.origin}/sitemap`,
        // Site-specific sitemaps for known problematic sites
        ...(domain === 'www.cms.gov' ? [`${siteUrl.origin}/sitemap/sitemap-index.xml`] : []),
        ...(domain === 'www.sec.gov' ? [`${siteUrl.origin}/info/sitemap_index.html`] : [])
      ];
      
      // Filter out the original sitemap URL that already failed
      const filteredAlternatives = alternativeSitemaps.filter(url => url !== sitemapUrl);
      
      // Try each alternative sitemap
      let sitemapFound = false;
      for (const altSitemapUrl of filteredAlternatives) {
        try {
          if (DEBUG) console.log(`🔍 Trying alternative sitemap: ${altSitemapUrl}`);
          rawUrls = await fetchSitemapUrls(altSitemapUrl);
          if (DEBUG) console.log(`✅ Found working sitemap at ${altSitemapUrl}`);
          sitemapFound = true;
          break;
        } catch (altErr) {
          if (DEBUG) console.log(`❌ Alternative sitemap failed: ${altSitemapUrl}`);
        }
      }
      
      // If all sitemap attempts fail, fall back to crawling
      if (!sitemapFound) {
        console.log(`🕸️ All sitemap attempts failed. Trying to crawl the site...`);
        
        try {
          // Use crawling as a fallback approach
          const crawledUrls = await crawlSiteForUrls(site, 50, 2);
          
          if (crawledUrls.length > 0) {
            console.log(`✅ Successfully crawled ${crawledUrls.length} URLs`);
            rawUrls = crawledUrls;
            sitemapFound = true;
          } else {
            console.warn(`⚠️ Crawler found no valid URLs`);
          }
        } catch (crawlErr) {
          console.warn(`⚠️ Error during crawling: ${crawlErr.message}`);
        }
        
        // If crawling also failed, try analytics API fallback
        if (!sitemapFound) {
          const configFilename = path.basename(siteFile);
          const fallbackAgency = FALLBACK_DYNAMIC_AGENCIES[configFilename];
          
          if (fallbackAgency) {
            console.warn(`⚠️ All sitemap attempts failed. Falling back to dynamic agency mode for ${fallbackAgency}`);
            const urls = await fetchAnalyticsUrls(fallbackAgency);
            const validationResult = await validateUrlList(urls);
            const validated = validationResult.validUrls;
            const validationErrors = validationResult.invalidUrls;

            const outputPath = path.join(OUTPUT_DIR, `${fallbackAgency}.json`);
            fs.writeFileSync(outputPath, JSON.stringify(validated, null, 2), 'utf-8');
            
            // Save validation errors for fallback agency
            if (validationErrors.length > 0) {
              const errorsPath = path.join(ERRORS_DIR, `${fallbackAgency}.errors.json`);
              const errorReport = {
                timestamp: new Date().toISOString(),
                siteName: fallbackAgency,
                totalErrors: validationErrors.length,
                totalValidUrls: validated.length,
                errors: validationErrors
              };
              fs.writeFileSync(errorsPath, JSON.stringify(errorReport, null, 2), 'utf-8');
              console.log(`❌ Saved ${validationErrors.length} fallback validation errors to: ${errorsPath}`);
            }

            // Extract filename without extension to use as a base
            const baseOutputName = path.basename(siteFile, '.js');
            
            // Generate config file with the same name pattern as the input file
            const configPath = path.join(CONFIG_DIR, `${baseOutputName}.config.js`);
            
            writeStaticConfig({ 
              site: site || urls[0],
              urls: validated, 
              outputPath: configPath 
            });

            console.log(`✅ Fallback config written: ${configPath}`);
            return;
          } else {
            throw new Error(`Sitemap fetch failed and no fallback agency defined for ${configFilename}`);
          }
        }
      }
    }
    }

    if (skipUrlDiscovery) {
      if (DEBUG) console.log(`🔄 Using ${rawUrls.length} URLs from source config instead of discovery`);
    }
    
    // Remove duplicates from rawUrls
    const uniqueUrls = [...new Set(rawUrls)];

    if (uniqueUrls.length < rawUrls.length) {
      if (DEBUG) console.log(`🧹 Removed ${rawUrls.length - uniqueUrls.length} duplicate URLs.`);
    }

    let validated;
    let validationErrors = [];
    
    if (skipUrlDiscovery) {
      console.log(`⚡ Skipping URL validation for static config URLs`);
      validated = uniqueUrls;
    } else {
      const validationResult = await validateUrlList(uniqueUrls);
      validated = validationResult.validUrls;
      validationErrors = validationResult.invalidUrls;
    }
    
    const outputName = path.basename(siteFile, '.js');
    const validatedPath = path.join(OUTPUT_DIR, `${outputName}.json`);
    fs.writeFileSync(validatedPath, JSON.stringify(validated, null, 2), 'utf-8');
    
    // Save validation errors to a separate file
    if (validationErrors.length > 0) {
      const errorsPath = path.join(ERRORS_DIR, `${outputName}.errors.json`);
      const errorReport = {
        timestamp: new Date().toISOString(),
        siteName: outputName,
        totalErrors: validationErrors.length,
        totalValidUrls: validated.length,
        errors: validationErrors
      };
      fs.writeFileSync(errorsPath, JSON.stringify(errorReport, null, 2), 'utf-8');
      console.log(`❌ Saved ${validationErrors.length} validation errors to: ${errorsPath}`);
    }

    // --- START: Chunking Logic ---
    // Number of URLs per config file (loaded from centralized config)
    
    // Only chunk if we're NOT skipping URL discovery (i.e., for dynamically discovered URLs)
    if (!skipUrlDiscovery && validated.length > CHUNK_SIZE) {
      console.log(`📦 URL list is large (${validated.length} URLs). Chunking into groups of ${CHUNK_SIZE}.`);
      let chunkIndex = 1;
      for (let i = 0; i < validated.length; i += CHUNK_SIZE) {
        const chunk = validated.slice(i, i + CHUNK_SIZE);
        const chunkedOutputName = `${outputName}-chunk${chunkIndex}`;
        const configPath = path.join(CONFIG_DIR, `${chunkedOutputName}.config.js`);
        
        if (DEBUG) console.log(`📝 Writing chunk ${chunkIndex} with ${chunk.length} URLs to ${configPath}`);
        
        writeStaticConfig({ 
          site, 
          urls: chunk, 
          outputPath: configPath,
          scanner: {
            device: 'mobile',
            concurrency: SCAN_CONCURRENCY,
            pageTimeout: PAGE_TIMEOUT_MS
          }
        });
        chunkIndex++;
      }
    } else {
      // For static configs or smaller lists, create config files
      const configFilename = path.basename(siteFile);
      
      // For static configs in skip validation list, handle cross-domain URLs
      if (skipUrlDiscovery && SKIP_VALIDATION_SITES.includes(configFilename)) {
        // Group URLs by domain for cross-domain scanning
        const urlsByDomain = {};
        validated.forEach(url => {
          let domain;
          try {
            if (url.startsWith('http')) {
              domain = new URL(url).origin;
            } else {
              // Relative URLs go with the main site
              domain = site;
            }
          } catch {
            // If URL parsing fails, group with main site
            domain = site;
          }
          
          if (!urlsByDomain[domain]) {
            urlsByDomain[domain] = [];
          }
          urlsByDomain[domain].push(url);
        });
        
        const domains = Object.keys(urlsByDomain);
        if (DEBUG) console.log(`🌐 Creating configs for ${domains.length} domains`);
        
        let configIndex = 1;
        for (const domain of domains) {
          const domainUrls = urlsByDomain[domain];
          const domainName = domain.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-');
          
          let configName;
          if (domains.length === 1) {
            // Single domain, use original filename pattern
            configName = path.basename(siteFile, '.js');
          } else {
            // Multiple domains, append domain identifier
            configName = `${path.basename(siteFile, '.js')}-${domainName}`;
          }
          
          const configPath = path.join(CONFIG_DIR, `${configName}.config.js`);
          
          if (DEBUG) console.log(`📝 Writing config ${configIndex}/${domains.length}: ${configName}.config.js (${domainUrls.length} URLs for ${domain})`);
          
          writeStaticConfig({ 
            site: domain, // Use the domain as the site for proper cross-domain scanning
            urls: domainUrls, 
            outputPath: configPath,
            scanner: {
              sitemap: false,
              crawler: false,
              robotsTxt: false,
              maxRoutes: 100,
              throttle: true,
              skipJavascript: false,
              samples: 1,
              pageTimeout: 120000,
              device: "desktop",
              exclude: [
                "/*.pdf",
                "/*.asp",
                "/*.aspx",
                "/sample-pfs-searches",
                "/security-guidelines-office-location",
                "/status-indicators",
                "/blog",
                "/my-health/*",
                "/my-va/*",
                "/auth/*",
                "/profile/*",
                "/logout",
                "**/callback*",
                "**/login*",
                "**/signin*"
              ]
            },
            puppeteerOptions: {
              args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--headless=new"
              ],
              concurrency: 1
            },
            lighthouseOptions: {
              disableStorageReset: true,
              disableLantern: true,
              throttlingMethod: "provided",
              onlyCategories: ["accessibility", "seo", "best-practices"]
            }
          });
          
          configIndex++;
        }
      } else {
        // For non-static configs, use original logic
        let baseName;
        const agencyName = CONFIG_TO_AGENCY_MAPPING[configFilename];
        baseName = agencyName || path.basename(siteFile, '.js');
        const configPath = path.join(CONFIG_DIR, `${baseName}.config.js`);
        
        writeStaticConfig({ 
          site, 
          urls: validated, 
          outputPath: configPath,
          scanner: {
            device: 'mobile',
            concurrency: SCAN_CONCURRENCY,
            pageTimeout: PAGE_TIMEOUT_MS
          }
        });
        console.log(`✅ Static config written: ${configPath}`);
      }
    }
    // --- END: Chunking Logic ---

    console.log(`✅ Static validated: ${validatedPath}`);
  } catch (err) {
    console.error(`❌ Static mode failed: ${err.message}`);
    throw err;
  }
}

/**
 * Generate a consolidated error report from all validation error files
 */
function generateConsolidatedErrorReport() {
  try {
    const errorFiles = fs.readdirSync(ERRORS_DIR).filter(file => file.endsWith('.errors.json'));
    
    if (errorFiles.length === 0) {
      console.log(`✅ No validation errors found - all URLs were valid!`);
      return;
    }
    
    let totalErrors = 0;
    let totalSites = errorFiles.length;
    const errorsByType = {};
    const errorsBySite = {};
    
    for (const errorFile of errorFiles) {
      const errorPath = path.join(ERRORS_DIR, errorFile);
      const errorData = JSON.parse(fs.readFileSync(errorPath, 'utf-8'));
      
      totalErrors += errorData.totalErrors;
      errorsBySite[errorData.siteName] = {
        totalErrors: errorData.totalErrors,
        totalValidUrls: errorData.totalValidUrls,
        timestamp: errorData.timestamp
      };
      
      // Categorize errors by type
      for (const error of errorData.errors) {
        const errorType = error.statusCode ? `HTTP ${error.statusCode}` : 'Network/Timeout';
        errorsByType[errorType] = (errorsByType[errorType] || 0) + 1;
      }
    }
    
    const consolidatedReport = {
      reportGenerated: new Date().toISOString(),
      summary: {
        totalSitesWithErrors: totalSites,
        totalErrors: totalErrors,
        errorsByType: errorsByType
      },
      siteBreakdown: errorsBySite
    };
    
    const consolidatedPath = path.join(ERRORS_DIR, 'consolidated-error-report.json');
    fs.writeFileSync(consolidatedPath, JSON.stringify(consolidatedReport, null, 2), 'utf-8');
    
    console.log(`📊 Generated consolidated error report: ${consolidatedPath}`);
    console.log(`📈 Summary: ${totalSites} sites with errors, ${totalErrors} total failed URLs`);
    
  } catch (err) {
    console.warn(`⚠️ Failed to generate consolidated error report: ${err.message}`);
  }
}

// Main execution
(async () => {
  const SITE_FILE = process.env.SITE_FILE;
  const DYNAMIC_AGENCY = process.env.DYNAMIC_AGENCY;

  try {
    if (SITE_FILE) {
      // Static mode: Process a specific config file
      await processStaticMode(SITE_FILE);
    } else {
      // Dynamic mode: Process one or more agencies
      const targets = DYNAMIC_AGENCY ? [DYNAMIC_AGENCY] : AGENCY_NAMES;
      console.log(`🔍 Processing ${targets.length} agencies in dynamic mode: ${targets.join(', ')}`);
      
      const allValidated = await processDynamicAgencies(targets);
      saveValidatedData(allValidated);
    }
    
    // Generate consolidated error report at the end
    generateConsolidatedErrorReport();
    
  } catch (err) {
    console.error(`❌ Process failed: ${err.message}`);
    process.exit(1);
  }
})();
