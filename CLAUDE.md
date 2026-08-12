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

This project contains **The Grothouse Family brand system** — guidelines,
tokens, typography spec, motion spec, and logos. It is the foundation that
sites, products, and collateral build on top of. It does NOT contain those
artifacts itself.

## Canonical defaults — always

**The Grothouse Family** (family-level, holding archetype)
- Accent: Cobalt `#3944BC` (dark) / `#1338BE` (light)
- Secondary: Azure `#5464D8` (dark) / `#1520A6` (light)
- Surface: `cool` · Glow: `medium` · Archetype: `holding`
- Preset: `editorial` · Layout: `classic`
- **Theme: `light` (default)** — the family is designed light-first.
  Dark mode is a user preference, not the brand's native voice.

Unless the user explicitly names a different entity from `kit/tokens.json`,
always start with The Grothouse Family.

## Core rules

1. **Import `kit/grothouse-system.css` as the base layer.** It defines every
   radiance primitive (aurora mesh, orbs, noise, glow, cards, buttons, dividers)
   and reads everything from CSS variables. All defaults are light-mode;
   `[data-theme="dark"]` overrides flip values for dark mode.
2. **Set entity attrs on `<html>` — always include `data-theme="light"` explicitly:**
   ```html
   <html data-entity="grothouse_family"
         data-archetype="holding"
         data-surface="cool"
         data-glow="medium"
         data-preset="editorial"
         data-theme="light">
   ```
3. **Never invent colors.** All 24 entity accents sit in the blue family
   (hue 210–260°). Pick from `kit/tokens.json > entities`. Use the `.light`
   variant when rendering on light surfaces (default); use `.dark` only under
   `data-theme="dark"`.
4. **Typography:** Source Serif 4 (display) · Outfit (body) · JetBrains Mono (mono).
   Load via Google Fonts. See `Typography Spec.html` for the ten-step scale.
5. **Motion:** all transitions inherit archetype speed multipliers. See
   `Motion Spec.html` for easing tokens, radiance levels, and timing tables.
6. **Drop-in theme toggle:** include `kit/theme-toggle.css` + `kit/theme-toggle.js`
   for a standard sun/moon toggle that persists to localStorage.
7. **React projects:** use `ThemeProvider`, `Radiance`, `GlowCard`, `Section`,
   `Display`, `DividerGlow` from `kit/react/index.jsx`.
8. **Tailwind projects:** extend with `kit/tailwind.preset.js`.

## Five style presets (Style DNA)

Each entity can render in one of five presets. `editorial` is the canonical default.

| Preset | Character |
|---|---|
| `editorial` | Serif display, generous whitespace, subtle radiance |
| `brutalist` | Mono-first, 0-radius, heavy borders |
| `glass` | Frosted translucent cards, max radiance |
| `minimal` | Sans-only, flat, near-monochrome |
| `maximalist` | Gradients everywhere, oversize type |

## Four hero layouts

`classic` (default) · `split` (copy + data visual) · `centered` · `asymmetric`

## 24 entities

See `kit/tokens.json`. Organized by archetype:
- **Holding:** G26x · Grothouse Family
- **Real Estate:** GXRE · Hearth · Residential · Commercial
- **Financial:** RevoSure · The 5th Yr
- **AI/Tech:** Co-Operate · G6x AI · Unorthodox Labs · Neural Vault
- **Consumer:** Xperience Mortgage · HobbyBox
- **Charitable:** The Foundation
- **Platforms:** G6x Intelligence · Axon · Hive · OptX · ReVault · Node
- **Consulting:** G6 Consulting · GXMG · Family Office

## What this project IS

- Brand Guidelines, Typography Spec, Motion Spec (3 HTML documents)
- Logo package (3 marks × 4 variants each)
- Design tokens (`kit/tokens.json` is source of truth)
- Radiance CSS primitives + React primitives + Tailwind preset
- Theme Playground for auditing tokens

## What this project is NOT

- Not a website or product for any entity
- Not a component library (tokens + primitives only)
- Not marketing collateral

When the user asks for a site, product UI, deck, letterhead, or any
artifact that builds on the brand — that is new work that references this
system. Do not add those files here unless explicitly instructed.

## Quick commands

- **Explore themes visually:** open `kit/Theme Playground.html`
- **Read the brand rules:** open `Brand Guidelines.html`
- **Audit type:** open `Typography Spec.html`
- **Audit motion:** open `Motion Spec.html`
- **Add a new entity:** append to `kit/tokens.json > entities` — all primitives
  auto-reskin.

## Files

```
/
├── index.html                   ← Brand system hub
├── Brand Guidelines.html        ← Master document
├── Typography Spec.html         ← Families, scale, pairings, presets
├── Motion Spec.html             ← Easings, speeds, radiance, timings
├── G26x Logos.html              ← 3 marks × 4 variants
├── logos/                       ← 12 SVG files
└── kit/
    ├── tokens.json              ← Source of truth
    ├── tokens.js                ← JS global
    ├── archetypes.json          ← 8 archetypes, machine-readable
    ├── grothouse-system.css     ← Radiance + semantic tokens (light-default)
    ├── tailwind.preset.js
    ├── theme-toggle.css/.js     ← Drop-in toggle
    ├── react/index.jsx
    └── Theme Playground.html
```
