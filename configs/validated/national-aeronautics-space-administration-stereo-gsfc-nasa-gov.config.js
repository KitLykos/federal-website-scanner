module.exports = {
  "site": "https://stereo.gsfc.nasa.gov",
  "urls": [
    "/gallery/item.shtml"
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