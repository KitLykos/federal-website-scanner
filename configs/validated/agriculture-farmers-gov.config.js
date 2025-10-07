module.exports = {
  "site": "https://farmers.gov",
  "urls": [
  "/",
  "/working-with-us/service-center-locator"
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