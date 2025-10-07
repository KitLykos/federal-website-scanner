module.exports = {
  "site": "https://nodis3.gsfc.nasa.gov",
  "urls": [
    "/main_lib.cfm",
    "/rpt_current_directives.cfm",
    "/lib_docs.cfm"
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