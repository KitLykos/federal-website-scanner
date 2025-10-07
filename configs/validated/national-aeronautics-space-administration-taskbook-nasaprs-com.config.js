module.exports = {
  "site": "https://taskbook.nasaprs.com",
  "urls": [
    "/tbp/spaceline.cfm"
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