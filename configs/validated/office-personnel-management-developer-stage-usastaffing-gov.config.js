module.exports = {
  "site": "https://developer-stage.usastaffing.gov",
  "urls": [
    "/interconnections/dataapis/datadictionary"
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