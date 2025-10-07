const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { writeDynamicUnlighthouseConfig } = require('./urlTools');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Make sure you install node-fetch: npm install node-fetch@2 --save
const govSiteConfig = require('./governmentSiteHandler');
const config = require('./config');
const { createLogger } = require('./logger');

// Import configuration variables
const {
  MAX_URLS_PER_DOMAIN,
  CHUNK_SIZE,
  SPLIT_LARGE_DOMAINS,
  DEBUG,
  GENERAL_REQUEST_TIMEOUT_MS
} = config;

// Create a logger for this module
const log = createLogger('ConfigGenerator');

const redirectCache = new Map();

/**
 * Ensures a directory exists, creating it recursively if needed
 * @param {string} dirPath - Directory path to ensure exists
 */
function ensureDirectoryExists(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      return; // Directory already exists
    }
    
    // Recursively create parent directories
    fs.mkdirSync(dirPath, { recursive: true });
    log.debug(`Created directory: ${dirPath}`);
  } catch (error) {
    log.error(`Failed to create directory ${dirPath}: ${error.message}`);
    // Don't throw, just report the error
  }
}

/**
 * Finds existing config files for an agency
 * @param {string} agencyName - Agency name to search for
 * @returns {Array<{configFile: string, domain: string, safeDomain: string}>}
 */
function findExistingConfigs(agencyName) {
  const configDir = path.join(__dirname, 'configs/validated');
  let allConfigFiles = [];
  
  try {
    // First ensure the directory exists
    ensureDirectoryExists(configDir);
    
    // Then try to read it
    allConfigFiles = fs.readdirSync(configDir);
  } catch (error) {
    console.error(`❌ Error reading config directory ${configDir}: ${error.message}`);
    return []; // Return empty array on failure
  }
  
  // Filter config files by agency name (case insensitive)
  // Match configs that either:
  // 1. Start with agencyName- (e.g., education-domain.config.js)
  // 2. Are exactly agencyName.config.js (e.g., education.config.js)
  const agencyNameLower = agencyName.toLowerCase();
  const matchingConfigFiles = allConfigFiles.filter(filename => {
    const filenameLower = filename.toLowerCase();
    return filenameLower === `${agencyNameLower}.config.js` || 
           filenameLower.startsWith(`${agencyNameLower}-`);
  });
  
  console.log(`Found ${matchingConfigFiles.length} matching config files for "${agencyName}"`);
  
  return matchingConfigFiles.map(configFile => {
    const filenameWithoutExt = configFile.replace(/\.config\.js$/, '');
    const domain = filenameWithoutExt.replace(`${agencyName}-`, '');
    const safeDomain = domain;
    const configPath = `configs/validated/${configFile}`;
    
    return {
      configFile: configPath,
      domain,
      safeDomain
    };
  });
}

/**
 * Processes URLs into domain groups, resolving redirects
 * @param {Array<string>} urls - List of URLs to process
 * @returns {Promise<Object>} - Object with domains as keys and arrays of URL objects as values
 */
async function groupUrlsByDomain(urls) {
  const domains = {};
  
  // Process URLs in batches to avoid too many concurrent requests
  const batchSize = 5;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const promises = batch.map(async (url) => {
      try {
        // Use the retry-enabled redirect resolver
        const { finalUrl, redirected, statusCode } = await resolveRedirectsWithRetry(url);
        
        // Skip URLs that return error status codes
        if (statusCode >= 400) {
          console.warn(`⚠️ Skipping URL with status ${statusCode}: ${url}`);
          return null;
        }
        
        // Parse the final URL to get the domain
        const parsed = new URL(finalUrl);
        const domain = parsed.hostname;
        
        // Skip obviously invalid domains
        if (!domain || domain.length < 3) {
          console.warn(`⚠️ Skipping invalid domain: ${domain} from URL: ${url}`);
          return null;
        }
        
        // Create an object with both original and final URLs
        return {
          domain,
          originalUrl: url,
          finalUrl: finalUrl,
          redirected: redirected
        };
      } catch (e) {
        console.warn(`⚠️ Skipping invalid URL: ${url}, Error: ${e.message}`);
        return null;
      }
    });
    
    // Wait for all URLs in this batch to be processed
    const results = await Promise.all(promises);
    
    // Add valid results to the domains object
    // Process results as before, but with special handling for problematic domains
    for (const result of results) {
      if (result) {
        const { domain, originalUrl, finalUrl, redirected, problematicDomain } = result;
        
        if (!domains[domain]) domains[domain] = [];
        
        // Add URL info to the domain group
        domains[domain].push({
          originalUrl,
          finalUrl,
          redirected,
          problematicDomain: problematicDomain || false
        });
        
        // Log redirects for visibility
        if (redirected) {
          console.log(`ℹ️ URL redirected: ${originalUrl} → ${finalUrl}`);
        }
        
        // Special logging for problematic domains
        if (problematicDomain) {
          console.warn(`⚠️ Added URL from problematic domain: ${originalUrl}`);
        }
      }
    }
  }
  
  return domains;
}

/**
 * Generates configs for all domains in an agency
 * @param {string} agency - Agency name
 * @param {Array<string>} urls - List of URLs for this agency
 * @param {string} [baseDomain] - Optional base domain to force using a single domain
 * @param {Object} [options] - Configuration options
 * @returns {Promise<Array<Object>>} - Array of job block objects
 */
async function generateConfigsForAgency(agency, urls, baseDomain = null, options = {}) {
  const {
    maxUrlsPerDomain = MAX_URLS_PER_DOMAIN,
    splitLargeDomains = SPLIT_LARGE_DOMAINS,
    chunkSize = CHUNK_SIZE
  } = options;
  
  if (DEBUG) {
    console.log(`Processing agency: ${agency} with ${urls.length} URLs${baseDomain ? ` for domain: ${baseDomain}` : ''}`);
    console.log(`Config options: maxUrlsPerDomain=${maxUrlsPerDomain}, splitLargeDomains=${splitLargeDomains}, chunkSize=${chunkSize}`);
  }
  
  // Validate input
  if (!agency || typeof agency !== 'string') {
    console.error('❌ Invalid agency name provided');
    return [];
  }
  
  if (!Array.isArray(urls) || urls.length === 0) {
    console.error(`❌ No valid URLs provided for agency: ${agency}`);
    return [];
  }
  
  let domains;
  
  // If baseDomain is provided, skip grouping and use the provided domain
  if (baseDomain) {
    if (DEBUG) console.log(`Using provided base domain: ${baseDomain}`);
    
    // Create a domain group structure with just this one domain
    // The URLs are already validated, so we can use them directly.
    domains = {
      [baseDomain]: urls.map(url => ({
        originalUrl: url,
        finalUrl: url,
        redirected: false
      }))
    };
  } else {
    // Group URLs by domain without redirect resolution
    if (DEBUG) console.log('Grouping URLs by domain without re-validation.');
    domains = {};
    for (const url of urls) {
      try {
        const domain = new URL(url).hostname;
        if (!domains[domain]) {
          domains[domain] = [];
        }
        domains[domain].push({
          originalUrl: url,
          finalUrl: url,
          redirected: false
        });
      } catch (e) {
        console.warn(`⚠️ Skipping invalid URL during grouping: ${url}`);
      }
    }
  }
  
  const jobBlocks = [];
  
  if (DEBUG) console.log(`Found ${Object.keys(domains).length} domains for agency: ${agency}`);
  
  // Ensure config directories exist
  const configBaseDir = path.join(__dirname, 'configs');
  const validatedConfigDir = path.join(configBaseDir, 'validated');
  
  try {
    ensureDirectoryExists(configBaseDir);
    ensureDirectoryExists(validatedConfigDir);
  } catch (error) {
    console.error(`❌ Failed to create config directories: ${error.message}`);
    // Continue anyway, as writeDynamicUnlighthouseConfig might handle this differently
  }
  
  for (const [domain, urlObjects] of Object.entries(domains)) {
    if (!urlObjects.length) {
      console.warn(`⚠️ Skipping ${agency}/${domain} — no valid URLs`);
      continue;
    }

    // Extract just the final URLs for the config
    let finalUrls = urlObjects.map(obj => obj.finalUrl);
    
    // Handle large domains by splitting them if enabled
    if (splitLargeDomains && finalUrls.length > maxUrlsPerDomain) {
      if (DEBUG) console.log(`📦 Domain ${domain} has ${finalUrls.length} URLs, splitting into chunks of ${chunkSize}`);
      
      // Split URLs into chunks
      const chunks = [];
      for (let i = 0; i < finalUrls.length; i += chunkSize) {
        chunks.push(finalUrls.slice(i, i + chunkSize));
      }
      
      // Create a job for each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const safeDomain = domain.replace(/[^a-z0-9-]/gi, '-');
        const chunkSuffix = chunks.length > 1 ? `-part${i + 1}` : '';
        const jobName = `scan-${agency.replace(/[^a-z0-9]/gi, '-')}-${safeDomain}${chunkSuffix}`;
        
        try {
          if (DEBUG) console.log(`Writing config for ${domain}${chunkSuffix} with ${chunk.length} paths`);
          const configPath = writeDynamicUnlighthouseConfig({
            agency,
            domain: domain, // Original domain for site URL
            configDomain: `${domain}${chunkSuffix}`, // Suffixed domain for file naming
            urls: chunk,
            // Include information about redirects for reference
            redirectInfo: urlObjects.filter(obj => obj.redirected).map(obj => ({
              from: obj.originalUrl,
              to: obj.finalUrl
            }))
          });

          // Create both Unlighthouse and OOBEE jobs
          jobBlocks.push({
            jobName,
            scanType: 'unlighthouse',
            agency,
            domain: `${safeDomain}${chunkSuffix}`,
            configFile: configPath,
            urlCount: chunk.length,
            isChunk: chunks.length > 1,
            chunkIndex: i + 1,
            totalChunks: chunks.length
          });
          
          // Add OOBEE job for the same domain
          jobBlocks.push({
            jobName: `oobee-${agency.replace(/[^a-z0-9]/gi, '-')}-${safeDomain}${chunkSuffix}`,
            scanType: 'oobee',
            agency,
            domain: `${safeDomain}${chunkSuffix}`,
            configFile: configPath,
            urlCount: chunk.length,
            isChunk: chunks.length > 1,
            chunkIndex: i + 1,
            totalChunks: chunks.length
          });
        } catch (writeError) {
          console.error(`❌ Failed to write config for ${agency}/${domain}${chunkSuffix}: ${writeError.message}`);
          // If it's a file system error, provide more details
          if (writeError.code) {
            console.error(`   Error code: ${writeError.code}, File: ${writeError.path || 'unknown'}`);
          }
        }
      }
    } else {
      // Single domain job (existing logic)
      // Limit URLs if they exceed maxUrlsPerDomain but splitting is disabled
      if (finalUrls.length > maxUrlsPerDomain) {
        console.warn(`⚠️ Domain ${domain} has ${finalUrls.length} URLs, limiting to ${maxUrlsPerDomain} (splitting disabled)`);
        finalUrls = finalUrls.slice(0, maxUrlsPerDomain);
      }

      try {
        const safeDomain = domain.replace(/[^a-z0-9-]/gi, '-');
        const jobName = `scan-${agency.replace(/[^a-z0-9]/gi, '-')}-${safeDomain}`;

        // Add more detailed error handling around the config writing
        let configPath;
        try {
          if (DEBUG) console.log(`Writing config for ${domain} with ${finalUrls.length} paths`);
          configPath = writeDynamicUnlighthouseConfig({
            agency,
            domain,
            urls: finalUrls,
            // Include information about redirects for reference
            redirectInfo: urlObjects.filter(obj => obj.redirected).map(obj => ({
              from: obj.originalUrl,
              to: obj.finalUrl
            }))
          });
        } catch (writeError) {
          console.error(`❌ Failed to write config for ${agency}/${domain}: ${writeError.message}`);
          // If it's a file system error, provide more details
          if (writeError.code) {
            console.error(`   Error code: ${writeError.code}, File: ${writeError.path || 'unknown'}`);
          }
          continue; // Skip this domain on failure
        }

        // Create both Unlighthouse and OOBEE jobs
        jobBlocks.push({
          jobName,
          scanType: 'unlighthouse',
          agency,
          domain: safeDomain,
          configFile: configPath,
          urlCount: finalUrls.length
        });
        
        // Add OOBEE job for the same domain
        jobBlocks.push({
          jobName: `oobee-${agency.replace(/[^a-z0-9]/gi, '-')}-${safeDomain}`,
          scanType: 'oobee',
          agency,
          domain: safeDomain,
          configFile: configPath,
          urlCount: finalUrls.length
        });
      } catch (e) {
        console.error(`❌ Failed to process domain ${domain} for ${agency}: ${e.message}`);
        if (e.stack) {
          console.error(`   Stack trace: ${e.stack.split('\n')[0]}`);
        }
      }
    }
  }
  
  // Check if this agency contains problematic domains
  const hasProblematicDomains = Object.entries(domains).some(([domain]) => 
    isProblematicDomain(domain)
  );

  if (hasProblematicDomains) {
    console.warn(`⚠️ Agency ${agency} contains problematic domains - using conservative settings`);
    
    // You might want to implement special handling here:
    // - Reduce the number of concurrent requests
    // - Set more conservative timeouts
    // - Implement special validation for these configs
  }
  
  return jobBlocks;
}

/**
 * Follows redirects and returns the final URL with better timeout handling
 * @param {string} url - Initial URL to check
 * @param {number} maxRedirects - Maximum number of redirects to follow (default: 5)
 * @returns {Promise<{finalUrl: string, redirected: boolean, statusCode: number}>}
 */
async function resolveRedirects(url, maxRedirects = 5, options = {}) {
  // Check cache first
  if (redirectCache.has(url)) {
    return redirectCache.get(url);
  }
  
  // Track URLs in the redirect chain to detect loops
  const visitedUrls = new Set([url]);
  const redirectChain = [url];
  
  try {
    // Add protocol if missing
    const urlWithProtocol = url.includes('://') ? url : `https://${url}`;
    
    // More aggressive timeout with abort controller
    const controller = new AbortController();
    const timeout = options.timeout || GENERAL_REQUEST_TIMEOUT_MS;
    
    // Set a hard timeout that will abort the request
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    
    // Use node-fetch with the provided options and abort controller
    const response = await fetch(urlWithProtocol, { 
      method: 'HEAD',
      redirect: 'manual', // Handle redirects manually to better detect loops
      signal: controller.signal,
      ...options
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    // Handle redirects manually with loop detection
    let currentUrl = urlWithProtocol;
    let currentResponse = response;
    let redirectCount = 0;
    
    while (
      redirectCount < maxRedirects && 
      [301, 302, 303, 307, 308].includes(currentResponse.status)
    ) {
      const location = currentResponse.headers.get('location');
      
      if (!location) {
        break; // No redirect location
      }
      
      // Resolve relative URLs
      const nextUrl = new URL(location, currentUrl).href;
      
      // Check for redirect loops
      if (visitedUrls.has(nextUrl)) {
        console.warn(`⚠️ Detected redirect loop for ${url}`);
        return {
          finalUrl: url,
          redirected: true,
          statusCode: 0,
          redirectLoop: true
        };
      }
      
      // Add to visited URLs and chain
      visitedUrls.add(nextUrl);
      redirectChain.push(nextUrl);
      
      // Set up for next request
      currentUrl = nextUrl;
      redirectCount++;
      
      // Fetch the next URL
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      try {
        currentResponse = await fetch(currentUrl, {
          method: 'HEAD',
          redirect: 'manual',
          signal: controller.signal,
          ...options
        });
        clearTimeout(timeoutId);
      } catch (e) {
        clearTimeout(timeoutId);
        console.warn(`⚠️ Redirect chain broken at ${currentUrl}: ${e.message}`);
        // Return the last successful URL in the chain
        return {
          finalUrl: redirectChain[redirectChain.length - 2] || url,
          redirected: true,
          statusCode: 0
        };
      }
    }
    
    // Return information about the final URL
    const result = {
      finalUrl: currentUrl,
      redirected: redirectCount > 0,
      statusCode: currentResponse.status
    };
    
    // Cache the result
    redirectCache.set(url, result);
    return result;
  } catch (e) {
    console.warn(`⚠️ Failed to resolve redirects for ${url}: ${e.message}`);
    
    // More detailed error handling
    if (e.name === 'AbortError') {
      console.warn(`⚠️ Request timed out after ${options.timeout || GENERAL_REQUEST_TIMEOUT_MS}ms for ${url}`);
    } else if (e.code === 'ECONNRESET') {
      console.warn(`⚠️ Connection reset for ${url}`);
    }
    
    // Return fallback
    return {
      finalUrl: url,
      redirected: false,
      statusCode: 0
    };
  }
}

/**
 * Special handling for known problematic domains
 * @param {string} url - URL to check
 * @returns {Object|null} - Domain-specific settings or null if not problematic
 */
function isProblematicDomain(url) {
  let domain;
  try {
    const urlObj = new URL(url.includes('://') ? url : `https://${url}`);
    domain = urlObj.hostname.toLowerCase();
  } catch (e) {
    domain = url.toLowerCase();
  }
  
  // VA.gov-specific settings
  if (domain.includes('va.gov')) {
    return {
      maxRedirects: 3,
      maxRetries: 2,
      timeout: 60000,
      concurrentRequests: 1,
      waitBetweenRequests: 3000,
      skipAuthenticatedPages: true,
      excludePatterns: [
        '/my-*',
        '/track-claims*',
        '/profile*',
        '/records/download-va-letters/letters*',
        '/view-change-dependents*',
        '/manage-va-debt*'
      ],
      reason: 'VA.gov has authentication requirements and rate limiting'
    };
  }
  
  // USDA-specific settings
  if (domain.includes('usda.gov')) {
    return {
      maxRedirects: 3,
      maxRetries: 3,
      timeout: 60000,
      skipJavascript: true,
      reason: 'USDA domains can be memory intensive'
    };
  }
  
  // SEC-specific settings
  if (domain.includes('sec.gov')) {
    return {
      maxRedirects: 3,
      maxRetries: 2,
      timeout: 45000,
      reason: 'SEC domains have strict security settings'
    };
  }
  
  // CMS-specific settings
  if (domain.includes('cms.gov') || domain.includes('medicare.gov') || domain.includes('medicaid.gov')) {
    return {
      maxRedirects: 4,
      maxRetries: 5,
      timeout: 90000,
      concurrentRequests: 2,
      waitBetweenRequests: 2000,
      reason: 'CMS domains have complex redirect chains and strict security policies'
    };
  }
  
  // Not a problematic domain
  return null;
}

/**
 * Resolves redirects with special handling for problematic sites
 * @param {string} url - URL to resolve
 * @param {number} maxRedirects - Maximum redirects to follow
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<{finalUrl: string, redirected: boolean, statusCode: number}>}
 */
async function resolveRedirectsWithRetry(url, defaultMaxRedirects = 5, defaultMaxRetries = 3) {
  // Check if this is a government site
  const govConfig = govSiteConfig.getConfigForDomain(url);
  
  // Use special government site configuration if available
  const maxRedirects = govConfig?.maxRedirects || defaultMaxRedirects;
  const maxRetries = govConfig?.maxRetries || defaultMaxRetries;
  const timeout = govConfig?.timeout || 30000;
  
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Add delay between retries for government sites
      if (govConfig && attempt > 1) {
        const delay = Math.pow(2, attempt) * govConfig.requestDelay;
        if (DEBUG) console.log(`Applying government site delay of ${delay}ms for ${url}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      const options = {
        timeout: timeout,
        headers: govConfig?.customHeaders || {}
      };
      
      return await resolveRedirects(url, maxRedirects, options);
    } catch (error) {
      lastError = error;
      console.warn(`Retry ${attempt}/${maxRetries} for ${url} failed: ${error.message}`);
      
      // Special handling for government site errors
      if (govConfig) {
        console.log(`Using government site retry strategy for ${url}`);
        // Wait longer for government sites with exponential backoff
        const delay = Math.pow(3, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // Standard wait with exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // Return a special indicator for government sites that might be blocking us
  const isGovSite = !!govConfig;
  return {
    finalUrl: url,
    redirected: false,
    statusCode: 0,
    problematicDomain: true,
    possibleRateLimiting: isGovSite
  };
}

// Add this as a new function
const cmsRateLimiter = {
  lastRequestTime: {},
  minTimeBetweenRequests: 2000, // 2 seconds between requests to same domain
  
  async throttle(url) {
    try {
      const domain = new URL(url).hostname;
      
      // Only apply rate limiting to CMS domains
      if (!domain.includes('cms.gov') && !domain.includes('medicare.gov') && !domain.includes('medicaid.gov')) {
        return;
      }
      
      const now = Date.now();
      const lastRequest = this.lastRequestTime[domain] || 0;
      const timeToWait = Math.max(0, lastRequest + this.minTimeBetweenRequests - now);
      
      if (timeToWait > 0) {
        if (DEBUG) console.log(`Rate limiting CMS domain ${domain}, waiting ${timeToWait}ms`);
        await new Promise(resolve => setTimeout(resolve, timeToWait));
      }
      
      this.lastRequestTime[domain] = Date.now();
    } catch (e) {
      // In case URL parsing fails, don't block the request
      console.warn(`Error in rate limiter: ${e.message}`);
    }
  }
};


module.exports = {
  findExistingConfigs,
  resolveRedirects,
  resolveRedirectsWithRetry,
  groupUrlsByDomain,
  generateConfigsForAgency,
  ensureDirectoryExists, // Export the utility function for reuse
  writeDynamicUnlighthouseConfig // Export the config writing function
};

// Self-executing when run directly
if (require.main === module) {
  (async () => {
    try {
      const VALIDATED_URLS_PATH = 'output/checked-in/validated-urls.json';
      
      if (!fs.existsSync(VALIDATED_URLS_PATH)) {
        console.error(`❌ Missing validated URLs file: ${VALIDATED_URLS_PATH}`);
        process.exit(1);
      }
      
      log.info(`Reading validated URLs from ${VALIDATED_URLS_PATH}`);
      const validatedData = JSON.parse(fs.readFileSync(VALIDATED_URLS_PATH, 'utf8'));
      
      // Process each agency
      for (const [agency, urls] of Object.entries(validatedData)) {
        log.info(`Processing agency: ${agency} with ${urls.length} URLs`);
        
        // Configuration options - loaded from centralized config
        const options = {
          maxUrlsPerDomain: MAX_URLS_PER_DOMAIN,
          splitLargeDomains: SPLIT_LARGE_DOMAINS,
          chunkSize: CHUNK_SIZE
        };
        
        if (DEBUG) console.log(`Using config options:`, options);
        const jobBlocks = await generateConfigsForAgency(agency, urls, null, options);
        log.success(`Generated ${jobBlocks.length} config files for ${agency}`);
      }
      
      log.success('Config generation complete!');
    } catch (error) {
      console.error(`❌ Error in config generation: ${error.message}`);
      process.exit(1);
    }
  })();
}