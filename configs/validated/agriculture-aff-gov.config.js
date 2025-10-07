module.exports = {
  "site": "https://aff.gov",
  "urls": [
  "/maps/aff3",
  "/home",
  "/"
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