module.exports = {
  "site": "https://wwiiregistry.abmc.gov",
  "urls": [
    "/search-the-registry/",
    "/honoree-plaque/",
    "/honoree-search-results/",
    "/",
    "/login/",
    "/honoree-search-results/page/2/",
    "/login/",
    "/background-on-wwii-memorial/",
    "/login/",
    "/wwii-configure-2fa/",
    "/success/",
    "/honoree-search-results/page/3/",
    "/whos-eligible/",
    "/memorial-dedication/",
    "/design/",
    "/register/",
    "/resources/",
    "/password-lost/",
    "/login/",
    "/honoree-search-results/page/4/",
    "/honoree-search-results/page/5/",
    "/wwii-registry/",
    "/timeline/",
    "/honoree-search-results/page/6/"
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
    "sitemap": "https://wwiiregistry.abmc.gov/sitemap.xml",
    "crawler": false,
    "robotsTxt": false,
    "maxRoutes": 100,
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