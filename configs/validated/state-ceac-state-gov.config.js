module.exports = {
  "site": "https://ceac.state.gov",
  "urls": [
    "/IV/Login.aspx",
    "/GenNIV/Common/AppError.aspx",
    "/GenNIV/Default.aspx",
    "/GenNIV/Default.aspx",
    "/iv/login.aspx",
    "/GenNIV/Help/Help.aspx",
    "/IV/",
    "/iv/Common/AppError.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/iv/",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx",
    "/IV/Login.aspx"
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
    "sitemap": "https://ceac.state.gov/sitemap.xml",
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