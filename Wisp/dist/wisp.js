/**
 * Wisp Runtime - Browser Version
 * 2KB minified - analyzes DOM and injects context styles
 */

(function() {
  'use strict';

  const Wisp = {
    version: '0.1.0',
    
    defaults: {
      densityThreshold: { low: 0.3, high: 0.7 },
      motionPrefers: matchMedia('(prefers-reduced-motion: reduce)').matches
    },

    analyzeContentDensity(container) {
      const text = container.innerText || '';
      const elements = container.querySelectorAll('*').length;
      const textLength = text.length;
      const density = elements > 0 ? textLength / elements : 0;
      return Math.min(density / 500, 1);
    },

    detectReadingPattern(container) {
      const p = container.querySelectorAll('p').length;
      const h = container.querySelectorAll('h1,h2,h3,h4,h5,h6').length;
      const l = container.querySelectorAll('ul,ol').length;
      const c = container.querySelectorAll('pre,code').length;
      const total = p + h + l + c || 1;
      
      const ratios = [
        ['prose', p/total], ['navigational', h/total],
        ['structured', l/total], ['technical', c/total]
      ];
      return ratios.sort((a,b) => b[1]-a[1])[0][0];
    },

    detectContext(container) {
      const hasTable = container.querySelector('table') !== null;
      const cards = container.querySelectorAll('article,[data-wisp-card]').length;
      const inputs = container.querySelectorAll('input,select,textarea').length;
      const isForm = container.querySelector('form') && inputs > 2;
      
      if (hasTable || cards > 3) return 'dashboard';
      if (isForm) return 'form';
      if (this.detectReadingPattern(container) === 'prose') return 'narrative';
      return 'minimal';
    },

    generateVariables(analysis) {
      const d = analysis.density;
      const spacing = d > 0.7 ? 0.5 : d > 0.3 ? 1 : 1.5;
      
      const contexts = {
        narrative: { lh: 1.7, mw: '65ch', fs: '1.125rem' },
        dashboard: { lh: 1.4, mw: '100%', fs: '0.875rem' },
        form: { lh: 1.5, mw: '60ch', fs: '1rem' },
        minimal: { lh: 1.6, mw: '70ch', fs: '1rem' }
      };
      
      const c = contexts[analysis.context];
      return {
        '--wisp-density': d.toFixed(2),
        '--wisp-context': analysis.context,
        '--wisp-pattern': analysis.pattern,
        '--wisp-spacing-unit': `${spacing}rem`,
        '--wisp-line-height': c.lh,
        '--wisp-max-width': c.mw,
        '--wisp-base-font': c.fs,
        '--wisp-motion': this.defaults.motionPrefers ? '0ms' : '200ms'
      };
    },

    scan(container = document.body) {
      const analysis = {
        density: this.analyzeContentDensity(container),
        pattern: this.detectReadingPattern(container),
        context: this.detectContext(container)
      };

      const vars = this.generateVariables(analysis);
      let style = document.getElementById('wisp-context-styles');
      
      if (!style) {
        style = document.createElement('style');
        style.id = 'wisp-context-styles';
        document.head.appendChild(style);
      }

      const css = Object.entries(vars).map(([k,v]) => `  ${k}: ${v};`).join('\n');
      style.textContent = `:root {\n${css}\n}`;
      container.setAttribute('data-wisp-active', analysis.context);

      // Enhancements
      if (analysis.context === 'narrative') {
        container.querySelectorAll('details[data-wisp-expand="auto"]').forEach(el => el.open = true);
      }

      // Add skip link for deep content
      const depth = this.measureDepth(container);
      if (depth > 4 && !document.getElementById('wisp-skip-link')) {
        const main = container.querySelector('main') || container;
        main.id = main.id || 'wisp-main-content';
        const skip = document.createElement('a');
        skip.id = 'wisp-skip-link';
        skip.href = `#${main.id}`;
        skip.textContent = 'Skip to content';
        skip.setAttribute('data-wisp-skip', '');
        document.body.insertBefore(skip, document.body.firstChild);
      }

      return analysis;
    },

    measureDepth(container) {
      let max = 0;
      const walk = (el, d) => {
        max = Math.max(max, d);
        el.children.forEach(c => walk(c, d+1));
      };
      walk(container, 0);
      return max;
    }
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Wisp.scan());
  } else {
    Wisp.scan();
  }

  window.Wisp = Wisp;
})();