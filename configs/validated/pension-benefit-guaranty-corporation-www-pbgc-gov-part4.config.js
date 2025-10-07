module.exports = {
  "site": "https://www.pbgc.gov",
  "urls": [
    "/news/press/pr25-002",
    "/american-rescue-plan-act-of-2021",
    "/employers-practitioners/premium-filings/filing-due-dates",
    "/workers-retirees/learn/state-life-health-insurance-guaranty",
    "/employers-practitioners/my-paa/faq",
    "/news",
    "/employers-practitioners/legal-resources",
    "/about/privacy",
    "/workers-retirees/trusteed-plans/plan-23148400",
    "/employers-practitioners/missing-participants-program/defined-contribution",
    "/about/factsheets/page/termination",
    "/about/policies/website",
    "/employers-practitioners/legal-resources/guidance",
    "/arp-sfa/resources",
    "/workers-retirees/learn/annual-funding-notice",
    "/sitemap",
    "/about/reports/pension-insurance-modeling-system",
    "/workers-retirees/help",
    "/prac/faqs",
    "/news/press/pr24-045",
    "/employers-practitioners/plan-terminations/missing-participants",
    "/news/press/pr24-040",
    "/employers-practitioners/disaster-relief",
    "/employers-practitioners/federal-register/pending-proposed-rules",
    "/employers-practitioners/multiemployer/notices",
    "/workers-retirees/trusteed-plans/plan-21291800",
    "/workers-retirees/trusteed-plans/delphi/salaried/faqs",
    "/workers-retirees/transactions/request-summary-plan-description",
    "/employers-practitioners/reporting-disclosure/erisa-4062e",
    "/news/press/pr24-038",
    "/news/press/pr25-001",
    "/workers-retirees/trusteed-plans/delphi",
    "/prac/staff-responses-prac-questions",
    "/es/administrar-beneficio/cambiar-retencion-impuestos-federales",
    "/news/testimony",
    "/about/factsheets/page/premiums",
    "/news/press/pr24-047",
    "/workers-retirees/learn/guaranteed-benefits/disabled-participants",
    "/news/press/pr24-046",
    "/employers-practitioners/rates/maximum-guarantee",
    "/employers-practitioners/interest-rates/late-premium-payment"
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
    "sitemap": "https://www.pbgc.gov/sitemap.xml",
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