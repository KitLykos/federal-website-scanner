module.exports = {
  "site": "https://thinkculturalhealth.hhs.gov",
  "urls": [
    "/behavioral-health/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fbehavioral%2Dhealth%2Fguis%2Fgui%5Fcourseposttest%2Easp%3F",
    "/behavioral-health/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fbehavioral%2Dhealth%2Fguis%2Fgui%5Fcoursepretest%2Easp%3F",
    "/registration/login",
    "/",
    "/behavioral-health/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fbehavioral%2Dhealth%2Fguis%2Fgui%5Fcourseevaluation%2Easp%3F",
    "/education/behavioral-health",
    "/behavioral-health/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fbehavioral%2Dhealth%2Fguis%2Fgui%5Fcoursepreevaluation%2Easp%3F",
    "/behavioral-health/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fbehavioral%2Dhealth%2Fguis%2Fgui%5Fcoursepreevaluation2%2Easp%3F",
    "/disaster/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fdisaster%2Fguis%2Fgui%5Fcourseposttest%2Easp%3F",
    "/disaster/default.asp?ErrorMessage=Your+session+has+timed+out%2E+To+return+to+where+you+left+off%2C+use+the+Login%2FRegister+link+at+the+top+right+of+this+page%2E&fromURL=%2Fdisaster%2Fguis%2Fgui%5Fcoursepretest%2Easp%3F"
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
    "sitemap": "https://thinkculturalhealth.hhs.gov/sitemap.xml",
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