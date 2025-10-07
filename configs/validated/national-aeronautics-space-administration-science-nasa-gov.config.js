module.exports = {
  "site": "https://science.nasa.gov",
  "urls": [
    "/solar-system/comets/3i-atlas/",
    "/solar-system/planets/",
    "/mission/hubble/multimedia/what-did-hubble-see-on-your-birthday/",
    "/solar-system/",
    "/blogs/3iatlas/2025/08/25/nasas-webb-space-telescope-observes-interstellar-comet/",
    "/eyes/",
    "/mission/voyager/where-are-voyager-1-and-voyager-2-now/",
    "/mission/webb/",
    "/mission/webb/multimedia/images/",
    "/",
    "/earth/facts/",
    "/mars/",
    "/mars/facts/",
    "/missions/hubble/as-nasa-missions-study-interstellar-comet-hubble-makes-size-estimate/",
    "/blogs/planetary-defense/2025/07/02/nasa-discovers-interstellar-comet-moving-through-solar-system/",
    "/mission/hubble/",
    "/blogs/webb/2025/08/19/new-moon-discovered-orbiting-uranus-using-nasas-webb-telescope/",
    "/universe/black-holes/",
    "/universe/",
    "/exoplanets/",
    "/mission/voyager/voyager-stories/",
    "/moon/moon-phases/",
    "/climate-change/",
    "/sun/",
    "/mission/voyager/",
    "/mercury/facts/",
    "/universe/stars/",
    "/science-research/heliophysics/a-gigantic-jet-caught-on-camera-a-spritacular-moment-for-nasa-astronaut-nicole-ayers/",
    "/venus/venus-facts/",
    "/mission/mars-2020-perseverance/",
    "/moon/",
    "/eclipses/future-eclipses/",
    "/universe/galaxies/",
    "/jupiter/jupiter-facts/",
    "/earth/",
    "/missions/webb/nasas-webb-finds-new-evidence-for-planet-around-closest-solar-twin/",
    "/solar-system/meteors-meteorites/perseids/",
    "/saturn/facts/",
    "/jupiter/",
    "/mercury/",
    "/climate-change/evidence/",
    "/solar-system/solar-system-facts/",
    "/missions/webb/webb-narrows-atmospheric-possibilities-for-earth-sized-exoplanet-trappist-1-d/",
    "/asset/hubble/comet-3i-atlas/"
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
    "sitemap": "https://science.nasa.gov/sitemap.xml",
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