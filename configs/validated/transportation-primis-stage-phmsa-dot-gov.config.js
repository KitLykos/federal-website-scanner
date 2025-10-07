module.exports = {
  "site": "https://primis-stage.phmsa.dot.gov",
  "urls": [
    "/comm/",
    "/comm/states.htm"
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