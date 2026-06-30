#!/usr/bin/env python3
"""
Wisp Auto-Fetcher - Direct URL to optimized CSS/HTML
Fetches any webpage, analyzes content, outputs Wisp-optimized assets
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

import requests
import argparse
from urllib.parse import urlparse
from bs4 import BeautifulSoup, Comment
from src.core.scanner import WispScanner

class WispFetcher:
    def __init__(self, url: str, selector: str = None):
        self.url = url
        self.selector = selector  # CSS selector to extract main content
        self.soup = None
        self.raw_html = ""
        self.title = ""
        
    def fetch(self) -> bool:
        """Fetch URL with browser-like headers"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
        }
        
        try:
            print(f"🌐 Fetching: {self.url}")
            response = requests.get(self.url, headers=headers, timeout=30)
            response.raise_for_status()
            self.raw_html = response.text
            print(f"✓ Downloaded: {len(self.raw_html)/1024:.1f}KB")
            return True
            
        except requests.RequestException as e:
            print(f"❌ Fetch failed: {e}")
            return False
    
    def extract_content(self) -> str:
        """Extract main content using heuristics or selector"""
        self.soup = BeautifulSoup(self.raw_html, 'lxml')
        
        # Remove script/style/nav/footer/etc
        for tag in self.soup(['script', 'style', 'nav', 'footer', 'header', 
                              'aside', 'noscript', 'iframe', 'svg']):
            tag.decompose()
        
        # Remove comments
        for comment in self.soup.find_all(string=lambda text: isinstance(text, Comment)):
            comment.extract()
        
        # Get title
        title_tag = self.soup.find('title')
        self.title = title_tag.get_text() if title_tag else urlparse(self.url).netloc
        
        # If selector provided, use it
        if self.selector:
            main = self.soup.select_one(self.selector)
            if main:
                return str(main)
        
        # Auto-detect main content
        candidates = [
            self.soup.find('main'),
            self.soup.find('article'),
            self.soup.find('div', class_='content'),
            self.soup.find('div', class_='mw-parser-output'),  # Wikipedia
            self.soup.find('div', class_='post-content'),
            self.soup.find('div', id='content'),
            self.soup.find('div', role='main'),
            self.soup.find('body')  # fallback
        ]
        
        for candidate in candidates:
            if candidate:
                return str(candidate)
        
        return str(self.soup.find('body')) if self.soup.find('body') else self.raw_html
    
    def analyze(self) -> dict:
        """Run Wisp analysis on extracted content"""
        content = self.extract_content()
        scanner = WispScanner(content)
        analysis = scanner.analyze()
        
        return {
            'analysis': analysis,
            'scanner': scanner,
            'content': content,
            'title': self.title,
            'url': self.url
        }
    
    def generate_css(self, minify: bool = False) -> str:
        """Generate Wisp CSS for this page"""
        result = self.analyze()
        css = result['scanner'].generate_css()
        
        if minify:
            try:
                import rcssmin
                css = rcssmin.cssmin(css)
            except ImportError:
                pass
        
        return css
    
    def generate_html(self, inline_css: bool = True) -> str:
        """Generate complete standalone HTML with Wisp applied"""
        result = self.analyze()
        content = result['content']
        analysis = result['analysis']
        
        # Parse content to clean it up
        content_soup = BeautifulSoup(content, 'lxml')
        
        # Remove empty elements
        for empty in content_soup.find_all(lambda tag: not tag.get_text(strip=True)):
            if empty.name not in ['br', 'hr', 'img']:
                empty.decompose()
        
        # Generate CSS
        css = result['scanner'].generate_css()
        
        if inline_css:
            css_block = f"<style>{css}</style>"
        else:
            css_block = '<link rel="stylesheet" href="wisp-generated.css">'
        
        # Build complete HTML
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{result['title']} - Wisp Optimized</title>
  {css_block}
  <style>
    /* Wisp Auto-Fetcher Enhancements */
    .wisp-source {{ 
      position: fixed; 
      bottom: 8px; 
      right: 8px; 
      font-size: 11px; 
      color: var(--wisp-muted);
      background: var(--wisp-bg);
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--wisp-border);
      z-index: 10000;
    }}
    .wisp-analysis {{
      position: fixed;
      top: 8px;
      right: 8px;
      background: var(--wisp-accent);
      color: white;
      padding: 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      max-width: 220px;
    }}
    .wisp-analysis code {{
      background: rgba(255,255,255,0.2);
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
    }}
    /* Ensure images don't break layout */
    img {{ max-width: 100%; height: auto; }}
    /* Fix tables */
    table {{ border-collapse: collapse; width: 100%; margin: var(--wisp-md) 0; }}
    td, th {{ padding: var(--wisp-xs) var(--wisp-sm); border: 1px solid var(--wisp-border); }}
    th {{ background: rgba(0,0,0,0.05); font-weight: 600; }}
  </style>
</head>
<body>
  <main data-wisp-auto="true">
    {content_soup.prettify()}
  </main>
  
  <div class="wisp-analysis">
    <strong>🌬️ Wisp Analysis</strong><br>
    Context: <code>{analysis.context}</code><br>
    Pattern: <code>{analysis.pattern}</code><br>
    Density: <code>{analysis.density:.3f}</code><br>
    <div style="margin-top:6px;opacity:0.8;font-size:11px;">
      Source: {urlparse(self.url).netloc[:20]}...
    </div>
  </div>
  
  <div class="wisp-source">
    Optimized by <a href="https://github.com/yourusername/wisp" style="color:inherit;">Wisp</a>
  </div>
  
  <script>
    // Minimal runtime for enhancements
    (function() {{
      const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {{
        document.documentElement.style.setProperty('--wisp-motion', '0ms');
      }}
    }})();
  </script>
</body>
</html>"""
        
        return html


def main():
    parser = argparse.ArgumentParser(description='Wisp Auto-Fetcher - Optimize any webpage')
    parser.add_argument('url', help='URL to fetch and optimize')
    parser.add_argument('-o', '--output', help='Output file (auto-generated if not specified)')
    parser.add_argument('-c', '--css-only', action='store_true', help='Output CSS only')
    parser.add_argument('-m', '--minify', action='store_true', help='Minify output')
    parser.add_argument('-s', '--selector', help='CSS selector for main content')
    parser.add_argument('--open', action='store_true', help='Open result in browser (Mac only)')
    
    args = parser.parse_args()
    
    # Auto-generate output filename
    if not args.output:
        domain = urlparse(args.url).netloc.replace('www.', '').split('.')[0]
        ext = 'css' if args.css_only else 'html'
        args.output = f"wisp-{domain}.{ext}"
    
    # Fetch and process
    fetcher = WispFetcher(args.url, selector=args.selector)
    
    if not fetcher.fetch():
        sys.exit(1)
    
    if args.css_only:
        output = fetcher.generate_css(minify=args.minify)
        print(f"🎨 Generated CSS for context: {fetcher.analyze()['analysis'].context}")
    else:
        output = fetcher.generate_html(inline_css=not args.minify)
        analysis = fetcher.analyze()['analysis']
        print(f"🌐 Generated HTML")
        print(f"   Context: {analysis.context}")
        print(f"   Pattern: {analysis.pattern}")
        print(f"   Density: {analysis.density:.3f}")
    
    # Write output
    with open(args.output, 'w', encoding='utf-8') as f:
        f.write(output)
    
    size = os.path.getsize(args.output) / 1024
    print(f"💾 Saved: {args.output} ({size:.1f}KB)")
    
    # Open in browser if requested
    if args.open and sys.platform == 'darwin':
        import subprocess
        subprocess.run(['open', args.output])
        print(f"🚀 Opened in browser")


if __name__ == '__main__':
    main()