module.exports = {
  "site": "https://www.ncbi.nlm.nih.gov",
  "urls": [
    "/",
    "/geo/query/acc.cgi",
    "/tools/primer-blast/primertool.cgi",
    "/mesh/",
    "/datasets/genome/",
    "/tools/primer-blast/index.cgi",
    "/index1.shtml",
    "/Traces/study/",
    "/geoprofiles",
    "/geo/",
    "/nuccore/",
    "/clinvar/",
    "/websub/",
    "/geo/geo2r/",
    "/genbank/",
    "/gene/",
    "/tools/primer-blast/",
    "/datasets/genome/",
    "/orffinder/",
    "/nucleotide/",
    "/snp/",
    "/sciencv/",
    "/books/NBK501922/",
    "/mesh/advanced",
    "/books/NBK547852/"
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