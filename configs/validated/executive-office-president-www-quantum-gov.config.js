module.exports = {
  "site": "https://www.quantum.gov",
  "urls": [
    "/",
    "/about/",
    "/news/",
    "/strategy/",
    "/nist-releases-post-quantum-encryption-standards/",
    "/nqco/",
    "/darpa-announces-participants-for-the-initial-stage-of-the-quantum-benchmarking-initiative/",
    "/publications-and-resources/publication-library/",
    "/science/",
    "/workforce/",
    "/quantum-image-gallery/",
    "/security/",
    "/about/nqiac/",
    "/category/rd-funding-opp/",
    "/iyq-2025/",
    "/department-of-commerce-releases-export-controls-on-quantum-technologies/",
    "/trump-administration-announces-quantum-gov-and-quantum-frontiers-report/",
    "/competitiveness/",
    "/doe-announces-625-million-for-national-quantum-information-science-research-centers/",
    "/search/",
    "/nist-draft-report-on-pqc-transition/",
    "/happy-world-quantum-day-2025/",
    "/doe-announces-71-million-for-research-on-qis-enabled-discoveries-in-high-energy-physics/",
    "/workforce/federal-workforce-activities-in-qis/",
    "/the-national-quantum-initiative-supplement-to-the-presidents-fy-2025-budget-released/",
    "/strategy-documents/",
    "/doe-office-of-science-releases-fy25-open-solicitation-featuring-qis-funding-opportunities/",
    "/department-of-energy-announces-funding-for-quantum-computing-for-novel-chemistry-and-materials-science-simulations/",
    "/nih-announces-qu-bit-program/",
    "/doe-announces-65m-for-accelerated-research-in-quantum-computing/",
    "/doe-announces-funding-for-quantum-focused-energy-frontier-research-centers/",
    "/darpa-to-host-proposers-day-for-robust-quantum-sensors-program/",
    "/nqiac-report-on-quantum-networking/",
    "/lps-lqc-2024-quantum-computing-short-course/",
    "/doe-national-qis-research-centers-to-host-2025-career-fair/",
    "/final-pilot-projects-announced-for-nsf-national-quantum-virtual-laboratory/",
    "/nsf-opportunities-for-international-collaboration-in-qis/",
    "/action/",
    "/nsf-awards-39m-to-expand-access-to-quantum-research-training-and-education/",
    "/quantum-in-the-chips-and-science-act-of-2022/",
    "/nih-webinars-on-quantum-technology-prize-challenges/",
    "/nsa-releases-future-quantum-resistant-algorithm-requirements-for-national-security-systems/",
    "/why-quantum-matters-to-you/",
    "/darpa-to-host-meeting-with-quantum-computing-companies/"
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
    "sitemap": "https://www.quantum.gov/sitemap.xml",
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