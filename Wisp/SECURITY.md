# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within Wisp, please raise it. All security vulnerabilities will be promptly addressed.

Please do not open public issues for security bugs.

## Security Considerations

Wisp processes HTML content. When using the auto-fetcher:

- Only fetch from trusted sources
- Be aware that fetched HTML is parsed and executed in your environment
- The tool removes scripts, but always review fetched content
- Do not use on untrusted user input without sanitization

## Best Practices

- Keep dependencies updated (`pip install -r requirements.txt --upgrade`)
- Use virtual environments
- Review generated CSS before production use
- Test with your specific content types