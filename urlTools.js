const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Import configuration variables
const {
  MAX_URLS_TOTAL: MAX_URLS,
  URL_TIMEOUT_MS: TIMEOUT_MS,
  URL_VALIDATION_TIMEOUT_MS,
  BATCH_TIMEOUT_MS,
  VALIDATION_BATCH_SIZE,
  BATCH_DELAY_MS,
  MAX_CRAWL_URLS,
  MAX_CRAWL_DEPTH,
  SITEMAP_TIMEOUT_MS,
  EXCLUDE_PATTERNS,
  DEBUG
} = config;

function isValidUrlFormat(url) {
  const lowerUrl = url.toLowerCase();
  return !EXCLUDE_PATTERNS.some(pattern => lowerUrl.includes(pattern));
}

async function isUrlReachable(url) {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    };
    
    // Try HEAD request first (faster)
    try {
      const response = await axios.head(url, { 
        timeout: TIMEOUT_MS, 
        headers,
        maxRedirects: 5,
        validateStatus: status => status >= 200 && status < 400 // Only accept 2xx and 3xx responses
      });
      
      // Accept 200-299, 300-399 (redirects) - reject 403s since Unlighthouse can't scan them
      if (response.status >= 200 && response.status < 400) {
        // Check content type if available
        const contentType = response.headers['content-type'] || '';
        return contentType.includes('text/html') || contentType.includes('application/xhtml');
      }
      
      return false;
    } catch (headError) {
      // If HEAD fails, try GET request (some servers don't support HEAD)
      try {
        const response = await axios.get(url, { 
          timeout: TIMEOUT_MS, 
          headers,
          maxRedirects: 5,
          validateStatus: status => status >= 200 && status < 400,
          // Remove maxContentLength - just need to verify URL exists
        });
        
        if (response.status >= 200 && response.status < 400) {
          const contentType = response.headers['content-type'] || '';
          return contentType.includes('text/html') || contentType.includes('application/xhtml');
        }
        
        return false;
      } catch (getError) {
        // Both requests failed - URL is not reachable
        return false;
      }
    }
  } catch {
    return false;
  }
}

// Add URL validation cache
const urlValidationCache = new Map();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

async function isUrlReachableWithCache(url) {
  const now = Date.now();
  
  // Check cache first
  if (urlValidationCache.has(url)) {
    const { result, timestamp } = urlValidationCache.get(url);
    if (now - timestamp < CACHE_TTL) {
      return result;
    }
  }
  
  // Not in cache or expired, validate again
  const result = await isUrlReachable(url);
  urlValidationCache.set(url, { result, timestamp: now });
  return result;
}

async function validateUrlList(urls, max = MAX_URLS) {
  if (DEBUG) console.log(`🔍 Validating ${urls.length} URLs`);
  
  // For static configs, use fast validation
  const filename = process.env.SITE_FILE || '';
  if (filename.includes('unlighthouse.config-')) {
    if (DEBUG) console.log(`⚡ Using fast validation for static config URLs`);
    const validUrls = urls.filter(isValidUrlFormat).slice(0, max);
    const invalidUrls = urls.filter(url => !isValidUrlFormat(url)).map(url => ({
      url,
      error: 'Invalid URL format - contains excluded patterns',
      statusCode: null,
      timestamp: new Date().toISOString()
    }));
    return { validUrls, invalidUrls };
  }
  
  const validUrls = [];
  const invalidUrls = [];
  
  // Process in smaller batches with delays for domains that might rate limit
  const batchSize = VALIDATION_BATCH_SIZE;
  const delayBetweenBatches = BATCH_DELAY_MS;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const promises = batch.map(async (url, index) => {
      try {
        // Add a small delay between requests in the same batch
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 200 * index));
        }
        
        // Add individual URL timeout wrapper to prevent one URL from hanging the batch
        const urlTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Individual URL timeout')), URL_VALIDATION_TIMEOUT_MS);
        });
        
        const validationPromise = resolveRedirectsWithRetry(url);
        const { finalUrl, redirected, statusCode } = await Promise.race([validationPromise, urlTimeoutPromise]);
        
        // Skip URLs that return 4xx or 5xx status codes since Unlighthouse can't scan them
        if (statusCode >= 400) {
          console.warn(`⚠️ Skipping URL with status ${statusCode}: ${url}`);
          invalidUrls.push({
            url,
            error: `HTTP ${statusCode} error`,
            statusCode,
            timestamp: new Date().toISOString()
          });
          return null;
        }
        
        if (redirected) {
          if (DEBUG) console.log(`Redirect resolved: ${url} → ${finalUrl}`);
        }
        
        // Return the final URL instead of original
        return finalUrl;
      } catch (error) {
        console.warn(`Invalid URL: ${url} - ${error.message}`);
        invalidUrls.push({
          url,
          error: error.message,
          statusCode: error.response?.status || null,
          timestamp: new Date().toISOString()
        });
        return null;
      }
    });
    
    try {
      // Add timeout for the entire batch to prevent hanging
      const batchTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Batch timeout: batch took too long')), BATCH_TIMEOUT_MS);
      });
      
      const batchPromise = Promise.all(promises);
      const results = await Promise.race([batchPromise, batchTimeoutPromise]);
      
      validUrls.push(...results.filter(url => url !== null));
      if (DEBUG) console.log(`Progress: ${validUrls.length}/${urls.length} URLs validated (batch ${i/batchSize + 1})`);
    } catch (batchError) {
      console.error(`⚠️ Batch validation error: ${batchError.message}`);
      // Continue with next batch even if this one fails
    }
    
    // Add delay between batches to avoid overwhelming servers
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }
  
  console.log(`Validation complete: ${validUrls.length} valid, ${invalidUrls.length} invalid`);
  
  return {
    validUrls: validUrls.slice(0, max),
    invalidUrls: invalidUrls
  };
}

async function fetchSitemapUrls(sitemapUrl) {
  if (DEBUG) console.log(`🔍 Fetching sitemap from: ${sitemapUrl}`);
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/xml,text/xml;q=0.9,*/*;q=0.8',
  };

  let data;
  try {
    const response = await axios.get(sitemapUrl, { headers, timeout: TIMEOUT_MS });
    data = response.data;
  } catch (axiosError) {
    console.warn(`⚠️ Axios failed (${axiosError.response?.status || axiosError.code}). Trying Puppeteer...`);
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent(headers['User-Agent']);
    await page.goto(sitemapUrl, { waitUntil: 'networkidle2', timeout: SITEMAP_TIMEOUT_MS });
    data = await page.evaluate(() => document.documentElement.innerHTML);
    await browser.close();
  }

  const result = await xml2js.parseStringPromise(data);
  let urls = [];

  if (result.urlset?.url) {
    urls = result.urlset.url.map(u => u.loc[0]);
  } else if (result.sitemapindex?.sitemap) {
    const subSitemaps = result.sitemapindex.sitemap.map(s => s.loc[0]);
    for (const subUrl of subSitemaps) {
      if (urls.length >= MAX_URLS) break;
      const subXml = await axios.get(subUrl, { headers, timeout: TIMEOUT_MS });
      const subResult = await xml2js.parseStringPromise(subXml.data);
      if (subResult.urlset?.url) {
        urls.push(...subResult.urlset.url.map(u => u.loc[0]));
      }
    }
  }

  return [...new Set(urls)].slice(0, MAX_URLS);
}

/**
 * Writes a static config in the format used by unlighthouse configs (like NSF, SEC, etc.)
 * @param {Object} params - Configuration parameters
 * @param {string} params.site - Base site URL
 * @param {Array<string>} params.urls - List of URLs/paths
 * @param {string} params.outputPath - Path to write the config file
 * @param {Object} [params.options] - Additional config options
 * @returns {string} - Path to the written config file
 */
function writeStaticUnlighthouseConfig({ site, urls, outputPath, options = {} }) {
  if (DEBUG) console.log(`📝 Writing unlighthouse config with ${urls.length} URLs to ${outputPath}`);
  
  // Process URLs to ensure they are full URLs 
  const fullUrls = urls.map(url => {
    if (!url || url.trim() === '') return null;
    
    // If it's already a full URL, use as-is
    if (url.startsWith('http')) {
      return url;
    }
    
    // If it's a relative path, convert to full URL
    const baseUrl = site.endsWith('/') ? site.slice(0, -1) : site;
    const path = url.startsWith('/') ? url : '/' + url;
    return baseUrl + path;
  }).filter(url => url !== null);

  // Remove duplicates and sort
  const uniqueUrls = [...new Set(fullUrls)].sort();
  
  // Add homepage if not present
  const homepageUrl = site.endsWith('/') ? site.slice(0, -1) + '/' : site + '/';
  if (!uniqueUrls.includes(site) && !uniqueUrls.includes(homepageUrl)) {
    uniqueUrls.unshift(site);
  }

  if (DEBUG) console.log(`📊 Processing ${urls.length} input URLs to ${uniqueUrls.length} unique URLs`);

  // Build the config content as a string (ES module format)
  const configContent = `/**
 * ${new URL(site).hostname} Unlighthouse Configuration
 * Generated on ${new Date().toISOString()}
 */

export default {
  site: "${site}",
  puppeteerOptions: {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--headless=new",
    ],
    concurrency: 1,
  },
  puppeteerPageUserAgent: "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  userAgent: "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  disableThrottling: true,
  disableDeviceEmulation: true,
  lighthouseOptions: {
    disableStorageReset: true,
    disableLantern: true,
    throttlingMethod: "provided",
    onlyCategories: ["accessibility", "seo", "best-practices"],
  },
  scanner: {
    sitemap: "${site}/sitemap.xml",
    crawler: false,
    robotsTxt: false,
    maxRoutes: ${Math.max(uniqueUrls.length * 2, 800)},
    throttle: ${options.throttle !== false},
    skipJavascript: ${options.skipJavascript === true},
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
    ],
  },
  ci: {
    skipMissing: true,
    skipRoutesWithoutResults: true,
  },
  urls: [  
${uniqueUrls.map(url => `    "${url}",`).join('\n')}
  ],
  chrome: {
    useSystem: true,
  },
  debug: false,
};
`;

  fs.writeFileSync(outputPath, configContent, 'utf-8');
  console.log(`✅ Unlighthouse config written to ${outputPath}`);
  return outputPath;
}

function writeStaticConfig({ site, urls, outputPath, scanner = {}, puppeteerOptions = {}, lighthouseOptions = {} }) {
  if (DEBUG) console.log(`📝 Writing config with ${urls.length} URLs to ${outputPath}`);
  
  // If URLs array is empty, add at least the homepage
  if (!urls || urls.length === 0) {
    console.warn(`⚠️ No URLs provided, adding homepage as fallback`);
    urls = [site];
  }
  
  // Log the first few URLs for debugging
  console.log(`📄 First 3 paths: ${urls.slice(0, 3).map(url => {
    // Clean up URLs for display only (doesn't change the actual URLs used)
    const cleanUrl = url.replace('https://github.com/your-org/federal-website-scanner', '');
    // If it's a full URL, show just the path; otherwise show as-is
    if (cleanUrl.startsWith('http')) {
      try {
        return new URL(cleanUrl).pathname || cleanUrl;
      } catch {
        return cleanUrl;
      }
    }
    return cleanUrl;
  }).join(', ')}`);
  
  // Default scanner configuration  
  const defaultScanner = {
    crawler: false,
    sitemap: false,
    robotsTxt: false,
    // Configuration to allow cross-domain URL scanning
    skipJavascript: false,
    samples: 1,
    maxRoutes: 1000,
    // Disable domain-based filtering
    dynamicSampling: false,
    // Increased timeouts for CI environments
    pageTimeout: 180000, // 3 minutes per page
    concurrency: 1 // Reduce concurrency for resource-constrained environments
  };
  
  // Default puppeteer options with increased timeouts for CI environments
  const defaultPuppeteerOptions = {
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    // Increase timeouts for resource-constrained CI environments
    timeout: 60000, // 1 minute for browser launch
    protocolTimeout: 300000 // 5 minutes for protocol operations
  };
  
  const config = {
    site,
    urls: [...new Set(urls.map(u => {
      // Handle different URL formats
      if (!u || u.trim() === '') return null; // Skip empty URLs
      
      // Always preserve full URLs for cross-domain scanning
      if (u.startsWith('http')) {
        return u; // Keep full URLs as-is for cross-domain support
      }
      
      // If it's already a relative path starting with /, use as-is
      if (u.startsWith('/')) {
        return u;
      }
      
      // Convert other formats to relative path
      return u.startsWith('/') ? u : '/' + u;
    }).filter(url => url !== null))], // Remove null entries
    puppeteerOptions: { ...defaultPuppeteerOptions, ...puppeteerOptions },
    userAgent: "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
    disableThrottling: true,
    disableDeviceEmulation: true,
    scanner: { ...defaultScanner, ...scanner },
    ci: {
      skipMissing: true,
      skipRoutesWithoutResults: true,
    },
    chrome: {
      useSystem: true,
    },
    debug: false,
    // Critical: Disable discovery to force Unlighthouse to scan our exact URL list
    discovery: false
  };
  
  // Add lighthouse options if provided
  if (Object.keys(lighthouseOptions).length > 0) {
    config.lighthouseOptions = lighthouseOptions;
  }

  fs.writeFileSync(outputPath, 'module.exports = ' + JSON.stringify(config, null, 2), 'utf-8');
  return outputPath;
}

async function fetchAnalyticsUrls(agency) {
  const url = `https://analytics.usa.gov/data/${agency}/top-100000-pages-and-screens-30-days.json`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0)',
    'Accept': 'application/json,text/html;q=0.9,*/*;q=0.8'
  };

  try {
    const { data } = await axios.get(url, { timeout: TIMEOUT_MS, headers });
    const pages = data?.data || [];
    const urls = pages.map(p => {
      let domain = p.domain || '';
      if (!domain.startsWith('http')) domain = 'https://' + domain;
      return domain + p.pagePath;
    });

    return [...new Set(urls)].slice(0, MAX_URLS);
  } catch (err) {
    console.warn(`⚠️ Failed to fetch analytics data for ${agency}: ${err.message}`);
    return [];
  }
}

/**
 * Writes a dynamic config for an agency (used by configGenerator.js)
 * @param {Object} params - Parameters for the config
 * @param {string} params.agency - Agency name
 * @param {string} params.domain - Domain name
 * @param {Array<string>} params.urls - List of URLs (final URLs)
 * @param {Array<Object>} params.redirectInfo - Redirect information
 * @returns {string} - Path to the written config file
 */
function writeDynamicUnlighthouseConfig({ agency, domain, configDomain, urls, redirectInfo }) {
  // Use configDomain for file naming, original domain for site URL
  const effectiveConfigDomain = configDomain || domain;
  
  // Extract paths from URLs
  const paths = urls.map(url => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname + parsedUrl.search;
    } catch (e) {
      return url;
    }
  });
  
  // Create a config object that matches the static config format
  const config = {
    site: `https://${domain}`,
    urls: paths,
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
    puppeteerPageUserAgent: "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
    userAgent: "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
    disableThrottling: true,
    disableDeviceEmulation: true,
    lighthouseOptions: {
      disableStorageReset: true,
      disableLantern: true,
      throttlingMethod: "provided",
      onlyCategories: ["accessibility", "seo", "best-practices"]
    },
    scanner: {
      sitemap: `https://${domain}/sitemap.xml`,
      crawler: false,
      robotsTxt: false,
      maxRoutes: Math.max(paths.length * 2, 800),
      throttle: false, // Disable throttling for better performance
      skipJavascript: true, // Skip JS to reduce memory usage
      samples: 1,
      pageTimeout: 90000, // 90 seconds instead of 120
      device: "desktop", // Use desktop like static configs
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
    ci: {
      skipMissing: true,
      skipRoutesWithoutResults: true
    },
    chrome: {
      useSystem: true
    },
    debug: false
  };
  
  // Ensure the output directory exists
  const outputDir = path.join(__dirname, 'configs/validated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the config file
  const safeAgency = agency.replace(/[^a-z0-9]/gi, '-');
  const safeDomain = effectiveConfigDomain.replace(/[^a-z0-9-]/gi, '-');
  const configFileName = `${safeAgency}-${safeDomain}.config.js`;
  const configFilePath = path.join(outputDir, configFileName);
  
  fs.writeFileSync(configFilePath, 'module.exports = ' + JSON.stringify(config, null, 2), 'utf8');
  if (DEBUG) console.log(`✅ Config written to ${configFilePath}`);
  
  return configFilePath;
}

async function crawlSiteForUrls(startUrl, maxUrls = MAX_CRAWL_URLS, maxDepth = MAX_CRAWL_DEPTH) {
  if (DEBUG) console.log(`🕸️ Starting crawler from ${startUrl} (max ${maxUrls} URLs, depth ${maxDepth})`);
  
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ 
    headless: "new", 
    args: ['--no-sandbox', '--disable-dev-shm-usage'] 
  });
  
  const visited = new Set();
  const queue = [{ url: startUrl, depth: 0 }];
  const validUrls = [];
  const baseUrl = new URL(startUrl).origin;
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)');
    
    while (queue.length > 0 && validUrls.length < maxUrls) {
      const { url, depth } = queue.shift();
      
      if (visited.has(url) || !url.startsWith(baseUrl)) continue;
      visited.add(url);
      
      if (DEBUG) console.log(`🔍 Crawling (${depth}): ${url}`);
      
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: SITEMAP_TIMEOUT_MS });
        
        // Wait for content to load
        await page.waitForSelector('body', { timeout: 5000 }).catch(() => {});
        
        // Add current URL to valid list if it's HTML content
        const contentType = await page.evaluate(() => document.contentType || '');
        if (contentType.includes('html')) {
          validUrls.push(url);
          if (DEBUG) console.log(`✅ Added valid URL (${validUrls.length}/${maxUrls}): ${url}`);
        }
        
        // Find more links if we haven't reached max depth
        if (depth < maxDepth) {
          // Extract all links on the page
          const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href]'))
              .map(a => a.href)
              .filter(href => href && !href.startsWith('javascript:') && !href.startsWith('mailto:'));
          });
          
          // Add new links to the queue
          for (const link of links) {
            try {
              const parsedUrl = new URL(link);
              // Only follow links on the same domain
              if (parsedUrl.origin === baseUrl && !visited.has(link) && isValidUrlFormat(link)) {
                queue.push({ url: link, depth: depth + 1 });
              }
            } catch (e) {
              // Skip invalid URLs
              continue;
            }
          }
        }
      } catch (e) {
        console.warn(`⚠️ Error crawling ${url}: ${e.message}`);
      }
    }
  } finally {
    await browser.close();
  }
  
  console.log(`🕸️ Crawling complete. Found ${validUrls.length} valid URLs.`);
  return validUrls;
}

/**
 * Resolves URL redirects to get the final URL
 * @param {string} url - The URL to resolve
 * @returns {Promise<{finalUrl: string, redirected: boolean}>} - The final URL and whether it was redirected
 */
async function resolveRedirects(url) {
  try {
    // Make sure URL has a protocol
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Referer': 'https://www.google.com/'
    };
    
    const response = await axios.get(url, {
      maxRedirects: 5,
      validateStatus: status => status >= 200 && status < 400, // Only accept 2xx and 3xx responses
      timeout: 10000, // Reduced timeout to 10 seconds
      headers,
      // Remove maxContentLength - we just need to verify the URL exists
    });
    
    const finalUrl = response.request.res.responseUrl || url;
    
    return {
      finalUrl,
      redirected: finalUrl !== url,
      statusCode: response.status
    };
  } catch (error) {
    // Check for content length errors or other response-related issues
    if (error.code === 'ERR_FR_CONTENT_LENGTH_EXCEEDED' || error.message.includes('content length')) {
      console.log(`📋 URL exists but content is large: ${url}`);
      return {
        finalUrl: url,
        redirected: false,
        statusCode: 200 // Assume it's valid if we got this far
      };
    }
    
    // For 4xx client errors (including 403), reject the URL since Unlighthouse can't scan them
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.warn(`⚠️ Rejecting URL with client error ${error.response.status}: ${url}`);
      throw error; // Reject the URL
    }
    
    // For 5xx server errors, also reject since they're not accessible
    if (error.response && error.response.status >= 500) {
      console.warn(`⚠️ Rejecting URL with server error ${error.response.status}: ${url}`);
      throw error; // Reject the URL
    }
    
    console.warn(`Error resolving redirects for ${url}: ${error.message}`);
    throw error;
  }
}

/**
 * Resolves URL redirects with retry logic
 * @param {string} url - The URL to resolve
 * @param {number} retries - Number of retries
 * @returns {Promise<{finalUrl: string, redirected: boolean}>} - The final URL and whether it was redirected
 */
async function resolveRedirectsWithRetry(url, retries = 3) {
  let lastError;
  
  // Add a global timeout for the entire retry process
  const globalTimeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Global timeout: URL validation took too long')), 20000); // 20 second global timeout
  });
  
  const retryProcess = async () => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        // Add exponential backoff between retries
        if (attempt > 0) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        return await resolveRedirects(url);
      } catch (error) {
        console.warn(`Attempt ${attempt + 1}/${retries} failed for ${url}: ${error.message}`);
        lastError = error;
      }
    }
    
    throw lastError || new Error(`Failed to resolve ${url} after ${retries} attempts`);
  };
  
  return Promise.race([retryProcess(), globalTimeoutPromise]);
}

module.exports = {
  fetchSitemapUrls,
  validateUrlList,
  writeStaticConfig,
  writeStaticUnlighthouseConfig,
  fetchAnalyticsUrls,
  writeDynamicUnlighthouseConfig,
  crawlSiteForUrls,
  isValidUrlFormat,
  isUrlReachable,
  resolveRedirects,
  resolveRedirectsWithRetry
};