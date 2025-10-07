module.exports = {
  "site": "https://bsaefiling.fincen.treas.gov",
  "urls": [
    "/main.html"
  ],
  "scanner": {
    "crawler": false,
    "sitemap": false,
    "robotsTxt": false
  },
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--headless=new"
    ],
    "defaultViewport": {
      "width": 1366,
      "height": 768
    }
  }
}