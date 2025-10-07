# Federal Website Scanner

An open-source toolkit for automated accessibility and performance scanning of federal government websites using dual-scanner architecture.

## 🎯 Overview

This project automates comprehensive evaluation of federal websites through:
- **Dynamic URL Discovery** - GSA Digital Analytics API integration for real-time website detection
- **Dual Scanner Architecture** - Unlighthouse (performance) + OOBEE (accessibility compliance)  
- **Automated Job Generation** - Intelligent configuration creation for 500+ government sites
- **Centralized Reporting** - Google Sheets integration with cross-scanner correlation

## ✨ Key Features

### 🔍 **Dual Scanner Coverage**
- **Unlighthouse Scanner**: Lighthouse-based accessibility, performance, and SEO auditing
- **OOBEE Scanner**: Specialized accessibility compliance testing with detailed issue categorization
- **Parallel Execution**: Both tools scan the same sites for comprehensive coverage and validation

### ⚙️ **Intelligent Configuration**
- **Centralized Config System**: Single `config.js` file with environment variable overrides
- **Dynamic Scaling**: Configurable URL limits, timeouts, and chunking algorithms
- **Government-Specific Optimizations**: Special handling for federal domains and security restrictions

### 🚀 **Automated Pipeline** 
- **CI/CD Integration**: GitHub Actions support with matrix job generation
- **URL Validation**: Government-specific retry logic with accessibility path testing
- **Error Recovery**: Robust handling of blocked domains and timeout scenarios

### 📊 **Advanced Reporting**
- **Cross-Scanner Correlation**: Combined performance metrics + accessibility findings  
- **Agency Detection**: Automatic mapping to federal departments via GSA API
- **Compliance Tracking**: Categorized findings (Must Fix vs. Good to Fix)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Google Cloud Service Account (for Sheets integration - optional)
- GitHub repository for CI/CD (optional)

### Installation
```bash
git clone https://github.com/your-org/federal-website-scanner.git
cd federal-website-scanner
npm install
```

### Configuration
1. **Set up environment variables:**
```bash
export MAX_URLS_TOTAL=800          # Total URLs per agency
export MAX_URLS_PER_DOMAIN=100     # URLs per domain before splitting  
export CHUNK_SIZE=50               # URLs per chunk when splitting
export PAGE_TIMEOUT_MS=180000      # Scanner timeout (3 minutes)
export SCANNER_NAME="YourScanner"  # Custom scanner name
export SCANNER_EMAIL="your@email.com"  # Contact email
```

2. **Configure Google Sheets (optional):**
```bash
export GOOGLE_CREDENTIALS_PATH="/path/to/service-account.json"
```

### Basic Usage

**1. Validate government websites:**
```bash
npm run validate
# Outputs: output/validated-urls.json
```

**2. Generate scan jobs:**
```bash
npm run generate-jobs  
# Outputs: output/generated-jobs/generated.yml
```

**3. Run accessibility scans:**
```bash
# Unlighthouse scan
npm run scan-unlighthouse

# OOBEE scan  
npm run scan-oobee
```

**4. View current configuration:**
```bash
npm run config
```

## 🏗️ Architecture

### Scanning Pipeline
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   URL Discovery │ -> │  Job Generation │ -> │ Parallel Scans  │
│  (GSA DAP API)  │    │ (Matrix Config) │    │ (UL + OOBEE)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
┌─────────────────┐    ┌─────────────────┐           ▼
│ Results Upload  │ <- │ Data Processing │    ┌─────────────────┐
│ (Google Sheets) │    │   & Analysis    │    │ Artifact Files  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Configuration System
All parameters are centralized in `config.js` with environment override support:

```javascript
// Core scanning limits
MAX_URLS_TOTAL: 800                    // Total URLs per agency
MAX_URLS_PER_DOMAIN: 100              // Per domain before chunking
CHUNK_SIZE: 50                         // Chunk size when splitting

// Timeout configuration  
PAGE_TIMEOUT_MS: 180000                // Scanner page timeout
URL_VALIDATION_TIMEOUT_MS: 25000      // URL validation timeout
BATCH_TIMEOUT_MS: 90000               // Batch processing timeout

// Processing settings
SPLIT_LARGE_DOMAINS: true             // Enable domain splitting
SCAN_CONCURRENCY: 1                   // Scanner concurrency level
VALIDATION_BATCH_SIZE: 3              // Parallel validation count
```

## 📁 File Structure

```
├── config.js                    # Centralized configuration
├── validate_urls.js              # URL discovery & validation
├── dynamic_job_gen.js            # CI job matrix generation
├── unlighthouse-scanner.js       # Unlighthouse integration
├── oobee-scanner.js              # OOBEE accessibility integration
├── *-mastersheet.js              # Google Sheets reporting
├── configGenerator.js            # Smart config generation
├── urlTools.js                   # URL processing utilities
├── .github/workflows/            # GitHub Actions templates
├── scripts/ci/                   # CI execution scripts
├── configs/validated/            # Generated scan configurations
└── output/                       # Results and artifacts
    ├── validated-urls.json
    ├── generated-jobs/
    └── scan-results/
```

## ⚙️ Configuration Examples

**Large-scale scanning:**
```bash
MAX_URLS_TOTAL=2000 MAX_URLS_PER_DOMAIN=300 CHUNK_SIZE=100 npm run validate
```

**Conservative scanning for slow sites:**  
```bash
MAX_URLS_PER_DOMAIN=30 PAGE_TIMEOUT_MS=300000 CHUNK_SIZE=20 npm run validate
```

**Quick testing with limited pages:**
```bash  
MAX_URLS_PER_DOMAIN=20 MAX_STATIC_URLS=25 npm run validate
```

**Custom scanner identity:**
```bash
SCANNER_NAME="MyOrg-Scanner" SCANNER_EMAIL="scanner@myorg.gov" npm run validate
```

## 🔧 CI/CD Integration

### GitHub Actions
The project includes GitHub Actions workflows for:
- Automated URL validation on schedule
- Matrix job generation for parallel scanning  
- Results processing and artifact upload

**To set up:**
1. Fork the repository
2. Configure secrets (optional):
   - `GOOGLE_CREDENTIALS`: Service account JSON for Sheets integration
3. Customize workflow in `.github/workflows/scanner.yml`
4. Enable Actions and set up schedule

### Manual Trigger
```bash
# Via GitHub web interface
# Actions > Federal Website Scanner > Run workflow

# With parameters
# Agency filter: "education" 
# Max URLs: "200"
```

## 🔍 Scanning Tools Integration

### Unlighthouse
- **Purpose**: Performance, SEO, and basic accessibility metrics
- **Output**: Lighthouse scores with historical tracking
- **Best For**: Overall site health and performance optimization

### OOBEE  
- **Purpose**: Detailed accessibility compliance testing
- **Output**: Structured issue reports with severity classification
- **Best For**: Section 508 compliance and accessibility auditing

### Dual Scanner Benefits
- **Comprehensive Coverage**: Different engines catch different issues
- **Cross-Validation**: Accessibility findings verified by multiple tools
- **Flexible Reporting**: Performance + compliance data for different stakeholders

## 🌐 Government Website Support

### Supported Agencies
The scanner automatically detects and processes websites from:
- Cabinet-level departments (State, Defense, Treasury, etc.)
- Independent agencies (NASA, EPA, NSF, etc.)  
- Regulatory bodies (SEC, FCC, FDA, etc.)
- Judicial branch (Federal courts)
- Legislative branch (Congress, GAO, etc.)

### Special Handling
- **Rate Limiting**: Respectful delays between requests
- **Bot Detection**: Government-friendly user agents
- **Authentication**: Bypasses for public accessibility scanning
- **Redirects**: Intelligent handling of government redirects

## 📊 Results and Reporting

### Output Formats
- **CSV Files**: Lighthouse scores and metrics
- **JSON Files**: Structured accessibility findings  
- **Google Sheets**: Centralized dashboards (optional)
- **Artifacts**: Raw scan data and logs

### Sample Reports
```bash
# Accessibility findings summary
{
  "summary": {
    "totalViolations": 8,
    "mustFixViolations": 3,
    "goodToFixViolations": 5
  },
  "violations": [
    {
      "rule": "color-contrast",
      "severity": "must-fix", 
      "count": 2
    }
  ]
}
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly** (`npm run validate`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Test with multiple government websites
- Ensure accessibility compliance in your code

## 🐛 Troubleshooting

### Common Issues

**URL Validation Timeouts**
```bash
# Increase timeout for slow government sites
URL_VALIDATION_TIMEOUT_MS=45000 npm run validate
```

**Memory Issues with Large Sites**
```bash
# Reduce batch sizes and URLs per domain  
MAX_URLS_PER_DOMAIN=50 CHUNK_SIZE=25 npm run validate
```

**Rate Limiting**
```bash
# Increase delays between requests
VALIDATION_BATCH_SIZE=1 npm run validate
```

### Debug Mode
```bash
DEBUG=true npm run validate
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GSA Digital Analytics Program** for federal website data
- **Unlighthouse** for performance and accessibility scanning
- **OOBEE** for specialized accessibility compliance testing
- **Federal agencies** for supporting automated accessibility initiatives
- **Open source community** for contributions and feedback

## 📞 Support

For questions, issues, or contributions:

1. **Check existing issues**: [GitHub Issues](https://github.com/your-org/federal-website-scanner/issues)
2. **Join discussions**: [GitHub Discussions](https://github.com/your-org/federal-website-scanner/discussions)  
3. **Create new issues**: Provide detailed information about your setup and the problem
4. **Security issues**: Email security@your-org.gov (replace with your security contact)

## 🎯 Roadmap

- [ ] **Real-time OOBEE integration** (currently in simulation mode)
- [ ] **Additional scanner integrations** (axe-core, Pa11y)
- [ ] **Advanced filtering** (by agency type, compliance status)
- [ ] **API endpoints** for programmatic access
- [ ] **Dashboard UI** for non-technical users
- [ ] **Compliance tracking** over time
- [ ] **AI-powered issue categorization**

---

**Note**: This is an open-source tool designed for federal accessibility compliance. Please ensure your scanning activities comply with federal IT policies and do not impact production systems.

**Disclaimer**: This tool is not officially endorsed by any federal agency. Results should be verified by qualified accessibility professionals.
