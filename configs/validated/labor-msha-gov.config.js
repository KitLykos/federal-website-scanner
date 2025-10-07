module.exports = {
  "site": "https://msha.gov",
  "urls": [
    "/",
    "/data-and-reports/mine-data-retrieval-system"
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