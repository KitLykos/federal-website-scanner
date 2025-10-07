module.exports = {
  "site": "https://spc.noaa.gov",
  "urls": [
    "/products/outlook/",
    "/",
    "/products/exper/day4-8/",
    "/products/outlook/day2otlk.html",
    "/products/outlook/day1otlk.html"
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