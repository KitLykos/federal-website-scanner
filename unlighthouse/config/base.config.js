module.exports = {
    site: false,
    puppeteerOptions: { args: ['--no-sandbox', '--headless=new'], concurrency: 1 },
    disableThrottling: true,
    disableDeviceEmulation: true,
    lighthouseOptions: {
      disableStorageReset: true,
      disableLantern: true,
      throttlingMethod: 'provided'
    },
    scanner: {
      urls: [], // SITE_NAME will be passed in separately
      disableCrawler: true,
      disableSitemaps: true,
      ignoreRobotsTxt: true,
      skipJavascript: true,
      maxPagesToScan: 1
    },
    routePatterns: [],
    budget: {
      maxTotalRoutes: 1,
      maxAuditDuration: 30000,
      maxHtmlSize: 512 * 1024
    }
  };
  