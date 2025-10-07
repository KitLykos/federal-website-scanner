module.exports = {
  "site": "https://www.nasa.gov",
  "urls": [
    "/",
    "/spot-the-station/",
    "/missions/mars-2020-perseverance/perseverance-rover/nasas-perseverance-rover-captures-mars-vista-as-clear-as-day/",
    "/images/",
    "/image-of-the-day/",
    "/wallops-launch-schedule/",
    "/learning-resources/internship-programs/",
    "/live/",
    "/learning-resources/nasa-kids-club/",
    "/news-release/acting-nasa-administrator-reflects-on-legacy-of-astronaut-jim-lovell/",
    "/events/",
    "/international-space-station/",
    "/blogs/wallops/2025/08/24/nasa-sounding-rocket-mission-targeting-aug-25-launch-attempt/",
    "/news/recently-published/",
    "/image-article/viking-1-begins-journey-to-mars/",
    "/image-article/nasas-x-59-nears-first-flight/",
    "/missions/swot/us-french-swot-satellite-measures-tsunami-after-massive-quake/",
    "/careers/",
    "/blogs/commercialcrew/",
    "/blogs/wallops/2025/08/15/turbulence-at-edge-of-space/",
    "/specials/kidsclub/games/clubhouse/",
    "/missions/dawn/nasa-ceres-may-have-had-long-standing-energy-to-fuel-habitability/",
    "/wallops/",
    "/humans-in-space/commercial-space/nasa-seeks-volunteers-to-track-artemis-ii-mission/",
    "/2025-news-releases/",
    "/es/"
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
    "sitemap": "https://www.nasa.gov/sitemap.xml",
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