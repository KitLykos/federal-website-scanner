module.exports = {
  "site": "https://cbp.gov",
  "urls": [
    "/travel/trusted-traveler-programs/global-entry",
    "/",
    "/travel/us-citizens/mobile-passport-control",
    "/trade/automated/cargo-systems-messaging-service",
    "/travel/trusted-traveler-programs/global-entry/how-apply",
    "/travel/trusted-traveler-programs/global-entry/eligibility",
    "/travel/trusted-traveler-programs/global-entry/enrollment-arrival",
    "/travel/international-visitors/i-94",
    "/travel/trusted-traveler-programs/global-entry/enrollment-centers",
    "/travel/trusted-traveler-programs/global-entry/global-entry-mobile-application"
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