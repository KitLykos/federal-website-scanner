module.exports = {
  "site": "https://halekoa.com",
  "urls": [
    "/",
    "/rooms-suites"
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