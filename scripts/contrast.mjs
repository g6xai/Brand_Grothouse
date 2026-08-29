#!/usr/bin/env node
/**
 * WCAG 2.1 relative-luminance contrast, so accent values are measured rather
 * than asserted. Run before changing any colour token; paste the ratio into
 * the token file next to the value.
 *
 *   node scripts/contrast.mjs                 audit the shipped pairs
 *   node scripts/contrast.mjs #0E8C74 #FFFFFF one pair
 */

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

export function luminance(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? [...h].map((c) => c + c).join('') : h, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => srgb(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const r2 = (n) => Math.round(n * 100) / 100;
const verdict = (n, large = false) =>
  n >= (large ? 3 : 4.5) ? 'AA' : n >= 3 ? 'AA-large/UI only' : 'FAIL';

const [, , a, b] = process.argv;
if (a && b) {
  const n = contrast(a, b);
  console.log(`${a} on ${b}  ${r2(n)}:1  ${verdict(n)}`);
  process.exit(n >= 4.5 ? 0 : 1);
}

/**
 * Every colour pair the kit actually renders, with the threshold that pair
 * must clear. Run with no arguments this is a GATE, not a report: it exits
 * non-zero if any pair falls below its minimum.
 *
 * `min` is 4.5 for text below 22px, 3.0 for UI boundaries and large text.
 *
 * > This list is the fix for a real defect. `--color-primary` was used as a
 * > filled-button background with `--color-on-primary` on top, and for teal in
 * > the light theme that pair measures 4.18:1 — below the 4.5:1 needed for a
 * > 17px button label. It shipped because this file was advisory, run by hand,
 * > and its pair list did not include the filled-button combination. A pair the
 * > audit does not name is a pair nobody measured. Add the pair when you add
 * > the component.
 */
const LIGHT = { bg: '#F5F5F7', card: '#FFFFFF', ink: '#1D1D1F', secondary: '#6E6E73' };
const DARK = { bg: '#0B0B0D', card: '#161618', ink: '#F5F5F7', secondary: '#98989D' };

const BLUE = { light: '#1249E5', dark: '#5F7FFF', fillLight: '#1249E5', fillDark: '#5F7FFF' };
const TEAL = { light: '#0E8C74', dark: '#14C8A6', text: '#0B7A64', fillLight: '#0B7A64', fillDark: '#14C8A6' };

const PAIRS = [
  ['-- neutrals --'],
  ['light ink on bg', LIGHT.ink, LIGHT.bg, 4.5],
  ['light ink on card', LIGHT.ink, LIGHT.card, 4.5],
  ['light secondary on bg', LIGHT.secondary, LIGHT.bg, 4.5],
  ['light secondary on card', LIGHT.secondary, LIGHT.card, 4.5],
  ['dark ink on bg', DARK.ink, DARK.bg, 4.5],
  ['dark ink on card', DARK.ink, DARK.card, 4.5],
  ['dark secondary on bg', DARK.secondary, DARK.bg, 4.5],
  ['dark secondary on card', DARK.secondary, DARK.card, 4.5],

  ['-- blue accent as text and UI --'],
  ['blue light on bg', BLUE.light, LIGHT.bg, 4.5],
  ['blue light on card', BLUE.light, LIGHT.card, 4.5],
  ['blue dark on bg', BLUE.dark, DARK.bg, 4.5],
  ['blue dark on card', BLUE.dark, DARK.card, 4.5],

  ['-- teal accent as text and UI --'],
  // #0E8C74 is UI-only on light: 3.84:1 clears 3.0 and fails 4.5 on purpose.
  ['teal light on bg (UI only)', TEAL.light, LIGHT.bg, 3.0],
  ['teal light on card (UI only)', TEAL.light, LIGHT.card, 3.0],
  ['teal light TEXT on bg', TEAL.text, LIGHT.bg, 4.5],
  ['teal light TEXT on card', TEAL.text, LIGHT.card, 4.5],
  ['teal dark on bg', TEAL.dark, DARK.bg, 4.5],
  ['teal dark on card', TEAL.dark, DARK.card, 4.5],

  ['-- filled buttons: label on fill --'],
  ['white on blue fill light', '#FFFFFF', BLUE.fillLight, 4.5],
  ['dark ink on blue fill dark', DARK.bg, BLUE.fillDark, 4.5],
  ['white on teal fill light', '#FFFFFF', TEAL.fillLight, 4.5],
  ['dark ink on teal fill dark', DARK.bg, TEAL.fillDark, 4.5],
];

let worst = Infinity;
const failures = [];
for (const [label, fg, bg, min] of PAIRS) {
  if (!fg) { console.log(`\n  ${label}`); continue; }
  const n = contrast(fg, bg);
  const ok = n >= min;
  if (!ok) failures.push(`${label} — ${r2(n)}:1, needs ${min}:1`);
  console.log(
    `  ${ok ? ' ' : 'x'} ${label.padEnd(32)} ${String(r2(n)).padStart(6)}:1  (min ${min})  ${verdict(n, min === 3)}`
  );
  worst = Math.min(worst, n);
}

console.log(`\n  lowest ratio in the set: ${r2(worst)}:1`);
if (failures.length) {
  console.error(`\n  CONTRAST GATE FAILED\n`);
  for (const f of failures) console.error(`    x ${f}`);
  console.error('');
  process.exit(1);
}
console.log(`  contrast ok — ${PAIRS.filter((p) => p[1]).length} shipped pairs clear their thresholds\n`);
