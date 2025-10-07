module.exports = {
  "site": "https://www.stb.gov",
  "urls": [
    "/blog/rail-service-issues-/csx-service-update-01-15-2025/",
    "/blog/rail-service-issues-/csx-service-update-02-11-2015/",
    "/blog/rail-service-issues-/csx-service-update-05-31-2023/",
    "/blog/rail-service-issues-/ctco-service-update-09-21-2016/",
    "/blog/rail-service-issues-/kcs-service-update-05-04-2022/",
    "/blog/rail-service-issues-/ns-service-update-10-05-2016/",
    "/blog/rail-service-issues-/ns-service-update-12-16-2015/",
    "/blog/rail-service-issues-/up-service-update-10-23-2024/",
    "/news-communications/latest-news/pr-21-55/",
    "/news-communications/latest-news/pr-25-12/",
    "/news-communications/latest-news/pr-25-17/",
    "/resources/environmental/historic-preservation-overview/",
    "/fd33388/",
    "/news-communications/latest-news/pr-21-49/",
    "/news-communications/latest-news/pr-24-35/",
    "/blog/rail-service-issues-/cn-service-update-06-22-2016/",
    "/news-communications/latest-news/pr-24-24/",
    "/news-communications/latest-news/pr-21-43/",
    "/news-communications/latest-news/pr-22-55/",
    "/news-communications/latest-news/pr-24-30/",
    "/news-communications/latest-news/pr-25-07/",
    "/page/33/",
    "/about-stb/board-members/previous-board-members/gus-a-owen/",
    "/blog/rail-service-issues-/bnsf-service-update-08-08-2014/",
    "/news-communications/latest-news/stb-appoints-new-members-to-railroad-shipper-transportation-advisory-council/",
    "/page/8/",
    "/blog/rail-service-issues-/bnsf-service-update-08-20-2025/",
    "/blog/rail-service-issues-/cn-service-update-01-25-2023/",
    "/blog/rail-service-issues-/ns-service-update-08-19-2015/",
    "/proceedings-actions/recordations/rail-recordations/",
    "/annual-report-of-loss-and-damage-data/",
    "/blog/rail-service-issues-/cn-service-update-03-05-2025/",
    "/blog/rail-service-issues-/cp-service-update-09-15-2014/",
    "/blog/rail-service-issues-/ctco-service-update-02-02-2015/",
    "/blog/rail-service-issues-/ctco-service-update-11-23-2016/",
    "/news-communications/latest-news/pr-21-40/",
    "/news-communications/latest-news/pr-22-34/"
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
    "sitemap": "https://www.stb.gov/sitemap.xml",
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