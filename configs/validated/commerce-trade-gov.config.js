module.exports = {
  "site": "https://trade.gov",
  "urls": [
    "/",
    "/press-releases",
    "/harmonized-system-hs-codes",
    "/filter/tips"
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