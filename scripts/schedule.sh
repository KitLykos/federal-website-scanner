# scripts/schedule.sh
#!/usr/bin/env bash
set -euo pipefail

echo "📆 Schedule stage: static scans for sec,cms,nsf"
npm install @unlighthouse/cli googleapis csv json2csv axios xml2js node-jq

for AGENCY in sec cms nsf; do
  case "$AGENCY" in
    sec) SITE_NAME="https://www.sec.gov";  SRC="unlighthouse/config/unlighthouse.config-sec.js";;
    cms) SITE_NAME="https://cms.gov";      SRC="unlighthouse/config/unlighthouse.config-cms.js";;
    nsf) SITE_NAME="https://www.nsf.gov";  SRC="unlighthouse/config/unlighthouse.config-nsf.js";;
  esac

  echo
  echo "🔧 [$AGENCY] validating $SRC"
  SITE_FILE="$SRC" node validate_urls.js

  VALID="output/configs/validated/$(basename "${SRC%.js}").config.js"
  echo "🔧 [$AGENCY] scanning $SITE_NAME"
  ./node_modules/.bin/unlighthouse-ci \
    --quiet \
    --reporter csvExpanded \
    --site "$SITE_NAME" \
    --config-file "$VALID" \
    --puppeteer-args="--headless=new"
  echo "✅ [$AGENCY] done"
done
