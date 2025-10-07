module.exports = {
  "site": "https://nhlbi.nih.gov",
  "urls": [
    "/calculate-your-bmi",
    "/education/dash-eating-plan",
    "/"
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