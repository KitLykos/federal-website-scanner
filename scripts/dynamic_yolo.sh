# scripts/dynamic_yolo.sh
#!/usr/bin/env bash
set -euo pipefail

# ─── repo root & env ────────────────────────────────────────────────
SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPTDIR/.."
source .env

# ─── 1) Validate URLs ───────────────────────────────────────────────
#echo
#echo "1️⃣  Validate URLs…"
#npm install            # bring in validate_urls.js deps
#node validate_urls.js  # writes output/checked-in/validated-urls.json

# ─── 2) Generate dynamic‐job YAML (just for record) ────────────────
echo
echo "2️⃣  Generate dynamic‐job definitions…"
npm install            # bring in dynamic_job_gen.js deps
node count_jobs.js
node dynamic_job_gen.js
echo "   → YAML in output/generated-jobs/"

# ─── 3) Install scanner & puppeteer ────────────────────────────────
echo
echo "🔧 Installing Unlighthouse & Puppeteer…"
npm install @unlighthouse/cli puppeteer

export PUPPETEER_CACHE_DIR="$HOME/.cache/puppeteer"

# ─── 4) Run every dynamic job in turn ─────────────────────────────────
echo
echo "3️⃣  Running scans for each URL…"

# we assume validated-urls.json is an array of { key, url }
for entry in $(jq -c '.[]' output/checked-in/validated-urls.json); do
  key=$(echo "$entry" | jq -r '.key')
  url=$(echo "$entry" | jq -r '.url')
  cfg="configs/validated/${key}.config.js"

  echo
  echo "▶️  Job: $key"
  echo "   • URL = $url"
  echo "   • Config = $cfg"

  # pick the last‐installed Chrome
  CHROME_PATH=$(npx puppeteer browsers list \
    | grep '^chrome@' \
    | tail -n1 \
    | awk '{print $2}')
  export CHROME_PATH
  export USER_AGENT="Mozilla/5.0 (compatible; FederalWebsiteScanner/1.0)"

  # run the scan
  npx @unlighthouse/cli ci \
    --quiet \
    --reporter csvExpanded \
    --site "$url" \
    --config-file "$cfg" \
    --puppeteer-args="--headless=new" \
    > "scan-${key}.log" 2>&1

  rc=$?
  echo "   ⚙️  Exit code: $rc"
  if [ $rc -ne 0 ]; then
    echo "   ❌ scan failed; last 20 lines:"
    tail -n20 "scan-${key}.log"
  else
    echo "   ✅ scan-${key}.log"
  fi
done

echo
echo "✅  All dynamic jobs complete!"

# ─── 5) Commit the generated configs ─────────────────────────────────
echo
echo "4️⃣  Committing generated configs to repository..."

# Configure Git
git config --global user.email "local-scanner@example.com"
git config --global user.name "Local Scanner"

# Add the generated files, forcing past gitignore with -f
echo "📦 Adding generated files to Git..."
git add output/generated-jobs/generated.yml
git add output/generated-jobs/*.yml
git add -f configs/validated/*.config.js

# Commit the changes
if git diff --cached --quiet; then
  echo "🟢 No changes to commit."
else
  git commit -m "🔁 Local commit of generated config files [ci skip]"
  echo "✅ Changes committed locally. Use 'git push' to send to remote repository."
fi
