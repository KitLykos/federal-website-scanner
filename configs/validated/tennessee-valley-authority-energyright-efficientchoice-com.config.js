module.exports = {
  "site": "https://energyright.efficientchoice.com",
  "urls": [
    "/thermostats/",
    "/",
    "/thermostats/162668794-HoneywellHome-RTH9585WF1004-enervee-score/",
    "/thermostats/compare/",
    "/thermostats/167906278-ecobee-EBSTATE701-enervee-score/",
    "/checkout/payment/",
    "/thermostats/166950659-Google-NestThermostat-enervee-score/",
    "/thermostats/166950666-Google-NestThermostat-enervee-score/",
    "/checkout/confirmation/",
    "/order-summary/",
    "/thermostats/167242594-ecobee-SmartThermostat-enervee-score/",
    "/thermostats/167397203-Emerson-ST25-enervee-score/",
    "/dryers/",
    "/power-strips/",
    "/thermostats/167242587-ecobee-SmartThermostat-enervee-score/",
    "/refrigerators/"
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
    "sitemap": "https://energyright.efficientchoice.com/sitemap.xml",
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