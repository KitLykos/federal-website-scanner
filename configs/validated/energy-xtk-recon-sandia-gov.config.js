module.exports = {
  "site": "https://xtk-recon.sandia.gov",
  "urls": [
    "/componentid/trainidentify"
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