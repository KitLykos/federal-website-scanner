module.exports = {
  "site": "https://ids.usitc.gov",
  "urls": [
    "/case/8131/investigation/8421",
    "/case/8272/investigation/8722",
    "/case/8173/investigation/8522",
    "/case",
    "/",
    "/search",
    "/case/8297/investigation/8783",
    "/404",
    "/case/8209/investigation/8638",
    "/link/20054",
    "/case/8233/investigation/8703",
    "/case/8153/investigation/8477",
    "/case/8298/investigation/8784",
    "/case/1491/investigation/8591",
    "/case/8223/investigation/8656",
    "/case/8191/investigation/8553",
    "/case/8208/investigation/8632",
    "/case/8281/investigation/8736",
    "/case/8299/investigation/8785",
    "/link/20052",
    "/case/8290/investigation/8760",
    "/case/8288/investigation/8752"
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
    "sitemap": "https://ids.usitc.gov/sitemap.xml",
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