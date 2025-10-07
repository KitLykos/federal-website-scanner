module.exports = {
  "site": "https://ncua.gov",
  "urls": [
    "/regulation-supervision/regulatory-compliance-resources/bank-secrecy-act-resources",
    "/regulation-supervision/regulatory-reporting/cuonline/5300-call-report-faqs",
    "/regulation-supervision/manuals-guides/federal-credit-union-charter-application-guide/overview-federal-credit-unions",
    "/regulation-supervision/letters-credit-unions-other-guidance/federal-credit-union-post-examination-survey",
    "/support-services/credit-union-resources-expansion/field-membership-expansion",
    "/regulation-supervision/examination-modernization-initiatives/enterprise-solution-modernization-program/data-exchange-application-dexa",
    "/newsroom/press-release/2020/deposits-are-safe-federally-insured-credit-unions",
    "/regulation-supervision/manuals-guides/federal-consumer-financial-protection-guide/compliance-management/deposit-regulations/truth-savings-act-ncua-rules-regulations-part-707",
    "/regulation-supervision/manuals-guides/federal-credit-union-charter-application-guide/phase-2/activity-4/policies",
    "/regulation-supervision/examination-program",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-anh-thu-nguyen",
    "/regulation-supervision/regulatory-compliance-resources/cybersecurity-resources/cyber-incident-reporting-guide",
    "/analysis/cuso-economic-data/credit-union-bank-rates/credit-union-and-bank-rates-2025-q2",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-kelly-jo-muzzana",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-jovan-eric-bell",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-raul-villarreal",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-lindsay-d-risinger",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-jalen-craig-mcmillan",
    "/regulation-supervision/manuals-guides/federal-consumer-financial-protection-guide/compliance-management/lending-regulations/servicemembers-civil-relief-act-scra",
    "/regulation-supervision/manuals-guides/federal-consumer-financial-protection-guide/truth-lending-act-checklist",
    "/support-services/credit-union-resources-expansion/starting-new-federal-credit-union/chartering-field-membership-and-conversion-resources",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-phi-beta-sigma-federal-credit-union",
    "/regulation-supervision/board-appeals",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-ana-alicea",
    "/support-services/share-insurance-fund/toolkit-credit-unions",
    "/support-services/access",
    "/regulation-supervision/corporate-credit-unions",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-christian-wright",
    "/news/enforcement-actions/administrative-orders/2025/administrative-order-matter-stephen-hopkins"
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
    "sitemap": "https://ncua.gov/sitemap.xml",
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