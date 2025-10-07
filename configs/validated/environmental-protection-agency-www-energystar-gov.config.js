module.exports = {
  "site": "https://www.energystar.gov",
  "urls": [
    "/about/federal-tax-credits",
    "/",
    "/rebate-finder",
    "/about/federal-tax-credits/air-source-heat-pumps",
    "/productfinder/",
    "/products",
    "/about/federal-tax-credits/central-air-conditioners",
    "/productfinder/product/certified-residential-refrigerators/results",
    "/productfinder/product/certified-heat-pump-water-heaters/results",
    "/productfinder/product/certified-clothes-washers/results",
    "/about/federal-tax-credits/insulation",
    "/productfinder/product/certified-connected-thermostats/results",
    "/productfinder/product/certified-dehumidifiers/results",
    "/productfinder/product/certified-windows/results",
    "/about/federal-tax-credits/water-heaters-natural-gas-oil-propane-tax-credit",
    "/productfinder/product/certified-clothes-dryers/results",
    "/productfinder/product/certified-computers/results",
    "/about/federal-tax-credits/windows-skylights",
    "/productfinder/product/certified-gas-water-heaters/results",
    "/most-efficient/me-certified-windows/results?is_most_efficient_filter=Most+Efficient",
    "/about/federal-tax-credits/heat-pump-water-heaters",
    "/productfinder/product/certified-room-air-conditioners/results",
    "/buildings/benchmark",
    "/productfinder/product/certified-furnaces/results",
    "/saveathome/seal_insulate/identify-problems-you-want-fix/diy-checks-inspections/insulation-r-values",
    "/buildings/utility_map",
    "/productfinder/product/certified-heat-pumps/results",
    "/productfinder/product/certified-light-fixtures/results",
    "/rebate-finder",
    "/rebate-finder/",
    "/about/federal-tax-credits/furnaces-natural-gas-oil",
    "/productfinder/product/certified-room-air-cleaners/results"
  ],
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--headless=new"
    ],
    "concurrency": 1
  },
  "puppeteerPageUserAgent": "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  "userAgent": "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)",
  "disableThrottling": true,
  "disableDeviceEmulation": true,
  "lighthouseOptions": {
    "disableStorageReset": true,
    "disableLantern": true,
    "throttlingMethod": "provided",
    "onlyCategories": [
      "accessibility",
      "seo",
      "best-practices"
    ]
  },
  "scanner": {
    "sitemap": "https://www.energystar.gov/sitemap.xml",
    "crawler": false,
    "robotsTxt": false,
    "maxRoutes": 100,
    "throttle": false,
    "skipJavascript": true,
    "samples": 1,
    "pageTimeout": 90000,
    "device": "desktop",
    "exclude": [
      "/*.pdf",
      "/*.asp",
      "/*.aspx",
      "/sample-pfs-searches",
      "/security-guidelines-office-location",
      "/status-indicators",
      "/blog",
      "/my-health/*",
      "/my-va/*",
      "/auth/*",
      "/profile/*",
      "/logout",
      "**/callback*",
      "**/login*",
      "**/signin*"
    ]
  },
  "ci": {
    "skipMissing": true,
    "skipRoutesWithoutResults": true
  },
  "chrome": {
    "useSystem": true
  },
  "debug": false
}