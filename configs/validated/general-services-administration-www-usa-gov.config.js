module.exports = {
  "site": "https://www.usa.gov",
  "urls": [
    "/",
    "/renew-adult-passport",
    "/unclaimed-money",
    "/passport",
    "/apply-adult-passport",
    "/benefit-finder",
    "/benefit-finder",
    "/es/i94-registro-entradas-salidas-estados-unidos",
    "/search-error",
    "/fafsa",
    "/credit-freeze",
    "/benefits",
    "/credit-reports",
    "/agencies/social-security-administration",
    "/unemployment-benefits",
    "/housing-voucher-section-8",
    "/real-id",
    "/agency-index",
    "/disability-caregiver",
    "/prisoner-records",
    "/auctions-and-sales",
    "/branches-of-government",
    "/es/localizar-persona-detenida-ice",
    "/es/solicitar-renovar-visa-turista",
    "/financial-hardship",
    "/holidays",
    "/green-card-lottery",
    "/es/",
    "/birth-certificate",
    "/car-auctions",
    "/child-passport",
    "/social-security-disability",
    "/emergency-pay-rent",
    "/help-with-energy-bills",
    "/international-drivers-license",
    "/military-requirements",
    "/presidential-succession",
    "/government-grants-and-loans"
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
    "sitemap": "https://www.usa.gov/sitemap.xml",
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