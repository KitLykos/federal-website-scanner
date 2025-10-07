module.exports = {
  "site": "https://nasa.gov",
  "urls": [
    "/",
    "/learning-resources/internship-programs/",
    "/learning-resources/nasa-kids-club/",
    "/image-of-the-day/",
    "/images/",
    "/specials/kidsclub/games/clubhouse/",
    "/live/",
    "/fy-2026-budget-request/",
    "/blogs/commercialcrew/",
    "/international-space-station/",
    "/careers/",
    "/news/recently-published/"
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