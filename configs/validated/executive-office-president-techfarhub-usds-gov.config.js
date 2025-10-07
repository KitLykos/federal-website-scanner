module.exports = {
  "site": "https://techfarhub.usds.gov",
  "urls": [
    "/",
    "/get-started/ditap/",
    "/get-started/",
    "/resources/learning-center/field-guides/finding-opportunities/",
    "/pre-solicitation/agile-overview/",
    "/solicitation/contract-design/",
    "/resources/templates-samples/",
    "/get-started/8a/",
    "/resources/learning-center/field-guides/create-inspiring-product-vision/",
    "/resources/learning-center/sample-language-for-government-contracts/",
    "/resources/learning-center/field-guides/quick-and-dirty-agile-project-management/",
    "/evaluation/technical-evaluation/",
    "/pre-solicitation/planning-for-agile/",
    "/pre-solicitation/",
    "/resources/templates-samples/agile-team-estimator/",
    "/resources/case-studies/",
    "/pre-solicitation/requirements-development/",
    "/resources/learning-center/field-guides/tech-challenge-playbook/",
    "/evaluation/price-evaluation/",
    "/resources/learning-center/agency-maturity-for-agile/",
    "/resources/case-studies/case-study-challenge-navigating-stakeholder-and-decision-making-challenges/",
    "/resources/case-studies/case-study-challenge-the-agile-shift-at-hhs/",
    "/resources/contract-solutions-vehicles/",
    "/resources/",
    "/solicitation/",
    "/resources/learning-center/field-guides/",
    "/evaluation/",
    "/contract-administration/",
    "/pre-solicitation/the-agile-team/",
    "/resources/tools/",
    "/resources/learning-center/",
    "/resources/case-studies/va-dot-gov-salesforce-coe/",
    "/solicitation/performance-based-contracting/",
    "/solicitation/terms-conditions/",
    "/contract-administration/contract-administration-and-audit-services/",
    "/solicitation/small-business-programs/",
    "/resources/case-studies/va-modernize-claims-appeals/",
    "/resources/learning-center/acquisition-principles/",
    "/resources/learning-center/history-of-tfh/"
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
    "sitemap": "https://techfarhub.usds.gov/sitemap.xml",
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