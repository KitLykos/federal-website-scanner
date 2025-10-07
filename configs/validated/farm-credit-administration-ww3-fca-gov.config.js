module.exports = {
  "site": "https://ww3.fca.gov",
  "urls": [
    "/readingrm/exammanual/sitepages/home.aspx",
    "/readingrm/infomemo/lists/informationmemorandums/by%20memorandum%20date.aspx",
    "/readingrm/handbook/fca%20bookletters/forms/allitems.aspx",
    "/readingrm/handbook/statutes/forms/allitems.aspx",
    "/projectws/regdev/sitepages/regcomments.aspx",
    "/fcsinfo/crs/lists/crsvariables/dispform.aspx",
    "/readingrm/handbook/fca%20board%20policy%20statements/forms/allitems.aspx",
    "/readingrm/exammanual/lists/exammanualrecentupdates/allitems.aspx",
    "/readingrm/legalop/legal%20opinion%20summaries/forms/allitems.aspx",
    "/projectws/regdev/sitepages/regtext.aspx",
    "/readingrm/handbook/fca%20pending%20regulations%20%20notices/forms/allitems.aspx",
    "/default.aspx",
    "/readingrm/handbook/update%20notices/forms/allitems.aspx",
    "/readingrm/infomemo/lists/informationmemorandums/dispform.aspx",
    "/searchcenter/pages/results.aspx",
    "/readingrm/fedreg/federal%20register%20documents/forms/fca.aspx",
    "/readingrm/handbook/title%205%20%20ethics%20supplementals/forms/allitems.aspx",
    "/projectws/regdev/sitepages/regprojects.aspx",
    "/fcsinfo/crs/callreportfiles/forms/allitems.aspx",
    "/readingrm/handbook/fca%20pending%20regulations%20%20notices/forms/farmer%20mac%20pending%20regs.aspx",
    "/readingrm/handbook/fca%20bookletters/forms/allbookletters.aspx",
    "/news/lists/news%20releases/by%20year.aspx",
    "/fcsinfo/crs/lists/crsvariables/allitems.aspx",
    "/readingrm/handbook/statutes/forms/all%20statutes.aspx"
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
    "sitemap": "https://ww3.fca.gov/sitemap.xml",
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