module.exports = {
  "site": "https://www.dol.gov",
  "urls": [
    "/newsroom/releases/eta/eta20250811",
    "/",
    "/agencies/whd/fmla/forms",
    "/agencies/whd/fmla",
    "/general/laborday/history",
    "/agencies/whd/fmla/faq",
    "/agencies/whd/contact/complaints",
    "/agencies/ofccp",
    "/agencies/whd/minimum-wage/state",
    "/general/topic/benefits-leave/fmla",
    "/agencies/whd",
    "/agencies/whd/flsa",
    "/newsroom/releases",
    "/agencies/whd/fact-sheets",
    "/agencies/eta",
    "/general/forms",
    "/agencies/eta/wioa/programs",
    "/general/topic/health-plans/cobra",
    "/general/topic/workhours/breaks",
    "/agencies/ebsa/employers-and-advisers/plan-administration-and-compliance/reporting-and-filing/form-5500",
    "/agencies/whd/fact-sheets/17a-overtime",
    "/general/topics/posters",
    "/agencies/ebsa/laws-and-regulations/laws/cobra",
    "/agencies/eta/wioa",
    "/agencies/whd/overtime",
    "/agencies/whd/fact-sheets/28-fmla",
    "/agencies/whd/fact-sheets/22-flsa-hours-worked"
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
    "sitemap": "https://www.dol.gov/sitemap.xml",
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