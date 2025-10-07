module.exports = {
  "site": "https://usgs.gov",
  "urls": [
    "/",
    "/volcanoes/kilauea/volcano-updates",
    "/programs/earthquake-hazards",
    "/volcanoes/kilauea/summit-webcams",
    "/volcanoes/kilauea/webcams",
    "/programs/earthquake-hazards/earthquakes",
    "/observatories/hvo",
    "/volcanoes/kilauea/science/monitoring-data-kilauea",
    "/volcanoes/kilauea",
    "/programs/vhp/volcano-updates"
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