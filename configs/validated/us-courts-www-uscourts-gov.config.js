module.exports = {
  "site": "https://www.uscourts.gov",
  "urls": [
    "/data-news/reports/statistical-reports/bankruptcy-filing-statistics/bankruptcy-statistics-data-visualizations"
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