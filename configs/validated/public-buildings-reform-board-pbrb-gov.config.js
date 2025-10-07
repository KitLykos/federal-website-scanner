module.exports = {
  "site": "https://pbrb.gov",
  "urls": [
    "/",
    "/second-round-submission/",
    "/board/",
    "/high-value-asset-round/",
    "/first-round-submission/",
    "/press-and-news-about-the-pbrb/",
    "/reading-room/",
    "/for-the-press/",
    "/upcoming-public-meetings/",
    "/events/"
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