module.exports = {
  "site": "https://www.usccr.gov",
  "urls": [
    "/advisory-committees/new-jersey",
    "/news/2024/new-york-advisory-committee-releases-report-examining-new-york-child-welfare-system-and",
    "/reports/2014/patient-dumping",
    "/reports/2024/performance-and-accountability-report-fiscal-year-2024",
    "/territories/puerto-rico",
    "/advisory-committees/south-carolina",
    "/meetings/2019/11-15-subminimum-wages-impacts-civil-rights-people-disabilities",
    "/states/texas",
    "/news/2025/us-commission-civil-rights-appoints-members-state-advisory-committees",
    "/news/2025/us-commission-civil-rights-appoints-members-state-advisory-committees-0",
    "/news/2025/us-commission-civil-rights-appoints-members-west-virginia-state-advisory-committee",
    "/reports/2024/civil-rights-and-disparities-pediatric-healthcare-access-racial-and-ethnic-minority",
    "/es",
    "/advisory-committees/illinois",
    "/advisory-committees/louisiana",
    "/advisory-committees/massachusetts",
    "/news/2025/north-carolina-advisory-committee-releases-report-implementation-rylans-law-and-disparate",
    "/meetings/2023/07-10-overview-effects-covid-19-pandemic-education-nebraska",
    "/advisory-committees/pennsylvania",
    "/reports/2024/physical-barriers-accessibility-individuals-disabilities-washington",
    "/reports/2024/request-congressional-appropriation-fiscal-year-2025",
    "/advisory-committees/south-dakota",
    "/news/2021/us-commission-civil-rights-releases-report-racial-disparities-maternal-health",
    "/meetings/2019/02-22-women-prison-seeking-justice-behind-bars",
    "/reports/2025/2024-foia-annual-report",
    "/meetings/2025/01-17-commission-business-meeting",
    "/meetings/2025/06-20-commission-business-meeting"
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
    "sitemap": "https://www.usccr.gov/sitemap.xml",
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