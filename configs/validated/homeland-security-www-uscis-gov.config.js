module.exports = {
  "site": "https://www.uscis.gov",
  "urls": [
    "/",
    "/i-9-central/form-i-9-acceptable-documents",
    "/g-1055",
    "/search",
    "/i-9",
    "/addresschange",
    "/forms/all-forms",
    "/i-765",
    "/es",
    "/i-130",
    "/feecalculator",
    "/n-400",
    "/about-us/contact-us",
    "/i-485",
    "/i-90",
    "/contactcenter",
    "/tools/find-a-civil-surgeon",
    "/citizenship-resource-center/naturalization-test-and-study-resources/study-for-the-test/2008-civics-practice-test",
    "/i-864",
    "/citizenship",
    "/citizenship/find-study-materials-and-resources/study-for-the-test",
    "/citizenship/apply-for-citizenship",
    "/green-card",
    "/citizenship/civics-practice-test-2008",
    "/i-131",
    "/ar-11",
    "/forms/all-forms",
    "/forms/filing-fees",
    "/green-card/green-card-processes-and-procedures/visa-availability-priority-dates/adjustment-of-status-filing-charts-from-the-visa-bulletin",
    "/humanitarian/temporary-protected-status/temporary-protected-status-designated-country-venezuela",
    "/records/request-records-through-the-freedom-of-information-act-or-privacy-act",
    "/newsroom/all-news",
    "/file-online",
    "/forms/forms"
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
    "sitemap": "https://www.uscis.gov/sitemap.xml",
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