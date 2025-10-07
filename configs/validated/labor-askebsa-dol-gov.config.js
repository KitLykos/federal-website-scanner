module.exports = {
  "site": "https://askebsa.dol.gov",
  "urls": [
    "/vfcpcalculator/webcalculator.aspx"
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