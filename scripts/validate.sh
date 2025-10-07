# scripts/validate.sh
#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Validate-URLs stage"
npm install
node validate_urls.js
echo "✅ → output/checked-in/validated-urls.json"
