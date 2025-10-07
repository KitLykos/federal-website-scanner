module.exports = {
  "site": "https://www.commerce.gov",
  "urls": [
    "/hr/employees/leave/holidays"
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