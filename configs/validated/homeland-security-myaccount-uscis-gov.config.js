module.exports = {
  "site": "https://myaccount.uscis.gov",
  "urls": [
    "/reset-password/create-password"
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