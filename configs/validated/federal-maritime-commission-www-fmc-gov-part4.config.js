module.exports = {
  "site": "https://www.fmc.gov",
  "urls": [
    "/oti-update/may-12-2025-ocean-transportation-intermediary-license-applicants/",
    "/articles/mohammad-ali-usman-named-chief-information-officer/",
    "/databases-and-publications/vessel-operating-common-carrier-vocc-audit-program/",
    "/articles/availability-of-class-action-complaints-at-the-fmc/",
    "/ftdo/chairman-maffei-commissioner-sola-assess-panama-canal-operations/",
    "/articles/fmc-closing-one-of-two-investigations-into-conditions-created-by-canadian-ballast-water-regulations/",
    "/articles/fmc-meeting-addresses-enforcement-charge-complaints-it-modernization/",
    "/oti-update/march-17-2025-ocean-transportation-intermediary-license-applicants/",
    "/oti-update/april-14-2025-ocean-transportation-intermediary-license-applicants/",
    "/articles/industry-advisory-requirement-to-file-timely-and-accurate-service-contracts/",
    "/oti-update/june-17-2024-ocean-transportation-intermediary-license-applicants/",
    "/oti-update/may-19-2025-ocean-transportation-intermediary-license-applicants/",
    "/about/commissioner-archive/carl-w-bentzel/",
    "/about/bureaus-offices/consumer-affairs-dispute-resolution-services/documentation-insurance-and-customs-requirements/",
    "/articles/fmc-issues-request-for-additional-information-regarding-nyshex-agreement-amendment/",
    "/articles/industry-advisory-requirement-to-maintain-accurate-information-on-fmc-form-fmc-1/",
    "/oti-update/november-18-2024-ocean-transportation-intermediary-license-applicants/",
    "/site-policies/",
    "/articles/american-queen-voyages-update-on-refund-process/",
    "/oti-update/april-21-2025-ocean-transportation-intermediary-license-applicants/",
    "/oti-update/december-2-2024-ocean-transportation-intermediary-license-applicants/",
    "/articles/industry-advisory-all-fmc-statutes-regulations-remain-in-full-effect-following-bridge-collapse/",
    "/articles/new-fmc-enforcement-structure/",
    "/articles/several-fmc-applications-are-currently-experiencing-issues/",
    "/ftdo/statement-of-chairman-louis-e-sola/",
    "/articles/commission-approves-supplemental-order-expanding-fact-finding-29-authority/",
    "/oti-update/december-16-2024-ocean-transportation-intermediary-license-applicants/",
    "/articles/fmc-rule-change-will-provide-more-rights-to-refunds-for-cancelled-or-delayed-cruises/",
    "/about/strategies-budgets-and-performance/federal-employee-viewpoint-survey-fevs/",
    "/oti-update/march-31-2025-ocean-transportation-intermediary-license-applicants/"
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
    "sitemap": "https://www.fmc.gov/sitemap.xml",
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