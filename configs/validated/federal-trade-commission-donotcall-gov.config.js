module.exports = {
  "site": "https://donotcall.gov",
  "urls": [
    "/",
    "/register.html",
    "/verify.html",
    "/confirm.html",
    "/report.html",
    "/error.html",
    "/faq.html"
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