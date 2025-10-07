module.exports = {
  "site": "https://www.fns.usda.gov",
  "urls": [
    "/data-research",
    "/snap/supplemental-nutrition-assistance-program",
    "/snap/recipient/eligibility",
    "/snap/state-directory",
    "/resources",
    "/",
    "/fns-contacts",
    "/snap/eligible-food-items",
    "/cn/fr-031325",
    "/schoolmeals/income-eligibility-guidelines",
    "/snap/waivers/foodrestriction",
    "/usda-foods/ffavors",
    "/snap/eligibility/elderly-disabled-special-rules",
    "/summer/sunbucks",
    "/snap/retailer-locator",
    "/tn/professional-standards/trainings-tracker-tool",
    "/wic",
    "/programs",
    "/snap/applicant-participant",
    "/wic/applicant-participant/eligibility",
    "/nslp",
    "/snap/work-requirements",
    "/snap-et",
    "/research/cnpp/usda-food-plans/cost-food-monthly-reports",
    "/cacfp",
    "/snap/ebt",
    "/wic/applicant-participant/apply",
    "/snap/retailer/apply-to-accept",
    "/snap/online",
    "/snap/students",
    "/snap/obbb-implementation",
    "/contact-us",
    "/wic/food-packages",
    "/fm/grant-opportunities"
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
    "sitemap": "https://www.fns.usda.gov/sitemap.xml",
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