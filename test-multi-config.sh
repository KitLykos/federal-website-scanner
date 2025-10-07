#!/bin/bash
set -euo pipefail

echo "🧪 Testing multi-config detection logic"

# Simulate the CI environment variables
export SITE_FILE="unlighthouse/config/unlighthouse.config-education.js"

# Extract the base config name (e.g., "unlighthouse.config-education" from "unlighthouse.config-education.js")
BASE_CONFIG_NAME=$(basename "$SITE_FILE" .js)

echo "📄 Base config name: $BASE_CONFIG_NAME"

# Look for multiple domain configs (e.g., unlighthouse.config-education-*.config.js)
DOMAIN_CONFIGS=$(ls output/configs/validated/${BASE_CONFIG_NAME}-*.config.js 2>/dev/null || true)

if [ -n "$DOMAIN_CONFIGS" ]; then
  echo "🌐 Found multiple domain configs for cross-domain scanning:"
  echo "$DOMAIN_CONFIGS"
  
  echo ""
  echo "📄 Would scan each config with these commands:"
  for config_file in $DOMAIN_CONFIGS; do
    echo "--- Config: $config_file ---"
    DOMAIN_SITE=$(grep -o '"site": "[^"]*"' "$config_file" | sed 's/"site": "\([^"]*\)"/\1/')
    echo "🌐 Site: $DOMAIN_SITE"
    echo "🔍 Command: unlighthouse-ci --site '$DOMAIN_SITE' --config-file '$config_file'"
    echo ""
  done
else
  echo "📄 No multiple domain configs found, would use single config: $SITE_FILE"
fi
