module.exports = {
  "site": "https://aims2.llnl.gov",
  "urls": [
    "/",
    "/cart/items"
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