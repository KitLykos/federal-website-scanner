module.exports = {
  "site": "https://gml.noaa.gov",
  "urls": [
    "/dv/site/sum/met.html"
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