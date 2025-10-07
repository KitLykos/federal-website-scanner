/**
 * Sort Denali Commission GA4 “Top pages” data
 * -------------------------------------------------
 * 1.  Home‑pages for every distinct domain
 * 2.  Top–level landing pages (one‑segment paths)
 * 3.  Highest‑traffic distinct child for every parent path
 *
 *  Each bucket is internally sorted by page‑views (desc),
 *  then by path (asc) to give deterministic output.
 */

/* ---------- utilities ---------------------------------------------------- */

const stripSlashes = p => p.replace(/^\/+|\/+$/g, '');        // "/a/b/" → "a/b"
const splitSegments = p => (stripSlashes(p) ? stripSlashes(p).split('/') : []);

const byViewsDescThenPathAsc = (a, b) =>
  b.pageviews - a.pageviews || a.pagePath.localeCompare(b.pagePath);

/* ---------- core --------------------------------------------------------- */

function sortPages(data) {
  /** Normalise page‑views → number --------------------------------------- */
  data.forEach(r => (r.pageviews = Number(r.pageviews) || 0));

  /** ---------- Bucket 1 – home‑pages ------------------------------------ */
  const homepagesMap = new Map();                // domain → row
  data.forEach(r => {
    if (splitSegments(r.pagePath).length === 0) {
      const prev = homepagesMap.get(r.domain);
      if (!prev || r.pageviews > prev.pageviews) homepagesMap.set(r.domain, r);
    }
  });
  const bucket1 = [...homepagesMap.values()].sort(byViewsDescThenPathAsc);

  /** ---------- Bucket 2 – top‑level landing pages ----------------------- */
  const bucket2 = data
    .filter(r => splitSegments(r.pagePath).length === 1)      // one segment
    .sort(byViewsDescThenPathAsc);

  /** ---------- Bucket 3 – best child per parent path -------------------- */
  // Build   key = domain + '|' + parentPath   →   best‑child‑row
  const winners = new Map();
  data.forEach(r => {
    const segs = splitSegments(r.pagePath);
    if (segs.length <= 1) return;               // skip bucket‑1 & bucket‑2
    const parent = `/${segs.slice(0, -1).join('/')}/`;        // always trailing /
    const key = `${r.domain}|${parent}`;
    const prev = winners.get(key);
    if (!prev || r.pageviews > prev.pageviews) winners.set(key, r);
  });
  const bucket3 = [...winners.values()].sort(byViewsDescThenPathAsc);

  /** ---------- finished -------------------------------------------------- */
  return [...bucket1, ...bucket2, ...bucket3];
}

/* ---------------------- example ------------------------------------------
const sorted = sortPages(sample.data);
console.log(sorted.map(r => `${r.domain}${r.pagePath}  –  ${r.pageviews}`));
--------------------------------------------------------------------------- */

module.exports = { sortPages };
