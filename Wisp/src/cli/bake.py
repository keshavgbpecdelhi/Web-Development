#!/usr/bin/env python3
"""
Wisp CLI - Static CSS Generator
Usage: python -m src.cli.bake input.html output.css [context]
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from src.core.scanner import WispScanner, ContentAnalysis

def bake(input_file: str, output_file: str, forced_context: str = None):
    """Generate static CSS from HTML file"""
    with open(input_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    scanner = WispScanner(html)
    
    if forced_context:
        # Override context detection
        analysis = scanner.analyze()
        analysis = ContentAnalysis(
            density=analysis.density,
            pattern=analysis.pattern,
            depth=analysis.depth,
            context=forced_context
        )
        css = scanner.generate_css(analysis)
    else:
        css = scanner.generate_css()
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(css)
    
    analysis = scanner.analyze()
    print(f"✓ Baked {analysis.context} context to {output_file}")
    print(f"  Density: {analysis.density:.2f} | Pattern: {analysis.pattern}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python -m src.cli.bake <input.html> <output.css> [context]")
        print("  context: narrative | dashboard | form | minimal")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    context = sys.argv[3] if len(sys.argv) > 3 else None
    
    if context and context not in ['narrative', 'dashboard', 'form', 'minimal']:
        print(f"Error: Unknown context '{context}'")
        sys.exit(1)
    
    bake(input_file, output_file, context)

if __name__ == '__main__':
    main()