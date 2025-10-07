module.exports = {
  "site": "https://www.ginniemae.gov",
  "urls": [
    "/pages/profile.aspx",
    "/investors/investor_search_tools/Pages/default.aspx",
    "/pages/default.aspx",
    "/Pages/profile.aspx?src=%2fdata_and_reports%2fdisclosure_data%2fpages%2fdatadownload_bulk.aspx",
    "/investors/investor_search_tools/pages/default.aspx",
    "/investors/disclosures_and_reports/pages/bulletinsdisppage.aspx",
    "/issuers/program_guidelines/pages/mbsguideapmslibdisppage.aspx",
    "/Pages/profile.aspx?src=%2fdata_and_reports%2fadditional_data_and_reporting%2fpages%2fmulticlass_remic_download.aspx",
    "/investors/investor_search_tools/Pages/multifamily.aspx"
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
    "sitemap": "https://www.ginniemae.gov/sitemap.xml",
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