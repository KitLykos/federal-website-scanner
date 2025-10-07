module.exports = {
  "site": "https://www.sba.gov",
  "urls": [
    "/business-guide/grow-your-business",
    "/document/support-sba-7a-loan-guaranty-fee-calculator",
    "/district/houston",
    "/document/support-assumption-requirement-letter",
    "/funding-programs/loans/covid-19-relief-options/paycheck-protection-program/second-draw-ppp-loan",
    "/business-guide/manage-your-business/strengthen-your-cybersecurity",
    "/funding-programs/disaster-assistance/mitigation-assistance",
    "/federal-contracting/contracting-assistance-programs/8a-business-development-program/updates-8a-business-development-program",
    "/business-guide/manage-your-business/stay-legally-compliant",
    "/about-sba/open-government/foia",
    "/partners/sbics/forms-guides",
    "/about-sba/sba-locations/headquarters-offices",
    "/blog/10-ways-get-new-customers",
    "/funding-programs/disaster-assistance/hurricane-helene",
    "/funding-programs/disaster-assistance/california-wildfires",
    "/district/north-carolina",
    "/business-guide/manage-your-business/pay-taxes",
    "/district/north-florida",
    "/document/support-directory-federal-government-prime-contractors-subcontracting-plans",
    "/about-sba/oversight-advocacy/office-national-ombudsman",
    "/document/support-release-collateral-requirement-letter-0",
    "/document/sba-form-3508s-ppp-3508s-loan-forgiveness-application-instructions",
    "/about-sba/open-government/about-sbagov-website",
    "/national-small-business-week/awards/small-business-person-year",
    "/es/guia-de-negocios/lance-su-empresa/solicite-licencias-y-permisos",
    "/about-sba/sba-locations/headquarters-offices/office-womens-business-ownership",
    "/federal-contracting/counseling-help/procurement-center-representative-directory",
    "/partners/lenders/training-demand",
    "/sba-learning-platform/empower-grow",
    "/document/sba-form-3513-declaration-identity-theft",
    "/funding-programs/loans/covid-19-relief-options/restaurant-revitalization-fund",
    "/about-sba/sba-locations/loan-guaranty-centers",
    "/es/programas-de-financiamiento/prestamos/lender-match-le-conecta-prestamistas",
    "/es/guia-de-negocios/lance-su-empresa/registre-su-empresa",
    "/person/kelly-loeffler",
    "/document/support-national-resource-guide-english"
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
    "sitemap": "https://www.sba.gov/sitemap.xml",
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