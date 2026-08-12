#!/usr/bin/env node
/**
 * kit/tokens.json is the single canonical source. Everything else is
 * generated from it or checked against it.
 *
 *   node scripts/build-tokens.mjs          regenerate kit/tokens.js
 *   node scripts/build-tokens.mjs --check  fail if any mirror disagrees
 *
 * tokens.js used to be a hand-maintained copy of tokens.json — 599 lines of
 * duplicate that nothing stopped drifting. It is now generated, and the CSS
 * token layer is checked value-by-value against the JSON, so "the mirrors
 * must not disagree" is a gate rather than an intention.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_PATH = join(ROOT, 'kit', 'tokens.json');
const JS_PATH = join(ROOT, 'kit', 'tokens.js');
const CSS_PATH = join(ROOT, 'kit', 'grothouse-system.css');

const CHECK = process.argv.includes('--check');
const tokens = JSON.parse(readFileSync(JSON_PATH, 'utf8'));

/* ------------------------------------------------------- generate tokens.js */

const banner =
  '/* GENERATED FROM kit/tokens.json — DO NOT EDIT.\n' +
  '   Regenerate: node scripts/build-tokens.mjs\n' +
  '   Verified in CI: node scripts/build-tokens.mjs --check */\n';
const js = `${banner}window.__GROTHOUSE_TOKENS__ = ${JSON.stringify(tokens, null, 2)};\n`;

/* ------------------------------- check the CSS layer against the JSON ------ */

/**
 * Every CSS custom property whose value is owned by tokens.json, and where
 * that value lives. A value present here and wrong in the CSS fails CI; a
 * token missing from this map is invisible to the check, so adding a token
 * means adding a line here.
 */
const CSS_CONTRACT = [
  // selector, css var, expected value
  [':root', '--color-primary', tokens.color.accent.blue.light],
  [':root', '--color-bg', tokens.color.light.bg],
  [':root', '--color-card', tokens.color.light.card],
  [':root', '--color-sunken', tokens.color.light.sunken],
  [':root', '--color-ink', tokens.color.light.ink],
  [':root', '--color-secondary', tokens.color.light.secondary],
  [':root', '--color-border', tokens.color.light.border],
  [':root', '--color-success', tokens.color.status.success.light],
  [':root', '--color-warning', tokens.color.status.warning.light],
  [':root', '--color-error', tokens.color.status.error.light],
  [':root', '--radius-control', `${tokens.radius.control}px`],
  [':root', '--radius-card', `${tokens.radius.card}px`],
  [':root', '--radius-pill', `${tokens.radius.pill}px`],
  [':root', '--motion-fast', `${tokens.motion.fast}ms`],
  [':root', '--motion-standard', `${tokens.motion.standard}ms`],
  [':root', '--motion-emphasis', `${tokens.motion.emphasis}ms`],
  [':root', '--ease-out', tokens.motion.ease],
  [':root', '--text-display', `${tokens.type.scale.display.size}px`],
  [':root', '--text-title-1', `${tokens.type.scale.title1.size}px`],
  [':root', '--text-title-2', `${tokens.type.scale.title2.size}px`],
  [':root', '--text-body', `${tokens.type.scale.body.size}px`],
  [':root', '--text-caption', `${tokens.type.scale.caption.size}px`],
  [':root', '--space-1', `${tokens.space['1']}px`],
  [':root', '--space-2', `${tokens.space['2']}px`],
  [':root', '--space-3', `${tokens.space['3']}px`],
  [':root', '--space-4', `${tokens.space['4']}px`],
  [':root', '--space-6', `${tokens.space['6']}px`],
  [':root', '--space-8', `${tokens.space['8']}px`],
  [':root', '--space-12', `${tokens.space['12']}px`],
  [':root', '--tap-target', `${tokens.layout.tapTarget.coarsePointer}px`],
  [':root', '--container-max', `${tokens.layout.maxWidth}px`],
  ['[data-accent="teal"]', '--color-primary', tokens.color.accent.teal.light],
  ['[data-accent="teal"]', '--color-primary-text', tokens.color.accent.teal.lightText],
  ['[data-theme="dark"]', '--color-primary', tokens.color.accent.blue.dark],
  ['[data-theme="dark"]', '--color-bg', tokens.color.dark.bg],
  ['[data-theme="dark"]', '--color-card', tokens.color.dark.card],
  ['[data-theme="dark"]', '--color-ink', tokens.color.dark.ink],
  ['[data-theme="dark"]', '--color-secondary', tokens.color.dark.secondary],
  ['[data-theme="dark"]', '--color-border', tokens.color.dark.border],
  ['[data-theme="dark"][data-accent="teal"]', '--color-primary', tokens.color.accent.teal.dark],
];

/**
 * Body of the LAST top-level rule whose selector list contains `selector`
 * EXACTLY. Exactness matters: without it, `[data-theme="dark"]` would also
 * match `[data-theme="dark"][data-accent="teal"]` and the check would compare
 * the wrong block.
 *
 * Comments are stripped first — a comment sitting above a rule is otherwise
 * captured as part of that rule's selector list.
 */
function block(css, selector) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0;
  let selStart = 0;
  let bodyStart = 0;
  let currentSel = '';
  let last = null;

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === '{') {
      if (depth === 0) {
        currentSel = clean.slice(selStart, i);
        bodyStart = i + 1;
      }
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        const exact = currentSel
          .split(',')
          .map((s) => s.trim())
          .some((s) => s === selector);
        if (exact) last = clean.slice(bodyStart, i);
        selStart = i + 1;
      }
    }
  }
  return last;
}

function checkCss() {
  const css = readFileSync(CSS_PATH, 'utf8');
  const problems = [];
  for (const [selector, prop, expected] of CSS_CONTRACT) {
    const body = block(css, selector);
    if (body === null) {
      problems.push(`${selector} — no such rule in grothouse-system.css`);
      continue;
    }
    const m = body.match(new RegExp(`${prop}\\s*:\\s*([^;]+);`));
    if (!m) {
      problems.push(`${selector} { ${prop} } — not declared`);
      continue;
    }
    const actual = m[1].trim();
    if (actual !== String(expected)) {
      problems.push(`${selector} { ${prop} } — css "${actual}" != tokens.json "${expected}"`);
    }
  }
  return problems;
}

/* ------------------------------------------------------------------- main -- */

const problems = checkCss();

if (CHECK) {
  const current = (() => {
    try {
      return readFileSync(JS_PATH, 'utf8');
    } catch {
      return null;
    }
  })();
  if (current !== js) {
    problems.unshift('kit/tokens.js is stale — run: node scripts/build-tokens.mjs');
  }
  if (problems.length) {
    console.error('\n  TOKEN PARITY FAILED — kit/tokens.json is canonical.\n');
    for (const p of problems) console.error(`    x ${p}`);
    console.error('');
    process.exit(1);
  }
  console.log(`  token parity ok — ${CSS_CONTRACT.length} CSS values match tokens.json, tokens.js current`);
  process.exit(0);
}

if (problems.length) {
  console.error('\n  Refusing to generate: the CSS layer disagrees with tokens.json.\n');
  for (const p of problems) console.error(`    x ${p}`);
  console.error('\n  Fix grothouse-system.css (or the contract in this script) first.\n');
  process.exit(1);
}

writeFileSync(JS_PATH, js);
console.log(`  wrote kit/tokens.js from kit/tokens.json (v${tokens.version})`);
console.log(`  ${CSS_CONTRACT.length} CSS values verified against the JSON`);
