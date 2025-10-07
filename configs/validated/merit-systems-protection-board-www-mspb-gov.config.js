module.exports = {
  "site": "https://www.mspb.gov",
  "urls": [
    "/significantcases/latham.htm"
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