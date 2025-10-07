module.exports = {
  "site": "https://oge.gov",
  "urls": [
    "/web/oge.nsf/resources/filing+status:+new+entrant+or+annual",
    "/web/oge.nsf/resources/la-23-13:+ethics+guidance+on+use+of+professional+networking+platforms+and+monetizing+social+media+activity",
    "/web/oge.nsf/resources/model+qualified+blind+trust+agreement",
    "/web/oge.nsf/resources/oge+ethics+posters+-+(pdf+list+of+posters)",
    "/web/oge.nsf/strategic_communications_ethics_toolkit",
    "/web/oge.nsf/resources/u.s.+v.+hedges,+912+f.2d+1397+(11th+cir.+1990)",
    "/web/oge.nsf/resources/03x5:+appointment+to+advisory+committee+as+%E2%80%9Crepresentative%E2%80%9D+versus+sge",
    "/web/oge.nsf/resources/18+u.s.c.+%C2%A7+201:+bribery+of+public+officials+and+witnesses",
    "/web/oge.nsf/37bf4d7550bd126d852585de0063e635/fe904fadb163b45a852585b6005a23e8",
    "/web/oge.nsf/resources/oge+and+offices+of+inspectors+general+work+together+to+protect+the+integrity+of+executive+branch+programs+and+operations",
    "/web/oge.nsf/resources/94x1:+determining+whether+a+government+employee+can+participate+as+a+speaker+at+a+conference",
    "/web/oge.nsf/about_records"
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
    "sitemap": "https://oge.gov/sitemap.xml",
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