/* =========================================================
   STYLE PRESETS — 5 distinct visual DNAs
   Each preset is a full override of type, radii, spacing,
   density, borders, card treatments, radiance defaults.
   ========================================================= */

window.__GROTHOUSE_PRESETS__ = [
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: 'Serif display · generous whitespace',
    vars: {
      '--g-f-display': "'Source Serif 4', Georgia, serif",
      '--g-f-body':    "'Outfit', -apple-system, sans-serif",
      '--g-f-mono':    "'JetBrains Mono', monospace",
      '--pv-title-weight': '700',
      '--pv-title-italic-weight': '400',
      '--pv-card-bg':  'var(--g-card)',
      '--pv-card-border': '1px solid var(--g-border)',
      '--pv-card-backdrop': 'none',
      '--pv-card-shadow': '0 10px 30px rgba(0,0,0,0.25)',
      '--pv-hero-align': 'left',
      '--pv-hero-padding': '100px 60px 60px',
      '--pv-title-max': '18ch',
      '--pv-section-bg': 'transparent',
      '--pv-accent-stripe': '1px'
    },
    defaults: { orbs: 1.0, noise: 0.35, glow: 1.0, grid: 0.6, radius: 6, density: 1.0, letter: -0.02 }
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    tagline: 'Mono-first · hard edges · heavy rules',
    vars: {
      '--g-f-display': "'JetBrains Mono', ui-monospace, monospace",
      '--g-f-body':    "'JetBrains Mono', ui-monospace, monospace",
      '--g-f-mono':    "'JetBrains Mono', ui-monospace, monospace",
      '--pv-title-weight': '700',
      '--pv-title-italic-weight': '500',
      '--pv-card-bg':  'transparent',
      '--pv-card-border': '2px solid var(--g-accent)',
      '--pv-card-backdrop': 'none',
      '--pv-card-shadow': 'none',
      '--pv-hero-align': 'left',
      '--pv-hero-padding': '80px 60px 60px',
      '--pv-title-max': '22ch',
      '--pv-section-bg': 'transparent',
      '--pv-accent-stripe': '4px'
    },
    defaults: { orbs: 0.25, noise: 0.5, glow: 0.3, grid: 1.4, radius: 0, density: 0.75, letter: 0 }
  },
  {
    id: 'glass',
    name: 'Glass',
    tagline: 'Frosted surfaces · maximum radiance',
    vars: {
      '--g-f-display': "'Outfit', -apple-system, sans-serif",
      '--g-f-body':    "'Outfit', -apple-system, sans-serif",
      '--g-f-mono':    "'JetBrains Mono', monospace",
      '--pv-title-weight': '300',
      '--pv-title-italic-weight': '300',
      '--pv-card-bg':  'rgba(255,255,255,0.04)',
      '--pv-card-border': '1px solid rgba(255,255,255,0.10)',
      '--pv-card-backdrop': 'blur(20px) saturate(140%)',
      '--pv-card-shadow': '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      '--pv-hero-align': 'left',
      '--pv-hero-padding': '120px 60px 80px',
      '--pv-title-max': '20ch',
      '--pv-section-bg': 'transparent',
      '--pv-accent-stripe': '1px'
    },
    defaults: { orbs: 1.8, noise: 0.15, glow: 1.6, grid: 0.4, radius: 20, density: 1.2, letter: -0.025 }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Sans only · flat · near-monochrome',
    vars: {
      '--g-f-display': "'Outfit', -apple-system, sans-serif",
      '--g-f-body':    "'Outfit', -apple-system, sans-serif",
      '--g-f-mono':    "'JetBrains Mono', monospace",
      '--pv-title-weight': '500',
      '--pv-title-italic-weight': '400',
      '--pv-card-bg':  'transparent',
      '--pv-card-border': '1px solid var(--g-border)',
      '--pv-card-backdrop': 'none',
      '--pv-card-shadow': 'none',
      '--pv-hero-align': 'left',
      '--pv-hero-padding': '120px 80px 80px',
      '--pv-title-max': '16ch',
      '--pv-section-bg': 'transparent',
      '--pv-accent-stripe': '0px'
    },
    defaults: { orbs: 0.0, noise: 0.0, glow: 0.3, grid: 0.0, radius: 2, density: 1.4, letter: -0.03 }
  },
  {
    id: 'maximalist',
    name: 'Maximalist',
    tagline: 'Gradients · oversize type · chromatic',
    vars: {
      '--g-f-display': "'Source Serif 4', Georgia, serif",
      '--g-f-body':    "'Outfit', -apple-system, sans-serif",
      '--g-f-mono':    "'JetBrains Mono', monospace",
      '--pv-title-weight': '700',
      '--pv-title-italic-weight': '400',
      '--pv-card-bg':  'linear-gradient(145deg, rgba(var(--g-accent-rgb),0.14), rgba(var(--g-secondary-rgb),0.06) 60%, transparent)',
      '--pv-card-border': '1px solid rgba(var(--g-accent-rgb),0.35)',
      '--pv-card-backdrop': 'none',
      '--pv-card-shadow': '0 20px 60px rgba(var(--g-accent-rgb),0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
      '--pv-hero-align': 'left',
      '--pv-hero-padding': '140px 60px 100px',
      '--pv-title-max': '14ch',
      '--pv-section-bg': 'radial-gradient(ellipse at top, rgba(var(--g-accent-rgb),0.06), transparent 60%)',
      '--pv-accent-stripe': '2px'
    },
    defaults: { orbs: 2.0, noise: 0.25, glow: 2.0, grid: 0.5, radius: 14, density: 1.3, letter: -0.03 }
  }
];

/* =========================================================
   FONT PAIRS — overlay on top of preset fonts
   ========================================================= */
window.__GROTHOUSE_FONT_PAIRS__ = [
  { id: 'default',   name: 'Preset Default', display: null, body: null, mono: null },
  { id: 'serif',     name: 'Serif × Sans',  display: "'Source Serif 4', Georgia, serif", body: "'Outfit', sans-serif",    mono: "'JetBrains Mono', monospace" },
  { id: 'sans',      name: 'Sans × Sans',   display: "'Outfit', sans-serif",              body: "'Outfit', sans-serif",    mono: "'JetBrains Mono', monospace" },
  { id: 'mono',      name: 'Mono × Mono',   display: "'JetBrains Mono', monospace",       body: "'JetBrains Mono', monospace", mono: "'JetBrains Mono', monospace" },
  { id: 'dramatic',  name: 'Serif × Mono',  display: "'Source Serif 4', Georgia, serif", body: "'JetBrains Mono', monospace", mono: "'JetBrains Mono', monospace" }
];

/* =========================================================
   LAYOUT VARIANTS — hero composition
   ========================================================= */
window.__GROTHOUSE_LAYOUTS__ = [
  { id: 'classic',    name: 'Classic',    desc: 'Left-aligned stack' },
  { id: 'split',      name: 'Split',      desc: '2-col · copy + visual' },
  { id: 'centered',   name: 'Centered',   desc: 'Stacked mid-axis' },
  { id: 'asymmetric', name: 'Asymmetric', desc: 'Oversize title · offset meta' }
];
