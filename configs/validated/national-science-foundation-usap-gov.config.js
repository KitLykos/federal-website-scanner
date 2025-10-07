module.exports = {
  "site": "https://usap.gov",
  "urls": [
    "/jobsandopportunities/",
    "/videoclipsandmaps/mcmwebcam.cfm",
    "/videoclipsandmaps/spwebcam.cfm",
    "/videoclipsandmaps/palwebcam.cfm",
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