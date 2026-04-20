/* global React */
const { useState: useStateC, useEffect: useEffectC, useMemo: useMemoC } = React;

/* =========================================================
   Sidebar controls — presets, fonts, layout, sliders, entity picker
   ========================================================= */
function Slider({ label, value, min, max, step, onChange, suffix, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="pg-slider">
      <div className="pg-slider-head">
        <span className="pg-slider-label">{label}</span>
        <span className="pg-slider-val">{(format ? format(value) : value.toFixed(step < 0.1 ? 2 : (step < 1 ? 1 : 0)))}{suffix || ''}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ '--pct': pct + '%' }}
        className="pg-range"
      />
    </div>
  );
}

function MiniSwatch({ entity }) {
  const a = entity.accent.dark, s = entity.secondary.dark;
  return (
    <div className="pg-entity-swatch" style={{
      background: `linear-gradient(135deg, ${a} 0%, ${s} 100%)`,
      boxShadow: `0 0 10px ${a}66, inset 0 0 0 1px rgba(255,255,255,0.08)`
    }} />
  );
}

function PresetCard({ preset, active, onClick }) {
  return (
    <button className={`pg-preset${active ? ' active' : ''}`} onClick={onClick} data-preset={preset.id}>
      <div className="pg-preset-preview" data-preset={preset.id}>
        <div className="pg-preset-heading">Aa</div>
        <div className="pg-preset-sub">—</div>
      </div>
      <div className="pg-preset-name">{preset.name}</div>
      <div className="pg-preset-tag">{preset.tagline}</div>
    </button>
  );
}

function Sidebar(props) {
  const {
    entityId, setEntityId,
    theme, setTheme,
    preset, setPreset,
    fontPair, setFontPair,
    layout, setLayout,
    sliders, setSliders,
    hueShift, setHueShift,
    copied, copy,
    TOKENS, PRESETS, FONT_PAIRS, LAYOUTS,
    filter, setFilter, q, setQ
  } = props;

  const archetypes = useMemoC(() => ['all', ...Array.from(new Set(TOKENS.entities.map(e => e.archetype)))], [TOKENS]);
  const filtered = useMemoC(() => TOKENS.entities.filter(e => {
    if (filter !== 'all' && e.archetype !== filter) return false;
    if (q && !e.name.toLowerCase().includes(q.toLowerCase()) && !e.ticker.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [filter, q, TOKENS]);

  const resetSliders = () => {
    const p = PRESETS.find(pp => pp.id === preset);
    if (p) setSliders({ ...p.defaults });
    setHueShift(0);
  };

  return (
    <aside className="pg-sidebar">
      <div className="pg-brand">
        <h2 className="pg-title">Grothouse System</h2>
        <div className="pg-subtitle">Theme Playground · {TOKENS.entities.length} entities</div>
        <button className="pg-universal-btn" onClick={() => window.__pgResetUniversal && window.__pgResetUniversal()}>
          <span className="pg-univ-dot" />
          <span className="pg-univ-label">Reset to Universal</span>
          <span className="pg-univ-sub">Grothouse Family</span>
        </button>
      </div>

      {/* ========== STYLE PRESETS ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Style DNA</span>
          <span className="pg-section-count">{PRESETS.length}</span>
        </div>
        <div className="pg-preset-grid">
          {PRESETS.map(p => (
            <PresetCard key={p.id} preset={p} active={p.id === preset} onClick={() => setPreset(p.id)} />
          ))}
        </div>
      </div>

      {/* ========== RADIANCE SLIDERS ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Radiance</span>
          <button className="pg-reset-btn" onClick={resetSliders}>Reset</button>
        </div>
        <Slider label="Orb Intensity" min={0} max={2} step={0.05} value={sliders.orbs}
                onChange={v => setSliders({ ...sliders, orbs: v })} />
        <Slider label="Noise Grain"   min={0} max={1} step={0.02} value={sliders.noise}
                onChange={v => setSliders({ ...sliders, noise: v })} />
        <Slider label="Text Glow"     min={0} max={2} step={0.05} value={sliders.glow}
                onChange={v => setSliders({ ...sliders, glow: v })} />
        <Slider label="Grid Texture"  min={0} max={1.5} step={0.05} value={sliders.grid}
                onChange={v => setSliders({ ...sliders, grid: v })} />
      </div>

      {/* ========== FORM SLIDERS ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Form</span>
        </div>
        <Slider label="Corner Radius"  min={0}    max={24}  step={1}    value={sliders.radius}
                suffix="px" onChange={v => setSliders({ ...sliders, radius: v })} />
        <Slider label="Density"        min={0.6}  max={1.6} step={0.05} value={sliders.density}
                suffix="×" onChange={v => setSliders({ ...sliders, density: v })} />
        <Slider label="Letter Tight"   min={-0.04} max={0.02} step={0.005} value={sliders.letter}
                format={v => (v * 1000).toFixed(0)} suffix=" /1000em"
                onChange={v => setSliders({ ...sliders, letter: v })} />
        <Slider label="Hue Shift"      min={-30}  max={30}  step={1}    value={hueShift}
                suffix="°" onChange={setHueShift} />
      </div>

      {/* ========== FONT PAIRS ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Typography</span>
        </div>
        <div className="pg-font-grid">
          {FONT_PAIRS.map(f => (
            <button key={f.id} className={`pg-font-btn${f.id === fontPair ? ' active' : ''}`}
                    onClick={() => setFontPair(f.id)}
                    style={{ fontFamily: f.display || 'var(--g-f-display)' }}>
              <span className="pg-font-sample">Aa</span>
              <span className="pg-font-name">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========== LAYOUT ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Layout</span>
        </div>
        <div className="pg-layout-grid">
          {LAYOUTS.map(l => (
            <button key={l.id} className={`pg-layout-btn${l.id === layout ? ' active' : ''}`}
                    onClick={() => setLayout(l.id)}>
              <LayoutIcon id={l.id} />
              <div className="pg-layout-name">{l.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ========== THEME MODE ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Mode</span>
        </div>
        <div className="pg-mode-toggle">
          <button className={`pg-mode-btn${theme === 'dark' ? ' on' : ''}`} onClick={() => setTheme('dark')}>◐ Dark</button>
          <button className={`pg-mode-btn${theme === 'light' ? ' on' : ''}`} onClick={() => setTheme('light')}>◑ Light</button>
        </div>
      </div>

      {/* ========== ENTITY PICKER ========== */}
      <div className="pg-section">
        <div className="pg-section-head">
          <span className="pg-section-label">Entity · {filtered.length}</span>
        </div>
        <input className="pg-search" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="pg-filter-row">
          {archetypes.map(a => (
            <button key={a} className={`pg-chip${filter === a ? ' active' : ''}`} onClick={() => setFilter(a)}>
              {a.replace('_', ' ')}
            </button>
          ))}
        </div>
        <div className="pg-entity-list">
          {filtered.map(e => (
            <button key={e.id} className={`pg-entity-btn${e.id === entityId ? ' active' : ''}`} onClick={() => setEntityId(e.id)}>
              <MiniSwatch entity={e} />
              <div className="pg-entity-meta">
                <div className="pg-entity-name">{e.name}</div>
                <div className="pg-entity-sub">{e.ticker} · {e.archetype.replace('_', ' ')}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ========== EXPORT ========== */}
      <div className="pg-section">
        <div className="pg-section-head"><span className="pg-section-label">Export</span></div>
        <div className="pg-copy-row">
          <button className={`pg-copy-btn${copied === 'css' ? ' copied' : ''}`} onClick={() => copy('css')}>{copied === 'css' ? '✓ CSS' : 'CSS'}</button>
          <button className={`pg-copy-btn${copied === 'json' ? ' copied' : ''}`} onClick={() => copy('json')}>{copied === 'json' ? '✓ JSON' : 'JSON'}</button>
          <button className={`pg-copy-btn${copied === 'react' ? ' copied' : ''}`} onClick={() => copy('react')}>{copied === 'react' ? '✓ JSX' : 'JSX'}</button>
        </div>
      </div>
    </aside>
  );
}

function LayoutIcon({ id }) {
  if (id === 'classic')    return <svg viewBox="0 0 40 28" className="pg-layout-icon"><rect x="3"  y="4"  width="20" height="2.5" rx="1" /><rect x="3"  y="9"  width="28" height="2.5" rx="1" /><rect x="3"  y="14" width="16" height="1.5" rx="0.75" opacity="0.5" /><rect x="3"  y="20" width="8" height="4" rx="1" opacity="0.7" /></svg>;
  if (id === 'split')      return <svg viewBox="0 0 40 28" className="pg-layout-icon"><rect x="3"  y="6"  width="16" height="2.5" rx="1" /><rect x="3"  y="11" width="14" height="1.5" rx="0.75" opacity="0.5" /><rect x="22" y="4" width="15" height="20" rx="1.5" opacity="0.8" /></svg>;
  if (id === 'centered')   return <svg viewBox="0 0 40 28" className="pg-layout-icon"><rect x="14" y="5"  width="12" height="2" rx="1" opacity="0.6" /><rect x="8"  y="10" width="24" height="2.5" rx="1" /><rect x="11" y="15" width="18" height="1.5" rx="0.75" opacity="0.5" /><rect x="16" y="21" width="8" height="3" rx="1" opacity="0.7" /></svg>;
  return                          <svg viewBox="0 0 40 28" className="pg-layout-icon"><rect x="3"  y="3"  width="34" height="6" rx="1" /><rect x="3"  y="12" width="10" height="1.5" rx="0.75" opacity="0.5" /><rect x="16" y="14" width="21" height="1.5" rx="0.75" opacity="0.4" /><rect x="16" y="18" width="18" height="1.5" rx="0.75" opacity="0.3" /></svg>;
}

window.pgSidebar = Sidebar;
