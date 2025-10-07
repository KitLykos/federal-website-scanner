module.exports = {
  "site": "https://armypubs.army.mil",
  "urls": [
    "/productmaps/pubform/details.aspx",
    "/"
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