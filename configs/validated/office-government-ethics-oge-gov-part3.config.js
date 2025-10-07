module.exports = {
  "site": "https://oge.gov",
  "urls": [
    "/web/oge.nsf/resources_candidate_letters",
    "/web/oge.nsf/resources/deferred+resignation+program+and+other+extended+leave+statuses+%E2%80%93+frequently+asked+questions",
    "/web/oge.nsf/resources/oge+issues+plain+language+discussion+for+agency+ethics+officials,+departing+employees,+and+former+employees+on+the+post-government+employment+restrictions",
    "/web/oge.nsf/all%20lef",
    "/web/oge.nsf/resources/do-00-030:+diversified+and+sector+mutual+funds",
    "/web/oge.nsf/resources/conflict+of+interest+prosecution+surveys%20(by%20year)",
    "/web/oge.nsf/resources/do-06-029:+%22particular+matter+involving+specific+parties,%22+%22particular+matter,%22+and+%22matter%22",
    "/web/oge.nsf/resources/electronic+records+room",
    "/web/oge.nsf/news+releases/99ba6090530ff04585258cf100573d47",
    "/web/oge.nsf/resources/conflict+of+interest+prosecution+surveys+index+(by+statute)",
    "/web/oge.nsf/2024%20presidential%20election%20readiness",
    "/web/oge.nsf/resources/oge+form+278e+(august+2024+accessible+pdf+version)",
    "/web/oge.nsf/resources/governmentwide+system+of+records+notices",
    "/web/oge.nsf/resources/guide+to+drafting+nominee+ethics+agreements+(2024)",
    "/web/oge.nsf/news+releases/32fa8f7c9e4f0c8585258cdf005e8f96",
    "/web/oge.nsf/news%20releases/6196569951e1c0cc85258ca80070a5ca",
    "/web/oge.nsf/resources/how+to+file+an+oge+confidential+financial+disclosure+form+(oge+form+450)",
    "/web/oge.nsf/resources/integrity+user+guide+v2.3",
    "/web/oge.nsf/resources/la-23-07:+acceptance+of+pro+bono+legal+services+under+5+c.f.r.+part+2635,+subpart+j",
    "/web/oge.nsf/resources/a+holiday+reminder+about+the+gift+rules",
    "/web/oge.nsf/news%20releases/fccccdb6367a7c0a85258c2d00683079",
    "/web/oge.nsf/resources/summary+of+the+ethics+provisions+that+apply+to+special+government+employees+(sges)",
    "/web/oge.nsf/resources/form+450+job+aid",
    "/web/oge.nsf/resources/resources+for+nominees+to+senate-confirmed+positions",
    "/web/oge.nsf/publicresources_compliance_referrals",
    "/web/oge.nsf/about_records",
    "/web/oge.nsf/resources/public+financial+disclosures:+candidates+for+president+and+vice+president+of+the+united+states+"
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