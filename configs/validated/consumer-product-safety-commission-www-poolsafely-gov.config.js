module.exports = {
  "site": "https://www.poolsafely.gov",
  "urls": [
    "/educational-materials-catalog/"
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