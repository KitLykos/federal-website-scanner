module.exports = {
  "site": "https://tmcpfs.ops.fhwa.dot.gov",
  "urls": [
    "/projects/cmsopmsg.htm"
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