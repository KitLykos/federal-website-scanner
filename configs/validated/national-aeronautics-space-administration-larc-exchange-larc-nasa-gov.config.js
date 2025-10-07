module.exports = {
  "site": "https://larc-exchange.larc.nasa.gov",
  "urls": [
    "/",
    "/clubs-athletics/amateur-radio-club/",
    "/clubs-athletics/",
    "/home/larc-exchange-services-office/"
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