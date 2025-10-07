module.exports = {
  "site": "https://pmc.ncbi.nlm.nih.gov",
  "urls": [
    "/articles/PMC3775054/",
    "/articles/PMC12351903/",
    "/articles/PMC3425247/",
    "/about/disclaimer/",
    "/articles/PMC4214609/",
    "/articles/PMC5512887/",
    "/articles/PMC6474573/",
    "/articles/PMC10535526/",
    "/articles/PMC8763088/",
    "/articles/PMC8285156/",
    "/articles/PMC2550487/",
    "/search/",
    "/articles/PMC7040264/",
    "/articles/PMC11835971/",
    "/articles/PMC6364576/",
    "/articles/PMC4379393/",
    "/articles/PMC2432148/",
    "/articles/PMC7785056/",
    "/articles/PMC10476631/",
    "/about/userguide/",
    "/articles/PMC1048661/",
    "/articles/PMC3199602/",
    "/articles/PMC7998865/",
    "/articles/PMC4268074/",
    "/articles/PMC4378297/"
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
    "sitemap": "https://pmc.ncbi.nlm.nih.gov/sitemap.xml",
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