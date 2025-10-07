module.exports = {
  "site": "https://shadesofgreen.org",
  "urls": [
    "/",
    "/ticket-prices",
    "/experiences/attractions",
    "/experiences",
    "/rooms",
    "/about-shades-green/eligibility"
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