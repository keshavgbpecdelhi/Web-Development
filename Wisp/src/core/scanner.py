#!/usr/bin/env python3
"""
Wisp Scanner - Content Analysis Engine
Analyzes HTML structure and generates context-aware CSS variables
"""

from dataclasses import dataclass
from typing import Dict, Literal
from bs4 import BeautifulSoup
import re

ContextType = Literal['narrative', 'dashboard', 'form', 'minimal']

@dataclass
class ContentAnalysis:
    density: float
    pattern: str
    depth: int
    context: ContextType

class WispScanner:
    DENSITY_MAX = 500  # Calibrated maximum
    
    def __init__(self, html_content: str):
        self.soup = BeautifulSoup(html_content, 'html.parser')
        self.body = self.soup.find('body') or self.soup
    
    def analyze_content_density(self) -> float:
        """Calculate text-to-element ratio"""
        text = self.body.get_text() or ''
        elements = len(self.body.find_all())
        text_length = len(text)
        
        if elements == 0:
            return 0.0
        
        density = text_length / elements
        return min(density / self.DENSITY_MAX, 1.0)
    
    def detect_reading_pattern(self) -> str:
        """Determine if content is prose, structured, technical, or navigational"""
        paragraphs = len(self.body.find_all('p'))
        headings = len(self.body.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']))
        lists = len(self.body.find_all(['ul', 'ol']))
        code = len(self.body.find_all(['pre', 'code']))
        
        total = paragraphs + headings + lists + code
        if total == 0:
            return 'minimal'
        
        ratios = {
            'prose': paragraphs / total,
            'structured': lists / total,
            'technical': code / total,
            'navigational': headings / total
        }
        
        return max(ratios, key=ratios.get)
    
    def measure_content_depth(self) -> int:
        """Find maximum nesting depth"""
        max_depth = 0
        
        def get_depth(element, current_depth=0):
            nonlocal max_depth
            max_depth = max(max_depth, current_depth)
            for child in element.find_all(recursive=False):
                get_depth(child, current_depth + 1)
        
        get_depth(self.body)
        return max_depth
    
    def detect_context(self) -> ContextType:
        """Determine primary context type"""
        has_data_table = self.body.find('table') is not None
        has_cards = len(self.body.find_all(['article'])) > 3
        has_wisp_cards = len(self.body.find_all(attrs={'data-wisp-card': True})) > 3
        
        inputs = len(self.body.find_all(['input', 'select', 'textarea']))
        is_form = self.body.find('form') is not None and inputs > 2
        
        if has_data_table or has_cards or has_wisp_cards:
            return 'dashboard'
        if is_form:
            return 'form'
        if self.detect_reading_pattern() == 'prose':
            return 'narrative'
        return 'minimal'
    
    def analyze(self) -> ContentAnalysis:
        """Run full analysis"""
        return ContentAnalysis(
            density=self.analyze_content_density(),
            pattern=self.detect_reading_pattern(),
            depth=self.measure_content_depth(),
            context=self.detect_context()
        )
    
    def generate_css_variables(self, analysis: ContentAnalysis = None) -> Dict[str, str]:
        """Generate CSS custom properties based on analysis"""
        if analysis is None:
            analysis = self.analyze()
        
        # Density-based spacing
        if analysis.density > 0.7:
            spacing = 0.5
        elif analysis.density > 0.3:
            spacing = 1.0
        else:
            spacing = 1.5
        
        # Context-specific values
        contexts = {
            'narrative': {'line_height': 1.7, 'max_width': '65ch', 'font_size': '1.125rem'},
            'dashboard': {'line_height': 1.4, 'max_width': '100%', 'font_size': '0.875rem'},
            'form': {'line_height': 1.5, 'max_width': '60ch', 'font_size': '1rem'},
            'minimal': {'line_height': 1.6, 'max_width': '70ch', 'font_size': '1rem'}
        }
        
        ctx = contexts[analysis.context]
        
        return {
            '--wisp-density': f"{analysis.density:.2f}",
            '--wisp-context': analysis.context,
            '--wisp-pattern': analysis.pattern,
            '--wisp-depth': str(analysis.depth),
            '--wisp-spacing-unit': f"{spacing}rem",
            '--wisp-line-height': str(ctx['line_height']),
            '--wisp-max-width': ctx['max_width'],
            '--wisp-base-font': ctx['font_size'],
            '--wisp-motion': '200ms',
            '--wisp-generated': f'"{__import__("datetime").datetime.now().isoformat()}"'
        }
    
    def generate_css(self, include_base: bool = True) -> str:
        """Generate complete CSS output"""
        variables = self.generate_css_variables()
        
        css_lines = [f"  {k}: {v};" for k, v in variables.items()]
        css = ":root {\n" + "\n".join(css_lines) + "\n}\n"
        
        css += f"\n/* Context: {variables['--wisp-context']} | "
        css += f"Pattern: {variables['--wisp-pattern']} | "
        css += f"Density: {variables['--wisp-density']} */\n"
        
        if include_base:
            base_css = self._get_base_styles()
            # Remove default :root from base to avoid conflicts
            base_css = re.sub(r':root\s*\{[^}]*\}', '', base_css, flags=re.DOTALL)
            css += base_css
        
        return css
    
    def _get_base_styles(self) -> str:
        """Return base Wisp styles"""
        return """/* Wisp Base Styles */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

:root {
  --wisp-fg: #1a1a1a;
  --wisp-bg: #ffffff;
  --wisp-muted: #666666;
  --wisp-accent: #0066cc;
  --wisp-border: rgba(0, 0, 0, 0.1);
  --wisp-xs: calc(var(--wisp-spacing-unit) * 0.25);
  --wisp-sm: calc(var(--wisp-spacing-unit) * 0.5);
  --wisp-md: var(--wisp-spacing-unit);
  --wisp-lg: calc(var(--wisp-spacing-unit) * 1.5);
  --wisp-xl: calc(var(--wisp-spacing-unit) * 2);
  --wisp-xxl: calc(var(--wisp-spacing-unit) * 3);
}

@media (prefers-color-scheme: dark) {
  :root {
    --wisp-fg: #e6e6e6;
    --wisp-bg: #0a0a0a;
    --wisp-muted: #999999;
    --wisp-accent: #66b3ff;
    --wisp-border: rgba(255, 255, 255, 0.1);
  }
}

html {
  font-size: var(--wisp-base-font);
  line-height: var(--wisp-line-height);
  color: var(--wisp-fg);
  background: var(--wisp-bg);
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: var(--wisp-max-width);
  margin: 0 auto;
  padding: var(--wisp-md);
}

[data-wisp-active="dashboard"] body {
  max-width: 100%;
  padding: var(--wisp-sm);
}

[data-wisp-active="narrative"] body {
  padding: var(--wisp-xl) var(--wisp-md);
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  margin: var(--wisp-lg) 0 var(--wisp-sm);
  font-weight: 600;
}

h1 { font-size: calc(var(--wisp-base-font) * 2); }
h2 { font-size: calc(var(--wisp-base-font) * 1.5); }
h3 { font-size: calc(var(--wisp-base-font) * 1.25); }

p, ul, ol {
  margin-bottom: calc(var(--wisp-spacing-unit) * (1 + var(--wisp-density)));
}

button, input, select, textarea {
  font: inherit;
  padding: var(--wisp-sm) var(--wisp-md);
  border: 1px solid var(--wisp-border);
  border-radius: calc(var(--wisp-spacing-unit) * 0.25);
  background: var(--wisp-bg);
  color: var(--wisp-fg);
  transition: all var(--wisp-motion) ease;
}

button:hover, input:focus, select:focus, textarea:focus {
  border-color: var(--wisp-accent);
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
}

[data-wisp-skip] {
  position: absolute;
  top: -100%;
  left: var(--wisp-md);
  background: var(--wisp-accent);
  color: white;
  padding: var(--wisp-sm) var(--wisp-md);
  text-decoration: none;
  border-radius: 0 0 4px 4px;
  z-index: 10000;
  transition: top var(--wisp-motion);
}

[data-wisp-skip]:focus {
  top: 0;
}

@media print {
  :root { --wisp-max-width: 100%; --wisp-spacing-unit: 0.75rem; }
  [data-wisp-skip], button { display: none !important; }
}
"""


if __name__ == '__main__':
    # CLI usage
    import sys
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            html = f.read()
        scanner = WispScanner(html)
        print(scanner.generate_css())