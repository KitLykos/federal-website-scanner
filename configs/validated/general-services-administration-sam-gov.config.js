module.exports = {
  "site": "https://sam.gov",
  "urls": [
    "/search/",
    "/",
    "/workspace/profile/workspace",
    "/workspace",
    "/workspace/em/entities/non-federal",
    "/search/results",
    "/workspace/em/get-uei",
    "/search/saved",
    "/content/status-tracker",
    "/workspace/em/entities/non-federal/update",
    "/workspace/assistance/subaward/create",
    "/workspace/em/getstarted",
    "/reports/awards/standard",
    "/workspace/profile/feeds",
    "/workspace/profile/account-details",
    "/role-management/user-directory",
    "/search",
    "/profile/access",
    "/workspace/profile/feeds/notification",
    "/opp/workspace",
    "/exclusions-new",
    "/profile/request-role",
    "/auth-terms-disclosure",
    "/workspace/profile/sign-terms-of-use",
    "/data-services",
    "/workspace/profile/",
    "/workspace/em/entities/entity-ticket-review",
    "/login-gov/profile-registration",
    "/workspace/profile/following"
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
    "sitemap": "https://sam.gov/sitemap.xml",
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