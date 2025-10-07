module.exports = {
  "site": "https://br.usembassy.gov",
  "urls": [
    "/pt/visas-pt/vistos-de-nao-imigrantes/"
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