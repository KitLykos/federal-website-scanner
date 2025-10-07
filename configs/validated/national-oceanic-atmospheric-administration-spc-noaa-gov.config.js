module.exports = {
  "site": "https://spc.noaa.gov",
  "urls": [
    "/",
    "/products/outlook/",
    "/products/",
    "/products/wwa/",
    "/climo/reports/today.html",
    "/products/md/",
    "/products/watch/",
    "/products/outlook/day2otlk.html",
    "/climo/online/",
    "/products/outlook/day1otlk.html",
    "/climo/reports/yesterday.html",
    "/products/outlook/day3otlk.html",
    "/products/exper/day4-8/",
    "/exper/mesoanalysis/"
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