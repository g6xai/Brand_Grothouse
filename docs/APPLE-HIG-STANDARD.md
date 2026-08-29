# Apple HIG — Brand_Grothouse deltas

**Status:** authoritative for this repository
**Adopted:** 2026-08-12 (CEO ruling — Apple HIG is the default for the Grothouse brand and every repo)
**Scope:** `kit/**`, the four root HTML specs, and anything generated from `kit/tokens.json`

---

## 0. Precedence — read this before anything else

The canonical standard is:

```
c:/Users/tony.grothouse/code/DriveX/design/APPLE-HIG-STANDARD.md
```

**It is not copied here, and it must not be.** A duplicated standard across
fifteen repos guarantees divergence, and this organisation has already paid for
that failure twice — both times a document describing a rule its enforcement did
not have:

- `CLAUDE.md` described a "login hero" carve-out DriveX's lint never had, so 66
  violations sat in `(auth)` indefinitely. A ratchet only blocks increases, so
  nothing ever surfaced them.
- In `Xperience-G26xM`, `evidence:check` was documented as part of the gate while
  CI never ran it — long enough for `main` to drift past the ratchet with every
  PR still green.

**Order of precedence:**

1. The canonical standard (`DriveX/design/APPLE-HIG-STANDARD.md`)
2. This document — deltas only
3. `kit/tokens.json`
4. Everything else in this repo

**Where any file in this repo disagrees with the canonical standard, the
standard wins and the local file is the bug.** That includes this document. It
also includes `kit/tokens.json`, `Brand Guidelines.html`, and the rules in
`scripts/hig-rules.mjs`.

This precedence is not only prose. `scripts/build-tokens.mjs --check` enforces
item 3 against item 4 mechanically: 40 CSS values and the whole JS mirror are
verified against `tokens.json` on every CI run.

---

## 1. What this repo is

The brand kit — the token source that other repos read. It has no application
surfaces, so most of the canonical standard's sections (tabular data,
navigation, forms, progressive disclosure, route coverage) have nothing to apply
to here. They still govern any product built on this kit.

What this repo *does* own is the risk that the retired system keeps propagating,
because agents and authors read it as canonical.

---

## 2. Deltas from the canonical standard

### 2.1 Two accents, not one

The canonical standard is written for DriveX, where Electric Blue `#5F7FFF` is
the single accent. This kit serves 24 entities, so it carries two:

| Accent | Scope | Dark | Light |
|---|---|---|---|
| Co-Operate Blue | Grothouse default, platforms, websites, logos | `#5F7FFF` | `#1249E5` |
| Xperience Teal | G26xM, Xperience, Zeus, consumer-facing | `#14C8A6` | `#0E8C74` |

Still **one accent per surface**. An entity's accent is read from
`tokens.json` and applied as `[data-accent]`; a caller cannot override it,
because letting one is how a third accent appears.

The light blue is `#1249E5` because that is what DriveX actually ships
(`--primary: oklch(0.49 0.24 264)` in its `.light` block). Adopted rather than
invented, so the two repos agree.

> **Note for whoever re-measures next.** DriveX's *dark* `--primary`,
> `oklch(0.63 0.21 264)`, converts to `#457EFF` — not the `#5F7FFF` its own
> comment names. The two have already drifted there. This kit uses `#5F7FFF`
> because that is the value the colour law states. Worth reconciling in DriveX.

### 2.2 The teal fails AA for body text — and is kept anyway

`#0E8C74` measured against this kit's light surfaces:

| Pair | Ratio | Verdict |
|---|---|---|
| on `--color-bg` `#F5F5F7` | **3.84:1** | passes 3:1 UI/large-text, **fails** 4.5:1 text |
| on `--color-card` `#FFFFFF` | **4.18:1** | **fails** 4.5:1 text |
| white on `#0E8C74` | **4.18:1** | **fails** for a filled button label |

The hex is fixed by the colour law and ships in production today in
`@g6xai/brand` v2.1.0. Forking it here would create a third definition of the
same brand colour, which is the failure this whole conversion exists to stop.

**Resolution — the accent splits into three roles**, because one value cannot
serve all three:

| Token | Is | Teal light |
|---|---|---|
| `--color-primary` | the accent **on** a page surface — borders, focus rings, icons | `#0E8C74` |
| `--color-primary-text` | accent-coloured **text** below 22px | `#0B7A64` (4.84:1) |
| `--color-primary-fill` | a filled **background** carrying `--color-on-primary` | `#0B7A64` (white on it: 5.27:1) |

For blue all three coincide. For teal on light they do not.

> **This was found in review, not by the gate.** The first version of this
> conversion collapsed fill into `--color-primary`, so `.hig-button-primary`
> rendered white on `#0E8C74` — **4.18:1**, below the 4.5:1 needed for a 17px
> button label. Every consumer-facing entity's primary CTA failed contrast.
>
> A raw hex is checkable by regex; an insufficient ratio between two tokens is
> not. `scripts/contrast.mjs` existed but was **advisory** — run by hand, and
> its pair list did not include the filled-button combination. **A pair the
> audit does not name is a pair nobody measured.**
>
> It is now a gate: it asserts all 22 shipped pairs against per-pair thresholds,
> exits non-zero on failure, and runs in CI with a sabotage step that reverts
> the fill and confirms the gate fails. Add the pair when you add the component.

**This is the one place the kit is knowingly carrying a colour that cannot be
used for body text.** It is recorded here so the trade is visible rather than
inferred. If the colour law is ever revisited, this is the constraint to raise.

Every ratio above is produced by `node scripts/contrast.mjs`, not asserted.
Re-run it before changing any colour token.

### 2.3 Markdown is out of lint scope; HTML is scanned as code only

The ratchet scans `kit/**` and the root `*.html` files. It does **not** scan
`.md`, and inside HTML it scans only `<style>` bodies, `style=""` attributes,
`class=""` attributes and `<link>` tags — not prose.

This is deliberate and it is load-bearing. A spec page has to be able to write
*"never reach for `overflow-x: hidden`"* without that sentence counting as an
instance of `overflow-x: hidden`. Left unhandled, prose naming a banned pattern
makes its category unable to reach zero — and a category that can never reach
zero is what makes a ratchet ignorable.

The extractor has its own known-good and known-bad fixtures in
`scripts/hig-lint-ratchet.mjs`, because a silently-broken extractor would make
every HTML file report zero and the migration would look finished while the
retired system was still shipping.

### 2.4 Deliberate horizontal scroll is sanctioned by a property, not a comment

The canonical standard sanctions snap carousels (§2.1a). This kit widens that
slightly: `overflow-x: auto|scroll` is permitted when the same declaration block
declares **either**:

- `scroll-snap-type` — a carousel, or
- `overscroll-behavior-inline` — a deliberate inner scroll region such as a
  preformatted file tree, where the content must not wrap

`overflow-x: hidden` remains banned outright — it is the value that silently
re-traps document scroll, because `overflow-y: visible` computes to `auto`
whenever the other axis is `auto`/`scroll`/`hidden`. `clip` is the only value
that does not force the other axis.

The rule matches the **whole declaration block** so the lint can *see* the
sanctioning property. A carve-out the lint cannot see is exactly the DriveX
`(auth)` failure.

### 2.5 Logos and taglines are exempt — and the exemption stops at the artwork

The marks keep their unique treatment, including the serif display face in the
Editorial Wordmark. `logos/**` is excluded from lint scope.

`G26x Logos.html` uses fixed `black` / `white` proof grounds rather than theme
tokens, because a proof sheet that changed with the page theme would stop being
a proof. Everything else on that page — chrome, type, controls, spacing — is
fully HIG.

### 2.6 §K.1 — a repo-local section

The canonical standard has no section for the four-axis matrix, because DriveX
never had one. `§K.1` counts the retired machinery specific to this kit:
`data-archetype` / `data-surface` / `data-glow`, `surfaceTones`, `glowLevels`,
`archetypes`, the `--g-orb-i` / `--g-noise-i` / `--g-glow-i` / `--g-grid-i`
intensity variables, `radiiScale`, and the `--g-f-display` / `--g-f-body` /
`--g-f-mono` font variables.

---

## 3. Enforcement

The harness shipped **before** the migration, and the baseline was recorded
against the unmigrated kit.

| Command | What it does |
|---|---|
| `node scripts/hig-lint-ratchet.mjs` | counts violations per section, fails if any grew |
| `node scripts/hig-lint-ratchet.mjs --report` | per-rule and per-file detail |
| `node scripts/hig-lint-ratchet.mjs --self-test` | fixtures only |
| `node scripts/build-tokens.mjs` | regenerate `kit/tokens.js` from `tokens.json` |
| `node scripts/build-tokens.mjs --check` | fail on a stale mirror or drifted CSS value |
| `node scripts/check-assets.mjs` | dead links, JSON parse, tokens.js shape, CSS braces |
| `node scripts/contrast.mjs` | measure a colour pair |

All four run in CI (`.github/workflows/hig-gate.yml`).

### 3.1 The baseline only moves down

`--update` **checks for growth before it writes** and refuses when any section
grew. Raising the ceiling to make CI pass is not possible through the tool, not
merely discouraged by a comment.

**Changing a rule is the one case `--update` cannot serve**, because the
measurement itself changed and the old numbers are no longer comparable. The
deliberate path is:

1. Delete `design/hig-lint-baseline.json`.
2. Re-measure **the pre-change tree**, not your working tree — use
   `git worktree add --detach <tmp> <pre-migration-commit>`, copy the new
   scripts in, and run `--update` there.
3. Copy the resulting baseline back and say so in the commit message.

Step 2 is the part that matters. Re-baselining against your own migrated tree
launders migration progress through a rule change and makes the delta a lie.
This was done twice during this conversion, both times recorded in the commit.

### 3.2 Every rule carries its own fixtures

Each rule in `scripts/hig-rules.mjs` ships `bad` strings that **must** match and
`good` strings that **must not**. The self-test runs on every invocation and
aborts before reporting any number.

This is not ceremony. Doing exactly this in `Xperience-G26xM` caught a regex
whose exclusion lookahead sat after `\s*`, so it backtracked to zero-width
whitespace and counted every tokenised `border-radius: var(--radius)` as a
violation — a category that could never have reached zero. Review did not catch
it; the known-good check did.

Sabotage results from this conversion, all confirmed by hand:

| Sabotage | Expected | Result |
|---|---|---|
| Pattern no longer matches its known-bad | self-test fails | exit 2 ✅ |
| Numeric filter removed from `type/wide-tracking` | known-good matches | exit 2 ✅ |
| `html\|body` anchor removed from `scroll/document-constraint` | known-good matches | exit 2 ✅ |
| Extractor stops reading `<style>` bodies | extraction fixture fails | exit 2 ✅ |
| Violation appended to a real file | section grows | exit 1 ✅ |
| `--update` run while a section grew | refuses, baseline unchanged on disk | exit 1 ✅ |
| CSS `--radius-card` drifted 16→20 | parity fails | exit 1 ✅ |
| Byte appended to `kit/tokens.js` | stale mirror detected | exit 1 ✅ |

The CI workflow re-runs the injection sabotage on every PR, so a
silently-broken ratchet cannot report green forever.

### 3.3 All sections are at zero — promote them

As of this conversion every section reads **0**. The baseline is therefore all
zeros, which makes the rules a **hard ban**: any new violation is an increase
and fails the gate. That is the point of tracking per section rather than one
total — a finished migration becomes a permanent guarantee.

---

## 4. Consumers — read before making a breaking change

**`@g6xai/brand` is NOT this repository.** It is
`Xperience-G26xM/packages/brand/`, a separate workspace package (v2.1.0,
published to GitHub Packages) with its own `tokens.json`, `tokens.css` and
parity script. Changing this kit does **not** change what
`apps/xperience-web` or `apps/xperience-pos` build against.

Verified 2026-08-12 by grep across `c:/Users/tony.grothouse/code`: **no repo
imports this kit at build time.** Every reference is documentary — governance
markdown and agent contracts naming `Brand_Grothouse` as canonical, plus a
Tailwind preset example inside a fenced code block in
`Co-Operate Documentation/Governance/CoOperate_Brand_Guidelines.md`.

So the propagation vector is **documentation and agents reading this repo**, not
`npm install`. Two consequences:

1. There is no build to break, so this conversion could be a clean cut rather
   than a deprecation window.
2. The fix does not propagate automatically either. Every repo whose governance
   doc describes the radiance system still describes it, and every agent reading
   `Brand_Grothouse` for tokens will now get the right answer only for this kit.

**Known divergences with `@g6xai/brand` v2.1.0**, none of which this repo can
resolve alone:

| Value | This kit (canonical HIG) | `@g6xai/brand` v2.1.0 |
|---|---|---|
| Body size | 17px | 16px |
| UI face | system stack | Manrope |
| Motion | 150 / 250 / 350ms | 140 / 200 / 320ms |
| Radii | 12 / 16 / pill | 6 / 8 / 10 / 12 / 16 / 20 / 22 / 999 |
| Eyebrow | retired | 11px, uppercase, 0.05em tracking |
| Type floor | 12px | 11px |

The CEO ruling retired Manrope as G26xM's UI face. Reconciling that package is
`Xperience-G26xM` work and is **not** done by this conversion.

---

## 5. Re-measure before defending any number

Two of the canonical standard's own rules were reversed by re-measurement:

- The 13px caption floor became 12px. A runtime audit found 445 elements at
  12px, every one conformant to Apple and a violation only of our own stricter
  number. The rule was **deleted**, not loosened.
- The blanket horizontal-scroll ban became sanctioned carousels, after
  apple.com's iPhone page was measured shipping five of them on mobile.

Where this kit is deliberately stricter than Apple, it says so — see §2.2. Do
not defend a number here without measuring again.
