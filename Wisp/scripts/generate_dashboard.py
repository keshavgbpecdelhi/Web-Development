#!/usr/bin/env python3
"""
Generate interactive HTML dashboard for Wisp analysis
"""

import sys
import os
import json
from datetime import datetime
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.core.scanner import WispScanner

def generate_dashboard(output_dir='public'):
    os.makedirs(output_dir, exist_ok=True)
    
    # Analyze all fixtures
    fixtures = []
    fixtures_dir = 'tests/fixtures'
    
    for filename in os.listdir(fixtures_dir):
        if filename.endswith('.html'):
            filepath = os.path.join(fixtures_dir, filename)
            with open(filepath, 'r') as f:
                scanner = WispScanner(f.read())
                analysis = scanner.analyze()
                fixtures.append({
                    'name': filename,
                    'context': analysis.context,
                    'pattern': analysis.pattern,
                    'density': round(analysis.density, 4),
                    'depth': analysis.depth
                })
    
    # Build HTML dashboard
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wisp Analysis Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rotsl/wisp@main/dist/wisp.min.css">
    <style>
        body {{ max-width: 1200px; margin: 0 auto; padding: 20px; }}
        .dashboard-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }}
        .metric-card {{ 
            background: linear-gradient(135deg, var(--wisp-accent), #0052a3); 
            color: white; 
            padding: 20px; 
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }}
        .metric-value {{ font-size: 2.5em; font-weight: bold; margin: 10px 0; }}
        .metric-label {{ text-transform: uppercase; font-size: 0.8em; opacity: 0.9; }}
        .fixture-card {{ 
            border: 1px solid var(--wisp-border); 
            padding: 15px; 
            border-radius: 8px;
            transition: transform 0.2s;
        }}
        .fixture-card:hover {{ transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }}
        .context-badge {{ 
            display: inline-block; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 0.75em;
            font-weight: 600;
            text-transform: uppercase;
        }}
        .context-narrative {{ background: #e3f2fd; color: #1976d2; }}
        .context-dashboard {{ background: #f3e5f5; color: #7b1fa2; }}
        .context-form {{ background: #e8f5e9; color: #388e3c; }}
        .context-minimal {{ background: #fff3e0; color: #f57c00; }}
        .chart-container {{ height: 300px; margin: 20px 0; }}
    </style>
</head>
<body>
    <header>
        <h1>🌬️ Wisp Analysis Dashboard</h1>
        <p>Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
    </header>
    
    <section class="dashboard-grid">
        <div class="metric-card">
            <div class="metric-label">Total Fixtures</div>
            <div class="metric-value">{len(fixtures)}</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Contexts Detected</div>
            <div class="metric-value">{len(set(f['context'] for f in fixtures))}</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Avg Density</div>
            <div class="metric-value">{sum(f['density'] for f in fixtures) / len(fixtures):.2f}</div>
        </div>
    </section>
    
    <h2>Fixture Analysis</h2>
    <div class="dashboard-grid">
        {''.join(f'''
        <div class="fixture-card">
            <h3>{f['name']}</h3>
            <span class="context-badge context-{f['context']}">{f['context']}</span>
            <div style="margin-top: 10px;">
                <div><strong>Pattern:</strong> {f['pattern']}</div>
                <div><strong>Density:</strong> {f['density']:.4f}</div>
                <div><strong>Depth:</strong> {f['depth']}</div>
            </div>
        </div>
        ''' for f in fixtures)}
    </div>
    
    <h2>Context Distribution</h2>
    <div id="chart" class="chart-container"></div>
    
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script>
        const fixtures = {json.dumps(fixtures)};
        
        // Context distribution pie chart
        const contexts = {{}};
        fixtures.forEach(f => {{
            contexts[f.context] = (contexts[f.context] || 0) + 1;
        }});
        
        const data = [{{
            values: Object.values(contexts),
            labels: Object.keys(contexts),
            type: 'pie',
            hole: 0.4,
            marker: {{
                colors: ['#1976d2', '#7b1fa2', '#388e3c', '#f57c00']
            }}
        }}];
        
        const layout = {{
            showlegend: true,
            legend: {{ orientation: 'h' }},
            margin: {{ t: 10, b: 10, l: 10, r: 10 }}
        }};
        
        Plotly.newPlot('chart', data, layout, {{responsive: true}});
    </script>
</body>
</html>"""
    
    output_path = os.path.join(output_dir, 'dashboard.html')
    with open(output_path, 'w') as f:
        f.write(html)
    
    print(f"✓ Dashboard generated: {output_path}")
    return output_path

if __name__ == '__main__':
    generate_dashboard()