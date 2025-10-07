module.exports = {
  "site": "https://nal.usda.gov",
  "urls": [
  "/human-nutrition-and-food-safety/dri-calculator"
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