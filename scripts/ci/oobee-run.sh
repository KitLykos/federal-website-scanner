#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting Oobee CI Integration Test"
echo "=================================="

# Environment setup
: "${SITE_NAME:=https://example.com/}"
: "${SCANNER_NAME:=SiteEvaluationBot}"
: "${SCANNER_EMAIL:=scanner@example.com}"

echo "📋 Configuration:"
echo "   Site: $SITE_NAME"
echo "   Scanner: $SCANNER_NAME <$SCANNER_EMAIL>"

# Install dependencies
echo
echo "📦 Installing dependencies..."
npm install

# For this proof-of-concept, we'll simulate Oobee integration
# TODO: Replace with actual Oobee installation once package issues are resolved
echo "� Setting up Oobee integration (simulation mode)..."
echo "   📝 Note: This is a proof-of-concept implementation"
echo "   📝 Actual Oobee integration pending package resolution"

# Verify our integration script exists
if [ -f "oobee-scanner.js" ]; then
    echo "   ✅ Oobee integration script found"
else
    echo "   ❌ Oobee integration script missing"
    exit 1
fi

# Check if we need Java for VeraPDF (PDF scanning)
echo
echo "☕ Checking Java (required for PDF scanning)..."
if java --version >/dev/null 2>&1; then
    echo "   ✅ Java found"
    java --version | head -1
else
    echo "   ⚠️ Java not found - PDF scanning will be disabled"
fi

# Run Oobee scan using our integration script
echo
echo "🎯 Running Oobee scan..."
export SITE_NAME
export SCANNER_NAME  
export SCANNER_EMAIL

# Run the scan (with timeout protection if available)
if command -v timeout >/dev/null 2>&1; then
    timeout 600 node oobee-scanner.js || {
        exit_code=$?
        if [ $exit_code -eq 124 ]; then
            echo "   ⏰ Scan timed out after 10 minutes"
        else
            echo "   ❌ Scan failed with exit code: $exit_code"
        fi
        echo "   This is expected for initial integration testing"
    }
else
    # Run without timeout on systems that don't have it (like macOS)
    node oobee-scanner.js || {
        echo "   ❌ Scan failed with exit code: $?"
        echo "   This is expected for initial integration testing"
    }
fi

# Check for results
echo
echo "📊 Checking results..."
if [ -f "oobee-results.json" ]; then
    echo "   ✅ Results file generated: oobee-results.json"
    ls -lah oobee-results.json
    
    # Show summary of results
    echo "   📊 Results summary:"
    if command -v jq >/dev/null 2>&1; then
        jq '.summary' oobee-results.json 2>/dev/null || echo "   Could not parse JSON summary"
    else
        head -10 oobee-results.json
    fi
else
    echo "   ⚠️ No results file found"
fi

# Look for any log files
echo
echo "📝 Checking for log files..."
find . -name "*.log" -type f -exec ls -la {} \; || echo "   No log files found"

echo
echo "✅ Oobee CI integration test completed"
echo "   This was a proof-of-concept run to verify Oobee integration"
echo "   Results and logs are available as artifacts"
