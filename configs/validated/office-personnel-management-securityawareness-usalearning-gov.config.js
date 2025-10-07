module.exports = {
  "site": "https://securityawareness.usalearning.gov",
  "urls": [
    "/cui/story.html",
    "/derivative/story.html",
    "/itawareness/story.html",
    "/",
    "/awarenessrefresher/story.html",
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