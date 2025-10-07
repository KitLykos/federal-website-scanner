module.exports = {
  "site": "https://ic3.gov",
  "urls": [
    "/",
    "/psa/2025/psa250306"
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