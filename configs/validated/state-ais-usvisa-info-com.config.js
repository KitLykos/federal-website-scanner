module.exports = {
  "site": "https://ais.usvisa-info.com",
  "urls": [
    "/es-mx/niv/users/sign_in",
    "/en-ca/niv/users/sign_in",
    "/es-mx/niv",
    "/",
    "/en-ca/niv",
    "/pt-br/niv/users/sign_in",
    "/en-us/countries_list/niv",
    "/es-co/niv/users/sign_in",
    "/pt-br/niv",
    "/es-do/niv/users/sign_in",
    "/es-co/niv",
    "/en-mx/niv/users/sign_in",
    "/es-pe/niv/users/sign_in",
    "/es-do/niv",
    "/es-hn/niv/users/sign_in",
    "/es-ec/niv/users/sign_in",
    "/en-gb/niv/users/sign_in",
    "/es-mx/niv/",
    "/es-ar/niv/users/sign_in",
    "/es-gt/niv/users/sign_in",
    "/es-gt/niv",
    "/es-mx/niv/signup",
    "/es-pe/niv",
    "/es-ec/niv",
    "/es-mx/niv/information/niv_questions",
    "/en-mx/niv",
    "/es-ar/niv",
    "/es-cr/niv/users/sign_in",
    "/es-hn/niv",
    "/en-do/niv/users/sign_in"
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
    "sitemap": "https://ais.usvisa-info.com/sitemap.xml",
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