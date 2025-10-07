module.exports = {
  "site": "https://invasivespeciesinfo.gov",
  "urls": [
    "/species-profiles-list"
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