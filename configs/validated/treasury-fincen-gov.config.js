module.exports = {
  "site": "https://fincen.gov",
  "urls": [
  "/msb-state-selector",
  "/",
  "/boi"
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