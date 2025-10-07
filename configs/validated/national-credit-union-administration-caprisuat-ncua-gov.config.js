module.exports = {
  "site": "https://caprisuat.ncua.gov",
  "urls": [
    "/implicit/callback",
    "/"
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