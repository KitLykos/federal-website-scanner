module.exports = {
  "site": "https://www.mcc.gov",
  "urls": [
    "/resources/doc/environmental-guidelines/",
    "/about/profile/bio-rubio-marco/",
    "/news-and-events/slideshows/",
    "/resources/doc/evalbrief-092019-burkina-faso-irrigation-int/",
    "/resources/doc/guidance-technical-specifications-for-infrastructure-project-signs/",
    "/where-we-work/program/ghana-power-compact/",
    "/news-and-events/release/release-101824-zambia-compact-signed/",
    "/who-we-select/indicator/regulatory-quality-indicator/",
    "/resources/doc/data-governance-steering-committee-charter/",
    "/about/profile/bio-brooks-jonathan/",
    "/resources/story/section-jor-ccr-as-samra-project/",
    "/where-we-work/program/cabo-verde-proposed-regional-compact/",
    "/where-we-work/country/ghana/",
    "/news-and-events/release/release-092724-mcc-and-sierra-leone-sign-compact/",
    "/sectors/sector/property-rights-and-land-policy/",
    "/where-we-work/program/solomon-islands-threshold-program/",
    "/where-we-work/program/togo-threshold-program/",
    "/sectors/sector/agriculture/",
    "/our-impact/lesson-learned/lesson-na-c-2-it-is-important-to-identify-understand-and-mitig/",
    "/about/profile/bio-bessent-scott/",
    "/resources/whistleblower-protection/",
    "/resources/doc/evalbrief-040221-bfa-diverse-agriculture/",
    "/resources/branding/mcc-guidelines/",
    "/work-with-us/partnerships/",
    "/news-and-events/feature/benin-power-compact-closeout/",
    "/resources/doc/sbd-consulting-services-8jan2025/",
    "/resources/branding/downloads/",
    "/who-we-select/indicator/civil-liberties-indicator/",
    "/initiatives/initiative/country-ownership/",
    "/sectors/sector/education/",
    "/where-we-work/program/el-salvador-investment-compact/",
    "/our-impact/independent-evaluations/",
    "/resources/doc/report-fy25-q3-eeo-data/",
    "/about/profile/bio-porto-spiro-gina/",
    "/about/profile/bio-small-jason/",
    "/where-we-work/program/lesotho-compact/",
    "/where-we-work/program/niger-compact/",
    "/resources/privacy/",
    "/resources/doc/sbd-consulting-services-19aug2025/",
    "/where-we-work/country/timor-leste/",
    "/our-impact/beneficiary-analysis/",
    "/news-and-events/release/release-010225-nepal-compact-funding/",
    "/resources/doc/agreement-benin-concurrent-compact/"
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
    "sitemap": "https://www.mcc.gov/sitemap.xml",
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