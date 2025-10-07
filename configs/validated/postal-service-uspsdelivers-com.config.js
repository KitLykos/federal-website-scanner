module.exports = {
  "site": "https://uspsdelivers.com",
  "urls": [
    "/contact_details/your-shipping-advantage/"
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