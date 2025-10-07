module.exports = {
  "site": "https://radar.weather.gov",
  "urls": [
    "/",
    "/station/kmpx/standard",
    "/station/kmkx/standard",
    "/region/conus/standard",
    "/station/kfws/standard",
    "/station/kbox/standard",
    "/station/klot/standard",
    "/station/kapx/standard",
    "/station/klwx/standard",
    "/station/ktbw/standard",
    "/station/karx/standard",
    "/station/kftg/standard",
    "/station/kdmx/standard",
    "/station/kfsd/standard",
    "/station/kdix/standard",
    "/station/kenx/standard",
    "/station/kdlh/standard",
    "/station/kcys/standard",
    "/station/kdtx/standard",
    "/station/kiwa/standard",
    "/station/kmlb/standard"
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
    "sitemap": "https://radar.weather.gov/sitemap.xml",
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