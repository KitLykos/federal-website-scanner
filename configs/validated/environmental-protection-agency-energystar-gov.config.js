module.exports = {
  "site": "https://energystar.gov",
  "urls": [
    "/",
    "/about/federal-tax-credits",
    "/about/federal-tax-credits/air-source-heat-pumps",
    "/products",
    "/about/federal-tax-credits/central-air-conditioners",
    "/about/federal-tax-credits/insulation",
    "/buildings/benchmark",
    "/about/federal-tax-credits/water-heaters-natural-gas-oil-propane-tax-credit",
    "/most-efficient/me-certified-windows/results",
    "/about/federal-tax-credits/windows-skylights",
    "/about/federal-tax-credits/heat-pump-water-heaters"
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