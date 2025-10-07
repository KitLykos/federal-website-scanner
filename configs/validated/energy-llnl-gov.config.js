module.exports = {
  "site": "https://llnl.gov",
  "urls": [
    "/",
    "/join-our-team/careers"
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