module.exports = {
  "site": "https://www.nlrb.gov",
  "urls": [
    "/reports/nlrb-case-activity-reports/representation-cases/election/election-statistics",
    "/guidance/memos-research/advice-memos/recently-released-advice-memos",
    "/about-nlrb/who-we-are/division-judges/division-judges-directory",
    "/news-publications/publications/brochures",
    "/my-downloads",
    "/search/case/dollar%20general",
    "/search/case/united%20parcel%20service",
    "/about-nlrb/rights-we-protect/the-law/employees/strikes-pickets-and-protest",
    "/about-nlrb/who-we-are/regional-offices/region-27-denver",
    "/case/02-rc-371981",
    "/about-nlrb/rights-we-protect/your-rights/nlra-and-the-right-to-strike",
    "/cases-decisions/weekly-summaries-decisions/summary-of-nlrb-decisions-for-week-of-august-18-22-2025",
    "/resources/nlrb-process/unfair-labor-practice-process-chart",
    "/case/13-ca-338285",
    "/guidance/key-reference-materials/immigrant-worker-rights",
    "/case/13-rc-360750",
    "/case/02-ca-341669",
    "/news-outreach/news-story/nlrb-general-counsel-issues-memo-on-unlawful-electronic-surveillance-and",
    "/about-nlrb/rights-we-protect/the-law/employees",
    "/about-nlrb/rights-we-protect/the-law/employees/hiring-halls",
    "/about-nlrb/who-we-are/regional-offices/region-03-buffalo",
    "/search/case/wells%20fargo",
    "/reports/nlrb-case-activity-reports/unfair-labor-practice-cases/disposition-of-unfair-labor-practice",
    "/news-publications/publications/fact-sheets/nlrb-representation-case-procedures-fact-sheet",
    "/about-nlrb/who-we-are/our-history/1959-landrum-griffin-act",
    "/about-nlrb/who-we-are/regional-offices/region-22-newark",
    "/about-nlrb/rights-we-protect/whats-law/employers",
    "/about-nlrb/who-we-are/careers/job-descriptions-and-listings/applying-attorney-positions-board",
    "/about-nlrb/who-we-are/our-history",
    "/news-publications/news",
    "/cases-decisions/weekly-summaries-decisions/summary-of-nlrb-decisions-for-week-of-july-28-august-1-0",
    "/case/16-ca-108239",
    "/guidance/key-reference-materials"
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
    "sitemap": "https://www.nlrb.gov/sitemap.xml",
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