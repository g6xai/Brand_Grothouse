import React, { useState, useEffect, useCallback, useRef } from 'react';
import tokens from '../kit/tokens.json';

const PRESETS = [
  { id: 'editorial', name: 'Editorial', tagline: 'Serif display, generous whitespace' },
  { id: 'brutalist', name: 'Brutalist', tagline: 'Mono-first, hard edges' },
  { id: 'glass', name: 'Glass', tagline: 'Frosted surfaces, max radiance' },
  { id: 'minimal', name: 'Minimal', tagline: 'Sans only, flat, near-monochrome' },
  { id: 'maximalist', name: 'Maximalist', tagline: 'Gradients everywhere, oversize type' },
];

const PRESET_DEFAULTS = {
  editorial:  { orbs: 1.0, noise: 0.35, glow: 1.0, grid: 0.6, radius: 6 },
  brutalist:  { orbs: 0.25, noise: 0.5, glow: 0.3, grid: 1.4, radius: 0 },
  glass:      { orbs: 1.8, noise: 0.15, glow: 1.6, grid: 0.4, radius: 20 },
  minimal:    { orbs: 0.0, noise: 0.0, glow: 0.3, grid: 0.0, radius: 2 },
  maximalist: { orbs: 2.0, noise: 0.25, glow: 2.0, grid: 0.5, radius: 14 },
};

const LAYOUTS = [
  { id: 'classic', name: 'Classic' },
  { id: 'split', name: 'Split' },
  { id: 'centered', name: 'Centered' },
  { id: 'asymmetric', name: 'Asymmetric' },
];

const ARCHETYPES = Object.keys(tokens.archetypes);

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function lighten(hex, amt) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amt));
  const g = Math.min(255, Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amt));
  const b = Math.min(255, Math.round((n & 255) + (255 - (n & 255)) * amt));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

export default function App() {
  const [entityId, setEntityId] = useState('grothouse_family');
  const [theme, setTheme] = useState('dark');
  const [preset, setPreset] = useState('editorial');
  const [layout, setLayout] = useState('classic');
  const [tab, setTab] = useState('overview');

  const entity = tokens.entities.find(e => e.id === entityId) || tokens.entities[0];
  const arch = tokens.archetypes[entity.archetype];
  const surface = tokens.surfaceTones[entity.surfaceTone];

  const [accentDark, setAccentDark] = useState(entity.accent.dark);
  const [accentLight, setAccentLight] = useState(entity.accent.light);
  const [secondaryDark, setSecondaryDark] = useState(entity.secondary.dark);
  const [secondaryLight, setSecondaryLight] = useState(entity.secondary.light);

  const defaults = PRESET_DEFAULTS[preset];
  const [orbIntensity, setOrbIntensity] = useState(defaults.orbs);
  const [noiseIntensity, setNoiseIntensity] = useState(defaults.noise);
  const [glowIntensity, setGlowIntensity] = useState(defaults.glow);
  const [gridIntensity, setGridIntensity] = useState(defaults.grid);
  const [radius, setRadius] = useState(defaults.radius);

  useEffect(() => {
    setAccentDark(entity.accent.dark);
    setAccentLight(entity.accent.light);
    setSecondaryDark(entity.secondary.dark);
    setSecondaryLight(entity.secondary.light);
  }, [entityId]);

  useEffect(() => {
    const d = PRESET_DEFAULTS[preset];
    setOrbIntensity(d.orbs);
    setNoiseIntensity(d.noise);
    setGlowIntensity(d.glow);
    setGridIntensity(d.grid);
    setRadius(d.radius);
  }, [preset]);

  const accent = theme === 'light' ? accentLight : accentDark;
  const secondary = theme === 'light' ? secondaryLight : secondaryDark;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-entity', entity.id);
    root.setAttribute('data-archetype', entity.archetype);
    root.setAttribute('data-surface', entity.surfaceTone);
    root.setAttribute('data-glow', entity.glowLevel);
    root.setAttribute('data-theme', theme);

    root.style.setProperty('--g-accent', accent);
    root.style.setProperty('--g-accent-hot', lighten(accent, 0.15));
    root.style.setProperty('--g-secondary', secondary);
    root.style.setProperty('--g-accent-rgb', hexToRgb(accent));
    root.style.setProperty('--g-secondary-rgb', hexToRgb(secondary));
    root.style.setProperty('--g-orb-i', orbIntensity);
    root.style.setProperty('--g-noise-i', noiseIntensity);
    root.style.setProperty('--g-glow-i', glowIntensity);
    root.style.setProperty('--g-grid-i', gridIntensity);
    root.style.setProperty('--g-radii', radius + 'px');
  }, [accent, secondary, theme, entity, orbIntensity, noiseIntensity, glowIntensity, gridIntensity, radius]);

  const entitiesByArch = {};
  tokens.entities.forEach(e => {
    const a = e.archetype;
    if (!entitiesByArch[a]) entitiesByArch[a] = [];
    entitiesByArch[a].push(e);
  });

  const exportConfig = () => {
    const config = {
      entity: entity.id,
      name: entity.name,
      theme, preset, layout,
      accent: { dark: accentDark, light: accentLight },
      secondary: { dark: secondaryDark, light: secondaryLight },
      radiance: { orbs: orbIntensity, noise: noiseIntensity, glow: glowIntensity, grid: gridIntensity },
      radius,
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-${entity.id}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCssVars = () => {
    const vars = `--g-accent: ${accent};
--g-accent-hot: ${lighten(accent, 0.15)};
--g-secondary: ${secondary};
--g-accent-rgb: ${hexToRgb(accent)};
--g-secondary-rgb: ${hexToRgb(secondary)};
--g-orb-i: ${orbIntensity};
--g-noise-i: ${noiseIntensity};
--g-glow-i: ${glowIntensity};
--g-grid-i: ${gridIntensity};
--g-radii: ${radius}px;`;
    navigator.clipboard.writeText(vars);
  };

  return (
    <div className="dash">
      {/* ─── SIDEBAR ─── */}
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <span className="dash-logo-mark">G</span>
          <div>
            <div className="dash-logo-title">Brand Dashboard</div>
            <div className="dash-logo-sub">{entity.name}</div>
          </div>
        </div>

        <nav className="dash-nav">
          {[
            ['overview', 'Overview'],
            ['colors', 'Colors'],
            ['typography', 'Typography'],
            ['components', 'Components'],
            ['radiance', 'Radiance'],
            ['logos', 'Logos'],
            ['entities', 'Entities'],
            ['export', 'Export'],
          ].map(([id, label]) => (
            <button
              key={id}
              className={`dash-nav-item${tab === id ? ' active' : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-section">
          <label className="dash-label">Theme</label>
          <div className="dash-toggle-row">
            <button className={`dash-toggle${theme === 'dark' ? ' active' : ''}`} onClick={() => setTheme('dark')}>Dark</button>
            <button className={`dash-toggle${theme === 'light' ? ' active' : ''}`} onClick={() => setTheme('light')}>Light</button>
          </div>
        </div>

        <div className="dash-sidebar-section">
          <label className="dash-label">Entity</label>
          <select className="dash-select" value={entityId} onChange={e => setEntityId(e.target.value)}>
            {tokens.entities.map(e => (
              <option key={e.id} value={e.id}>{e.ticker} — {e.name}</option>
            ))}
          </select>
        </div>

        <div className="dash-sidebar-section">
          <label className="dash-label">Style Preset</label>
          <div className="dash-preset-grid">
            {PRESETS.map(p => (
              <button
                key={p.id}
                className={`dash-preset-btn${preset === p.id ? ' active' : ''}`}
                onClick={() => setPreset(p.id)}
                title={p.tagline}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="dash-sidebar-section">
          <label className="dash-label">Hero Layout</label>
          <div className="dash-preset-grid">
            {LAYOUTS.map(l => (
              <button
                key={l.id}
                className={`dash-preset-btn small${layout === l.id ? ' active' : ''}`}
                onClick={() => setLayout(l.id)}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="dash-main">
        {tab === 'overview' && (
          <OverviewTab
            entity={entity} arch={arch} theme={theme} accent={accent}
            secondary={secondary} preset={preset} layout={layout}
            orbIntensity={orbIntensity} glowIntensity={glowIntensity}
          />
        )}
        {tab === 'colors' && (
          <ColorsTab
            entity={entity} theme={theme} accent={accent} secondary={secondary}
            accentDark={accentDark} accentLight={accentLight}
            secondaryDark={secondaryDark} secondaryLight={secondaryLight}
            setAccentDark={setAccentDark} setAccentLight={setAccentLight}
            setSecondaryDark={setSecondaryDark} setSecondaryLight={setSecondaryLight}
            surface={surface}
          />
        )}
        {tab === 'typography' && <TypographyTab entity={entity} accent={accent} />}
        {tab === 'components' && <ComponentsTab entity={entity} accent={accent} radius={radius} />}
        {tab === 'radiance' && (
          <RadianceTab
            orbIntensity={orbIntensity} setOrbIntensity={setOrbIntensity}
            noiseIntensity={noiseIntensity} setNoiseIntensity={setNoiseIntensity}
            glowIntensity={glowIntensity} setGlowIntensity={setGlowIntensity}
            gridIntensity={gridIntensity} setGridIntensity={setGridIntensity}
            radius={radius} setRadius={setRadius}
            accent={accent} secondary={secondary}
          />
        )}
        {tab === 'logos' && <LogosTab theme={theme} />}
        {tab === 'entities' && (
          <EntitiesTab
            entities={tokens.entities}
            entitiesByArch={entitiesByArch}
            currentId={entityId}
            setEntityId={setEntityId}
            setTab={setTab}
          />
        )}
        {tab === 'export' && (
          <ExportTab
            entity={entity} theme={theme} preset={preset} accent={accent}
            secondary={secondary} orbIntensity={orbIntensity} noiseIntensity={noiseIntensity}
            glowIntensity={glowIntensity} gridIntensity={gridIntensity} radius={radius}
            exportConfig={exportConfig} copyCssVars={copyCssVars}
          />
        )}
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: OVERVIEW
   ────────────────────────────────────────────────────────────── */
function OverviewTab({ entity, arch, theme, accent, secondary, preset, layout, orbIntensity, glowIntensity }) {
  return (
    <div className="dash-tab">
      <div className="dash-hero-preview" data-layout={layout}>
        <div className="g-aurora-mesh" />
        <div className="g-orb g-orb-primary" style={{ width: 400, height: 400, top: '-15%', left: '-10%' }} />
        <div className="g-orb g-orb-sky" style={{ width: 320, height: 320, bottom: '-10%', right: '-5%', animationDelay: '-4s' }} />
        <div className="g-noise" />
        <div className="dash-hero-content">
          <span className="g-overline">{entity.ticker}</span>
          <h1 className="g-f-display g-text-glow dash-hero-title">{entity.name}</h1>
          <p className="dash-hero-tagline">{entity.tagline}</p>
          <div className="dash-hero-actions">
            <button className="g-btn g-btn-primary">Explore Brand</button>
            <button className="g-btn g-btn-ghost">View System</button>
          </div>
        </div>
      </div>

      <div className="dash-stats-row">
        <StatCard label="Archetype" value={entity.archetype.replace('_', ' ')} />
        <StatCard label="Surface" value={entity.surfaceTone} />
        <StatCard label="Glow Level" value={entity.glowLevel} />
        <StatCard label="Preset" value={preset} />
        <StatCard label="Layout" value={layout} />
        <StatCard label="Theme" value={theme} />
      </div>

      <div className="dash-grid-2">
        <div className="dash-panel">
          <h3 className="dash-panel-title">Color Snapshot</h3>
          <div className="dash-color-row">
            <div className="dash-color-chip" style={{ background: accent }} />
            <div>
              <div className="dash-color-name">{entity.accent.name}</div>
              <div className="dash-color-hex">{accent}</div>
            </div>
          </div>
          <div className="dash-color-row">
            <div className="dash-color-chip" style={{ background: secondary }} />
            <div>
              <div className="dash-color-name">{entity.secondary.name}</div>
              <div className="dash-color-hex">{secondary}</div>
            </div>
          </div>
        </div>
        <div className="dash-panel">
          <h3 className="dash-panel-title">Character</h3>
          <p className="dash-panel-body">{arch.character}</p>
          <div className="dash-meta-grid">
            <div className="dash-meta"><span className="dash-meta-label">Speed</span><span>{arch.animationSpeed}x</span></div>
            <div className="dash-meta"><span className="dash-meta-label">Motion</span><span>{arch.motion}</span></div>
            <div className="dash-meta"><span className="dash-meta-label">Border</span><span>{arch.borderStyle}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="dash-stat-card">
      <div className="dash-stat-label">{label}</div>
      <div className="dash-stat-value">{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: COLORS
   ────────────────────────────────────────────────────────────── */
function ColorsTab({
  entity, theme, accent, secondary,
  accentDark, accentLight, secondaryDark, secondaryLight,
  setAccentDark, setAccentLight, setSecondaryDark, setSecondaryLight,
  surface,
}) {
  const resetColors = () => {
    setAccentDark(entity.accent.dark);
    setAccentLight(entity.accent.light);
    setSecondaryDark(entity.secondary.dark);
    setSecondaryLight(entity.secondary.light);
  };

  return (
    <div className="dash-tab">
      <div className="dash-tab-header">
        <h2 className="g-f-display dash-tab-title">Color System</h2>
        <button className="g-btn g-btn-ghost" onClick={resetColors}>Reset to Default</button>
      </div>

      <div className="dash-grid-2">
        <div className="dash-panel">
          <h3 className="dash-panel-title">Accent</h3>
          <ColorEditor label="Dark Mode" value={accentDark} onChange={setAccentDark} name={entity.accent.name} />
          <ColorEditor label="Light Mode" value={accentLight} onChange={setAccentLight} name={entity.accent.name} />
        </div>
        <div className="dash-panel">
          <h3 className="dash-panel-title">Secondary</h3>
          <ColorEditor label="Dark Mode" value={secondaryDark} onChange={setSecondaryDark} name={entity.secondary.name} />
          <ColorEditor label="Light Mode" value={secondaryLight} onChange={setSecondaryLight} name={entity.secondary.name} />
        </div>
      </div>

      <h3 className="g-f-display dash-section-title">Grey Palette</h3>
      <div className="dash-color-strip">
        {Object.entries(tokens.base.grey).map(([name, hex]) => (
          <div key={name} className="dash-color-swatch-block">
            <div className="dash-color-swatch" style={{ background: hex }} />
            <div className="dash-swatch-name">{name}</div>
            <div className="dash-swatch-hex">{hex}</div>
          </div>
        ))}
      </div>

      <h3 className="g-f-display dash-section-title">Surface Tones ({entity.surfaceTone})</h3>
      <div className="dash-color-strip">
        {Object.entries(surface).map(([name, hex]) => (
          <div key={name} className="dash-color-swatch-block">
            <div className="dash-color-swatch" style={{ background: hex, border: hex === '#FFFFFF' ? '1px solid var(--g-border)' : 'none' }} />
            <div className="dash-swatch-name">{name}</div>
            <div className="dash-swatch-hex">{hex}</div>
          </div>
        ))}
      </div>

      <h3 className="g-f-display dash-section-title">Live Preview</h3>
      <div className="dash-color-preview-bar">
        <div className="dash-cpb-item" style={{ background: accent, color: '#fff' }}>Accent</div>
        <div className="dash-cpb-item" style={{ background: lighten(accent, 0.15), color: '#fff' }}>Accent Hot</div>
        <div className="dash-cpb-item" style={{ background: secondary, color: '#fff' }}>Secondary</div>
        <div className="dash-cpb-item" style={{ background: `rgba(${hexToRgb(accent)}, 0.16)`, color: 'var(--g-fg)' }}>Border</div>
        <div className="dash-cpb-item" style={{ background: `rgba(${hexToRgb(accent)}, 0.28)`, color: '#fff' }}>Border Strong</div>
      </div>
    </div>
  );
}

function ColorEditor({ label, value, onChange, name }) {
  return (
    <div className="dash-color-editor">
      <div className="dash-ce-row">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="dash-color-input" />
        <div>
          <div className="dash-ce-label">{label}</div>
          <input
            type="text"
            value={value}
            onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) onChange(e.target.value); }}
            className="dash-ce-hex"
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: TYPOGRAPHY
   ────────────────────────────────────────────────────────────── */
function TypographyTab({ entity, accent }) {
  return (
    <div className="dash-tab">
      <h2 className="g-f-display dash-tab-title">Typography</h2>

      <div className="dash-grid-3">
        <div className="dash-panel">
          <div className="dash-type-specimen" style={{ fontFamily: 'var(--g-f-display)' }}>Aa</div>
          <h4 className="dash-panel-subtitle">Display</h4>
          <p className="dash-type-family">Source Serif 4</p>
          <p className="dash-type-weights">400, 600, 700</p>
        </div>
        <div className="dash-panel">
          <div className="dash-type-specimen" style={{ fontFamily: 'var(--g-f-body)' }}>Aa</div>
          <h4 className="dash-panel-subtitle">Body</h4>
          <p className="dash-type-family">Outfit</p>
          <p className="dash-type-weights">300 - 800</p>
        </div>
        <div className="dash-panel">
          <div className="dash-type-specimen" style={{ fontFamily: 'var(--g-f-mono)' }}>Aa</div>
          <h4 className="dash-panel-subtitle">Mono / Industrial</h4>
          <p className="dash-type-family">JetBrains Mono</p>
          <p className="dash-type-weights">500, 700</p>
        </div>
      </div>

      <h3 className="g-f-display dash-section-title">Type Scale</h3>
      <div className="dash-type-scale">
        <div className="dash-type-row">
          <span className="dash-type-label">Hero H1</span>
          <span className="g-f-display g-text-glow" style={{ fontSize: 'clamp(38px, 6vw, 56px)', fontWeight: 700 }}>
            {entity.name}
          </span>
        </div>
        <div className="dash-type-row">
          <span className="dash-type-label">Section H2</span>
          <span className="g-f-display" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 700 }}>
            Section Heading
          </span>
        </div>
        <div className="dash-type-row">
          <span className="dash-type-label">H3</span>
          <span className="g-f-display" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700 }}>
            Subsection Title
          </span>
        </div>
        <div className="dash-type-row">
          <span className="dash-type-label">Overline</span>
          <span className="g-overline">{entity.ticker} // BRAND SYSTEM</span>
        </div>
        <div className="dash-type-row">
          <span className="dash-type-label">Body</span>
          <span style={{ fontSize: 14 }}>
            Built on faith. Driven by purpose. The Grothouse Family design system unifies 24 entities under one radiance language.
          </span>
        </div>
        <div className="dash-type-row">
          <span className="dash-type-label">Button</span>
          <span className="g-f-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Explore Now
          </span>
        </div>
        <div className="dash-type-row">
          <span className="dash-type-label">Tiny Label</span>
          <span className="g-tiny-label">ACTIVE ENTITY // V1.0</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: COMPONENTS
   ────────────────────────────────────────────────────────────── */
function ComponentsTab({ entity, accent, radius }) {
  const cardRef = useRef(null);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className="dash-tab">
      <h2 className="g-f-display dash-tab-title">Component Gallery</h2>

      <h3 className="g-f-display dash-section-title">Buttons</h3>
      <div className="dash-component-row">
        <button className="g-btn g-btn-primary">Primary Action</button>
        <button className="g-btn g-btn-ghost">Ghost Action</button>
        <button className="g-btn g-btn-primary" disabled style={{ opacity: 0.5 }}>Disabled</button>
      </div>

      <h3 className="g-f-display dash-section-title">Glow Cards</h3>
      <div className="dash-grid-3">
        {['R&D', 'Sales', 'Platforms'].map((label, i) => (
          <div key={label} className="g-card" onMouseMove={onMove}>
            <span className="g-overline">{['G6AI', 'COOP', 'G6X'][i]}</span>
            <h4 className="g-f-display" style={{ fontSize: 20, marginTop: 12 }}>{label}</h4>
            <p style={{ fontSize: 13, color: 'var(--g-fg-muted)', marginTop: 8 }}>
              Operational vertical within the G26x ecosystem.
            </p>
          </div>
        ))}
      </div>

      <h3 className="g-f-display dash-section-title">Dividers</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <div className="g-divider-glow" style={{ width: 120 }} />
        <div className="g-divider-glow" style={{ width: '100%', maxWidth: 400 }} />
      </div>

      <h3 className="g-f-display dash-section-title">Text Effects</h3>
      <div className="dash-panel" style={{ padding: 40, textAlign: 'center' }}>
        <h2 className="g-f-display g-text-glow" style={{ fontSize: 36, marginBottom: 16 }}>Text Glow</h2>
        <h2 className="g-f-display g-text-sparkle" style={{ fontSize: 36 }}>Text Sparkle</h2>
      </div>

      <h3 className="g-f-display dash-section-title">Overlines & Labels</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span className="g-overline">Standard Overline</span>
        <span className="g-tiny-label">TINY LABEL // METADATA</span>
      </div>

      <h3 className="g-f-display dash-section-title">Form Elements</h3>
      <div className="dash-grid-2">
        <div className="dash-panel">
          <label className="dash-label">Input Field</label>
          <input type="text" className="dash-form-input" placeholder="Enter value..." />
          <label className="dash-label" style={{ marginTop: 16 }}>Select</label>
          <select className="dash-form-input">
            <option>Option One</option>
            <option>Option Two</option>
          </select>
        </div>
        <div className="dash-panel">
          <label className="dash-label">Textarea</label>
          <textarea className="dash-form-input" rows={4} placeholder="Enter message..." />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: RADIANCE
   ────────────────────────────────────────────────────────────── */
function RadianceTab({
  orbIntensity, setOrbIntensity,
  noiseIntensity, setNoiseIntensity,
  glowIntensity, setGlowIntensity,
  gridIntensity, setGridIntensity,
  radius, setRadius,
  accent, secondary,
}) {
  return (
    <div className="dash-tab">
      <h2 className="g-f-display dash-tab-title">Radiance Controls</h2>

      <div className="dash-radiance-preview">
        <div className="g-aurora-mesh" />
        <div className="g-orb g-orb-primary" style={{ width: 480, height: 480, top: '-20%', left: '-15%' }} />
        <div className="g-orb g-orb-sky" style={{ width: 360, height: 360, bottom: '-15%', right: '-10%', animationDelay: '-4s' }} />
        <div className="g-orb g-orb-arctic" style={{ width: 260, height: 260, top: '30%', right: '15%', animationDelay: '-8s' }} />
        <div className="g-grid-tex" />
        <div className="g-noise" />
        <div className="dash-radiance-label">
          <h2 className="g-f-display g-text-glow" style={{ fontSize: 32 }}>Live Radiance Preview</h2>
          <p style={{ color: 'var(--g-fg-muted)', marginTop: 8 }}>Adjust sliders to see changes in real time</p>
        </div>
      </div>

      <div className="dash-grid-2" style={{ marginTop: 32 }}>
        <div className="dash-panel">
          <h3 className="dash-panel-title">Intensity Controls</h3>
          <SliderControl label="Orb Intensity" value={orbIntensity} onChange={setOrbIntensity} min={0} max={3} step={0.05} />
          <SliderControl label="Noise Intensity" value={noiseIntensity} onChange={setNoiseIntensity} min={0} max={1} step={0.05} />
          <SliderControl label="Glow Intensity" value={glowIntensity} onChange={setGlowIntensity} min={0} max={3} step={0.05} />
          <SliderControl label="Grid Intensity" value={gridIntensity} onChange={setGridIntensity} min={0} max={2} step={0.05} />
        </div>
        <div className="dash-panel">
          <h3 className="dash-panel-title">Shape & Geometry</h3>
          <SliderControl label="Border Radius" value={radius} onChange={setRadius} min={0} max={24} step={1} unit="px" />

          <div style={{ marginTop: 24 }}>
            <h4 className="dash-panel-subtitle">Quick Presets</h4>
            <div className="dash-preset-grid" style={{ marginTop: 8 }}>
              {Object.entries(PRESET_DEFAULTS).map(([id, d]) => (
                <button
                  key={id}
                  className="dash-preset-btn small"
                  onClick={() => {
                    setOrbIntensity(d.orbs);
                    setNoiseIntensity(d.noise);
                    setGlowIntensity(d.glow);
                    setGridIntensity(d.grid);
                    setRadius(d.radius);
                  }}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange, min, max, step, unit = '' }) {
  return (
    <div className="dash-slider">
      <div className="dash-slider-header">
        <span className="dash-slider-label">{label}</span>
        <span className="dash-slider-value">{typeof value === 'number' ? value.toFixed(step < 1 ? 2 : 0) : value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="dash-slider-input"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: LOGOS
   ────────────────────────────────────────────────────────────── */
function LogosTab({ theme }) {
  const variant = theme === 'light' ? 'light' : 'dark';
  const logoSets = [
    { name: 'Monogram', path: 'logos/01-monogram' },
    { name: 'Wordmark', path: 'logos/02-wordmark' },
    { name: 'Tech Mark', path: 'logos/03-tech' },
  ];

  return (
    <div className="dash-tab">
      <h2 className="g-f-display dash-tab-title">Logo Library</h2>
      <div className="dash-grid-3">
        {logoSets.map(s => (
          <div key={s.name} className="dash-panel dash-logo-panel">
            <h4 className="dash-panel-subtitle">{s.name}</h4>
            <div className="dash-logo-preview">
              <img src={`/${s.path}/${variant}.svg`} alt={s.name} />
            </div>
            <div className="dash-logo-meta">
              <span className="g-tiny-label">{variant.toUpperCase()} VARIANT</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--g-fg-muted)', fontSize: 13, marginTop: 24 }}>
        Toggle theme in the sidebar to preview dark/light logo variants.
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: ENTITIES
   ────────────────────────────────────────────────────────────── */
function EntitiesTab({ entities, entitiesByArch, currentId, setEntityId, setTab }) {
  return (
    <div className="dash-tab">
      <h2 className="g-f-display dash-tab-title">24 Entities</h2>
      {Object.entries(entitiesByArch).map(([arch, ents]) => (
        <div key={arch} style={{ marginBottom: 32 }}>
          <h3 className="g-f-display dash-section-title" style={{ textTransform: 'capitalize' }}>
            {arch.replace('_', ' ')}
          </h3>
          <div className="dash-entity-grid">
            {ents.map(e => (
              <button
                key={e.id}
                className={`dash-entity-card${e.id === currentId ? ' active' : ''}`}
                onClick={() => { setEntityId(e.id); setTab('overview'); }}
              >
                <div className="dash-entity-accent" style={{ background: e.accent.dark }} />
                <div className="dash-entity-info">
                  <span className="dash-entity-ticker">{e.ticker}</span>
                  <span className="dash-entity-name">{e.name}</span>
                  <span className="dash-entity-tagline">{e.tagline}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB: EXPORT
   ────────────────────────────────────────────────────────────── */
function ExportTab({
  entity, theme, preset, accent, secondary,
  orbIntensity, noiseIntensity, glowIntensity, gridIntensity, radius,
  exportConfig, copyCssVars,
}) {
  const cssVars = `--g-accent: ${accent};
--g-accent-hot: ${lighten(accent, 0.15)};
--g-secondary: ${secondary};
--g-accent-rgb: ${hexToRgb(accent)};
--g-secondary-rgb: ${hexToRgb(secondary)};
--g-orb-i: ${orbIntensity};
--g-noise-i: ${noiseIntensity};
--g-glow-i: ${glowIntensity};
--g-grid-i: ${gridIntensity};
--g-radii: ${radius}px;`;

  const htmlAttrs = `<html
  data-entity="${entity.id}"
  data-archetype="${entity.archetype}"
  data-surface="${entity.surfaceTone}"
  data-glow="${entity.glowLevel}"
  data-theme="${theme}">`;

  return (
    <div className="dash-tab">
      <h2 className="g-f-display dash-tab-title">Export & Integration</h2>

      <div className="dash-grid-2">
        <div className="dash-panel">
          <h3 className="dash-panel-title">Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="g-btn g-btn-primary" onClick={exportConfig}>Download JSON Config</button>
            <button className="g-btn g-btn-ghost" onClick={copyCssVars}>Copy CSS Variables</button>
          </div>
        </div>
        <div className="dash-panel">
          <h3 className="dash-panel-title">Current Config</h3>
          <div className="dash-meta-grid">
            <div className="dash-meta"><span className="dash-meta-label">Entity</span><span>{entity.name}</span></div>
            <div className="dash-meta"><span className="dash-meta-label">Theme</span><span>{theme}</span></div>
            <div className="dash-meta"><span className="dash-meta-label">Preset</span><span>{preset}</span></div>
            <div className="dash-meta"><span className="dash-meta-label">Accent</span><span>{accent}</span></div>
            <div className="dash-meta"><span className="dash-meta-label">Secondary</span><span>{secondary}</span></div>
          </div>
        </div>
      </div>

      <h3 className="g-f-display dash-section-title">CSS Variables</h3>
      <pre className="dash-code-block">{cssVars}</pre>

      <h3 className="g-f-display dash-section-title">HTML Attributes</h3>
      <pre className="dash-code-block">{htmlAttrs}</pre>
    </div>
  );
}
