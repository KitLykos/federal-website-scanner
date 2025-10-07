module.exports = {
  "site": "https://www.va.gov",
  "urls": [
    "/get-help-from-accredited-representative/",
    "/careers-employment/vocational-rehabilitation/",
    "/manage-va-debt/",
    "/disability/compensation-rates/",
    "/resources/verify-school-enrollment-for-dea-benefits/",
    "/health-care/apply-for-health-care-form-10-10ez/introduction",
    "/education/gi-bill-comparison-tool/licenses-certifications-and-prep-courses/results",
    "/education/download-letters/letters",
    "/get-help-from-accredited-representative/find-rep/",
    "/my-health/appointments/schedule/va-request/",
    "/health-care/how-to-apply/",
    "/education/benefit-rates/post-9-11-gi-bill-rates/",
    "/profile/account-security",
    "/records/",
    "/contact-us/ask-va/category-topic-1",
    "/manage-va-debt/summary",
    "/decision-reviews/supplemental-claim/",
    "/education/verify-school-enrollment/enrollment-verifications/",
    "/resources/signing-in-to-vagov/",
    "/profile/contacts",
    "/records/get-veteran-id-cards/vic/",
    "/resources/va-claim-exam/",
    "/health-care/file-travel-pay-reimbursement/",
    "/education/about-gi-bill-benefits/"
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
    "sitemap": "https://www.va.gov/sitemap.xml",
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