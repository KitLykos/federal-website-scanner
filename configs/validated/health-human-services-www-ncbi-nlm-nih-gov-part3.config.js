module.exports = {
  "site": "https://www.ncbi.nlm.nih.gov",
  "urls": [
    "/taxonomy",
    "/gds/",
    "/datasets/genome/gcf_000001405.40/",
    "/books/NBK430873/",
    "/books/NBK21054/",
    "/tools/cobalt/cobalt.cgi",
    "/sra/",
    "/sites/myncbi/recentactivity",
    "/projects/msaviewer/",
    "/labs/virus/vssi/",
    "/books/NBK519712/table/ch3.t3/",
    "/sites/gdsbrowser",
    "/guide/dna-rna/",
    "/nuccore/advanced",
    "/books/NBK595006/",
    "/books/NBK441917/",
    "/nlmcatalog/",
    "/books/NBK568743/",
    "/books/NBK606120/",
    "/books/NBK207191/box/part1_ch3.box16/",
    "/books/NBK535404/",
    "/books/NBK26821/",
    "/books/NBK470395/",
    "/books/NBK546682/",
    "/datasets/taxonomy/9606/"
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