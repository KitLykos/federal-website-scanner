module.exports = {
  "site": "https://www.ncbi.nlm.nih.gov",
  "urls": [
    "/gene",
    "/datasets/gene/",
    "/protein/",
    "/books/NBK430685/",
    "/projects/sviewer/",
    "/books/NBK1116/",
    "/sra",
    "/gds",
    "/datasets/genome/",
    "/books/NBK556096/",
    "/datasets/taxonomy/tree/",
    "/account/signout/",
    "/datasets/taxonomy/tree/",
    "/pcsubstance",
    "/guide/all/",
    "/search/",
    "/books/",
    "/datasets/",
    "/geo/submitter/",
    "/search/research-news/10322/",
    "/nlmcatalog/journals/",
    "/mesh",
    "/geo/browse/",
    "/clinvar/",
    "/nuccore"
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
    "sitemap": "https://www.ncbi.nlm.nih.gov/sitemap.xml",
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