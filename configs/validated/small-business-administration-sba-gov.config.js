module.exports = {
  "site": "https://sba.gov",
  "urls": [
    "/document/sba-form-2483-ppp-first-draw-borrower-application-form"
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