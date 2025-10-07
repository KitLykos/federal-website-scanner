module.exports = {
  "site": "https://login.gov",
  "urls": [
    "/",
    "/help/",
    "/help/create-account/authentication-methods/",
    "/contact/",
    "/help/get-started/authentication-methods/",
    "/policy/rules-of-use/",
    "/help/verify-your-identity/overview/",
    "/create-an-account/",
    "/what-is-login/",
    "/help/trouble-signing-in/overview/",
    "/help/specific-agencies/ssa/",
    "/help/verify-your-identity/phone-number/",
    "/help/manage-your-account/overview/",
    "/policy/",
    "/help/verify-your-identity/how-to-take-photos-to-verify-your-identity/",
    "/help/trouble-signing-in/forgot-your-password/",
    "/help/trouble-signing-in/authentication/face-and-touch-unlock/",
    "/help/trouble-signing-in/face-or-touch-unlock/",
    "/help/verify-your-identity/how-to-verify-your-identity/",
    "/help/verify-your-identity/verify-your-identity-in-person/",
    "/help/verify-your-identity/accepted-identification-documents/",
    "/help/get-started/overview/",
    "/help/manage-your-account/add-or-change-your-authentication-method/",
    "/help/manage-your-account/delete-your-account/",
    "/help/create-account/authentication-methods/text-sms-or-phone-call/",
    "/help/verify-your-identity/issues-verifying-my-personal-information/",
    "/help/specific-agencies/trusted-traveler-programs/",
    "/help/trouble-signing-in/how-to-sign-in/",
    "/help/create-account/overview/",
    "/accessibility/",
    "/help/create-account/authentication-methods/authentication-application/",
    "/contact/contact-submitted/",
    "/help/verify-your-identity/verify-your-address-by-mail/",
    "/help/trouble-signing-in/issues-with-authentication-methods/",
    "/help/create-account/authentication-methods/face-or-touch-unlock/"
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
    "sitemap": "https://login.gov/sitemap.xml",
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