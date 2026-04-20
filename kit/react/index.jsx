/**
 * Grothouse Design System — React component kit (headless primitives)
 * Works with Next.js, Vite, CRA. Requires grothouse-system.css imported globally.
 * Usage:
 *   <ThemeProvider entity="cooperate" theme="dark">
 *     <Section variant="dark" radiance>
 *       <Radiance orbs mesh noise grid />
 *       ... your content ...
 *     </Section>
 *   </ThemeProvider>
 */

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import tokens from './tokens.json';

/* =========================================================
   Theme Context — manages [data-entity], accents, surfaces
   ========================================================= */
const ThemeCtx = createContext(null);

export function useEntity() { return useContext(ThemeCtx); }

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function ThemeProvider({ entity = 'g26x', theme = 'dark', children }) {
  const ent = tokens.entities.find(e => e.id === entity) || tokens.entities[0];
  const arch = tokens.archetypes[ent.archetype];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-entity', ent.id);
    root.setAttribute('data-archetype', ent.archetype);
    root.setAttribute('data-surface', ent.surfaceTone);
    root.setAttribute('data-glow', ent.glowLevel);
    root.setAttribute('data-theme', theme);

    const accent    = theme === 'light' ? ent.accent.light    : ent.accent.dark;
    const secondary = theme === 'light' ? ent.secondary.light : ent.secondary.dark;
    // Lighten accent for "hot" hover state (simple HSL shift)
    const hot = lighten(accent, 0.15);

    root.style.setProperty('--g-accent',        accent);
    root.style.setProperty('--g-accent-hot',    hot);
    root.style.setProperty('--g-secondary',     secondary);
    root.style.setProperty('--g-accent-rgb',    hexToRgb(accent));
    root.style.setProperty('--g-secondary-rgb', hexToRgb(secondary));
  }, [ent.id, theme]);

  return (
    <ThemeCtx.Provider value={{ entity: ent, archetype: arch, theme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

// Utility — lighten a hex color toward white by amount 0..1
function lighten(hex, amt) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amt));
  const g = Math.min(255, Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amt));
  const b = Math.min(255, Math.round((n & 255) + (255 - (n & 255)) * amt));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

/* =========================================================
   Radiance — drop-in aurora + orbs + noise + grid
   ========================================================= */
export function Radiance({ mesh = true, orbs = true, noise = true, grid = false }) {
  return (
    <>
      {mesh && <div className="g-aurora-mesh" />}
      {grid && <div className="g-grid-tex" />}
      {orbs && <>
        <div className="g-orb g-orb-primary" style={{ width: 520, height: 520, top: '-10%', left: '-8%' }} />
        <div className="g-orb g-orb-sky"     style={{ width: 420, height: 420, bottom: '-12%', right: '-6%', animationDelay: '-4s' }} />
        <div className="g-orb g-orb-arctic"  style={{ width: 300, height: 300, top: '40%', right: '20%', animationDelay: '-8s' }} />
      </>}
      {noise && <div className="g-noise" />}
    </>
  );
}

/* =========================================================
   Section — base wrapper that sets surface
   ========================================================= */
export function Section({ deep = false, children, style, ...props }) {
  return (
    <section className={`g-section${deep ? ' g-section-deep' : ''}`} style={style} {...props}>
      {children}
    </section>
  );
}

export function SectionInner({ children, style, ...props }) {
  return <div className="g-section-inner" style={style} {...props}>{children}</div>;
}

/* =========================================================
   Button
   ========================================================= */
export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`g-btn g-btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

/* =========================================================
   GlowCard — cursor-tracking radial glow
   ========================================================= */
export function GlowCard({ children, onClick, style, ...props }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} className="g-card" onMouseMove={onMove} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
}

/* =========================================================
   Typography primitives
   ========================================================= */
export function Overline({ children, muted = false }) {
  return <span className="g-overline" style={muted ? { color: 'var(--g-fg-muted)' } : undefined}>{children}</span>;
}
export function Display({ as: Tag = 'h2', glow, sparkle, children, style }) {
  const cls = ['g-f-display', glow && 'g-text-glow', sparkle && 'g-text-sparkle'].filter(Boolean).join(' ');
  return <Tag className={cls} style={style}>{children}</Tag>;
}
export function DividerGlow({ style }) {
  return <div className="g-divider-glow" style={style} />;
}

/* =========================================================
   Entity browser hook — list / find / switch
   ========================================================= */
export function useEntityCatalog() {
  return tokens.entities;
}

export { tokens };

export default {
  ThemeProvider, useEntity, useEntityCatalog,
  Radiance, Section, SectionInner, Button, GlowCard,
  Overline, Display, DividerGlow, tokens,
};
