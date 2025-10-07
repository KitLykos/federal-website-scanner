module.exports = {
  "site": "https://common.usembassy.gov",
  "urls": [
    "/es/visa-wizard-es/"
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