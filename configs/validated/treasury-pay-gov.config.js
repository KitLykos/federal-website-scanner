module.exports = {
  "site": "https://pay.gov",
  "urls": [
  "/public/home",
  "/public/form/start/25987221",
  "/public/login",
  "/public/unavailable",
  "/public/home/browse-payments"
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