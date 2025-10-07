/**
 * Oobee Configuration for CI Testing
 * Tests basic integration with example.com
 */

module.exports = {
  // Basic site configuration
  site: "https://example.com",
  
  // Oobee-specific settings
  oobee: {
    scanner: "website",      // website, sitemap, or custom
    maxPages: 5,            // Keep small for CI testing
    device: "Desktop",      // Desktop, Mobile, or custom
    headless: true,         // Always headless in CI
    safeMode: true,         // Disable dynamic clicking for reliability
    fileTypes: "html-only", // Skip PDFs for initial testing
    ruleset: "default",     // Use default accessibility rules
    followRobots: true,     // Respect robots.txt
    scanDuration: 300,      // 5 minutes max for CI
    
    // CI-specific overrides
    ci: {
      maxPages: 3,          // Even smaller for CI
      scanDuration: 180     // 3 minutes in CI
    }
  },
  
  // For comparison with Unlighthouse results
  comparison: {
    unlighthouse: {
      enabled: false // Disable for now to focus on Oobee
    }
  }
};
