module.exports = {
  "site": "https://ods.od.nih.gov",
  "urls": [
    "/factsheets/vitamind-healthprofessional/",
    "/factsheets/ashwagandha-healthprofessional/",
    "/factsheets/magnesium-healthprofessional/",
    "/factsheets/ashwagandha-datosenespanol/",
    "/factsheets/vitaminb12-healthprofessional/",
    "/factsheets/omega3fattyacids-healthprofessional/",
    "/factsheets/list-all/",
    "/factsheets/iron-healthprofessional/",
    "/factsheets/vitaminc-healthprofessional/",
    "/healthinformation/nutrientrecommendations.aspx",
    "/factsheets/vitamind-consumer/",
    "/factsheets/calcium-healthprofessional/",
    "/factsheets/potassium-healthprofessional/",
    "/factsheets/zinc-healthprofessional/",
    "/factsheets/vitaminb12-consumer/",
    "/"
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
    "sitemap": "https://ods.od.nih.gov/sitemap.xml",
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