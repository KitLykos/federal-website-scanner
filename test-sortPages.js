// test-sortPages.js --------------------------------------------------------
"use strict";

const assert = require("assert/strict");
const { sortPages } = require("./sortPages");   // adjust the path if needed

/* ---------- synthetic data covering all 3 buckets ----------------------- */
const sample = [
  /* bucket‑1 candidates (home‑pages) */
  { domain: "site.org",    pagePath: "/", pageviews: "200" },
  { domain: "example.com", pagePath: "/", pageviews: "100" },
  { domain: "example.com", pagePath: "/", pageviews: "90" }, // dup, lower views

  /* bucket‑2 candidates (one‑segment paths) */
  { domain: "site.org",    pagePath: "/products/", pageviews: "150" },
  { domain: "example.com", pagePath: "/about",     pageviews: "80"  },

  /* bucket‑3 candidates (deep paths with siblings) */
  { domain: "example.com", pagePath: "/blog/post1",        pageviews: "50"  },
  { domain: "example.com", pagePath: "/blog/post2",        pageviews: "120" }, // winner
  { domain: "example.com", pagePath: "/blog/post3",        pageviews: "40"  },
  { domain: "site.org",    pagePath: "/docs/v1",           pageviews: "30"  },
  { domain: "site.org",    pagePath: "/docs/v2",           pageviews: "60"  }, // winner
  { domain: "site.org",    pagePath: "/products/gadget",   pageviews: "80"  }, // winner
  { domain: "site.org",    pagePath: "/products/widget",   pageviews: "70"  }
];

/* ---------- expected order ---------------------------------------------- */
const expected = [
  "site.org/",                      // bucket‑1 (highest‑view home‑page)
  "example.com/",                   // bucket‑1
  "site.org/products/",             // bucket‑2  (one‑segment, 150 views)
  "example.com/about",              // bucket‑2
  "example.com/blog/post2",         // bucket‑3 (winner /blog/, 120 views)
  "site.org/products/gadget",       // bucket‑3 (winner /products/, 80 views)
  "site.org/docs/v2"                // bucket‑3 (winner /docs/, 60 views)
];

/* ---------- run ---------------------------------------------------------- */
const actual = sortPages(sample).map(r => `${r.domain}${r.pagePath}`);

assert.deepStrictEqual(
  actual,
  expected,
  `\nExpected:\n${expected.join("\n")}\n\nGot:\n${actual.join("\n")}`
);

console.log("✓ All tests passed.");
