module.exports = {
  "site": "https://ncbi.nlm.nih.gov",
  "urls": [
    "/",
    "/tools/primer-blast/primertool.cgi",
    "/datasets/genome/",
    "/mesh/",
    "/myncbi/",
    "/nuccore/",
    "/geo/",
    "/books/nbk547852/",
    "/myncbi/collections/mybibliography/",
    "/pmc/",
    "/tools/primer-blast/",
    "/clinvar/",
    "/geo/geo2r/",
    "/gene/",
    "/genbank/",
    "/nucleotide/",
    "/books/nbk501922/",
    "/protein/",
    "/snp/",
    "/labs/sciencv/",
    "/mesh/advanced"
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