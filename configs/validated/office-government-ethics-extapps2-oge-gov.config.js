module.exports = {
  "site": "https://extapps2.oge.gov",
  "urls": [
    "/web/oge.nsf/resources/available+now:+the+president%E2%80%99s+and+vice+president%E2%80%99s+certified+annual+financial+disclosure+reports",
    "/training/ogetraining.nsf/",
    "/training/ogetraining.nsf/calendar.xsp",
    "/training/ogetraining.nsf/leaders.xsp",
    "/training/ogetraining.nsf/0/86c64f5f41a613c885258cdc00560785",
    "/training/ogetraining.nsf/news.xsp",
    "/training/ogetraining.nsf/0/0e6f6a6ecf33af1485258cf300471cdd",
    "/web/oge.nsf/officials%20individual%20disclosures%20search%20collection",
    "/web/oge.nsf/congressional%20correspondence",
    "/web/oge.nsf/resources/eric+ueland,+deputy+director+for+management+at+omb,+designated+as+oge%E2%80%99s+acting+director"
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
    "sitemap": "https://extapps2.oge.gov/sitemap.xml",
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