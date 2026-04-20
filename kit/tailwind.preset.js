/**
 * Grothouse Design System — Tailwind v4 preset
 * Usage: import into your tailwind.config.js as `presets: [require('./tailwind.preset.js')]`
 * Or for Tailwind v4 CSS-first: @import the grothouse-system.css and use the @theme block below.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Base greys
        slate: '#757C88',
        stone: '#59788E',
        spruce: '#2C3E4C',
        mist: '#B8BCC8',
        fog: '#D8DCE4',
        // Entity-driven (CSS var backed — change [data-entity] to reskin)
        accent:      'var(--g-accent)',
        'accent-hot':'var(--g-accent-hot)',
        secondary:   'var(--g-secondary)',
        bg:          'var(--g-bg)',
        'bg-deep':   'var(--g-bg-deep)',
        card:        'var(--g-card)',
        'card-mid':  'var(--g-card-mid)',
        fg:          'var(--g-fg)',
        'fg-strong': 'var(--g-fg-strong)',
        'fg-muted':  'var(--g-fg-muted)',
        'fg-stone':  'var(--g-fg-stone)',
      },
      fontFamily: {
        display: ['Source Serif 4', 'Source Serif Pro', 'Georgia', 'serif'],
        body:    ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(var(--g-accent-rgb), 0.25)',
        'glow':    '0 0 30px rgba(var(--g-accent-rgb), 0.35)',
        'glow-lg': '0 0 60px rgba(var(--g-accent-rgb), 0.45)',
        'card-hover':
          '0 20px 40px -12px rgba(0,0,0,0.35), 0 0 30px rgba(var(--g-accent-rgb), 0.18)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, var(--g-accent), var(--g-accent-hot))',
        'divider-glow':
          'linear-gradient(90deg, var(--g-accent), var(--g-accent-hot))',
      },
      letterSpacing: {
        industrial: '0.28em',
        'industrial-wide': '0.32em',
      },
      animation: {
        'aurora-drift': 'g-drift 14s ease-in-out infinite',
      },
      keyframes: {
        'g-drift': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(28px,-22px) scale(1.08)' },
          '66%':     { transform: 'translate(-22px,18px) scale(0.96)' },
        },
      },
    },
  },
};

/* =================================================================
   TAILWIND v4 CSS-FIRST VERSION (recommended — matches g26x stack)
   Paste this into your globals.css after @import "tailwindcss";
   =================================================================

@theme {
  --color-slate:   #757C88;
  --color-stone:   #59788E;
  --color-spruce:  #2C3E4C;

  --color-accent:      var(--g-accent);
  --color-accent-hot:  var(--g-accent-hot);
  --color-secondary:   var(--g-secondary);
  --color-bg:          var(--g-bg);
  --color-card:        var(--g-card);
  --color-fg:          var(--g-fg);
  --color-fg-strong:   var(--g-fg-strong);
  --color-fg-muted:    var(--g-fg-muted);

  --font-display: 'Source Serif 4', Georgia, serif;
  --font-body:    'Outfit', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --tracking-industrial: 0.28em;

  --shadow-glow-sm: 0 0 20px rgba(var(--g-accent-rgb), 0.25);
  --shadow-glow:    0 0 30px rgba(var(--g-accent-rgb), 0.35);
  --shadow-glow-lg: 0 0 60px rgba(var(--g-accent-rgb), 0.45);

  --animate-aurora-drift: g-drift 14s ease-in-out infinite;
}
*/
