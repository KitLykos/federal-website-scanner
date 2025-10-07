module.exports = {
  "site": "https://www.neh.gov",
  "urls": [
    "/grants/manage/organizations",
    "/humanities/2015/januaryfebruary/curio/new-biography-cesar-chavez-unearths-gritty-truth",
    "/divisions/lifelong-learning",
    "/award/amy-tan",
    "/grants/education/landmarks/highered",
    "/humanities/2015/mayjune/feature/in-the-1930s-radio-station-wlw-in-ohio-was-americas-one-and-only-sup",
    "/humanities/2012/julyaugust/feature/friends-rousseau",
    "/news/neh-announces-funding-opportunity-museums-and-historic-sites-history-american-excellence",
    "/humanities/2017/spring/statement/hollywood-chose-tell-half-the-story-the-daring-1952-coast-guard-rescue-sea-while-2009-book",
    "/article/confessions-gouverneur-morris",
    "/article/korea-and-thirty-eighth-parallel",
    "/article/invisible-man-seventy",
    "/article/picturing-war-no-one-cares-about",
    "/article/charlotte-perkins-gilman-did-more-write-one-classic-short-story",
    "/grants/preservation/documenting-endangered-languages",
    "/news/old-english-new-influences",
    "/explore/the-history-cartography",
    "/humanities/2011/januaryfebruary/statement/very-hungry-reader",
    "/humanities/2018/spring/statement/death-defying-merry-go-rounds-and-knee-scraping-climbing-bars-are-playground-memories-many",
    "/humanities/2011/januaryfebruary/feature/newton-the-last-magician",
    "/humanities/2017/fall/feature/studying-the-vietnam-war",
    "/initiatives/created-equal",
    "/humanities/2012/julyaugust/feature/nietzsche-dead",
    "/award/tara-westover",
    "/humanities/2009/septemberoctober/conversation/the-public-historian",
    "/humanities/2011/julyaugust/feature/how-did-robert-e-lee-become-american-icon",
    "/grants/manage/federal-matching-funds-guidelines",
    "/news/neh-announces-grant-opportunity-create-statues-iconic-americans-national-garden-american",
    "/humanities/2013/mayjune/feature/burr-versus-jefferson-versus-marshall",
    "/humanities/2012/novemberdecember/feature/children-the-dust",
    "/article/american-circus-all-its-glory",
    "/humanities/2008/januaryfebruary/feature/king-andrew-and-the-bank"
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
    "sitemap": "https://www.neh.gov/sitemap.xml",
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