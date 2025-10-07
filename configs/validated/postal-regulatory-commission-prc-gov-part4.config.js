module.exports = {
  "site": "https://prc.gov",
  "urls": [
    "/node/5452",
    "/nofear-act",
    "/content/november-2010-monthly-commission-public-meeting",
    "/press-releases/prc-issues-advisory-opinion-usps-proposal-change-service-standards-first-class",
    "/press-releases/prc-receives-tmf-award-modernize-mission-critical-it-and-data-initiatives/5249",
    "/press-releases/prc-releases-fy-2022-annual-compliance-determination/5308",
    "/press-releases/prc-releases-report-analyzing-postal-service%E2%80%99s-fy-2023-finances/5398",
    "/form/post-office-suspensions-dashboar/confirmation",
    "/press-releases/postal-service-files-notice-prc-pre-filing-conference-related-delivering-america",
    "/press-releases/thomas-day-sworn-prc-commissioner-and-named-vice-chairman-robert-taub-confirmed",
    "/press-releases/usps-requests-advisory-opinion-certain-aspects-its-delivering-america-plan/5419",
    "/press-releases/chairman-robert-g-taub-statement-postal-regulatory-commission%E2%80%99s-50th",
    "/papers/tony-hammond/bc4772e6cf41901e936d3a45f6f57d7ff830e880",
    "/press-releases/commissioner-mark-acton-elected-prc-vice-chairman/5298",
    "/papers/mark-acton/5161adef611a4bf01b3e34d0bd5e26fff06482d3",
    "/foia/faqs",
    "/paper-authors/mark-acton",
    "/press-releases/michael-m-kubayanda-designated-chairman-postal-regulatory-commission/5044",
    "/press-releases/michael-m-kubayanda-resumes-role-prc-chairman/5225",
    "/press-releases/prc-issues-advisory-opinion-usps-proposal-change-critical-entry-times-certain",
    "/press-releases/prc-issues-financial-analysis-report-postal-service-financial-position/5255",
    "/press-releases/prc-releases-analysis-postal-service-finances-fy-2020/5093",
    "/press-releases/prc-report-shows-usps-financial-concerns-persist-despite-improvements-liquidity",
    "/press-releases/prc-selects-jennifer-alvarez-warburton-lead-its-office-public-affairs-and-government",
    "/press-releases/prc-statement-market-dominant-rate-case/5395",
    "/privacy/pias",
    "/re-introducing-postal-regulatory-commission",
    "/papers/tony-hammond/0a1087b260b280f85ef8a7226607c552de5fb702",
    "/papers/edward-s-pearsall/9bad5febc0838fb110899a1596e3d32273b87d83",
    "/papers/prc-staff/db183125a92e73eec9ba56135d38c948a7292a2d",
    "/papers/prc-staff/cb70bc6c5369faf18032998dea7af175d9a46b39",
    "/papers/prc-staff/c46cfea5ca3988441b298b1cae4273bcb2fadee4",
    "/press-releases/2007-03-27-000000/chairman-blairs-remarks-delivering-change",
    "/press-releases/commissioner-nanci-e-langley-elected-vice-chairman-postal-regulatory-commission/4568"
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
    "sitemap": "https://prc.gov/sitemap.xml",
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