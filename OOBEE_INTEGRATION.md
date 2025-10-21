# Oobee Integration - Proof of Concept

This document explains the Oobee accessibility scanner integration with our site evaluation tools.

## Current Status: Simulation Mode Only ⚠️

**IMPORTANT: This integration is currently running in simulation mode and does NOT perform actual accessibility scans.**

The integration generates **fake accessibility data** to demonstrate the infrastructure. This demonstrates:

- ✅ CI pipeline integration structure
- ✅ Configuration management
- ✅ Results processing and artifact handling
- ✅ Parallel execution alongside Unlighthouse
- ❌ **Actual Oobee scanner execution (NOT WORKING - scanner fails to run)**

## Architecture

### Files Added

1. **`oobee-scanner.js`** - Main integration script
   - Handles Oobee configuration
   - Manages scan execution
   - Processes and formats results

2. **`scripts/ci/oobee-run.sh`** - CI execution script
   - Installs dependencies
   - Runs Oobee scan
   - Collects artifacts

3. **`unlighthouse/config/oobee.config-ci.js`** - Configuration file
   - Oobee-specific settings
   - CI optimizations

4. **`.gitlab-ci.yml`** - Enhanced with `ci-oobee` job
   - Parallel execution with existing CI
   - Artifact collection
   - Results reporting

### Integration Points

```
┌─────────────────┐    ┌─────────────────┐
│ Existing CI     │    │ New Oobee CI    │
│ (Unlighthouse)  │    │ (Accessibility) │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│ Standard Report │    │ Accessibility   │
│ (Performance)   │    │ Report          │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────┐       ┌───────┘
                 ▼       ▼
         ┌─────────────────┐
         │ Combined        │
         │ Dashboard       │
         └─────────────────┘
```

## ⚠️ SIMULATED Results Only

**WARNING: These are fake results for testing infrastructure only.**

The current simulation generates mock accessibility results that look realistic but are completely fabricated:

```json
{
  "summary": {
    "totalPages": 50,
    "pagesScanned": 3,
    "totalViolations": 8,
    "mustFixViolations": 3,
    "goodToFixViolations": 5
  },
  "violations": [
    {
      "rule": "color-contrast",
      "severity": "must-fix",
      "count": 2,
      "description": "Elements must have sufficient color contrast"
    }
  ]
}
```

## Next Steps - REAL WORK NEEDED

### ⚠️ CRITICAL: Phase 1 - Make OOBEE Actually Work
- **Fix OOBEE CLI execution issues** (currently fails silently)
- Resolve package runtime problems
- Get actual scanner running instead of simulation
- **Status: BLOCKED - Scanner does not execute**

### Phase 2: Real Integration (Cannot start until Phase 1 complete)
- Replace simulation with actual Oobee calls
- Add PDF scanning capabilities  
- Implement custom flow support
- **Status: WAITING on Phase 1**

### Phase 3: Enhanced Features (Future)
- Results comparison (Unlighthouse vs Oobee)
- Unified reporting dashboard
- Agency-specific configurations
- **Status: DEPENDS on real scanner working**

## Testing

### Local Testing
```bash
# Test the integration script
SITE_NAME="https://example.com" node oobee-scanner.js

# Test the CI script
bash scripts/ci/oobee-run.sh
```

### CI Testing
The `ci-oobee` job runs automatically in the CI stage and generates:
- Accessibility scan results
- Configuration validation
- Integration testing reports

## Configuration

### Environment Variables
- `SITE_NAME` - URL to scan
- `SCANNER_NAME` - Scanner identification
- `SCANNER_EMAIL` - Contact email

### Oobee Settings
- Max pages: 50 (configurable)
- Device: Desktop
- Safe mode: Yes (for government sites)
- File types: HTML only (PDF support pending)

## Benefits Realized (Infrastructure Only)

⚠️ **Note: These benefits are for infrastructure only - no real accessibility scanning occurs.**

This proof-of-concept demonstrates:

1. **Parallel Processing Infrastructure** - Framework for running scans alongside Unlighthouse
2. **Consistent Configuration** - Shared configuration patterns with existing tools  
3. **Artifact Management** - Results collection and preservation system
4. **CI Integration** - Pipeline integration ready for real scanner
5. **Simulation Framework** - Complete mock data generation for testing

**What's Missing: Actual accessibility scanning capabilities**

## Known Issues - BLOCKERS

### 🚨 Critical Issues (Block Real Usage)
- **OOBEE CLI Does Not Execute** - Scanner fails to run, hangs silently when called
- **No Real Accessibility Scanning** - All results are simulated/fake
- **Package Runtime Issues** - Even after successful build, CLI doesn't function

### 🟡 Minor Issues  
- **Java Dependency** - PDF scanning requires Java/VeraPDF (not critical for HTML scanning)
- **Timeout Command** - macOS doesn't have `timeout` by default (handled gracefully)

**IMPORTANT: The critical issues prevent any real accessibility scanning. This is infrastructure-only until OOBEE CLI execution is fixed.**
