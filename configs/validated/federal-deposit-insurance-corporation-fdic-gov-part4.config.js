module.exports = {
  "site": "https://fdic.gov-part4",
  "urls": [
    "/analysis/risk-review",
    "/about/privacy-program",
    "/careers/impactful-careers-join-fdic-bank-examiner-program",
    "/news/press-releases/2023",
    "/accounting/consolidated-reports-condition-and-income"
  ],
  "scanner": {
    "crawler": false,
    "sitemap": false,
    "robotsTxt": false
  },
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--headless=new"
    ],
    "defaultViewport": {
      "width": 1366,
      "height": 768
    }
  }
}