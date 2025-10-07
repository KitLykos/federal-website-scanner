module.exports = {
  "site": "https://reginfo.gov",
  "urls": [
    "/public/forward",
    "/public/do/eagendaviewrule",
    "/public/do/eagendamain",
    "/public/do/eodetails"
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