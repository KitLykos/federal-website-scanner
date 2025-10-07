# Oobee Integration - Proof of Concept

This document explains the Oobee accessibility scanner integration with our site evaluation tools.

## Current Status: Simulation Mode ✨

The integration is currently running in **simulation mode** as a proof-of-concept. This demonstrates:

- ✅ CI pipeline integration structure
- ✅ Configuration management
- ✅ Results processing and artifact handling
- ✅ Parallel execution alongside Unlighthouse
- ⏳ Actual Oobee scanner execution (pending package resolution)

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

## Simulated Results

The current simulation generates realistic accessibility results:

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

## Next Steps

### Phase 1: Package Resolution 🔧
- Resolve Oobee npm package build issues
- Implement portable Oobee installation
- Test actual scanner execution

### Phase 2: Real Integration 🚀
- Replace simulation with actual Oobee calls
- Add PDF scanning capabilities
- Implement custom flow support

### Phase 3: Enhanced Features 📊
- Results comparison (Unlighthouse vs Oobee)
- Unified reporting dashboard
- Agency-specific configurations

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

## Benefits Realized

Even in simulation mode, this integration demonstrates:

1. **Parallel Processing** - Oobee scans run alongside Unlighthouse without interference
2. **Consistent Configuration** - Shared configuration patterns with existing tools
3. **Artifact Management** - Results are collected and preserved
4. **CI Integration** - Smooth pipeline integration with existing workflows
5. **Scalability** - Ready to extend to all agencies once real implementation is complete

## Known Issues

- **Package Build Error** - Oobee npm package has TypeScript compilation issues
- **Java Dependency** - PDF scanning requires Java/VeraPDF (not critical for HTML scanning)
- **Timeout Command** - macOS doesn't have `timeout` by default (handled gracefully)

All issues have workarounds implemented and don't block the integration concept validation.
