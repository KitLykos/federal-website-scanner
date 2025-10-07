module.exports = {
  "site": "https://ada.gov",
  "urls": [
    "/",
    "/topics/service-animals/",
    "/resources/service-animals-2010-requirements/",
    "/resources/service-animals-faqs/",
    "/law-and-regs/design-standards/2010-stds/",
    "/topics/intro-to-ada/",
    "/resources/2024-03-08-web-rule/",
    "/resources/disability-rights-guide/",
    "/law-and-regs/design-standards/",
    "/law-and-regs/ada/",
    "/topics/parking/"
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