module.exports = {
  "site": "https://reg.usps.com",
  "urls": [
    "/entreg/loginaction_input",
    "/logout",
    "/login",
    "/entreg/LoginAction_input?app=HOLDMAIL&appURL=https%3A%2F%2Fholdmail.usps.com%2Fholdmail%2F",
    "/logout?app=ATG&appURL=https://reg.usps.com/login",
    "/informeddelivery/welcome",
    "/entreg/loginbcgaction_input",
    "/login?app=eReg&appURL=https%3A%2F%2Freg.usps.com%2Fentreg%2Fsecure%2FInformedDeliveryEnrolledAction_input",
    "/login?app=eReg&appURL=https%3A%2F%2Freg.usps.com%2Fentreg%2Fsecure%2FPreferencesSummaryAction_input",
    "/emailvalidation",
    "/login?app=eReg&appURL=https%3A%2F%2Freg.usps.com%2Fentreg%2Fsecure%2FRequestCodeAction_input",
    "/guest/login",
    "/entreg/RegistrationGatewayAction_input?etoken=invalid",
    "/informeddelivery/register"
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
    "sitemap": "https://reg.usps.com/sitemap.xml",
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