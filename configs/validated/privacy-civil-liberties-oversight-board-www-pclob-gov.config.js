module.exports = {
  "site": "https://www.pclob.gov",
  "urls": [
    "/",
    "/board/index",
    "/oversight",
    "/eventspress",
    "/about/historymission",
    "/staff/index",
    "/eventspress/index",
    "/semiannual",
    "/plan",
    "/oversightprojects",
    "/section803",
    "/careers/opportunities",
    "/oversightprojects/details/1115",
    "/oversightprojects/details/113",
    "/legal/aistatement",
    "/oversightprojects/details/14",
    "/legal/plainwriting",
    "/about/contact",
    "/board/details/98",
    "/foia/foia",
    "/agencyfinancialreports",
    "/budgetjustifications",
    "/legal/nda",
    "/vulnerability-disclosure-policy",
    "/adviceprojects",
    "/legal/eeo",
    "/search/search",
    "/privacy",
    "/board/details/97",
    "/oversightprojects/details/20",
    "/board/details/96",
    "/about/",
    "/about",
    "/board",
    "/careers/pas",
    "/oversight/"
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
    "sitemap": "https://www.pclob.gov/sitemap.xml",
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