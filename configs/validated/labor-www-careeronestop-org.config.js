module.exports = {
  "site": "https://www.careeronestop.org",
  "urls": [
    "/toolkit/jobs/find-jobs-results.aspx",
    "/toolkit/careers/interest-assessment-questions.aspx",
    "/toolkit/training/find-scholarships.aspx",
    "/",
    "/toolkit/jobs/find-jobs-details.aspx",
    "/toolkit/training/find-scholarships-detail.aspx",
    "/toolkit/careers/interest-assessment.aspx",
    "/toolkit/skills/skills-matcher-questions.aspx",
    "/explorecareers/explore-careers.aspx",
    "/toolkit/wages/highest-paying-careers.aspx",
    "/jobsearch/job-search.aspx",
    "/videos/careervideos/career-videos.aspx",
    "/site-search.aspx",
    "/explorecareers/learn/career-clusters.aspx",
    "/toolkit/careers/interest-assessment-riasec-scores.aspx",
    "/toolkit/skills/skills-matcher-questions.aspx",
    "/getmyfuture/toolkit/interest-assessment-questions.aspx",
    "/toolkit/training/find-certifications.aspx",
    "/toolkit/skills/skills-matcher.aspx",
    "/explorecareers/assessments/what-is-assessment.aspx",
    "/localhelp/unemploymentbenefits/find-unemployment-benefits.aspx",
    "/explorecareers/assessments/interests.aspx",
    "/toolkit/careers/occupations/occupation-profile.aspx",
    "/toolkit/careers/work-values-matcher-results.aspx",
    "/localhelp/americanjobcenters/find-american-job-centers.aspx",
    "/toolkit/training/find-local-training-results.aspx",
    "/toolkit/careers/work-values-matcher-assessment.aspx",
    "/findtraining/find-training.aspx",
    "/toolkit/wages/find-salary.aspx",
    "/toolkit/toolkit.aspx",
    "/toolkit/careers/work-values-matcher.aspx",
    "/localhelp/unemploymentbenefits/unemployment-benefits.aspx",
    "/localhelp/americanjobcenters/find-american-job-centers.aspx",
    "/toolkit/jobs/find-businesses-results.aspx",
    "/toolkit/training/find-local-training-detail.aspx",
    "/explorecareers/assessments/skills.aspx"
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
    "sitemap": "https://www.careeronestop.org/sitemap.xml",
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