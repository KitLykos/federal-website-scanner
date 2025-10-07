#!/usr/bin/env node

/**
 * Site Evaluation Configuration Variables
 * 
 * This file centralizes all configuration variables for the site evaluation tools,
 * making it easier to modify page limits, timeouts, and other parameters without
 * diving into individual scripts.
 * 
 * Usage:
 * - Set environment variables to override defaults
 * - Import this file in scripts to get consistent configuration
 * - Modify defaults here for project-wide changes
 */

// =============================================================================
// PAGE AND URL LIMITS
// =============================================================================

/**
 * Maximum number of URLs to process per agency in dynamic mode
 * Used by: dynamicUrlProcessor.js, urlTools.js
 * Environment variable: MAX_URLS_TOTAL
 */
const MAX_URLS_TOTAL = parseInt(process.env.MAX_URLS_TOTAL) || 50;

/**
 * Maximum number of URLs per domain before splitting into multiple jobs
 * Used by: configGenerator.js
 * Environment variable: MAX_URLS_PER_DOMAIN
 */
const MAX_URLS_PER_DOMAIN = parseInt(process.env.MAX_URLS_PER_DOMAIN) || 50;

/**
 * Number of URLs per chunk when splitting large domains
 * Used by: configGenerator.js, validate_urls.js
 * Environment variable: CHUNK_SIZE
 */
const CHUNK_SIZE = parseInt(process.env.CHUNK_SIZE) || 50;

/**
 * Maximum URLs for static config validation
 * Used by: validateStaticConfigs.js
 * Environment variable: MAX_STATIC_URLS
 */
const MAX_STATIC_URLS = parseInt(process.env.MAX_STATIC_URLS) || 150;

/**
 * Maximum URLs to fetch from analytics API
 * Used by: validateStaticConfigs.js
 * Environment variable: MAX_API_URLS
 */
const MAX_API_URLS = parseInt(process.env.MAX_API_URLS) || 50;

/**
 * Maximum URLs for site crawling
 * Used by: urlTools.js crawlSiteForUrls function
 * Environment variable: MAX_CRAWL_URLS
 */
const MAX_CRAWL_URLS = parseInt(process.env.MAX_CRAWL_URLS) || 50;

/**
 * Maximum crawling depth for site discovery
 * Used by: urlTools.js crawlSiteForUrls function
 * Environment variable: MAX_CRAWL_DEPTH
 */
const MAX_CRAWL_DEPTH = parseInt(process.env.MAX_CRAWL_DEPTH) || 2;

// =============================================================================
// TIMEOUT AND PERFORMANCE SETTINGS
// =============================================================================

/**
 * Request timeout for URL validation (milliseconds)
 * Used by: urlTools.js
 * Environment variable: URL_TIMEOUT_MS
 */
const URL_TIMEOUT_MS = parseInt(process.env.URL_TIMEOUT_MS) || 5000;

/**
 * Individual URL validation timeout (milliseconds)
 * Used by: urlTools.js
 * Environment variable: URL_VALIDATION_TIMEOUT_MS
 */
const URL_VALIDATION_TIMEOUT_MS = parseInt(process.env.URL_VALIDATION_TIMEOUT_MS) || 25000;

/**
 * Batch validation timeout (milliseconds)
 * Used by: urlTools.js
 * Environment variable: BATCH_TIMEOUT_MS
 */
const BATCH_TIMEOUT_MS = parseInt(process.env.BATCH_TIMEOUT_MS) || 90000;

/**
 * Page timeout for Unlighthouse/OOBEE scanning (milliseconds)
 * Used by: validate_urls.js, dynamicUrlProcessor.js, config files
 * Environment variable: PAGE_TIMEOUT_MS
 */
const PAGE_TIMEOUT_MS = parseInt(process.env.PAGE_TIMEOUT_MS) || 180000; // 3 minutes

/**
 * Sitemap request timeout (milliseconds)
 * Used by: urlTools.js
 * Environment variable: SITEMAP_TIMEOUT_MS
 */
const SITEMAP_TIMEOUT_MS = parseInt(process.env.SITEMAP_TIMEOUT_MS) || 15000;

/**
 * General request timeout for configGenerator (milliseconds)
 * Used by: configGenerator.js
 * Environment variable: GENERAL_REQUEST_TIMEOUT_MS
 */
const GENERAL_REQUEST_TIMEOUT_MS = parseInt(process.env.GENERAL_REQUEST_TIMEOUT_MS) || 15000;

// =============================================================================
// VALIDATION AND PROCESSING SETTINGS
// =============================================================================

/**
 * Batch size for URL validation processing
 * Used by: urlTools.js
 * Environment variable: VALIDATION_BATCH_SIZE
 */
const VALIDATION_BATCH_SIZE = parseInt(process.env.VALIDATION_BATCH_SIZE) || 3;

/**
 * Delay between validation batches (milliseconds)
 * Used by: urlTools.js
 * Environment variable: BATCH_DELAY_MS
 */
const BATCH_DELAY_MS = parseInt(process.env.BATCH_DELAY_MS) || 1000;

/**
 * Concurrency level for scanning operations
 * Used by: validate_urls.js, config files
 * Environment variable: SCAN_CONCURRENCY
 */
const SCAN_CONCURRENCY = parseInt(process.env.SCAN_CONCURRENCY) || 1;

/**
 * Whether to split large domains into multiple jobs
 * Used by: configGenerator.js
 * Environment variable: SPLIT_LARGE_DOMAINS (true/false)
 */
const SPLIT_LARGE_DOMAINS = process.env.SPLIT_LARGE_DOMAINS !== 'false'; // Default true

/**
 * Enable debug logging
 * Used by: configGenerator.js, other scripts
 * Environment variable: DEBUG (true/false)
 */
const DEBUG = process.env.DEBUG === 'true';

// =============================================================================
// URL FILTERING PATTERNS
// =============================================================================

/**
 * Patterns to exclude from URL validation and scanning
 * Used by: urlTools.js
 */
const EXCLUDE_PATTERNS = [
  'login', 'signin', 'logout', 'auth',
  'search', 'find', 'query',
  'admin', 'dashboard', 'wp-',
  'utm_', 'gclid',
  'sitemap', 'rss', 'feed', 'index',
  '.pdf', '.doc', '.xls', '.zip', '.jpg', '.png', '.gif'
];

// =============================================================================
// DYNAMIC AGENCY PROCESSING
// =============================================================================

/**
 * Agencies to process in dynamic mode
 * Used by: validate_urls.js
 * Can be overridden by setting AGENCY_NAMES environment variable as comma-separated list
 */
const DEFAULT_AGENCY_NAMES = process.env.AGENCY_NAMES 
  ? process.env.AGENCY_NAMES.split(',').map(name => name.trim())
  : ["health-human-services"]; // Default test array

/**
 * Batch size for processing dynamic agencies
 * Used by: dynamicUrlProcessor.js
 * Environment variable: AGENCY_BATCH_SIZE
 */
const AGENCY_BATCH_SIZE = parseInt(process.env.AGENCY_BATCH_SIZE) || 3;

// =============================================================================
// EXPORTS
// =============================================================================

module.exports = {
  // Page and URL limits
  MAX_URLS_TOTAL,
  MAX_URLS_PER_DOMAIN,
  CHUNK_SIZE,
  MAX_STATIC_URLS,
  MAX_API_URLS,
  MAX_CRAWL_URLS,
  MAX_CRAWL_DEPTH,
  
  // Timeout and performance
  URL_TIMEOUT_MS,
  URL_VALIDATION_TIMEOUT_MS,
  BATCH_TIMEOUT_MS,
  PAGE_TIMEOUT_MS,
  SITEMAP_TIMEOUT_MS,
  GENERAL_REQUEST_TIMEOUT_MS,
  
  // Validation and processing
  VALIDATION_BATCH_SIZE,
  BATCH_DELAY_MS,
  SCAN_CONCURRENCY,
  SPLIT_LARGE_DOMAINS,
  DEBUG,
  
  // URL filtering
  EXCLUDE_PATTERNS,
  
  // Dynamic agency processing
  DEFAULT_AGENCY_NAMES,
  AGENCY_BATCH_SIZE,
  
  // Utility functions
  getConfigSummary() {
    return {
      'Page Limits': {
        MAX_URLS_TOTAL,
        MAX_URLS_PER_DOMAIN,
        CHUNK_SIZE,
        MAX_STATIC_URLS,
        MAX_API_URLS,
        MAX_CRAWL_URLS,
        MAX_CRAWL_DEPTH
      },
      'Timeouts (ms)': {
        URL_TIMEOUT_MS,
        URL_VALIDATION_TIMEOUT_MS,
        BATCH_TIMEOUT_MS,
        PAGE_TIMEOUT_MS,
        SITEMAP_TIMEOUT_MS,
        GENERAL_REQUEST_TIMEOUT_MS
      },
      'Processing': {
        VALIDATION_BATCH_SIZE,
        BATCH_DELAY_MS,
        SCAN_CONCURRENCY,
        SPLIT_LARGE_DOMAINS,
        DEBUG
      },
      'Agencies': {
        DEFAULT_AGENCY_NAMES,
        AGENCY_BATCH_SIZE
      }
    };
  }
};

// CLI usage: node config.js --show
if (require.main === module && process.argv.includes('--show')) {
  // Import logger only when needed to avoid circular dependency
  const { logger } = require('./logger');
  const config = module.exports;
  
  logger.info('Site Evaluation Configuration:');
  console.log(JSON.stringify(config.getConfigSummary(), null, 2));
  logger.info('Override any value by setting the corresponding environment variable.');
  logger.info('Example: MAX_URLS_PER_DOMAIN=200 CHUNK_SIZE=75 node validate_urls.js');
}
