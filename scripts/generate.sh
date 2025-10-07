# scripts/generate.sh
#!/usr/bin/env bash
set -euo pipefail

echo "✍️  Generate-domain-scan-jobs stage"
npm install
node count_jobs.js
node dynamic_job_gen.js
echo "✅ Generated jobs in output/generated-jobs/"
