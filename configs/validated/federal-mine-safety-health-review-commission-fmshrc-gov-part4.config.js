module.exports = {
  "site": "https://fmshrc.gov",
  "urls": [
    "/plans/fy2022-justification",
    "/plans/fy2024-justification",
    "/reports/first-quarterly-progress-report",
    "/reports/joint-report-backlog-reduction",
    "/reports/performance-accountability-report-years-ending-september-30-2008-and-2007",
    "/reports/performance-accountability-report-years-ending-september-30-2009-and-2008",
    "/reports/performance-accountability-report-years-ending-september-30-2010-and-2009",
    "/reports/performance-and-accountability-report-fiscal-year-2021",
    "/arguments/argument_2023-10-10",
    "/meetings/meeting_2023-10-10",
    "/reports/second-quarterly-progress-report",
    "/arguments/argument_2023-02-07",
    "/meetings/meeting_2023-11-14-0",
    "/meetings/meeting_2023-05-18",
    "/decisions/alj/04022025/secretary-labor-v-consol-mining-company-llc",
    "/decisions/alj/04022025/secretary-labor-v-consol-mining-company-llc-0",
    "/arguments/argument_2025-05-06",
    "/meetings/meeting_2025-05-06",
    "/meetings/meeting_2024-11-12",
    "/arguments/argument_2020-10-07",
    "/arguments/argument_2019-10-17",
    "/arguments/argument_2025-01-28",
    "/meetings/meeting_2024-03-12-0",
    "/meetings/meeting_2024-04-17",
    "/meetings/meeting_2025-01-28",
    "/meetings/meeting_2025-03-11",
    "/arguments/argument_2020-05-27",
    "/arguments/argument_2022-07-14",
    "/meetings/meeting_2023-06-06",
    "/arguments/argument_2019-05-22",
    "/arguments/argument_2019-08-15",
    "/about/news/solar-sources-mining-llc-0"
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
    "sitemap": "https://fmshrc.gov/sitemap.xml",
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