module.exports = {
  "site": "https://jobcorps.gov",
  "urls": [
    "/student-graduate-resources",
    "/",
    "/explore"
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