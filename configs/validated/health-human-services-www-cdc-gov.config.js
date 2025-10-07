module.exports = {
  "site": "https://www.cdc.gov",
  "urls": [
    "/nwss/rv/influenzaa-nationaltrend.html",
    "/healthyweight/spanish/assessing/bmi/adult_bmi/metric_bmi_calculator/bmi_calculator.html",
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