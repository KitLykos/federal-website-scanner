module.exports = {
  "site": "https://store.usps.com",
  "urls": [
    "/store/cart/cart.jsp"
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