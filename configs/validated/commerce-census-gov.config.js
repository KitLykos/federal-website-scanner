module.exports = {
  "site": "https://census.gov",
  "urls": [
    "/",
    "/newsroom/press-releases/2025/vintage-2024-popest.html",
    "/data.html",
    "/newsroom/press-releases/2025/2024-presidential-election-voting-registration-tables.html"
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