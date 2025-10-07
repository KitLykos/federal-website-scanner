module.exports = {
  "site": "https://www.nps.gov",
  "urls": [
    "/aboutus/entrance-fee-prices.htm"
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