#!/bin/bash
set -euo pipefail

# Set job variables
export JOB_NAME="scan-agriculture-fns-usda-gov"
export SITE_NAME="https://fns.usda.gov" 
export SITE_FILE="configs/validated/agriculture-fns-usda-gov.config.js"
export NODE_OPTIONS="--max-old-space-size=2048"
export UNLIGHTHOUSE_WORKERS=1

echo "Testing job: $JOB_NAME"
echo "Site: $SITE_NAME"
echo "Config: $SITE_FILE"

# Run the scan
npx @unlighthouse/cli ci \
  --quiet \
  --reporter csvExpanded \
  --site "$SITE_NAME" \
  --config-file "$SITE_FILE" \
  --puppeteer-args="--headless=new --no-sandbox --disable-dev-shm-usage --disable-gpu"
