module.exports = {
  "site": "https://nesdis.noaa.gov",
  "urls": [
    "/imagery/interactive-maps/earth-real-time"
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