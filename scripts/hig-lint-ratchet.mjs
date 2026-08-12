#!/usr/bin/env node
/**
 * HIG lint ratchet — the half with teeth.
 *
 * Lint rules that fire as warnings are a signal nobody counts. This script
 * counts violations PER SECTION against a committed baseline and fails if any
 * category grew. Per-section rather than one total is what lets a rule be
 * promoted to a hard ban the moment its category reaches zero — that is what
 * converts a finished migration into a permanent guarantee.
 *
 *   node scripts/hig-lint-ratchet.mjs              scan + compare (CI mode)
 *   node scripts/hig-lint-ratchet.mjs --report     scan + per-rule detail
 *   node scripts/hig-lint-ratchet.mjs --self-test  fixtures only
 *   node scripts/hig-lint-ratchet.mjs --update     lower the baseline
 *
 * THE BASELINE ONLY MOVES DOWN. `--update` refuses to write when any section
 * grew. If a count rose, fix the code — raising the baseline to make CI pass
 * defeats the entire mechanism.
 *
 * Every invocation runs the fixture self-test BEFORE it reports a number. A
 * probe that has never been checked against a known-good input is not
 * evidence: DriveX's first conformance run produced 110 false overflow
 * findings and 61 false dead links, and a mis-anchored lookahead in the
 * Xperience ratchet counted every tokenised `border-radius: var(--radius)` as
 * a violation — a category that could never have reached zero. Review did not
 * catch it; the known-good fixture did.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RULES, SECTIONS, inScope, scannable } from './hig-rules.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(ROOT, 'design', 'hig-lint-baseline.json');

const argv = new Set(process.argv.slice(2));
const MODE = argv.has('--self-test')
  ? 'self-test'
  : argv.has('--update')
    ? 'update'
    : argv.has('--report')
      ? 'report'
      : 'check';

/* ------------------------------------------------------------- counting -- */

/** Fresh regex per use — a shared /g literal carries lastIndex between calls. */
function countInText(rule, text) {
  const rx = new RegExp(rule.pattern.source, rule.pattern.flags);
  let n = 0;
  let m;
  while ((m = rx.exec(text)) !== null) {
    if (m[0] === '') { rx.lastIndex++; continue; }
    if (!rule.keep || rule.keep(m)) n++;
  }
  return n;
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else out.push(abs);
  }
  return out;
}

function scan() {
  const files = walk(ROOT)
    .map((abs) => ({ abs, rel: relative(ROOT, abs).replace(/\\/g, '/') }))
    .filter(({ rel }) => inScope(rel))
    .sort((a, b) => a.rel.localeCompare(b.rel));

  const bySection = Object.fromEntries(SECTIONS.map((s) => [s, 0]));
  const byRule = Object.fromEntries(RULES.map((r) => [r.id, 0]));
  const hits = [];

  for (const { abs, rel } of files) {
    // Code regions only — prose that NAMES a banned pattern is documentation.
    const text = scannable(rel, readFileSync(abs, 'utf8'));
    for (const rule of RULES) {
      if (rule.files && !rule.files(rel)) continue;
      const n = countInText(rule, text);
      if (n === 0) continue;
      bySection[rule.section] += n;
      byRule[rule.id] += n;
      hits.push({ rel, rule: rule.id, section: rule.section, n });
    }
  }

  const total = Object.values(bySection).reduce((a, b) => a + b, 0);
  return { files: files.length, bySection, byRule, hits, total };
}

/* ------------------------------------------------------------ self-test -- */

/**
 * The HTML extractor is itself a probe, so it gets its own known-good and
 * known-bad. If extraction silently swallowed <style> blocks, every HTML file
 * would report zero and the migration would look finished while the retired
 * system was still shipping.
 */
const EXTRACTION_FIXTURES = [
  {
    name: 'prose naming a banned pattern is NOT code',
    html: `<p>Never reach for <span>overflow-x: hidden</span> as a shortcut.</p>`,
    mustContain: [],
    mustNotContain: ['overflow-x: hidden'],
  },
  {
    name: '<style> body IS code',
    html: `<style>.a { overflow-x: hidden; }</style><p>prose</p>`,
    mustContain: ['overflow-x: hidden'],
    mustNotContain: ['prose'],
  },
  {
    name: 'style attribute IS code',
    html: `<div style="border-radius: 3px;">text</div>`,
    mustContain: ['border-radius: 3px'],
    mustNotContain: ['>text<'],
  },
  {
    name: 'class attribute IS code',
    html: `<span class="text-xs uppercase">Label</span><p>the word uppercase in prose</p>`,
    mustContain: ['class="text-xs uppercase"'],
    mustNotContain: ['in prose'],
  },
  {
    name: 'webfont link IS a real dependency',
    html: `<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4" rel="stylesheet" />`,
    mustContain: ['Source+Serif'],
    mustNotContain: [],
  },
];

function selfTest() {
  const failures = [];

  for (const f of EXTRACTION_FIXTURES) {
    const out = scannable('spec.html', f.html);
    for (const s of f.mustContain) {
      if (!out.includes(s)) failures.push(`extraction [${f.name}]: dropped ${JSON.stringify(s)}`);
    }
    for (const s of f.mustNotContain) {
      if (out.includes(s)) failures.push(`extraction [${f.name}]: kept ${JSON.stringify(s)}`);
    }
  }

  for (const rule of RULES) {
    if (!rule.bad?.length || !rule.good?.length) {
      failures.push(`${rule.id}: rule ships without both bad and good fixtures`);
      continue;
    }
    for (const s of rule.bad) {
      if (countInText(rule, s) === 0) {
        failures.push(`${rule.id}: KNOWN-BAD did not match -> ${JSON.stringify(s)}`);
      }
    }
    for (const s of rule.good) {
      const n = countInText(rule, s);
      if (n > 0) {
        failures.push(`${rule.id}: KNOWN-GOOD matched ${n}x -> ${JSON.stringify(s)}`);
      }
    }
  }
  return failures;
}

/* ---------------------------------------------------------------- output -- */

const bold = (s) => `\u001b[1m${s}\u001b[0m`;
const red = (s) => `\u001b[31m${s}\u001b[0m`;
const green = (s) => `\u001b[32m${s}\u001b[0m`;
const dim = (s) => `\u001b[2m${s}\u001b[0m`;

function printTable(bySection, baseline) {
  const rows = SECTIONS.map((s) => {
    const now = bySection[s] ?? 0;
    const was = baseline?.sections?.[s];
    const delta = was === undefined ? null : now - was;
    return { s, now, was, delta };
  });
  const w = Math.max(...rows.map((r) => r.s.length), 7);
  console.log(`\n  ${bold('section'.padEnd(w))}  ${bold('count')}  ${bold('baseline')}  ${bold('delta')}`);
  for (const { s, now, was, delta } of rows) {
    const d =
      delta === null ? dim('  new') : delta > 0 ? red(`  +${delta}`) : delta < 0 ? green(`  ${delta}`) : dim('    0');
    console.log(`  ${s.padEnd(w)}  ${String(now).padStart(5)}  ${String(was ?? '-').padStart(8)}  ${d}`);
  }
}

/* ------------------------------------------------------------------ main -- */

const failures = selfTest();
if (failures.length) {
  console.error(red(bold('\nRULE SELF-TEST FAILED — no counts are trustworthy.\n')));
  for (const f of failures) console.error(`  ${red('x')} ${f}`);
  console.error(
    dim(
      '\n  Every rule must match its known-bad fixtures and must not match its\n' +
        '  known-good fixtures. Fix the pattern, not the fixture.\n'
    )
  );
  process.exit(2);
}
console.log(green(`  self-test ok — ${RULES.length} rules, ` +
  `${RULES.reduce((a, r) => a + r.bad.length + r.good.length, 0)} fixtures`));

if (MODE === 'self-test') process.exit(0);

let baseline = null;
try {
  baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));
} catch {
  /* first run — handled below */
}

const result = scan();
printTable(result.bySection, baseline);
console.log(dim(`\n  ${result.files} files in scope · ${result.total} violations total`));

if (MODE === 'report') {
  console.log(bold('\n  by rule\n'));
  for (const rule of RULES) {
    const n = result.byRule[rule.id];
    console.log(`  ${n > 0 ? red(String(n).padStart(5)) : green('    0')}  ${rule.section.padEnd(7)} ${rule.id}`);
  }
  console.log(bold('\n  by file\n'));
  const perFile = {};
  for (const h of result.hits) (perFile[h.rel] ??= []).push(h);
  for (const [rel, hs] of Object.entries(perFile)) {
    console.log(`  ${bold(rel)}`);
    for (const h of hs.sort((a, b) => b.n - a.n)) {
      console.log(`      ${String(h.n).padStart(4)}  ${h.section.padEnd(7)} ${h.rule}`);
    }
  }
  console.log('');
}

if (!baseline) {
  if (MODE === 'update') {
    writeBaseline(result);
    console.log(green(`\n  baseline written to design/hig-lint-baseline.json\n`));
    process.exit(0);
  }
  console.error(red('\n  No baseline. Run with --update to record the first one.\n'));
  process.exit(1);
}

const grew = SECTIONS.filter((s) => (result.bySection[s] ?? 0) > (baseline.sections[s] ?? 0));
const cleared = SECTIONS.filter(
  (s) => (result.bySection[s] ?? 0) === 0 && (baseline.sections[s] ?? 0) > 0
);

if (grew.length) {
  console.error(red(bold('\n  RATCHET FAILED — these sections grew:\n')));
  for (const s of grew) {
    console.error(
      `    ${red(s)}  ${baseline.sections[s] ?? 0} -> ${result.bySection[s]}  ` +
        `(+${result.bySection[s] - (baseline.sections[s] ?? 0)})`
    );
  }
  console.error(
    dim(
      '\n  The baseline only moves DOWN. Do not run --update to make this pass:\n' +
        '  that raises the ceiling instead of fixing the code, and it defeats the\n' +
        '  entire mechanism. Run --report to see which files carry the new hits.\n'
    )
  );
  process.exit(1);
}

if (MODE === 'update') {
  writeBaseline(result);
  console.log(green('\n  baseline lowered.\n'));
  process.exit(0);
}

if (cleared.length) {
  console.log(
    green(bold(`\n  ${cleared.length} section(s) reached zero: ${cleared.join(', ')}`)) +
      dim('\n  Promote these rules from counted to banned — that is the point of\n' +
        '  tracking per section rather than one total.\n')
  );
} else {
  console.log(green('\n  ratchet ok — no section grew.\n'));
}

function writeBaseline(r) {
  const payload = {
    $comment:
      'Violation counts per section of the canonical Apple HIG standard. ' +
      'THIS FILE ONLY MOVES DOWN. Raising a number to make CI pass defeats the ratchet. ' +
      'Regenerate with: node scripts/hig-lint-ratchet.mjs --update',
    standard:
      'c:/Users/tony.grothouse/code/DriveX/design/APPLE-HIG-STANDARD.md',
    filesInScope: r.files,
    total: r.total,
    sections: Object.fromEntries(SECTIONS.map((s) => [s, r.bySection[s] ?? 0])),
    rules: r.byRule,
  };
  writeFileSync(BASELINE, JSON.stringify(payload, null, 2) + '\n');
}
