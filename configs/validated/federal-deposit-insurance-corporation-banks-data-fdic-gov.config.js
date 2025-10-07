module.exports = {
  "site": "https://banks.data.fdic.gov",
  "urls": [
    "/bankfind-suite/bankfind",
    "/bankfind-suite/financialreporting/report",
    "/bankfind-suite/",
    "/bankfind-suite/SOD/marketShare",
    "/bankfind-suite/SOD/branchOffice",
    "/explore/historical",
    "/bankfind-suite/SOD",
    "/bankfind-suite/financialreporting",
    "/bankfind-suite/peergroup/customized",
    "/bankfind-suite/peergroup/customized/search",
    "/bankfind-suite/peergroup/standard",
    "/bankfind-suite/oscr",
    "/bankfind-suite/bankfind/details/57129",
    "/bankfind-suite/SOD/summaryTables",
    "/bankfind-suite",
    "/bankfind-suite/bankfind/details/628",
    "/bankfind-suite/SOD/branchoffice",
    "/bankfind-suite/bankfind/details/3510",
    "/bankfind-suite/bankfind/details/11063",
    "/bankfind-suite/oscr/branch_office_closings",
    "/explore/historical/",
    "/bankfind-suite/SOD/customDownload",
    "/bankfind-suite/help",
    "/bankfind-suite/bankfind/details/3511",
    "/bankfind-suite/historical",
    "/bankfind-suite/failures",
    "/bankfind-suite/bankfind/details/6548",
    "/bankfind-suite/financialreporting/details/6384",
    "/bankfind-suite/FinancialReporting/details/57129",
    "/bankfind-suite/bankfind/details/4297",
    "/bankfind-suite/financialreporting/details/628",
    "/bankfind-suite/bulkData/bulkDataDownload",
    "/bankfind-suite/financialreporting/details/3510",
    "/bankfind-suite/financialreporting/details/3511",
    "/bankfind-suite/bankfind/details/7213",
    "/bankfind-suite/oscr/business_combinations",
    "/bankfind-suite/financialreporting/details/14"
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
    "sitemap": "https://banks.data.fdic.gov/sitemap.xml",
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