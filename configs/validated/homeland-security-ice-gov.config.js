module.exports = {
  "site": "https://ice.gov",
  "urls": [
    "/",
    "/webform/ice-tip-form",
    "/contact/field-offices",
    "/contact"
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