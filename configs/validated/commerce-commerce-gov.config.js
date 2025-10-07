module.exports = {
  "site": "https://commerce.gov",
  "urls": [
    "/news",
    "/news/press-releases",
    "/",
    "/hr/employees/leave/holidays",
    "/tags/export-controls"
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