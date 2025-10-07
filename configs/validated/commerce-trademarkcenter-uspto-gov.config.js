module.exports = {
  "site": "https://trademarkcenter.uspto.gov",
  "urls": [
    "/",
    "/eligibility-criteria"
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