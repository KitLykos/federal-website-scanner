module.exports = {
  "site": "https://blm.gov",
  "urls": [
    "/",
    "/maps",
    "/programs/recreation/camping"
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