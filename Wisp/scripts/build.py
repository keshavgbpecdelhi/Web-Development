#!/usr/bin/env python3
"""
Build script for Wisp
Generates distribution files
"""

import os
import sys
import shutil
import glob

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

def build():
    print("🌬️  Building Wisp...")
    
    # Clean dist directory (keep only .gitkeep if exists)
    os.makedirs('dist', exist_ok=True)
    
    # Remove old baked files, keep only core wisp files
    for f in glob.glob('dist/*'):
        if os.path.basename(f) not in ['.gitkeep', 'wisp.js', 'wisp.css', 'wisp.min.js', 'wisp.min.css']:
            os.remove(f)
            print(f"  🗑️  Removed {os.path.basename(f)}")

    # Copy core files
    shutil.copy('src/core/wisp.js', 'dist/wisp.js')
    shutil.copy('src/styles/wisp.css', 'dist/wisp.css')
    print("  ✓ Copied core files")

    # Try to minify JS (optional)
    try:
        import jsmin
        with open('dist/wisp.js', 'r') as f:
            minified = jsmin.jsmin(f.read())
        with open('dist/wisp.min.js', 'w') as f:
            f.write(minified)
        print("  ✓ Minified JS")
    except ImportError:
        print("  ⚠️  jsmin not installed, skipping JS minification (pip install jsmin)")

    # Try to minify CSS (optional)
    try:
        import rcssmin
        with open('dist/wisp.css', 'r') as f:
            minified = rcssmin.cssmin(f.read())
        with open('dist/wisp.min.css', 'w') as f:
            f.write(minified)
        print("  ✓ Minified CSS")
    except ImportError:
        print("  ⚠️  rcssmin not installed, skipping CSS minification (pip install rcssmin)")

    # Report sizes
    print("\n📦 Build complete:")
    core_files = ['wisp.js', 'wisp.css', 'wisp.min.js', 'wisp.min.css']
    total_size = 0
    
    for f in sorted(os.listdir('dist')):
        if f.startswith('.'):
            continue
        path = os.path.join('dist', f)
        size = os.path.getsize(path)
        size_kb = size / 1024
        marker = "  ✓" if f in core_files else "  📄"
        print(f"{marker} {f}: {size_kb:.2f}KB")
        if f in ['wisp.js', 'wisp.css']:
            total_size += size
    
    print(f"\n  📊 Core Total: {total_size/1024:.2f}KB (uncompressed)")
    print(f"  🎯 Target: <5KB compressed")

if __name__ == '__main__':
    build()