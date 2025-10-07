module.exports = {
  "site": "https://securityawareness.dcsa.mil",
  "urls": [
    "/cidod/story.html"
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