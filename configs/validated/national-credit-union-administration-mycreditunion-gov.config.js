module.exports = {
  "site": "https://mycreditunion.gov",
  "urls": [
    "/learning-resources/learning-tools/hit-road",
    "/protect-your-money/share-insurance/share-insurance-estimator",
    "/",
    "/manage-your-money/credit/credit-scores",
    "/manage-your-money/consumer-loans-credit-cards/payday-alternative-loans",
    "/manage-your-money/dealing-debt/debt-consolidation-options",
    "/about/consumer-assistance-center",
    "/about/what-credit-union",
    "/search/page",
    "/learning-resources/find-answer",
    "/about/news-blog",
    "/about/consumer-assistance-center/complaint-process",
    "/manage-your-money/credit-union-accounts-services",
    "/protect-your-money/share-insurance",
    "/manage-your-money/consumer-loans-credit-cards/credit-cards",
    "/manage-your-money/consumer-loans-credit-cards",
    "/learning-resources/webinars",
    "/learning-resources/brochures-publications",
    "/about/consumer-assistance-center/contact-us",
    "/about/what-credit-union/how-credit-union-different-bank",
    "/about/news-blog/are-you-ready-back-school-season",
    "/protect-your-money/prevention",
    "/manage-your-money/credit-union-accounts-services/checking-accounts",
    "/about/news-blog/leveling-financial-playing-field-how-equal-credit-opportunity-act-empowers-you",
    "/learning-resources/videos",
    "/learning-resources/learning-tools/world-cents",
    "/manage-your-money/credit"
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
    "sitemap": "https://mycreditunion.gov/sitemap.xml",
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