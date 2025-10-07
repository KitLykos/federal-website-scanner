module.exports = {
  "site": "https://nhc.noaa.gov",
  "urls": [
    "/",
    "/gtwo.php",
    "/cyclones/",
    "/satellite.php",
    "/archive/xgtwo/gtwo_archive.php",
    "/graphics_ep1.shtml",
    "/marine/"
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