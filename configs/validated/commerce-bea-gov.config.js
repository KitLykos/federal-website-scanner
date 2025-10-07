module.exports = {
  "site": "https://bea.gov",
  "urls": [
    "/",
    "/data/gdp/gross-domestic-product",
    "/news/current-releases",
    "/news/2025/gross-domestic-product-1st-quarter-2025-advance-estimate"
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