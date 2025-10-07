const fs = require('fs');
const path = require('path');
const { 
  fetchAnalyticsUrls, 
  validateUrlList, 
  writeStaticConfig 
} = require('./urlTools');
const config = require('./config');
const { createLogger } = require('./logger');

// Import configuration variables
const {
  MAX_URLS_TOTAL,
  AGENCY_BATCH_SIZE,
  PAGE_TIMEOUT_MS,
  DEBUG
} = config;

// Create logger for this module
const log = createLogger('DynamicProcessor');

// Directories for output
const OUTPUT_DIR = path.join(__dirname, 'output/validated-urls');
const CONFIG_DIR = path.join(__dirname, 'output/configs/validated');
const CHECKED_IN_DIR = path.join(__dirname, 'output/checked-in');

/**
 * Processes URLs into domain groups and sorts them based on importance
 * @param {Array<string>} urls - List of URLs to process and sort
 * @returns {Object} - Object with domains as keys and arrays of sorted URLs as values
 */
function processAndSortUrls(urls) {
  // Process in chunks to avoid memory issues with very large URL sets
  const CHUNK_SIZE = 1000;
  const domains = {};
  
  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const chunk = urls.slice(i, i + CHUNK_SIZE);
    
    for (const url of chunk) {
      try {
        const urlWithProtocol = url.includes('://') ? url : `https://${url}`;
        const urlObj = new URL(urlWithProtocol);
        const domain = urlObj.hostname;
        
        if (!domains[domain]) domains[domain] = [];
        
        domains[domain].push({
          domain: domain,
          pagePath: urlObj.pathname + urlObj.search,
          pageviews: 1000 - domains[domain].length,
          fullUrl: url
        });
      } catch (e) {
        console.warn(`⚠️ Skipping invalid URL: ${url}`);
      }
    }
  }
  
  // Sort domains in batches
  const sortedDomains = {};
  for (const [domain, domainUrls] of Object.entries(domains)) {
    sortedDomains[domain] = sortPages(domainUrls).map(item => item.fullUrl);
  }
  
  return sortedDomains;
}

/**
 * Sort pages according to importance algorithm
 * 1. Home pages for every distinct domain
 * 2. Top-level landing pages (one-segment paths)
 * 3. Highest-traffic distinct child for every parent path
 * @param {Array} data - Array of page objects with domain, pagePath, pageviews
 * @returns {Array} - Sorted array of page objects
 */
function sortPages(data) {
  // Ensure pageviews is a number
  data.forEach(r => (r.pageviews = Number(r.pageviews) || 0));

  // Utility functions
  const stripSlashes = p => p.replace(/^\/+|\/+$/g, '');
  const splitSegments = p => (stripSlashes(p) ? stripSlashes(p).split('/') : []);
  const byViewsDescThenPathAsc = (a, b) =>
    b.pageviews - a.pageviews || a.pagePath.localeCompare(b.pagePath);

  // Bucket 1 - homepages
  const homepagesMap = new Map();
  data.forEach(r => {
    if (splitSegments(r.pagePath).length === 0) {
      const prev = homepagesMap.get(r.domain);
      if (!prev || r.pageviews > prev.pageviews) homepagesMap.set(r.domain, r);
    }
  });
  const bucket1 = [...homepagesMap.values()].sort(byViewsDescThenPathAsc);

  // Bucket 2 - top-level landing pages
  const bucket2 = data
    .filter(r => splitSegments(r.pagePath).length === 1)
    .sort(byViewsDescThenPathAsc);

  // Bucket 3 - best child per parent path
  const winners = new Map();
  data.forEach(r => {
    const segs = splitSegments(r.pagePath);
    if (segs.length <= 1) return; // Skip bucket 1 & 2
    const parent = `/${segs.slice(0, -1).join('/')}/`;
    const key = `${r.domain}|${parent}`;
    const prev = winners.get(key);
    if (!prev || r.pageviews > prev.pageviews) winners.set(key, r);
  });
  const bucket3 = [...winners.values()].sort(byViewsDescThenPathAsc);

  return [...bucket1, ...bucket2, ...bucket3];
}

/**
 * Process dynamic agencies by fetching analytics data and creating configs
 * @param {Array<string>} agencies - List of agency names to process
 * @param {number} maxUrls - Maximum number of URLs to process per agency
 */
async function processDynamicAgencies(agencies, maxUrls = MAX_URLS_TOTAL) {
  const allValidated = {};
  ensureDirectoryExists(OUTPUT_DIR);
  ensureDirectoryExists(CONFIG_DIR);
  ensureDirectoryExists(CHECKED_IN_DIR);
  
  // Process agencies in batches for controlled parallelism
  
  for (let i = 0; i < agencies.length; i += AGENCY_BATCH_SIZE) {
    const batch = agencies.slice(i, i + AGENCY_BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (agency) => {
        try {
          log.debug(`Fetching analytics URLs for agency: ${agency}`);
          const urls = await fetchAnalyticsUrls(agency);
          const validationResult = await validateUrlList(urls, maxUrls);
          const validated = validationResult.validUrls;
          const validationErrors = validationResult.invalidUrls;
          
          // Save validation errors for this agency
          if (validationErrors.length > 0) {
            const ERRORS_DIR = path.join(__dirname, 'output/validation-errors');
            if (!fs.existsSync(ERRORS_DIR)) {
              fs.mkdirSync(ERRORS_DIR, { recursive: true });
            }
            
            const errorsPath = path.join(ERRORS_DIR, `${agency}.errors.json`);
            const errorReport = {
              timestamp: new Date().toISOString(),
              siteName: agency,
              totalErrors: validationErrors.length,
              totalValidUrls: validated.length,
              errors: validationErrors
            };
            fs.writeFileSync(errorsPath, JSON.stringify(errorReport, null, 2), 'utf-8');
            console.log(`❌ Saved ${validationErrors.length} validation errors for ${agency} to: ${errorsPath}`);
          }
          
          if (validated.length === 0) {
            console.warn(`⚠️ No valid URLs found for ${agency}`);
            return { agency, validated: [] };
          }
          
          // Check if this agency's URLs are mostly 403-blocked
          // Note: This is just an initial check - we'll test each domain individually
          const sampleUrl = validated[0];
          let agencyHasBlockedDomains = false;
          if (sampleUrl) {
            try {
              const domain = new URL(sampleUrl).hostname;
              // Quick test to see if the domain is blocking automated access
              const axios = require('axios');
              const response = await axios.get(sampleUrl, {
                timeout: 5000,
                validateStatus: () => true, // Accept all status codes
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
              });
              
              if (response.status === 403) {
                console.warn(`🚫 Sample domain ${domain} is blocking automated access (403). Will test each domain individually.`);
                agencyHasBlockedDomains = true;
              }
            } catch (error) {
              // If we can't test, assume it might be blocked
              agencyHasBlockedDomains = true;
            }
          }
          
          let finalValidated = validated;
          
          // If agency has blocked domains, we'll handle domain-specific filtering later
          // For now, just note if we detected any blocking
          if (agencyHasBlockedDomains) {
            log.debug(`Agency ${agency} may have some blocked domains - will apply domain-specific filtering`);
          }
          
          const sortedDomains = processAndSortUrls(finalValidated);
          
          // Write files for this agency
          const outputPath = path.join(OUTPUT_DIR, `${agency}.json`);
          fs.writeFileSync(outputPath, JSON.stringify(finalValidated, null, 2), 'utf-8');
          
          // Generate config files for each domain in parallel
          await Promise.all(
            Object.entries(sortedDomains).map(async ([domain, domainUrls]) => {
              if (domainUrls.length === 0) return;
              
              const safeDomain = domain.replace(/\./g, '-');
              const configPath = path.join(CONFIG_DIR, `${agency}-${safeDomain}.config.js`);
              // Construct site URL from domain name, not from the first URL
              const site = `https://${domain}/`;
              
              // Test this specific domain for blocking (only if agency has potential blocks)
              let isDomainBlocked = false;
              if (agencyHasBlockedDomains && domainUrls.length > 0) {
                try {
                  const testUrl = site; // Test the homepage
                  const axios = require('axios');
                  const response = await axios.get(testUrl, {
                    timeout: 5000,
                    validateStatus: () => true,
                    headers: {
                      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                  });
                  
                  if (response.status === 403) {
                    console.warn(`🚫 Domain ${domain} is blocking automated access (403). Using specialized settings.`);
                    isDomainBlocked = true;
                    
                    // Apply URL filtering for blocked domains
                    const importantPaths = [
                      '/', '/about', '/about/', '/about-us', '/about-us/',
                      '/contact', '/contact/', '/contact-us', '/contact-us/',
                      '/services', '/services/', '/programs', '/programs/',
                      '/resources', '/resources/', '/help', '/help/',
                      '/accessibility', '/accessibility/', '/privacy', '/privacy/'
                    ];
                    
                    const filteredUrls = domainUrls.filter(url => {
                      try {
                        const pathname = new URL(url).pathname.toLowerCase();
                        return importantPaths.some(path => 
                          pathname === path || 
                          pathname.startsWith(path.replace(/\/$/, '') + '/') ||
                          pathname === path.replace(/\/$/, '')
                        );
                      } catch (e) {
                        return false;
                      }
                    }).slice(0, 15);
                    
                    // Ensure homepage is included
                    if (!filteredUrls.some(url => {
                      try { return new URL(url).pathname === '/'; } catch { return false; }
                    })) {
                      filteredUrls.unshift('/');
                    }
                    
                    domainUrls = filteredUrls;
                    log.debug(`Reduced ${domain} URL set to ${domainUrls.length} essential pages`);
                  }
                } catch (error) {
                  console.warn(`⚠️ Could not test ${domain} accessibility: ${error.message}`);
                  // Conservative approach: assume it might be blocked
                  isDomainBlocked = true;
                }
              }
              
              // Add a comment to the config indicating if this domain has access restrictions
              const configComment = isDomainBlocked ? 
                `// NOTE: This domain blocks automated access. URL set reduced to essential pages only.\n` : '';
              
              // Use specialized scanner settings for blocked domains
              const scannerConfig = isDomainBlocked ? {
                // Settings optimized for access-restricted sites
                device: 'mobile',
                concurrency: 1, // Single concurrent request to avoid triggering blocks
                pageTimeout: PAGE_TIMEOUT_MS,
                throttle: true, // Enable throttling to be respectful
                maxRetries: 5, // More retries for intermittent blocks
                samples: 1, // Single sample to minimize requests
                skipJavascript: false, // Keep JS enabled in case site requires it
                requestDelay: 2000 // 2-second delay between requests
              } : {
                // Standard settings for accessible sites
                device: 'mobile',
                concurrency: 2,
                pageTimeout: 120000 // 2-minute timeout
              };
              
              const puppeteerConfig = isDomainBlocked ? {
                args: [
                  "--no-sandbox", 
                  "--disable-dev-shm-usage",
                  "--disable-setuid-sandbox",
                  "--disable-gpu",
                  "--headless=new"
                ],
                concurrency: 1 // Limit Puppeteer concurrency too
              } : {
                args: ["--no-sandbox", "--disable-dev-shm-usage"]
              };
              
              const lighthouseConfig = isDomainBlocked ? {
                disableStorageReset: true,
                disableLantern: true,
                throttlingMethod: "provided",
                onlyCategories: ["accessibility", "seo", "best-practices"]
              } : {};
              
              return writeStaticConfig({
                site,
                urls: domainUrls.slice(0, maxUrls),
                outputPath: configPath,
                scanner: scannerConfig,
                puppeteerOptions: puppeteerConfig,
                lighthouseOptions: lighthouseConfig
              });
            })
          );
          
          return { agency, validated };
        } catch (err) {
          console.error(`❌ ${agency} failed: ${err.message}`);
          return { agency, validated: [] };
        }
      })
    );
    
    // Merge results into allValidated
    results.forEach(({ agency, validated }) => {
      if (validated.length > 0) {
        allValidated[agency] = validated;
      }
    });
  }
  
  return allValidated;
}

/**
 * Ensure directory exists, creating it if necessary
 * @param {string} dirPath - Path to check/create
 */
function ensureDirectoryExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      log.debug(`Created directory: ${dirPath}`);
    }
  } catch (err) {
    console.error(`⚠️ Could not create directory ${dirPath}: ${err.message}`);
  }
}

/**
 * Save the combined validated data to output files
 * @param {Object} allValidated - Combined validated URL data
 */
function saveValidatedData(allValidated) {
  // Save directly to the checked-in directory where the pipeline expects it
  const checkedInPath = path.join(CHECKED_IN_DIR, 'validated-urls.json');
  fs.writeFileSync(checkedInPath, JSON.stringify(allValidated, null, 2), 'utf-8');
  log.success(`Wrote validated data to ${checkedInPath}`);
}

/**
 * Generate YAML configuration for job matrices
 * @param {Array} jobBlocks - Array of job block objects
 */
function generateYaml(jobBlocks) {
  // Group jobs by agency during initial processing to avoid redundant work
  const jobsByAgency = {};
  
  for (const job of jobBlocks) {
    const agencyKey = job.agency.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (!jobsByAgency[agencyKey]) jobsByAgency[agencyKey] = [];
    jobsByAgency[agencyKey].push(job);
  }
  
  // Prepare header once
  const yamlLines = [
    '# Auto-generated by dynamic_job_gen.js',
    '',
    'include:',
    '  - local: template.yml',
    '',
    'stages:',
    '  - build',
    ''
  ];
  
  // Pre-allocate for large matrices
  let totalMatrixSize = 0;
  Object.values(jobsByAgency).forEach(jobs => totalMatrixSize += jobs.length * 3 + 5);
  
  // Build matrix YAML efficiently with array allocation
  const matrixLines = new Array(totalMatrixSize);
  let lineIndex = yamlLines.length;
  
  // Process each agency's jobs in a batch
  Object.entries(jobsByAgency).forEach(([agencyKey, jobs]) => {
    matrixLines[lineIndex++] = `${agencyKey}_matrix:`;
    matrixLines[lineIndex++] = '  extends: .default_template';
    matrixLines[lineIndex++] = '  stage: build';
    matrixLines[lineIndex++] = '  parallel:';
    matrixLines[lineIndex++] = '    matrix:';
    
    // Process all jobs for this agency
    for (const job of jobs) {
      matrixLines[lineIndex++] = '      - JOB_NAME: ' + JSON.stringify(job.jobName);
      matrixLines[lineIndex++] = '        SITE_NAME: ' + JSON.stringify(`${job.agency}-${job.domain}`);
      matrixLines[lineIndex++] = '        SITE_FILE: ' + JSON.stringify(job.configFile);
    }
    
    matrixLines[lineIndex++] = '';
  });
  
  // Combine arrays and write to file once
  fs.writeFileSync(OUTPUT_YAML, yamlLines.concat(matrixLines.slice(0, lineIndex)).join('\n'));
  log.success(`Wrote job matrices: ${OUTPUT_YAML}`);
}

module.exports = {
  processDynamicAgencies,
  saveValidatedData,
  sortPages,
  processAndSortUrls,
  generateYaml
};