# CLAUDE.md — The Grothouse Family

This repository operates under the **G26x Agent Operating System**, and contains
**The Grothouse Family brand system**. The governance layer is defined first; the
brand system this repo actually ships is defined below it.

## Canonical sources

- **Constitution (read first):** https://github.com/g6xai/g26x-agent-os/blob/main/CLAUDE.md
- **Spec:** https://github.com/g6xai/g26x-agent-os/blob/main/docs/G26x_Agent_OS_v1.1.md
- **Agent contracts:** synchronized from `g26x-agent-os` into `.claude/agents/` in this repo (see sync workflow).

## Entity overlay (read second)

- `CLAUDE.grothouse-family.md` in this repo — defines this entity's compliance bar, specialists to invoke, brand notes, and escalation path.

## Order of precedence

If any document conflicts:

1. G26x Command Center PRD v2.1 (highest authority)
2. Canonical constitution (`g26x-agent-os/CLAUDE.md`)
3. Entity overlay (`CLAUDE.grothouse-family.md`)
4. Anything else

## Engineering Standard

This repo operates under the **G26x Master Engineering Standard**. That standard governs:

- **Engineering Identity** — operate as a full senior engineering org, not a code generator
- **Architecture Discipline** — analyze before building, identify risks proactively
- **Code Quality** — Rob Pike simplicity, Carmack performance, SQLite test discipline, Erlang fault tolerance
- **Backend + System Design** — production-grade APIs, database design, queue systems, multi-tenant isolation
- **Frontend Engineering** — loading/empty/error states, accessibility, code splitting, optimistic updates
- **UX/UI Design** — Grothouse Family Design System, entity-specific brand tokens, radiance primitives
- **Debugging** — root cause analysis, never guessing, always explaining why
- **Performance** — p99 latency budgets, N+1 elimination, memory profiling, bundle size
- **Security** — adversarial thinking, injection prevention, tenant isolation, secret management
- **DevOps** — CI/CD, containerization, rollback plans, monitoring, disaster recovery
- **Multi-Agent Collaboration** — Architect designs, Engineer implements, Reviewer critiques, Optimizer hardens

The engineering standard applies to every file in this repository.

## Do not edit agent contracts here

Agent contracts (`.claude/agents/`) in this repo are mirrored from the canonical `g26x-agent-os` repo. Any change to agent behavior is a PR against `g26x-agent-os`, not this repo. Local edits are detected by CI and will fail the PR check.

---

# Grothouse Brand System

This project is **the brand kit** — the token source, the specs that teach it,
and the gate that enforces it. It is the foundation sites, products and
collateral build on. It does **not** contain those artifacts.

## 🔴 Apple HIG is the standard — CEO ruling 2026-08-12

**The canonical standard is `c:/Users/tony.grothouse/code/DriveX/design/APPLE-HIG-STANDARD.md`.**
Read that file. It is 917 lines, measured against apple.com rather than
asserted, and it carries a decision log recording where its own rules were
reversed by re-measurement.

**Do not copy it into this repo.** A duplicated standard across fifteen repos
guarantees divergence, and this org has paid for that twice. This repo records
only its own deltas, in `docs/APPLE-HIG-STANDARD.md`.

**Precedence:** canonical standard → `docs/APPLE-HIG-STANDARD.md` →
`kit/tokens.json` → everything else. **Where any file here disagrees with the
canonical standard, the standard wins and the local file is the bug.**

## Canonical defaults — always

**The Grothouse Family**
- Accent: **Co-Operate Blue** — `#5F7FFF` dark / `#1249E5` light
- Theme: **`light`** (default). Dark is a user preference.
- Group: `holding` — taxonomy only, **no visual consequence**

```html
<html data-entity="grothouse_family" data-accent="blue" data-theme="light">
```

Unless the user names a different entity from `kit/tokens.json`, start here.

## The colour law

| Scope | Accent |
|---|---|
| Grothouse default, platforms, websites, logos | Co-Operate Blue `#5F7FFF` / `#1249E5` |
| G26xM, Xperience, Zeus, consumer-facing | Xperience Teal `#14C8A6` / `#0E8C74` |

One accent per surface, always consumed as `--color-primary`. **A raw hex in a
component is a violation.**

> ⚠️ **The teal fails AA for body text**, so the accent carries **three** roles.
> Using the wrong one already shipped a 4.18:1 button label once.
>
> | Token | Use | Teal light |
> |---|---|---|
> | `--color-primary` | accent **on** a surface — borders, focus rings, icons | `#0E8C74` |
> | `--color-primary-text` | accent **text** below 22px | `#0B7A64` |
> | `--color-primary-fill` | filled **background** under `--color-on-primary` | `#0B7A64` |
>
> For blue all three coincide. **Never use `--color-primary` as a filled
> background.** See `docs/APPLE-HIG-STANDARD.md` §2.2.

**Never invent a colour.** Every value lives in `kit/tokens.json` with a
measured contrast ratio. Measure with `node scripts/contrast.mjs` — do not
assert.

## The system

| | |
|---|---|
| **Type** | One system family. 34 / 28 / 22 / **17 default** / 13. **12px floor.** **Sentence case only** — measured on apple.com: zero uppercase elements, zero above 0.1em tracking. |
| **Mono** | `.font-id` only, for machine identifiers where alignment carries meaning. Never decoration. |
| **Radius** | 12 control · 16 card · **pill buttons** (Apple's measure 980px) |
| **Motion** | 150 / **250 default** / 350ms, `cubic-bezier(0.32, 0.72, 0, 1)`. `prefers-reduced-motion` zeroes all of it. |
| **Space** | 8pt grid, seven values: 4 / 8 / 12 / 16 / 24 / 32 / 48. Every Tailwind half-step is banned. |
| **Depth** | Translucency + backdrop blur, surface-tone steps. **Not glow.** |

## 📱 Mobile — the most-often-broken rules

1. **The document scrolls.** `html`/`body` stay `position: static`,
   `overflow: visible`. Pinning them stops mobile Safari collapsing its URL bar,
   costing ~110px of viewport **and** the native back/share/tabs affordances.
   Fixed chrome uses `sticky`/`fixed` **on the element**.
2. **Never set `touch-action` or `overscroll-behavior` on `html`/`body`.**
   apple.com leaves both `auto`.
3. 🚨 **The trap:** `overflow-y: visible` computes to **`auto`** whenever the
   other axis is `auto`/`scroll`/`hidden`. So one `overflow-x: auto` silently
   re-traps document scroll. **`overflow-x: clip` is the only value that does
   not force the other axis.** Never reach for `overflow-x: hidden`.

**Horizontal carousels are sanctioned** — apple.com ships five on its iPhone
mobile page. Unintentional horizontal scroll is the defect. A deliberate
scroller declares `scroll-snap-type` (carousel) or `overscroll-behavior-inline`
(scroll region); the lint reads the declaration block, so the sanction is
visible to the rule and not only to a comment. **A data table is never a
carousel.**

## Retired — do not reintroduce

The four-axis matrix (accent × surface tone × glow level × archetype), all
radiance primitives (`g-aurora-mesh`, `g-orb*`, `g-noise`, `g-grid-tex`,
`g-text-glow`, `g-divider-glow`), Source Serif 4 / Outfit / JetBrains Mono, the
uppercase wide-tracked industrial overline, the five style presets, archetype
radii, and archetype speed multipliers. `kit/archetypes.json` is deleted.

**Exempt: logos and taglines only.** They keep their unique treatment,
including the serif face in the Editorial Wordmark. The exemption stops at the
artwork.

## Gates — run before pushing, read the exit code

```bash
node scripts/hig-lint-ratchet.mjs             # no section may grow
node scripts/hig-lint-ratchet.mjs --report    # per-rule, per-file detail
node scripts/build-tokens.mjs --check         # tokens.js + CSS match tokens.json
node scripts/check-assets.mjs                 # dead links, JSON, CSS balance
```

**All sections currently read 0**, so the baseline is all zeros and the rules
are a **hard ban** — any new violation fails CI.

- `kit/tokens.json` is canonical. `kit/tokens.js` is **generated**; regenerate
  with `node scripts/build-tokens.mjs`. Hand-editing it fails `--check`.
- The baseline **only moves down**. `--update` checks for growth before it
  writes and refuses — you cannot raise the ceiling through the tool.
- Changing a rule requires re-baselining against the **pre-change tree**, not
  your working tree. See `docs/APPLE-HIG-STANDARD.md` §3.1.
- Every rule ships known-bad and known-good fixtures; the self-test runs on
  every invocation. **A probe never checked against a known-good input is not
  evidence.**

## Consumers

**`@g6xai/brand` is NOT this repo** — it is `Xperience-G26xM/packages/brand/`,
a separate published package. Verified 2026-08-12: **no repo imports this kit at
build time.** Every reference is documentary. So there is no build to break —
but the fix does not propagate automatically either.

Known divergences with `@g6xai/brand` v2.1.0 (body 16px vs 17, Manrope vs system
stack, 140/200/320ms motion, an uppercase eyebrow) are recorded in
`docs/APPLE-HIG-STANDARD.md` §4 and are **not** resolved by this repo.

## What this project IS

- Brand Guidelines, Typography Spec, Motion Spec, Logo package (HTML)
- Design tokens (`kit/tokens.json` is source of truth)
- CSS token layer, React primitives, Tailwind preset
- The HIG gate: ratchet, rules with fixtures, token parity, asset check
- Token Playground for auditing

## What this project is NOT

- Not a website or product for any entity
- Not a component library (tokens + primitives only)
- Not marketing collateral

When the user asks for a site, product UI, deck or letterhead — that is new work
that *references* this system. Do not add those files here.

## Files

```
/
├── index.html                     Brand system hub
├── Brand Guidelines.html          Master document
├── Typography Spec.html           One family, five sizes
├── Motion Spec.html               Durations, easing, reduced motion
├── G26x Logos.html                Three marks, four variants
├── docs/APPLE-HIG-STANDARD.md     This repo's deltas + precedence
├── design/hig-lint-baseline.json  Violation counts; only moves down
├── logos/                         12 SVG files
├── scripts/
│   ├── hig-lint-ratchet.mjs       The gate
│   ├── hig-rules.mjs              Rules, each with its own fixtures
│   ├── build-tokens.mjs           Generate + verify the mirrors
│   ├── check-assets.mjs           Dead links, JSON, CSS balance
│   └── contrast.mjs               Measure, do not assert
└── kit/
    ├── tokens.json                Source of truth
    ├── tokens.js                  GENERATED — do not edit
    ├── grothouse-system.css       Token layer + primitives
    ├── tailwind.preset.js
    ├── theme-toggle.css/.js
    ├── react/index.jsx
    ├── README.md
    ├── product-spec.md            IA + voice (visual differentiation retired)
    └── Theme Playground.html
```
