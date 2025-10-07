module.exports = {
  "site": "https://www.usds.gov",
  "urls": [
    "/",
    "/mission",
    "/apply",
    "/projects",
    "/how-we-work",
    "/projects/hack-the-pentagon",
    "/faq",
    "/projects/smeqa",
    "/news-and-blog",
    "/impact-report/2024/",
    "/impact-report/2024/covid-tests/",
    "/projects/ssa",
    "/thank-you",
    "/news-and-blog/10-years-of-usds",
    "/news-and-blog/user-research-and-the-paperwork-reduction-act",
    "/projects/va-dot-gov",
    "/contact-us",
    "/report-to-congress/2016/healthcare-dot-gov/",
    "/report-to-congress/2016/immigration-system/",
    "/impact-report/2024/by-the-numbers/",
    "/people",
    "/report-to-congress/2016/procurement/",
    "/impact-report/2024/medicaid-renewals/",
    "/impact-report/2024/ssa/",
    "/news-and-blog/core-principles-of-product-launches-in-government",
    "/impact-report/2024/intro",
    "/report-to-congress/2016/hack-the-pentagon/",
    "/report-to-congress/2017/07/login-dot-gov/",
    "/privacy",
    "/impact-report/2024/affordable-connectivity/",
    "/report-to-congress/2016/visa-processing/",
    "/impact-report/2024/infant-formula/",
    "/impact-report/2024/directfile/",
    "/news-and-blog/a-decade-of-partnership-between-usds-and-ssa",
    "/projects/discharge-upgrade-tool",
    "/projects/ditap",
    "/report-to-congress/2016/defense-travel/",
    "/projects/vaccines-dot-gov",
    "/report-to-congress/2017/07/hack-the-pentagon/",
    "/impact-report/2024/dsac/",
    "/report-to-congress/2017/fall/veterans-disability-claims/"
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
    "sitemap": "https://www.usds.gov/sitemap.xml",
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