module.exports = {
  "site": "https://niddk.nih.gov",
  "urls": [
    "/bwp",
    "/health-information/informacion-de-la-salud/enfermedades-digestivas/aparato-digestivo-funcionamiento"
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