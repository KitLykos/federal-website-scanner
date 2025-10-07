module.exports = {
  "site": "https://www3.epa.gov",
  "urls": [
    "/recyclecity/mainmap.htm"
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