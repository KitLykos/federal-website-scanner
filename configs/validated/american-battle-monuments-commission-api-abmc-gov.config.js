module.exports = {
  "site": "https://api.abmc.gov",
  "urls": [
    "/",
    "/about-us/history/korean-war-memorial",
    "/cemeteries-memorials",
    "/about-us/history/world-war-ii-memorial",
    "/normandy",
    "/printing-tips",
    "/db-abmc-burial-unit/405th-infantry-regiment-102nd-infantry-division",
    "/manila"
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