#!/usr/bin/env bash
set -euo pipefail

# if not set in your .env, default to something sane
: "${GOOGLE_SHEETS_API_CREDENTIALS_FILE:=/tmp/google_sheets_api_credentials.json}"

echo "🔧 Installing npm packages…"
npm install
npm install @unlighthouse/cli googleapis csv json2csv axios xml2js node-jq

echo
echo "🎬 Puppeteer version:"
npx puppeteer --version

export PUPPETEER_CACHE_DIR="$HOME/.cache/puppeteer"

# pick the last-installed chrome path
CHROME_PATH=$(npx puppeteer browsers list \
  | grep '^chrome@' \
  | tail -n1 \
  | awk '{print $2}')
export CHROME_PATH

export USER_AGENT="Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0; +https://github.com/your-org/federal-website-scanner)"

echo
echo "🔍 Scanning $SITE_NAME …"
set +e
npx unlighthouse-ci \
  --quiet \
  --reporter csvExpanded \
  --site "$SITE_NAME" \
  --config-file "$SITE_FILE" \
  --puppeteer-args="--headless=new" \
  > scan.log 2>&1
SCAN_EXIT=$?
set -e

echo
echo "⚙️  Scan exit code: $SCAN_EXIT"
if [ "$SCAN_EXIT" -ne 0 ]; then
  echo "❌ Scan failed (exit $SCAN_EXIT)"
  tail -n50 scan.log || true
fi

echo
echo "📤 Uploading to Google Sheets"
echo "$GOOGLE_SHEETS_API_CREDENTIALS_JSON" > "$GOOGLE_SHEETS_API_CREDENTIALS_FILE"
export GOOGLE_APPLICATION_CREDENTIALS="$GOOGLE_SERVICE_ACCOUNT"
node ./unlighthouse-scandata-upload.js
