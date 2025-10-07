module.exports = {
  "site": "https://dnfsbdev.dnfsb.gov",
  "urls": [
    "/document/monthly-site-report"
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