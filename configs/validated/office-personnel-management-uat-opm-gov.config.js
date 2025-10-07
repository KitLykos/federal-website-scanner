module.exports = {
  "site": "https://uat.opm.gov",
  "urls": [
    "/healthcare-insurance/healthcare/plan-information/compare-plans/",
    "/healthcare-insurance/healthcare/plan-information/compare-plans/fedvip/",
    "/healthcare-insurance/healthcare/plan-information/compare-plans/fehb/plans",
    "/healthcare-insurance/healthcare/plan-information/compare-plans/fedvip/plans",
    "/"
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