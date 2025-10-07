module.exports = {
  "site": "https://banknet.gov",
  "urls": [
  "/entrance/default.html"
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