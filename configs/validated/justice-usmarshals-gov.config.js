module.exports = {
  "site": "https://usmarshals.gov",
  "urls": [
    "/what-we-do/fugitive-apprehension/profiled-fugitives",
    "/",
    "/what-we-do/asset-forfeiture",
    "/what-we-do/fugitive-investigations/15-most-wanted-fugitive"
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