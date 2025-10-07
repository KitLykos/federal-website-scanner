module.exports = {
  "site": "https://esrs.jsc.nasa.gov",
  "urls": [
    "/",
    "/esrs/",
    "/beyondthephotography/crewearthobservationsvideos/automaticallygenerated/automaticallygeneratedvideos.pl",
    "/faq/default.htm"
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