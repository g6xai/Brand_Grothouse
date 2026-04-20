/* global React, ReactDOM */
const { useState, useEffect, useMemo } = React;

const TOKENS = window.__GROTHOUSE_TOKENS__;
const PRESETS = window.__GROTHOUSE_PRESETS__;
const FONT_PAIRS = window.__GROTHOUSE_FONT_PAIRS__;
const LAYOUTS = window.__GROTHOUSE_LAYOUTS__;
const { hexToRgb, lighten, shiftHue } = window.pgHelpers;
const Sidebar = window.pgSidebar;
const { Hero, PreviewCards, Spec } = window.pgPreview;

function App() {
  // Grothouse Family is the universal style — always the default on first load
  const [entityId, setEntityId]   = useState(() => localStorage.getItem('pg_entity') || 'grothouse_family');

  const resetToUniversal = () => {
    setEntityId('grothouse_family');
    setPreset('editorial');
    setFontPair('default');
    setLayout('classic');
    setTheme('dark');
    setHueShift(0);
    const p = PRESETS.find(pp => pp.id === 'editorial');
    if (p) setSliders({ ...p.defaults });
  };
  window.__pgResetUniversal = resetToUniversal;
  const [theme, setTheme]         = useState(() => localStorage.getItem('pg_theme')  || 'dark');
  const [preset, setPreset]       = useState(() => localStorage.getItem('pg_preset') || 'editorial');
  const [fontPair, setFontPair]   = useState(() => localStorage.getItem('pg_font')   || 'default');
  const [layout, setLayout]       = useState(() => localStorage.getItem('pg_layout') || 'classic');
  const [hueShift, setHueShift]   = useState(() => parseFloat(localStorage.getItem('pg_hue') || '0'));
  const [sliders, setSliders]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('pg_sliders')) || PRESETS[0].defaults; }
    catch { return PRESETS[0].defaults; }
  });
  const [filter, setFilter]       = useState('all');
  const [q, setQ]                 = useState('');
  const [copied, setCopied]       = useState(null);

  const entity = TOKENS.entities.find(e => e.id === entityId) || TOKENS.entities[0];
  const presetObj = PRESETS.find(p => p.id === preset) || PRESETS[0];
  const fontObj   = FONT_PAIRS.find(f => f.id === fontPair) || FONT_PAIRS[0];

  // When preset changes, reset sliders to its defaults (unless user modified via UI explicitly)
  const lastPresetRef = React.useRef(preset);
  useEffect(() => {
    if (lastPresetRef.current !== preset) {
      setSliders({ ...presetObj.defaults });
      lastPresetRef.current = preset;
    }
  }, [preset, presetObj]);

  // Apply all theme + preset + slider values to :root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-entity', entity.id);
    root.setAttribute('data-archetype', entity.archetype);
    root.setAttribute('data-surface', entity.surfaceTone);
    root.setAttribute('data-glow', entity.glowLevel);
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-preset', preset);
    root.setAttribute('data-layout', layout);

    // Colors (with hue shift)
    const baseA = theme === 'light' ? entity.accent.light    : entity.accent.dark;
    const baseS = theme === 'light' ? entity.secondary.light : entity.secondary.dark;
    const a = hueShift !== 0 ? shiftHue(baseA, hueShift) : baseA;
    const s = hueShift !== 0 ? shiftHue(baseS, hueShift) : baseS;
    const hot = lighten(a, 0.15);

    root.style.setProperty('--g-accent', a);
    root.style.setProperty('--g-accent-hot', hot);
    root.style.setProperty('--g-secondary', s);
    root.style.setProperty('--g-accent-rgb', hexToRgb(a));
    root.style.setProperty('--g-secondary-rgb', hexToRgb(s));

    // Preset vars
    Object.entries(presetObj.vars).forEach(([k, v]) => root.style.setProperty(k, v));

    // Font-pair overrides
    if (fontObj.display) root.style.setProperty('--g-f-display', fontObj.display);
    if (fontObj.body)    root.style.setProperty('--g-f-body',    fontObj.body);
    if (fontObj.mono)    root.style.setProperty('--g-f-mono',    fontObj.mono);

    // Slider-driven vars
    root.style.setProperty('--g-orb-i',   sliders.orbs);
    root.style.setProperty('--g-noise-i', sliders.noise);
    root.style.setProperty('--g-glow-i',  sliders.glow);
    root.style.setProperty('--g-grid-i',  sliders.grid);
    root.style.setProperty('--g-radii',   sliders.radius + 'px');
    root.style.setProperty('--pg-density', sliders.density);
    root.style.setProperty('--pg-letter',  sliders.letter + 'em');

    // Persist
    localStorage.setItem('pg_entity', entity.id);
    localStorage.setItem('pg_theme', theme);
    localStorage.setItem('pg_preset', preset);
    localStorage.setItem('pg_font', fontPair);
    localStorage.setItem('pg_layout', layout);
    localStorage.setItem('pg_hue', hueShift);
    localStorage.setItem('pg_sliders', JSON.stringify(sliders));
  }, [entity, theme, preset, fontPair, layout, hueShift, sliders, presetObj, fontObj]);

  const copy = async (kind) => {
    const baseA = theme === 'light' ? entity.accent.light    : entity.accent.dark;
    const baseS = theme === 'light' ? entity.secondary.light : entity.secondary.dark;
    const a = hueShift !== 0 ? shiftHue(baseA, hueShift) : baseA;
    const s = hueShift !== 0 ? shiftHue(baseS, hueShift) : baseS;
    let text = '';
    if (kind === 'css') {
      const presetCss = Object.entries(presetObj.vars).map(([k,v]) => `  ${k}: ${v};`).join('\n');
      text = `/* Entity: ${entity.name} · Preset: ${presetObj.name} · Layout: ${layout} */
:root {
  --g-accent:        ${a};
  --g-accent-hot:    ${lighten(a, 0.15)};
  --g-secondary:     ${s};
  --g-accent-rgb:    ${hexToRgb(a)};
  --g-secondary-rgb: ${hexToRgb(s)};
  --g-radii:         ${sliders.radius}px;
  --g-orb-i:         ${sliders.orbs};
  --g-noise-i:       ${sliders.noise};
  --g-glow-i:        ${sliders.glow};
  --g-grid-i:        ${sliders.grid};
  --pg-density:      ${sliders.density};
  --pg-letter:       ${sliders.letter}em;
${presetCss}
}
/* <html data-entity="${entity.id}" data-preset="${preset}" data-theme="${theme}" data-layout="${layout}"> */`;
    } else if (kind === 'json') {
      text = JSON.stringify({ entity: entity.id, preset, fontPair, layout, theme, hueShift, sliders }, null, 2);
    } else if (kind === 'react') {
      text = `<ThemeProvider
  entity="${entity.id}"
  preset="${preset}"
  layout="${layout}"
  theme="${theme}"
  overrides={${JSON.stringify({ hueShift, ...sliders })}}
>
  {/* your app */}
</ThemeProvider>`;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1400);
    } catch {}
  };

  return (
    <div className="pg-layout">
      <Sidebar
        entityId={entityId} setEntityId={setEntityId}
        theme={theme}       setTheme={setTheme}
        preset={preset}     setPreset={setPreset}
        fontPair={fontPair} setFontPair={setFontPair}
        layout={layout}     setLayout={setLayout}
        sliders={sliders}   setSliders={setSliders}
        hueShift={hueShift} setHueShift={setHueShift}
        copied={copied}     copy={copy}
        TOKENS={TOKENS} PRESETS={PRESETS} FONT_PAIRS={FONT_PAIRS} LAYOUTS={LAYOUTS}
        filter={filter} setFilter={setFilter} q={q} setQ={setQ}
      />
      <main className="pg-stage">
        <Spec entity={entity} theme={theme} preset={preset} layout={layout} />
        <Hero entity={entity} sliders={sliders} layout={layout} />
        <PreviewCards entity={entity} sliders={sliders} />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
