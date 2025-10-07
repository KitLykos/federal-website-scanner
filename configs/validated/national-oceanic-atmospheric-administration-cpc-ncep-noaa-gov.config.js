module.exports = {
  "site": "https://cpc.ncep.noaa.gov",
  "urls": [
    "/",
    "/products/predictions/814day/",
    "/products/predictions/610day/"
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