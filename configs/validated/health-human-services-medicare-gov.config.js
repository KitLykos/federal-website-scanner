module.exports = {
  "site": "https://medicare.gov",
  "urls": [
    "/",
    "/plan-compare/",
    "/care-compare/",
    "/basics/reporting-medicare-fraud-and-abuse",
    "/basics/get-started-with-medicare",
    "/coverage",
    "/basics/costs/medicare-costs",
    "/coverage/mental-health-substance-use-disorder",
    "/talk-to-someone",
    "/medigap-supplemental-insurance-plans/",
    "/health-drug-plans/part-d",
    "/coverage/bone-mass-measurements",
    "/basics/get-started-with-medicare/get-more-coverage/your-coverage-options",
    "/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare",
    "/care-compare/results",
    "/basics/costs",
    "/basics/get-started-with-medicare/after-65",
    "/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start"
  ],
  "scanner": {
    "crawler": false,
    "sitemap": false,
    "robotsTxt": false
  },
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-dev-shm-usage"
    ]
  }
}