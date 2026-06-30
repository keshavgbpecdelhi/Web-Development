#!/usr/bin/env python3
"""
Wisp Scanner Tests
Run: python -m pytest tests/test_scanner.py -v
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.core.scanner import WispScanner, ContentAnalysis

class TestScanner:
    def test_narrative_detection(self):
        html = """
        <article>
            <h1>Story</h1>
            <p>First paragraph...</p>
            <p>Second paragraph...</p>
            <p>Third paragraph...</p>
        </article>
        """
        scanner = WispScanner(html)
        analysis = scanner.analyze()
        
        assert analysis.context == 'narrative'
        assert analysis.pattern == 'prose'
        assert analysis.density > 0
    
    def test_dashboard_detection(self):
        html = """
        <main>
            <article>Card 1</article>
            <article>Card 2</article>
            <article>Card 3</article>
            <article>Card 4</article>
            <table><tr><td>Data</td></tr></table>
        </main>
        """
        scanner = WispScanner(html)
        analysis = scanner.analyze()
        
        assert analysis.context == 'dashboard'
    
    def test_form_detection(self):
        html = """
        <form>
            <input type="text">
            <input type="email">
            <select><option>1</option></select>
            <textarea></textarea>
        </form>
        """
        scanner = WispScanner(html)
        analysis = scanner.analyze()
        
        assert analysis.context == 'form'
    
    def test_css_generation(self):
        html = "<p>Test content</p>"
        scanner = WispScanner(html)
        css = scanner.generate_css()
        
        assert '--wisp-context:' in css
        assert '--wisp-density:' in css
        assert 'min-width' not in css  # Should use max-width
    
    def test_density_calculation(self):
        # High density: lots of text, few elements
        html = "<p>" + "word " * 1000 + "</p>"
        scanner = WispScanner(html)
        density = scanner.analyze_content_density()
        
        assert 0 <= density <= 1
        assert density > 0.5  # Should be high density


if __name__ == '__main__':
    # Run simple tests without pytest
    test = TestScanner()
    
    print("Running Wisp Scanner tests...")
    
    try:
        test.test_narrative_detection()
        print("✓ Narrative detection")
        
        test.test_dashboard_detection()
        print("✓ Dashboard detection")
        
        test.test_form_detection()
        print("✓ Form detection")
        
        test.test_css_generation()
        print("✓ CSS generation")
        
        test.test_density_calculation()
        print("✓ Density calculation")
        
        print("\n✅ All tests passed!")
        
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
        sys.exit(1)