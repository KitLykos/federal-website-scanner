# scripts/schedule/nsf.sh
#!/usr/bin/env bash
set -euo pipefail

echo "📆 [nsf] static scan"

git config --global --add safe.directory "$CI_PROJECT_DIR"
git config --global --add safe.directory "/a11y/site-evaluation-tools"

echo "🔧 Installing NPM packages…"
npm install @unlighthouse/cli googleapis csv json2csv axios xml2js node-jq

mkdir -p output/configs/validated

echo "📄 Checking for existing config…"
if [ -e unlighthouse/config/unlighthouse.config-nsf.js ]; then
  echo "✅ Config exists"
else
  echo "❌ Config missing" >&2
fi

export SITE_FILE="unlighthouse/config/unlighthouse.config-nsf.js"
node validate_urls.js

echo "📄 Validated contents:"
cat output/configs/validated/unlighthouse.config-nsf.config.js \
  || echo "❌ Validated config not found"

cp output/configs/validated/unlighthouse.config-nsf.config.js \
   output/configs/unlighthouse.config-nsf.config.js \
  || echo "⚠️ Could not copy validated config"

export SITE_FILE="output/configs/validated/unlighthouse.config-nsf.config.js"
