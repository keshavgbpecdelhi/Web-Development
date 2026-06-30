<p align="center">
  <h1 align="center">🌬️ Wisp</h1>
  <p align="center">Context-Aware, Zero-Dependency UI Engine</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@rotsl/wisp">
    <img src="https://img.shields.io/npm/v/@rotsl/wisp.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@rotsl/wisp">
    <img src="https://img.shields.io/npm/dm/@rotsl/wisp.svg" alt="npm downloads">
  </a>
  <img src="https://img.shields.io/bundlephobia/min/@rotsl/wisp" alt="bundle size">
  <img src="https://img.shields.io/npm/l/@rotsl/wisp" alt="license">
</p>

**Zero-config** • **Zero-dependency** • **~5KB** • **TypeScript support**

Wisp analyzes your HTML structure and automatically generates optimized CSS. No classes needed. No build step required.

---

## 📦 Installation

```bash
npm install @rotsl/wisp
```

```bash
yarn add @rotsl/wisp
```

```bash
pnpm add @rotsl/wisp
```

---

## 🚀 Quick Start

### ES Modules (Recommended)

```javascript
import Wisp from '@rotsl/wisp';
import '@rotsl/wisp/dist/wisp.min.css';

// Wisp auto-initializes when DOM is ready
// Your HTML is now styled based on its content structure
```

### CommonJS

```javascript
const Wisp = require('@rotsl/wisp');
require('@rotsl/wisp/dist/wisp.min.css');
```

### UMD / Browser

```html
<link rel="stylesheet" href="https://unpkg.com/@rotsl/wisp@latest/dist/wisp.min.css">
<script src="https://unpkg.com/@rotsl/wisp@latest/dist/wisp.min.js"></script>
```

---

## 🎯 How It Works

Wisp scans your DOM and automatically detects the **context**:

| Context | Trigger | Styling |
|---------|---------|---------|
| **Narrative** | >50% paragraphs | Reading-optimized (1.7 line-height, 65ch width) |
| **Dashboard** | Tables or 4+ cards | Compact, full-width, data-dense |
| **Form** | 2+ inputs | Touch-friendly, medium width |
| **Minimal** | Default | Balanced, general-purpose |

```html
<!-- This becomes a beautifully styled article automatically -->
<article>
  <h1>My Blog Post</h1>
  <p>Content here...</p>
  <p>More content...</p>
</article>
<!-- Wisp detects "narrative" context and applies reading-optimized styles -->
```

---

## ⚛️ Framework Integration

### React

```jsx
import { useEffect } from 'react';
import Wisp from '@rotsl/wisp';
import '@rotsl/wisp/dist/wisp.min.css';

function App() {
  useEffect(() => {
    // Re-scan when content changes
    Wisp.scan();
  }, []);

  return (
    <main>
      <h1>Your Content</h1>
      <p>Automatically styled by Wisp</p>
    </main>
  );
}
```

### Vue 3

```vue
<script setup>
import { onMounted } from 'vue';
import Wisp from '@rotsl/wisp';
import '@rotsl/wisp/dist/wisp.min.css';

onMounted(() => {
  Wisp.scan();
});
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </main>
</template>
```

### Vanilla JS

```javascript
// Auto-initializes on DOMContentLoaded
// Or manually trigger:
document.addEventListener('DOMContentLoaded', () => {
  const analysis = Wisp.scan();
  console.log('Detected context:', analysis.context);
  // { context: 'narrative', pattern: 'prose', density: 0.45, depth: 5 }
});
```

---

## 📋 API Reference

### `Wisp.scan(container?)`

Analyzes DOM and applies context-aware styles.

```javascript
// Scan entire document
Wisp.scan();

// Scan specific element
const article = document.querySelector('article');
Wisp.scan(article);
```

**Returns:** `{ context, pattern, density, depth }`

### `Wisp.analyze(container?)`

Returns analysis without applying styles.

```javascript
const result = Wisp.analyze();
// { context: 'narrative', pattern: 'prose', density: 0.45, depth: 5 }
```

### `Wisp.version`

```javascript
console.log(Wisp.version); // '0.1.2'
```

---

## 🎨 CSS Variables

Wisp generates these custom properties you can use in your own CSS:

```css
:root {
  --wisp-context: narrative;
  --wisp-density: 0.45;
  --wisp-spacing-unit: 1rem;
  --wisp-line-height: 1.7;
  --wisp-max-width: 65ch;
  --wisp-base-font: 1.125rem;
  --wisp-motion: 200ms;
  
  /* Colors */
  --wisp-fg: #1a1a1a;
  --wisp-bg: #ffffff;
  --wisp-muted: #666666;
  --wisp-accent: #0066cc;
  --wisp-border: rgba(0, 0, 0, 0.1);
}
```

---

## 🔧 Advanced Usage

### Force Specific Context

```html
<body data-wisp-force="dashboard">
  <!-- Forces dashboard styling regardless of content -->
</body>
```

### Disable Auto-initialization

```html
<script>
  window.WispAutoInit = false;
</script>
<script src="@rotsl/wisp/dist/wisp.min.js"></script>
<script>
  // Initialize manually when ready
  Wisp.scan();
</script>
```

### Intent Attributes

```html
<!-- Auto-expand in narrative context -->
<details data-wisp-expand="auto">
  <summary>More info</summary>
</details>

<!-- Hide on mobile -->
<aside data-wisp-fold="mobile">Sidebar</aside>
```

---

## 📦 File Structure

```
node_modules/@rotsl/wisp/
├── dist/
│   ├── wisp.css          # Unminified CSS (2.4KB)
│   ├── wisp.min.css      # Minified CSS (1.9KB)
│   ├── wisp.js           # Unminified JS (4.3KB)
│   ├── wisp.min.js       # Minified JS (2.4KB)
│   ├── wisp.mjs          # ES Module wrapper
│   └── wisp.d.ts         # TypeScript definitions
└── README.md
```

---

## 📝 TypeScript

Type definitions included!

```typescript
import Wisp, { WispAnalysis } from '@rotsl/wisp';

const analysis: WispAnalysis = Wisp.scan();
// analysis.context: 'narrative' | 'dashboard' | 'form' | 'minimal'
// analysis.pattern: 'prose' | 'structured' | 'technical' | 'navigational'
// analysis.density: number
// analysis.depth: number
```

---

## 🌐 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

Legacy browsers gracefully degrade to semantic HTML.

---

## 📚 Documentation

- **Full Docs**: https://rotsl.github.io/wisp/
- **GitHub**: https://github.com/rotsl/wisp
- **GitLab**: https://gitlab.com/rotsl/wisp
- **Issues**: https://github.com/rotsl/wisp/issues

---

## 🤝 Contributing

Contributions welcome! See [Contributing Guide](https://github.com/rotsl/wisp/blob/main/CONTRIBUTING.md).

---

## 📄 License

MIT © [Rohan R.](https://github.com/rotsl)

---

<p align="center">
  <sub>Built with 💙 for the semantic web</sub>
</p>


---
