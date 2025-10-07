module.exports = {
  "site": "https://www.ncd.gov",
  "urls": [
    "/reports/2022/",
    "/reports/2023/",
    "/2016/06/10/honoring-the-life-and-legacy-of-greg-smith/",
    "/council-members/kimberly-hill-ridley/",
    "/letters/2023-12-19-ncd-letter-to-census-on-proposed-change-to-disability-questions-in-american-community-survey/",
    "/letters/2025-06-12-ncd-letter-to-house-ways-and-means-committee-on-opos-rfi/",
    "/testimonies/2025-05-21-statement-for-the-record-house-subcommittee-on-early-childhood-elementary-and-secondary-education/",
    "/report/supreme-court-decisions-interpreting-the-americans-with-disabilities-act/",
    "/accountability/vulnerability-disclosure-policy/",
    "/accessibility/",
    "/report/alternatives-to-qaly-based-cost-effectiveness-analysis-for-determining-the-value-of-prescription-drugs-and-other-health-interventions/",
    "/reports/2019/",
    "/policy-areas/financial-assistance-and-incentives/",
    "/2018/03/28/ncd-report-examines-civil-death-of-the-rights-of-people-with-disabilities-and-the-elderly-under-guardianships-calls-on-department-of-justice-to-ensure-full-and-fair-due-process-rights/",
    "/2019/08/14/at-ncds-recommendation-all-u-s-dental-schools-will-train-students-to-manage-treatment-of-people-with-intellectual-developmental-disabilities/",
    "/policy-areas/international/",
    "/report/medical-futility-and-disability-bias/",
    "/letters/2023-07-24-ncd-comments-on-hud-s-section-504-advanced-notice-of-proposed-rulemaking/",
    "/letters/2025-06-17-ncd-letter-to-dot-secretary-on-enforcement-discretion-of-wheelchair-rule/",
    "/2024/04/26/ncd-supports-new-doj-web-mobile-accessibility-rule/",
    "/2024/11/22/national-council-on-disability-welcomes-councilmember-hill-ridley/",
    "/council-members/risa-jaz-rifkind/",
    "/report/transition-and-post-school-outcomes-for-youth-with-disabilities-closing-the-gaps-to-post-secondary-ed-and-employment/",
    "/report/turning-rights-into-reality-how-guardianship-and-alternatives-impact-the-autonomy-of-people-with-intellectual-and-developmental-disabilities-1/",
    "/2015/02/04/joint-doj-and-hhs-letter-to-massachusetts-department-of-children-and-families-dcf-about-discrimination-against-a-disabled-parent/",
    "/letters/2024-11-19-ncd-letter-to-dhs-hhs-on-institutionalization/",
    "/meeting/2024-11-07-nov-7-2024-council-meeting/"
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
    "sitemap": "https://www.ncd.gov/sitemap.xml",
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