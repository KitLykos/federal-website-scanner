module.exports = {
  "site": "https://spotthestation.nasa.gov",
  "urls": [
    "/sightings/error_page.cfm",
    "/tracking_map.cfm",
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