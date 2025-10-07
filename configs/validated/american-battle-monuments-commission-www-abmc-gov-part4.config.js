module.exports = {
  "site": "https://www.abmc.gov",
  "urls": [
    "/news-events/news/cemeteries-add-rosettes-in-august-for-service-member-identification-announcements/",
    "/about-us/reports-policy/foia/",
    "/plan/plan-your-visit-to-ardennes-american-cemetery/",
    "/news-events/news/remembering-aleutian-campaign-world-war-ii/",
    "/cemeteries-memorials/about-tours-american-monument/",
    "/cemeteries-memorials/about-cantigny-american-monument/",
    "/news-events/news/about-architecture-new-normandy-visitors-center/",
    "/news-events/news/cambridge-visitors-center-to-reopen-in-fall-with-renewed-exhibits/",
    "/news-events/news/normandy-american-cemetery-d-day-81-visitor-notice/",
    "/education/teaching-aid/the-first-world-war-and-the-united-states/",
    "/news-events/news/5-things-you-may-not-know-about-lorraine-american-cemetery/",
    "/cemeteries-memorials/about-chaumont-marker-aef-headquarters/",
    "/history/discover-the-history-of-epinal-american-cemetery/",
    "/news-events/news/normandy-american-cemetery-memorial-day-visitor-center-hours/",
    "/news-events/news/remembering-world-war-i-american-troop-ships-first-arrive-france/",
    "/education/teaching-aid/teaching-and-mapping-geography-meuse-argonne-offensive/geography-is-war-a-case-study-of-the-argonne-forest-and-the-lost-battalion/"
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
    "sitemap": "https://www.abmc.gov/sitemap.xml",
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