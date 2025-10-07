module.exports = {
  "site": "https://star.nesdis.noaa.gov",
  "urls": [
    "/goes/conus.php",
    "/goes/conus_band.php",
    "/goes/sector_band.php",
    "/goes/sector.php"
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