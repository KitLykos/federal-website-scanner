module.exports = {
  "site": "https://icis.epa.gov",
  "urls": [
    "/icis/permit/editindividualsetup.do",
    "/icis/main/mainaction.do",
    "/icis/permit/limits/retrievelimit.do"
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