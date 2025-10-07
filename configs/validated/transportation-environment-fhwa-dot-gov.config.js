module.exports = {
  "site": "https://environment.fhwa.dot.gov",
  "urls": [
    "/env_initiatives/eco-logical/library.aspx"
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