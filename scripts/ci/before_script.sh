# scripts/ci/before_script.sh
#!/usr/bin/env bash
set -euo pipefail

# safe‐dir for nested clones, symlink validated configs
git config --global --add safe.directory "$CI_PROJECT_DIR"
git config --global --add safe.directory "/a11y/site-evaluation-tools"

mkdir -p output/configs
if [ -d configs/validated ] && [ ! -L output/configs/validated ]; then
  ln -sf "$(pwd)/configs/validated" output/configs/validated
  echo "✅ Linked configs/validated → output/configs/validated"
fi

echo "📂 File locations:"
ls -la configs/validated/  || echo "❌ No configs/validated"
ls -la output/configs/    || echo "❌ No output/configs"

echo "DEBUG: PWD=$(pwd)"
echo "DEBUG: CI_PROJECT_DIR=${CI_PROJECT_DIR:-}"
echo "DEBUG: SITE_FILE='${SITE_FILE:-}'"
