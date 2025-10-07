module.exports = {
  "site": "https://www.nps.gov",
  "urls": [
    "/yose/planyourvisit/campgrounds.htm",
    "/indu/index.htm",
    "/cuva/index.htm",
    "/brca/index.htm",
    "/yell/planyourvisit/campgrounds.htm",
    "/jotr/index.htm",
    "/perl/index.htm",
    "/olym/planyourvisit/camping.htm",
    "/badl/index.htm",
    "/yell/planyourvisit/lodging.htm",
    "/planyourvisit/veterans-and-gold-star-families-free-access.htm",
    "/anch/learn/historyculture/how-close-is-alaska-to-russia.htm",
    "/zion/planyourvisit/fees.htm",
    "/blri/planyourvisit/road-construction-projects.htm",
    "/yell/planyourvisit/index.htm",
    "/cave/index.htm",
    "/neri/index.htm",
    "/alca/index.htm",
    "/subjects/gisandmapping/nps-maps.htm",
    "/bibe/index.htm",
    "/meve/index.htm",
    "/civilwar/search-battle-units.htm"
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
    "sitemap": "https://www.nps.gov/sitemap.xml",
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