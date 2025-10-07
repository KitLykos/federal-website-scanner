module.exports = {
  "site": "https://secure.ssa.gov",
  "urls": [
    "/mga/sps/authsvc?TransactionId=5985dce9-f6bd-4066-b4b9-a70c04cd2c9b",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fschedule-appointment&LVL=1",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fselect-appointment&LVL=1",
    "/mga/sps/authsvc?TransactionId=efcee24d-52b6-44c2-93c7-feee60e1044a",
    "/mga/sps/authsvc?TransactionId=9688402f-2f5a-4a8f-a453-f7d4519529e2",
    "/mga/sps/authsvc?TransactionId=2b7fa25f-322e-4a83-85b4-d7b378755df9",
    "/mga/sps/authsvc?TransactionId=2e7843b6-43b7-4180-96a5-001024c864e8",
    "/mga/sps/authsvc?TransactionId=7dfaf0eb-f5df-441b-b291-094242904a55",
    "/mga/sps/authsvc?TransactionId=6fcedd36-6e09-4ead-971f-7a3c90182b1c",
    "/mga/sps/authsvc?TransactionId=fd10f4e1-425a-460c-aed3-17ed8f3e5b00",
    "/mga/sps/authsvc?TransactionId=56f596e3-786d-4204-a681-c5c6365dceff",
    "/mga/sps/authsvc?TransactionId=b3cdb6b1-ffe2-4fcd-abfe-b9f1af33dc33",
    "/mga/sps/authsvc?TransactionId=3bc00982-4775-4c7b-bc21-79a9a80850ff",
    "/mga/sps/authsvc?TransactionId=d3acd855-2c44-42fe-89b4-3ef743f81ea3",
    "/mga/sps/authsvc?TransactionId=9e96c8d7-d3d8-49b2-9fe5-d20273626762",
    "/mga/sps/authsvc?TransactionId=544ae95c-d523-4f41-ae88-985c454409ec",
    "/mga/sps/authsvc?TransactionId=d0920c14-69d4-436c-b5af-35d6bc5af965",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fterms-of-service&LVL=1",
    "/mga/sps/authsvc?TransactionId=536770d2-9ec2-4113-b751-989c3ecc366d",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fprivacy-act-statement&LVL=1",
    "/mga/sps/authsvc?TransactionId=9c13e846-68e7-43c4-b760-b3c9090e5ea4",
    "/mga/sps/authsvc?TransactionId=3aca049a-02f1-45b1-baca-0f04d1fcd79e",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Freview&LVL=1",
    "/mga/sps/authsvc?TransactionId=48401756-854f-4f71-a86d-0d65da0930df",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Freason-for-appointment&LVL=1",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui&LVL=1",
    "/mga/sps/authsvc?TransactionId=c38a62aa-0140-4b2a-be80-8f1abf707c90",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fconsent-to-messaging&LVL=1",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fappointment-confirmation&LVL=1",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Flanguage-preference&LVL=1",
    "/mga/sps/authsvc?TransactionId=f8105d9f-ce2b-4a23-b1bf-a58bf4cf3949",
    "/mga/sps/authsvc?TransactionId=f118af2e-c1ad-440c-99ba-b2bed67d5b3c",
    "/mga/sps/authsvc?TransactionId=790cc276-77be-41e4-afe8-05c0637b9d95",
    "/mga/sps/authsvc?TransactionId=7a38512e-c640-464f-b5df-642410dfdaa7",
    "/RIL/default.jsp?URL=%2Frim%2Fasview.action",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fpersonal-information&LVL=1",
    "/RIL/default.jsp?URL=%2Fess%2Fcustomer-ui%2Fnavigation-error&LVL=1"
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
    "sitemap": "https://secure.ssa.gov/sitemap.xml",
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