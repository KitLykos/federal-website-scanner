module.exports = {
  "site": "https://securityawareness.dcsa.mil",
  "urls": [
    "/cui/index.html",
    "/cui/story.html",
    "/itawareness/story.html",
    "/derivative/index.htm",
    "/itawareness/index.htm",
    "/cidod/quiz/story.html",
    "/derivative/story.html",
    "/derivative/quiz/story.html",
    "/",
    "/itawareness/quiz/story.html",
    "/opsec/index.htm",
    "/opsec/story.html",
    "/awarenessrefresher/story.html",
    "/cidod/story.html",
    "/awarenessrefresher/index.html",
    "/cidod/index.html",
    "/cybersecurity/content/quiz/story.html",
    "/cybersecurity/index.htm",
    "/disclosure/quiz/story.html",
    "/piiv2/index.htm"
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
    "sitemap": "https://securityawareness.dcsa.mil/sitemap.xml",
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