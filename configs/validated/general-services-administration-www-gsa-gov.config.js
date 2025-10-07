module.exports = {
  "site": "https://www.gsa.gov",
  "urls": [
    "/travel/plan-book/per-diem-rates",
    "/",
    "/technology/it-contract-vehicles-and-purchasing-programs/federal-credentialing-services",
    "/travel",
    "/travel/plan-a-trip/per-diem-rates/mie-breakdowns",
    "/buy-through-us/purchasing-programs/shared-services/payroll-shared-services/payroll-calendars/2025-payroll-calendar",
    "/travel/plan-a-trip/transportation-airfare-rates-pov-rates-etc/airfare-rates-city-pair-program",
    "/reference/forms/request-pertaining-to-military-records",
    "/travel/plan-a-trip/transportation-airfare-rates-pov-rates-etc/privately-owned-vehicle-pov-mileage-reimbursement",
    "/technology/it-contract-vehicles-and-purchasing-programs/federal-credentialing-services/get-appointment-help/bring-required-documents",
    "/about-us/gsa-regions/region-7-greater-southwest/buildings-and-facilities/texas-federal-buildings/bridge-of-the-americas-land-port-of-entry"
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
    "sitemap": "https://www.gsa.gov/sitemap.xml",
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