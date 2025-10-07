module.exports = {
  "site": "https://www.medicare.gov",
  "urls": [
    "/care-compare/specialties/",
    "/coverage/physical-therapy-services",
    "/basics/costs/help",
    "/care-compare/compare/",
    "/basics/forms-publications-mailings",
    "/providers-services/claims-appeals-complaints",
    "/basics/get-started-with-medicare/get-more-coverage/your-coverage-options/compare-original-medicare-medicare-advantage",
    "/basics/get-started-with-medicare/sign-up/ready-to-sign-up-for-part-a-part-b",
    "/basics/get-started-with-medicare/using-medicare/your-medicare-card",
    "/coverage/preventive-screening-services",
    "/eligibilitypremiumcalc",
    "/health-drug-plans/part-d/basics",
    "/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
    "/health-drug-plans/medigap/basics",
    "/coverage/acupuncture",
    "/basics/costs/pay-premiums/online-bill-pay",
    "/coverage/chronic-pain-management-treatment-services",
    "/health-drug-plans/part-d/what-drug-plans-cover",
    "/basics/get-started-with-medicare/whats-next",
    "/coverage/chiropractic-services",
    "/basics/reporting-medicare-fraud-and-abuse",
    "/coverage/durable-medical-equipment-dme-coverage",
    "/health-drug-plans/coordination/who-pays-first",
    "/providers-services/original-medicare/not-covered",
    "/coverage/yearly-wellness-visits"
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
    "sitemap": "https://www.medicare.gov/sitemap.xml",
    "crawler": false,
    "robotsTxt": false,
    "maxRoutes": 800,
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