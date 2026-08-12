#!/usr/bin/env node
/**
 * Structural check for the kit's shipped files.
 *
 * The ratchet proves the code does not use the retired system. It does NOT
 * prove the pages still work — a file could reach zero violations by being
 * broken. This checks the things a lint cannot see:
 *
 *   - every local href/src in every HTML file resolves to a real file
 *   - every JSON file parses
 *   - tokens.js evaluates and exposes the expected shape
 *   - every CSS file has balanced braces
 *
 *   node scripts/check-assets.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else out.push(abs);
  }
  return out;
}

const files = walk(ROOT);
const rel = (abs) => relative(ROOT, abs).replace(/\\/g, '/');
const problems = [];
let checkedLinks = 0;

/* ------------------------------------------------- local links resolve ---- */

for (const abs of files.filter((f) => /\.html$/i.test(f))) {
  const text = readFileSync(abs, 'utf8');
  const refs = [
    ...[...text.matchAll(/\shref\s*=\s*"([^"]+)"/gi)].map((m) => m[1]),
    ...[...text.matchAll(/\ssrc\s*=\s*"([^"]+)"/gi)].map((m) => m[1]),
  ];
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|data:|#|\/\/)/i.test(ref)) continue;
    const target = resolve(dirname(abs), decodeURIComponent(ref.split('#')[0]));
    checkedLinks++;
    if (!existsSync(target)) {
      problems.push(`${rel(abs)} -> ${ref} (no such file)`);
    }
  }
}

/* -------------------------------------------------------- JSON parses ----- */

for (const abs of files.filter((f) => /\.json$/i.test(f))) {
  try {
    JSON.parse(readFileSync(abs, 'utf8'));
  } catch (e) {
    problems.push(`${rel(abs)} — invalid JSON: ${e.message}`);
  }
}

/* ------------------------------------------- tokens.js shape is usable ---- */

try {
  const src = readFileSync(join(ROOT, 'kit', 'tokens.js'), 'utf8');
  const sandbox = { window: {} };
  new Function('window', src)(sandbox.window);
  const T = sandbox.window.__GROTHOUSE_TOKENS__;
  const required = [
    ['color.accent.blue.dark', T?.color?.accent?.blue?.dark],
    ['color.accent.teal.light', T?.color?.accent?.teal?.light],
    ['color.accent.teal.lightText', T?.color?.accent?.teal?.lightText],
    ['type.scale.body.size', T?.type?.scale?.body?.size],
    ['radius.card', T?.radius?.card],
    ['motion.standard', T?.motion?.standard],
    ['layout.tapTarget.coarsePointer', T?.layout?.tapTarget?.coarsePointer],
  ];
  for (const [path, value] of required) {
    if (value === undefined) problems.push(`kit/tokens.js — missing ${path}`);
  }
  if (!Array.isArray(T?.entities) || T.entities.length === 0) {
    problems.push('kit/tokens.js — entities is not a non-empty array');
  } else {
    for (const e of T.entities) {
      if (!T.color.accent[e.accent]) {
        problems.push(`kit/tokens.js — entity ${e.id} references unknown accent "${e.accent}"`);
      }
    }
  }
} catch (e) {
  problems.push(`kit/tokens.js — did not evaluate: ${e.message}`);
}

/* ---------------------------------------------------- CSS braces balance -- */

for (const abs of files.filter((f) => /\.css$/i.test(f))) {
  const text = readFileSync(abs, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0;
  for (const ch of text) {
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    if (depth < 0) break;
  }
  if (depth !== 0) problems.push(`${rel(abs)} — unbalanced braces (depth ${depth})`);
}

/* -------------------------------------------------------------- report ---- */

if (problems.length) {
  console.error('\n  ASSET CHECK FAILED\n');
  for (const p of problems) console.error(`    x ${p}`);
  console.error('');
  process.exit(1);
}
console.log(`  asset check ok — ${checkedLinks} local links resolve, JSON parses, tokens.js usable, CSS balanced`);
