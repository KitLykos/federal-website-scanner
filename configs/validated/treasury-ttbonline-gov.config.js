module.exports = {
  "site": "https://ttbonline.gov",
  "urls": [
    "/authenticationendpoint/login.do?client_id=Z0f_7KKasqjg8mZI2evQhc_K2bAa&commonAuthCallerPath=https%3A%2F%2Fttbonline.gov%2Foauth2%2Fauthorize&forceAuth=false&nonce=aNTe0gNSbDG6czkTlAtEsv1Y6aTV6MiYooafXwJ1TpE&passiveAuth=false&redirect_uri=https%3A%2F%2Fttbonline.gov%2Fcolasonline%2Flogin%2Foauth2%2Fcode%2Fidam&response_type=code&scope=openid&state=8Xig_LcXbCHa2h4Ya30hMHDtUX940uA9pE79Z0bYGNw%3D&tenantDomain=carbon.super&sessionDataKey=0635f766-72ff-455a-8116-f5ff8e3273d4&relyingParty=Z0f_7KKasqjg8mZI2evQhc_K2bAa&type=oidc&sp=colas&isSaaSApp=false&authenticators=BasicAuthenticator%3ALOCAL",
    "/authenticationendpoint/login.do?client_id=Z0f_7KKasqjg8mZI2evQhc_K2bAa&commonAuthCallerPath=https%3A%2F%2Fttbonline.gov%2Foauth2%2Fauthorize&forceAuth=false&nonce=BMhoP9fUgXU2a3Nkn5aE77bvNCSzDtuE7imma7xpRh0&passiveAuth=false&redirect_uri=https%3A%2F%2Fttbonline.gov%2Fcolasonline%2Flogin%2Foauth2%2Fcode%2Fidam&response_type=code&scope=openid&state=ggvhwn-_mhmzuhAFp8Tekl2ehqL5EvceKoDDKMfNeH8%3D&tenantDomain=carbon.super&sessionDataKey=1456cdbe-4e32-40a3-b674-6e578d18fe3f&relyingParty=Z0f_7KKasqjg8mZI2evQhc_K2bAa&type=oidc&sp=colas&isSaaSApp=false&authenticators=BasicAuthenticator%3ALOCAL",
    "/authenticationendpoint/login.do"
  ],
  "scanner": {
    "crawler": false,
    "sitemap": false,
    "robotsTxt": false
  },
  "puppeteerOptions": {
    "args": [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--headless=new"
    ],
    "defaultViewport": {
      "width": 1366,
      "height": 768
    }
  }
}