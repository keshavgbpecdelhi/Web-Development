# 🌬️ Wisp

[![GitHub CI](https://github.com/rotsl/wisp/actions/workflows/analysis.yml/badge.svg)](https://github.com/rotsl/wisp/actions/workflows/analysis.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://rotsl.github.io/wisp/)
[![GitLab CI](https://gitlab.com/rotsl/wisp/badges/main/pipeline.svg)](https://gitlab.com/rotsl/wisp/-/pipelines)
[![GitLab Pages](https://img.shields.io/badge/GitLab%20Pages-Live-orange)](https://rotsl.gitlab.io/wisp/)
[![License](https://img.shields.io/github/license/rotsl/wisp)](LICENSE)

[![npm version](https://img.shields.io/npm/v/@rotsl/wisp.svg)](https://www.npmjs.com/package/@rotsl/wisp)
[![npm downloads](https://img.shields.io/npm/dm/@rotsl/wisp.svg)](https://www.npmjs.com/package/@rotsl/wisp)
> Context-aware, zero-dependency UI engine. Your HTML structure dictates the design.

**~5KB total** • **Zero config** • **Zero dependencies** • **Semantic-first**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18644102.svg)](https://doi.org/10.5281/zenodo.18644102)


Wisp bridges the gap between "dumb beautiful" classless CSS and "smart complex" frameworks. It analyzes your HTML structure and automatically applies context-appropriate styling—no classes, no build step, no learning curve.

📊 **Live Analysis Dashboard:** [GitHub](https://rotsl.github.io/wisp/) | [GitLab](https://rotsl.gitlab.io/wisp/)

---

## ✨ The Problem

Current solutions force a choice:

| Approach | Limitation |
|----------|------------|
| **Classless CSS** (Pico, OAT) | Beautiful but static—doesn't adapt to content |
| **Utility-first** (Tailwind) | Powerful but verbose, requires build step |
| **Micro-frameworks** (Alpine) | Interactive but adds 15KB+ runtime |

**Wisp occupies the missing middle**: intelligent, adaptive, and lighter than a PNG.

---

## 🚀 Quick Start

### Option 1: Runtime (Dynamic)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rotsl/wisp@main/dist/wisp.min.css">
</head>
<body>
  <main>
    <h1>Your Content</h1>
    <p>Wisp automatically detects this is narrative content...</p>
  </main>
  <script src="https://cdn.jsdelivr.net/gh/rotsl/wisp@main/dist/wisp.min.js"></script>
</body>
</html>
```

### Option 2: Auto-Fetch (CLI)

```bash
# Install
git clone https://github.com/rotsl/wisp.git
cd wisp
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Fetch and optimize any webpage
./wisp-fetch https://en.wikipedia.org/wiki/Wiki --open
```

---

## 🧠 How It Works

### 1. Content Analysis

Wisp scans your DOM and calculates:

* **Density**: Text-to-element ratio
* **Pattern**: Prose vs. structured vs. technical
* **Context**: Narrative, dashboard, form, or minimal

### 2. Dynamic Styling

Generates CSS custom properties:

```css
:root {
  --wisp-context: narrative;
  --wisp-density: 0.45;
  --wisp-spacing-unit: 1rem;
  --wisp-line-height: 1.7;
  --wisp-max-width: 65ch;
}
```

### 3. Semantic Enhancements

* Auto-expands `<details>` for narrative content
* Adds skip links for deep nesting
* Respects `prefers-reduced-motion` and `prefers-color-scheme`

---

## 📐 Contexts

Wisp automatically detects four contexts:

| Context | Trigger | Characteristics |
|---------|---------|-----------------|
| **Narrative** | >50% paragraphs | Increased line-height, reading-optimized width |
| **Dashboard** | Tables or 4+ cards | Compact spacing, full-width, smaller text |
| **Form** | 2+ inputs | Medium width, comfortable touch targets |
| **Minimal** | Default | Balanced defaults |

---

## 🛠️ Installation & Development

### macOS / Linux Setup

```bash
# Clone repository
git clone https://github.com/rotsl/wisp.git
cd wisp

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Build distribution files
python scripts/build.py

# Run tests
python tests/test_scanner.py

# Install CLI tool (optional)
sudo ln -s $(pwd)/wisp-fetch /usr/local/bin/wisp-fetch
```

---

## 🎯 Usage Examples

### CLI Auto-Fetcher

```bash
# Basic usage - fetch and optimize
wisp-fetch https://en.wikipedia.org/wiki/Wiki

# Output to specific file
wisp-fetch https://example.com -o my-site.html

# Generate CSS only
wisp-fetch https://example.com --css-only -o styles.css

# Minified output
wisp-fetch https://news.ycombinator.com -m

# Open immediately in browser
wisp-fetch https://example.com --open

# Extract specific section
wisp-fetch https://github.com/readme -s '.markdown-body'
```

### Python API

```python
from src.core.scanner import WispScanner

html = "<your-html-content>"
scanner = WispScanner(html)
analysis = scanner.analyze()

print(f"Context: {analysis.context}")  # narrative/dashboard/form/minimal
print(f"Pattern: {analysis.pattern}")  # prose/structured/technical/navigational

css = scanner.generate_css()
```

---

## 📁 Project Structure

```
wisp/
├── .github/           # GitHub Actions & templates
├── .gitlab-ci.yml     # GitLab CI configuration
├── dist/              # Built files (CSS/JS)
├── docs/
│   └── examples/      # Demo files
├── scripts/           # Build automation
├── src/               # Source code
├── tests/             # Test suite
├── wisp-fetch         # CLI entry point
└── README.md
```

---

## 📊 Benchmarks

| Metric | Wisp | Pico | Tailwind | Alpine |
|--------|------|------|----------|--------|
| **Size** | ~5KB | 15KB | 0KB* | 15KB |
| **Runtime** | ~2KB | 0KB | 0KB | 15KB |
| **Config** | None | CSS vars | Extensive | JS |
| **Content-aware** | ✅ | ❌ | ❌ | ❌ |
| **Build step** | Optional | No | Required | No |

*Tailwind requires build process; purged CSS varies.

---

## 📚 Examples

### Wikipedia Demo

Located in `docs/examples/wikipedia-demo.html`

```bash
wisp-fetch https://en.wikipedia.org/wiki/Wiki \
  -o docs/examples/wikipedia-demo.html \
  --open
```

**What it shows:**

* Automatic detection of `narrative` context
* `prose` pattern recognition
* Reading-optimized typography (1.7 line-height, 65ch width)
* Clean extraction of main content

**Generated CSS Variables:**
```css
--wisp-context: narrative
--wisp-pattern: prose
--wisp-density: 0.25
--wisp-line-height: 1.7
--wisp-max-width: 65ch
```

---

## 🎯 Intent Attributes

Control behavior without classes:

```html
<!-- Auto-expand in narrative context -->
<details data-wisp-expand="auto">
  <summary>More info</summary>
</details>

<!-- Hide on mobile -->
<aside data-wisp-fold="mobile">Sidebar content</aside>

<!-- High priority styling -->
<section data-wisp-priority="critical">
  Important information
</section>
```

---

## 🌐 Browser Support

* **Modern browsers**: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+
* **Legacy**: Graceful degradation to semantic HTML
* **Accessibility**: Full screen reader support with auto-generated ARIA

---

## 🤝 Philosophy

1. **HTML First** — Semantic markup should look good by default
2. **Zero Config** — Sensible defaults, escape hatches when needed
3. **Progressive Enhancement** — Works without JavaScript, enhanced with it
4. **Performance Budget** — Sub-5KB target

---

## 📝 License

[MIT](LICENSE) © [rotsl](https://github.com/rotsl)

---

## 🗺️ Roadmap

* [ ] Vue/React wrapper components
* [ ] More contexts (e-commerce, documentation, wizard)
* [ ] CSS-only fallback mode
* [ ] Theme customization API
* [ ] Browser extension for one-click optimization

---

<div align="center">

### 🌬️ Wisp

*Design that thinks for you*

**Zero Classes • Zero Config • Pure HTML**

[GitHub](https://github.com/rotsl/wisp) • [GitLab](https://gitlab.com/rotsl/wisp) • [Live Demo](https://rotsl.github.io/wisp/)

Built by **@rotsl** 💙

</div>

---
