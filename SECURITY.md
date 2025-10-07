# Security Policy

## Supported Versions

We actively support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

### Security Issues

If you discover a security vulnerability in Federal Website Scanner, please report it responsibly:

**DO NOT** create a public GitHub issue for security vulnerabilities.

### How to Report

1. **Email**: Send details to `security@your-org.gov` (replace with your security contact)
2. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days  
- **Updates**: Every 7 days until resolved
- **Resolution**: Target 30 days for fixes

### Responsible Disclosure

- Allow reasonable time for fixes before public disclosure
- Provide credit to reporters (unless they prefer anonymity)
- Coordinate disclosure timing with maintainers

## Security Considerations

### Government Website Scanning

When using this tool to scan federal websites:

- **Respect robots.txt** and website terms of service
- **Use appropriate delays** between requests to avoid overloading servers
- **Do not attempt to access** restricted or authenticated areas
- **Report security issues** found on government sites through proper channels

### Data Handling

- **No sensitive data logging**: The scanner should not log sensitive information
- **Results privacy**: Be mindful of what scan results you share publicly
- **Credentials security**: Keep Google Sheets and other API credentials secure

### Infrastructure Security  

- **Keep dependencies updated**: Regularly update npm packages
- **Environment variables**: Use `.env` files for sensitive configuration (never commit these)
- **Access controls**: Limit who can run scans and access results
- **Audit trails**: Log scan activities for security monitoring

## Best Practices

### For Government Users

- Follow your agency's IT security policies
- Coordinate with security teams before large-scale scanning
- Ensure scanning activities comply with federal guidelines
- Use official agency contact information in scanner configuration

### For Contributors

- Follow secure coding practices
- Validate all user inputs
- Use parameterized queries where applicable
- Keep third-party dependencies minimal and up-to-date
- Include security considerations in pull request descriptions

### For Hosting Organizations

- Regularly audit access permissions
- Monitor scan activities and resource usage
- Implement proper logging and alerting
- Follow your organization's security policies
- Keep the project infrastructure secure

## Vulnerability Disclosure Timeline

Typical timeline for security issue resolution:

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Acknowledgment sent, initial triage
3. **Day 3-7**: Detailed assessment and reproduction
4. **Day 8-21**: Development of fix and testing
5. **Day 22-30**: Release preparation and coordination
6. **Day 30+**: Public disclosure and release

## Security Updates

Security updates will be:

- Released as patch versions (e.g., 1.0.1 → 1.0.2)
- Announced via GitHub Security Advisories
- Documented in CHANGELOG.md
- Tagged in Git with security labels

## Contact

For security-related questions or concerns:

- **General Security**: Create a GitHub Discussion
- **Vulnerabilities**: Email security contact (see above)
- **Policy Questions**: Open a GitHub issue with `security` label

---

**Thank you for helping keep Federal Website Scanner secure!**

Security is a shared responsibility. By following these guidelines, we can maintain a secure and trustworthy tool for federal accessibility compliance.
