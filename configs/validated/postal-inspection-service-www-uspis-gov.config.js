module.exports = {
  "site": "https://www.uspis.gov",
  "urls": [
    "/raddocs/Upload.html"
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