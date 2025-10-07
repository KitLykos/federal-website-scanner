module.exports = {
  "site": "https://ops.fhwa.dot.gov",
  "urls": [
    "/wz/resources/news/wznews.asp"
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