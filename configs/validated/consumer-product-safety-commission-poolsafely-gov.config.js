module.exports = {
  "site": "https://poolsafely.gov",
  "urls": [
    "/",
    "/educational-materials-catalog/",
    "/parents/safety-tips/"
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