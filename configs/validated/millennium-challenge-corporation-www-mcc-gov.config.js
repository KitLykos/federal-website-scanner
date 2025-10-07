module.exports = {
  "site": "https://www.mcc.gov",
  "urls": [
    "/resources/doc/environmental-guidelines/"
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