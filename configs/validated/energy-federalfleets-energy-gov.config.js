module.exports = {
  "site": "https://federalfleets.energy.gov",
  "urls": [
    "/FleetDASH/users/password/new"
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