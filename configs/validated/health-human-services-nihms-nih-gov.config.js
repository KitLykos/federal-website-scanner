module.exports = {
  "site": "https://nihms.nih.gov",
  "urls": [
    "/pmc_docs_qa/"
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