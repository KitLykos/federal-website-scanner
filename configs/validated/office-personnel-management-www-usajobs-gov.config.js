module.exports = {
  "site": "https://www.usajobs.gov",
  "urls": [
    "/Search/Results",
    "/search/results/",
    "/",
    "/search/results",
    "/search/results/",
    "/Search/Results/",
    "/Search",
    "/search",
    "/job/838081000",
    "/Search/",
    "/job/842936600",
    "/search",
    "/job/835967300",
    "/search/",
    "/job/842956200",
    "/job/833846200",
    "/job/834028300",
    "/job/834569500",
    "/job/841800700",
    "/job/837291200",
    "/job/841800200",
    "/job/833745400",
    "/job/843927800",
    "/job/841800400",
    "/job/837930400",
    "/job/843729900",
    "/event",
    "/job/843729400",
    "/job/841801000",
    "/job/834026200",
    "/job/844345600",
    "/job/843832800",
    "/job/835971300",
    "/job/844581700",
    "/job/837383100",
    "/job/837967700",
    "/job/814475400",
    "/job/835962700",
    "/job/812252200",
    "/job/833381100",
    "/job/840757500",
    "/event/",
    "/job/842443900",
    "/job/839850500"
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
    "sitemap": "https://www.usajobs.gov/sitemap.xml",
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