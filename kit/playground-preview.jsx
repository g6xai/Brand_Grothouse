/* global React */
const { useState: useStatePV, useEffect: useEffectPV, useMemo: useMemoPV } = React;

/* =========================================================
   Preview sections — hero (with layout variants), cards, stats
   ========================================================= */
function Radiance({ sliders }) {
  const o = sliders.orbs, n = sliders.noise, g = sliders.grid;
  return (
    <>
      {o > 0.01 && <div className="g-aurora-mesh" style={{ opacity: Math.min(1, o * 0.9) }} />}
      {g > 0.01 && <div className="g-grid-tex" style={{ opacity: g }} />}
      {o > 0.01 && (
        <>
          <div className="g-orb g-orb-primary" style={{ width: 520 * (0.7 + o * 0.3), height: 520 * (0.7 + o * 0.3), top: '-10%', left: '-8%', opacity: Math.min(1, o * 0.85) }} />
          <div className="g-orb g-orb-sky"     style={{ width: 420 * (0.7 + o * 0.3), height: 420 * (0.7 + o * 0.3), bottom: '-12%', right: '-6%', animationDelay: '-4s', opacity: Math.min(1, o * 0.75) }} />
          <div className="g-orb g-orb-arctic"  style={{ width: 300 * (0.7 + o * 0.3), height: 300 * (0.7 + o * 0.3), top: '40%', right: '20%', animationDelay: '-8s', opacity: Math.min(1, o * 0.7) }} />
        </>
      )}
      {n > 0.01 && <div className="g-noise" style={{ opacity: n }} />}
    </>
  );
}

function HeroClassic({ entity, sliders }) {
  const [a, b] = entity.tagline.split(/\.\s*/);
  return (
    <section className="pv-hero" data-layout="classic">
      <Radiance sliders={sliders} />
      <div className="pv-hero-inner">
        <div className="pv-eyebrow"><span className="bar" /><span className="g-overline">{entity.ticker}</span></div>
        <h1 className="pv-title">{a}.<br /><span className="italic">{b ? b + '.' : 'Built to endure.'}</span></h1>
        <p className="pv-body">{entity.name} operates within the Grothouse Family — a diversified portfolio built on faith, discipline, and generational stewardship.</p>
        <div className="pv-btn-row">
          <button className="g-btn g-btn-primary">Learn More →</button>
          <button className="g-btn g-btn-ghost">Contact</button>
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ entity, sliders }) {
  const [a, b] = entity.tagline.split(/\.\s*/);
  return (
    <section className="pv-hero" data-layout="split">
      <Radiance sliders={sliders} />
      <div className="pv-hero-split">
        <div className="pv-hero-col">
          <div className="pv-eyebrow"><span className="bar" /><span className="g-overline">{entity.ticker}</span></div>
          <h1 className="pv-title">{a}.<br /><span className="italic">{b ? b + '.' : 'Built to endure.'}</span></h1>
          <p className="pv-body">{entity.name} — a discipline, not a transaction. Long-horizon capital, executed with care.</p>
          <div className="pv-btn-row">
            <button className="g-btn g-btn-primary">Learn More →</button>
            <button className="g-btn g-btn-ghost">Contact</button>
          </div>
        </div>
        <div className="pv-hero-visual">
          <div className="pv-visual-card">
            <div className="pv-visual-ticker">{entity.ticker}</div>
            <div className="pv-visual-bars">
              {Array.from({length: 24}).map((_, i) => (
                <div key={i} className="pv-visual-bar" style={{ height: (30 + Math.sin(i * 0.6) * 20 + Math.random() * 25) + '%' }} />
              ))}
            </div>
            <div className="pv-visual-meta">
              <div><div className="k">Archetype</div><div className="v">{entity.archetype.replace('_',' ')}</div></div>
              <div><div className="k">Surface</div><div className="v">{entity.surfaceTone}</div></div>
              <div><div className="k">Est.</div><div className="v">2014</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCentered({ entity, sliders }) {
  const [a, b] = entity.tagline.split(/\.\s*/);
  return (
    <section className="pv-hero" data-layout="centered">
      <Radiance sliders={sliders} />
      <div className="pv-hero-centered">
        <div className="pv-eyebrow centered"><span className="bar" /><span className="g-overline">{entity.ticker} · {entity.archetype.replace('_',' ')}</span><span className="bar" /></div>
        <h1 className="pv-title centered">{a}.<br /><span className="italic">{b ? b + '.' : 'Built to endure.'}</span></h1>
        <p className="pv-body centered">{entity.name} — part of the Grothouse Family. A diversified portfolio, generationally held.</p>
        <div className="pv-btn-row centered">
          <button className="g-btn g-btn-primary">Learn More →</button>
          <button className="g-btn g-btn-ghost">Contact</button>
        </div>
      </div>
    </section>
  );
}

function HeroAsymmetric({ entity, sliders }) {
  const [a, b] = entity.tagline.split(/\.\s*/);
  return (
    <section className="pv-hero" data-layout="asymmetric">
      <Radiance sliders={sliders} />
      <div className="pv-hero-asym">
        <div className="pv-asym-mega">{a}.</div>
        <div className="pv-asym-italic">{b ? b : 'Built to endure.'}</div>
        <div className="pv-asym-meta">
          <div className="pv-asym-ticker">{entity.ticker}</div>
          <div className="pv-asym-body">
            {entity.name} operates within the Grothouse Family. Cross-entity coordination, shared services, unified stewardship.
          </div>
          <div className="pv-btn-row">
            <button className="g-btn g-btn-primary">Learn More →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero({ entity, sliders, layout }) {
  if (layout === 'split')      return <HeroSplit      entity={entity} sliders={sliders} />;
  if (layout === 'centered')   return <HeroCentered   entity={entity} sliders={sliders} />;
  if (layout === 'asymmetric') return <HeroAsymmetric entity={entity} sliders={sliders} />;
  return <HeroClassic entity={entity} sliders={sliders} />;
}

function PreviewCards({ entity, sliders }) {
  const samples = [
    { t: 'OP-01', n: 'Operations', d: 'Disciplined execution across every entity — shared services, finance, legal.' },
    { t: 'ST-02', n: 'Strategy',   d: 'Cross-portfolio coordination. M&A, capital allocation, long-horizon planning.' },
    { t: 'GR-03', n: 'Growth',     d: 'High-conviction bets. Emerging platforms. Compounding across generations.' },
  ];
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <section className="pv-section">
      <Radiance sliders={{ ...sliders, orbs: 0 }} />
      <div className="pv-section-inner">
        <span className="g-overline">What We Build</span>
        <h2 className="pv-h2">{entity.name}, <span style={{color:'var(--g-accent)', fontStyle:'italic', fontWeight:'var(--pv-title-italic-weight,400)'}}>in practice.</span></h2>
        <div className="g-divider-glow" style={{ marginBottom: 32 }} />
        <p className="pv-sub">A sample of what operations look like across this entity. Cards inherit the accent, surface tone, radii, and motion from the entity's theme tokens — and the preset's style DNA.</p>

        <div className="pv-cards">
          {samples.map(s => (
            <div key={s.t} className="g-card pv-styled-card" onMouseMove={onMove}>
              <div className="pv-card-ticker"><span className="dot" />{s.t}</div>
              <h3 className="pv-card-name">{s.n}</h3>
              <div className="pv-card-type">{entity.archetype.replace('_', ' ')}</div>
              <p className="pv-card-desc">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="pv-stats">
          <div style={{padding:'24px 16px 4px'}}><div className="pv-stat-n">14<span style={{color:'var(--g-accent)'}}>+</span></div><div className="pv-stat-l">Entities</div></div>
          <div style={{padding:'24px 16px 4px'}}><div className="pv-stat-n">4</div><div className="pv-stat-l">Verticals</div></div>
          <div style={{padding:'24px 16px 4px'}}><div className="pv-stat-n g-text-glow">OH</div><div className="pv-stat-l">Headquartered</div></div>
          <div style={{padding:'24px 16px 4px'}}><div className="pv-stat-n" style={{color:'var(--g-accent)'}}>∞</div><div className="pv-stat-l">Generational</div></div>
        </div>
      </div>
    </section>
  );
}

function Spec({ entity, theme, preset, layout }) {
  const a = theme === 'light' ? entity.accent.light : entity.accent.dark;
  const s = theme === 'light' ? entity.secondary.light : entity.secondary.dark;
  const isUniversal = entity.id === 'grothouse_family';
  return (
    <div className={`pg-spec${isUniversal ? ' is-universal' : ''}`}>
      {isUniversal && <div className="pg-universal-badge"><span className="dot" />Universal Style</div>}
      <h4>Active Theme</h4>
      <div className="spec-row"><span className="k">Entity</span>   <span className="v">{entity.ticker}</span></div>
      <div className="spec-row"><span className="k">Preset</span>   <span className="v">{preset}</span></div>
      <div className="spec-row"><span className="k">Layout</span>   <span className="v">{layout}</span></div>
      <div className="spec-row"><span className="k">Surface</span>  <span className="v">{entity.surfaceTone}</span></div>
      <div className="spec-row"><span className="k">Accent</span>   <span className="v"><span className="sw" style={{background:a}} />{a}</span></div>
      <div className="spec-row"><span className="k">Second.</span>  <span className="v"><span className="sw" style={{background:s}} />{s}</span></div>
    </div>
  );
}

window.pgPreview = { Hero, PreviewCards, Spec };
