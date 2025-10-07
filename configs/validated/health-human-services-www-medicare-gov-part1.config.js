module.exports = {
  "site": "https://www.medicare.gov",
  "urls": [
    "/",
    "/care-compare/results/",
    "/basics/get-started-with-medicare",
    "/plan-compare/",
    "/care-compare/",
    "/care-compare/",
    "/medicare-and-you",
    "/search/medicare",
    "/coverage/pain-management",
    "/basics/costs/medicare-costs",
    "/health-drug-plans/part-d",
    "/medigap-supplemental-insurance-plans/",
    "/talk-to-someone",
    "/basics/get-started-with-medicare/after-65",
    "/care-compare/results/",
    "/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare",
    "/basics/get-started-with-medicare/get-more-coverage/your-coverage-options",
    "/medical-equipment-suppliers/results",
    "/coverage",
    "/health-drug-plans/health-plans",
    "/basics/costs",
    "/coverage/medicare-diabetes-prevention-program",
    "/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
    "/health-drug-plans/coordination",
    "/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start"
  ],
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--headless=new"
    ],
    "concurrency": 1
  },
  "puppeteerPageUserAgent": "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  "userAgent": "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  "disableThrottling": true,
  "disableDeviceEmulation": true,
  "lighthouseOptions": {
    "disableStorageReset": true,
    "disableLantern": true,
    "throttlingMethod": "provided",
    "onlyCategories": [
      "accessibility",
      "seo",
      "best-practices"
    ]
  },
  "scanner": {
    "sitemap": "https://www.medicare.gov/sitemap.xml",
    "crawler": false,
    "robotsTxt": false,
    "maxRoutes": 800,
    "throttle": false,
    "skipJavascript": true,
    "samples": 1,
    "pageTimeout": 90000,
    "device": "desktop",
    "exclude": [
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
  "ci": {
    "skipMissing": true,
    "skipRoutesWithoutResults": true
  },
  "chrome": {
    "useSystem": true
  },
  "debug": false
}