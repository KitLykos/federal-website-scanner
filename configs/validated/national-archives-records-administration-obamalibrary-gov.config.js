module.exports = {
  "site": "https://obamalibrary.gov",
  "urls": [
    "/obamas/president-barack-obama",
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