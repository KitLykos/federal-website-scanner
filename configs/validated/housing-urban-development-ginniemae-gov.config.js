module.exports = {
  "site": "https://ginniemae.gov",
  "urls": [
    "/pages/profile.aspx",
    "/data_and_reports/disclosure_data/pages/datadownload_bulk.aspx",
    "/pages/default.aspx",
    "/investors/disclosures_and_reports/pages/bulletinsdisppage.aspx",
    "/issuers/program_guidelines/pages/mbsguideapmslibdisppage.aspx",
    "/data_and_reports/additional_data_and_reporting/pages/multiclass_remic_download.aspx"
  ],
  "scanner": {
    "crawler": false,
    "sitemap": false,
    "robotsTxt": false
  },
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-dev-shm-usage"
    ]
  }
}