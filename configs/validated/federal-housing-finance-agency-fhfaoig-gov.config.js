module.exports = {
  "site": "https://fhfaoig.gov",
  "urls": [
    "/",
    "/reportfraud",
    "/all-oig-reports",
    "/reports/audits%20and%20evaluations",
    "/pressrelease",
    "/meet-inspector-general",
    "/oigoffices",
    "/career",
    "/reports/semiannual",
    "/contact-us",
    "/fhfa-oig-headquarters-and-locations",
    "/reports/compliance_reviews"
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