module.exports = {
  "site": "https://help.cbp.gov",
  "urls": [
    "/s/questions",
    "/s/"
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