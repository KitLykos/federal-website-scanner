module.exports = {
  "site": "https://hudhomestore.gov",
  "urls": [
    "/",
    "/propertydetails",
    "/account/register",
    "/naidportal",
    "/bidresults",
    "/propertycontacts",
    "/propertyflyer",
    "/faq",
    "/account/emailverification"
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