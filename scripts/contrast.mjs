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

/* The pairs the kit actually ships. Every one of these numbers appears in
   kit/tokens.json next to its value. */
const LIGHT = { bg: '#F5F5F7', card: '#FFFFFF', ink: '#1D1D1F', secondary: '#6E6E73' };
const DARK = { bg: '#0B0B0D', card: '#161618', ink: '#F5F5F7', secondary: '#98989D' };

const PAIRS = [
  ['light ink on bg', LIGHT.ink, LIGHT.bg],
  ['light ink on card', LIGHT.ink, LIGHT.card],
  ['light secondary on bg', LIGHT.secondary, LIGHT.bg],
  ['light secondary on card', LIGHT.secondary, LIGHT.card],
  ['dark ink on bg', DARK.ink, DARK.bg],
  ['dark ink on card', DARK.ink, DARK.card],
  ['dark secondary on bg', DARK.secondary, DARK.bg],
  ['dark secondary on card', DARK.secondary, DARK.card],
  ['-- blue accent --', null, null],
  ['blue dark #5F7FFF on dark bg', '#5F7FFF', DARK.bg],
  ['blue dark #5F7FFF on dark card', '#5F7FFF', DARK.card],
  ['blue light #3A55E0 on light bg', '#3A55E0', LIGHT.bg],
  ['blue light #3A55E0 on light card', '#3A55E0', LIGHT.card],
  ['white on blue light #3A55E0', '#FFFFFF', '#3A55E0'],
  ['-- teal accent --', null, null],
  ['teal dark #14C8A6 on dark bg', '#14C8A6', DARK.bg],
  ['teal dark #14C8A6 on dark card', '#14C8A6', DARK.card],
  ['teal light #0E8C74 on light bg', '#0E8C74', LIGHT.bg],
  ['teal light #0E8C74 on light card', '#0E8C74', LIGHT.card],
  ['white on teal light #0E8C74', '#FFFFFF', '#0E8C74'],
];

let worst = Infinity;
for (const [label, fg, bg] of PAIRS) {
  if (!fg) { console.log(`\n  ${label}`); continue; }
  const n = contrast(fg, bg);
  const large = /accent .* on (dark|light) (bg|card)/.test(label);
  console.log(`  ${label.padEnd(34)} ${String(r2(n)).padStart(6)}:1  ${verdict(n, large)}`);
  if (!label.startsWith('--')) worst = Math.min(worst, n);
}
console.log(`\n  lowest ratio in the set: ${r2(worst)}:1\n`);
