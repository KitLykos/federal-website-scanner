module.exports = {
  "site": "https://ncua.gov",
  "urls": [
    "/support-services/conservatorships-liquidations/information-members-creditors"
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