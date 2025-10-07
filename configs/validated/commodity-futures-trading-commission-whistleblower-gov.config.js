module.exports = {
  "site": "https://whistleblower.gov",
  "urls": [
    "/",
    "/orders",
    "/notices",
    "/overview/submitatip"
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