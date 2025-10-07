module.exports = {
  "site": "https://www.nimh.nih.gov",
  "urls": [
    "/",
    "/health/publications/adhd-what-you-need-to-know",
    "/health/topics/attention-deficit-hyperactivity-disorder-adhd",
    "/health/statistics/mental-illness",
    "/search-nimh",
    "/health/publications/understanding-psychosis",
    "/health/topics/anxiety-disorders",
    "/health/publications/generalized-anxiety-disorder-gad",
    "/health/topics",
    "/health/topics/depression",
    "/health/statistics/suicide",
    "/health/publications/borderline-personality-disorder",
    "/research/research-conducted-at-nimh/asq-toolkit-materials",
    "/health/topics/caring-for-your-mental-health",
    "/health/publications/warning-signs-of-suicide",
    "/health/publications/pandas",
    "/health/publications/social-anxiety-disorder-more-than-just-shyness",
    "/health/topics/autism-spectrum-disorders-asd"
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
    "sitemap": "https://www.nimh.nih.gov/sitemap.xml",
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