module.exports = {
  "site": "https://cssbmb.gov",
  "urls": [
    "/",
    "/commissioner/reverend-al-sharpton/",
    "/about-cssbmb/contact/",
    "/commissioners/",
    "/about-cssbmb/history/",
    "/publication/cssbmb-annual-report-2024/",
    "/about-cssbmb/mission-vision/",
    "/cssbmb-issues-policy-recommendations-to-advance-federal-investment-hbcu-educational-opportunities/",
    "/publication/2023-annual-report/",
    "/issues/education/",
    "/commissioner/joseph-salvador-palm/",
    "/commissioner/maxwell-alejandro-frost/",
    "/issues/health-housing/",
    "/news/",
    "/commissioner/thomas-m-colclough/",
    "/issues/",
    "/commissioner/dr-calvin-johnson/",
    "/commissioner/troy-vincent/",
    "/issues/criminal-justice-civil-rights/",
    "/commissioner/frederica-s-wilson/",
    "/issues/labor-employment/"
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
    "sitemap": "https://cssbmb.gov/sitemap.xml",
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