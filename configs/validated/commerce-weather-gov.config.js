module.exports = {
  "site": "https://weather.gov",
  "urls": [
    "/",
    "/wrh/timeseries"
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