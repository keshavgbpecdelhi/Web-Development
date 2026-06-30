# Contributing to Wisp

Thank you for your interest in contributing to Wisp! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to:
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism gracefully
- Focus on what's best for the community

## Getting Started

1. Fork the repository on GitHub or GitLab
2. Clone your fork locally
3. Create a new branch for your feature or fix
4. Follow the development setup below

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check if the issue already exists
- Use the latest version
- Collect information about the bug (OS, browser, steps to reproduce)

Include in your report:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Sample HTML/CSS if relevant

### Suggesting Enhancements

- Use a clear, descriptive title
- Provide detailed description of the proposed feature
- Explain why this enhancement would be useful
- List possible alternatives you've considered

### Pull Requests

1. Update your fork to the latest main branch
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`python tests/test_scanner.py`)
5. Commit with clear messages (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### macOS/Linux

```bash
# Clone your fork
git clone https://github.com/rotsl/wisp.git
cd wisp

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run tests
python tests/test_scanner.py

# Build distribution
python scripts/build.py
```

### Windows

```powershell
# Clone your fork
git clone https://github.com/rotsl/wisp.git
cd wisp

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run tests
python tests/test_scanner.py
```

## Submitting Changes

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, semicolons, etc)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or correcting tests
- `chore:` Build process or auxiliary tool changes

Examples:
```
feat: add support for e-commerce context
fix: correct density calculation for nested lists
docs: update README with new examples
```

### Pull Request Process

1. Update README.md with details of changes if applicable
2. Update docs/ with any new examples
3. Ensure all tests pass
4. Update version numbers if releasing
5. Request review from maintainers
6. Address review feedback

## Coding Standards

### Python
- Follow PEP 8
- Use type hints where appropriate
- Document functions with docstrings
- Keep functions focused and small
- Maximum line length: 100 characters

### JavaScript
- Use ES6+ features
- Prefer `const` and `let` over `var`
- Use strict mode
- Document with JSDoc comments
- No external dependencies (keep it zero-dependency)

### CSS
- Use CSS custom properties (variables)
- Prefer rem units
- Mobile-first approach
- Respect `prefers-reduced-motion`
- Ensure WCAG AA contrast ratios

## Testing

### Running Tests

```bash
# Run all tests
python tests/test_scanner.py

# Run with verbose output
python tests/test_scanner.py -v

# Test specific fixture
python -m src.core.fetcher tests/fixtures/blog-post.html --css-only
```

### Adding Tests

When adding features, include tests in `tests/`:
- Unit tests for scanner logic
- Integration tests for full pipeline
- Fixture files for real-world HTML samples

### Test Coverage

Aim for:
- 80%+ code coverage
- All contexts tested (narrative, dashboard, form, minimal)
- Edge cases (empty content, malformed HTML, deep nesting)

### Documentation

- Update README.md for user-facing changes
- Update CONTRIBUTING.md for process changes
- Add examples to docs/examples/ for new features
- Comment complex code sections

### Questions?

- Open an issue for discussion
- Check existing issues and PRs first
- Be patient with responses

### License

By contributing, you agree that your contributions will be licensed under the MIT License.

---
