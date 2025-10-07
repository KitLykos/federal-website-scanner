module.exports = {
  "site": "https://e-verify.gov",
  "urls": [
    "/",
    "/about-e-verify/whats-new/alert-employer-action-required-e-verify-mismatch-case-issue"
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