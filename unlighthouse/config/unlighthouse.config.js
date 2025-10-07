const userAgent = process.env.USER_AGENT || "Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)";

export default {
  site: 'https://example.org',
  urls: [
    "/",
    "/about",
    "/foia",
    "/inspector",
    "/privacy",
    "/search",
    "/sitemap",
    "/accessibility",
    "/contact",
    "/fear",
    "/espanol",
    "/es",
    "/sitemap",
    "/sitemap.xml",
    "/blog",
    "/*"
  ],
  scanner: {
    device: 'desktop',
    throttle: false,
    maxRoutes: 10,
    skipJavascript: false,
    crawler: false,
    sitemap: false,
    robotsTxt: false
  },
  chrome: {
    useSystem: true
  },
  puppeteerOptions: {
    args: ["--no-sandbox", "--headless=new"],
    concurrency: 1
  },
  debug: false
};
