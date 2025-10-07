module.exports = {
  "site": "https://www.nlrb.gov",
  "urls": [
    "/about-nlrb/who-we-are/our-history"
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