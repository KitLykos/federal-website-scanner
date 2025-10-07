module.exports = {
  "site": "https://ornl.gov",
  "urls": [
    "/waterpower/publications",
    "/",
    "/advanced-materials/news"
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