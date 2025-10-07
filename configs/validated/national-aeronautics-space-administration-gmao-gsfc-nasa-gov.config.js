module.exports = {
  "site": "https://gmao.gsfc.nasa.gov",
  "urls": [
    "/operations/status.php"
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