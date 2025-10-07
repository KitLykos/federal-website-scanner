module.exports = {
  "site": "https://www.fhfa.gov",
  "urls": [
    "/government",
    "/news/news-release/fhfa-announces-enhancements-to-flex-modification-for-borrowers-facing-financial-hardship",
    "/mortgage-translations/borrower-education-materials",
    "/policy/fannie-mae-freddie-mac-private-mortgage-insurer-eligibility-requirements-pmiers",
    "/news/news-release/fhfa-announces-conforming-loan-limits-for-2022",
    "/policy/fannie-mae-and-freddie-mac-multifamily-businesses",
    "/regulation/federal-register/proposed-rulemaking/private-transfer-fees",
    "/policy/single-security-initiative-and-common-securitization-platform",
    "/contact/data-and-research",
    "/regulation/federal-register",
    "/programs/fintech",
    "/homeowners-and-homebuyers/mortgage-assistance/resources",
    "/data/dashboard/dts/all-rural-tracts-map/2023",
    "/data/dashboard/mortgage-loan-and-natural-disaster",
    "/programs/fintech/techsprint/2024",
    "/data/dashboard/enterprise-multifamily-public-use-database",
    "/data/market-risk-scenarios",
    "/public-input/fhlbank-system-at-100-focusing-on-the-future",
    "/reports/single-family-guarantee-fees/2022",
    "/faqs",
    "/public-input/social-bonds",
    "/about/foia-office",
    "/mortgage-translations/language-translation-disclosure",
    "/news/news-release/u.s.-house-prices-rise-4.5-percent-over-the-prior-year-up-1.4-percent-from-the-third-quarter-of-2024",
    "/data/dashboard/dts/high-needs-counties-and-rural-tracts-map/2022-2024",
    "/programs/affordable-housing/community-support-program-and-cdfi-membership"
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
    "sitemap": "https://www.fhfa.gov/sitemap.xml",
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