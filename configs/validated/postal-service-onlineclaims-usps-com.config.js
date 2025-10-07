module.exports = {
  "site": "https://onlineclaims.usps.com",
  "urls": [
    "/oicweb/",
    "/oicweb/claims_history"
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