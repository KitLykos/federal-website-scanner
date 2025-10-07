module.exports = {
  "site": "https://edap.epa.gov",
  "urls": [
    "/public/extensions/tritoxicstracker_embedded/tritoxicstracker_embedded.html"
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