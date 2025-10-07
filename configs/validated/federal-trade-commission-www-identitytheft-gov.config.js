module.exports = {
  "site": "https://www.identitytheft.gov",
  "urls": [
    "/",
    "/assistant",
    "/form/TheftInformation",
    "/form/information",
    "/form/comments",
    "/form/Consumer",
    "/form/Summary",
    "/form/AdditionalInformation",
    "/form/suspect",
    "/account",
    "/",
    "/dashboard",
    "/",
    "/ComplaintUpdate",
    "/confirmation/genericsteps",
    "/info-lost-or-stolen",
    "/ComplaintUpdate/UpdateTheftDetails",
    "/",
    "/Steps",
    "/dashboard/CallCompany/1",
    "/dashboard/FraudAlert/1",
    "/",
    "/steps",
    "/dashboard/ConsiderExtended/1",
    "/ComplaintUpdate/UpdateComments",
    "/",
    "/ComplaintUpdate/dashboardassistant",
    "/ComplaintUpdate/UpdateAdditionalInfo",
    "/CreditBureauContacts",
    "/",
    "/dashboard/ReviewCredit/1",
    "/",
    "/ComplaintUpdate/UpdateConsumer",
    "/creditbureaucontacts",
    "/Sample-Letters",
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
    "sitemap": "https://www.identitytheft.gov/sitemap.xml",
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