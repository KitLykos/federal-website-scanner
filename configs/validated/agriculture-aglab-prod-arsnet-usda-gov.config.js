module.exports = {
  "site": "https://aglab-prod.arsnet.usda.gov",
  "urls": [
    "/stories"
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