module.exports = {
  "site": "https://regulations.gov",
  "urls": [
    "/commenton/fda-2025-n-1146-0001",
    "/",
    "/document/fda-2017-n-2562-0029",
    "/docket/dot-ost-2023-0024/document",
    "/document/fda-2024-p-4937-0001"
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