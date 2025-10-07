module.exports = {
  "site": "https://www2.nrel.gov",
  "urls": [
    "/pv/cell-efficiency"
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