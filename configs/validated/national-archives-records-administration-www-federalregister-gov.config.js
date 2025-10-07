module.exports = {
  "site": "https://www.federalregister.gov",
  "urls": [
    "/documents/search",
    "/presidential-documents/executive-orders/donald-trump/2025",
    "/documents/2025/08/19/2025-15819/adoption-and-procedures-of-the-section-232-steel-and-aluminum-tariff-inclusions-process",
    "/public-inspection/current",
    "/public-inspection/search",
    "/documents/current",
    "/documents/2025/03/13/2025-03821/child-nutrition-programs-income-eligibility-guidelines",
    "/documents/2025/07/02/2025-12347/medicare-and-medicaid-programs-calendar-year-2026-home-health-prospective-payment-system-hh-pps-rate",
    "/documents/2025/08/28/2025-16554/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant",
    "/documents/2025/07/22/2025-13738/uscis-immigration-fees-required-by-hr-1-reconciliation-bill",
    "/agencies/federal-housing-finance-agency",
    "/agencies/industry-and-security-bureau",
    "/documents/2025/08/05/2025-14826/visas-visa-bond-pilot-program",
    "/documents/2025/08/04/2025-14687/reproductive-health-services",
    "/documents/2025/08/29/2025-16581/special-areas-roadless-area-conservation-national-forest-system-lands",
    "/presidential-documents/executive-orders",
    "/",
    "/documents/2025/07/16/2025-13271/medicare-and-medicaid-programs-cy-2026-payment-policies-under-the-physician-fee-schedule-and-other",
    "/documents/2025/08/06/2025-15010/further-modifying-the-reciprocal-tariff-rates",
    "/documents/2025/08/18/2025-15665/william-d-ford-federal-direct-loan-direct-loan-program",
    "/documents/2025/08/01/2025-14572/reconsideration-of-2009-endangerment-finding-and-greenhouse-gas-vehicle-standards",
    "/documents/2025/08/07/2025-14992/normalizing-unmanned-aircraft-systems-beyond-visual-line-of-sight-operations",
    "/documents/2025/08/19/2025-15819/adoption-and-procedures-of-the-section-232-steel-and-aluminum-tariff-inclusions-process",
    "/documents/2025/04/07/2025-06063/regulating-imports-with-a-reciprocal-tariff-to-rectify-trade-practices-that-contribute-to-large-and",
    "/documents/2025/08/14/2025-15493/foreign-trade-regulations-ftr-clarification-of-filing-requirements-regarding-in-transit-shipments",
    "/documents/2025/07/02/2025-12316/application-of-the-fair-labor-standards-act-to-domestic-service",
    "/documents/2025/04/17/2025-06746/rescinding-the-definition-of-harm-under-the-endangered-species-act",
    "/agencies"
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
    "sitemap": "https://www.federalregister.gov/sitemap.xml",
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