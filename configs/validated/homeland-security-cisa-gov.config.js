module.exports = {
  "site": "https://cisa.gov",
  "urls": [
    "/",
    "/news-events/cybersecurity-advisories",
    "/known-exploited-vulnerabilities-catalog"
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