module.exports = {
  "site": "https://ug.usembassy.gov",
  "urls": [
    "/embassy/jobs/"
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