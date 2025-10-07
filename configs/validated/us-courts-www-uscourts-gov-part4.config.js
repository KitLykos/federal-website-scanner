module.exports = {
  "site": "https://www.uscourts.gov",
  "urls": [
    "/data-news/judicial-vacancies/confirmation-listing",
    "/about-federal-courts/educational-resources/supreme-court-landmarks/mapp-v-ohio-podcast",
    "/data-news/reports",
    "/forms-rules/forms/application-proceed-district-court-without-prepaying-fees-or-costs-long-form",
    "/administration-policies/judiciary-policies/criminal-justice-act-cja-guidelines",
    "/court-programs/fees/post-judgment-interest-rate",
    "/data-news/reports/handbooks-manuals/a-journalists-guide-federal-courts/covering-civil-cases-journalists-guide",
    "/about-federal-courts/educational-resources/educational-activities/first-amendment-activities/elonis-v-us/facts-and-case-summary-elonis-v-us",
    "/about-federal-courts/probation-and-pretrial-services/pretrial-services",
    "/administration-policies/judicial-conduct-disability",
    "/court-programs/fees/electronic-public-access-fee-schedule",
    "/court-programs/bankruptcy/bankruptcy-noticing",
    "/data-news/judiciary-news/2025/08/14/law-students-guide-tomorrows-leaders-novel-civics-initiative",
    "/forms-rules/forms/application-proceed-district-court-without-prepaying-fees-or-costs-short-form",
    "/court-records/file-a-case-cm-ecf/faqs-case-management-electronic-case-files-cm-ecf",
    "/forms-rules/forms/subpoena-testify-a-deposition-a-civil-action",
    "/court-records/access-court-proceedings/remote-public-access-proceedings/cameras-courts/national-tps-alliance-et-al-v-noem-et-al",
    "/court-records/access-court-proceedings/remote-public-access-proceedings/cameras-courts"
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
    "sitemap": "https://www.uscourts.gov/sitemap.xml",
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