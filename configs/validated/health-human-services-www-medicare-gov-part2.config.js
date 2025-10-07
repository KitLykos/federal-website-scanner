module.exports = {
  "site": "https://www.medicare.gov",
  "urls": [
    "/basics/get-started-with-medicare/before-65",
    "/basics/get-started-with-medicare/sign-up/how-do-i-sign-up-for-medicare",
    "/basics/costs/help/drug-costs",
    "/basics/get-started-with-medicare/medicare-basics/parts-of-medicare",
    "/health-drug-plans/medigap",
    "/basics/get-started-with-medicare/medicare-basics/what-does-medicare-cost",
    "/basics/costs/help/medicare-savings-programs",
    "/providers-services/original-medicare",
    "/health-drug-plans",
    "/basics",
    "/care-compare/all-results/",
    "/health-drug-plans/health-plans/your-health-plan-options",
    "/medical-equipment-suppliers/",
    "/basics/get-started-with-medicare/medicare-basics/working-past-65",
    "/basics/get-started-with-medicare/other-paths",
    "/health-drug-plans/medigap/basics/costs",
    "/care-compare/my-providers/",
    "/basics/costs/pay-premiums",
    "/health-drug-plans/part-d/basics/costs",
    "/coverage/home-health-services",
    "/providers-services/original-medicare/part-b",
    "/basics/costs/medicare-costs/avoid-penalties",
    "/health-drug-plans/medigap/basics/compare-plan-benefits",
    "/publications/search",
    "/providers-services/original-medicare/part-a"
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