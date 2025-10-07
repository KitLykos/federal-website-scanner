module.exports = {
  "site": "https://data.ntsb.gov",
  "urls": [
    "/docket",
    "/docket/",
    "/docket/tocprintable",
    "/docket/document/docblob",
    "/docket/forms/recentlypublisheddockets"
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