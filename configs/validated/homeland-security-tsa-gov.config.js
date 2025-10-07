module.exports = {
  "site": "https://tsa.gov",
  "urls": [
    "/travel/security-screening/identification",
    "/precheck",
    "/travel/security-screening/whatcanibring/all",
    "/precheck/enrollment-centers",
    "/real-id",
    "/",
    "/travel/tsa-cares",
    "/travel/security-screening/liquids-aerosols-gels-rule",
    "/real-id/real-id-faqs",
    "/real-id/are-you-real-id-ready",
    "/contact/customer-service",
    "/twic",
    "/travel/security-screening/whatcanibring/food",
    "/precheck/faq",
    "/precheck/credit-cards-offer"
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