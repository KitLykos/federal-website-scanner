module.exports = {
  "site": "https://www.hudexchange.info",
  "urls": [
    "/incomecalculator/dashboard/?display=login&returnURL=https%3A%2F%2Fwww%2Ehudexchange%2Einfo%2Fincomecalculator%2Fdashboard%2F",
    "/housing-and-homeless-assistance/homeless-help/",
    "/grantees/find-a-grantee/",
    "/hudexchange-portal/?display=login&returnURL=https%3A%2F%2Fwww%2Ehudexchange%2Einfo%2Fhudexchange%2Dportal%2F",
    "/hudexchange-portal/ask-a-question/?display=login&returnURL=https%3A%2F%2Fwww%2Ehudexchange%2Einfo%2Fhudexchange%2Dportal%2Fask%2Da%2Dquestion%2F",
    "/programs/",
    "/resources/",
    "/search/",
    "/",
    "/housing-and-homeless-assistance/",
    "/grantees/allocations-awards/",
    "/grantees/contacts/",
    "/content-unavailable/",
    "/hudexchange-portal/authorize/?display=login&returnURL=https%3A%2F%2Fwww%2Ehudexchange%2Einfo%2Fhudexchange%2Dportal%2Fauthorize%2F",
    "/trainings/online/",
    "/trainings/",
    "/programs/home/home-income-limits/",
    "/incomecalculator/",
    "/programs/coc/",
    "/programs/esg/",
    "/programs/cdbg/",
    "/trainings/upcoming/",
    "/program-support/my-question/",
    "/programs/home/home-rent-limits/",
    "/trainings/nspire-inspector-training/",
    "/homelessness-assistance/",
    "/programs/home/",
    "/programs/idis/",
    "/programs/housing-counseling/",
    "/grantees/",
    "/programs/hdx/pit-hic/",
    "/program-support/technical-assistance/",
    "/programs/environmental-review/",
    "/hudexchange-portal/ta-request/?display=login&returnURL=https%3A%2F%2Fwww%2Ehudexchange%2Einfo%2Fhudexchange%2Dportal%2Fta%2Drequest%2F",
    "/programs/section-202/",
    "/homelessness-assistance/ahar/",
    "/programs/hmis/",
    "/programs/coc/coc-program-eligibility-requirements/",
    "/programs/coc/coc-homeless-populations-and-subpopulations-reports/",
    "/programs/hopwa/",
    "/programs/811-pra/",
    "/hudexchange-portal/my-account/?display=login&returnURL=https%3A%2F%2Fwww%2Ehudexchange%2Einfo%2Fhudexchange%2Dportal%2Fmy%2Daccount%2F"
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
    "sitemap": "https://www.hudexchange.info/sitemap.xml",
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