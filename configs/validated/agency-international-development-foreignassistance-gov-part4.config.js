module.exports = {
  "site": "https://foreignassistance.gov",
  "urls": [
    "/cd/ukraine/2022/obligations/0",
    "/cd/zimbabwe/2022/disbursements/0",
    "/cd/benin/",
    "/cd/burma%20(myanmar)/current/obligations/1",
    "/cd/congo%20(brazzaville)/",
    "/cd/somalia/2024/obligations/0",
    "/cd/barbados/",
    "/cd/bolivia/",
    "/cd/haiti/2025/obligations/0",
    "/cd/nicaragua/",
    "/cd/philippines/2025/obligations/0",
    "/cd/burma%20(myanmar)/",
    "/cd/india/2025/obligations/0",
    "/cd/kazakhstan/",
    "/cd/kenya/2025/obligations/0",
    "/cd/west-bank-gaza/2023/obligations/1",
    "/consolidation",
    "/api-docs/about",
    "/cd/cote%20d'ivoire/",
    "/cd/somalia/2025/obligations/0",
    "/cd/sri%20lanka/",
    "/cd/zimbabwe/2018/disbursements/0",
    "/cd/israel/2020/obligations/0",
    "/cd/afghanistan/2021/obligations/0",
    "/cd/norway/",
    "/cd/paraguay/",
    "/cd/saudi%20arabia/2023/obligations/0",
    "/cd/thailand/",
    "/cd/albania/2025/obligations/0",
    "/cd/central%20african%20republic/",
    "/cd/costa%20rica/",
    "/cd/ethiopia/2024/obligations/0",
    "/cd/lebanon/2024/obligations/0",
    "/cd/mexico/2024/obligations/0",
    "/cd/pakistan/2025/disbursements/0",
    "/cd/switzerland/",
    "/cd/zimbabwe/2010/disbursements/0"
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
    "sitemap": "https://foreignassistance.gov/sitemap.xml",
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