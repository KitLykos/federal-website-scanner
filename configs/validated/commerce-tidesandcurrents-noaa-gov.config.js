module.exports = {
  "site": "https://tidesandcurrents.noaa.gov",
  "urls": [
    "/noaatidepredictions.html",
    "/ports/ports.html"
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