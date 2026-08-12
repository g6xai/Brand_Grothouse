/**
 * HIG lint rules for the Grothouse brand kit.
 *
 * Every rule carries its own fixtures:
 *   `bad`  — strings that MUST match (>0 hits). Proves the rule fires.
 *   `good` — strings that MUST NOT match (0 hits). Proves the rule is not
 *            counting conformant code.
 *
 * The fixtures live next to the pattern on purpose. A rule and its proof
 * cannot drift apart if they are the same object, and `hig-lint-ratchet.mjs`
 * runs every fixture before it reports a single number. A probe that has
 * never been checked against a known-good input is not evidence.
 *
 * Canonical standard: c:/Users/tony.grothouse/code/DriveX/design/APPLE-HIG-STANDARD.md
 * Section numbers below refer to that document. §K sections are kit-local
 * concerns the canonical standard does not number.
 */

/* ---------------------------------------------------------------- scope --
 * The ratchet scans files that DEFINE or APPLY the design system.
 *
 * Markdown is deliberately out of scope: a document must be able to write
 * "Source Serif 4 is retired" without that sentence counting as a violation.
 * Prose names retired things; code must not use them. Keeping .md in scope
 * would create a category that can never reach zero, which is precisely the
 * failure that makes a ratchet useless.
 */
export const SCOPE = {
  include: [/^kit\/.*\.(css|js|jsx|json|html)$/, /^[^/]+\.html$/],
  exclude: [/^logos\//, /^node_modules\//, /^scripts\//],
};

export function inScope(relPath) {
  const p = relPath.replace(/\\/g, '/');
  if (SCOPE.exclude.some((rx) => rx.test(p))) return false;
  return SCOPE.include.some((rx) => rx.test(p));
}

/* ------------------------------------------------------------- helpers -- */

const GRID = new Set([0, 4, 8, 12, 16, 24, 32, 48]);
const RADII = new Set([0, 12, 16, 999, 9999]);
const DURATIONS = new Set([0, 150, 250, 350]);

/** Every `<number>px` in a declaration value. */
function pxValues(value) {
  return [...value.matchAll(/(-?\d*\.?\d+)px/g)].map((m) => Number(m[1]));
}

/** Every duration in a declaration value, normalised to ms. */
function msValues(value) {
  return [...value.matchAll(/(-?\d*\.?\d+)(ms|s)(?![a-z-])/gi)].map((m) =>
    m[2].toLowerCase() === 's' ? Number(m[1]) * 1000 : Number(m[1])
  );
}

/**
 * Files whose job is to hold raw colour values. Everything else consumes
 * them through a token. This is the one place hex is legal, and it is a
 * short, explicit list rather than a pattern — an unnamed carve-out is how
 * 66 violations sat in DriveX's `(auth)` indefinitely.
 */
const COLOUR_SOURCES = new Set([
  'kit/tokens.json',
  'kit/tokens.js',
  'kit/grothouse-system.css',
]);

/* --------------------------------------------------------------- rules -- */

export const RULES = [
  /* ============================================ §1.2 Typography ========= */
  {
    id: 'type/retired-font-family',
    section: '§1.2',
    title: 'Retired font family (Source Serif 4 / Outfit / JetBrains Mono)',
    why: 'One family, five sizes. The system stack is the only UI face; mono survives only as .font-id for machine identifiers.',
    pattern: /['"](?:Source Serif[^'"]*|Outfit|JetBrains Mono)['"]/g,
    bad: [
      `--g-f-display: 'Source Serif 4', 'Source Serif Pro', Georgia, serif;`,
      `font-family: 'JetBrains Mono', ui-monospace, monospace;`,
      `body: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],`,
      `"display": "Source Serif 4",`,
    ],
    good: [
      `--font-system: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", system-ui, sans-serif;`,
      `font-family: var(--font-system);`,
      `<p>The display face is the system stack at 34px.</p>`,
      `"sans": "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"`,
    ],
  },
  {
    id: 'type/uppercase',
    section: '§1.2',
    title: 'Uppercase text transform',
    why: 'Measured on apple.com: zero uppercase-transformed elements across four page/viewport combinations. Sentence case is the observed rule.',
    // Value positions only. A sentence containing the word "uppercase" is
    // documentation, not a violation.
    pattern:
      /text-transform\s*:\s*uppercase|["']transform["']\s*:\s*["']uppercase["']|class(?:Name)?\s*=\s*["'][^"']*\buppercase\b/g,
    bad: [
      `letter-spacing: 0.32em; text-transform: uppercase;`,
      `"transform": "uppercase",`,
      `<span class="text-xs uppercase tracking-widest">Overline</span>`,
    ],
    good: [
      `text-transform: none;`,
      `<p>Sentence case only — no uppercase anywhere.</p>`,
      `<span class="hig-caption">Overline</span>`,
    ],
  },
  {
    id: 'type/wide-tracking',
    section: '§1.2',
    title: 'Letter-spacing above 0.1em',
    why: 'Measured on apple.com: zero elements above 0.1em. Retiring the industrial overline means removing the tracking, not only the font.',
    pattern: /letter-spacing\s*:\s*(-?\d*\.?\d+)em|["']tracking["']?\s*:\s*["'](-?\d*\.?\d+)em["']/g,
    keep: (m) => Math.abs(Number(m[1] ?? m[2])) > 0.1,
    bad: [
      `letter-spacing: 0.28em; font-weight: 700;`,
      `letter-spacing: 0.32em;`,
      `industrial: '0.28em',`.replace('industrial:', '"tracking":'),
    ],
    good: [
      `letter-spacing: -0.01em;`,
      `letter-spacing: 0.02em;`,
      `letter-spacing: normal;`,
    ],
  },
  {
    id: 'type/below-floor',
    section: '§1.2',
    title: 'Font size below the 12px floor',
    why: '12px is the hard floor. The 13px floor was reversed by re-measurement (445 conformant elements at 12px); below 12px is still banned.',
    pattern: /font-size\s*:\s*(\d*\.?\d+)px|["']size["']\s*:\s*(\d+)\b/g,
    keep: (m) => Number(m[1] ?? m[2]) < 12,
    bad: [
      `font-size: 11px; font-weight: 700;`,
      `font-size: 9px;`,
      `"size": 11,`,
    ],
    good: [
      `font-size: 12px;`,
      `font-size: 13px;`,
      `font-size: 17px;`,
      `"size": 34,`,
    ],
  },

  /* ================================================ §1.1 Spacing ======== */
  {
    id: 'space/off-grid',
    section: '§1.1',
    title: 'Off-grid spacing value',
    why: '8pt grid, seven values: 4 / 8 / 12 / 16 / 24 / 32 / 48. Half-steps and intermediate steps are copied defaults, not decisions.',
    pattern:
      /(?:^|[\s;{])(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?\s*:\s*([^;}\n]+)/g,
    keep: (m) => {
      const v = m[1];
      if (/var\(|calc\(/.test(v)) return false;
      const px = pxValues(v);
      return px.length > 0 && px.some((n) => !GRID.has(Math.abs(n)));
    },
    bad: [
      `padding: 28px 26px 24px;`,
      `gap: 10px;`,
      `.g-section { padding: 120px 40px; }`,
      `margin-bottom: 14px;`,
    ],
    good: [
      `padding: 16px 24px;`,
      `gap: 8px;`,
      `padding: 48px 16px;`,
      `padding: var(--space-4);`,
      `margin: 0;`,
    ],
  },

  /* ================================================= §1.4 Radius ======== */
  {
    id: 'radius/off-scale',
    section: '§1.4',
    title: 'Radius outside 12 / 16 / pill',
    why: 'Two radii plus pills. The archetype radii (3px ai_tech, 5px, 8px, 14px) are retired; Apple buttons measure 980px, so buttons are pills.',
    pattern: /(?:border-radius|--g-radii|--radius[a-z-]*)\s*:\s*([^;}\n]+)/g,
    keep: (m) => {
      const v = m[1];
      if (/var\(|calc\(/.test(v)) return false;
      if (/\b50%/.test(v)) return false; // circular avatars are pills
      const px = pxValues(v);
      return px.length > 0 && px.some((n) => !RADII.has(Math.abs(n)));
    },
    bad: [
      `border-radius: 3px;`,
      `--g-radii: 6px;`,
      `border-radius: 10px;`,
      `border-radius: 1px;`,
    ],
    good: [
      `border-radius: 16px;`,
      `border-radius: 12px;`,
      `border-radius: 999px;`,
      `border-radius: var(--radius-card);`,
      `border-radius: 50%;`,
    ],
  },

  /* ================================================= §1.5 Motion ======== */
  {
    id: 'motion/archetype-speed',
    section: '§1.5',
    title: 'Archetype speed multiplier',
    why: 'Motion is 150 / 250 / 350ms for every entity. The 1.3x ai_tech multiplier and its siblings are retired.',
    pattern: /--g-speed|animationSpeed/g,
    bad: [
      `transition: all calc(.3s / var(--g-speed)) ease;`,
      `"animationSpeed": 1.3,`,
      `--g-speed: 0.85;`,
    ],
    good: [
      `transition: all var(--motion-standard) var(--ease-out);`,
      `--motion-standard: 250ms;`,
    ],
  },
  {
    id: 'motion/off-scale-duration',
    section: '§1.5',
    title: 'Duration outside 150 / 250 / 350ms',
    why: '250ms is the default. Sub-200ms for press feedback, 350ms for sheet presentation. Nothing else.',
    pattern: /(?:transition|animation)(?:-duration)?\s*:\s*([^;}\n]+)/g,
    keep: (m) => {
      const v = m[1];
      if (/var\(/.test(v)) return false;
      const ms = msValues(v);
      return ms.length > 0 && ms.some((n) => !DURATIONS.has(n));
    },
    bad: [
      `transition: background-color .6s ease, color .6s ease;`,
      `animation: g-drift 14s ease-in-out infinite;`,
      `transition: opacity .3s;`,
    ],
    good: [
      `transition: opacity 250ms var(--ease-out);`,
      `transition: transform 150ms cubic-bezier(0.32, 0.72, 0, 1);`,
      `transition: opacity var(--motion-fast) var(--ease-out);`,
    ],
  },

  /* ================================================= §1.3 Colour ======== */
  {
    id: 'colour/raw-hex',
    section: '§1.3',
    title: 'Raw hex outside the token source',
    why: 'One accent per surface, always consumed as a semantic token. A hex literal in a consuming or teaching surface is how a palette forks.',
    files: (p) => !COLOUR_SOURCES.has(p),
    pattern: /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g,
    bad: [
      `slate: '#757C88',`,
      `color: #5F7FFF;`,
      `<rect fill="#fff" />`,
    ],
    good: [
      `color: var(--color-primary);`,
      `background: var(--color-card);`,
      `<a href="#type-scale">Type scale</a>`,
      `<p>&#8212; em dash</p>`,
    ],
  },

  /* ============================================== §4.0.1 Radiance ======= */
  {
    id: 'radiance/primitive',
    section: '§4.0.1',
    title: 'Radiance primitive',
    why: 'Retired as a default everywhere. Depth comes from translucency, backdrop blur and surface-tone steps.',
    pattern:
      /g-aurora-mesh|g-orb(?:-[a-z]+)?\b|g-noise|g-grid-tex|g-text-glow|g-text-sparkle|g-divider-glow|g-drift/g,
    bad: [
      `.g-aurora-mesh { position: absolute; inset: 0; }`,
      `<div className="g-orb g-orb-primary" />`,
      `animation: g-drift 14s ease-in-out infinite;`,
      `.g-divider-glow { height: 1px; }`,
    ],
    good: [
      `.hig-card { background: var(--color-card); }`,
      `<div className="hig-material" />`,
      `backdrop-filter: blur(20px);`,
    ],
  },

  /* ================================================== §2.1 Scroll ======= */
  {
    id: 'scroll/overflow-x-hidden',
    section: '§2.1',
    title: 'overflow-x: hidden',
    why: 'overflow-y: visible computes to auto when the other axis is auto/scroll/hidden, so overflow-x: hidden silently re-traps document scroll. clip is the only value that does not force the other axis.',
    pattern: /overflow-x\s*:\s*(?:hidden|auto|scroll)/g,
    bad: [
      `overflow-x: hidden;`,
      `.main { overflow-x: auto; }`,
    ],
    good: [
      `overflow-x: clip;`,
      `overflow: hidden;`,
    ],
  },
  {
    id: 'scroll/document-constraint',
    section: '§2.1',
    title: 'touch-action / overscroll-behavior / fixed position on html or body',
    why: 'apple.com leaves both auto. Constraining them at document level is what stops mobile Safari collapsing its URL bar, costing ~110px of viewport and the native back/share/tabs affordances.',
    pattern:
      /(?:^|[\s,{};])(?:html|body)\b[^{}\n]*\{[^{}]*(?:touch-action\s*:|overscroll-behavior\s*:(?!\s*auto)|position\s*:\s*fixed)/g,
    bad: [
      `html, body { overscroll-behavior: none; }`,
      `body { position: fixed; inset: 0; }`,
      `html { touch-action: pan-y pinch-zoom; }`,
    ],
    good: [
      `.carousel { overscroll-behavior-inline: contain; }`,
      `html, body { position: static; overflow: visible; }`,
      `.sheet { position: fixed; inset: 0; }`,
    ],
  },

  /* ============================== §K.1 Retired four-axis machinery ====== */
  {
    id: 'kit/legacy-axis',
    section: '§K.1',
    title: 'Retired axis (archetype / surfaceTone / glowLevel)',
    why: 'The four-axis matrix (accent x surface tone x glow level x archetype) IS the retired system. Two accents on black/white/grey replace it.',
    pattern:
      /data-archetype|data-surface|data-glow|surfaceTones?\b|glowLevels?\b|archetypes?\b|--g-orb-i|--g-noise-i|--g-glow-i|--g-grid-i|radiiScale/g,
    bad: [
      `[data-archetype="ai_tech"] { --g-speed: 1.3; --g-radii: 3px; }`,
      `"glowLevel": "intense",`,
      `"surfaceTone": "iceCool",`,
      `--g-orb-i: 1.6;`,
    ],
    good: [
      `[data-theme="dark"] { --color-bg: #0B0E14; }`,
      `"accent": "cooperateBlue",`,
      `<html data-entity="grothouse_family" data-theme="light">`,
    ],
  },
  {
    id: 'kit/legacy-font-var',
    section: '§K.1',
    title: 'Retired font variable (--g-f-display / --g-f-body / --g-f-mono)',
    why: 'Three font roles encoded the serif/sans/mono split. One family replaces them; --font-id is the only survivor.',
    pattern: /--g-f-(?:display|body|mono)/g,
    bad: [
      `--g-f-display: 'Source Serif 4', Georgia, serif;`,
      `font-family: var(--g-f-body);`,
    ],
    good: [
      `--font-system: -apple-system, system-ui, sans-serif;`,
      `font-family: var(--font-id);`,
    ],
  },
];

export const SECTIONS = [...new Set(RULES.map((r) => r.section))].sort();
