#!/usr/bin/env bash
set -euo pipefail

# load your .env
if [ -f .env ]; then
  source .env
else
  echo "❌ .env not found—please create it in the project root" >&2
  exit 1
fi

echo
echo "🚀 YOLO: Running full pipeline locally"
echo "--------------------------------------"

echo
echo "1️⃣  CI stage"
bash scripts/ci/before_script.sh
bash scripts/ci/run.sh

echo
echo "2️⃣  Validate-URLs stage"
bash scripts/validate.sh

echo
echo "3️⃣  Generate-domain-scan-jobs stage"
bash scripts/generate.sh

echo
echo "4️⃣  Schedule stage (static scans for sec, cms, nsf)"
bash scripts/schedule.sh

echo
echo "✅ All done!"
