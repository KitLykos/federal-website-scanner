module.exports = {
  "site": "https://fema.gov",
  "urls": [
    "/",
    "/disaster/declarations",
    "/flood-maps"
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