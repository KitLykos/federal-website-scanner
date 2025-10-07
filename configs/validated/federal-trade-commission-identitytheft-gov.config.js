module.exports = {
  "site": "https://identitytheft.gov",
  "urls": [
    "/",
    "/assistant",
    "/form/consumer",
    "/account",
    "/form/theftinformation",
    "/confirmation/genericsteps"
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