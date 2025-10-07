module.exports = {
  "site": "https://cms.gov",
  "urls": [
    "/",
    "/medicare/health-drug-plans/part-c-d-performance-data",
    "/about-cms/contact/newsroom",
    "/nosurprises"
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