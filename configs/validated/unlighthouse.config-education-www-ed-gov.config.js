module.exports = {
  "site": "https://www.ed.gov",
  "urls": [
    "https://www.ed.gov",
    "https://www.ed.gov/sitemap.xml",
    "https://www.ed.gov/",
    "https://www.ed.gov/about",
    "https://www.ed.gov/about/news",
    "https://www.ed.gov/about/news/press-release/us-department-of-education-announces-immediate-implementation-of-higher-education-provisions-one-big-beautiful-bill-act",
    "https://www.ed.gov/about/news/press-release/us-department-of-education-begin-federal-student-loan-collections-other-actions-help-borrowers-get-back-repayment",
    "https://www.ed.gov/about/news/press-release/us-department-of-education-continues-improve-federal-student-loan-repayment-options-addresses-illegal-biden-administration-actions",
    "https://www.ed.gov/about/news/press-release/us-department-of-education-notifies-columbia-universitys-accreditor-of-columbias-title-vi-violation",
    "https://www.ed.gov/contact-us",
    "https://www.ed.gov/grants-and-programs/apply-grant/available-grants",
    "https://www.ed.gov/grants-and-programs/recognition-programs/presidents-education-awards-program",
    "https://www.ed.gov/grants-and-programs/recognition-programs/presidents-education-awards-program/program-materials-presidents-education-awards-program",
    "https://www.ed.gov/search"
  ],
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--headless=new"
    ],
    "timeout": 60000,
    "protocolTimeout": 300000,
    "concurrency": 1
  },
  "userAgent": "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  "disableThrottling": true,
  "disableDeviceEmulation": true,
  "scanner": {
    "crawler": false,
    "sitemap": false,
    "robotsTxt": false,
    "skipJavascript": false,
    "samples": 1,
    "maxRoutes": 100,
    "dynamicSampling": false,
    "pageTimeout": 120000,
    "concurrency": 1,
    "throttle": true,
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
  "debug": false,
  "discovery": false,
  "lighthouseOptions": {
    "disableStorageReset": true,
    "disableLantern": true,
    "throttlingMethod": "provided",
    "onlyCategories": [
      "accessibility",
      "seo",
      "best-practices"
    ]
  }
}