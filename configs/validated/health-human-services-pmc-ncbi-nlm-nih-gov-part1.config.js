module.exports = {
  "site": "https://pmc.ncbi.nlm.nih.gov",
  "urls": [
    "/",
    "/articles/PMC8853281/",
    "/articles/PMC1946721/",
    "/articles/PMC10235646/",
    "/articles/PMC1939166/",
    "/journals/",
    "/articles/PMC1978350/",
    "/articles/PMC4002051/",
    "/articles/PMC4960515/",
    "/articles/PMC5044872/",
    "/",
    "/articles/PMC1013152/",
    "/articles/PMC3043740/",
    "/",
    "/articles/PMC11491767/",
    "/articles/PMC12366741/",
    "/articles/PMC9335287/",
    "/about/copyright/",
    "/articles/PMC7505114/",
    "/articles/PMC12040873/",
    "/articles/PMC10816294/",
    "/articles/PMC7923912/",
    "/articles/PMC1012754/",
    "/articles/PMC12313605/",
    "/articles/PMC10353947/"
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
    "sitemap": "https://pmc.ncbi.nlm.nih.gov/sitemap.xml",
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