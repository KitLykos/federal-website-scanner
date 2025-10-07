module.exports = {
  "site": "https://www.huduser.gov",
  "urls": [
    "/portal/datasets/il.html",
    "/portal/datasets/fmr.html",
    "/portal/home.html",
    "/portal/dataset/fmr-api.html",
    "/portal/sadda/sadda_qct.html",
    "/portal/datasets/fmr/smallarea/index.html",
    "/portal/datasets/lihtc.html",
    "/portal/ihs.html",
    "/portal/datasets/mtsp.html",
    "/portal/pdrdatas_landing.html",
    "/portal/search.html",
    "/portal/datasets/usps_crosswalk.html",
    "/portal/datasets/haf-il.html",
    "/portal/",
    "/portal/eviction-protection-grant.html",
    "/portal/whatsnew/whatsnew.html",
    "/portal/datasets/inflationary-adjustments-notifications.html",
    "/portal/datasets/lihtc/property.html"
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
    "sitemap": "https://www.huduser.gov/sitemap.xml",
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