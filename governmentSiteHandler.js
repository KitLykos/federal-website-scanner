const govSiteConfig = {
  // Special configurations for government domains
  domains: {
    'sec.gov': {
      maxConcurrentRequests: 1,
      requestDelay: 5000,
      timeout: 120000,
      maxRetries: 5,
      customHeaders: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Federal Accessibility Compliance Scanner/1.0'
      }
    },
    'cms.gov': {
      maxConcurrentRequests: 1,
      requestDelay: 8000,
      timeout: 120000,
      maxRetries: 3,
      customHeaders: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Federal Accessibility Compliance Scanner/1.0'
      }
    }
  },
  
  // Apply special handling for government sites
  getConfigForDomain(url) {
    try {
      const hostname = new URL(url.includes('://') ? url : `https://${url}`).hostname;
      const domain = Object.keys(this.domains).find(d => hostname.includes(d));
      return domain ? this.domains[domain] : null;
    } catch (e) {
      console.warn(`Error parsing URL: ${url}`, e);
      return null;
    }
  }
};

module.exports = govSiteConfig;